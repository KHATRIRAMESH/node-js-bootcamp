
import "dotenv/config.js";
import express from 'express';
import postsRoute from "./routes/posts.route.js"
import authRoutes from "./routes/auth.route.js"

const app = express();

app.use(express.json()); // Middleware to parse JSON bodies



app.get("/", (req, res) => {
    res.send("Blog Post API - Welcome!");
});

app.use("/api/post", postsRoute);
app.use("/api/auth", authRoutes);

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});
