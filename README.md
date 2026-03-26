# Frontend - DataEscola

O frontend do projeto é uma SPA (Single Page Application) desenvolvida com **React (v19)**, **TypeScript** e **Vite**, utilizando **Tailwind CSS (v4)** para a estilização.

------------------------------------------------------------------------

## Pré-requisitos

Antes de executar o projeto, certifique-se de ter instalado em sua máquina:

- Node.js (versão 18 ou superior)
- NPM (gerenciador de pacotes padrão do Node)

------------------------------------------------------------------------

## Instalando as dependências

1.  Acesse a pasta principal do frontend do projeto:

    ```bash
    cd frontend-censo-escolar
    ```

2.  Execute o comando abaixo para baixar e instalar as bibliotecas necessárias:

    ```bash
    npm install
    ```

Esse comando irá ler o arquivo `package.json` e instalar todas as dependências do projeto na pasta `node_modules`, incluindo:
- Bibliotecas de roteamento (`react-router-dom`)
- Ferramentas de mapas (`leaflet`, `react-leaflet`)
- Gráficos e visualização de dados (`echarts`, `echarts-for-react`)
- Ícones (`lucide-react`)

------------------------------------------------------------------------

## Iniciando o ambiente de desenvolvimento

Para rodar a aplicação localmente com suporte a *hot-reload* (atualização em tempo real ao salvar o código), execute:


  ```bash
    npm run dev
  ```

------------------------------------------------------------------------

## Acessando a aplicação

Após iniciar o servidor pelo Vite, o frontend estará disponível no navegador no endereço:

    http://localhost:5173
