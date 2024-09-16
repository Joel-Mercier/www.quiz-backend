import Collection from "#models/collection"
import CollectionPolicy from "#policies/collection_policy"
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

  async store({ request, bouncer, response }: HttpContext) {
    if (await bouncer.with(CollectionPolicy).denies('create')) {
      return response.forbidden('Cannot create a collection that is not owned by the user')
    }
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

  async update({ request, bouncer, response }: HttpContext) {
    const {image, ...payload} = await request.validateUsing(updateCollectionValidator)
    const collection = await Collection.findOrFail(request.params().id)
    if (await bouncer.with(CollectionPolicy).denies('edit', collection)) {
      return response.forbidden('Cannot edit a collection that is not owned by the user')
    }
    await image.move(app.makePath('storage/uploads/collections/image'), {
      name: `${cuid()}.${image.extname}`
    })
    collection.image = image.fileName!
    await collection.merge(payload).save()
    return collection.serialize()
  }

  async destroy({ params, bouncer, response }: HttpContext) {
    const collection = await Collection.findOrFail(params.id)
    if (await bouncer.with(CollectionPolicy).denies('delete', collection)) {
      return response.forbidden('Cannot delete a collection that is not owned by the user')
    }
    await collection.delete()
  }
}