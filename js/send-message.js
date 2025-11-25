export default function sendMessage(context = document) {
    const name = context.getElementById('contact-name');
    const email = context.getElementById('contact-email');
    const company = context.getElementById('contact-company');
    const message = context.getElementById('contact-message');
    // Handle both Shadow DOM (querySelector) and regular DOM
    const submitButton = context.querySelector ?
        context.querySelector('#contact-buttons custom-button') :
        context.getElementById('contact-buttons').querySelector('custom-button');

    if (isFormValid(name, email, message)) {
        const data = {
            name: name.value,
            email: email.value,
            company: company.value,
            message: message.value
        };
        submitButton.setAttribute('disabled', 'true');
        showToast("Sending message...", "info");

        sendEmail(data)
            .then(() => {
                showToast("Message sent successfully!");
            })
            .catch(error => {
                //console.error("Error sending message:", error);
                showToast("Failed to send message. Please try again.", "error");
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
    return fetch('https://nodejs-server-4olhbqwz7a-ew.a.run.app/send-email', {
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

function showToast(message, type = "success") {
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
        // Add a close button for errors
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

        let touchStartX = 0;
        let touchEndX = 0;

        toast.addEventListener('touchstart', function (e) {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        toast.addEventListener('touchend', function (e) {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        function handleSwipe() {
            if (touchEndX < touchStartX - 50) {
                toast.classList.add('toast-hidden');
                toast.classList.add('toast-slide-left');
                setTimeout(() => {
                    if (toast && toast.parentNode) {
                        document.body.removeChild(toast);
                    }
                }, 300);
            }
        }
    }
}
