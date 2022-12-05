
import ModalComponent from "../Modal/ModalComponent";

function markupTemplate() {
    const template = document.createElement('template');


template.innerHTML = /*html*/`
    <style>
   ${window.GlobalVariables.styles}
    </style>
    <table class="ui-table">
        <thead id="tableHead">
        </thead>
        <tbody id="tableBody">
            
        </tbody>
    </table>
    <div class="ui-table-no-data">
        <h1>No Data</h1>
    </div>
    <app-modal class="app-modal"></app-modal>
`;
return template;
}

export default class TableComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = markupTemplate();
this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        // Theme
        const tableElement = this.shadowRoot.querySelector('.ui-table');
        const tableTheme   = this.getAttribute("data-theme");
        tableElement.classList.add(`ui-table-${tableTheme || 'primary'}`);
        // Actions
        const actions = this.getAttribute("data-actions");
        this.isActionable   = (actions != null && actions != undefined);
        if(this.isActionable) {
            this.isViewAction   = actions.includes("view");
            this.isEditAction   = actions.includes("edit");
            this.isDeleteAction = actions.includes("delete");
        }
        // flags
        this.isHeaderPopulated = false;
        // Events
        this.tableEvent = this.getAttribute("data-event");
        document.addEventListener(this.tableEvent, (evt) => {
            const data = evt.detail.data;
            if(data && data.length > 0)
                this.populateTable(evt);
            else
                this.shadowRoot.querySelector('.ui-table-no-data').classList.add("show");
        });
        this.updateEvent = this.getAttribute("data-update-event");
        document.addEventListener(this.updateEvent, (evt) => {
            const data = evt.detail.data;
            if(data && data.length > 0)
                this.populateTable(evt);
        });
    }

    disconnectedCallback() {
        document.removeEventListener(this.tableEvent, (evt) => {
            const data = evt.detail.data;
            if(data && data.length > 0)
                this.populateTable(evt);
            else
                this.shadowRoot.querySelector('.ui-table-no-data').classList.add("show");
        });
        document.removeEventListener(this.updateEvent, (evt) => {
            const data = evt.detail.data;
            if(data && data.length > 0)
                this.populateTable(evt);
        });
    }

    populateTable(evt) {
        if(!this.hiddenFields)
            this.hiddenFields = (evt.detail.hiddenFields) 
                        ? evt.detail.hiddenFields.split(",") 
                        : "";
        if(!this.isHeaderPopulated) {
            // Remove "No Data" and populate headers
            this.shadowRoot.querySelector('.ui-table-no-data').classList.remove("show");
            this.populateHeader(evt);
            this.isHeaderPopulated = true;
        }
        this.populateBody(evt);
        this.addActionEvents();
    }

    populateHeader(evt) {
        const data  = evt.detail.data;
        const headers = Object.keys(data[0]);
        const thead = this.shadowRoot.querySelector('#tableHead');
        let tableHead = '<tr>';
        for(const header of headers)
            tableHead += (!this.hiddenFields.includes(header)) 
                    ? `<th scope="col">${header}</th>` 
                    : ``;
        tableHead += (this.isActionable) ? `<th scope="col">Actions</th>` : ``;
        tableHead += `</tr>`;
        thead.innerHTML = tableHead;
    }

    populateBody(evt) {
        const tbody = this.shadowRoot.querySelector('#tableBody');
        const data = evt.detail.data;
        let tableBody = '';
        for(const item of data) {
            tableBody += '<tr class="ui-table-tr">';
            for(const [key, value] of Object.entries(item))
                tableBody += (!this.hiddenFields.includes(key)) ? `<td scope="row" data-label="${key.toUpperCase()}" class="wrap-table-text">${value || "&nbsp;"}</td>` : ``;
            if(this.isActionable)
                tableBody += this.populateActionsInRow(item.id);
            tableBody += '</tr>';
        }
        tbody.innerHTML = tableBody;
    }

    populateActionsInRow(dataId) {
        let actions = '<div class="ui-table-actions">';
        if(this.isViewAction)
            actions += 
            `<app-svg-icon class="table-view-action" data-icon="eye" data-class="icon-small table-view-action" id="view-${dataId}">
            </app-svg-icon>`;
        if(this.isEditAction)
            actions += 
            `<app-svg-icon class="table-edit-action" data-icon="pencil-square" data-class="icon-small table-edit-action" id="edit-${dataId}">
            </app-svg-icon>`;
        if(this.isDeleteAction)
            actions += 
            `<app-svg-icon class="table-delete-action" data-icon="x-square" data-class="icon-small table-delete-action" id="delete-${dataId}">
            </app-svg-icon>`;
        actions += '</div>';
        return `<td scope="row" data-label="Actions" class="wrap-table-text">${actions}</td>`;
    }

    addActionEvents() {
        if(this.isViewAction)
            this.shadowRoot.querySelectorAll('.table-view-action').forEach((element) => {
                element.addEventListener('click', (evt) => this.viewItem(evt));
            });
        if(this.isEditAction)
            this.shadowRoot.querySelectorAll('.table-edit-action').forEach((element) => {
                element.addEventListener('click', (evt) => this.editItem(evt));
            });
        if(this.isDeleteAction)
            this.shadowRoot.querySelectorAll('.table-delete-action').forEach((element) => {
                element.addEventListener('click', (evt) => this.deleteItem(evt));
            });
    }

    viewItem(evt) {
        const viewLink  = this.getAttribute('data-view-path');
        const id        = evt.target.id.split("-")[1] || evt.target.parentElement.id.split("-")[1];
        window.location = `${viewLink}/${id}`;
    }

    editItem(evt) {
        const editLink = this.getAttribute('data-edit-path');
        const id       = evt.target.id.split("-")[1] || evt.target.parentElement.id.split("-")[1];
        window.location = `${editLink}/${id}`;
    }

    deleteItem(evt) {
        const item             = this.getAttribute('data-item-name');
        const id               = evt.target.id.split("-")[1] || evt.target.parentElement.id.split("-")[1];
        const deleteEndpoint   = this.getAttribute('data-api-endpoint');
        const responseMessage  = this.getAttribute('data-response-message');
        const dataDeleteReload = this.getAttribute('data-delete-reload');
        document.dispatchEvent(new CustomEvent('showModalEvent', {
            detail: {
                title: `Delete ${item}`,
                body: `<app-delete-form data-item-name="${item}" data-item-id="${id}" data-api-endpoint="${deleteEndpoint}" data-response-result="${responseMessage}" data-is-modal-close="true" data-delete-reload="${dataDeleteReload}">
                </app-delete-form>`,
                caption: ''
            }
        }));
    }
}