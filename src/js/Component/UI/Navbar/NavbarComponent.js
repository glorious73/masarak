import AuthService from "../../../Service/Auth/AuthService";

import UserMenuComponent from "../UserMenu/UserMenuComponent";


const template = document.createElement('template');

template.innerHTML = /*html*/`
    <style>
   ${window.GlobalVariables.styles}
    </style>
    <nav class="nav">
        <a class="nav-btn">
            <app-svg-icon data-icon="list" data-class="icon-navbar">
            </app-svg-icon>
        </a>
        <div class="nav-header">
            
        </div>
        <div class="nav-links">
            <app-user-menu></app-user-menu>
        </div>
    </nav>
`;

export default class NavbarComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        // Navbar button
        this.shadowRoot.querySelector('.nav-btn').addEventListener('click', 
            (e) => this.toggleNavbarButtonEvent(e));
    }

    disconnectedCallback() {

    }

    // navbar button event
    toggleNavbarButtonEvent(e) {
        document.dispatchEvent(new CustomEvent("toggleNavbarButtonEvent"));
    }
}

window.customElements.define('app-navbar', NavbarComponent);