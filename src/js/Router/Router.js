export default class Router {
    constructor(app) {
        this.app    = app;
        this.routes = [];
        this.hashChange = this.hashChange.bind(this);
        window.addEventListener("hashchange", this.hashChange);
    }

    addRoute(name, path) {
        const route = {
            name,
            path
        };
        this.routes.push(route);
        return route;
    }

    hashChange() {
        const { hash } = window.location;
        const route = this.routes.find(route => {
            return hash.match(new RegExp(route.path));
        });
        if(route) {
            // show component
            this.app.showComponent(route);
            // scroll top
            document.body.scrollTop = 0; // Safari
            document.documentElement.scrollTop = 0; // Chrome, Firefox, IE and Opera
        }
    }

    removeHash() { 
        history.pushState("", document.title, window.location.pathname + window.location.search);
    }
}