import { PrismaClient } from "@prisma/client/extension";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

// pool é a conexão com o banco de dados, e o PrismaPg é o adaptador para o PostgreSQL
const pool = new PrismaPg({
    connectionString: process.env.DATABASE_URL!,
});

// aqui ele cria uma instância do PrismaClient usando o adaptador do PostgreSQL
// usaremos isso pra acessar o banco de dados em outras partes do código
export const prisma = new PrismaClient({adapter: pool});