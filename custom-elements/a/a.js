export default class A extends HTMLElement {
    static get observedAttributes() {
        return ['href', 'type'];
    }

    constructor() {
        super();
        this.href = this.getAttribute('href') || '#';
        this.type = this.getAttribute('type') || '';
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./custom-elements/a/a.css">
            <a href=${this.href}>
                ${this.renderContent()}
            </a>
        `;
    }

    renderContent() {
        switch (this.type) {
            case 'icon':
                return this.renderIcon();
            case 'text':
                return this.renderText();
            default:
                return `
                    <slot></slot>
                `;
        }
    }

    renderIcon() {
        return `
            <custom-icon size="xl">
                <slot></slot>
            </custom-icon>
        `;
    }

    renderText() {
        return `
            <custom-typography type="p" weight="semi-bold">
                <slot></slot>
            </custom-typography>
        `;
    }
}

customElements.define('custom-a', A);