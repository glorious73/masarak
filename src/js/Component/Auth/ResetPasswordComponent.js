

import PasswordService from "../../Service/Auth/PasswordService";
import { Routes } from "../../config/Routes";
import AlertService from "../../Service/Alert/AlertService";

function markupTemplate() {
    const template = document.createElement('template');


template.innerHTML = /*html*/`
    <style>
   ${window.GlobalVariables.styles}
    </style>
    <div class="card-login fade-in">
        <div class="card-login-logo">
            <!--To change the image source-->
            <img src="${window.GlobalVariables.IMG_PATH}/masarak_logo_white.png" class="img-login"/>
        </div>
        <div class="card-login-form">
            <h1 class="card-login-title">استعادة كلمة السر</h2>
            <form action="" id="resetPasswordForm">
                <input type="hidden" id="token" name="passwordResetToken">
                <div class="form-row">
                    <label for="newPassword">كلمة السر الجديدة</label>
                    <input type="password" class="input-text input-text-border" id="newPassword" name="newPassword">
                </div>
                <div class="form-row">
                    <label for="confirmNewPassword">تأكيد كلمة السر الجديدة</label>
                    <input type="password" class="input-text input-text-border" id="confirmNewPassword" name="confirmNewPassword">
                </div>
                <div class="form-row">
                    <button type="submit" class="btn-form btn-form-border btn-submit" id="btnSubmit">
                        استعادة كلمة السر
                    </button>
                </div>
            </form>
            <div class="mt-2 d-flex flex-row justify-content-center">
                <a class="auth-link" onclick="history.pushState({}, '', '/login')">تسجيل الدخول</a>
            </div>
        </div>  
    </div>
`;
return template;
}

export default class ResetPasswordComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = markupTemplate();
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
            setTimeout(() => history.pushState({}, '', '/'), 2000);
        }
        this.shadowRoot.querySelector('#token').value = token;
    }

    async resetPassword(e) {
        e.preventDefault();
        const passwordService = new PasswordService();
        try {
            const result = await passwordService.resetPassword(e.target);
            this.alertService.showAlert("Information", result.message);
            setTimeout(() => history.pushState({}, '', '/login'), 1000);
        }
        catch(err) {
            this.alertService.showAlert("Error", err.message);
        }
    }
}