# GameZone
## Contextualização

- Muitos jogadores enfrentam dificuldades ao tentar encontrar informações confiáveis sobre jogos antes de comprá-los ou jogá-los;
- Por isso a ideia de criar um sistema onde os jogadores podem avaliar e comentar sobre jogos, proporcionando insights valiosos para outros jogadores e para os desenvolvedores.Não existia nenhuma ferramenta que centralizasse as informações;
- Avaliações positivas podem funcionar como uma forma eficaz de marketing boca a boca, influenciando potenciais compradores a adquirirem o jogo.

## Tecnologias utilizadas
### Backend

- Node.Js: Node.js é um ambiente de execução JavaScript baseado no motor V8 do Google Chrome. Ele permite que os desenvolvedores executem código JavaScript no lado do servidor, fora do navegador. Node.js é conhecido por sua alta performance e escalabilidade, sendo amplamente utilizado para desenvolver aplicativos de rede e servidores;
- Express: Express é um framework web minimalista para Node.js, projetado para construir aplicativos web e APIs robustas de forma rápida e fácil. Ele fornece um conjunto de ferramentas leves e flexíveis para gerenciar rotas, middlewares e integrações com outras bibliotecas, facilitando o desenvolvimento de servidores web;

### Frontend

- React: React é uma biblioteca JavaScript para construção de interfaces de usuário, desenvolvida pelo Facebook. Ele permite criar componentes reutilizáveis que gerenciam seu próprio estado e renderizam de forma eficiente as mudanças na interface. React é amplamente utilizado para desenvolver aplicativos web de página única (SPA) e interfaces de usuário dinâmicas.

## Passo a passo para subir o sistema

1. Clonar os reposório (Back: https://github.com/jhonataas/web-back | Front: https://github.com/jhonataas/web-front);
2. Instalar as dependências em ambos os diretórios (Front e Back);
3. Subir o servidor com:
    ```sh
    nodemon server.js
    ```
4. Subir o front com:
   ```sh
    npm run dev
    ```
5. Criar um arquivo com senha secreta para ser o TOKEN:
    - Na raiz do back, criar um arquivo `.env`
    - Gerar o token. Exemplo:
        - Abrir o CLI de node (digitar `node` no terminal), e em seguida digitar:
            ```js
            require('crypto').randomBytes(64).toString('hex')
            ```
        - Irá gerar um valor de 64Bytes em Hexadecimal.
        - Copiar e inserir como valor de `TOKEN=valor-gerado` no arquivo `.env`
