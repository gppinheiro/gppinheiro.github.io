class CustomPopup extends HTMLElement {
    static get observedAttributes() {
        return ['projectName'];
    }

    constructor() {
        super();
        this.projectName = this.getAttribute('projectName') || 'Project Name';
        this.hide = this.hide.bind(this);
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./custom-elements/project-popup/project-popup.css">
            <div class="popup">
                <div class="popup-header">
                    <custom-typography type="h2" weight="extra-bold">${this.projectName}</custom-typography>
                    <custom-icon size="xl">close</custom-icon>
                </div>

                <div class="project-quick-links">
                    <slot name="project-links"></slot>
                </div>

                <div class="project-tools">
                    <custom-typography type="label">The tools and technologies I used in the project:</custom-typography>
                    <slot name="project-tools"></slot>
                </div>

                <div class="project-description">
                    <custom-typography type="label">Project Description:</custom-typography>
                    <slot name="project-description"></slot>
                </div>

                <div class="popup-content">
                    <slot></slot>
                </div>
            </div>
        `;

        this.shadowRoot.querySelector('custom-icon').addEventListener('click', this.hide);
    }

    show() {
        this.style.display = 'flex';
    }

    hide() {
        this.style.display = 'none';
    }
}

window.customElements.define('custom-project-popup', CustomPopup);