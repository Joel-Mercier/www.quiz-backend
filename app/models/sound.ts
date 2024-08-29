import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Jam from './jam.js'

export default class Sound extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @belongsTo(() => Jam)
  declare jam: BelongsTo<typeof Jam>

  @column()
  declare file: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
