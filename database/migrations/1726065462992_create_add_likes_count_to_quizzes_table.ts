import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = "quizzes"

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.bigint('likesCount').notNullable().defaultTo(0)
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('likesCount')
    })
  }
}