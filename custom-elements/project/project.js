export default class Project extends HTMLElement {
    static get observedAttributes() {
        return ['setImage','number','imageUrl','title','goLinkUrl'];
    }

    constructor() {
        super();
        this.setImage = this.getAttribute('setImage') || 'right';
        this.number = this.getAttribute('number') || '0';
        this.imageUrl = this.getAttribute('imageUrl') || '';
        this.title = this.getAttribute('title') || '';
        this.goLinkUrl = this.getAttribute('goLinkUrl') || '';
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./custom-elements/project/project.css">
            <div class="container">
                ${this.renderContainer()}
            </div>
        `;
    }

    renderContainer() {
        if(this.setImage === 'left') {
            return `
                ${this.renderImage()}
                ${this.renderContent()}
            `;
        }

        return `
                ${this.renderContent()}
                ${this.renderImage()}
            `;
    }

    renderImage() {
        return `
            <div class="project-image">
                <img class="${this.setImage}" src="${this.imageUrl}">
            </div>
        `;
    }

    renderContent() {
        return `
            <div class="content ${this.setImage}">
                <custom-typography type="title" weight="extra-bold">0${this.number}</custom-typography>
                <custom-typography type="h2" weight="bold">${this.title}</custom-typography>
                <custom-typography type="p">
                    <slot></slot>
                </custom-typography>
                <custom-a type="icon" href="${this.goLinkUrl}">read_more</custom-a>
            </div>
        `;
    }
}

customElements.define('custom-project', Project);