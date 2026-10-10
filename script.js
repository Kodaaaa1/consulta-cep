const formulario = document.getElementById("formCadastro");
const campoCep = document.getElementById("cep");
const botaoCep = document.getElementById("consultarCep");
const mensagem = document.getElementById("mensagem");

function mostrarMensagem(texto, tipo) {
    mensagem.textContent = texto;
    mensagem.className = "mt-3 alert alert-" + tipo;
}

botaoCep.addEventListener("click", consultarCep);

campoCep.addEventListener("blur", () => {
    const cep = campoCep.value.replace(/\D/g, "");

    if (cep.length === 8) {
        consultarCep();
    }
});

async function consultarCep() {
    const cep = campoCep.value.replace(/\D/g, "");

    if (cep.length !== 8) {
        mostrarMensagem("Digite um CEP válido com 8 números.", "warning");
        campoCep.focus();
        return;
    }

    try {
        botaoCep.disabled = true;
        botaoCep.textContent = "Buscando...";

        const resposta = await fetch(`https://viacep.com.br/ws/${cep}/json/`);

        if (!resposta.ok) {
            throw new Error("Não foi possível consultar o CEP.");
        }

        const dados = await resposta.json();

        if (dados.erro) {
            mostrarMensagem("CEP não encontrado. Confira os números.", "danger");
            return;
        }

        document.getElementById("rua").value = dados.logradouro || "";
        document.getElementById("bairro").value = dados.bairro || "";
        document.getElementById("cidade").value = dados.localidade || "";
        document.getElementById("estado").value = dados.uf || "";

        mostrarMensagem("Endereço preenchido com sucesso!", "success");
        document.getElementById("numero").focus();

    } catch (erro) {
        mostrarMensagem("Erro ao consultar o CEP. Tente novamente.", "danger");
    } finally {
        botaoCep.disabled = false;
        botaoCep.textContent = "Buscar CEP";
    }
}

formulario.addEventListener("submit", function(evento) {
    evento.preventDefault();

    if (!formulario.checkValidity()) {
        formulario.reportValidity();
        return;
    }

    mostrarMensagem(
        "Cadastro validado com sucesso! Esta demonstração não salva os dados em um servidor.",
        "success"
    );
});

formulario.addEventListener("reset", function() {
    mensagem.textContent = "";
    mensagem.className = "mt-3";
});
