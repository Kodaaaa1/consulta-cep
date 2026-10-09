const formulario = document.getElementById("formulario-cep");
const campoCEP = document.getElementById("cep");
const mensagem = document.getElementById("mensagem");
const resultado = document.getElementById("resultado");

formulario.addEventListener("submit", async function (evento) {
    evento.preventDefault();

    const cep = campoCEP.value.replace(/\D/g, "");

    console.log("CEP digitado:", cep);

    if (cep.length !== 8) {
        mensagem.textContent = "Digite um CEP com 8 números.";
        resultado.hidden = true;
        return;
    }

    mensagem.textContent = "Consultando CEP...";
    resultado.hidden = true;

    try {
        const resposta = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );

        console.log("Status da consulta:", resposta.status);

        const dados = await resposta.json();
        console.log("Dados recebidos:", dados);

        if (dados.erro) {
            mensagem.textContent = "CEP não encontrado.";
            return;
        }

        document.getElementById("rua").value =
            dados.logradouro || "";

        document.getElementById("bairro").value =
            dados.bairro || "";

        document.getElementById("cidade").value =
            dados.localidade || "";

        document.getElementById("estado").value =
            dados.uf || "";

        resultado.hidden = false;
        mensagem.textContent = "Endereço encontrado!";

    } catch (erro) {
        console.error("Erro na consulta:", erro);
        mensagem.textContent = "Erro ao consultar o CEP.";
    }
});
```
