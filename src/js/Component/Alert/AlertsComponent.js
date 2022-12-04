

import AlertComponent from "./AlertComponent";

const template = document.createElement('template');

template.innerHTML = /*html*/`
    <style>
   ${window.GlobalVariables.styles}
    </style>
    <div id="toasters">
    
    </div> 
`;

export default class AlertsComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        document.addEventListener("toggleAlert", evt => this.addAlert(evt));
    }

    disconnectedCallback() {
        document.removeEventListener("toggleAlert", evt => this.addAlert(evt));
    }

    addAlert(evt) {
        const toasters = this.shadowRoot.querySelector("#toasters");
        toasters.innerHTML += `
            <app-alert data-status="${window.GlobalVariables.ALERT_STATUS}" data-message="${window.GlobalVariables.ALERT_MESSAGE}"></app-alert>
        `;
        setTimeout(() => this.clearAlerts(toasters), 4000); 
    }

    clearAlerts(toasters) {
        (toasters.innerHTML != "") ? toasters.innerHTML = "" : console.log("No alerts.");
    }
}

window.customElements.define('app-alerts', AlertsComponent);