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

**Credenciais padrão:**
- Host: `localhost`
- Porta: `5432`
- Usuário: `postgres`
- Banco: `crud_express`

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

## Configuração

### Variáveis de ambiente (.env)

```env
PORT=3000
JWT_SECRET=sua_senha_secreta
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/crud_express"
```

### Instalação do banco PostgreSQL

1. Instale o PostgreSQL (versão 17 ou 18)
2. Crie o banco de dados:
   ```sql
   CREATE DATABASE crud_express WITH LC_COLLATE = 'C' LC_CTYPE = 'C';
   ```
3. Configure a `DATABASE_URL` no `.env` com sua senha

## Próximos passos

### 1. Proteger rotas de usuários

- Adicionar middleware de autenticação JWT
- Rotas de usuários devem exigir token válido
- Usuário só pode editar/deletar a si mesmo

### 2. Middlewares

| Middleware | Função |
|------------|--------|
| helmet | Segurança (headers HTTP) |
| express-validator | Validação de dados |
| morgan | Logging de requisições HTTP |

### 3. Melhorias

- Documentação com Swagger/OpenAPI
- Testes automatizados
- Paginação de listagens
- Upload de imagens/perfil