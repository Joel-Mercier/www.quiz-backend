import QuestionType from '#models/question_type'
import type { HttpContext } from '@adonisjs/core/http'

export default class QuestionTypesController {
  async index({ request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 20
    const questionTypes = await QuestionType.query().paginate(page, limit)

    return questionTypes.serialize()
  }
}