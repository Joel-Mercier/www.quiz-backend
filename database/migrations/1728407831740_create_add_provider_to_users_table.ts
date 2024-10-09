import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {

  async up() {
    this.schema.alterTable('users', (table) => {
      table.string('provider').nullable()
      table.string('provider_id').nullable()
    })
  }

  async down() {
    this.schema.alterTable('users', (table) => {
      table.dropColumn('provider')
      table.dropColumn('provider_id')
    })
  }
}