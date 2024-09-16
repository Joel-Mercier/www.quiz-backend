// import type { HttpContext } from '@adonisjs/core/http'

import Quiz from "#models/quiz"
import { HttpContext } from "@adonisjs/core/http"

export default class LikesController {
  async index({ params, request }: HttpContext) {
    const page = request.input('page', 1)
    const limit = 20
    const quiz = await Quiz.findOrFail(params.id)
    const likes = await quiz.related('likes').query().paginate(page, limit)

    return likes.serialize()
  }

  async store({ params, auth }: HttpContext) {
    const quiz = await Quiz.findOrFail(params.id)
    const like = await quiz.related('likes').create({
      quiz_id: quiz.id,
      user_id: auth.user!.id,
    })
    return like.serialize()
  }

  async destroy({ params }: HttpContext) {
    const quiz = await Quiz.findOrFail(params.quiz_id)
    const like = await quiz.related('likes').query().findOrFail(params.id)
    await like.delete()
  }
  
}