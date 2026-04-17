import type { Request, Response } from "express";
import type { User, CreateUserDTO, UpdateUserDTO } from '../types/user.ts';
import {prisma} from '../database/prisma.js';
import type { AuthRequest } from '../middlewares/auth.middlewares.js';

export const getUsers = async (_req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.json(users);
}

export const getUserById = async (req: Request, res: Response) => {
    const user = await prisma.user.findUnique({
        where: { id: req.params.id as string}
    });

    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
}

export const createUser = async (req: Request, res: Response) => {
    const {name, email, password} = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email and password are required' });
    }

    const newUser = await prisma.user.create({
        data: {name, email, password}
    });
    res.status(201).json(newUser);
}

export const updateUser = async (req: AuthRequest, res: Response) => {
    const { name, email, password } = req.body;
    try {
        const updatedUser = await prisma.user.update({
            where: { id: req.user!.id},
            data: { name, email, password }
        });
        res.json(updatedUser);
    } catch {
        return res.status(404).json({ error: 'User not found' });
    }
}
export const deleteUser = async (req: AuthRequest, res: Response) => {
    try {
        await prisma.user.delete({
            where: { id: req.user!.id}
        });
        res.status(204).send();
    } catch {
        return res.status(404).json({ error: 'User not found' });
    }
}
