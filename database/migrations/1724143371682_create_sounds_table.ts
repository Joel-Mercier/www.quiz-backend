import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'sounds'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('file').notNullable()
      table.integer('jam_id').unsigned().references('jams.id').onDelete('CASCADE') // delete post when user is deleted

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
