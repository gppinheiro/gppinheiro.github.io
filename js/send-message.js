export default function sendMessage() {
    const name = document.getElementById('contact-name');
    const email = document.getElementById('contact-email');
    const company = document.getElementById('contact-company');
    const message = document.getElementById('contact-message');

    if (isFormValid(name, email, message)) {
        const data = {
            name: name.value,
            email: email.value,
            company: company.value,
            message: message.value
        };

        sendEmail(data);
    }
}

function isFormValid(nameEl, emailEl, messageEl) {
    let isValid = true;
    const name = nameEl.value;
    const email = emailEl.value;
    const message = messageEl.value;

    if (name === '') {
        nameEl.setAttribute('status' ,'error');
        nameEl.setAttribute('statusmessage' ,'Please enter your name.');
        isValid = false;
    }
    else {
        clearElementStatus(nameEl);
    }

    if (!isEmailValid(email) || email === '') {
        emailEl.setAttribute('status' ,'error');
        emailEl.setAttribute('statusmessage' ,'Please enter a valid email address.');
        isValid = false;
    }
    else {
        clearElementStatus(emailEl);
    }

    if (message === '') {
        messageEl.setAttribute('status' ,'error');
        messageEl.setAttribute('statusmessage' ,'Please enter a message.');
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
    fetch('https://nodejs-server-4olhbqwz7a-ew.a.run.app/send-email', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            subject: `[Guilherme's Website] - New message from ${data.email}`,
            text: `Person Name: ${data.name}\nPerson Company: ${data.company}\nMessage: ${data.message}`
        })
    });
}