
import "dotenv/config.js";
import express from 'express';
import cors from 'cors';
import postsRoute from "./routes/posts.route.js"
import authRoutes from "./routes/auth.route.js"

const app = express();

const corsOptions = {
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
}

app.use(cors(corsOptions))
app.use(express.json()); // Middleware to parse JSON bodies

app.get('/debug', async (req, res) => {
    try {
        // Check env var
        if (!process.env.DATABASE_URL) {
            return res.json({ error: 'DATABASE_URL is not set' });
        }

        // Test raw fetch to Neon
        const response = await fetch(process.env.DATABASE_URL.split('@')[1].split('/')[0]);
        res.json({
            dbUrlExists: true,
            dbUrlPrefix: process.env.DATABASE_URL.substring(0, 15),
            fetchStatus: response.status
        });
    } catch (e) {
        res.json({
            dbUrlExists: !!process.env.DATABASE_URL,
            dbUrlPrefix: process.env.DATABASE_URL?.substring(0, 15),
            error: e.message,
            cause: e.cause?.message
        });
    }
});
app.get("/", (req, res) => {
    res.send("Blog Post API - Welcome!");
});

app.use("/api/post", postsRoute);
app.use("/api/auth", authRoutes);

if (process.env.NODE_ENV !== 'production') {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    });
}

export default app;
