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
                    <a onclick="history.pushState(null, document.title, '/')">الصفحة الرئيسية</a>
                    <a onclick="history.pushState(null, document.title, '/faqs')">الأسئلة الشائعة</a>
                    <a onclick="history.pushState(null, document.title, '/contactus')">تواصل معنا</a>
                    <a onclick="history.pushState(null, document.title, '/signup')" class="hyperlink-nav-hide" id="btnRegisterActiveSmall">التسجيل
                    </a>
                    <a onclick="history.pushState(null, document.title, '/login')" class="hyperlink-nav-hide" id="btnRegisterPrimarySmall">تسجيل الدخول
                    </a>
                    <input type="checkbox" id="nav-dropdown">
                </div>
                <div class="nav-registration">
                    <a onclick="history.pushState(null, document.title, '/signup')" class="hyperlink active" id="btnRegisterActive">التسجيل</a>
                    <a onclick="history.pushState(null, document.title, '/login')" class="hyperlink primary" id="btnRegisterPrimary">تسجيل الدخول
                    </a>
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
        const sroot = this.shadowRoot;
        sroot.querySelector('.nav-btn').addEventListener('click', 
            (e) => this.toggleNavbarButtonEvent(e));
        sroot.querySelector('.nav-items').addEventListener('click', (e) => {
            console.log(`nav items clicked`);
            sroot.querySelector('#nav-check').checked =  false;
        });
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
        const btnActiveSmall = this.shadowRoot.querySelector("#btnRegisterActiveSmall");
        const btnPrimarySmall = this.shadowRoot.querySelector("#btnRegisterPrimarySmall");
        if(state == 'logged in') {            
            btnActive.innerHTML = 'الملف الشخصي';
            btnActive.addEventListener("click", (e) =>  history.pushState(null, document.title, '/profile'));
            btnActiveSmall.innerHTML = 'الملف الشخصي';
            btnActiveSmall.addEventListener("click", (e) =>  history.pushState(null, document.title, '/profile'));
            btnPrimary.innerHTML = 'تسجيل الخروج';
            btnPrimary.addEventListener("click", (e) =>  this.logout());
            btnPrimarySmall.innerHTML = 'تسجيل الخروج';
            btnPrimarySmall.addEventListener("click", (e) =>   this.logout());
        }
        else {
            btnActive.innerHTML = 'التسجيل';
            btnActive.addEventListener("click", (e) =>  history.pushState(null, document.title, '/signup'));
            btnActiveSmall.innerHTML = 'التسجيل';
            btnActiveSmall.addEventListener("click", (e) =>  history.pushState(null, document.title, '/signup'));
            btnPrimary.innerHTML = 'تسجيل الدخول';
            btnPrimary.addEventListener("click", (e) =>  history.pushState(null, document.title, '/login'));
            btnPrimary.removeEventListener('click', (e) => this.logout());
            btnPrimarySmall.innerHTML = 'تسجيل الدخول';
            btnPrimarySmall.addEventListener("click", (e) =>  history.pushState(null, document.title, '/login'));
            btnPrimarySmall.removeEventListener('click', (e) => this.logout());
        }
    }

    logout() {
        document.dispatchEvent(new CustomEvent("userLoggedEvent", {
            detail: {
                data: "logged out"
            }
        }));
        history.pushState(null, document.title, '/');
    }
}