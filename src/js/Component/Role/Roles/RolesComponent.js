
import CRUDService from "../../../Service/CRUD/CRUDService"; 
import AlertService from "../../../Service/Alert/AlertService";

import TableComponent from "../../UI/Table/TableComponent";
import PaginationComponent from "../../UI/Pagination/PaginationComponent";
import ExportService from "../../../Service/Export/ExportService";

const template = document.createElement('template');

template.innerHTML = /*html*/`
    <style>
   ${window.GlobalVariables.styles}
    </style>
    <div class="px-2 mb-2">
        <h1 class="mt-1 mb-2">Role Management</h1>
        <div class="ui-table-header">
            <app-search class="ui-table-header-item" data-name="searchQuery" data-theme="primary" data-is-border="true" data-placeholder="Role Name" data-api-endpoint="/api/role" data-search-event="roleSearchEvent" data-response-item="role" data-is-display-item="false">
            </app-search>
            <div class="ui-table-header-item ui-table-header-actions">
                <a class="btn-action btn-action-primary" id="btnExport">
                    <app-svg-icon data-icon="file-spreadsheet-fill" data-class="icon-action icon-action-fill">
</app-svg-icon>
                    Export
                </a>
                <a class="btn-action btn-action-secondary" href="#/role/form">
                    <app-svg-icon data-icon="plus-circle" data-class="icon-action">
</app-svg-icon>
                    Add
                </a>
            </div>
        </div>
        <!-- Table -->
        <app-table class="mt-1 mb-3" data-theme="secondary" data-event="rolesLoadedEvent" data-update-event="rolesUpdatedEvent" data-actions="edit,delete" data-item-name="Role" data-api-endpoint="/api/role" data-response-result="role" data-response-message="message" data-edit-path="#/role/edit" data-delete-reload="true"></app-table>
        <!-- Pagination -->
        <app-pagination data-theme="secondary" data-api-endpoint="/api/role" data-api-result="roles" data-event="rolePagesEvent" data-update-event="rolesUpdatedEvent">
        </app-pagination>
    </div>
`;

export default class RolesComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        // services
        this.crudService = new CRUDService();
        this.alertService = new AlertService();
        // component
        this.loadRoles();
        // events
        // events
        const btnExport = this.shadowRoot.querySelector("#btnExport");
        btnExport.addEventListener('click', async (e) => {
            e.preventDefault();
            btnExport.classList.add("disabled");
            await this.exportRoles();
            btnExport.classList.remove('disabled');
        });
    }

    disconnectedCallback() {
        this.crudService = null;
        this.alertService = null;
    }

    async loadRoles() {
        try {
            const pagination = { pageNumber: 1, pageSize: 10 };
            const result = await this.crudService.getItems('/api/role', pagination);
            // table
            document.dispatchEvent(new CustomEvent("rolesLoadedEvent", {
                detail: {
                    data: result.roles,
                    hiddenFields: 'id'
                }
            }));
            // pagination
            document.dispatchEvent(new CustomEvent("rolePagesEvent", {
                detail: {
                    data: result,
                }
            }));
            
        }
        catch(err) {
            this.alertService.showAlert("Error", err.message);
        }
    }


    async exportRoles() {
        try {
            const result = await this.crudService.exportItems('/api/role', 100, 'roles', `Hawkamah Roles ${new Date().toISOString().split("T")[0]}`);
            if(result < 0)
                this.alertService.showAlert("Information", "No items to export.");
        }
        catch(err) {
            this.alertService.showAlert("Error", err.message);
        }
    }
}

window.customElements.define('app-roles', RolesComponent);