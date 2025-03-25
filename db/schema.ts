import { relations } from 'drizzle-orm'
import { pgTable, text, timestamp, uuid } from 'drizzle-orm/pg-core'
// Users Table
export const usersTable = pgTable('users_table', {
  id: uuid('id').primaryKey().defaultRandom(), // UUID Primary Key
  name: text('name').notNull(),
  email: text('email').notNull().unique(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date())
})

export const inquiriesTable = pgTable('inquiries_table', {
  id: uuid('id').primaryKey().defaultRandom(),
  message: text('message').notNull(),
  userId: uuid('user_id')
    .notNull()
    .references(() => usersTable.id, { onDelete: 'cascade' }),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at')
    .notNull()
    .$onUpdate(() => new Date())
})

export const usersRelations = relations(usersTable, ({ many }) => ({
  inquiries: many(inquiriesTable)
}))

export const inquiriesRelations = relations(inquiriesTable, ({ one }) => ({
  user: one(usersTable, {
    fields: [inquiriesTable.userId], // Foreign Key
    references: [usersTable.id]
  })
}))
export type InsertUser = typeof usersTable.$inferInsert
export type SelectUser = typeof usersTable.$inferSelect

export type InsertInquiry = typeof inquiriesTable.$inferInsert
export type SelectInquiry = typeof inquiriesTable.$inferSelect
