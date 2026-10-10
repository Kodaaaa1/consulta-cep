document.addEventListener("DOMContentLoaded", function () {
    const formulario = document.getElementById("formCadastro");
    const mensagem = document.getElementById("mensagem");

    formulario.addEventListener("submit", function (evento) {
        evento.preventDefault();

        if (!formulario.checkValidity()) {
            formulario.reportValidity();
            return;
        }

        mensagem.textContent =
            "Formulário preenchido corretamente!";
        mensagem.className = "alert alert-success mb-3";
    });
});
```
