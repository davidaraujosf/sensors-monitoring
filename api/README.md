# API de Monitoramento de Sensores

## Visão Geral

Esta aplicação é uma API GraphQL construída com FastAPI e Strawberry para gerenciar dados de sensores. Ela oferece funcionalidades para consultar, criar, atualizar e excluir informações de sensores, bem como calcular médias e somatórios de leituras em períodos específicos.

## Instalação e Execução

1. Instale a última versão do Python em: [https://www.python.org/downloads/](https://www.python.org/downloads/)

2. Inicialize o ambiente virtual:

```bash
python -m venv .venv
```

3. Ative o ambiente virtual:

```bash
.\.venv\Scripts\activate
```

4. Instale as dependências:

```bash
pip install -r requirements.txt
```

5. Execute a aplicação com FastAPI:

```bash
uvicorn main:app --reload
```

## Tecnologias Utilizadas

- **FastAPI 0.112.0**: Framework web para construção de APIs.
- **Strawberry 0.237.3**: Biblioteca para criar APIs GraphQL.
- **PyMongo 4.8.0**: Banco de dados NoSQL para armazenamento.
- **Pandas 2.2.2**: Biblioteca para manipulação de dados.
- **PyDantic 2.8.2**: Biblioteca para criação de modelos de dados.
- **Locust 2.31.2**: Ferramenta para testes de carga.

## Estrutura do Projeto

O projeto está organizado da seguinte forma:

- **main.py**: Arquivo principal que configura a aplicação FastAPI e as rotas GraphQL.
- **config/db.py**: Configuração do banco de dados MongoDB.
- **requests/sensor_requests.py**: Define o esquema GraphQL, incluindo tipos, consultas e mutações.
- **models/sensor_models.py**: Define os modelos de dados para os sensores.
- **routes/sensor_routes.py**: Define as rotas para upload de dados via CSV.
- **services/sensor_services.py**: Define os serviços para processamento de dados.
- **load_tests/**: Contém scripts para testes de carga.
- **run_queries_tests.py**: Testes para consultas GraphQL.
- **run_mutations_tests.py**: Testes para mutações GraphQL.
- **locustfile.py**: Configuração do Locust para testes de carga.

## Funcionalidades Principais

### Consultas (Queries):

- Listar todos os sensores.
- Calcular médias de leituras de sensores.
- Calcular somatórios de leituras de sensores.

### Mutações (Mutations):

- Criar novo sensor.
- Atualizar informações de sensor existente.
- Excluir sensor.

## Testes de Carga

1. Para executar os testes de carga, execute o comando:

```bash
locust
```

2. Acesse a interface do Locust em [http://localhost:8089](http://localhost:8089).

Obs: Para executar os testes de carga, é necessária a execução do projeto.

## Playground GraphQL

Acesse a interface do GraphQL em [http://localhost:8000/graph](http://localhost:8000/graph).
