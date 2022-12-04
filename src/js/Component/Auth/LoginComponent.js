

import AuthService from "../../Service/Auth/AuthService";
import AlertService from "../../Service/Alert/AlertService";

const template = document.createElement('template');

template.innerHTML = /*html*/`
    <style>
   ${window.GlobalVariables.styles}
    </style>
    <div class="card card-primary card-animation card-login">
        <div class="card-login-logo">
            <!--To change the image source-->
            <img src="${window.GlobalVariables.IMG_PATH}/hawkamah_logo_white.png" class="img-login"/>
        </div>
        <div class="card-login-form">
            <h1 class="card-login-title">Edama Tech</h2>
            <form action="" id="loginForm">
                <div class="form-row">
                    <label for="username">Username/Email address</label>
                    <input type="text" class="input-text input-text-border" id="username" name="username">
                </div>
                <div class="form-row">
                    <label for="password">Password</label>
                    <input type="password" class="input-text input-text-border" id="password" name="password">
                </div>
                <div class="form-row">
                    <button type="submit" class="btn-form btn-form-border btn-submit" id="btnSubmit">
                        LOGIN  
                    </button>
                </div>
            </form>
            <div class="mt-2 d-flex flex-row justify-content-center">
                <a class="auth-link" href="#/password/forgot">Forgot Password?</a>
            </div>
        </div>  
    </div>
`;

export default class LoginComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.alertService = new AlertService();
        this.shadowRoot.querySelector('#loginForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                this.shadowRoot.querySelector('#btnSubmit').setAttribute('disabled', '');
                await this.login(e);
            }
            finally {
                this.shadowRoot.querySelector('#btnSubmit').removeAttribute('disabled');
            }
        });
    }

    disconnectedCallback() {
        this.alertService = null;
    }

    async login(e) {
        e.preventDefault();
        const authService = new AuthService();
        try {
            // Login
            const user = await authService.login(e.target);
            // Reload w/ new user
            window.location.href = '#/dashboard';
            window.location.reload();
        }
        catch(err) {
            this.alertService.showAlert("Error", err.message);
        }
    }
}

window.customElements.define('app-login', LoginComponent);