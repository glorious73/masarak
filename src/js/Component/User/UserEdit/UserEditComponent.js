import CRUDService from "../../../Service/CRUD/CRUDService";
import AlertService from "../../../Service/Alert/AlertService";
import UIService from "../../../Service/UI/UIService";
import PathUtil from "../../../Util/PathUtil";

import { Routes } from "../../../config/Routes";


import SelectComponent from "../../UI/Select/SelectComponent";

const template = document.createElement('template');

template.innerHTML = /*html*/`
    <style>
   ${window.GlobalVariables.styles}
    </style>
    <div class="card card-primary p-3 m-2">
        <h1 class="text-center" id="editHeader"></h1>
        <form action="" id="editForm">
            <div class="form-row form-row-two-fields">
                <div class="form-row-field">
                    <label for="firstName">First name</label>
                    <input type="text" class="input-text input-text-border" id="firstName" name="firstName">
                </div>
                <div class="form-row-field">
                    <label for="lastName">Last Name</label>
                    <input type="text" class="input-text input-text-border" id="lastName" name="lastName">
                </div>
            </div>
            <div class="form-row">
                <label for="username">Username</label>
                <input type="text" class="input-text input-text-border" id="username" name="username">
            </div>
            <div class="form-row">
                <label for="email">Email Address</label>
                <input type="email" class="input-text input-text-border" id="email" name="email">
            </div>
            <div class="form-row">
                <label for="phoneNumber">Phone number</label>
                <input type="text" class="input-text input-text-border" id="phoneNumber" name="phoneNumber">
            </div>
            <div class="form-row" id="roleSelect">
                <label for="roleCode">Role</label>
            </div>
            <div class="form-row">
                <button type="submit" class="btn-form btn-form-border btn-submit" id="btnSubmit">
                    Edit
                </button>
            </div>
        </form> 
    </div>  
`;

export default class UserEditComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    async connectedCallback() {
        // objects
        this.crudService = new CRUDService();
        this.alertService = new AlertService();
        this.uiService = new UIService();
        this.pathUtil = new PathUtil();
        // functions
        this.uiService.dataBindElements(this,"input&--&value");
        this.id = this.pathUtil.loadId();
        const user = await this.loadUser();
        await this.loadRoles(user.role);
        // Edit form
        this.shadowRoot.querySelector('#editHeader').innerHTML = `Edit - ${user.firstName} ${user.lastName}`;
        this.shadowRoot.querySelector('#editForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            this.shadowRoot.querySelector('#btnSubmit').setAttribute('disabled', '');
            await this.editUser(e);
            this.shadowRoot.querySelector('#btnSubmit').removeAttribute('disabled');
        });
    }

    disconnectedCallback() {
        this.crudService = null;
        this.alertService = null;
        this.pathUtil = null;
    }

    async loadUser(e) {
        try {
            const { user } = await this.crudService.getItemById('/api/account', this.id);
            for(const [key, value] of Object.entries(user)) {
                if(this[key] && this[key].change)
                    this[key].change(value);
            }
            return user;
        }
        catch(err) {
           this.alertService.showAlert("Error", err.message);
        }
    }

    async editUser(e) {
        try {
            const { user } = await this.crudService.editItem('/api/account', this.id, e.target);
            this.alertService.showAlert("Success", `${user.firstName} ${user.lastName} was edited successfully.`);
            window.location = Routes.Users.path;
        }
        catch(err) {
           this.alertService.showAlert("Error", err.message);
        }
    }

    async loadRoles(selectedRole) {
        try {
            const { roles } = await this.crudService.getItems('/api/role', null);
            // add roles to dropdown
            const roleSelect = this.shadowRoot.querySelector("#roleSelect");
            // When passing stringified data
            // surround it with single quotes
            roleSelect.innerHTML += `
                    <app-select name="roleCode" data-theme="secondary" data-is-border="true" data-items='${JSON.stringify(roles)}' data-key="name" data-value="code" data-selected-item-key="${selectedRole}"></app-select>
                `;
        }
        catch(err) {
            this.alertService.showAlert("Error", err.message);
        }
    }
}

window.customElements.define('app-user-edit', UserEditComponent);