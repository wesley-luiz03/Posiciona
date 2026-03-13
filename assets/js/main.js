function identificarTipoContato(url) {
    if (url.includes("Essencial")) return "pacote_essencial";
    if (url.includes("Estratégico")) return "pacote_estrategico";
    if (url.includes("Premium")) return "pacote_premium";
    if (url.includes("Individual")) return "pacote_individual";
    if (url.includes("Avulsos")) return "servicos_avulsos";

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

function obterCardsVisiveisPorTela() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 1100) return 2;
    return 3;
}

function configurarCarrosselPlanos() {
    const carrossel = document.querySelector(".plans-carousel");
    const trilha = document.querySelector(".pricing-grid");
    const cards = document.querySelectorAll(".price-card");
    const botaoAnterior = document.querySelector(".plans-prev");
    const botaoProximo = document.querySelector(".plans-next");

    if (!carrossel || !trilha || !cards.length || !botaoAnterior || !botaoProximo) {
        return;
    }

    let indiceAtual = 0;

    function atualizarCarrossel() {
        const cardsVisiveis = obterCardsVisiveisPorTela();
        const card = cards[0];
        const gap = 24;
        const larguraCard = card.getBoundingClientRect().width + gap;
        const ultimoIndice = Math.max(0, cards.length - cardsVisiveis);

        if (indiceAtual > ultimoIndice) {
            indiceAtual = ultimoIndice;
        }

        trilha.style.transform = `translateX(-${indiceAtual * larguraCard}px)`;
        botaoAnterior.disabled = indiceAtual === 0;
        botaoProximo.disabled = indiceAtual >= ultimoIndice;
    }

    botaoAnterior.addEventListener("click", () => {
        indiceAtual -= 1;
        atualizarCarrossel();
    });

    botaoProximo.addEventListener("click", () => {
        indiceAtual += 1;
        atualizarCarrossel();
    });

    window.addEventListener("resize", atualizarCarrossel);
    atualizarCarrossel();
}

function abrirImagemPortfolio(src, alt) {
    const modal = document.getElementById("portfolioModal");
    const imagem = document.getElementById("portfolioModalImage");

    if (!modal || !imagem) {
        return;
    }

    imagem.src = src;
    imagem.alt = alt;
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
}

function fecharImagemPortfolio() {
    const modal = document.getElementById("portfolioModal");
    const imagem = document.getElementById("portfolioModalImage");

    if (!modal || !imagem) {
        return;
    }

    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
    imagem.src = "";
    document.body.classList.remove("modal-open");
}

function configurarModalPortfolio() {
    const itensPortfolio = document.querySelectorAll(".portfolio-item");
    const modal = document.getElementById("portfolioModal");
    const botaoFechar = document.querySelector(".image-modal-close");

    if (!itensPortfolio.length || !modal || !botaoFechar) {
        return;
    }

    itensPortfolio.forEach((item) => {
        const imagem = item.querySelector("img");

        if (!imagem) {
            return;
        }

        item.addEventListener("click", () => {
            abrirImagemPortfolio(imagem.src, imagem.alt);
        });

        item.addEventListener("keydown", (event) => {
            const teclaAtivacao = event.key === "Enter" || event.key === " ";

            if (!teclaAtivacao) {
                return;
            }

            event.preventDefault();
            abrirImagemPortfolio(imagem.src, imagem.alt);
        });
    });

    botaoFechar.addEventListener("click", fecharImagemPortfolio);

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            fecharImagemPortfolio();
        }
    });

    document.addEventListener("keydown", (event) => {
        const modalEstaAberto = modal.classList.contains("active");

        if (event.key === "Escape" && modalEstaAberto) {
            fecharImagemPortfolio();
        }
    });
}

function inicializarSite() {
    configurarFechamentoModal();
    configurarScrollHeader();
    configurarMenuMobile();
    configurarCarrosselPlanos();
    configurarModalPortfolio();
}

inicializarSite();
