import { GameStatus } from '#models/game'
import vine from '@vinejs/vine'

export const createGameValidator = vine.compile(
  vine.object({
    status: vine.enum(GameStatus),
    finishedAt: vine.date().nullable(),
    user_id: vine.number(),
  })
)

export const updateGameValidator = vine.compile(
  vine.object({
    status: vine.enum(GameStatus),
    finishedAt: vine.date().nullable(),
    user_id: vine.number(),
  })
)
