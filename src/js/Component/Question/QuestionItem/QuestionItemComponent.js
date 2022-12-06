import AnswerFormComponent from "../AnswerForm/AnswerFormComponent";

function markupTemplate() {
    const template = document.createElement('template');

    template.innerHTML = /*html*/`
        <style>
        ${window.GlobalVariables.styles}
        </style>
        <div class="card card-primary card-active-border comment-item">
            <div class="comment-item-header">
                <label class="comment-added-by" id="addedBy">
                ما هي أفضل جامعة في السعودية لتخصص الهندسة؟
                </label>
                <label class="comment-date" id="created">
                2022-12-06
                </label>
            </div>
            <div class="comment-item-body">
                <label id="comment">
                تعتمد على كيفية دراستك وشريحة الطلاب الذين تريد أن تدرس معهم.
                </label>
            </div>
            <app-answer-form class="w-100"></app-answer-form>
        </div>
    `;

    return template;
}

export default class QuestionItemComponent extends HTMLElement {
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