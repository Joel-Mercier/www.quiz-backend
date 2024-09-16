import vine from '@vinejs/vine'

export const createQuizValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).trim(),
    description: vine.string().minLength(3).trim().optional(),
    isPublic: vine.boolean(),
    user_id: vine.number(),
    category_id: vine.number(),
    collection_id: vine.number(),
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
    user_id: vine.number(),
    category_id: vine.number(),
    collection_id: vine.number(),
    image: vine.file({
      size: '1mb',
      extnames: ['jpg', 'png', 'jpeg', 'webp'],
    }).nullable(),
  })
)
