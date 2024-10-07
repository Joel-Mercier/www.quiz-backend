import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class DeleteAuthTokens extends BaseCommand {
  static commandName = 'delete:auth-tokens'
  static description = ''

  static options: CommandOptions = {}

  async run() {
    this.logger.info('Hello world from "DeleteAuthTokens"')
  }
}