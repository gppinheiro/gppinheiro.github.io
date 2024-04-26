import InputHelper from './input.helper.js';

export default class Input extends HTMLElement {
    static get observedAttributes() {
        return ['type','status','statusmessage','placeholder'];
    }

    constructor() {
        super();
        this.helper = new InputHelper(this);
        this.type = this.getAttribute('type') || 'text';
        this.status = this.getAttribute('status') || '';
        this.statusMessage = this.getAttribute('statusmessage') || '';
        this.placeholder = this.getAttribute('placeholder') || '';
        this.attachShadow({ mode: 'open' });
    }

    get value() {
        return this.helper.getInputValue();
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if ((name === 'status' || name === 'statusmessage') && oldValue !== newValue) {
            this.status = this.getAttribute('status') || '';
            this.statusMessage = this.getAttribute('statusmessage') || '';
            this.render();
        }
    }

    render() {
        let currentValue = '';
        if(this.shadowRoot.innerHTML) {
            currentValue = this.value;
        }

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./custom-elements/input/input.css">
            ${this.helper.renderCustomInput()}
        `;

        if(currentValue !== '') {
            if(this.type === 'textarea') {
                this.shadowRoot.querySelector('textarea').value = currentValue;
            }
            else {
                this.shadowRoot.querySelector('input').value = currentValue;
            }
        }
    }
}

customElements.define('custom-input', Input);