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
        this.app       = new App("#app");
        this.router    = new Router(this.app);
        this.uiService = new UIService();
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

    async load() {
        await this.loadIcons();
        await this.loadCss();
        new Components().defineComponents();
        const user     = localStorage.getItem("user");
        const { hash } = window.location;
        if(!user) {
            this.uiService.toggleUIForUser(false);
            if(hash.match(new RegExp(Routes.ResetPassword.pathRegex)))
                this.app.instantiateApp(Routes.ResetPassword);
            else {
                this.router.removeHash();
                this.app.instantiateApp(Routes.Landing);
            }
        }
        else {
            this.uiService.toggleUIForUser(true);
            // Route
            Object.entries(Routes).forEach((route) => {
                const [name, props] = route;
                if(hash.match(new RegExp(props.pathRegex)))
                    this.app.instantiateApp(props);
            });
        }
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
    }

    addRoutes() {
        Object.entries(Routes).forEach((route) => {
            const [name, props] = route;
            const result = this.router.addRoute(props.name, props.pathRegex);
        });
    }
}

new Index().start();