import AuthService from "../../../Service/Auth/AuthService";

import UserMenuComponent from "../UserMenu/UserMenuComponent";


function markupTemplate() {
    const template = document.createElement('template');
    template.innerHTML = /*html*/`
        <style>
    ${window.GlobalVariables.styles}
        </style>
        <header>
            <div class="nav nav-box-shadow">
            <input type="checkbox" id="nav-check">
            <div class="nav-header">
                <div class="nav-title">
                    <!--Googled Randomly-->
                    <img class="navbar-brand-img" src="assets/img/masarak_logo.png" alt="Logo" />
                </div>
            </div>
            <div class="nav-btn">
                <label for="nav-check">
                    <span></span>
                    <span></span>  
                    <span></span>
                </label>
            </div>
            <div class="nav-items">
                <a href="#">Home</a>
                <a href="#">Services</a>
                <a href="#">Contact</a>
                <input type="checkbox" id="nav-dropdown">
                <label for="nav-dropdown">Admin+</label>
                <ul class="nav-dropdown-list">
                    <li><a href="#">Dashbord</a></li>
                    <li><a href="#">Logout</a></li>
                </ul>
            </div>
        </div>
        </header>
    `;
    return template;
}

export default class NavbarComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = markupTemplate();
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        // Navbar button
        this.shadowRoot.querySelector('.nav-btn').addEventListener('click', 
            (e) => this.toggleNavbarButtonEvent(e));
    }

    disconnectedCallback() {
        this.shadowRoot.querySelector('.nav-btn').removeEventListener('click', 
            (e) => this.toggleNavbarButtonEvent(e));
    }

    // navbar button event
    toggleNavbarButtonEvent(e) {
        
    }
}