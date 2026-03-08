# Express Blog Post API

A RESTful Blog API built with Express.js, Drizzle ORM, and PostgreSQL. This project demonstrates user authentication, CRUD operations for blog posts, and JWT-based authorization.

## Features

- **User Authentication** - Register and login with secure password hashing (bcrypt)
- **JWT Authorization** - Protected routes using JSON Web Tokens
- **Blog Posts CRUD** - Create, read, update, and delete blog posts
- **PostgreSQL Database** - Using Drizzle ORM with Neon serverless PostgreSQL
- **Database Migrations** - Manage schema changes with Drizzle Kit

## Tech Stack

- **Runtime**: Node.js (ES Modules)
- **Framework**: Express.js v5
- **Database**: PostgreSQL (Neon Serverless)
- **ORM**: Drizzle ORM
- **Authentication**: JWT + bcryptjs

---

## Getting Started

Follow these steps to run this project on your local machine.

### Prerequisites

Make sure you have the following installed:

1. **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
2. **npm** (comes with Node.js)
3. **A PostgreSQL database** - You can use [Neon](https://neon.tech/) for a free serverless PostgreSQL database

### Step 1: Clone the Repository

```bash
git clone <repository-url>
cd express-backend
```

### Step 2: Install Dependencies

```bash
npm install
```

This will install all required packages including Express, Drizzle ORM, bcryptjs, and more.

### Step 3: Set Up Environment Variables

Create a `.env` file in the root directory:

```bash
touch .env
```

Add the following variables to your `.env` file:

```env
PORT=3000
DATABASE_URL=your_postgresql_connection_string
JWT_SECRET=your_secret_key_here
```

**How to get these values:**

- `PORT` - The port your server will run on (default: 3000)
- `DATABASE_URL` - Your PostgreSQL connection string. If using Neon:
  1. Go to [neon.tech](https://neon.tech/) and create a free account
  2. Create a new project
  3. Copy the connection string from the dashboard
- `JWT_SECRET` - A random secret string for signing tokens. Generate one with:
  ```bash
  node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
  ```

### Step 4: Run Database Migrations

Set up your database tables by running:

```bash
npm run migrate
```

This creates the `users` and `posts` tables in your database.

### Step 5: Start the Development Server

```bash
npm run dev
```

The server will start at `http://localhost:3000` (or your configured PORT).

---

## API Endpoints

### Authentication

| Method | Endpoint             | Description             | Auth Required |
| ------ | -------------------- | ----------------------- | ------------- |
| POST   | `/api/auth/register` | Register a new user     | No            |
| POST   | `/api/auth/login`    | Login and get JWT token | No            |

### Blog Posts

| Method | Endpoint        | Description       | Auth Required     |
| ------ | --------------- | ----------------- | ----------------- |
| GET    | `/api/post`     | Get all posts     | No                |
| GET    | `/api/post/:id` | Get a single post | No                |
| POST   | `/api/post`     | Create a new post | Yes               |
| PUT    | `/api/post/:id` | Update a post     | Yes (author only) |
| DELETE | `/api/post/:id` | Delete a post     | Yes (author only) |

---

## Usage Examples

### Register a New User

```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "username": "johndoe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

### Login

```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "password123"
  }'
```

This returns a JWT token. Use it in the `Authorization` header for protected routes.

### Create a Post (Authenticated)

```bash
curl -X POST http://localhost:3000/api/post \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "title": "My First Post",
    "content": "This is the content of my first blog post."
  }'
```

---

## Project Structure

```
Day-4/
├── src/
│   ├── app.js                  # Main application entry point
│   ├── config/
│   │   └── db.js               # Database connection
│   ├── controllers/
│   │   ├── auth.controller.js  # Auth request handlers (register, login)
│   │   └── posts.controller.js # Posts request handlers (CRUD operations)
│   ├── middleware/
│   │   └── authMiddleware.js   # JWT authentication middleware
│   ├── models/
│   │   └── schema.js           # Drizzle ORM schema (users, posts)
│   ├── routes/
│   │   ├── auth.route.js       # Authentication route definitions
│   │   └── posts.route.js      # Blog post route definitions
│   ├── services/
│   │   ├── auth.service.js     # Auth business logic (user CRUD, JWT, password)
│   │   └── posts.service.js    # Posts business logic (database operations)
│   └── utils/                  # Utility functions
├── drizzle/                    # Database migrations
├── drizzle.config.js           # Drizzle Kit configuration
├── package.json
└── README.md
```

### Architecture

The project follows a **layered architecture** pattern:

- **Routes** → Define API endpoints and apply middleware
- **Controllers** → Handle HTTP requests/responses and validation
- **Services** → Contain business logic and database operations

---

## Available Scripts

| Command            | Description                              |
| ------------------ | ---------------------------------------- |
| `npm run dev`      | Start development server with hot reload |
| `npm run generate` | Generate new database migrations         |
| `npm run migrate`  | Apply database migrations                |
| `npm run test`     | Run tests with Jest                      |

---

## Troubleshooting

### "DATABASE_URL is not set"

Make sure you created a `.env` file with your database connection string.

### "Connection refused" or database errors

- Verify your `DATABASE_URL` is correct
- Check if your database server is running
- Ensure your IP is whitelisted (for cloud databases like Neon)

### "Invalid token" or authorization errors

- Make sure you're including the JWT token in the `Authorization` header
- Use the format: `Authorization: Bearer YOUR_TOKEN`
- Tokens expire - try logging in again to get a fresh token

---

## License

ISC
