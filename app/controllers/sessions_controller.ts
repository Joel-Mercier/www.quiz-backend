import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionsController {
  async login({ request, logger }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])
    logger.info(email, email)
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)
    return token
  }

  async logout({ params, auth }: HttpContext) {
    const user = await User.findByOrFail(params.id)
    if (auth.isAuthenticated && user.currentAccessToken) {
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    }
  }
}
