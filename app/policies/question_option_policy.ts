import User from '#models/user'
import QuestionOption from '#models/question_option'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class QuestionOptionPolicy extends BasePolicy {
  create(user: User, questionOption: QuestionOption): AuthorizerResponse {
    return user.id === questionOption.question.quiz.user.id
  }

  edit(user: User, questionOption: QuestionOption): AuthorizerResponse {
    return user.id === questionOption.question.quiz.user.id
  }

  delete(user: User, questionOption: QuestionOption): AuthorizerResponse {
    return user.id === questionOption.question.quiz.user.id
  }
}