import User from '#models/user'
import { createUserValidator, updateUserValidator } from '#validators/user'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class UsersController {
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 20
    const users = await User.query().paginate(page, limit)

    return users.serialize()
  }

  async store({ request }: HttpContext) {
    const {avatar, ...payload} = await request.validateUsing(createUserValidator)
    const user = new User()
    if (avatar) {
      await avatar.move(app.makePath('storage/uploads/users/avatar'), {
        name: `${cuid()}.${avatar.extname}`
      })
      user.avatar = avatar.fileName!
    }
    await user.fill(payload).save()
    return user.serialize()
  }

  async show({ params }: HttpContext) {
    const user = await User.findOrFail(params.id)
    return user.serialize()
  }

  async update({ request, auth }: HttpContext) {
    const {avatar, ...payload} = await request.validateUsing(updateUserValidator, {
      meta: { userId: auth.user!.id },
    })
    const user = await User.findOrFail(payload.params.id)
    if (avatar) {
      await avatar.move(app.makePath('storage/uploads/users/avatar'), {
        name: `${cuid()}.${avatar.extname}`
      })
      user.avatar = avatar.fileName!
    }
    await user.merge(payload).save()
    return user.serialize()
  }

  async destroy({ params }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.delete()
  }
}
