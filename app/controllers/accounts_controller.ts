import type { HttpContext } from '@adonisjs/core/http'

export default class AccountsController {
  async show({ auth }: HttpContext) {
    const user = auth.user!

    return user.serialize()
  }
}