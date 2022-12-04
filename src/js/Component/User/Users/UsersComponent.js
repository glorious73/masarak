
import CRUDService from "../../../Service/CRUD/CRUDService";
import AlertService from "../../../Service/Alert/AlertService";

import TableComponent from "../../UI/Table/TableComponent";
import PaginationComponent from "../../UI/Pagination/PaginationComponent";
import SearchComponent from "../../UI/Search/SearchComponent";

const template = document.createElement('template');

template.innerHTML = /*html*/`
    <style>
   ${window.GlobalVariables.styles}
    </style>
    <div class="px-2 mb-2">
        <h1 class="mt-1 mb-2">Users Management</h1>
        <div class="ui-table-header">
            <app-search class="ui-table-header-item" data-name="searchQuery" data-theme="primary" data-is-border="true" data-placeholder="Email Address" data-api-endpoint="/api/user" data-search-event="userSearchEvent" data-response-item="user" data-is-display-item="false">
            </app-search>
            <div class="ui-table-header-item ui-table-header-actions">
                <a class="btn-action btn-action-primary" id="btnExport">
                    <app-svg-icon data-icon="file-spreadsheet-fill" data-class="icon-action icon-action-fill">
</app-svg-icon>
                    Export
                </a>
                <a class="btn-action btn-action-secondary" href="#/user/form">
                    <app-svg-icon data-icon="person-plus" data-class="icon-action">
</app-svg-icon>
                    Add
                </a>
            </div>
        </div>
        <!-- Table -->
        <app-table class="mt-1 mb-3" data-theme="secondary" data-event="usersLoadedEvent" data-update-event="usersUpdatedEvent" data-actions="edit,delete" data-item-name="User" data-api-endpoint="/api/account" data-response-result="user" data-response-message="message" data-edit-path="#/user/edit" data-delete-reload="true"></app-table>
        <!-- Pagination -->
        <app-pagination data-theme="secondary" data-api-endpoint="/api/user" data-api-result="users" data-event="userPagesEvent" data-update-event="usersUpdatedEvent">
        </app-pagination>
    </div>
`;

export default class UsersComponent extends HTMLElement {
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
        this.loadUsers();
        // events
        const btnExport = this.shadowRoot.querySelector("#btnExport");
        btnExport.addEventListener('click', async (e) => {
            e.preventDefault();
            btnExport.classList.add("disabled");
            await this.exportUsers();
            btnExport.classList.remove('disabled');
        });
    }

    disconnectedCallback() {
        this.crudService = null;
        this.alertService = null;
    }

    async loadUsers() {
        try {
            const pagination = { pageNumber: 1, pageSize: 10 };
            const result = await this.crudService.getItems('/api/account', pagination);
            // table
            document.dispatchEvent(new CustomEvent("usersLoadedEvent", {
                detail: {
                    data: result.users,
                    hiddenFields: 'id'
                }
            }));
            // pagination
            document.dispatchEvent(new CustomEvent("userPagesEvent", {
                detail: {
                    data: result,
                }
            }));
        }
        catch(err) {
            this.alertService.showAlert("Error", err.message);
        }
    }

    async exportUsers() {
        try {
            const result = await this.crudService.exportItems('/api/account', 100, 'users', `Hawkamah Users ${new Date().toISOString().split("T")[0]}`);
            if(result < 0)
                this.alertService.showAlert("Information", "No items to export.");
        }
        catch(err) {
            this.alertService.showAlert("Error", err.message);
        }
    }
}

window.customElements.define('app-users', UsersComponent);