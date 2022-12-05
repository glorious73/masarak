
function markupTemplate() {
    const template = document.createElement('template');

    template.innerHTML = /*html*/`
        <style>
        ${window.GlobalVariables.styles}
        </style>
        <div class="d-flex flex-column fade-in p-4">
            <h1 class="mt-2">
            <app-svg-icon data-icon="telephone" data-class="icon icon-medium" data-view-box="-1 -1 20 20">
            </app-svg-icon>
            الهاتف
            </h1>
            <h3>966559715176</h3>
            <h1 class="mt-2">
            <app-svg-icon data-icon="envelope" data-class="icon icon-medium" data-view-box="-1 -1 20 20">
            </app-svg-icon>
            البريد الالكتروني
            </h1>
            <h3>info@email.com</h3>
            <h1 class="mt-2">
            <app-svg-icon data-icon="pin" data-class="icon icon-medium" data-view-box="-1 -1 20 20">
            </app-svg-icon>
            العنوان
            </h1>
            <h3>مدينة الرياض</h3>
        </div>
    `;

    return template;
}

export default class ContactComponent extends HTMLElement {
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