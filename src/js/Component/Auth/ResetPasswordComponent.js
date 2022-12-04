

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
            <h1 class="card-login-title">Reset Password</h2>
            <form action="" id="resetPasswordForm">
                <input type="hidden" id="token" name="passwordResetToken">
                <div class="form-row">
                    <label for="newPassword">New Password</label>
                    <input type="password" class="input-text input-text-border" id="newPassword" name="newPassword">
                </div>
                <div class="form-row">
                    <label for="confirmNewPassword">Confirm New Password</label>
                    <input type="password" class="input-text input-text-border" id="confirmNewPassword" name="confirmNewPassword">
                </div>
                <div class="form-row">
                    <button type="submit" class="btn-form btn-form-border btn-submit" id="btnSubmit">
                        RESET PASSWORD
                    </button>
                </div>
            </form>
            <div class="mt-2 d-flex flex-row justify-content-center">
                <a class="auth-link" href="#/login">Login</a>
            </div>
        </div>  
    </div>
`;

export default class ResetPasswordComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        // Service
        this.alertService = new AlertService();
        // Token
        this.setToken();
        // Event
        this.shadowRoot.querySelector('#resetPasswordForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            this.shadowRoot.querySelector('#btnSubmit').setAttribute('disabled', '');
            await this.resetPassword(e);
            this.shadowRoot.querySelector('#btnSubmit').removeAttribute('disabled');
        });
    }

    disconnectedCallback() {
        this.alertService = null;
    }

    setToken() {
        const query = window.location.toString().split("?")[1];
        const token = (query) ? query.split("=")[1] : null;
        if(!token) {
            this.alertService.showAlert('Error', 'There is no user token.');
            setTimeout(() => window.location = '', 2000);
        }
        this.shadowRoot.querySelector('#token').value = token;
    }

    async resetPassword(e) {
        e.preventDefault();
        const passwordService = new PasswordService();
        try {
            const result = await passwordService.resetPassword(e.target);
            this.alertService.showAlert("Information", result.message);
            setTimeout(() => window.location = Routes.Login.path, 1000);
        }
        catch(err) {
            this.alertService.showAlert("Error", err.message);
        }
    }
}

window.customElements.define('app-reset-password', ResetPasswordComponent);