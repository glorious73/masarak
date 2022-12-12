export default class Router {
    constructor(app, mode="hash") {
        this.app        = app;
        this.routes     = [];
        this.hashChange = this.hashChange.bind(this);
        this.popState   = this.popState.bind(this);
        if(mode === "hash")
          window.addEventListener("hashchange", this.hashChange);
        else {
            document.addEventListener("pushStateEvent", (e) => this.popState());
            window.addEventListener("popstate", (e) => this.popState());
        }
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

    popState() {
        const { pathname } = window.location;
        const route = this.routes.find(route => {
            return pathname.match(new RegExp(route.path));
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
        history.pushState("", '', window.location.pathname + window.location.search);
    }
}