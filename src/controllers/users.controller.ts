import type { Request, Response } from "express";
import type { User, CreateUserDTO, UpdateUserDTO } from '../types/user.ts';

const users: User[] = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', createdAt: new Date(), updatedAt: new Date() },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', createdAt: new Date(), updatedAt: new Date() }
];
let nextId = 3;

export const getUsers = (_req: Request, res: Response) => {
    res.json(users);
}

export const getUserById = (req: Request, res: Response) => {
    const user = users.find(u => u.id === req.params.id);
    if (!user) {
        return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
}

export const createUser = (req: Request, res: Response) => {
    const data: CreateUserDTO = req.body;
    if (!data.name || !data.email) {
        return res.status(400).json({ error: 'Name and email are required' });
    }
    const newUser: User = {
        id: String(nextId++),
        ...data,
        createdAt: new Date(),
        updatedAt: new Date()
    };
    users.push(newUser);
    res.status(201).json(newUser);
}

export const updateUser = (req: Request, res: Response) => {
    const index = users.findIndex(u => u.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    const data: UpdateUserDTO = req.body;
    const existingUser = users[index]!;
    const updatedUser: User = {
        id: existingUser.id,
        name: data.name ?? existingUser.name, 
        email: data.email ?? existingUser.email,
        createdAt: existingUser.createdAt,
        updatedAt: new Date()
    };
    users[index] = updatedUser;
    res.json(updatedUser);
}

export const deleteUser = (req: Request, res: Response) => {
    const index = users.findIndex(u => u.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ error: 'User not found' });
    }
    users.splice(index, 1);
    res.status(204).send();
};
