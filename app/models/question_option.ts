import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Question from './question.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class QuestionOption extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare isAnswer: boolean

  @column()
  declare file: string

  @belongsTo(() => Question)
  declare question: BelongsTo<typeof Question>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}