import closeMenu from "./js/close-menu.js";
import sendMessage from "./js/send-message.js";
import goTo from "./js/go-to.js";
import "./js/media-queries.js";
import "./custom-elements/modules.js";

window.sendMessage = sendMessage;
window.goTo = goTo;
window.closeMenu = closeMenu;

window.openContactPopup = () => {
    const popup = document.querySelector('custom-contact-popup');
    if (popup && typeof popup.show === 'function') {
        popup.show();
    } else {
        console.error('Contact popup not found or not ready');
    }
};

window.openNmbrsPopup = () => {
    const popup = document.querySelector('custom-nmbrs-popup');
    if (popup && typeof popup.show === 'function') {
        popup.show();
    } else {
        console.error('Nmbrs popup not found or not ready');
    }
};

function updateFooterReveal() {
    const footer = document.querySelector('footer');
    const main = document.querySelector('main');

    if (footer && main) {
        const footerHeight = footer.offsetHeight;
        main.style.marginBottom = `${footerHeight}px`;
    }
}

window.addEventListener('resize', updateFooterReveal);
updateFooterReveal();

let ticking = false;

window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            ticking = false;
        });
        ticking = true;
    }
});

window.addEventListener('load', () => {
    updateFooterReveal();

    const savedTheme = localStorage.getItem('theme');
    const body = document.body;
    const icons = document.querySelectorAll('#theme-icon');

    if (savedTheme === 'light') {
        body.classList.add('light-mode');
        icons.forEach(icon => icon.textContent = 'dark_mode');
    }
});

window.toggleTheme = () => {
    const body = document.body;
    body.classList.toggle('light-mode');
    const isLightMode = body.classList.contains('light-mode');

    localStorage.setItem('theme', isLightMode ? 'light' : 'dark');

    const icons = document.querySelectorAll('#theme-icon');
    icons.forEach(icon => {
        icon.textContent = isLightMode ? 'dark_mode' : 'light_mode';
    });
};