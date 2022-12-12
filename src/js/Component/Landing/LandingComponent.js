import FeaturesComponent from "../Features/FeaturesComponent";
import OfferingsComponent from "../Offerings/OfferingsComponent";

function markupTemplate() {
    const template = document.createElement('template');

    template.innerHTML = /*html*/`
        <style>
        ${window.GlobalVariables.styles}
        </style>
        <div class="bg-landing fade-in">
            <div class="bg-landing-content">
                <h1 class="title text-white">مسارك</h2>
                <h2 class="text-white word-wrap-landing">منصة لتيسير عملية ايجاد التخصص الجامعي المناسب لطلاب وخريجي الثانوية والتأكد من رغبتهم في بناء مستقبل بذلك المجال.</h2>
                <div class="mt-4 mx-2">
                    <a onclick="history.pushState({}, '', '/signup')" class="hyperlink active">سجل الآن</a>
                </div>
            </div>
            <div class="img-landing-container">
                <img src="assets/img/undraw_absorbed_in.svg">
            </div>
        </div>
        <div class="card card-primary card-active-border card-numbers-information">
            <div class="number-information">
                <h1 class="main-statistic">+42</h1>
                <label class="number-statistic">الجامعات</label>
            </div>
            <div class="number-information">
                <h1 class="main-statistic">+5</h1>
                <label class="number-statistic">المسارات</label>
            </div>
            <div class="number-information">
                <h1 class="main-statistic">+350K</h1>
                <label class="number-statistic">الطلاب المتخرجين</label>
            </div>
        </div>
        <app-features></app-features>
        <h1 style="padding-top: 1rem; margin: auto; text-align:center;">
        الأهداف
        </h1>
        <app-offerings></app-offerings>
    `;

    return template;
}

export default class LandingComponent extends HTMLElement {
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