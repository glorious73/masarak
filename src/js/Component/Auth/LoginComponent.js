

import AuthService from "../../Service/Auth/AuthService";
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
            <h1 class="card-login-title">تسجيل الدخول</h2>
            <form action="" id="loginForm">
                <div class="form-row">
                    <label for="username">اسم المستخدم/البريد الالكتروني</label>
                    <input type="text" class="input-text input-text-border" id="username" name="username" required>
                </div>
                <div class="form-row">
                    <label for="password">كلمة المرور</label>
                    <input type="password" class="input-text input-text-border" id="password" name="password" required>
                </div>
                <div class="form-row">
                    <button type="submit" class="btn-form btn-form-border btn-submit" id="btnSubmit">
                        تسجيل الدخول  
                    </button>
                </div>
            </form>
            <div class="mt-2 d-flex flex-row justify-content-center">
                <a class="auth-link" href="#/password/forgot">نسيت كلمة السر؟</a>
            </div>
        </div>
    </div>
`;
return template;
}

export default class LoginComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = markupTemplate();
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