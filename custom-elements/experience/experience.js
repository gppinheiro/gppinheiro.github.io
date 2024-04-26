export default class Experience extends HTMLElement {
    static get observedAttributes() {
        return ['mode','logoUrl','title','date'];
    }

    constructor() {
        super();
        this.mode = this.getAttribute('mode') || 'dark';
        this.logoUrl = this.getAttribute('logoUrl') || '';
        this.title = this.getAttribute('title') || '';
        this.date = this.getAttribute('date') || '';
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./custom-elements/experience/experience.css">
            <div class="container ${this.mode}">
                <div class="header">
                    <div class="role">
                        <img src="${this.logoUrl}" alt="Company's Logo"/>
                        <custom-typography type="h3" weight="semi-bold">${this.title}</custom-typography>
                    </div>
                    <div class="date">
                        <custom-typography type="label" weight="semi-bold">${this.date}</custom-typography>
                    </div>
                </div>
                <custom-typography type="label">
                    <slot></slot>
                </custom-typography>
            </div>
        `;
    }
}

customElements.define('custom-experience', Experience);