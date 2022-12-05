import CRUDService from "../../../Service/CRUD/CRUDService";

import AlertService from "../../../Service/Alert/AlertService";

function markupTemplate() {
    const template = document.createElement('template');


template.innerHTML = /*html*/`
    <style>
   ${window.GlobalVariables.styles}
    </style>
    <ul class="page-list">
        <!-- Previous -->
        <li id="previous">
            <
        </li>
        <!-- Pages (to render) -->
        
        <!-- Next -->
        <li id="next">
            >
        </li>
    </ul>
`;
return template;
}

export default class PaginationComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = markupTemplate();
this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        // theme
        const pageElement = this.shadowRoot.querySelector('.page-list');
        const pageTheme   = this.getAttribute("data-theme");
        pageElement.classList.add(`page-list-${pageTheme || 'primary'}`);
        // services
        this.crudService         = new CRUDService();
        this.alertService = new AlertService();
        // data
        this.apiEndpoint = this.getAttribute("data-api-endpoint");
        this.apiResult   = this.getAttribute("data-api-result");
        // pages
        this.pageNumber = 1;
        this.pageSize   = this.getAttribute("data-page-size") || 10;
        // event
        this.pageEvent = this.getAttribute("data-event");
        document.addEventListener(this.pageEvent, (evt) => {
            this.assignAttributes(evt.detail.data);
            this.render();
            this.addPagesEvents();
            this.addPreviousNextEvents();
        });
        // query
        this.query = {};
        this.queryEvent = this.getAttribute("data-query-event");
        if(this.queryEvent)
            document.addEventListener(this.queryEvent, (evt) => {
                this.query = evt.detail.data;
            });
        // hidden fields
        this.hiddenFields = this.getAttribute("data-hidden-fields") || 'id';
        // update
        this.updateEvent = this.getAttribute("data-update-event");
        this.isUpdating  = false;
    }

    disconnectedCallback() {
        this.crudService = null;
        this.alertService = null;
        document.removeEventListener(this.pageEvent, (evt) => {
            this.assignAttributes(evt.detail.data);
            this.render();
            this.addPagesEvents();
            this.addPreviousNextEvents();
        });
        if(this.queryEvent)
            document.removeEventListener(this.queryEvent, (evt) => {
                this.query = evt.detail.data;
            });
    }

    async render() {
        try {
            let pagesList = ``;
            if(this.totalPages <= 7)
                for(let i=0; i < this.totalPages; i++) {
                    pagesList += 
                    `<li class="${ (i+1 == this.pageNumber) ? 'active' : ''}" id="page-${i+1}">
                        ${i + 1}
                    </li>`;
                }
            else
                pagesList = this.renderManyPages();
            // render
            this.shadowRoot.querySelector("#previous").insertAdjacentHTML("afterend", pagesList);
        }
        catch(err) {
            this.alertService.showAlert("Error", err);
            this.shadowRoot.querySelector(".page-list").classList.add("d-none");
        }
    }

    renderManyPages() {
        let pagesList = ``;
        pagesList += 
            `<li class="${ (this.pageNumber == 1) ? 'active' : ''}" id="page-1">
                1
            </li>
            <li>...</li>`;
        // 5 pages around current page
        let pageThreshold = 3;
        for(let i=-2; i < pageThreshold; i++) {
            const currentPage = this.pageNumber + i;
            if((currentPage > 1) && (currentPage < this.totalPages))
                pagesList += 
                `<li class="${ (i+1 == this.pageNumber) ? 'active' : ''}" id="page-${this.pageNumber + (i)}">
                    ${this.pageNumber + (i)}
                </li>`;
            else
                if(currentPage < this.totalPages)
                    pageThreshold++;
        }
        pagesList += 
            `<li>...</li>
            <li class="${ (this.pageNumber == this.totalPages) ? 'active' : ''}" id="page-${this.totalPages}">
                ${this.totalPages}
            </li>`;
        return pagesList;
    }

    async triggerPage(pageNumber) {
        try {
            if(!isNaN(pageNumber) && !isNaN(parseFloat(pageNumber)))
            if(pageNumber != this.pageNumber)
                if(!this.isUpdating) {
                    this.isUpdating = true;
                    const pagination = { pageNumber: pageNumber, pageSize: this.pageSize };
                    const query  = Object.assign(this.query, pagination);
                    const result = await this.crudService.getItems(this.apiEndpoint, query);
                    await this.getDataInPage(result[this.apiResult]);
                    this.assignAttributes(result);
                    if(this.totalPages > 7) {
                        this.updatePageNumbers();
                        this.addPagesEvents();
                    }
                    this.updateActivePage();
                }
        }
        finally {
            this.isUpdating = false;
        }
    }

    async getDataInPage(data) {
        document.dispatchEvent(new CustomEvent(this.updateEvent, {
            detail: {
                data: data,
                hiddenFields: this.hiddenFields
            }
        }));
    }

    updateActivePage() {
        this.shadowRoot.querySelectorAll('li').forEach((element) => element.className = '');
        this.shadowRoot.querySelector(`#page-${this.pageNumber}`).classList.add('active');
    }

    updatePageNumbers() {
        // get new page list
        const pagesList    = this.renderManyPages();
        // insert between previous & next
        const previousPage = this.shadowRoot.querySelector("#previous");
        const nextPage     = this.shadowRoot.querySelector("#next");
        while (previousPage.nextElementSibling && previousPage.nextElementSibling !== nextPage)
                previousPage.nextElementSibling.remove();
        previousPage.insertAdjacentHTML("afterend", pagesList);
    }

    assignAttributes(data) {
        this.pageNumber = data.pageNumber;
        this.pageSize   = data.pageSize;
        this.totalPages = data.totalPages;
        this.totalItems = data.totalItems;
    }

    addPagesEvents() {
        // pages
        this.shadowRoot.querySelectorAll("li").forEach((element) => {
            element.addEventListener('click', async (evt) => this.triggerPage(evt.target.innerText));
        });
    }

    addPreviousNextEvents() {
        const sroot = this.shadowRoot;
        sroot.querySelector('#previous').addEventListener('click', async (evt) => {
            if(this.pageNumber > 1) 
                this.triggerPage(parseInt(this.pageNumber) - 1);
        });
        sroot.querySelector('#next').addEventListener('click', async (evt) => {
            if(this.pageNumber < this.totalPages) 
                this.triggerPage(parseInt(this.pageNumber) + 1);
        });
    }
}