import vine from '@vinejs/vine'

export const createQuestionOptionValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3).trim(),
    isAnswer: vine.boolean(),
    question_id: vine.number()
  })
)

export const updateQuestionOptionValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3).trim(),
    isAnswer: vine.boolean(),
    question_id: vine.number()
  })
)
