<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Formulário de Cadastro</title>

    <!-- Bootstrap 5 -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css"
          rel="stylesheet">

    <!-- CSS personalizado -->
    <link rel="stylesheet" href="${pageContext.request.contextPath}/resources/css/style.css">
</head>

<body class="bg-light">

    <div class="container py-5">
        <div class="row justify-content-center">
            <div class="col-lg-9">

                <div class="card shadow border-0">
                    <div class="card-header bg-primary text-white text-center py-3">
                        <h1 class="h3 mb-0">Formulário de Cadastro</h1>
                    </div>

                    <div class="card-body p-4">

                        <form id="formCadastro">

                            <h2 class="h5 text-primary mb-3">Dados pessoais</h2>

                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="nome" class="form-label">Nome</label>
                                    <input type="text" class="form-control"
                                           id="nome" name="nome" required>
                                </div>

                                <div class="col-md-6 mb-3">
                                    <label for="sobrenome" class="form-label">Sobrenome</label>
                                    <input type="text" class="form-control"
                                           id="sobrenome" name="sobrenome" required>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="email" class="form-label">E-mail</label>
                                    <input type="email" class="form-control"
                                           id="email" name="email" required>
                                </div>

                                <div class="col-md-6 mb-3">
                                    <label for="senha" class="form-label">Senha</label>
                                    <input type="password" class="form-control"
                                           id="senha" name="senha" minlength="6" required>
                                </div>
                            </div>

                            <hr class="my-4">

                            <h2 class="h5 text-primary mb-3">Endereço</h2>

                            <div class="row">
                                <div class="col-md-4 mb-3">
                                    <label for="cep" class="form-label">CEP</label>
                                    <input type="text" class="form-control"
                                           id="cep" name="cep" maxlength="9" required>
                                </div>

                                <div class="col-md-8 mb-3">
                                    <label for="rua" class="form-label">Rua</label>
                                    <input type="text" class="form-control"
                                           id="rua" name="rua" required>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6 mb-3">
                                    <label for="bairro" class="form-label">Bairro</label>
                                    <input type="text" class="form-control"
                                           id="bairro" name="bairro" required>
                                </div>

                                <div class="col-md-6 mb-3">
                                    <label for="cidade" class="form-label">Cidade</label>
                                    <input type="text" class="form-control"
                                           id="cidade" name="cidade" required>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-4 mb-3">
                                    <label for="estado" class="form-label">Estado</label>
                                    <input type="text" class="form-control"
                                           id="estado" name="estado" maxlength="2" required>
                                </div>

                                <div class="col-md-4 mb-3">
                                    <label for="numero" class="form-label">Número</label>
                                    <input type="text" class="form-control"
                                           id="numero" name="numero" required>
                                </div>

                                <div class="col-md-4 mb-3">
                                    <label for="complemento" class="form-label">Complemento</label>
                                    <input type="text" class="form-control"
                                           id="complemento" name="complemento">
                                </div>
                            </div>

                            <div id="mensagem" class="mb-3" role="status"></div>

                            <button type="submit" class="btn btn-primary w-100">
                                Cadastrar
                            </button>

                        </form>

                    </div>
                </div>

                <p class="text-center text-muted mt-3">
                    Projeto acadêmico — Framework para Desenvolvimento de Software
                </p>

            </div>
        </div>
    </div>

    <script src="${pageContext.request.contextPath}/resources/js/script.js"></script>
</body>
</html>
```
