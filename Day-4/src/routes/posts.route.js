import express from 'express';
import { db } from '../config/db.js';
import { posts, users } from '../models/schema.js';
import { eq } from 'drizzle-orm';
import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

// GET /api/post/ — Get all posts (public)
router.get("/", async (req, res) => {
    try {
        const postsData = await db.select({
            id: posts.id,
            title: posts.title,
            content: posts.content,
            authorId: posts.authorId,
            createdAt: posts.createdAt,
            authorName: users.name,
        }).from(posts).leftJoin(users, eq(posts.authorId, users.id));

        res.status(200).json({ message: "Successfully fetched posts", data: postsData });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error fetching posts" });
    }
});

// GET /api/post/:id — Get single post by ID (public)
router.get("/:id", async (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const postData = await db.select({
            id: posts.id,
            title: posts.title,
            content: posts.content,
            authorId: posts.authorId,
            createdAt: posts.createdAt,
            authorName: users.name,
        }).from(posts).leftJoin(users, eq(posts.authorId, users.id)).where(eq(posts.id, postId));

        if (postData.length === 0) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({ message: "Post fetched successfully", data: postData[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching post" });
    }
});

// POST /api/post/ — Create a new post (auth required)
router.post("/", authMiddleware, async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({ message: "Title and content are required" });
        }

        const newPost = await db.insert(posts).values({
            title,
            content,
            authorId: req.user.id,
        }).returning();

        res.status(201).json({ message: "Post created successfully", data: newPost[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating post" });
    }
});

// PUT /api/post/:id — Update a post (auth required, only author)
router.put("/:id", authMiddleware, async (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const { title, content } = req.body;

        // Check if post exists
        const existingPost = await db.select().from(posts).where(eq(posts.id, postId));
        if (existingPost.length === 0) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the user is the author
        if (existingPost[0].authorId !== req.user.id) {
            return res.status(403).json({ message: "You can only update your own posts" });
        }

        // Build update object
        const updateData = {};
        if (title) updateData.title = title;
        if (content) updateData.content = content;

        const updatedPost = await db.update(posts).set(updateData).where(eq(posts.id, postId)).returning();

        res.status(200).json({ message: "Post updated successfully", data: updatedPost[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating post" });
    }
});

// DELETE /api/post/:id — Delete a post (auth required, only author)
router.delete("/:id", authMiddleware, async (req, res) => {
    try {
        const postId = parseInt(req.params.id);

        // Check if post exists
        const existingPost = await db.select().from(posts).where(eq(posts.id, postId));
        if (existingPost.length === 0) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the user is the author
        if (existingPost[0].authorId !== req.user.id) {
            return res.status(403).json({ message: "You can only delete your own posts" });
        }

        await db.delete(posts).where(eq(posts.id, postId));

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting post" });
    }
});

export default router;