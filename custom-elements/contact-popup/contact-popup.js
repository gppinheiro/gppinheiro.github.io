class CustomContactPopup extends HTMLElement {
    constructor() {
        super();
        this.hide = this.hide.bind(this);
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
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
    }

    hide() {
        this.style.display = 'none';
        document.body.style.overflow = '';
    }
}

window.customElements.define('custom-contact-popup', CustomContactPopup);
