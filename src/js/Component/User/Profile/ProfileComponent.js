import UIService from "../../../Service/UI/UIService";



function markupTemplate() {
    const template = document.createElement('template');


template.innerHTML = /*html*/`
    <style>
   ${window.GlobalVariables.styles}
    </style>
    <div class="card card-primary card-active-border p-2 m-2">
        <div class="d-flex flex-row justify-content-start align-items-center mb-2">
            <h2>
            <app-svg-icon data-icon="person" data-class="icon icon-small">
            </app-svg-icon>
            الملف الشخصي
            </h2>
        </div>
        <div class="customer-form mb-2">
            <div class="customer-form-field">
                <h4 class="customer-field-label">الاسم الأول</h4>
                <input type="text" class="input-text input-text-border" id="firstName" value="احمد" disabled>
            </div>
            <div class="customer-form-field">
                <h4 class="customer-field-label">الاسم الأخير</h4>
                <input type="text" class="input-text input-text-border" id="lastName" value="محمد" disabled>
            </div>
            <div class="customer-form-field">
                <h4 class="customer-field-label">اسم المستخدم</h4>
                <input type="text" class="input-text input-text-border" id="username" value="ahmad" disabled>
            </div>
            <div class="customer-form-field">
                <h4 class="customer-field-label">البريد الإلكتروني</h4>
                <input type="text" class="input-text input-text-border" id="email" value="ahmad@email.com" disabled>
            </div>
            <div class="customer-form-field">
                <h4 class="customer-field-label">العمر</h4>
                <input type="text" class="input-text input-text-border" id="phoneNumber" value="17 سنة" disabled>
            </div>
            <div class="customer-form-field">
                <h4 class="customer-field-label">نوع الحساب</h4>
                <input type="text" class="input-text input-text-border" id="Role" value="طالب" disabled>
            </div>
        </div>
    </div>
`;
return template;
}

export default class ProfileComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = markupTemplate();
this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        // service
        this.uiService = new UIService();
        // Data binding
        //this.uiService.dataBindElements(this,"input&--&value");
        // load user
        //const user = JSON.parse(localStorage.getItem("user"));
        //this.updateUserInformation(user);
    }

    disconnectedCallback() {

    }

    updateUserInformation(user) {
        for(const [key, value] of Object.entries(user)) {
            if(this[key] && this[key].change)
                this[key].change(value);
        }
        // Role special case since keyword
        this.Role.change(user.role);
    }
}