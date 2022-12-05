

function markupTemplate() {
    const template = document.createElement('template');


template.innerHTML = /*html*/`
    <style>
   ${window.GlobalVariables.styles}
    </style>
    <a class="btn-accordion">
        <app-svg-icon id="accordionIcon" data-class="icon-accordion" data-icon="caret-down" data-view-box="0 0 14 14">
        </app-svg-icon>
    </a>
    <div class="accordion-content">
        <slot name="content"></slot>
    </div>
`;
return template;
}

export default class AccordionComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = markupTemplate();
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    connectedCallback() {
        const btnAccordion = this.shadowRoot.querySelector(".btn-accordion"); 
        // Title
        btnAccordion.innerHTML += this.getAttribute("data-title");
        // Icon
        this.isToggled = false;
        // listen to click
        btnAccordion.addEventListener('click', evt => {
            evt.preventDefault();
            this.toggleAccordion(evt);
        });
    }

    disconnectedCallback() {

    }

    toggleAccordion(evt) {
        const sroot = this.shadowRoot;
        // Toggle icon
        this.toggleIcon();
        // Toggle button
        sroot.querySelector(".btn-accordion").classList.toggle("active");
        // Toggle content
        const content = sroot.querySelector('.accordion-content');
        const scrollHeight = (content.scrollHeight != 0) ? content.scrollHeight : '1000';
        content.style.maxHeight = (content.style.maxHeight) ? null : `${scrollHeight}px`;
    }

    toggleIcon() {
        this.isToggled = !this.isToggled;
        const icon = (this.isToggled) ? 'caret-up' : 'caret-down';
        const accordionIcon = this.shadowRoot.querySelector('#accordionIcon');
        accordionIcon.setAttribute('data-icon', icon);
    }
}