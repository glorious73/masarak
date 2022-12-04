

import PasswordService from "../../Service/Auth/PasswordService";
import { Routes } from "../../config/Routes";
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
            <h1 class="card-login-title">Forgot Password?</h2>
            <form action="" id="forgotPasswordForm">
                <div class="form-row">
                    <label for="email">Email address</label>
                    <input type="email" class="input-text input-text-border" id="email" name="email">
                </div>
                <div class="form-row">
                    <button type="submit" class="btn-form btn-form-border btn-submit" id="btnSubmit">
                        SEND EMAIL
                    </button>
                </div>
            </form> 
            <div class="mt-2 d-flex flex-row justify-content-center">
                <a class="auth-link" href="#/login">Login</a>
            </div>
        </div>  
    </div>
`;

export default class ForgotPasswordComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.alertService = new AlertService();
        this.shadowRoot.querySelector('#forgotPasswordForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            this.shadowRoot.querySelector('#btnSubmit').setAttribute('disabled', '');
            await this.sendResetPasswordEmail(e);
            this.shadowRoot.querySelector('#btnSubmit').removeAttribute('disabled');
        });
    }

    disconnectedCallback() {
        this.alertService = null;
    }

    async sendResetPasswordEmail(e) {
        e.preventDefault();
        const passwordService = new PasswordService();
        try {
            const result = await passwordService.sendResetPasswordEmail(e.target);
            this.alertService.showAlert("Information", result.message);
            setTimeout(() => window.location = Routes.Login.path, 1000);
        }
        catch(err) {
            this.alertService.showAlert("Error", err.message);
        }
    }
}

window.customElements.define('app-forgot-password', ForgotPasswordComponent);