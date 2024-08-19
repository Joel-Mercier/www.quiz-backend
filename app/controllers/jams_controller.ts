import Jam from '#models/jam'
import { createJamValidator, updateJamValidator } from '#validators/jam'
import type { HttpContext } from '@adonisjs/core/http'

export default class JamsController {
  /**
   * Display a list of resource
   */
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 20
    const jams = await Jam.query().paginate(page, limit)

    return jams.serialize()
  }

  /**
   * Handle form submission for the create action
   */
  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createJamValidator)
    const jam = new Jam()
    await jam.fill(payload).save()
    return jam.serialize()
  }

  /**
   * Show individual record
   */
  async show({ params }: HttpContext) {
    const jam = await Jam.findOrFail(params.id)
    return jam.serialize()
  }

  /**
   * Handle form submission for the edit action
   */
  async update({ request }: HttpContext) {
    const payload = await request.validateUsing(updateJamValidator)
    const jam = await Jam.findOrFail(payload.params.id)
    await jam.merge(payload).save()
    return jam.serialize()
  }

  /**
   * Delete record
   */
  async destroy({ params }: HttpContext) {
    const jam = await Jam.findOrFail(params.id)
    await jam.delete()
  }
}
