import AuthService from "../../Service/Auth/AuthService";
import AlertService from "../../Service/Alert/AlertService";

function markupTemplate() {
    const template = document.createElement('template');


template.innerHTML = /*html*/`
    <style>
   ${window.GlobalVariables.styles}
    </style>
    <div class="card-login">
        <div class="card-login-logo">
            <!--To change the image source-->
            <img src="${window.GlobalVariables.IMG_PATH}/masarak_logo_white.png" class="img-login"/>
        </div>
        <div class="card-login-form">
            <h1 class="card-login-title">مستخدم جديد</h2>
            <form action="" id="signupForm">
                <div class="form-row">
                    <label for="username">الاسم الكامل</label>
                    <input type="text" class="input-text input-text-border" id="fullname" name="fullname" required>
                </div>
                <div class="form-row">
                    <label for="username">تاريخ الميلاد</label>
                    <input type="date" class="input-text input-text-border" id="age" name="age" required>
                </div>
                <div class="form-row form-row-two-fields">
                    <div class="form-row-field">
                        <label for="qodorat">درجة القدرات</label>
                        <input type="number" class="input-text input-text-border" id="qodorat" name="qodorat" required>
                    </div>
                    <div class="form-row-field">
                        <label for="tahsili">درجة التحصيلي</label>
                        <input type="number" class="input-text input-text-border" id="tahsili" name="tahsili" required>
                    </div>
                </div>
                <div class="form-row">
                    <label for="username">اسم المستخدم</label>
                    <input type="text" class="input-text input-text-border" id="username" name="username" required>
                </div>
                <div class="form-row">
                    <label for="username">البريد الالكتروني</label>
                    <input type="email" class="input-text input-text-border" id="email" name="email" required>
                </div>
                <div class="form-row">
                    <label for="username">نوع الحساب</label>
                    <app-select name="auditorId" data-theme="secondary" data-is-border="true" data-items='${JSON.stringify([{code: 'طالب', name:'طالب'}, {code: 'منسوب جامعة', name:'منسوب جامعة'}])}' data-key="code" data-value="name" form="addForm">
                    </app-select>
                </div>
                <div class="form-row">
                    <label for="password">كلمة المرور</label>
                    <input type="password" class="input-text input-text-border" id="password" name="password" required>
                </div>
                <div class="form-row">
                    <button type="submit" class="btn-form btn-form-border btn-submit" id="btnSubmit">
                        التسجيل   
                    </button>
                </div>
            </form>
        </div>
    </div>
`;
return template;
}

export default class SignupComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = markupTemplate();
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.alertService = new AlertService();
        this.shadowRoot.querySelector('#signupForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            try {
                this.shadowRoot.querySelector('#btnSubmit').setAttribute('disabled', '');
                await this.signup(e);
            }
            finally {
                this.shadowRoot.querySelector('#btnSubmit').removeAttribute('disabled');
            }
        });
    }

    disconnectedCallback() {
        this.alertService = null;
    }

    async signup(e) {
        try {
            // Login
            const user = await setTimeout(2000, () => console.log("emulate sign up"));
            this.alertService.showAlert("تم", "تم تسجيلك بنجاح");
            // Reload w/ new user
            window.location.href = '#/login';
        }
        catch(err) {
            this.alertService.showAlert("Error", err.message);
        }
    }
}