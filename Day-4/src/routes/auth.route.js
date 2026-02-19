import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { db } from '../config/db.js';
import { users } from '../models/schema.js';
import { eq } from 'drizzle-orm';

const router = express.Router();

// POST /api/auth/register
router.post("/register", async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        // Validate required fields
        if (!name || !username || !email || !password) {
            return res.status(400).json({ message: "All fields are required (name, username, email, password)" });
        }

        // Check if username already exists
        const existingUsername = await db.select().from(users).where(eq(users.username, username));
        if (existingUsername.length > 0) {
            return res.status(409).json({ message: "Username already exists" });
        }

        // Check if email already exists
        const existingEmail = await db.select().from(users).where(eq(users.email, email));
        if (existingEmail.length > 0) {
            return res.status(409).json({ message: "Email already exists" });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Insert user into database
        const newUser = await db.insert(users).values({
            name,
            username,
            email,
            password: hashedPassword,
        }).returning();

        // Return user without password
        const { password: _, ...userWithoutPassword } = newUser[0];
        res.status(201).json({ message: "User registered successfully", data: userWithoutPassword });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Error registering user" });
    }
});

// POST /api/auth/login
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate required fields
        if (!username || !password) {
            return res.status(400).json({ message: "Username and password are required" });
        }

        // Find user by username
        const userResult = await db.select().from(users).where(eq(users.username, username));
        if (userResult.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const user = userResult[0];

        // Compare passwords
        console.log("password from request:", password)
        console.log("password in db:", user.password)

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, username: user.username, name: user.name },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.status(200).json({ message: "Login successful", token });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Error logging in" });
    }
});

export default router;