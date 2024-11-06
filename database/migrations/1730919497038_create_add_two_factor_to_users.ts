import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  async up() {
    this.schema.alterTable('users', (table) => {
      table.boolean('is_two_factor_enabled').notNullable().defaultTo(false)
      table.string('two_factor_secret').nullable()
      table.string('two_factor_recovery_codes').nullable()
    })
  }

  async down() {
    this.schema.alterTable('users', (table) => {
      table.dropColumn('is_two_factor_enabled')
      table.dropColumn('two_factor_secret')
      table.dropColumn('two_factor_recovery_codes')
    })
  }
}