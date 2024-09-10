import vine from '@vinejs/vine'

export const createCategoryValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).trim(),
  })
)

export const updateCategoryValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).trim(),
  })
)
