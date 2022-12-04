
import DataBoundElement from "../../../Util/DataBoundElement";

const template = document.createElement('template');

template.innerHTML = /*html*/`
    <style>
   ${window.GlobalVariables.styles}
    </style>
    <div class="card card-primary card-dashboard-with-icon">
        <!--Icon-->
        <div id="cardIcon" class="dashboard-card-icon-wrapper">
            
        </div>
        <!--Key and value-->
        <div class="dashboard-card-data">
            <!--Value-->
            <h3 class="dashboard-card-value" id="cardValue"></h3>
            <!--Key-->
            <h6 class="dashboard-card-key" id="cardKey"></h6>
        </div>
    </div>
`;

export default class DashboardCardComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const sroot = this.shadowRoot;
        // Attributes
        this.dashboardCardIcon       = this.getAttribute("data-card-icon");
        this.dashboardCardIconColor  = this.getAttribute("data-card-icon-color");
        this.dashboardCardKey        = this.getAttribute("data-card-key");
        this.dashboardCardValue      = this.getAttribute("data-card-value");
        this.dashboardCardEntity     = this.getAttribute("data-card-entity");
        this.dashboardCardEntities   = this.getAttribute("data-card-entities");
        this.dashboardItemName       = this.getAttribute("data-item-name");
        // Functions
        this.loadCardData();
        // Binding
        this.dataBindElements(sroot);
        // Events
        document.addEventListener("itemSearchEvent", (e) => this.loadItemData(e.detail.data));
        // Initial load
        const item = (localStorage.getItem(this.dashboardItemName)) ? JSON.parse(localStorage.getItem(this.dashboardItemName)) : null;
        if(item)
            this.loadItemData(item);
    }

    disconnectedCallback() {
        document.removeEventListener("itemSearchEvent", (e) => this.loadItemData(e.detail.data));
    }

    loadCardData() {
        const sroot = this.shadowRoot;
        // Icon
        sroot.querySelector("#cardIcon").innerHTML = `
        <app-svg-icon data-icon="${this.dashboardCardIcon}" data-class="dashboard-card-icon icon-dashboard" data-view-box="0 0 18 18" data-stroke-color="${this.dashboardCardIconColor}">
        </app-svg-icon>
        `;
        // Key & Value
        sroot.querySelector("#cardKey").innerHTML = this.dashboardCardKey;
        sroot.querySelector("#cardValue").innerHTML = this.dashboardCardValue;
    }

    loadItemData(itemData) {
        if(this.dashboardCardEntity)
            this.cardValue.change(itemData[this.dashboardCardEntity]);
        else if(this.dashboardCardEntities) {
            // formulate new value
            const entities = this.dashboardCardEntities.split(",");
            let newCardValue = ``;
            for(const entity of entities)
                newCardValue += `${itemData[entity]} `;
            // change
            this.cardValue.change(newCardValue);
        }
        else
            this.cardValue.change("---");
    }

    dataBindElements(sroot) {
        this.cardValue = new DataBoundElement(sroot.querySelector("#cardValue"), "---", "innerHTML");
    }
}

window.customElements.define('app-dashboard-card', DashboardCardComponent);