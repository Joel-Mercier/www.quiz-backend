import User from '#models/user'
import UserService from '#services/user_service'
import { createUserValidator, filterUserValidator, updateUserValidator } from '#validators/user'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class UsersController {
  async index({ request }: HttpContext) {
    const filters = await filterUserValidator.validate(request.qs())
    const users = await UserService.getFiltered(filters)
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
    const user = await User.query().preload('quizzes').preload('collections').where('id', params.id).firstOrFail()
    return user.serialize()
  }

  async update({ request, auth }: HttpContext) {
    const user = auth.user!
    const {avatar, ...payload} = await request.validateUsing(updateUserValidator, {
      meta: { userId: user.id },
    })
    if (avatar) {
      await avatar.move(app.makePath('storage/uploads/users/avatar'), {
        name: `${cuid()}.${avatar.extname}`
      })
      user.avatar = avatar.fileName!
    }
    await user.merge(payload).save()
    return user.serialize()
  }

  async destroy({ auth }: HttpContext) {
    await auth.user!.delete()
  }
}
