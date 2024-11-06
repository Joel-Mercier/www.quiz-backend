import { AchievementType } from '#models/achievement'
import vine from '@vinejs/vine'

export const createAchivementValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3).trim(),
    type: vine.enum(AchievementType),
  })
)

export const updateAchivementValidator = vine.compile(
  vine.object({
    title: vine.string().minLength(3).trim(),
    type: vine.enum(AchievementType),
  })
)
