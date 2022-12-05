function markupTemplate() {
    const template = document.createElement('template');


template.innerHTML = /*html*/`
    <style>
   ${window.GlobalVariables.styles}
    </style>
    <div id="toaster" class="toaster-border">
        <div class="d-flex flex-row align-items-center text-success py-0 my-0">
            <h4 class="flex-grow-0"></h4>
            <h4 class="flex-grow-1" id="status"></h4>
            <h4 class="flex-grow-0">
                <button class="toaster-btn-close">&times;</button>
            </h4>
        </div>
        <hr class="my-05" />
        <label id="message"></label>
    </div>
`;
return template;
}

export default class AlertComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = markupTemplate();
this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.showAlert();
        this.shadowRoot.querySelector('.toaster-btn-close').addEventListener('click', (evt) => this.hideNotification(evt));
    }

    disconnectedCallback() {

    }

    showAlert() {
        // Status and Message
        const sroot = this.shadowRoot;
        sroot.querySelector("#status").innerHTML  = this.getAttribute('data-status');
        sroot.querySelector("#message").innerHTML = this.getAttribute('data-message');
        // Show
        const toaster = sroot.querySelector("#toaster");
        toaster.classList.toggle("show");
        setTimeout(() => {
            toaster.classList.contains("show") ? toaster.classList.toggle("show") : console.log("Toaster hidden by user.");
        }, 5000);
    }

    hideNotification(evt) {
        this.shadowRoot.querySelector('#toaster').classList.toggle("show");
    }
}