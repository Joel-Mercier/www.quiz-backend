import Jam from '#models/jam'
import { createJamValidator, updateJamValidator } from '#validators/jam'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

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
    const { sounds, ...jamPayload } = payload
    const jam = new Jam()
    await jam.fill(jamPayload).save()
    const relatedSounds = await Promise.all(
      sounds.map(async (payload) => {
        await payload.file.move(app.makePath('storage/uploads'), {
          name: `${cuid()}.${payload.file.extname}`,
        })
        return { file: payload.file.fileName }
      })
    )
    await jam.related('sounds').createMany(relatedSounds)
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
