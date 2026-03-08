import { db } from '../config/db.js';
import { posts, users } from '../models/schema.js';
import { eq } from 'drizzle-orm';

/**
 * Get all posts with author information
 */
export const getAllPosts = async () => {
    return db.select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        authorId: posts.authorId,
        createdAt: posts.createdAt,
        authorName: users.name,
    }).from(posts).leftJoin(users, eq(posts.authorId, users.id));
};

/**
 * Get a single post by ID with author information
 */
export const getPostById = async (postId) => {
    const result = await db.select({
        id: posts.id,
        title: posts.title,
        content: posts.content,
        authorId: posts.authorId,
        createdAt: posts.createdAt,
        authorName: users.name,
    }).from(posts).leftJoin(users, eq(posts.authorId, users.id)).where(eq(posts.id, postId));

    return result.length > 0 ? result[0] : null;
};

/**
 * Find post by ID (without join)
 */
export const findPostById = async (postId) => {
    const result = await db.select().from(posts).where(eq(posts.id, postId));
    return result.length > 0 ? result[0] : null;
};

/**
 * Create a new post
 */
export const createPost = async ({ title, content, authorId }) => {
    const newPost = await db.insert(posts).values({
        title,
        content,
        authorId,
    }).returning();

    return newPost[0];
};

/**
 * Update a post
 */
export const updatePost = async (postId, updateData) => {
    const updatedPost = await db.update(posts)
        .set(updateData)
        .where(eq(posts.id, postId))
        .returning();

    return updatedPost[0];
};

/**
 * Delete a post
 */
export const deletePost = async (postId) => {
    await db.delete(posts).where(eq(posts.id, postId));
};
