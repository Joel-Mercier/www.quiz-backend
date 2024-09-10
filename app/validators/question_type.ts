import vine from '@vinejs/vine'

export const createQuestionTypeValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).trim(),
    value: vine.string().trim().toLowerCase(),
  })
)

export const updateQuestionTypeValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).trim(),
    value: vine.string().trim().toLowerCase(),
  })
)
