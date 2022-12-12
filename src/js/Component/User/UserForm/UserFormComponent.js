import CRUDService from "../../../Service/CRUD/CRUDService";
import AlertService from "../../../Service/Alert/AlertService";

import { Routes } from "../../../config/Routes";

import SelectComponent from "../../UI/Select/SelectComponent";


function markupTemplate() {
    const template = document.createElement('template');


template.innerHTML = /*html*/`
    <style>
   ${window.GlobalVariables.styles}
    </style>
    <div class="card card-primary p-3 m-2">
        <h1 class="text-center">User Form</h1>
        <form action="" id="addForm">
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
                <label for="phoneNumber">Phone Number</label>
                <input type="text" class="input-text input-text-border" id="phoneNumber" name="phoneNumber">
            </div>
            <div class="form-row" id="roleSelect">
                <label for="roleCode">Role</label>
            </div>
            <div class="form-row">
                <button type="submit" class="btn-form btn-form-border btn-submit" id="btnSubmit">
                        Add
                </button>
            </div>
        </form> 
    </div>  
`;
return template;
}

export default class UserFormComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = markupTemplate();
this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    async connectedCallback() {
        // objects
        this.crudService = new CRUDService();
        this.alertService = new AlertService();
        // functions
        await this.loadRoles();
        // Add form
        this.shadowRoot.querySelector('#addForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            this.shadowRoot.querySelector('#btnSubmit').setAttribute('disabled', '');
            await this.addUser(e);
            this.shadowRoot.querySelector('#btnSubmit').removeAttribute('disabled');
        });
    }

    disconnectedCallback() {
        this.crudService = null;
        this.alertService = null;
    }

    async addUser(e) {
        try {
            // to add select value
            const { user } = await this.crudService.addItem('/api/account', e.target);
            this.alertService.showAlert("Success", `${user.firstName} ${user.lastName} was added successfully.`);
            history.pushState(null, document.title, Routes.Users.path);
        }
        catch(err) {
           this.alertService.showAlert("Error", err.message);
        }
    }

    async loadRoles() {
        try {
            const { roles } = await this.crudService.getItems('/api/role', null);
            // add roles to dropdown
            const roleSelect = this.shadowRoot.querySelector("#roleSelect");
            // When passing stringified data
            // surround it with single quotes
            roleSelect.innerHTML += `
                    <app-select name="roleCode" data-theme="secondary" data-is-border="true" data-items='${JSON.stringify(roles)}' data-key="name" data-value="code"></app-select>
                `;
        }
        catch(err) {
            this.alertService.showAlert("Error", err.message);
        }
    }
}