export default class Project extends HTMLElement {
    static get observedAttributes() {
        return ['id', 'imageUrl', 'title', 'status'];
    }

    constructor() {
        super();
        this.id = this.getAttribute('id') || '';
        this.imageUrl = this.getAttribute('imageUrl') || '';
        this.title = this.getAttribute('title') || '';
        this.status = this.getAttribute('status') || '';
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./custom-elements/project/project.css">
            <div class="card">
                ${this.renderStatusLabel()}
                ${this.renderExpandIcon()}
                ${this.renderImage()}
                ${this.renderContent()}
            </div>
        `;

        const expandIcon = this.shadowRoot.querySelector('.expand-icon');
        if (expandIcon) {
            expandIcon.addEventListener('click', this.openPopup.bind(this));
        }
    }

    renderStatusLabel() {
        if (!this.status) return '';

        const statusLabels = {
            'in-progress': 'In Progress',
            'on-hold': 'On Hold',
            'done': 'Done'
        };

        const label = statusLabels[this.status] || this.status;

        return `
            <div class="status-badge status-${this.status}">
                <custom-typography type="label">${label}</custom-typography>
            </div>
        `;
    }

    renderExpandIcon() {
        // Don't show expand icon for in-progress projects
        if (this.status === 'in-progress') {
            return '';
        }

        return `
            <div class="expand-icon">
                <custom-icon size="m">open_in_full</custom-icon>
            </div>
        `;
    }

    renderImage() {
        return `
            <div class="project-image">
                <img src="${this.imageUrl}" alt="${this.title}">
            </div>
        `;
    }

    renderContent() {
        return `
            <div class="content">
                <custom-typography type="h3" weight="bold">${this.title}</custom-typography>
                <custom-typography type="p">
                    <slot></slot>
                </custom-typography>
            </div>
        `;
    }

    openPopup() {
        if (this.id !== '') {
            const popup = document.getElementById(`popup-${this.id}`);
            popup.show();
        }
    }
}

customElements.define('custom-project', Project);