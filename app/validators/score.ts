import vine from '@vinejs/vine'

export const createScoreValidator = vine.compile(
  vine.object({
    user_id: vine.number(),
    game_id: vine.number(),
    score: vine.number(),
  })
)

export const updateScoreValidator = vine.compile(
  vine.object({
    user_id: vine.number(),
    game_id: vine.number(),
    score: vine.number(),
  })
)
