
import CRUDService from "../../../Service/CRUD/CRUDService";
import AlertService from "../../../Service/Alert/AlertService";

const template = document.createElement('template');

template.innerHTML = /*html*/`
    <style>
   ${window.GlobalVariables.styles}
    </style>
    <form class="form-search" id="searchForm">
        <div class="search-wrapper">
            <!--Submit-->
            <button type="submit" class="btn-search" id="btnSubmit">
                <app-svg-icon data-icon="search" data-class="icon-small">
</app-svg-icon>
            </button>
            <!--Search input-->
            <input type="text" class="input-text-search" id="searchBar">
        </div>
    </form>
`;

export default class SearchComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        // Services
        this.alertService = new AlertService();
        // Shadow root
        const sroot = this.shadowRoot;
        const searchWrapper = sroot.querySelector('.search-wrapper');
        // Style
        const theme = this.getAttribute('data-theme');
        sroot.querySelector('.form-search').classList.add(`form-search-${theme || 'primary'}`);
        searchWrapper.classList.add(`search-wrapper-${theme || 'primary'}`);
        // Border
        const isSearchBorder = this.getAttribute("data-is-border");
        if(isSearchBorder == "true")
            searchWrapper.classList.add(`search-wrapper-border`);
        // Search bar
        const searchBar = sroot.querySelector("#searchBar");
        // search name
        const name = this.getAttribute("data-name");
        searchBar.setAttribute("name", name);
        // attributes
        this.apiEndpoint   = this.getAttribute('data-api-endpoint');
        this.responseItem  = this.getAttribute('data-response-item');
        this.searchEvent   = this.getAttribute('data-search-event');
        // placeholder
        const placeholder = this.getAttribute('data-placeholder');
        if(placeholder)
            searchBar.setAttribute("placeholder", placeholder);
        // Initial load
        const isDisplayItem = this.getAttribute('data-is-display-item');
        if(isDisplayItem == "true") {
            const item = (localStorage.getItem(this.responseItem)) ? JSON.parse(localStorage.getItem(this.responseItem)) : null;
            if(item)
                this.shadowRoot.querySelector('#searchBar').value = Object.values(item)[0];
        }
        // form
        this.shadowRoot.querySelector("#searchForm").addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.search(evt);
        });
    }

    disconnectedCallback() {
        this.alertService = null;
    }

    async search(e) {
        const crudService = new CRUDService();
        try {
            // Get item
            const result  = await crudService.getItemsForm(this.apiEndpoint, e.target);
            // Save in local storage
            localStorage.setItem(this.responseItem, JSON.stringify(result[this.responseItem]));
            // Fire an event
            document.dispatchEvent(new CustomEvent(this.searchEvent, {
                detail: {
                    data: result[this.responseItem]
                }
            }));
        }
        catch(err) {
           this.alertService.showAlert("Error", err.message);
        }
    }
}

window.customElements.define('app-search', SearchComponent);