import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../config/db.js';
import { users } from '../models/schema.js';
import { eq } from 'drizzle-orm';

/**
 * Find user by username
 */
export const findUserByUsername = async (username) => {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result.length > 0 ? result[0] : null;
};

/**
 * Find user by email
 */
export const findUserByEmail = async (email) => {
    const result = await db.select().from(users).where(eq(users.email, email));
    return result.length > 0 ? result[0] : null;
};

/**
 * Hash a password
 */
export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
};

/**
 * Compare password with hash
 */
export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};

/**
 * Generate JWT token
 */
export const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, username: user.username, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    );
};

/**
 * Create a new user
 */
export const createUser = async ({ name, username, email, password }) => {
    const hashedPassword = await hashPassword(password);

    const newUser = await db.insert(users).values({
        name,
        username,
        email,
        password: hashedPassword,
    }).returning();

    // Return user without password
    const { password: _, ...userWithoutPassword } = newUser[0];
    return userWithoutPassword;
};
