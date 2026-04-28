import { Router } from "express";
import { getPostById, getPosts, updatePost, createPost, deletePost } from "../controllers/posts.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";

const router = Router();

router.get('/post/:id', getPostById);
router.get('/post', getPosts);
router.post('/post', authMiddleware, createPost);
router.put('/post/:id', authMiddleware, updatePost);
router.delete('/post/:id', authMiddleware, deletePost);

export default router;