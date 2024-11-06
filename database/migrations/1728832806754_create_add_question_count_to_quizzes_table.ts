import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('quizzes', (table) => {
      table.integer('question_count').notNullable().defaultTo(0)
    })
  }

  async down() {
    this.schema.alterTable('quizzes', (table) => {
      table.dropColumn('question_count')
    })
  }
}