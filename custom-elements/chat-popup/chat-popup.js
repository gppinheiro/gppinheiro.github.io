class CustomChatPopup extends HTMLElement {
    constructor() {
        super();
        this.hide = this.hide.bind(this);
        this.sendMessage = this.sendMessage.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.updateTheme = this.updateTheme.bind(this);
        this.attachShadow({ mode: 'open' });
        this.conversationHistory = [];
        this.themeObserver = null;
        this.API_ENDPOINT = 'https://us-central1-guilherme-ai-chatbot.cloudfunctions.net/guilherme-ai-chat';
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

        if (popup) {
            if (isLightMode) {
                popup.classList.add('light-mode');
            } else {
                popup.classList.remove('light-mode');
            }
        }
    }

    render() {
        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="./custom-elements/chat-popup/chat-popup.css">
            <div class="popup-overlay" id="overlay">
                <div class="popup">
                    <div class="popup-header">
                        <custom-typography type="h3" weight="bold">Chat with Guilherme AI</custom-typography>
                        <custom-icon size="l" id="close-icon">close</custom-icon>
                    </div>

                    <div class="chat-container">
                        <div class="messages" id="messages">
                            <div class="message ai-message">
                                <div class="message-content">
                                    <custom-typography type="label">
                                        Hi! I'm Guilherme AI. Ask me anything about my background, projects, or experience!
                                    </custom-typography>
                                </div>
                            </div>
                        </div>

                        <div class="input-container">
                            <custom-input 
                                id="message-input" 
                                type="text" 
                                placeholder="Type your question...">
                            </custom-input>
                            <button class="send-btn" id="send-btn" aria-label="Send message">
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.01 21L23 12L2.01 3L2 10L17 12L2 14L2.01 21Z" fill="currentColor"/>
                                </svg>
                            </button>
                        </div>
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
        this.shadowRoot.getElementById('send-btn').addEventListener('click', this.sendMessage);

        const input = this.shadowRoot.getElementById('message-input');
        input.addEventListener('keypress', this.handleKeyPress);
    }

    handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.sendMessage();
        }
    }

    addMessage(content, isUser = false) {
        const messagesContainer = this.shadowRoot.getElementById('messages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;

        messageDiv.innerHTML = `
            <div class="message-content">
                <custom-typography type="label">${content}</custom-typography>
            </div>
        `;

        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showTypingIndicator() {
        const messagesContainer = this.shadowRoot.getElementById('messages');
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai-message typing-indicator';
        typingDiv.id = 'typing-indicator';

        typingDiv.innerHTML = `
            <div class="message-content">
                <div class="typing-dots">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;

        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    hideTypingIndicator() {
        const typingIndicator = this.shadowRoot.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }

    async sendMessage() {
        const inputElement = this.shadowRoot.getElementById('message-input');


        const inputField = inputElement.shadowRoot.querySelector('input') || inputElement.shadowRoot.querySelector('textarea');
        const message = inputField ? inputField.value.trim() : '';

        if (!message) return;


        this.addMessage(message, true);


        this.conversationHistory.push({
            role: 'user',
            content: message
        });


        if (inputField) {
            inputField.value = '';
        }


        this.showTypingIndicator();

        try {

            if (this.API_ENDPOINT === 'YOUR_CLOUD_FUNCTION_URL_HERE') {
                throw new Error('API endpoint not configured. Please deploy the Cloud Function and update the API_ENDPOINT.');
            }


            const response = await fetch(this.API_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: message,
                    history: this.conversationHistory.slice(-10)
                })
            });

            if (!response.ok) {
                throw new Error('Failed to get response from server');
            }

            const data = await response.json();


            this.hideTypingIndicator();

            if (data.success && data.response) {

                this.addMessage(data.response, false);


                this.conversationHistory.push({
                    role: 'assistant',
                    content: data.response
                });
            } else {
                throw new Error(data.error || 'Unknown error');
            }

        } catch (error) {
            console.error('Error sending message:', error);
            this.hideTypingIndicator();


            const errorMsg = error.message.includes('API endpoint not configured')
                ? 'The chat is not yet configured. Please contact me directly at pinheiropgui@gmail.com'
                : 'Sorry, I encountered an error. Please try again or contact me at pinheiropgui@gmail.com';

            this.addMessage(errorMsg, false);
        }
    }

    show() {
        this.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        this.updateTheme();


        setTimeout(() => {
            const inputElement = this.shadowRoot.getElementById('message-input');
            if (inputElement) {
                const inputField = inputElement.shadowRoot?.querySelector('input') || inputElement.shadowRoot?.querySelector('textarea');
                if (inputField) {
                    inputField.focus();
                }
            }
        }, 100);
    }

    hide() {
        this.style.display = 'none';
        document.body.style.overflow = '';
    }
}

window.customElements.define('custom-chat-popup', CustomChatPopup);
