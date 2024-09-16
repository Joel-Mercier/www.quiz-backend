import Question from '#models/question'
import { createQuestionValidator, updateQuestionValidator } from '#validators/question'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class QuestionsController {
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 20
    const questions = await Question.query().paginate(page, limit)

    return questions.serialize()
  }

  async store({ request }: HttpContext) {
    const {file, ...payload} = await request.validateUsing(createQuestionValidator)
    const question = new Question()
    if (file) {
      await file.move(app.makePath('storage/uploads/questions/file'), {
        name: `${cuid()}.${file.extname}`
      })
      question.file = file.fileName!
    }
    await question.fill(payload).save()
    return question.serialize()
  }

  async show({ params }: HttpContext) {
    const question = await Question.findOrFail(params.id)
    return question.serialize()
  }

  async update({ request }: HttpContext) {
    const {file, ...payload} = await request.validateUsing(updateQuestionValidator)
    const question = await Question.findOrFail(request.params().id)
    if (file) {
      await file.move(app.makePath('storage/uploads/questions/file'), {
        name: `${cuid()}.${file.extname}`
      })
      question.file = file.fileName!
    }
    await question.merge(payload).save()
    return question.serialize()
  }

  async destroy({ params }: HttpContext) {
    const question = await Question.findOrFail(params.id)
    await question.delete()
  }
}