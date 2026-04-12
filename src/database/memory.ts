import type { User } from '../types/user.ts';

let nextId = 3;

export const users: User[] = [
    { id: '1', name: 'John Doe', email: 'john.doe@example.com', password: 'johndoepass', createdAt: new Date(), updatedAt: new Date() },
    { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', password: 'janesmithpass', createdAt: new Date(), updatedAt: new Date() }
];

export const generateId = (): string => String(nextId++);