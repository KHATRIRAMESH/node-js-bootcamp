import express from 'express';
import { db } from '../config/db.js';
import { posts } from '../models/schema.js';
// import { posts } from '../models/posts.schema.js';


const router = express.Router();

router.get("/", async (req, res) => {
    try {
        console.log("Fetching posts from the database...");
        const postsData = await db.select().from(posts);
        res.status(200).json({ message: "Successfully fetched posts", data: postsData });
    } catch (error) {
        console.error(error);
        res.status(500).send("Error fetching posts");
    }
});

router.post("/", async (req, res) => {
    try {
        console.log("Request body:", req.body); // Log the request body to see its structure
        const title = req.body.title || "New Post";
        await db.insert(posts).values({
            title: title
        });
        res.status(201).send("Post created successfully");

    } catch (error) {
        console.error(error);
        res.status(500).send("Error creating post");
    }
})
export default router;