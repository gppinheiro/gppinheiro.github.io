export default function goTo(pageUrl, newTab = true) {
    if (newTab) {
        window.open(pageUrl, '_blank');
        return;
    }

    window.location.href = pageUrl;
}