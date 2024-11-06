import type { HttpContext } from '@adonisjs/core/http'
import Achievement from '#models/achievement'

export default class AchivementsController {
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 20
    const achievements = await Achievement.query().paginate(page, limit)

    return achievements.serialize()
  }
}