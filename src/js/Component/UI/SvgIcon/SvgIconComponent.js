

const template = document.createElement('template');

template.innerHTML = /*html*/`
    <style>
   ${window.GlobalVariables.styles}
    </style>
    
`;

export default class SvgIconComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    async connectedCallback() {
        this.icon     = this.getAttribute("data-icon");
        this.class    = this.getAttribute("data-class");
        this.viewBox  = this.getAttribute("data-view-box");
        this.stroke   = this.getAttribute("data-stroke-color");
        const viewBox = (this.viewBox) ? `viewBox='${this.viewBox}'` : ''; 
        const style   = (this.stroke) ? `style='stroke: ${this.stroke};'` : '';
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

window.customElements.define('app-svg-icon', SvgIconComponent);