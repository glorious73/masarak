export default class App {
    constructor(selector) {
        this.appElement = document.querySelector(selector);
        this.components = {};
    }

    instantiateApp(route) {
        this.currentComponent = this.components['main-view'];
        this.appElement.appendChild(document.createElement(this.currentComponent.name));
        this.showComponent(route);
    }

    addComponent(component) {
        this.components[component.name] = component;
    }

    showComponent(route) {
        this.currentComponent = this.components[route.name];
        this.updateView();
    }

    updateView() {
        const routerView = document.querySelector('main-view').shadowRoot.querySelector('router-view');
        if(this.currentComponent) {
            routerView.shadowRoot.innerHTML = "";
            const newElement = document.createElement(`${this.currentComponent.name}`);
            routerView.shadowRoot.appendChild(newElement);
        }
    }
}