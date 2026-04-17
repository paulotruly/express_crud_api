# CRUD com Express

API RESTful com TypeScript, Express, PostgreSQL, Prisma ORM e autenticação JWT.

## Tecnologias

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| Express | 5.2.1 | Framework web |
| TypeScript | 6.0.2 | Linguagem tipada |
| tsx | 4.21.0 | Executador de TypeScript |
| nodemon | 3.1.14 | Auto-reload do servidor |
| cors | 2.8.6 | Permitir requisições de outros domínios |
| morgan | 1.10.0 | Logging de requisições HTTP |
| dotenv | 17.4.1 | Variáveis de ambiente |
| bcryptjs | 3.0.3 | Hash de senhas |
| jsonwebtoken | 9.0.3 | Autenticação JWT |
| PostgreSQL | 17/18 | Banco de dados relacional |
| Prisma | 7.7.0 | ORM para TypeScript |
| pg | 8.20.0 | Driver PostgreSQL para Node.js |

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
| PUT | /users/:id | `{ "name"?, "email"?, "password"? }` | Atualiza um usuário |
| DELETE | /users/:id | - | Remove um usuário |

## Banco de dados

### PostgreSQL

Banco de dados relacional configurado com collation `C` para evitar problemas de compatibilidade.

### Prisma ORM

Schema definido em `prisma/schema.prisma` com o modelo `User`:

```prisma
model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  password  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## Estrutura do projeto

```
src/
├── app.ts                    # Configuração do Express
├── server.ts                 # Ponto de entrada
├── database/
│   └── prisma.ts            # Cliente Prisma com PostgreSQL
├── controllers/
│   ├── auth.controller.ts   # Lógica de autenticação
│   └── users.controller.ts  # Lógica de usuários
├── routes/
│   ├── auth.routes.ts       # Rotas de autenticação
│   └── users.routes.ts      # Rotas de usuários
├── middlewares/
│   └── auth.middlewares.ts  # Middleware de autenticação JWT
└── types/
    └── user.ts              # Tipos TypeScript

prisma/
└── schema.prisma            # Schema do Prisma

.env                         # Variáveis de ambiente
```

## Segurança

- Senhas são hasheadas com bcrypt (10 rounds de salt)
- Autenticação via JWT com expiração de 1 hora
- JWT_SECRET deve ser definido no arquivo `.env`
- Rotas PUT e DELETE protegidas com middleware de autenticação
- Usuário só pode editar/deletar seus próprios dados

## Próximos passos

### 1. Middlewares a adicionar

| Middleware | Função |
|------------|--------|
| helmet | Segurança (headers HTTP) |
| express-validator | Validação de dados |

### 2. Melhorias

- Documentação com Swagger/OpenAPI
- Testes automatizados
- Paginação de listagens
- Upload de imagens/perfil