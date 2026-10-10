$(document).ready(function () {
    $("#formCadastro").on("submit", function (event) {
        event.preventDefault();

        let valido = true;
        let primeiroCampoInvalido = null;

        // Limpa os avisos anteriores
        $(".is-invalid").removeClass("is-invalid");
        $(".erro-validacao").remove();

        // Valida todos os campos obrigatórios
        $("#nome, #sobrenome, #email, #senha, #cep, #rua, #bairro, #cidade, #estado, #numero")
            .each(function () {
                const valor = $(this).val().trim();

                if (valor === "") {
                    marcarInvalido($(this), "Este campo é obrigatório.");
                    valido = false;

                    if (!primeiroCampoInvalido) {
                        primeiroCampoInvalido = this;
                    }
                }
            });

        // Validação do e-mail usando expressão regular
        const email = $("#email").val().trim();
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email !== "" && !regexEmail.test(email)) {
            marcarInvalido($("#email"), "Digite um e-mail válido.");
            valido = false;

            if (!primeiroCampoInvalido) {
                primeiroCampoInvalido = document.getElementById("email");
            }
        }

        // Validação da senha
        const senha = $("#senha").val();

        if (senha !== "" && senha.length < 6) {
            marcarInvalido($("#senha"), "A senha deve ter pelo menos 6 caracteres.");
            valido = false;

            if (!primeiroCampoInvalido) {
                primeiroCampoInvalido = document.getElementById("senha");
            }
        }

        if (!valido) {
            $("#mensagem")
                .removeClass("alert-success")
                .addClass("alert alert-danger")
                .text("Verifique os campos destacados e corrija os erros.");

            primeiroCampoInvalido.focus();
            return;
        }

        $("#mensagem")
            .removeClass("alert-danger")
            .addClass("alert alert-success")
            .text("Formulário validado com sucesso! Os dados não foram enviados a um servidor.");
    });

    function marcarInvalido(campo, mensagem) {
        campo.addClass("is-invalid");

        campo.after(
            $("<div>")
                .addClass("erro-validacao text-danger small")
                .text(mensagem)
        );
    }

    // Remove o destaque de erro quando o usuário altera o campo
    $("input").on("input", function () {
        $(this).removeClass("is-invalid");
        $(this).next(".erro-validacao").remove();
    });

    $("#formCadastro").on("reset", function () {
        $(".is-invalid").removeClass("is-invalid");
        $(".erro-validacao").remove();
        $("#mensagem").removeClass("alert alert-success alert-danger").text("");
    });
});
