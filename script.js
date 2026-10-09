// ==============================
// ELEMENTOS DA PÁGINA
// ==============================

const formulario = document.getElementById("formulario-cep");
const campoCep = document.getElementById("cep");
const botaoConsultar = document.getElementById("btn-consultar");
const mensagem = document.getElementById("mensagem");

// Campos que receberão os dados do endereço
const campoLogradouro = document.getElementById("logradouro");
const campoBairro = document.getElementById("bairro");
const campoCidade = document.getElementById("cidade");
const campoEstado = document.getElementById("estado");
const campoComplemento = document.getElementById("complemento");

// ==============================
// FUNÇÕES AUXILIARES
// ==============================

// Exibe mensagens para o usuário
function exibirMensagem(texto, tipo) {
    mensagem.textContent = texto;

    if (tipo === "erro") {
        mensagem.style.color = "#dc2626";
    } else if (tipo === "sucesso") {
        mensagem.style.color = "#15803d";
    } else {
        mensagem.style.color = "#475569";
    }
}

// Limpa os campos do endereço
function limparEndereco() {
    campoLogradouro.value = "";
    campoBairro.value = "";
    campoCidade.value = "";
    campoEstado.value = "";
    campoComplemento.value = "";
}

// Formata o CEP enquanto o usuário digita
campoCep.addEventListener("input", function () {
    let cep = campoCep.value.replace(/\D/g, "");

    if (cep.length > 8) {
        cep = cep.substring(0, 8);
    }

    if (cep.length > 5) {
        campoCep.value = cep.substring(0, 5) + "-" + cep.substring(5);
    } else {
        campoCep.value = cep;
    }
});

// ==============================
// CONSULTA DO CEP
// ==============================

formulario.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    // Remove caracteres que não sejam números
    const cep = campoCep.value.replace(/\D/g, "");

    // Limpa os dados de uma consulta anterior
    limparEndereco();

    // Valida se o CEP possui oito dígitos
    if (!/^\d{8}$/.test(cep)) {
        exibirMensagem(
            "Digite um CEP válido com 8 números.",
            "erro"
        );

        campoCep.focus();
        return;
    }

    // Informa que a consulta está acontecendo
    botaoConsultar.disabled = true;
    botaoConsultar.textContent = "Consultando...";
    exibirMensagem("Buscando endereço...", "info");

    try {
        // Consulta a API ViaCEP
        const resposta = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );

        // Verifica se a requisição foi bem-sucedida
        if (!resposta.ok) {
            throw new Error("Não foi possível consultar o CEP.");
        }

        // Converte a resposta para JSON
        const dados = await resposta.json();

        // Verifica se o CEP existe
        if (dados.erro) {
            exibirMensagem(
                "CEP não encontrado. Verifique os números digitados.",
                "erro"
            );

            campoCep.focus();
            return;
        }

        // Preenche os campos com os dados recebidos
        campoLogradouro.value = dados.logradouro || "";
        campoBairro.value = dados.bairro || "";
        campoCidade.value = dados.localidade || "";
        campoEstado.value = dados.uf || "";
        campoComplemento.value = dados.complemento || "";

        // Exibe mensagem de sucesso
        exibirMensagem(
            "Endereço encontrado com sucesso!",
            "sucesso"
        );

    } catch (erro) {
        console.error("Erro na consulta do CEP:", erro);

        exibirMensagem(
            "Não foi possível consultar o CEP. Verifique sua conexão e tente novamente.",
            "erro"
        );

    } finally {
        // Restaura o botão após a consulta
        botaoConsultar.disabled = false;
        botaoConsultar.textContent = "Consultar CEP";
    }
});
```
