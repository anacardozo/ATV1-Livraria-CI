# 🚀 Pipeline CI/CD e Infraestrutura - Projeto Livraria (IEC)

Este projeto foi desenvolvido para a disciplina de IEC (Integração e Entrega Contínua). O foco deste repositório é a **esteira de desenvolvimento**, garantindo padronização de código, conteinerização e a preparação para uma pipeline de CI/CD, utilizando a API de uma livraria como base.

## 🛠️ Tecnologias de Infraestrutura e Qualidade

* **Conteinerização:** Docker e Docker Compose

* **Padronização de Código:** ESLint e Prettier

* **Automação de Git Hooks:** [Husky](https://typicode.github.io/husky/)

* **Gerenciador de Pacotes:** [pnpm](https://pnpm.io/pt/)

* **Pipeline (CI/CD):** Preparado para GitHub Actions / GitLab CI

* **Backend:** Node.js com TypeScript e PostgreSQL

## 📋 Pré-requisitos

Para trabalhar neste projeto (tanto para rodar a infraestrutura quanto para formatar o código localmente), você precisará de:

* [Git](https://git-scm.com/)

* [Node.js](https://nodejs.org/en/)

* [pnpm](https://pnpm.io/installation)

* [Docker](https://docs.docker.com/get-docker/)

* [Docker Compose](https://docs.docker.com/compose/install/)

## 🛠️ Como instalar, configurar e rodar o projeto

### 1. Clone o repositório

```
git clone https://github.com/anacardozo/ATV1-Livraria-CI.git
cd https://github.com/anacardozo/ATV1-Livraria-CI.git

```

### 2. Instalação das Dependências (Para Validação Local)

Mesmo que a aplicação vá rodar dentro do Docker, precisamos instalar as dependências localmente para que o ESLint, o Prettier e a sua IDE funcionem corretamente durante o desenvolvimento, além de instalar os ganchos do Husky.

Como é um monorepo, instale nos três níveis:

```
# Na raiz do projeto
pnpm install

# Na pasta do backend
cd backend
pnpm install
cd ..

# Na pasta do app
cd app
pnpm install
cd ..

```

### 3. Configuração das Variáveis de Ambiente (.env)

Para rodar via Docker, a configuração do banco de dados deve apontar para o container do banco, e não para a sua máquina local.

Crie o arquivo `.env` (na pasta do backend ou raiz, conforme sua estrutura) a partir do exemplo:

```
cp .env.example .env

```

**Configure o `.env` especificamente para o Docker:**
Como usaremos o Docker Compose, o host do banco de dados deve ser o nome do serviço do banco definido no `docker-compose.yml` (geralmente `db` ou `postgres`).

```
# Configurações do Servidor
PORT=3000
NODE_ENV=development

# Configuração do Banco de Dados PostgreSQL (DOCKER)
DB_PORT=5432
DB_DIALECT=postgres
DB_NAME=sua_base_de_dados
DB_USER=seu_usuario
DB_PASSWORD=sua_senha

# OBRIGATÓRIO PARA DOCKER COMPOSE:
DB_HOST=db
DB_SSL=false

```

### 4. Boas Práticas, Qualidade de Código e Husky (CI Local)

Este projeto implementa a cultura de **Shift-Left Testing** usando o **Husky**. Isso significa que as validações começam na própria máquina do desenvolvedor, antes mesmo do código chegar no repositório remoto.

Toda vez que você tenta fazer um `git commit`, o Husky aciona um gatilho (um *pre-commit hook*) que roda o ESLint e o Prettier automaticamente no seu código.

* **Se o código estiver no padrão:** O commit é realizado com sucesso.
* 🛑 **Se o código tiver erros de padronização:** O Husky **bloqueia** o commit e exibe os erros no terminal. 

Caso seu commit seja bloqueado, você deve corrigir os erros apontados ou rodar os comandos de correção automática:

```
# Tenta corrigir automaticamente os erros de sintaxe e estilo
pnpm run lint --fix

# Corrige a formatação do código
pnpm run format

```
Após rodar os comandos acima, não se esqueça de usar `git add .` novamente antes de tentar commitar mais uma vez.

### 5. Configuração e Execução do Docker

A aplicação foi desenhada para rodar isolada. Antes de subir o container, o projeto utiliza um arquivo **`.dockerignore`** na raiz.
Ele impede que pastas pesadas e arquivos locais (como `node_modules`, `.env`, e `.git`) sejam copiados para a imagem do Docker, deixando o build rápido e seguro.

Para subir toda a infraestrutura (banco de dados e a aplicação) localmente, execute na raiz do projeto:

```
docker compose up -d

```

* `-d`: Roda em segundo plano (detached mode).

Para acompanhar os logs da aplicação rodando no Docker:

```
docker compose logs -f

```

Para derrubar os containers:

```
docker compose down

```

## 🔄 Arquitetura da Pipeline (CI/CD)

O projeto está estruturado para rodar uma esteira automatizada sempre que houver um `push` ou `Pull Request` para a branch `main`. O fluxo (Pipeline) funciona da seguinte forma:

1. **Validação Local (Husky):** O desenvolvedor é impedido de commitar código com falhas de lint/formatação.
2. **Setup:** A pipeline remota prepara o ambiente virtual e instala Node.js e pnpm.
3. **Instalação:** Executa `pnpm install` utilizando cache.
4. **Validação Contínua (CI):** Roda o ESLint e o Prettier novamente, para garantir que nada passou despercebido. Se quebrar, a pipeline falha.
5. **Build:** O Docker constrói a imagem oficial da aplicação utilizando o `Dockerfile`.
6. **Deploy (CD):** A imagem gerada é enviada para um Registry e atualizada no ambiente de produção.
