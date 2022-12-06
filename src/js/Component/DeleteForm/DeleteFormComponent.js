
import CRUDService from "../../Service/CRUD/CRUDService";
import AlertService from "../../Service/Alert/AlertService";

function markupTemplate() {
    const template = document.createElement('template');


template.innerHTML = /*html*/`
    <style>
   ${window.GlobalVariables.styles}
    </style>
    <h1 class="p-3">Are you sure you want to delete the <span id="item"></span> record?</h5>
    <form id="deleteForm">
        <div class="d-flex flex-row align-items-center justify-content-center">
            <button type="button" class="btn-form btn-cancel mx-2">No</button>
            <button type="submit" class="btn-form btn-submit mx-2" id="btnSubmit">Yes</button>
        </div>
    </form>
`;
return template;
}

export default class DeleteFormComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = markupTemplate();
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const sroot = this.shadowRoot;
        // Attributes
        this.apiEndpoint      = this.getAttribute('data-api-endpoint');
        this.itemId           = this.getAttribute('data-item-id');
        this.responseResult   = this.getAttribute('data-response-result');
        this.isModalClose     = this.getAttribute('data-is-modal-close');
        this.dataDeleteReload = this.getAttribute('data-delete-reload');
        // Item
        this.item = this.getAttribute('data-item-name');
        sroot.querySelector('#item').innerHTML = this.item;
        // service
        this.alertService = new AlertService();
        // Delete form
        sroot.querySelector('#deleteForm').addEventListener('submit', async (evt) => {
            evt.preventDefault();
            this.shadowRoot.querySelector('#btnSubmit').setAttribute('disabled', '');
            await this.deleteItem(evt);
            this.shadowRoot.querySelector('#btnSubmit').removeAttribute('disabled');
        });
    }

    disconnectedCallback() {
        this.alertService = null;
    }

    async deleteItem(evt) {
        const crudService = new CRUDService();
        try {
            const result = await crudService.deleteItem(this.apiEndpoint, this.itemId); 
            this.alertService.showAlert("Success", result[this.responseResult]);
            if(this.isModalClose && this.isModalClose == 'true')
                document.dispatchEvent(new CustomEvent('hideModalEvent'));
            if(this.dataDeleteReload && this.dataDeleteReload == 'true')
                setTimeout(() => window.location.reload(), 2000);
        }
        catch(err) {
            this.alertService.showAlert('Error', err);
            document.dispatchEvent(new CustomEvent('hideModalEvent'));
        }
    }
}