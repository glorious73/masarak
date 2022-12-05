

import PasswordService from "../../Service/Auth/PasswordService";
import { Routes } from "../../config/Routes";
import AlertService from "../../Service/Alert/AlertService";

function markupTemplate() {
    const template = document.createElement('template');


template.innerHTML = /*html*/`
    <style>
   ${window.GlobalVariables.styles}
    </style>
    <div class="card-login" style="height: 100vh;">
        <div class="card-login-logo">
            <!--To change the image source-->
            <img src="${window.GlobalVariables.IMG_PATH}/masarak_logo_white.png" class="img-login"/>
        </div>
        <div class="card-login-form">
            <h1 class="card-login-title">نسيت كلمة السر؟</h2>
            <form action="" id="forgotPasswordForm">
                <div class="form-row">
                    <label for="email">البريد الالكتروني</label>
                    <input type="email" class="input-text input-text-border" id="email" name="email" required>
                </div>
                <div class="form-row">
                    <button type="submit" class="btn-form btn-form-border btn-submit" id="btnSubmit">
                        ارسال بريد استعادة كلمة السر
                    </button>
                </div>
            </form> 
            <div class="mt-2 d-flex flex-row justify-content-center">
                <a class="auth-link" href="#/login">تسجيل الدخول</a>
            </div>
        </div>  
    </div>
`;
return template;
}

export default class ForgotPasswordComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = markupTemplate();
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
        try {
            const result = await setTimeout(2000, () => console.log("emulate forgot password email."));
            this.alertService.showAlert("اشعار", "تم ارسال بريد الكتروني لك.");
            setTimeout(() => window.location = Routes.Login.path, 1000);
        }
        catch(err) {
            this.alertService.showAlert("Error", err.message);
        }
    }
}