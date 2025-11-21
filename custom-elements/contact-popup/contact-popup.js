class CustomContactPopup extends HTMLElement {
    constructor() {
        super();
        this.hide = this.hide.bind(this);
        this.updateTheme = this.updateTheme.bind(this);
        this.attachShadow({ mode: 'open' });
        this.themeObserver = null;
    }

    connectedCallback() {
        this.render();
        this.setupThemeObserver();
        this.updateTheme();
    }

    disconnectedCallback() {
        if (this.themeObserver) {
            this.themeObserver.disconnect();
        }
    }

    setupThemeObserver() {
        // Observe changes to body's class attribute to detect theme changes
        this.themeObserver = new MutationObserver(() => {
            this.updateTheme();
        });

        this.themeObserver.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        });
    }

    updateTheme() {
        const isLightMode = document.body.classList.contains('light-mode');
        const popup = this.shadowRoot.querySelector('.popup');
        const submitButton = this.shadowRoot.querySelector('custom-button');

        if (popup) {
            if (isLightMode) {
                popup.classList.add('light-mode');
            } else {
                popup.classList.remove('light-mode');
            }
        }

        if (submitButton) {
            submitButton.setAttribute('mode', isLightMode ? 'dark' : 'light');
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./custom-elements/contact-popup/contact-popup.css">
            <div class="popup-overlay" id="overlay">
                <div class="popup">
                    <div class="popup-header">
                        <custom-typography type="h3" weight="bold">Get In Touch</custom-typography>
                        <custom-icon size="l" icon="close" id="close-icon">close</custom-icon>
                    </div>

                    <div class="popup-content">
                        <custom-typography type="p">
                            Interested in working together? We should queue up a time to chat.
                        </custom-typography>

                        <form id="contact-form">
                            <div class="form-group">
                                <label for="name"><custom-typography type="label" weight="bold">Name</custom-typography></label>
                                <custom-input id="name" type="text" placeholder="Your Name"></custom-input>
                            </div>

                            <div class="form-group">
                                <label for="email"><custom-typography type="label" weight="bold">Email</custom-typography></label>
                                <custom-input id="email" type="email" placeholder="Your Email"></custom-input>
                            </div>

                            <div class="form-group">
                                <label for="details"><custom-typography type="label" weight="bold">Message</custom-typography></label>
                                <custom-input id="details" type="textarea" placeholder="Write down your message"></custom-input>
                            </div>

                            <div class="form-actions">
                                <custom-button size="l" text="Submit" id="submit-btn"></custom-button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;

        this.shadowRoot.getElementById('close-icon').addEventListener('click', this.hide);
        this.shadowRoot.getElementById('overlay').addEventListener('click', (e) => {
            if (e.target.id === 'overlay') this.hide();
        });

        this.shadowRoot.querySelector('.popup').addEventListener('click', (e) => {
            e.stopPropagation();
        });
    }

    show() {
        this.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        this.updateTheme(); // Ensure theme is current when showing
    }

    hide() {
        this.style.display = 'none';
        document.body.style.overflow = '';
    }
}

window.customElements.define('custom-contact-popup', CustomContactPopup);
