import { desc, eq, sql } from 'drizzle-orm'
import { db } from '../index'
import {
  InsertInquiry,
  InsertUser,
  inquiriesTable,
  usersTable
} from '../schema'

export async function createUser(data: InsertUser) {
  try {
    const [result] = await db
      .insert(usersTable)
      .values(data)
      .returning({ id: usersTable.id })
    return result?.id
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}

export async function createInquiry(data: InsertInquiry) {
  try {
    const [result] = await db
      .insert(inquiriesTable)
      .values(data)
      .returning({ id: inquiriesTable.id })
    return result?.id
  } catch (error) {
    console.error('Error creating inquiry:', error)
    throw error
  }
}

export async function getUserInquiries({
  page = 1,
  limit = 10,
  sort = 'desc',
  search = ''
}: {
  page?: number
  limit?: number
  sort?: 'asc' | 'desc'
  search?: string
}) {
  const offset = (page - 1) * limit
  const baseQuery = db
    .select({
      id: inquiriesTable.id,
      name: usersTable.name,
      email: usersTable.email,
      message: inquiriesTable.message,
      createdAt: inquiriesTable.createdAt
    })
    .from(inquiriesTable)
    .innerJoin(usersTable, eq(inquiriesTable.userId, usersTable.id))
    .$dynamic()

  const searchQuery = search
    ? baseQuery.where(
        sql`LOWER(${usersTable.name}) LIKE LOWER(${`%${search}%`}) OR 
            LOWER(${usersTable.email}) LIKE LOWER(${`%${search}%`}) OR 
            LOWER(${inquiriesTable.message}) LIKE LOWER(${`%${search}%`})`
      )
    : baseQuery

  const inquiriesQuery = searchQuery
    .orderBy(
      sort === 'asc' ? inquiriesTable.createdAt : desc(inquiriesTable.createdAt)
    )
    .limit(limit)
    .offset(offset)

  const [inquiries, totalResult] = await Promise.all([
    inquiriesQuery,
    db
      .select({ count: sql`COUNT(*)` })
      .from(inquiriesTable)
      .innerJoin(usersTable, eq(inquiriesTable.userId, usersTable.id))
      .$dynamic()
      .where(
        search
          ? sql`LOWER(${usersTable.name}) LIKE LOWER(${`%${search}%`}) OR 
             LOWER(${usersTable.email}) LIKE LOWER(${`%${search}%`}) OR 
             LOWER(${inquiriesTable.message}) LIKE LOWER(${`%${search}%`})`
          : undefined
      )
      .then(res => Number(res[0]?.count))
  ])

  return {
    inquiries,
    pagination: {
      total: totalResult,
      page,
      limit,
      totalPages: Math.ceil(totalResult / limit)
    }
  }
}

export async function getInquiryById(id: string) {
  try {
    const [inquiry] = await db
      .select({
        id: inquiriesTable.id,
        name: usersTable.name,
        email: usersTable.email,
        message: inquiriesTable.message,
        createdAt: inquiriesTable.createdAt
      })
      .from(inquiriesTable)
      .innerJoin(usersTable, eq(inquiriesTable.userId, usersTable.id))
      .where(eq(inquiriesTable.id, id))

    return inquiry
  } catch (error) {
    console.error('Error fetching inquiry:', error)
    throw error
  }
}

export async function getUserByEmail(email: string) {
  try {
    const [user] = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        email: usersTable.email
      })
      .from(usersTable)
      .where(eq(usersTable.email, email))

    return user
  } catch (error) {
    console.error('Error fetching user:', error)
    throw error
  }
}
