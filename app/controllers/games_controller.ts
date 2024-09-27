import type { HttpContext } from '@adonisjs/core/http'
import Game from "#models/game"

export default class GamesController {
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 20
    const games = await Game.query().paginate(page, limit)

    return games.serialize()
  }

  async show({ params }: HttpContext) {
    const game = await Game.findOrFail(params.id)
    return game.serialize()
  }
}