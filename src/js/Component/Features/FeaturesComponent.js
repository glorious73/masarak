
function markupTemplate() {
    const template = document.createElement('template');

    template.innerHTML = /*html*/`
        <style>
        ${window.GlobalVariables.styles}
        </style>
        <section class="features fade-in">
            <h1 class="features-title">منصة موحدة لتوجيه حديثي التخرج</h1>
            <label class="word-wrap-features">اجابة جميع تساؤلات خريجي الثانوية واتاحة الفرصة لمعرفة المعلومات من جهات موثوقة.</label>
        </section>
    `;

    return template;
}

export default class FeaturesComponent extends HTMLElement {
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