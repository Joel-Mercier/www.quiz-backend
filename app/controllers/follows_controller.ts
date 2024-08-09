import User from '#models/user'
import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class FollowsController {
  /**
   * Display a list of resource
   */
  async index({ params, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 20
    const user = await User.findOrFail(params.user_id)
    const follows = await user.related('follows').query().paginate(page, limit)
    return follows.serialize()
  }

  /**
   * Handle form submission for the create action
   */
  async store({ params, request }: HttpContext) {
    const user = await User.findOrFail(params.user_id)
    const follow = await db.table('follows').insert({
      follower_id: user.id,
      followed_id: request.body,
    })
    return follow
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const follow = await db.query().from('follows').where('id', params.id).firstOrFail()
    await follow.delete()
  }
}
