import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { prisma } from "../database/prisma.js";

const SECRET = process.env.JWT_SECRET || "secret"; // essa variável de ambiente é usada para assinar os tokens JWT,
// garantindo que eles sejam seguros e não possam ser facilmente falsificados. 

// basicamente, o registro é responsável por criar um novo usuário, criptografar a senha usando bcrypt e gerar um token JWT para o usuário recém-registrado
export const register = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    const existingUser = await prisma.user.findUnique({ where: { email } }); // verifica se já existe um usuário com o mesmo email no banco de dados usando prisma

    if (existingUser) {
        return res.status(400).json({ error: 'Email already in use' });
    }

    const hashedPassword = await bcrypt.hash(password, 10); // fazendo a senha ser criptografada com o bcrypt pegando o password do body e criptografando ele com 10 rounds de salt,
    // esse salt é um valor aleatório que é adicionado à senha antes de ser criptografada, isso ajuda a proteger contra ataques de força bruta

    const newUser = await prisma.user.create({
        data: { name, email, password: hashedPassword }
    }); // cria o novo usuário no banco de dados usando prisma

    const token = jwt.sign({id: newUser.id, email: newUser.email}, SECRET, { expiresIn: '1h'}); // gerando um token JWT para o usuário recém-registrado,
    // o token inclui o ID e email do usuário e tem uma expiração de 1 hora

    const { password: _, ...userWithoutPassword } = newUser; // retirando a senha do objeto de usuário para não enviar ela na resposta
    res.status(201).json({ token, user: userWithoutPassword });
}

export const login = async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } }); // verifica se existe um usuário com o email fornecido usando prisma

    if (!user) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    const isValid = await bcrypt.compare(password, user.password); // verifica se a senha fornecida pelo usuário corresponde à
    // senha armazenada (que está criptografada) usando bcrypt.compare
    if (!isValid) {
        return res.status(400).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({id: user.id, email: user.email}, SECRET, { expiresIn: '1h'}); // se a senha for válida, gera um token JWT para o usuário

    const { password: _, ...userWithoutPassword } = user;
    res.json({ token, user: userWithoutPassword }); // envia o token e os dados do usuário (sem a senha) na resposta
}