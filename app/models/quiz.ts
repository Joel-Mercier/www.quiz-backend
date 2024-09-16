import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, hasManyThrough } from '@adonisjs/lucid/orm'
import User from './user.js'
import type { BelongsTo, HasMany, HasManyThrough } from '@adonisjs/lucid/types/relations'
import Question from './question.js'
import Category from './category.js'
import Like from './like.js'
import Collection from './collection.js'
import Game from './game.js'

export default class Quiz extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare description: string

  @column()
  declare timesPlayed: number

  @column()
  declare isPublic: boolean

  @column()
  declare likesCount: number

  @column()
  declare image: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Category)
  declare category: BelongsTo<typeof Category>

  @belongsTo(() => Collection)
  declare collection: BelongsTo<typeof Collection>

  @hasMany(() => Question)
  declare questions: HasMany<typeof Question>

  @hasMany(() => Like)
  declare likes: HasMany<typeof Like>

  @hasMany(() => Game)
  declare games: HasMany<typeof Game>

  @hasManyThrough([() => User, () => Like])
  declare likers: HasManyThrough<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}