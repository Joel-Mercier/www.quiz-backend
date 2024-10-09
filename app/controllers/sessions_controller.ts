import User from '#models/user'
import { loginValidator, providerValidator } from '#validators/session'
import type { HttpContext } from '@adonisjs/core/http'
import hash from '@adonisjs/core/services/hash'

export default class SessionsController {
  async login({ request }: HttpContext) {
    const payload = await request.validateUsing(loginValidator)
    const { email, password } = payload
    const user = await User.verifyCredentials(email, password)
    const token = await User.accessTokens.create(user)
    return token
  }

  async logout({ auth }: HttpContext) {
    console.log(auth.isAuthenticated, auth?.user?.id)
    if (auth.isAuthenticated && auth.user?.currentAccessToken) {
      await User.accessTokens.delete(auth.user, auth.user.currentAccessToken.identifier)
    }
  }

  async redirect({ ally, request }: HttpContext) {
    console.log(request.params())
    const payload = await request.validateUsing(providerValidator)
    console.log(payload)
    return ally.use(payload.params.provider).redirect()
  }

  async callback({ ally, request, response }: HttpContext) {
    const payload = await request.validateUsing(providerValidator)
    const provider = ally.use(payload.params.provider)

    if (provider.accessDenied()) {
      return 'You have cancelled the login process'
    }

    if (provider.stateMisMatch()) {
      return 'We are unable to verify the request. Please try again'
    }
  
    if (provider.hasError()) {
      return provider.getError()
    }

    const providerUser = await provider.user()
    const password = await hash.make(crypto.randomUUID())
    const user = await User.firstOrCreate({
      provider: payload.params.provider,
      providerId: providerUser.id,
    }, {
      email: providerUser.email,
      firstName: providerUser.name.split(' ')[0],
      lastName: providerUser.name.split(' ')[1],
      isAdmin: false,
      provider: payload.params.provider,
      providerId: providerUser.id,
      password
    })

    const token = await User.accessTokens.create(user)
    console.log(token)
    // return {
    //   ...token,
    //   success: true
    // }
    response.redirect('wwwquiz://(app)/(tabs)/?token=' + token.value!.release(), false)
  }
}
