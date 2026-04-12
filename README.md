# CRUD com Express

API RESTful com TypeScript, Express e autenticação JWT.

## Tecnologias

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| Express | 5.2.1 | Framework web |
| TypeScript | 6.0.2 | Linguagem tipada |
| tsx | 4.21.0 | Executador de TypeScript |
| nodemon | 3.1.14 | Auto-reload do servidor |
| cors | 2.8.6 | Permitir requisições de outros domínios |
| dotenv | 17.4.1 | Variáveis de ambiente |
| bcryptjs | 3.0.3 | Hash de senhas |
| jsonwebtoken | 9.0.3 | Autenticação JWT |

## Endpoints

### Autenticação

| Método | URL | Body (JSON) | Descrição |
|--------|-----|-------------|-----------|
| POST | /auth/register | `{ "name", "email", "password" }` | Criar conta e receber token |
| POST | /auth/login | `{ "email", "password" }` | Login e receber token |

### Usuários

| Método | URL | Body (JSON) | Descrição |
|--------|-----|-------------|-----------|
| GET | /users | - | Lista todos os usuários |
| GET | /users/:id | - | Busca um usuário pelo ID |
| PUT | /users/:id | `{ "name"?, "email"? }` | Atualiza um usuário |
| DELETE | /users/:id | - | Remove um usuário |

## Estrutura do projeto

```
src/
├── app.ts                    # Configuração do Express
├── server.ts                # Ponto de entrada
├── database/
│   └── memory.ts            # Banco de dados em memória
├── controllers/
│   ├── auth.controller.ts   # Lógica de autenticação
│   └── users.controller.ts  # Lógica de usuários
├── routes/
│   ├── auth.routes.ts       # Rotas de autenticação
│   └── users.routes.ts      # Rotas de usuários
└── types/
    └── user.ts              # Tipos TypeScript
```

## Segurança

- Senhas são hasheadas com bcrypt (10 rounds de salt)
- Autenticação via JWT com expiração de 1 hora
- JWT_SECRET deve ser definido no arquivo `.env`

## Roadmap

### 1. Banco de dados PostgreSQL

- Substituir array em memória por banco real
- Criar tabelas de usuários
- Migrations para versionamento do banco

### 2. Prisma ORM

- Configurar Prisma com PostgreSQL
- Usar Prisma Client para consultas
- Benefícios:
  - Type safety completo
  - Migrations automáticas
  - Queries type-safe

### 3. Middlewares

| Middleware | Função |
|------------|--------|
| CORS | Já instalado, configurar para domínios específicos |
| Morgan | Logging de requisições HTTP |
| helmet | Segurança (headers HTTP) |
| express-validator | Validação de dados |

### 4. Proteger rotas de usuários

- Adicionar middleware de autenticação
- Rotas de usuários exigem token JWT válido