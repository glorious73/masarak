

function markupTemplate() {
    const template = document.createElement('template');


template.innerHTML = /*html*/`
    <style>
   ${window.GlobalVariables.styles}
    </style>
    <div class="select-dropdown">
        <div class="select-element" id="selectComponent">
            <input type="text" id="selectedItem" disabled/>
            <app-svg-icon id="selectIcon" data-class="icon-select" data-icon="chevron-down">
            </app-svg-icon>
        </div>
        <div class="select-items-wrapper" id="selectItems">
            
        </div>
    </div>
`;
return template;
}

export default class SelectComponent extends HTMLElement {

    static formAssociated = true;

    constructor() {
        super();
        // Form Control
        this.internals_ = this.attachInternals();
        this.value_ = '';
        // Select Component
        this.attachShadow({ mode: 'open' });
        const template = markupTemplate();
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    get value() { return this.value_; }
    set value(v) { this.value_ = v; }

    connectedCallback() {
        const sroot = this.shadowRoot;
        const selectElement = sroot.querySelector('.select-element');
        // Select theme
        this.selectTheme = this.getAttribute("data-theme");
        selectElement.classList.add(`select-element-${this.selectTheme || 'primary'}`);
        // Select border
        const isSelectBorder = this.getAttribute("data-is-border");
        if(isSelectBorder == "true")
            selectElement.classList.add(`select-element-border`);
        // Event for select
        this.isToggled = false;
        sroot.querySelector("#selectComponent").addEventListener('click', (e) => this.toggleSelect(e));
        // Load items
        const items     = JSON.parse(this.getAttribute("data-items"));
        this.itemKey    = this.getAttribute("data-key");
        this.itemValue  = this.getAttribute("data-value");
        this.items      = {}; // key-value pairs
        this.loadItems(items);
        // Select items
        const selectedItemKey = this.getAttribute("data-selected-item-key");
        this.selectOneItem(items, selectedItemKey);
        // Update items event
        this.updateEvent = this.getAttribute("data-update-event");
        if(this.updateEvent)
            document.addEventListener(this.updateEvent, (e) => this.updateItems(e));
        // Item Selected event
        this.itemSelectedEvent = this.getAttribute("data-item-selected-event");
        // Add event for items
        sroot.querySelectorAll(".btn-select").forEach((btn) => {
            btn.addEventListener('click', (e) => this.itemSelected(e.target.innerText));
        });
    }

    disconnectedCallback() {
        if(this.updateEvent)
            document.removeEventListener(this.updateEvent, (e) => this.updateItems(e));
    }

    selectOneItem(items, selectedItemKey=null) {
        // Select selected item or first item
        const itemSelected = (selectedItemKey) ? selectedItemKey : items[0][this.itemKey];
        // Set value
        this.shadowRoot.querySelector("#selectedItem").value = itemSelected;
        this.setValue(itemSelected);
    }

    itemSelected(key) {
        // Set form value
        this.setValue(key);
        // Update UI
        this.shadowRoot.querySelector("#selectedItem").value = key;
        // Toggle select
        this.toggleSelect();
        // Emit event
        this.dispatchItemSelectedEvent(key);
    }

    dispatchItemSelectedEvent(key) {
        if(this.itemSelectedEvent) {
            // selected item
            const item = {};
            item[this.itemKey]   = key;
            item[this.itemValue] = this.items[key];
            // event
            document.dispatchEvent(new CustomEvent(this.itemSelectedEvent, {
                detail: {
                    data: item
                }
            }));
        }
    }

    setValue(key) {
        this.value_ = this.items[key];
        this.internals_.setFormValue(this.value_);
    }

    updateItems(evt) {
        // Update data
        const { key, value, items } = evt.detail;
        this.itemKey                = key;
        this.itemValue              = value;
        this.items                  = {}; // reset items
        // Update UI
        this.loadItems(items);
        this.selectOneItem(items);
        // Update events
        this.shadowRoot.querySelectorAll(".btn-select").forEach((btn) => {
            btn.addEventListener('click', (e) => this.itemSelected(e.target.innerText));
        });
    }

    loadItems(items) {
        const itemsWrapper = this.shadowRoot.querySelector("#selectItems");
        let itemsHTML = "";
        for(const item of items) {
            this.items[item[this.itemKey]] = item[this.itemValue];
            itemsHTML += `
                <button class="btn-select btn-select-${this.selectTheme || 'primary'}">
                    ${item[this.itemKey]}
                </button>
            `;
        }
        itemsWrapper.innerHTML = itemsHTML;
    }

    toggleSelect(e) {
        // icon
        this.toggleIcon();
        // Select items
        this.shadowRoot.querySelector("#selectItems").classList.toggle("show");
    }

    toggleIcon() {
        this.isToggled = !this.isToggled;
        const icon = (this.isToggled) ? 'chevron-up' : 'chevron-down';
        const selectIcon = this.shadowRoot.querySelector('#selectIcon');
        selectIcon.setAttribute('data-icon', icon);
    }
}