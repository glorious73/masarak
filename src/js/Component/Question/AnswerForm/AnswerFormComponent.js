
function markupTemplate() {
    const template = document.createElement('template');

    template.innerHTML = /*html*/`
        <style>
        ${window.GlobalVariables.styles}
        </style>
        <form id="addAnswerForm">
            <div class="d-flex flex-row justify-content-stretch align-items-center pt-2 px-2">
                <input type="text" class="flex-grow-1 input-text input-text-comment input-text-comment-border" placeholder="" id="value" name="value">
                <button type="submit" class="flex-grow-0 btn-comment btn-comment-border btn-submit" id="btnSubmit">
                    الرد
                </button>
            </div>
        </form>
    `;

    return template;
}

export default class AnswerFormComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = markupTemplate();
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot.querySelector('#addAnswerForm').addEventListener('submit', async (evt) => {
            evt.preventDefault();
            this.shadowRoot.querySelector('#btnSubmit').setAttribute('disabled', '');
            await this.addAnswer(evt);
            this.shadowRoot.querySelector('#btnSubmit').removeAttribute('disabled');
        });
    }

    disconnectedCallback() {

    }

    addAnswer() {
        console.log(`answered`);
    }
}