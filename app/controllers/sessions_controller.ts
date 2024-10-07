import User from '#models/user'
import { loginValidator } from '#validators/session'
import type { HttpContext } from '@adonisjs/core/http'

export default class SessionsController {
  async login({ request }: HttpContext) {
    const payload = await request.validateUsing(loginValidator)
    const { email, password } = payload
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)
    return token
  }

  async logout({ auth }: HttpContext) {
    if (auth.isAuthenticated && auth.user?.currentAccessToken) {
      await User.accessTokens.delete(auth.user, auth.user.currentAccessToken.identifier)
    }
  }
}
