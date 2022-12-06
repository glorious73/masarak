import UIService from "../../../Service/UI/UIService";
import AlertService from "../../../Service/Alert/AlertService";

import AnswerFormComponent from "../AnswerForm/AnswerFormComponent";

function markupTemplate() {
    const template = document.createElement('template');

    template.innerHTML = /*html*/`
        <style>
        ${window.GlobalVariables.styles}
        </style>
        <div class="card card-primary card-active-border comment-item">
            <div class="comment-item-header">
                <label class="comment-added-by" id="question">
                
                </label>
                <label class="comment-date" id="created">
                
                </label>
            </div>
            <div class="comment-item-body">
                <label id="answer">
                
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
        this.uiService = new UIService();
        this.alertService = new AlertService();
        // question
        this.questionItem = JSON.parse(this.getAttribute("data-question"));
        this.uiService.dataBindElements(this, "label&--&innerHTML");
        this.loadQuestion();

    }

    disconnectedCallback() {
        this.alertService = null;
        this.uiService = null;
    }

    loadQuestion() {
        try {
            for(const [key, value] of Object.entries(this.questionItem)) {
                if(this[key] && this[key].change)
                    this[key].change(value);
            }
        }
        catch(err) {
           this.alertService.showAlert("Error", err.message);
        }
    }
}