class CustomPopup extends HTMLElement {
    static get observedAttributes() {
        return ['projectName'];
    }

    constructor() {
        super();
        this.projectName = this.getAttribute('projectName') || 'Project Name';
        this.hide = this.hide.bind(this);
        this.handleBackdropClick = this.handleBackdropClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
        this.setupEventListeners();
    }

    disconnectedCallback() {
        this.removeEventListeners();
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./custom-elements/project-popup/project-popup.css">
            <div class="popup" role="dialog" aria-modal="true" aria-labelledby="popup-title">
                <header class="popup-header">
                    <custom-typography id="popup-title" type="h2" weight="extra-bold">${this.projectName}</custom-typography>
                    <custom-icon size="xl" aria-label="Close popup" role="button" tabindex="0">close</custom-icon>
                </header>

                <section class="project-quick-links" aria-label="Project links">
                    <slot name="project-links"></slot>
                </section>

                <section class="project-tools" aria-label="Technologies used">
                    <custom-typography type="p" weight="bold">The tools and technologies I used in the project</custom-typography>
                    <slot name="project-tools"></slot>
                </section>

                <section class="project-description" aria-label="Project description">
                    <custom-typography type="p" weight="bold">Project Description</custom-typography>
                    <slot name="project-description"></slot>
                </section>
            </div>
        `;
    }

    setupEventListeners() {
        const closeIcon = this.shadowRoot.querySelector('custom-icon');
        const popup = this.shadowRoot.querySelector('.popup');

        if (closeIcon) {
            closeIcon.addEventListener('click', this.hide);
            // Support keyboard activation of close button
            closeIcon.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.hide();
                }
            });
        }

        // Backdrop click to close
        this.addEventListener('click', this.handleBackdropClick);

        // Scroll detection for sticky header
        if (popup) {
            popup.addEventListener('scroll', this.handleScroll);
        }
    }

    removeEventListeners() {
        document.removeEventListener('keydown', this.handleKeyDown);
        this.removeEventListener('click', this.handleBackdropClick);

        const popup = this.shadowRoot.querySelector('.popup');
        if (popup) {
            popup.removeEventListener('scroll', this.handleScroll);
        }
    }

    handleBackdropClick(e) {
        // Only close if clicking the backdrop (host element), not the popup content
        if (e.target === this) {
            this.hide();
        }
    }

    handleKeyDown(e) {
        // Close on ESC key
        if (e.key === 'Escape') {
            this.hide();
        }
    }

    handleScroll(e) {
        const popup = e.target;
        // Add 'scrolled' class when scrolled down
        if (popup.scrollTop > 10) {
            popup.classList.add('scrolled');
        } else {
            popup.classList.remove('scrolled');
        }
    }

    show() {
        this.style.display = 'flex';

        // Prevent body scroll when popup is open
        document.body.style.overflow = 'hidden';

        // Add keyboard listener
        document.addEventListener('keydown', this.handleKeyDown);

        // Focus the close button for accessibility
        setTimeout(() => {
            const closeIcon = this.shadowRoot.querySelector('custom-icon');
            if (closeIcon) {
                closeIcon.focus();
            }
        }, 100);
    }

    hide() {
        this.style.display = 'none';

        // Restore body scroll
        document.body.style.overflow = '';

        // Remove keyboard listener
        document.removeEventListener('keydown', this.handleKeyDown);

        // Reset scroll position
        const popup = this.shadowRoot.querySelector('.popup');
        if (popup) {
            popup.scrollTop = 0;
            popup.classList.remove('scrolled');
        }
    }
}

window.customElements.define('custom-project-popup', CustomPopup);