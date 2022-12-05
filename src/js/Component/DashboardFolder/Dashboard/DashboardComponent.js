import DashboardCardComponent from "../DashboardCard/DashboardCardComponent";


function markupTemplate() {
    const template = document.createElement('template');


template.innerHTML = /*html*/`
    <style>
   ${window.GlobalVariables.styles}
    </style>
    <div class="dashboard-cards">
        <app-dashboard-card class="dashboard-card" data-card-icon="briefcase" data-card-icon-color="#ff7f7f" data-card-key="Clients" data-card-value="--" data-card-entity="clients" data-item-name="client">
        </app-dashboard-card>
        <app-dashboard-card class="dashboard-card" data-card-icon="people-fill" data-card-icon-color="#0096ff" data-card-key="Auditors" data-card-value="--" data-card-entity="auditors" data-item-name="auditor">
        </app-dashboard-card>
        <app-dashboard-card class="dashboard-card" data-card-icon="clipboard-data" data-card-icon-color="#00a36c" data-card-key="Audit Plans" data-card-value="--" data-card-entity="auditPlans" data-item-name="auditPlan">
        </app-dashboard-card>
        <app-dashboard-card class="dashboard-card" data-card-icon="file-earmark-text" data-card-icon-color="#a52a2a" data-card-key="Reports" data-card-value="--" data-card-entity="reports" data-item-name="report">
        </app-dashboard-card>
    </div>
`;
return template;
}

export default class DashboardComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = markupTemplate();
this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        
    }

    disconnectedCallback() {

    }
}