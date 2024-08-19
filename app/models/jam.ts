import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export enum KEYS {
  C = 'C',
  'C#' = 'C#',
  D = 'D',
  'D#' = 'D#',
  E = 'E',
  F = 'F',
  'F#' = 'F#',
  G = 'G',
  'G#' = 'G#',
  A = 'A',
  'A#' = 'A#',
  B = 'B',
}

export enum SCALES {
  MAJOR = 'major',
  MINOR = 'minor',
  HARMONIC_MINOR = 'harmonicMinor',
  MELODIC_MINOR = 'melodicMinor',
  PENTATONIC_MAJOR = 'pentatonicMajor',
  PENTATONIC_MINOR = 'pentatonicMinor',
}

export default class Jam extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string | null

  @column()
  declare key: string

  @column()
  declare scale: string

  @column()
  declare bpm: number

  @column()
  declare published: boolean

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
