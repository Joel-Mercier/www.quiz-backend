import vine from '@vinejs/vine'

export const createQuestionValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3).trim(),
    timeLimit: vine.number(),
    question_type_id: vine.number(),
    quiz_id: vine.number(),
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
    question_type_id: vine.number(),
    quiz_id: vine.number(),
    file: vine.file({
      size: '1mb',
      extnames: ['jpg', 'png', 'jpeg', 'webp'],
    }).nullable(),
  })
)
