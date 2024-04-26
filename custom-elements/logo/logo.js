export default class Logo extends HTMLElement {
    static get observedAttributes() {
        return ['mode'];
    }

    constructor() {
        super();
        this.mode = this.getAttribute('mode') || 'dark';
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./custom-elements/logo/logo.css">
            <div class="${this.mode}">
                <img src="../../assets/guilherme.jpeg" alt="Guilherme's Face"/>
                <custom-typography type="p" weight="bold">Guilherme</custom-typography>
            </div>
        `;
    }
}

customElements.define('custom-logo', Logo);