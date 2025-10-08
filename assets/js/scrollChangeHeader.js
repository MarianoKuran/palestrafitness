const header = document.getElementById('header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('bg-gray-950');
    } else {
        header.classList.remove('bg-gray-950');
    }
});