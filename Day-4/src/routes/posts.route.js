import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import * as postsController from '../controllers/posts.controller.js';

const router = express.Router();

// GET /api/post/ — Get all posts (public)
router.get("/", postsController.getAllPosts);

// GET /api/post/:id — Get single post by ID (public)
router.get("/:id", postsController.getPostById);

// POST /api/post/ — Create a new post (auth required)
router.post("/", authMiddleware, postsController.createPost);

// PUT /api/post/:id — Update a post (auth required, only author)
router.put("/:id", authMiddleware, postsController.updatePost);

// DELETE /api/post/:id — Delete a post (auth required, only author)
router.delete("/:id", authMiddleware, postsController.deletePost);

export default router;