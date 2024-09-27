import vine from '@vinejs/vine'

export const createQuestionOptionValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3).trim(),
    isAnswer: vine.boolean(),
    questionId: vine.number(),
    file: vine.file({
      size: '1mb',
      extnames: ['jpg', 'png', 'jpeg', 'webp'],
    }).nullable(),
  })
)

export const updateQuestionOptionValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3).trim(),
    isAnswer: vine.boolean(),
    questionId: vine.number(),
    file: vine.file({
      size: '1mb',
      extnames: ['jpg', 'png', 'jpeg', 'webp'],
    }).nullable(),
  })
)
