# PROJETO PRÁTICO – IMPLEMENTAÇÃO FRONT-END

O objetivo deste teste é avaliar suas habilidades na criação de uma **Single Page Application** (SPA) em JavaScript (ou TypeScript, se preferir), conforme os requisitos abaixo.

# Contexto

A Polícia Judiciária Civil de Mato Grosso disponibiliza uma **API de pessoas desaparecidas**. Sua tarefa é desenvolver uma aplicação que permita ao cidadão:

1.  **Consultar** registros de pessoas desaparecidas ou já localizadas.
2.  **Enviar** informações adicionais (observações, localização, fotos) sobre essas pessoas. A documentação dos endpoints está disponível em:

S➊3 https://abitus-api.geia.vip/swagger-ui/index.html

# Pré-requisitos

*   *   Leia este documento até o fim **antes** de começar.
    *   Consume os dados **em tempo real** (fetch, axios ou biblioteca similar).
    *   Estruture a aplicação em **componentes reutilizáveis**.
    *   Garanta **layout responsivo**, cobrindo os principais tamanhos de tela.
    *   Se usar framework CSS, dê preferência ao **Tailwind CSS**.
    *   Publique o código em um repositório **público no GitHub**.

# Requisitos Gerais

*   *   **Rotas com Lazy Loading** para otimizar carregamento.
    *   Design limpo, organizado e intuitivo.
    *   Empacote a aplicação em **container Docker**, incluindo todas as dependências (bibliotecas, fra- meworks etc.).
    *   Tratamento de erros de requisição.

# Requisitos Específicos

1.  **Tela Inicial**
    *   Exiba cards com foto e dados de quem está desaparecido ou localizado, conforme o sta- tus.
    *   Implemente paginação (mínimo de 10 registros por página).
    *   Disponibilize campo de busca conforme parâmetros suportados pela API.

# Detalhamento do Registro

*   *   Ao clicar em um card, navegue para uma página de detalhes com informações completas.
    *   Destaque visualmente se a pessoa está “Desaparecida” ou “Localizada”.

# Envio de Informações

*   *   Na página de detalhes, inclua botão para o cidadão registrar novas informações.
    *   No formulário, aplique **máscaras de entrada** onde necessário (por exemplo, datas ou tele- fones).
    *   Permita ao usuário indicar a localização avistada e **anexar fotos**.

# Instruções de Entrega

*   **Repositório GitHub**
    *   Público e sem commits após o prazo de entrega.
    *   Inclua **README.md** com:
        *   Seus dados de inscrição.
        *   Passo a passo para instalação, execução e testes.
*   Adicione qualquer dependência que considerar necessária.
*   Garanta que todos os arquivos (código, scripts de build, Dockerfile etc.) estejam versionados.