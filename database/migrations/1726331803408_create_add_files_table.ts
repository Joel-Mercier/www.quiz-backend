import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {

  async up() {
    this.schema.alterTable('users', (table) => {
      table.string('avatar').nullable()
    })
    this.schema.alterTable('quizzes', (table) => {
      table.string('image').nullable()
    })
    this.schema.alterTable('questions', (table) => {
      table.string('file').nullable()
    })
    this.schema.alterTable('question_options', (table) => {
      table.string('file').nullable()
    })
    this.schema.alterTable('categories', (table) => {
      table.string('image').nullable()
    })
  }

  async down() {
    this.schema.alterTable('users', (table) => {
      table.dropColumn('avatar')
    })
    this.schema.alterTable('quizzes', (table) => {
      table.dropColumn('image')
    })
    this.schema.alterTable('questions', (table) => {
      table.dropColumn('file')
    })
    this.schema.alterTable('question_options', (table) => {
      table.dropColumn('file')
    })
    this.schema.alterTable('categories', (table) => {
      table.dropColumn('image')
    })
  }
}