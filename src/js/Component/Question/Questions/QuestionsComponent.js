import QuestionItemComponent from "../QuestionItem/QuestionItemComponent";

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
                <button class="btn-action btn-action-secondary active">أضف سؤالك</button>
            </div>
            <div class="card card-primary card-secondary-border p-3 comments">
                <app-question-item></app-question-item>
                <app-question-item></app-question-item>
                <app-question-item></app-question-item>
                <app-question-item></app-question-item>
            </div>
        </div>
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
        
    }

    disconnectedCallback() {

    }
}