import AuthService from "../Service/Auth/AuthService";
import AlertsComponent from "../Component/Alert/AlertsComponent";
import NavbarComponent from "../Component/UI/Navbar/NavbarComponent";
import RouterView from "./RouterView";

const template = document.createElement('template');

template.innerHTML = /*html*/`
    <style>
   ${window.GlobalVariables.styles}
    </style>
    <div class="body-container">
        <app-alerts></app-alerts>
        <div class="content">
            <app-navbar class="navbar"></app-navbar>
            <router-view class="router-view"></router-view>
        </div>
    </div>
`;

export default class MainView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        // Authorizations
        document.addEventListener("UnauthorizedEvent", 
            (evt) => new AuthService().logoutUnauthorizedUser(evt));
        document.addEventListener("ForbiddenEvent", (evt) => {
            new AuthService().notifyForbiddenUser(evt);
            setTimeout(() => window.location = "", 1200);
        });
        // Views
        document.addEventListener("toggleUIForUser", evt => {
            const isDisplayed = evt.detail.data;
            this.setBackgroundColor(isDisplayed);
            this.toggleNavbar(isDisplayed);
        });
    }

    disconnectedCallback() {
        // Authorizations
        document.removeEventListener("UnauthorizedEvent", 
            (evt) => new AuthService().logoutUnauthorizedUser(evt));
        document.removeEventListener("ForbiddenEvent", (evt) => {
            new AuthService().notifyForbiddenUser(evt);
            setTimeout(() => window.location = "", 1200);
        });
        // Views
        document.removeEventListener("toggleUIForUser", evt => {
            const isDisplayed = evt.detail.data;
            this.setBackgroundColor(isDisplayed);
            this.toggleNavbar(isDisplayed);
        });
    }

    // is user authenticated
    setBackgroundColor(isDisplayed) {
        const mainView = this.shadowRoot.querySelector(".content");
        mainView.className = (isDisplayed) ? 'content' : 'content login-background';
    }

    toggleNavbar(isDisplayed) {
        const navbarView = this.shadowRoot.querySelector(".navbar");
        navbarView.className = (isDisplayed) ? "navbar" : "navbar d-none"; 
    }
}

window.customElements.define('main-view', MainView);