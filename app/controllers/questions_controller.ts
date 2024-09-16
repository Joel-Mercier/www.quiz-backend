import Question from '#models/question'
import Quiz from '#models/quiz'
import QuestionPolicy from '#policies/question_policy'
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

  async store({ request, bouncer, response }: HttpContext) {
    const quiz = await Quiz.findOrFail(request.params().quiz_id)
    if (await bouncer.with(QuestionPolicy).denies('create', quiz)) {
      return response.forbidden('Cannot create a question that is not owned by the user')
    }
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

  async update({ request, bouncer, response }: HttpContext) {
    const {file, ...payload} = await request.validateUsing(updateQuestionValidator)
    const question = await Question.findOrFail(request.params().id)
    if (await bouncer.with(QuestionPolicy).denies('edit', question)) {
      return response.forbidden('Cannot edit a question that is not owned by the user')
    }
    if (file) {
      await file.move(app.makePath('storage/uploads/questions/file'), {
        name: `${cuid()}.${file.extname}`
      })
      question.file = file.fileName!
    }
    await question.merge(payload).save()
    return question.serialize()
  }

  async destroy({ params, bouncer, response }: HttpContext) {
    const question = await Question.findOrFail(params.id)
    if (await bouncer.with(QuestionPolicy).denies('delete', question)) {
      return response.forbidden('Cannot delete a qestion that is not owned by the user')
    }
    await question.delete()
  }
}