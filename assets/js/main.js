function identificarTipoContato(url) {
    if (url.includes("Essencial")) return "pacote_essencial";
    if (url.includes("Autoridade")) return "pacote_autoridade";
    if (url.includes("Premium")) return "pacote_premium";

    return "contato_geral";
}

function enviarMetricaContato(tipoContato) {
    return fetch("https://posiciona-backend.onrender.com/api/track", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ evento: tipoContato })
    });
}

function obterModalContato() {
    return document.getElementById("modalObrigado");
}

function abrirModalContato() {
    const modal = obterModalContato();

    if (!modal) {
        return false;
    }

    modal.style.display = "flex";
    return true;
}

function fecharModalContato() {
    const modal = obterModalContato();

    if (!modal) {
        return;
    }

    modal.style.display = "none";
}

function redirecionarParaContato(url) {
    setTimeout(() => {
        window.location.href = url;
    }, 3000);
}

function iniciarContato(event, url) {
    event.preventDefault();

    const tipoContato = identificarTipoContato(url);

    enviarMetricaContato(tipoContato)
        .then(() => console.log("Métrica enviada!"))
        .catch((error) => console.error("Erro ao salvar métrica:", error));

    const modalFoiAberto = abrirModalContato();

    if (modalFoiAberto) {
        redirecionarParaContato(url);
        return;
    }

    window.location.href = url;
}

function atualizarEstadoHeader() {
    const header = document.querySelector("header");

    if (!header) {
        return;
    }

    const usuarioRolouPagina = window.scrollY > 50;
    header.classList.toggle("scrolled", usuarioRolouPagina);
}

function configurarScrollHeader() {
    window.addEventListener("scroll", atualizarEstadoHeader);
    atualizarEstadoHeader();
}

function configurarFechamentoModal() {
    const botaoFecharModal = document.querySelector(".close-modal");

    if (!botaoFecharModal) {
        return;
    }

    botaoFecharModal.addEventListener("click", fecharModalContato);
}

function fecharMenuMobile(navLinks) {
    navLinks.classList.remove("active");
}

function alternarMenuMobile(navLinks) {
    navLinks.classList.toggle("active");
}

function configurarMenuMobile() {
    const botaoMenu = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (!botaoMenu || !navLinks) {
        return;
    }

    botaoMenu.addEventListener("click", () => {
        alternarMenuMobile(navLinks);
    });

    const linksDoMenu = navLinks.querySelectorAll("a");

    linksDoMenu.forEach((link) => {
        link.addEventListener("click", () => {
            fecharMenuMobile(navLinks);
        });
    });
}

function inicializarSite() {
    configurarFechamentoModal();
    configurarScrollHeader();
    configurarMenuMobile();
}

inicializarSite();