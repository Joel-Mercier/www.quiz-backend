import User from '#models/user'
import Question from '#models/question'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class QuestionPolicy extends BasePolicy {
  create(user: User, question: Question): AuthorizerResponse {
    return user.id === question.quiz.user.id
  }

  edit(user: User, question: Question): AuthorizerResponse {
    return user.id === question.quiz.user.id
  }

  delete(user: User, question: Question): AuthorizerResponse {
    return user.id === question.quiz.user.id
  }
}