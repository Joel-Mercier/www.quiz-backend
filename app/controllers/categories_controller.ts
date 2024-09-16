import Category from "#models/category"
import { createCategoryValidator, updateCategoryValidator } from "#validators/category"
import { cuid } from "@adonisjs/core/helpers"
import { HttpContext } from "@adonisjs/core/http"
import app from "@adonisjs/core/services/app"

export default class CategoriesController {
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 20
    const categories = await Category.query().paginate(page, limit)

    return categories.serialize()
  }

  async store({ request }: HttpContext) {
    const {image, ...payload} = await request.validateUsing(createCategoryValidator)
    const category = new Category()
    if (image) {
      await image.move(app.makePath('storage/uploads/categories/image'), {
        name: `${cuid()}.${image.extname}`
      })
      category.image = image.fileName!
    }
    await category.fill(payload).save()
    return category.serialize()
  }

  async show({ params }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    return category.serialize()
  }

  async update({ request }: HttpContext) {
    const {image, ...payload} = await request.validateUsing(updateCategoryValidator)
    const category = await Category.findOrFail(request.params().id)
    if (image) {
      await image.move(app.makePath('storage/uploads/categories/image'), {
        name: `${cuid()}.${image.extname}`
      })
      category.image = image.fileName!
    }
    await category.merge(payload).save()
    return category.serialize()
  }

  async destroy({ params }: HttpContext) {
    const category = await Category.findOrFail(params.id)
    await category.delete()
  }
}