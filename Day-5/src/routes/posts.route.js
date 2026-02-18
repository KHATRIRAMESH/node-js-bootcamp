import express from 'express';
import { db } from '../config/db.js';
import { posts } from '../models/schema.js';



const router = express.Router();

router.get("/", async (req, res) => {
    try {
        console.log("Fetching posts from the database...");
        const postsData = await db.select().from(posts);
        if (!postsData || postsData.length === 0) {
            console.log("No posts found in the database.");
            return res.status(404).send("No posts found");
        }
        console.log("Posts fetched successfully:", postsData);
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