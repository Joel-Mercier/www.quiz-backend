import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Quiz from './quiz.js'

export default class Collection extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare isPublic: boolean

  @column()
  declare image: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => Quiz)
  declare quizzes: HasMany<typeof Quiz>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}