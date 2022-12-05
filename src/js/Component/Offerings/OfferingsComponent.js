
function markupTemplate() {
    const template = document.createElement('template');

    template.innerHTML = /*html*/`
        <style>
        ${window.GlobalVariables.styles}
        </style>
            <section class="offerings">
                <div class="card card-primary card-secondary-border offering">
                    <app-svg-icon data-icon="check-circle" data-class="icon icon-offering" data-svg-style="stroke: #add8e6; fill: #add8e6;" data-view-box="-1 -1 20 20">
                    </app-svg-icon>
                    <label class="offering-text">مساعدة الطلاب بالإرشاد في القبول</label>
                </div>
                <div class="card card-primary card-secondary-border offering">
                    <app-svg-icon data-icon="book-half" data-class="icon icon-offering" data-svg-style="stroke: var(--active-color); fill: var(--active-color);" data-view-box="-1 -1 20 20">
                    </app-svg-icon>
                    <label class="offering-text">المساهمة في تحديد الجامعة والتخصص المناسب</label>
                </div>
                <div class="card card-primary card-secondary-border offering">
                    <app-svg-icon data-icon="info" data-class="icon icon-offering" data-svg-style="stroke: var(--greyed-out-color); fill: var(--greyed-out-color);" data-view-box="-1 -1 20 20">
                    </app-svg-icon>
                    <label class="offering-text">توفير مصادر المعلومات</label>
                </div>
            </section>
        </div>
    `;

    return template;
}

export default class OfferingsComponent extends HTMLElement {
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