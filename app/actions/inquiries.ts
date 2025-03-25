'use server'

import {
  createInquiry,
  createUser,
  getInquiryById,
  getUserByEmail,
  getUserInquiries
} from '@/db/queries/inquires'
import { z } from 'zod'

export async function createInquiryAction(data: z.infer<typeof InquirySchema>) {
  let userId
  const userData = await getUserByEmail(data?.email)
  if (userData) {
    userId = userData?.id
  } else {
    userId = await createUser({
      email: data?.email,
      name: data?.name
    })
  }
  if (!userId) throw new Error('Insuffecient information!')
  const res = await createInquiry({
    message: data?.message,
    userId: userId
  })
  if (!res) throw new Error('An unexpected error occured!')
}

const GetManySchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).default(10),
  sort: z.enum(['asc', 'desc']).default('desc'),
  search: z.string().optional()
})

export async function getManyInquiriesAction(
  data: z.infer<typeof GetManySchema>
) {
  try {
    const { page, limit, sort, search } = GetManySchema.parse(data)
    return await getUserInquiries({ page, limit, sort, search })
  } catch (error) {
    console.error('Error fetching inquiries:', error)
    throw new Error('Failed to fetch inquiries.')
  }
}

const GetByIdSchema = z.object({
  id: z.string().uuid()
})

export async function getInquiryByIdAction(
  data: z.infer<typeof GetByIdSchema>
) {
  try {
    const { id } = GetByIdSchema.parse(data)
    return await getInquiryById(id)
  } catch (error) {
    console.error('Error fetching inquiry by ID:', error)
    throw new Error('Failed to fetch inquiry.')
  }
}
