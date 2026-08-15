document.addEventListener("DOMContentLoaded", () => {

    // Elementos do formulário
    const formularioParticipacao = document.querySelector("#formulario-participacao");
    const campoNome = document.querySelector("#nome");
    const campoEmail = document.querySelector("#email");
    const campoCPF = document.querySelector("#cpf");
    const campoTelefone = document.querySelector("#telefone");
    const campoQuantidade = document.querySelector("#quantidade");
    const campoAtividade = document.querySelector("#atividade");
    const campoConfirmacao = document.querySelector("#confirmacao");
    const mensagemConfirmacao = document.querySelector("#mensagem-confirmacao");

    const QUANTIDADE_MINIMA = 1;
    const QUANTIDADE_MAXIMA = 4;

    // Verifica se o e-mail possui formato válido
    function verificarFormatoEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    // Verifica se o CPF possui onze dígitos
    function verificarQuantidadeDigitosCPF(cpf) {
        return /^\d{11}$/.test(cpf);
    }

    // Verifica se todos os dígitos do CPF são iguais
    function verificarDigitosCPFRepetidos(cpf) {
        return /^(\d)\1{10}$/.test(cpf);
    }

    // Calcula e verifica os dígitos verificadores do CPF
    function verificarValidadeCPF(cpf) {
        if (!verificarQuantidadeDigitosCPF(cpf)) {
            return false;
        }

        if (verificarDigitosCPFRepetidos(cpf)) {
            return false;
        }

        let soma = 0;

        for (let indice = 0; indice < 9; indice++) {
            soma += Number(cpf[indice]) * (10 - indice);
        }

        let resto = (soma * 10) % 11;
        const primeiroDigito = resto === 10 ? 0 : resto;

        if (primeiroDigito !== Number(cpf[9])) {
            return false;
        }

        soma = 0;

        for (let indice = 0; indice < 10; indice++) {
            soma += Number(cpf[indice]) * (11 - indice);
        }

        resto = (soma * 10) % 11;
        const segundoDigito = resto === 10 ? 0 : resto;

        return segundoDigito === Number(cpf[10]);
    }

    // Verifica se o telefone possui quantidade válida de dígitos
    function verificarValidadeTelefone(telefone) {
        const telefoneSemMascara = telefone.replace(/\D/g, "");
        return /^\d{10,11}$/.test(telefoneSemMascara);
    }

    // Verifica se a quantidade de ingressos está dentro do limite
    function verificarQuantidadeIngressos(quantidade) {
        return quantidade >= QUANTIDADE_MINIMA &&
               quantidade <= QUANTIDADE_MAXIMA;
    }

    // Exibe uma mensagem de erro abaixo do campo
    function exibirMensagemErro(campo, mensagem) {
        removerMensagemErro(campo);

        const mensagemErro = document.createElement("small");

        mensagemErro.className = "mensagem-erro";
        mensagemErro.textContent = mensagem;

        campo.parentElement.appendChild(mensagemErro);
        campo.setAttribute("aria-invalid", "true");
    }

    // Remove a mensagem de erro do campo
    function removerMensagemErro(campo) {
        const mensagemErro =
            campo.parentElement.querySelector(".mensagem-erro");

        if (mensagemErro) {
            mensagemErro.remove();
        }

        campo.removeAttribute("aria-invalid");
    }

    // Valida o nome informado
    function validarNome() {
        const nome = campoNome.value.trim();

        if (nome.length < 3) {
            exibirMensagemErro(
                campoNome,
                "Informe seu nome completo."
            );
            return false;
        }

        removerMensagemErro(campoNome);
        return true;
    }

    // Valida o e-mail informado
    function validarEmailInformado() {
        const email = campoEmail.value.trim();

        if (!verificarFormatoEmail(email)) {
            exibirMensagemErro(
                campoEmail,
                "Informe um e-mail válido."
            );
            return false;
        }

        removerMensagemErro(campoEmail);
        return true;
    }

    // Valida o CPF informado
    function validarCPFInformado() {
        const cpf = campoCPF.value.replace(/\D/g, "");

        if (!verificarValidadeCPF(cpf)) {
            exibirMensagemErro(
                campoCPF,
                "Informe um CPF válido."
            );
            return false;
        }

        removerMensagemErro(campoCPF);
        return true;
    }

    // Valida o telefone informado
    function validarTelefoneInformado() {
        if (!verificarValidadeTelefone(campoTelefone.value)) {
            exibirMensagemErro(
                campoTelefone,
                "Informe um telefone válido."
            );
            return false;
        }

        removerMensagemErro(campoTelefone);
        return true;
    }

    // Valida a quantidade de ingressos
    function validarQuantidadeInformada() {
        const quantidade = Number(campoQuantidade.value);

        if (!verificarQuantidadeIngressos(quantidade)) {
            exibirMensagemErro(
                campoQuantidade,
                "A reserva deve ter entre 1 e 4 ingressos."
            );
            return false;
        }

        removerMensagemErro(campoQuantidade);
        return true;
    }

    // Valida a atividade escolhida
    function validarAtividadeEscolhida() {
        if (!campoAtividade.value) {
            exibirMensagemErro(
                campoAtividade,
                "Selecione uma atividade ou escolha todos os eventos."
            );
            return false;
        }

        removerMensagemErro(campoAtividade);
        return true;
    }

    // Valida a confirmação de presença
    function validarConfirmacaoPresenca() {
        if (!campoConfirmacao.checked) {
            exibirMensagemErro(
                campoConfirmacao,
                "Confirme sua presença no evento."
            );
            return false;
        }

        removerMensagemErro(campoConfirmacao);
        return true;
    }

    // Valida todos os campos do formulário
    function validarFormularioParticipacao() {
        const nomeValido = validarNome();
        const emailValido = validarEmailInformado();
        const cpfValido = validarCPFInformado();
        const telefoneValido = validarTelefoneInformado();
        const quantidadeValida = validarQuantidadeInformada();
        const atividadeValida = validarAtividadeEscolhida();
        const confirmacaoValida = validarConfirmacaoPresenca();

        return (
            nomeValido &&
            emailValido &&
            cpfValido &&
            telefoneValido &&
            quantidadeValida &&
            atividadeValida &&
            confirmacaoValida
        );
    }

    // Processa o envio da reserva
    formularioParticipacao.addEventListener("submit", event => {
        event.preventDefault();

        mensagemConfirmacao.textContent = "";
        mensagemConfirmacao.className = "";

        if (!validarFormularioParticipacao()) {
            mensagemConfirmacao.textContent =
                "Verifique os dados informados e tente novamente.";

            mensagemConfirmacao.className = "mensagem-erro";
            return;
        }

        mensagemConfirmacao.textContent =
            "Reserva realizada com sucesso! Esperamos você no festival.";

        mensagemConfirmacao.className = "mensagem-sucesso";

        formularioParticipacao.reset();
    });

    // Valida os campos quando o usuário sai deles
    campoNome.addEventListener("blur", validarNome);
    campoEmail.addEventListener("blur", validarEmailInformado);
    campoCPF.addEventListener("blur", validarCPFInformado);
    campoTelefone.addEventListener("blur", validarTelefoneInformado);

    campoQuantidade.addEventListener(
        "blur",
        validarQuantidadeInformada
    );

    campoAtividade.addEventListener(
        "change",
        validarAtividadeEscolhida
    );

    campoConfirmacao.addEventListener(
        "change",
        validarConfirmacaoPresenca
    );

});