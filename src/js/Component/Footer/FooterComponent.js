

function markupTemplate() {
    const template = document.createElement('template');


template.innerHTML = /*html*/`
    <style>
   ${window.GlobalVariables.styles}
    </style>
    <div class="d-flex flex-row justify-content-center align-items-center">
        <h6 class="footer-text">&copy; <span id="thisYear"></span> <a class="footer-link" href="https://www.hawkamah.sa" target="_blank">Hawkamah</a></h6>
    </div>
`;
return template;
}

export default class FooterComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = markupTemplate();
this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        // Get the current year and append in copyright section
        this.shadowRoot.querySelector("#thisYear").innerText = new Date().getFullYear();
    }

    disconnectedCallback() {

    }
}