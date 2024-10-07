import QuizService from '#services/quiz_service'
import vine from '@vinejs/vine'

export const createQuizValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).trim(),
    description: vine.string().minLength(3).trim().optional(),
    isPublic: vine.boolean(),
    userId: vine.number(),
    categoryId: vine.number(),
    collectionId: vine.number(),
    image: vine.file({
      size: '1mb',
      extnames: ['jpg', 'png', 'jpeg', 'webp'],
    }).nullable(),
  })
)

export const updateQuizValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).trim(),
    description: vine.string().minLength(3).trim().optional(),
    isPublic: vine.boolean(),
    userId: vine.number(),
    categoryId: vine.number(),
    collectionId: vine.number(),
    image: vine.file({
      size: '1mb',
      extnames: ['jpg', 'png', 'jpeg', 'webp'],
    }).nullable(),
  })
)

export const filterQuizValidator = vine.compile(
  vine.object({
    limit: vine.number().optional(),
    page: vine.number().optional(),
    search: vine.string().trim().optional(),
    category: vine.number().optional(),
    collection: vine.number().optional(),
    user: vine.number().optional(),
    isPublic: vine.boolean().optional(),
    sort: vine.string().exists(async (db, value) => {
      return QuizService.sortOptions.some((option) => option.key === value)
    }).optional(),
    relations: vine.array(vine.string()).optional(),
  })
)
