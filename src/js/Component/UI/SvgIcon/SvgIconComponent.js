

function markupTemplate() {
    const template = document.createElement('template');


template.innerHTML = /*html*/`
    <style>
   ${window.GlobalVariables.styles}
    </style>
    
`;
return template;
}

export default class SvgIconComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const template = markupTemplate();
this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    async connectedCallback() {
        this.icon     = this.getAttribute("data-icon");
        this.class    = this.getAttribute("data-class");
        this.viewBox  = this.getAttribute("data-view-box");
        this.svgstyle = this.getAttribute("data-svg-style");
        const viewBox = (this.viewBox) ? `viewBox='${this.viewBox}'` : ''; 
        const style   = (this.svgstyle) ? `style=' ${this.svgstyle}'` : '';
        this.shadowRoot.innerHTML += 
        `
        <svg id="iconSvg" class="${this.class}" ${viewBox} ${style}>
            ${window.GlobalVariables.icons.querySelector(`#${this.icon}`).innerHTML}
        </svg>
        `;
    }

    disconnectedCallback() {

    }

    static get observedAttributes() {
        return ['data-icon'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'data-icon') 
          this.changeIcon(newValue);
    }

    changeIcon(newIcon) {
        this.icon = newIcon;
        const iconSvg = this.shadowRoot.querySelector("#iconSvg");
        if(iconSvg)
            iconSvg.innerHTML = 
            `
            ${window.GlobalVariables.icons.querySelector(`#${newIcon}`).innerHTML}
            `;
    }
}