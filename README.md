# CRUD com Express

API RESTful básica com TypeScript e Express.

## Tecnologias Atuais

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| Express | 5.2.1 | Framework web |
| TypeScript | 6.0.2 | Linguagem tipada |
| tsx | - | Executador de TypeScript |
| nodemon | 3.1.14 | Auto-reload do servidor |
| cors | 2.8.6 | Permitir requisições de outros domínios |
| dotenv | 17.4.1 | Variáveis de ambiente |

## Como Rodar

```bash
# Instalar dependências
npm install

# Rodar em modo desenvolvimento
npm run dev

# O servidor estará em http://localhost:3000
```

## Endpoints

| Método | URL | Body (JSON) | Descrição |
|--------|-----|-------------|-----------|
| GET | /users | - | Lista todos os usuários |
| GET | /users/:id | - | Busca um usuário pelo ID |
| POST | /users | { "name", "email" } | Cria um novo usuário |
| PUT | /users/:id | { "name"?, "email"? } | Atualiza um usuário |
| DELETE | /users/:id | - | Remove um usuário |

## Estrutura do Projeto

```
src/
├── app.ts              # Configuração do Express
├── server.ts          # Ponto de entrada
├── controllers/
│   └── users.controller.ts  # Lógica das rotas
├── routes/
│   └── users.routes.ts      # Definição das rotas
└── types/
    └── user.ts             # Tipos TypeScript
```

## Próximos passos (Roadmap)

### 1. Sistema de Login com bcrypt

- Hash de senhas com `bcrypt`
- JWT para autenticação
- Middleware de proteção de rotas

### 2. Banco de dados PostgreSQL

- Substituir array em memória por banco real
- Criar tabelas de usuários
- Migrations para versionamento do banco

### 3. Prisma ORM

- Configurar Prisma com PostgreSQL
- Usar Prisma Client para consultas
- Benefícios:
  - Type safety completo
  - Migrations automáticas
  - Queries type-safe

### 4. Middlewares

| Middleware | Função |
|------------|--------|
| CORS | Já instalado, configurar para domínios específicos |
| Morgan | Logging de requisições HTTP |
| helmet | Segurança (headers HTTP) |
| express-validator | Validação de dados |

---