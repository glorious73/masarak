import DataBoundElement from "../../Util/DataBoundElement";

export default class UIService {
    constructor() {

    }

    toggleUIForUser(isDisplayed) {
        document.dispatchEvent(new CustomEvent('toggleUIForUser', {
            detail: {
                data: isDisplayed
            }
        }));
    }

    dataBindElements(component, elements) {
        for(const element of elements.split(",")) {
            const elementSplit = element.split('&');
            component.shadowRoot.querySelectorAll(elementSplit[0]).forEach(el => {
                component[el.id] = new DataBoundElement(el, elementSplit[1], elementSplit[2]);
            });
        }
    }
}