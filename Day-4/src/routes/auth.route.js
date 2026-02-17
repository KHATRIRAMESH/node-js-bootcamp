import express from 'express';

const router = express.Router();

router.post("/register", (req, res) => {
    const { username, password } = req.body;
    // Here you would typically save the user to the database
    res.json({ message: 'User registered successfully' });
});


router.post("/login", (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'password') {
        // Generate a JWT token (for simplicity, we are using a dummy token here)
        const token = 'dummy-jwt-token';
        res.json({ token });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

export default router;