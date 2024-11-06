import Quiz from '#models/quiz'
import QuizPolicy from '#policies/quiz_policy'
import QuizService from '#services/quiz_service'
import { createQuizValidator, filterQuizValidator, updateQuizValidator } from '#validators/quiz'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class QuizzesController {
  async index({ request }: HttpContext) {
    const filters = await filterQuizValidator.validate(request.qs())
    const quizzes = await QuizService.getFiltered(filters)

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
    const quiz = await Quiz.query().preload('user').preload('questions', (questionsQuery) => { questionsQuery.preload('questionType') }).where('id', params.id).firstOrFail()
    return quiz.serialize()
  }

  async update({ request, bouncer, response }: HttpContext) {
    const {image, ...payload} = await request.validateUsing(updateQuizValidator)
    const quiz = await Quiz.findOrFail(request.params().id)
    if (await bouncer.with(QuizPolicy).denies('edit', quiz)) {
      return response.forbidden('Cannot edit a quiz that is not owned by the user')
    }
    if (image) {
      await image.move(app.makePath('storage/uploads/quizzes/image'), {
        name: `${cuid()}.${image.extname}`
      })
      quiz.image = image.fileName!
    }
    await quiz.merge(payload).save()
    return quiz.serialize()
  }

  async destroy({ params, bouncer, response }: HttpContext) {
    const quiz = await Quiz.findOrFail(params.id)
    if (await bouncer.with(QuizPolicy).denies('delete', quiz)) {
      return response.forbidden('Cannot delete a quiz that is not owned by the user')
    }
    await quiz.delete()
  }
}