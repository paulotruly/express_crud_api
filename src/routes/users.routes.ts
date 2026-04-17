import { Router } from "express";
import { getUsers, getUserById, updateUser, deleteUser } from '../controllers/users.controller.js';
import { authMiddleware } from "../middlewares/auth.middlewares.js";

const router = Router();

router.get('/', getUsers);
router.get('/:id', getUserById);
router.put('/:id', authMiddleware, updateUser);
router.delete('/:id', authMiddleware, deleteUser);

export default router;