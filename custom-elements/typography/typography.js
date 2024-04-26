export default class Typography extends HTMLElement {
    static get observedAttributes() {
        return ['type', 'weight'];
    }

    constructor() {
        super();
    }
}

customElements.define('custom-typography', Typography);