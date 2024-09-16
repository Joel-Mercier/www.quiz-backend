import type { HttpContext } from '@adonisjs/core/http'
import db from '@adonisjs/lucid/services/db'

export default class FollowsController {
  async index({ request, auth }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 20
    const follows = await auth.user!.related('follows').query().paginate(page, limit)
    return follows.serialize()
  }

  async store({ auth, request }: HttpContext) {
    const follow = await db.table('follows').insert({
      follower_id: auth.user!.id,
      followed_id: request.body,
    })
    return follow
  }

  async destroy({ params }: HttpContext) {
    const follow = await db.query().from('follows').where('id', params.id).firstOrFail()
    await follow.delete()
  }
}
