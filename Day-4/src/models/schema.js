import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core"


export const posts = pgTable("posts", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    content: text("content").notNull().default(""),
    authorId: integer("authorId").notNull().references(() => users.id),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
})

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    username: text("username").notNull().unique(),
    password: text("password").notNull(),
    email: text("email").notNull().unique(),
})
