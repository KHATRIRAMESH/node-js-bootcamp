import * as postsService from '../services/posts.service.js';

/**
 * Get all posts
 * GET /api/post/
 */
export const getAllPosts = async (req, res) => {
    try {
        const posts = await postsService.getAllPosts();
        res.status(200).json({
            message: "Successfully fetched posts",
            data: posts
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching posts" });
    }
};

/**
 * Get a single post by ID
 * GET /api/post/:id
 */
export const getPostById = async (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const post = await postsService.getPostById(postId);

        if (!post) {
            return res.status(404).json({ message: "Post not found" });
        }

        res.status(200).json({
            message: "Post fetched successfully",
            data: post
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error fetching post" });
    }
};

/**
 * Create a new post
 * POST /api/post/
 */
export const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            return res.status(400).json({
                message: "Title and content are required"
            });
        }

        const newPost = await postsService.createPost({
            title,
            content,
            authorId: req.user.id,
        });

        res.status(201).json({
            message: "Post created successfully",
            data: newPost
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error creating post" });
    }
};

/**
 * Update a post
 * PUT /api/post/:id
 */
export const updatePost = async (req, res) => {
    try {
        const postId = parseInt(req.params.id);
        const { title, content } = req.body;

        // Check if post exists
        const existingPost = await postsService.findPostById(postId);
        if (!existingPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the user is the author
        if (existingPost.authorId !== req.user.id) {
            return res.status(403).json({
                message: "You can only update your own posts"
            });
        }

        // Build update object
        const updateData = {};
        if (title) updateData.title = title;
        if (content) updateData.content = content;

        const updatedPost = await postsService.updatePost(postId, updateData);

        res.status(200).json({
            message: "Post updated successfully",
            data: updatedPost
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error updating post" });
    }
};

/**
 * Delete a post
 * DELETE /api/post/:id
 */
export const deletePost = async (req, res) => {
    try {
        const postId = parseInt(req.params.id);

        // Check if post exists
        const existingPost = await postsService.findPostById(postId);
        if (!existingPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        // Check if the user is the author
        if (existingPost.authorId !== req.user.id) {
            return res.status(403).json({
                message: "You can only delete your own posts"
            });
        }

        await postsService.deletePost(postId);

        res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Error deleting post" });
    }
};
