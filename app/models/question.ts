import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import QuestionOption from './question_option.js'
import QuestionType from './question_type.js'
import Quiz from './quiz.js'

export default class Question extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare timeLimit: number

  @belongsTo(() => QuestionType)
  declare type: BelongsTo<typeof QuestionType>

  @belongsTo(() => Quiz)
  declare quiz: BelongsTo<typeof Quiz>

  @hasMany(() => QuestionOption)
  declare options: HasMany<typeof QuestionOption>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}