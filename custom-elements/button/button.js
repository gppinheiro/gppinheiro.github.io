export default class Button extends HTMLElement {
    static get observedAttributes() {
        return ['size','icon','text','mode','disabled'];
    }

    constructor() {
        super();
        this.size = this.getAttribute('size') || 'm';
        this.icon = this.getAttribute('icon');
        this.text = this.getAttribute('text');
        this.mode = this.getAttribute('mode') || 'dark';
        this.disabled = this.hasAttribute('disabled');
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === 'disabled') {
                this.disabled = this.hasAttribute('disabled');
            } else {
                this[name] = newValue;
            }
            this.render();
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./custom-elements/button/button.css">
            <button class="${this.size} ${this.mode}" ${this.disabled ? 'disabled' : ''}>
                ${this.renderButton()}
            </button>
        `;
    }

    renderButton() {
        if(this.icon && this.text) {
            return `
                ${this.renderIcon()}
                ${this.renderText()}
            `;
        }
        else if(this.icon) {
            return this.renderIcon();
        }
        
        return this.renderText();
    }

    renderIcon() {
        if(this.icon.includes('.svg')) {
            return `<custom-icon size="${this.size}" img="${this.icon}"></custom-icon>`;
        }

        return `
            <custom-icon size="${this.size}">${this.icon}</custom-icon>
        `;
    }

    renderText() {
        return `
            <custom-typography type="label" weight="semi-bold">${this.text}</custom-typography>
        `;
    }
}

customElements.define('custom-button', Button);