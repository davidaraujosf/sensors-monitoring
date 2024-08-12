# Aplicação de Monitoramento de Sensores

## Visão Geral

Esta aplicação é um sistema de monitoramento de sensores desenvolvido com Next.js, React e GraphQL. Ela permite visualizar dados de sensores, adicionar novos dados e fazer upload de arquivos CSV com informações de sensores.

## Instalação e Execução

1. Instale o Node.js 20 em: [https://nodejs.org/en](https://nodejs.org/en)

2. Instale as dependências:

```bash
npm install
```

3. Inicializar o projeto:

```bash
npm run dev
```

4. Acesse a aplicação no navegador em: [http://localhost:3000](http://localhost:3000)

## Tecnologias Utilizadas

- **React 18**: Biblioteca JavaScript para construção de interfaces de usuário.
- **TypeScript 5**: Superset do JavaScript que adiciona tipagem estática ao código.
- **Next.js 14.2.5**: Framework React para desenvolvimento de aplicações web.
- **GraphQL 16.9.0**: Linguagem de consulta para APIs.
- **Apollo Client 3.11.4**: Cliente GraphQL para fazer queries e mutations.
- **Axios 1.7.3**: Biblioteca para fazer requisições HTTP.
- **Material-UI 5.16.6**: Biblioteca de componentes de interface.
- **Chart.js 4.4.3**: Biblioteca para visualização de dados em gráficos.
- **Jest 29.7.0**: Framework de testes para JavaScript.
- **React Testing Library 16.0.0**: Conjunto de utilitários para testar componentes React.
- **React Toastify 10.0.5**: Biblioteca para exibir notificações.

## Estrutura do Projeto

O projeto segue a estrutura padrão de uma aplicação Next.js, com algumas pastas adicionais:

- **/app**: Contém os componentes principais da aplicação, incluindo o layout e a página inicial.
- **/components**: Componentes React reutilizáveis.
- **/api**: Definições de queries e mutations GraphQL.
- **/types**: Definições de tipos TypeScript.
- **/public**: Arquivos estáticos.

## Componentes

- **components/dashboard**: Componente principal que exibe o dashboard com gráfico, tabela e controles.
- **components/sensor-chart**: Renderiza um gráfico de linha usando Chart.js para visualizar médias dos sensores.
- **components/sensor-table**: Exibe uma tabela com informações detalhadas dos sensores.
- **components/sensor-input-form**: Formulário para adicionar novos dados de sensores.
- **components/sensor-csv-upload**: Componente para upload de arquivos CSV com dados de sensores.

## Testes

Cada componente possui arquivos de teste correspondentes (`.test.tsx`) que utilizam Jest e React Testing Library para testes unitários.

Para rodar os testes, execute o comando:

```bash
npm run test
```

Para gerar o relatório de cobertura de testes, execute o comando:

```bash
npm run test:coverage
```

## API

- **api/sensor.ts**: Define as queries e mutations GraphQL para interação com o backend.

## Tipos

- **types/sensors.ts**: Define interfaces TypeScript para os tipos de dados dos sensores.

## Arquivos Extras

- **azure-pipeline.yml**: Define o pipeline de CI/CD para Azure DevOps, incluindo etapas de instalação, teste, build e deploy.
- **apollo-client.ts**: Configura o cliente Apollo para comunicação GraphQL.
- **enviroment.ts**: Define variáveis de ambiente para a aplicação.
