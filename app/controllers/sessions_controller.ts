import User from '#models/user'
import { loginValidator, logoutValidator } from '#validators/session'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionsController {
  async login({ request, logger }: HttpContext) {
    const payload = await request.validateUsing(loginValidator)
    const { email, password } = payload
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)
    return token
  }

  async logout({ request, auth }: HttpContext) {
    const payload = await request.validateUsing(logoutValidator)
    const user = await User.findOrFail(payload.id)
    if (auth.isAuthenticated && user.currentAccessToken) {
      await User.accessTokens.delete(user, user.currentAccessToken.identifier)
    }
  }
}
