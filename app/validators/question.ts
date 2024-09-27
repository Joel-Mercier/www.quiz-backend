import vine from '@vinejs/vine'

export const createQuestionValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3).trim(),
    timeLimit: vine.number(),
    questionTypeId: vine.number(),
    quizId: vine.number(),
    file: vine.file({
      size: '1mb',
      extnames: ['jpg', 'png', 'jpeg', 'webp'],
    }).nullable(),
  })
)

export const updateQuestionValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3).trim(),
    timeLimit: vine.number(),
    questionTypeId: vine.number(),
    quizId: vine.number(),
    file: vine.file({
      size: '1mb',
      extnames: ['jpg', 'png', 'jpeg', 'webp'],
    }).nullable(),
  })
)
