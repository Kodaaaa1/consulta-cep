document.addEventListener("DOMContentLoaded", function () {
    const campoCep = document.getElementById("cep");
    const botaoCep = document.getElementById("consultarCep");

    if (!campoCep) {
        console.error("Campo CEP não encontrado.");
        return;
    }

    async function consultarCep() {
        const cep = campoCep.value.replace(/\D/g, "");

        if (cep.length !== 8) {
            alert("Digite um CEP válido com 8 números.");
            campoCep.focus();
            return;
        }

        try {
            if (botaoCep) {
                botaoCep.disabled = true;
                botaoCep.textContent = "Buscando...";
            }

            const resposta = await fetch(
                `https://viacep.com.br/ws/${cep}/json/`
            );

            if (!resposta.ok) {
                throw new Error("Falha na consulta do CEP.");
            }

            const dados = await resposta.json();

            if (dados.erro) {
                alert("CEP não encontrado. Verifique os números.");
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

        } catch (erro) {
            alert("Não foi possível consultar o CEP. Tente novamente.");
            console.error(erro);
        } finally {
            if (botaoCep) {
                botaoCep.disabled = false;
                botaoCep.textContent = "Buscar CEP";
            }
        }
    }

    if (botaoCep) {
        botaoCep.addEventListener("click", consultarCep);
    }

    campoCep.addEventListener("blur", function () {
        const cep = campoCep.value.replace(/\D/g, "");

        if (cep.length === 8) {
            consultarCep();
        }
    });
});
