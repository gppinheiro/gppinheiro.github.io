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

function updateFooterReveal() {
    const footer = document.querySelector('footer');
    const main = document.querySelector('main');

    if (footer && main) {
        const footerHeight = footer.offsetHeight;
        main.style.marginBottom = `${footerHeight}px`;
    }
}

window.addEventListener('resize', updateFooterReveal);
// Call initially
updateFooterReveal();

let ticking = false;

// Scroll listener for footer reveal or other future animations
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            // updateContactAnimation(); // Removed
            ticking = false;
        });
        ticking = true;
    }
});

// updateContactAnimation removed as requested
// Ensure footer reveal is calculated after layout
window.addEventListener('load', updateFooterReveal);