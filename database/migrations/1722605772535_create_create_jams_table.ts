import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'jams'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary().notNullable()
      table.string('name').notNullable()
      table.text('description').nullable()
      table.string('key').notNullable()
      table.integer('bpm').notNullable()
      table.boolean('published').notNullable().defaultTo(true)
      table.integer('user_id').unsigned().references('users.id').onDelete('CASCADE') // delete post when user is deleted
      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
