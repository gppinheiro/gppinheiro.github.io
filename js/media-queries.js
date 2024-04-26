document.getElementById('burger-menu').addEventListener('click', function() {
    const burgerContent = document.getElementById('burger-menu-content');
    burgerContent.style.display = (burgerContent.style.display === 'none') ? 'flex' : 'none';
});