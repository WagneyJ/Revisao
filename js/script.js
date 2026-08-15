document.addEventListener("DOMContentLoaded", () => {

    // Navegação suave entre as seções
    const linksNavegacao = document.querySelectorAll("nav a");

    linksNavegacao.forEach(link => {
        link.addEventListener("click", evento => {
            const destino = link.getAttribute("href");

            if (destino?.startsWith("#")) {
                const secaoDestino = document.querySelector(destino);

                if (secaoDestino) {
                    evento.preventDefault();

                    secaoDestino.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        });
    });

    // Destaca no menu a seção atualmente visível
    const secoesPagina = document.querySelectorAll(
        "main section[id], footer[id]"
    );

    const linksMenu = document.querySelectorAll(
        "nav a[href^='#']"
    );

    function destacarSecaoAtual() {
        let idSecaoAtual = "";

        secoesPagina.forEach(secao => {
            if (secao.getBoundingClientRect().top <= 180) {
                idSecaoAtual = secao.id;
            }
        });

        linksMenu.forEach(link => {
            link.classList.toggle(
                "menu-ativo",
                link.getAttribute("href") === `#${idSecaoAtual}`
            );
        });
    }

    window.addEventListener("scroll", destacarSecaoAtual);
    destacarSecaoAtual();

    // Atualiza a contagem regressiva para o evento
    const dataEvento = new Date("2026-09-20T10:00:00-03:00");
    const secaoEvento = document.querySelector("#evento");

    if (secaoEvento) {
        const contadorEvento = document.createElement("p");
        secaoEvento.appendChild(contadorEvento);

        function atualizarContagemRegressiva() {
            const tempoRestante = dataEvento - new Date();

            if (tempoRestante <= 0) {
                contadorEvento.textContent = "O evento já começou!";
                return;
            }

            const diasRestantes = Math.floor(
                tempoRestante / 86400000
            );

            const horasRestantes = Math.floor(
                tempoRestante / 3600000
            ) % 24;

            const minutosRestantes = Math.floor(
                tempoRestante / 60000
            ) % 60;

            const segundosRestantes = Math.floor(
                tempoRestante / 1000
            ) % 60;

            contadorEvento.textContent =
                `Faltam ${diasRestantes} dias, ` +
                `${horasRestantes}h ${minutosRestantes}min e ` +
                `${segundosRestantes}s para o evento.`;
        }

        atualizarContagemRegressiva();
        setInterval(atualizarContagemRegressiva, 1000);
    }

    // Anima as seções quando entram na tela
    const elementosAnimados = document.querySelectorAll(
        "main section, main article, main aside"
    );

    elementosAnimados.forEach(elemento => {
        elemento.style.opacity = "0";
        elemento.style.transform = "translateY(30px)";
        elemento.style.transition =
            "opacity .7s ease, transform .7s ease";
    });

    const observadorSecoes = new IntersectionObserver(
        entradas => {
            entradas.forEach(entrada => {
                if (entrada.isIntersecting) {
                    entrada.target.style.opacity = "1";
                    entrada.target.style.transform = "translateY(0)";
                }
            });
        },
        { threshold: 0.15 }
    );

    elementosAnimados.forEach(elemento => {
        observadorSecoes.observe(elemento);
    });

    // Cria e controla o botão para voltar ao topo
    const botaoVoltarTopo = document.createElement("button");

    botaoVoltarTopo.textContent = "↑";
    botaoVoltarTopo.setAttribute(
        "aria-label",
        "Voltar ao topo"
    );

    Object.assign(botaoVoltarTopo.style, {
        position: "fixed",
        bottom: "25px",
        right: "25px",
        width: "45px",
        height: "45px",
        border: "2px solid white",
        borderRadius: "50%",
        background: "#A10505",
        color: "white",
        fontSize: "22px",
        cursor: "pointer",
        opacity: "0",
        visibility: "hidden",
        transform: "translateY(20px) scale(.8)",
        transition:
            "opacity .3s ease, transform .3s ease, visibility .3s",
        zIndex: "1000"
    });

    document.body.appendChild(botaoVoltarTopo);

    function mostrarOuOcultarBotaoTopo() {
        const paginaRolada = window.scrollY > 400;

        botaoVoltarTopo.style.opacity = paginaRolada ? "1" : "0";
        botaoVoltarTopo.style.visibility =
            paginaRolada ? "visible" : "hidden";
        botaoVoltarTopo.style.transform =
            paginaRolada
                ? "translateY(0) scale(1)"
                : "translateY(20px) scale(.8)";
    }

    window.addEventListener(
        "scroll",
        mostrarOuOcultarBotaoTopo
    );

    botaoVoltarTopo.addEventListener("mouseenter", () => {
        botaoVoltarTopo.style.transform =
            "translateY(-3px) scale(1.1)";
    });

    botaoVoltarTopo.addEventListener("mouseleave", () => {
        botaoVoltarTopo.style.transform =
            "translateY(0) scale(1)";
    });

    botaoVoltarTopo.addEventListener("click", () => {
        botaoVoltarTopo.style.transform = "scale(.8)";

        setTimeout(() => {
            botaoVoltarTopo.style.transform =
                "translateY(0) scale(1)";
        }, 150);

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    });

    // Controla a abertura dos cartões de pratos e chefs
    const cartoesExpansiveis = document.querySelectorAll(
        ".cartao-expansivel"
    );

    cartoesExpansiveis.forEach(cartao => {
        cartao.addEventListener("click", () => {
            const cartaoExpandido =
                cartao.classList.contains("expandido");

            cartoesExpansiveis.forEach(outroCartao => {
                outroCartao.classList.remove("expandido");
            });

            if (!cartaoExpandido) {
                cartao.classList.add("expandido");
            }
        });
    });

    // Controla a abertura das atividades da programação
    const atividadesProgramacao = document.querySelectorAll(
        ".atividade-programacao"
    );

    atividadesProgramacao.forEach(atividade => {
        const tituloAtividade =
            atividade.querySelector(".titulo-atividade");

        tituloAtividade.addEventListener("click", () => {
            const atividadeExpandida =
                atividade.classList.contains("expandida");

            atividadesProgramacao.forEach(
                outraAtividade => {
                    outraAtividade.classList.remove("expandida");
                }
            );

            if (!atividadeExpandida) {
                atividade.classList.add("expandida");
            }
        });
    });

});