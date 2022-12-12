// App & Router
import App from './app';
import Router from './Router/Router';
// Config
import { Routes } from './config/Routes';
// Service
import UIService from './Service/UI/UIService';
// Views
import MainView from './Views/MainView';
import RouterView from './Views/RouterView';
// Components
import Components from './Components';

class Index {
    constructor() {
        this.app        = new App("#app");
        this.router     = new Router(this.app, "path");
        this.components = new Components();
        this.uiService  = new UIService();
    }

    start() {
        this.addComponents();
        this.addRoutes();
        this.load();
    }

    async loadIcons() {
        const iconsSvg = await (await fetch('assets/icons/bootstrap-icons.svg')).text();
        const icons = new DOMParser().parseFromString(iconsSvg, "image/svg+xml");
        icons.documentElement.style.display = 'none';
        window.GlobalVariables.icons = icons.documentElement;
    }

    async loadCss() {
        const stylescss = await (await fetch(window.GlobalVariables.CSS_FILE_NAME)).text();
        const styles = stylescss.replace(/\n|\r/g, "");
        window.GlobalVariables.styles = styles;
    }

    loadHistoryState() {
        window.history.pushState = new Proxy(window.history.pushState, {
            apply: (target, thisArg, argArray) => {
                const output = target.apply(thisArg, argArray);
                document.dispatchEvent(new CustomEvent("pushStateEvent"));
                return output;
            },
          });
    }

    async load() {
        await this.loadIcons();
        await this.loadCss();
        this.loadHistoryState();
        this.components.defineComponents();
        const user     = localStorage.getItem("user");
        const { pathname } = window.location;
        this.uiService.toggleUIForUser(true);
        // Route
        Object.entries(Routes).forEach((route) => {
            const [name, props] = route;
            if(pathname.match(new RegExp(props.pathRegex)))
                this.app.instantiateApp(props);
        });
    }

    addComponents() {
        // Add Main
        this.app.addComponent({
            name: 'main-view',
            view: MainView
        });

        // Add Router
        this.app.addComponent({
            name: 'router-view',
            view: RouterView
        });
        
        // Others
        this.components.addComponents(this.app);
    }

    addRoutes() {
        Object.entries(Routes).forEach((route) => {
            const [name, props] = route;
            const result = this.router.addRoute(props.name, props.pathRegex);
        });
    }
}

new Index().start();