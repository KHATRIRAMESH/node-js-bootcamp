import { pgTable, serial, text } from "drizzle-orm/pg-core"


export const posts = pgTable("posts", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
})

export const users = pgTable("users", {
    id: serial("id").primaryKey(),
    name: text("name").notNull(),
    email: text("email").notNull().unique(),
})