import { Router } from "express";
import { getPostById, getPosts, updatePost, createPost, deletePost, getPaginatedPosts } from "../controllers/posts.controller.js";
import { authMiddleware } from "../middlewares/auth.middlewares.js";

const router = Router();

router.get('/', getPaginatedPosts);
router.get('/:id', getPostById);
router.post('/', authMiddleware, createPost);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);

export default router;