export default function sendMessage(context = document) {
    const name = context.getElementById('contact-name');
    const email = context.getElementById('contact-email');
    const message = context.getElementById('contact-message');

    const submitButton = context.querySelector ?
        context.querySelector('#contact-buttons custom-button') :
        context.getElementById('contact-buttons').querySelector('custom-button');

    if (isFormValid(name, email, message)) {
        const data = {
            name: name.value,
            email: email.value,
            message: message.value
        };
        submitButton.setAttribute('disabled', 'true');
        showToast("Sending message...", "info", submitButton);

        sendEmail(data)
            .then(() => {
                showToast("Message sent successfully!", "success", submitButton);
            })
            .catch(error => {
                showToast("Failed to send message. Please try again.", "error", submitButton);
                submitButton.removeAttribute('disabled');
            });
    }
}

function isFormValid(nameEl, emailEl, messageEl) {
    let isValid = true;
    const name = nameEl.value;
    const email = emailEl.value;
    const message = messageEl.value;

    if (name === '') {
        nameEl.setAttribute('status', 'error');
        nameEl.setAttribute('statusmessage', 'Please enter your name.');
        isValid = false;
    }
    else {
        clearElementStatus(nameEl);
    }

    if (!isEmailValid(email) || email === '') {
        emailEl.setAttribute('status', 'error');
        emailEl.setAttribute('statusmessage', 'Please enter a valid email address.');
        isValid = false;
    }
    else {
        clearElementStatus(emailEl);
    }

    if (message === '') {
        messageEl.setAttribute('status', 'error');
        messageEl.setAttribute('statusmessage', 'Please enter a message.');
        isValid = false;
    }
    else {
        clearElementStatus(messageEl);
    }

    return isValid;
}

function clearElementStatus(element) {
    element.removeAttribute('status');
    element.removeAttribute('statusmessage');
}

function isEmailValid(email) {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function sendEmail(data) {
    const cloudFunctionUrl = 'https://us-central1-guilherme-ai-chatbot.cloudfunctions.net/email-sender';

    return fetch(cloudFunctionUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            subject: `[Guilherme's Website] - New message from ${data.email}`,
            text: `Person Name: ${data.name}\nPerson Company: ${data.company}\nMessage: ${data.message}`
        })
    })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response;
        });
}

function showToast(message, type = "success", targetElement = null) {
    // If a targetElement is provided, we show an inline toast
    if (targetElement && targetElement.parentNode) {
        const parent = targetElement.parentNode;

        // Remove existing inline toast in this container
        const existingToast = parent.querySelector('.toast-inline');
        if (existingToast) {
            parent.removeChild(existingToast);
        }

        const toast = document.createElement('span');
        toast.className = 'toast-inline';

        if (type === "success") {
            toast.classList.add('toast-success');
        } else if (type === "error") {
            toast.classList.add('toast-error');
        } else if (type === "info") {
            toast.classList.add('toast-info');
        }

        toast.textContent = message;

        // Insert before the button to align: Text [Button]
        parent.insertBefore(toast, targetElement);

        // Trigger reflow/animation
        setTimeout(() => {
            toast.classList.add('show');
        }, 10);

        // Auto-remove logic
        if (type !== "error") {
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.parentNode.removeChild(toast);
                    }
                }, 300);
            }, 5000);
        } else {
            // For errors, maybe keep it until user clicks or next action?
            // Or just timeout like before but longer?
            // Existing logic has a close button for errors.
            // For inline, a close button might be tight.
            // Let's stick to timeout for now, or click to dismiss.

            toast.style.cursor = 'pointer';
            toast.title = "Click to dismiss";
            toast.onclick = () => {
                toast.classList.remove('show');
                setTimeout(() => {
                    if (toast.parentNode) {
                        toast.parentNode.removeChild(toast);
                    }
                }, 300);
            };
        }
    } else {
        // Fallback to original fixed positioning implementation
        const existingToast = document.getElementById('toast-notification');
        if (existingToast) {
            document.body.removeChild(existingToast);
        }

        const toast = document.createElement('div');
        toast.id = 'toast-notification';
        toast.className = 'toast-notification';

        if (type === "success") {
            toast.classList.add('toast-success');
        } else if (type === "error") {
            toast.classList.add('toast-error');
        } else if (type === "info") {
            toast.classList.add('toast-info');
        }

        toast.textContent = message;
        document.body.appendChild(toast);

        if (type !== "error") {
            setTimeout(() => {
                toast.classList.add('toast-hidden');
                setTimeout(() => {
                    if (toast && toast.parentNode) {
                        document.body.removeChild(toast);
                    }
                }, 300);
            }, 5000);
        } else {
            const closeBtn = document.createElement('span');
            closeBtn.textContent = '✕';
            closeBtn.className = 'toast-close-btn';
            closeBtn.onclick = function () {
                toast.classList.add('toast-hidden');
                setTimeout(() => {
                    if (toast && toast.parentNode) {
                        document.body.removeChild(toast);
                    }
                }, 300);
            };
            toast.appendChild(closeBtn);
        }
    }
}
