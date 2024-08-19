import { KEYS, SCALES } from '#models/jam'
import vine from '@vinejs/vine'

export const createJamValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).trim(),
    description: vine.string().trim().optional(),
    key: vine.enum(KEYS),
    bpm: vine.number().min(0).max(300).positive(),
    scale: vine.enum(SCALES),
  })
)

export const updateJamValidator = vine.compile(
  vine.object({
    name: vine.string().minLength(3).trim(),
    description: vine.string().trim().optional(),
    key: vine.enum(KEYS),
    bpm: vine.number().min(0).max(300).positive(),
    scale: vine.enum(SCALES),
    params: vine.object({
      id: vine.number(),
    }),
  })
)
