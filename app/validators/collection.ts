import CollectionService from '#services/collection_service'
import vine from '@vinejs/vine'

export const createCollectionValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).trim(),
    isPublic: vine.boolean(),
    userId: vine.number(),
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
    userId: vine.number(),
    image: vine.file({
      size: '1mb',
      extnames: ['jpg', 'png', 'jpeg', 'webp'],
    }),
  })
)

export const filterCollectionValidator = vine.compile(
  vine.object({
    limit: vine.number().optional(),
    page: vine.number().optional(),
    search: vine.string().trim().optional(),
    user: vine.number().optional(),
    isPublic: vine.boolean().optional(),
    sort: vine.string().exists(async (db, value) => {
      return CollectionService.sortOptions.some((option) => option.key === value)
    }).optional(),
    relations: vine.array(vine.string()).optional(),
  })
)
