import { args, BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'
import db from '@adonisjs/lucid/services/db'

export default class AppDeleteAuthTokens extends BaseCommand {
  static commandName = 'app:delete-auth-tokens'
  static description = 'Deletes all auth tokens from the database'

  static options: CommandOptions = {
    startApp: true,
  }

  @args.string({ description: 'User ID', required: false })
  declare user_id: string

  async run() {
    if (this.user_id) {
      this.logger.info('Deleting all auth tokens for user with id: ' + this.user_id)
      await db.from('auth_access_tokens').where('tokenable_id', this.user_id).delete()
    } else {
      this.logger.info('Deleting all auth tokens')
      await db.from('auth_access_tokens').delete()
    }
  }
}