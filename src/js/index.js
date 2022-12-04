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


class Index {
    constructor() {
        this.app = new App("#app");
        this.router = new Router(this.app);
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
        const styles    = new DOMParser().parseFromString(stylescss, "text/css");
        window.GlobalVariables.styles = styles;
    }

    async load() {
        await this.loadIcons();
        await this.loadCss();
        const user     = localStorage.getItem("user");
        const { hash } = window.location;
        if(!user) {
            this.uiService.toggleUIForUser(false);
            if(hash.match(new RegExp(Routes.ResetPassword.pathRegex)))
                this.app.instantiateApp(Routes.ResetPassword);
            else {
                this.router.removeHash();
                window.location.hash = '#/login';
                this.app.instantiateApp(Routes.Login);
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

        // Add Pages
        // Auth
        this.app.addComponent({
            name: Routes.Login.name,
            view: LoginPage
        });
        this.app.addComponent({
            name: Routes.ForgotPassword.name,
            view: ForgotPasswordPage
        });
        this.app.addComponent({
            name: Routes.ResetPassword.name,
            view: ResetPasswordPage
        });
        // Dashboard
        this.app.addComponent({
            name: Routes.Dashboard.name,
            view: DashboardPage
        });
        // Users
        this.app.addComponent({
            name: Routes.Users.name,
            view: UsersPage
        });
        this.app.addComponent({
            name: Routes.UserForm.name,
            view: UserFormPage
        });
        this.app.addComponent({
            name: Routes.UserEdit.name,
            view: UserEditPage
        });
        this.app.addComponent({
            name: Routes.UserProfile.name,
            view: UserProfilePage
        });
        // Roles
        this.app.addComponent({
            name: Routes.Roles.name,
            view: RolesPage
        });
        this.app.addComponent({
            name: Routes.RoleForm.name,
            view: RoleFormPage
        });
        this.app.addComponent({
            name: Routes.RoleEdit.name,
            view: RoleEditPage
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