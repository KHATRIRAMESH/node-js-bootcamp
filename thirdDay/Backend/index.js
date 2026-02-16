import express from 'express';
import dotenv from 'dotenv';


dotenv.config();
const app = express();

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/post', (req, res) => {
    res.send('Post request received!');
});

app.get("/post/:id", (req, res) => {
    const postId = req.params.id;
    res.send(`Post ID: ${postId}`);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});