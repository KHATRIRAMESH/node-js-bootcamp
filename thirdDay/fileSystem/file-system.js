import fs from "fs"
import path from "path"

const filePath = path.join(process.cwd(), 'data', 'posts.json');

// 1. Read file
const data = fs.readFileSync(filePath, 'utf-8');
const parsedData = await JSON.parse(data);
console.log(parsedData);
// 2. Write file (async way - best practice)
fs.writeFile('log.txt', 'Server started at ' + new Date(), (err) => {
    if (err) throw err;
    console.log('Log written');
});
// 3. Create directory + JSON file (for our future blog)
const posts = [
    { id: 1, title: "My First Blog", content: "Hello World" }
];
fs.mkdirSync('data', { recursive: true });
fs.writeFileSync('data/posts2.json', JSON.stringify(posts, null, 2));
// 4. Read directory
const files = fs.readdirSync('.');
console.log(files);