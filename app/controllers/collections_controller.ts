import Collection from "#models/collection"
import { createCollectionValidator, updateCollectionValidator } from "#validators/collection"
import { cuid } from "@adonisjs/core/helpers"
import { HttpContext } from "@adonisjs/core/http"
import app from "@adonisjs/core/services/app"

export default class CollectionsController {
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 20
    const collections = await Collection.query().paginate(page, limit)

    return collections.serialize()
  }

  async store({ request }: HttpContext) {
    const {image, ...payload} = await request.validateUsing(createCollectionValidator)
    const collection = new Collection()
    await image.move(app.makePath('storage/uploads/collections/image'), {
      name: `${cuid()}.${image.extname}`
    })
    collection.image = image.fileName!
    await collection.fill(payload).save()
    return collection.serialize()
  }

  async show({ params }: HttpContext) {
    const collection = await Collection.findOrFail(params.id)
    return collection.serialize()
  }

  async update({ request }: HttpContext) {
    const {image, ...payload} = await request.validateUsing(updateCollectionValidator)
    const collection = await Collection.findOrFail(request.params().id)
    await image.move(app.makePath('storage/uploads/collections/image'), {
      name: `${cuid()}.${image.extname}`
    })
    collection.image = image.fileName!
    await collection.merge(payload).save()
    return collection.serialize()
  }

  async destroy({ params }: HttpContext) {
    const collection = await Collection.findOrFail(params.id)
    await collection.delete()
  }
}