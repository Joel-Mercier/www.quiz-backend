import User from '#models/user'
import Question from '#models/question'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'
import Quiz from '#models/quiz'

export default class QuestionPolicy extends BasePolicy {
  create(user: User, quiz: Quiz): AuthorizerResponse {
    return user.id === quiz.user.id
  }

  edit(user: User, question: Question): AuthorizerResponse {
    return user.id === question.quiz.user.id
  }

  delete(user: User, question: Question): AuthorizerResponse {
    return user.id === question.quiz.user.id
  }
}