import vine from '@vinejs/vine'

export const createScoreValidator = vine.compile(
  vine.object({
    userId: vine.number(),
    gameId: vine.number(),
    score: vine.number(),
  })
)

export const updateScoreValidator = vine.compile(
  vine.object({
    userId: vine.number(),
    gameId: vine.number(),
    score: vine.number(),
  })
)
