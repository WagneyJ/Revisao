document.addEventListener("DOMContentLoaded", () => {

    // Navegação suave
    document.querySelectorAll("nav a").forEach(link => {
        link.addEventListener("click", event => {
            const destino = link.getAttribute("href");

            if (destino?.startsWith("#")) {
                const secao = document.querySelector(destino);

                if (secao) {
                    event.preventDefault();
                    secao.scrollIntoView({
                        behavior: "smooth",
                        block: "start"
                    });
                }
            }
        });
    });

    // Destaque do menu
    const secoes = document.querySelectorAll("main section[id], footer[id]");
    const menuLinks = document.querySelectorAll("nav a[href^='#']");

    function atualizarMenu() {
        let atual = "";

        secoes.forEach(secao => {
            if (secao.getBoundingClientRect().top <= 180) {
                atual = secao.id;
            }
        });

        menuLinks.forEach(link => {
            link.classList.toggle(
                "ativo",
                link.getAttribute("href") === `#${atual}`
            );
        });
    }

    window.addEventListener("scroll", atualizarMenu);
    atualizarMenu();

    // Contagem regressiva
    const evento = new Date("2026-09-20T10:00:00-03:00");
    const secaoEvento = document.querySelector("#evento");

    if (secaoEvento) {
        const contador = document.createElement("p");
        secaoEvento.appendChild(contador);

        function atualizarContador() {
            const diferenca = evento - new Date();

            if (diferenca <= 0) {
                contador.textContent = "O evento já começou!";
                return;
            }

            const dias = Math.floor(diferenca / 86400000);
            const horas = Math.floor(diferenca / 3600000) % 24;
            const minutos = Math.floor(diferenca / 60000) % 60;
            const segundos = Math.floor(diferenca / 1000) % 60;

            contador.textContent =
                `Faltam ${dias} dias, ${horas}h ${minutos}min e ${segundos}s para o evento.`;
        }

        atualizarContador();
        setInterval(atualizarContador, 1000);
    }

    // Animação das seções
    const elementos = document.querySelectorAll(
        "main section, main article, main aside"
    );

    elementos.forEach(elemento => {
        elemento.style.opacity = "0";
        elemento.style.transform = "translateY(30px)";
        elemento.style.transition = "opacity .7s ease, transform .7s ease";
    });

    const observador = new IntersectionObserver(entradas => {
        entradas.forEach(entrada => {
            if (entrada.isIntersecting) {
                entrada.target.style.opacity = "1";
                entrada.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.15 });

    elementos.forEach(elemento => observador.observe(elemento));

// Botão voltar ao topo
const botaoTopo = document.createElement("button");

botaoTopo.textContent = "↑";
botaoTopo.setAttribute("aria-label", "Voltar ao topo");

Object.assign(botaoTopo.style, {
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
    transition: "opacity .3s ease, transform .3s ease, visibility .3s",
    zIndex: "1000"
});

document.body.appendChild(botaoTopo);

window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
        botaoTopo.style.opacity = "1";
        botaoTopo.style.visibility = "visible";
        botaoTopo.style.transform = "translateY(0) scale(1)";
    } else {
        botaoTopo.style.opacity = "0";
        botaoTopo.style.visibility = "hidden";
        botaoTopo.style.transform = "translateY(20px) scale(.8)";
    }
});

botaoTopo.addEventListener("mouseenter", () => {
    botaoTopo.style.transform = "translateY(-3px) scale(1.1)";
});

botaoTopo.addEventListener("mouseleave", () => {
    botaoTopo.style.transform = "translateY(0) scale(1)";
});

botaoTopo.addEventListener("click", () => {
    botaoTopo.style.transform = "scale(.8)";

    setTimeout(() => {
        botaoTopo.style.transform = "scale(1)";
    }, 150);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

    // Itens expansíveis
    const itens = document.querySelectorAll(".item-expansivel");

    itens.forEach(item => {
        item.addEventListener("click", () => {
            const aberto = item.classList.contains("aberto");

            itens.forEach(outro => outro.classList.remove("aberto"));

            if (!aberto) {
                item.classList.add("aberto");
            }
        });
    });

    // Programação expansível
    const atividades = document.querySelectorAll(".atividade");

    atividades.forEach(atividade => {
        atividade.querySelector(".atividade-titulo")
            .addEventListener("click", () => {

                const aberta = atividade.classList.contains("aberta");

                atividades.forEach(item => item.classList.remove("aberta"));

                if (!aberta) {
                    atividade.classList.add("aberta");
                }
            });
    });

});