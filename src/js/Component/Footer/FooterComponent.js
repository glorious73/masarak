

function markupTemplate() {
    const template = document.createElement('template');


template.innerHTML = /*html*/`
    <style>
   ${window.GlobalVariables.styles}
    </style>
    <div class="footer">
        <img src="assets/img/masarak_logo.png" class="footer-img">
        <h6 class="footer-text">
            &copy; <span id="thisYear"></span>
            <a class="footer-link" href="https://masarak.netlify.app" target="_blank">
            مسارك - جميع الحقوق محفوظة
            </a>
        </h6>

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