
import DeleteFormComponent from "../../DeleteForm/DeleteFormComponent";

const template = document.createElement('template');

template.innerHTML = /*html*/`
    <style>
   ${window.GlobalVariables.styles}
    </style>
    <div id="uiModal" class="ui-modal">
        <!-- Modal Content -->
        <div class="ui-modal-content card card-primary" id="uiModalContent">
            <div class="ui-modal-title-wrapper">
                <h1 class="ui-modal-title"></h1>
                <span class="ui-modal-close">&times;</span>
            </div>
            <hr />
            <div class="ui-modal-body py-1 px-3"></div>
            <!-- Modal Caption -->
            <div class="ui-modal-caption"></div>
        </div>
    </div>
`;

export default class ModalComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        document.addEventListener('showModalEvent', evt => this.showModal(evt));
        document.addEventListener('hideModalEvent', evt => this.hideModal());
        this.shadowRoot.querySelector('.ui-modal-close').addEventListener('click', () => this.hideModal());
    }

    disconnectedCallback() {
        document.removeEventListener('showModalEvent', evt => this.showModal(evt));
        document.removeEventListener('hideModalEvent', evt => this.hideModal());
        this.shadowRoot.querySelector('.ui-modal-close').removeEventListener('click', () => this.hideModal());
    }

    showModal(evt) {
        // modal
        this.shadowRoot.getRootNode().host.classList.toggle('app-modal');
        // title
        this.shadowRoot.querySelector('.ui-modal-title').innerHTML = evt.detail.title;
        // body
        this.shadowRoot.querySelector('.ui-modal-body').innerHTML = evt.detail.body;
        // caption
        this.shadowRoot.querySelector('.ui-modal-caption').innerHTML = (evt.detail.caption) ? evt.detail.caption : '';
    }

    hideModal() {
        this.shadowRoot.getRootNode().host.classList.toggle('app-modal');
    }
}

window.customElements.define('app-modal', ModalComponent);