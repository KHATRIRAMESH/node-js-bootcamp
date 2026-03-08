import * as authService from '../services/auth.service.js';

/**
 * Register a new user
 * POST /api/auth/register
 */
export const register = async (req, res) => {
    try {
        const { name, username, email, password } = req.body;

        // Validate required fields
        if (!name || !username || !email || !password) {
            return res.status(400).json({
                message: "All fields are required (name, username, email, password)"
            });
        }

        // Check if username already exists
        const existingUsername = await authService.findUserByUsername(username);
        if (existingUsername) {
            return res.status(409).json({ message: "Username already exists" });
        }

        // Check if email already exists
        const existingEmail = await authService.findUserByEmail(email);
        if (existingEmail) {
            return res.status(409).json({ message: "Email already exists" });
        }

        // Create user
        const user = await authService.createUser({ name, username, email, password });

        res.status(201).json({
            message: "User registered successfully",
            data: user
        });

    } catch (error) {
        console.error("Registration error:", error);
        res.status(500).json({ message: "Error registering user" });
    }
};

/**
 * Login user
 * POST /api/auth/login
 */
export const login = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Validate required fields
        if (!username || !password) {
            return res.status(400).json({
                message: "Username and password are required"
            });
        }

        // Find user by username
        const user = await authService.findUserByUsername(username);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Compare passwords
        const isPasswordValid = await authService.comparePassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT token
        const token = authService.generateToken(user);

        res.status(200).json({ message: "Login successful", token });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ message: "Error logging in" });
    }
};
