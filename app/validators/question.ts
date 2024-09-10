import vine from '@vinejs/vine'

export const createQuestionValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3).trim(),
    timeLimit: vine.number(),
    question_type_id: vine.number(),
    quiz_id: vine.number()
  })
)

export const updateQuestionValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3).trim(),
    timeLimit: vine.number(),
    question_type_id: vine.number(),
    quiz_id: vine.number()
  })
)
