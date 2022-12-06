import QuestionItemComponent from "../QuestionItem/QuestionItemComponent";
import ModalComponent from "../../UI/Modal/ModalComponent";

function markupTemplate() {
    const template = document.createElement('template');

    template.innerHTML = /*html*/`
        <style>
        ${window.GlobalVariables.styles}
        </style>
        <div class="p-4">
            <!--<div class="comments">
                <app-search class="ui-table-header-item" data-name="searchQuery" data-theme="primary" data-is-border="true" data-placeholder="ابحث عن سؤال" data-api-endpoint="/api/questions" data-search-event="questionSearchEvent" data-response-item="question" data-is-display-item="false">
                </app-search>
            </div>-->
            <div class="d-flex flex-row comments">
                <span></span>
                <span></span>
                <button class="btn-action btn-action-secondary active" id="btnNewQuestion">أضف سؤالك</button>
            </div>
            <div class="card card-primary card-secondary-border card-no-hover-shadow p-3 comments">
                <app-question-item data-question='${JSON.stringify({question: 'ما هي أفضل جامعة في السعودية لتخصص الهندسة؟', answer: 'تعتمد على كيفية دراستك وشريحة الطلاب الذين تريد أن تدرس معهم.', created: '2022-12-06'})}'></app-question-item>
            </div>
        </div>
        <app-modal class="app-modal"></app-modal>
    `;

    return template;
}

export default class QuestionsComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = markupTemplate();
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        this.shadowRoot.querySelector("#btnNewQuestion").addEventListener('click', (e) => this.askQuestion());
    }

    disconnectedCallback() {

    }

    askQuestion() {
        document.dispatchEvent(new CustomEvent('showModalEvent', {
            detail: {
                title: `سؤال جديد`,
                body: `<textarea class="input-text input-text-border" rows="6" id="question" name="question" placeholder="نص السؤال..."></textarea>`,
                caption: ''
            }
        }));
    }
}