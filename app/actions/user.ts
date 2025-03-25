'use server'

import { InsertUser } from '@/db/schema'
import { createUser } from '../../db/queries/inquires'

export async function createUserAction(data: InsertUser) {
  await createUser(data)
}
