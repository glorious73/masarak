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
                        <img class="navbar-brand-img" src="assets/img/masarak_logo.png" alt="Logo" />
                        مسارك
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
                    <a href="">الصفحة الرئيسية</a>
                    <a href="#/faqs">الأسئلة الشائعة</a>
                    <a href="#/contactus">تواصل معنا</a>
                    <a href="#/signup" class="hyperlink-nav-hide" id="btnRegisterActive">التسجيل
                    </a>
                    <a href="#/login" class="hyperlink-nav-hide" id="btnRegisterPrimary">تسجيل الدخول
                    </a>
                    <input type="checkbox" id="nav-dropdown">
                </div>
                <div class="nav-registration">
                    <a href="#/signup" class="hyperlink active" id="btnRegisterActive">التسجيل</a>
                    <a href="#/login" class="hyperlink primary" id="btnRegisterPrimary">تسجيل الدخول</a>
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
        document.addEventListener("userLoggedEvent", (e) => this.toggleNavbarRegistration(e));
        // Navbar button
        this.shadowRoot.querySelector('.nav-btn').addEventListener('click', 
            (e) => this.toggleNavbarButtonEvent(e));
    }

    disconnectedCallback() {
        document.removeEventListener("userLoggedEvent", (e) => this.toggleNavbarRegistration(e));
        this.shadowRoot.querySelector('.nav-btn').removeEventListener('click', 
            (e) => this.toggleNavbarButtonEvent(e));
    }

    // navbar button event
    toggleNavbarButtonEvent(e) {
        
    }

    toggleNavbarRegistration(e) {
        const state = e.detail.data;
        const btnActive = this.shadowRoot.querySelector("#btnRegisterActive");
        const btnPrimary = this.shadowRoot.querySelector("#btnRegisterPrimary");
        if(state == 'logged in') {            
            btnActive.innerHTML = 'الملف الشخصي';
            btnActive.setAttribute("href", '#/profile');
            btnPrimary.innerHTML = 'تسجيل الخروج';
            btnPrimary.setAttribute("href", '#');
            btnPrimary.addEventListener('click', (e) => this.logout());
        }
        else {
            btnActive.innerHTML = 'التسجيل';
            btnActive.setAttribute("href", '#/signup');
            btnPrimary.innerHTML = 'تسجيل الدخول';
            btnPrimary.setAttribute("href", '#/login');
            btnPrimary.removeEventListener('click', (e) => this.logout());
        }
    }

    logout() {
        document.dispatchEvent(new CustomEvent("userLoggedEvent", {
            detail: {
                data: "logged out"
            }
        }));
    }
}