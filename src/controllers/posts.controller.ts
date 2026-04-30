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

export const getPaginatedPosts = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1; // definir quantas páginas serão, ele pega os parâmetros da url, tipo /post?page=2&limit=10
    const limit = Number(req.query.limit) || 10; // definir o limite de posts por página
    const skip = (page - 1) * limit; // quantos registros ignorar antes de começar a pegar, por exemplo pag 1 - 1 = 0, 0 * 10 = 0, então ele skipa 0 posts e começa a pegar do 1 ao 10
    const selectParam = req.query.select as string | undefined; // ainda não entendi daqui pra baixo

    const select: Record<string, boolean> = selectParam // pega a rota e faz um split, deixando no formato [valor, true ou false] 
        ? Object.fromEntries(selectParam.split(',').map(f => [f.trim(), true]))
        : {};
    // exemplo: /post?select=title,likes -> "title,likes" -> ["title", "likes"] -> [["title", true], ["likes", true]]
    // o .fromEntries transforma em { title: true, likes: true } pra buscar no prisma APENAS esses campos
    // pode ser usado pra gets que não precisamos do retorno de TODOS os parametros 

    const [posts, total] = await Promise.all([ // aqui serve pra executar as duas queries ao mesmo tempo
        prisma.post.findMany({ skip, take: limit, ...(Object.keys(select).length ? { select } : {}) }), // buscar os posts da pagina atual
        prisma.post.count(), //conta todos os posts
    ]);
    res.json({ posts, total, page, limit }); 

    // o resultado seria: 
    // {
    // "posts": [
    //     { "id": "...", "title": "...", "likes": 5 },
    //     ...
    // ],
    // "total": 47,      total de posts no banco (pra calcular quantas páginas existem)
    // "page": 2,        página atual
    // "limit": 10       itens por página
    // }
}