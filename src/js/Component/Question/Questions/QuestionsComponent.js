import QuestionItemComponent from "../QuestionItem/QuestionItemComponent";
import QuestionFormComponent from "../QuestionForm/QuestionFormComponent";
import ModalComponent from "../../UI/Modal/ModalComponent";

function markupTemplate() {
    const template = document.createElement('template');

    template.innerHTML = /*html*/`
        <style>
        ${window.GlobalVariables.styles}
        </style>
        <div class="section-questions fade-in">
            <div class="d-flex flex-row comments">
                <span></span>
                <span></span>
                <button class="btn-action btn-action-secondary active" id="btnNewQuestion">أضف سؤالك</button>
            </div>
            <div class="card card-primary card-secondary-border card-no-hover-shadow p-3 comments" id="questions">
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
        document.addEventListener("newQuestionEvent", (e) => this.addNewQuestion(e));
        this.shadowRoot.querySelector("#btnNewQuestion").addEventListener('click', (e) => this.askQuestion());
    }

    disconnectedCallback() {
        document.removeEventListener("newQuestionEvent", (e) => this.addNewQuestion(e));
    }

    askQuestion() {
        document.dispatchEvent(new CustomEvent('showModalEvent', {
            detail: {
                title: `سؤال جديد`,
                body: `<app-question-form></app-question-form>`,
                caption: ''
            }
        }));   
    }

    addNewQuestion(e) {
        this.shadowRoot.querySelector("#questions").innerHTML += `
        <app-question-item data-question='${JSON.stringify(e.detail.data)}'></app-question-item>
        `;
    }
}