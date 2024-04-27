export default class Project extends HTMLElement {
    static get observedAttributes() {
        return ['id','setImage','number','imageUrl','title','onclickFunction'];
    }

    constructor() {
        super();
        this.id = this.getAttribute('id') || '';
        this.setImage = this.getAttribute('setImage') || 'right';
        this.number = this.getAttribute('number') || '0';
        this.imageUrl = this.getAttribute('imageUrl') || '';
        this.title = this.getAttribute('title') || '';
        this.onclickFunction = this.getAttribute('onclickFunction') || '';
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

        this.shadowRoot.querySelector('custom-icon').addEventListener('click', this.openPopup.bind(this));
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
                <custom-icon size="xl">read_more</custom-icon>
            </div>
        `;
    }

    openPopup() {
        if(this.id !== '') {
            const popup = document.getElementById(`popup-${this.id}`);
            popup.show();
        }
    }
}

customElements.define('custom-project', Project);