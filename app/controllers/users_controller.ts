import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'

export default class UsersController {
  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 20
    const users = await User.query().paginate(page, limit)

    return users.serialize()
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const user = new User()
    await user.fill(request.body()).save()
    return user.serialize()
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const user = await User.findOrFail(params.id)
    return user.serialize()
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ params, request }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.merge(request.body()).save()
    return user.serialize()
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const user = await User.findOrFail(params.id)
    await user.delete()
  }
}
