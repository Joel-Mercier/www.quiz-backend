import User from '#models/user'
import Quiz from '#models/quiz'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class QuizPolicy extends BasePolicy {
  create(): AuthorizerResponse {
    return true
  }

  edit(user: User, quiz: Quiz): AuthorizerResponse {
    return user.id === quiz.user.id
  }

  delete(user: User, quiz: Quiz): AuthorizerResponse {
    return user.id === quiz.user.id
  }
}