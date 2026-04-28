import type { Request, Response } from "express";
import {prisma} from '../database/prisma.js';
import type { AuthRequest } from '../middlewares/auth.middlewares.js';

export const getPosts = async (_req: Request, res: Response) => {
    const posts = await prisma.post.findMany();
    res.json(posts);
}

export const getPostById = async (req: Request, res: Response) => {
    const post = await prisma.post.findUnique({
        where: { id: req.params.id as string}
    });

    if (!post) {
        return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
}

export const createPost = async (req: AuthRequest, res: Response) => {
    const {title, content} = req.body;

    if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
    }

    const newPost = await prisma.post.create({
        data: {
            title,
            content,
            userId: req.user!.id 
        }
    });
    res.status(201).json(newPost);
}

export const updatePost = async (req: AuthRequest, res: Response) => {
    const {title, content} = req.body;
    const postId = req.params.id;

    const post = await prisma.post.findUnique({
        where: { id: postId as string }
    });

    if (!post) { 
        return res.status(404).json({ error: 'Post not found' });
    }

    if (post.userId !== req.user!.id) {
        return res.status(403).json({ error: 'You are not the author of this post' });
    }

    const updatedPost = await prisma.post.update({
        where: { id: postId as string },
        data: { title, content }
    });
    res.json(updatedPost);
}
export const deletePost = async (req: AuthRequest, res: Response) => {
    const postId = req.params.id; 

    const post = await prisma.post.findUnique({
        where: { id: postId as string}
    });

    if (!post) { 
        return res.status(404).json({ error: 'Post not found' });
    }

    if (post.userId !== req.user!.id) {
        return res.status(403).json({ error: 'You are not the author of this post' });
    }

    await prisma.post.delete({
        where: { id: postId as string }
    });
    res.status(204).send();
}
