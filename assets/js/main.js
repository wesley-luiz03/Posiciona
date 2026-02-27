function iniciarContato(event, url) {
    event.preventDefault(); 
    const modal = document.getElementById('modalObrigado');
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
            window.location.href = url;
        }, 3000);
    }
}

// Fechar no X
document.querySelector('.close-modal').onclick = function() {
    document.getElementById('modalObrigado').style.display = 'none';
}

window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});