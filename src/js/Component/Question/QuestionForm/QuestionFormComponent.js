import FormService from "../../../Service/Form/FormService";

function markupTemplate() {
    const template = document.createElement('template');

    template.innerHTML = /*html*/`
        <style>
        ${window.GlobalVariables.styles}
        </style>
        <form id="questionForm">
            <div class="form-row">
                <textarea class="input-text input-text-border" rows="6" id="question" name="question" placeholder="نص السؤال..."></textarea>
            </div>
            <div class="form-row">
                <button type="submit" class="btn-form btn-form-border btn-submit" id="btnSubmit">
                    اسأل  
                </button>
            </div>
        </form>
    `;

    return template;
}

export default class QuestionFormComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = markupTemplate();
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.formService = new FormService();
        this.shadowRoot.querySelector('#questionForm').addEventListener('submit', async (evt) => {
            evt.preventDefault();
            this.shadowRoot.querySelector('#btnSubmit').setAttribute('disabled', '');
            await this.askQuestion(evt);
            this.shadowRoot.querySelector('#btnSubmit').removeAttribute('disabled');
        });
    }

    disconnectedCallback() {
        this.formService = null;
    }

    askQuestion(e) {
        const jsonFormData = this.formService.buildJsonFormData(e.target);
        jsonFormData.created = new Date().toISOString().split("T")[0];
        jsonFormData.answer = '';
        document.dispatchEvent(new CustomEvent('newQuestionEvent', {
            detail: {
                data: jsonFormData
            }
        }));
        document.dispatchEvent(new CustomEvent('hideModalEvent'));
    }
}