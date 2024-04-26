export default class Icon extends HTMLElement {
    static get observedAttributes() {
        return ['size','img'];
    }

    constructor() {
        super();
        this.size = this.getAttribute('size') || 'm';
        this.img = this.getAttribute('img') || undefined;
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if ( name === 'size' && oldValue !== newValue) {
            this.render();
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./custom-elements/icon/icon.css">
            ${this.renderIcon()}
        `;
    }

    renderIcon() {
        if (this.img) {
            return this.renderImage();
        }
        
        return this.renderMaterialIcons();
    }

    renderImage() {
        return `
            <img src="${this.img}" class="${this.size}">
        `;
    }

    renderMaterialIcons() {
        return `
            <i class="material-icons ${this.size}">
                <slot></slot>
            </i>
        `;
    }
}

customElements.define('custom-icon', Icon);