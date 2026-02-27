function iniciarContato(event, url) {
    event.preventDefault(); 
    
    // Identifica qual plano foi clicado com base na URL ou texto do link
    let plano = "contato_geral";
    if (url.includes("Essencial")) plano = "pacote_essencial";
    if (url.includes("Autoridade")) plano = "pacote_autoridade";
    if (url.includes("Premium")) plano = "pacote_premium";

    // Envia o dado para o seu servidor Python (Back-end)
    fetch('https://posiciona-backend.onrender.com/api/track', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ evento: plano })
    })
    .then(response => console.log("Métrica enviada!"))
    .catch(error => console.error("Erro ao salvar métrica:", error));

    // Abre o modal de obrigado que criamos antes
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