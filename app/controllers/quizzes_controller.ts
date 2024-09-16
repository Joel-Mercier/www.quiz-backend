import Quiz from '#models/quiz'
import { createQuizValidator, updateQuizValidator } from '#validators/quiz'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class QuizzesController {
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 20
    const quizzes = await Quiz.query().paginate(page, limit)

    return quizzes.serialize()
  }

  async store({ request }: HttpContext) {
    const {image, ...payload} = await request.validateUsing(createQuizValidator)
    const quiz = new Quiz()
    if (image) {
      await image.move(app.makePath('storage/uploads/quizzes/image'), {
        name: `${cuid()}.${image.extname}`
      })
      quiz.image = image.fileName!
    }
    await quiz.fill(payload).save()
    return quiz.serialize()
  }

  async show({ params }: HttpContext) {
    const quiz = await Quiz.findOrFail(params.id)
    return quiz.serialize()
  }

  async update({ request }: HttpContext) {
    const {image, ...payload} = await request.validateUsing(updateQuizValidator)
    const quiz = await Quiz.findOrFail(request.params().id)
    if (image) {
      await image.move(app.makePath('storage/uploads/quizzes/image'), {
        name: `${cuid()}.${image.extname}`
      })
      quiz.image = image.fileName!
    }
    await quiz.merge(payload).save()
    return quiz.serialize()
  }

  async destroy({ params }: HttpContext) {
    const quiz = await Quiz.findOrFail(params.id)
    await quiz.delete()
  }
}