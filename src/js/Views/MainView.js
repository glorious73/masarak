import AuthService from "../Service/Auth/AuthService";
import AlertsComponent from "../Component/Alert/AlertsComponent";
import NavbarComponent from "../Component/UI/Navbar/NavbarComponent";
import FooterComponent from "../Component/Footer/FooterComponent";
import RouterView from "./RouterView";

function markupTemplate() {
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
            <app-footer></app-footer>
        </div>
    </div>
`;
return template;
}

export default class MainView extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = markupTemplate();
this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        // Authorizations
        document.addEventListener("UnauthorizedEvent", 
            (evt) => new AuthService().logoutUnauthorizedUser(evt));
        document.addEventListener("ForbiddenEvent", (evt) => {
            new AuthService().notifyForbiddenUser(evt);
            setTimeout(() => history.pushState(null, document.title, '/'), 1200);
        });
        // Views
        document.addEventListener("toggleUIForUser", evt => {
            const isDisplayed = evt.detail.data;
            this.toggleNavbar(isDisplayed);
        });
    }

    disconnectedCallback() {
        // Authorizations
        document.removeEventListener("UnauthorizedEvent", 
            (evt) => new AuthService().logoutUnauthorizedUser(evt));
        document.removeEventListener("ForbiddenEvent", (evt) => {
            new AuthService().notifyForbiddenUser(evt);
            setTimeout(() => history.pushState(null, document.title, '/'), 1200);
        });
        // Views
        document.removeEventListener("toggleUIForUser", evt => {
            const isDisplayed = evt.detail.data;
            this.setBackgroundColor(isDisplayed);
            this.toggleNavbar(isDisplayed);
        });
    }

    // different if user is authenticated
    toggleNavbar(isDisplayed) {
        const navbarView = this.shadowRoot.querySelector(".navbar");
        // to figure this out
    }
}