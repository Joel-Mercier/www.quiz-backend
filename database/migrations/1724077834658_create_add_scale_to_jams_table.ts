import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'jams'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('scale').notNullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('scale')
    })
  }
}
