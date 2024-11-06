import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, scope } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Quiz from './quiz.js'

export default class Collection extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column({
    serialize: (value: 1 | 0) => {
      return value === 1
    },
  })
  declare isPublic: boolean

  @column()
  declare image: string

  @column({ serializeAs: null })
  declare userId: number

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => Quiz)
  declare quizzes: HasMany<typeof Quiz>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  static public = scope((query) => {
    query.where('isPublic', true)
  })

  static private = scope((query) => {
    query.where('isPublic', false)
  })
}