import vine from '@vinejs/vine'

export const createCollectionValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).trim(),
    isPublic: vine.boolean(),
    user_id: vine.number(),
    image: vine.file({
      size: '1mb',
      extnames: ['jpg', 'png', 'jpeg', 'webp'],
    }),
  })
)

export const updateCollectionValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).trim(),
    isPublic: vine.boolean(),
    user_id: vine.number(),
    image: vine.file({
      size: '1mb',
      extnames: ['jpg', 'png', 'jpeg', 'webp'],
    }),
  })
)
