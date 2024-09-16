import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany, ManyToMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Score from './score.js'

export enum GameStatus {
  PENDING = 'pending',
  PLAYING = 'playing',
  FINISHED = 'finished',
}

export default class Game extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column.dateTime()
  declare finishedAt: DateTime

  @column()
  declare status: GameStatus

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => Score)
  declare scores: HasMany<typeof Score>

  @manyToMany(() => User, {
    pivotTimestamps: true,
  })
  declare users: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}