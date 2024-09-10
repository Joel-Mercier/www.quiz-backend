import User from '#models/user'
import QuestionType from '#models/question_type'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class QuestionTypePolicy extends BasePolicy {
  create(user: User): AuthorizerResponse {
    return user.isAdmin
  }

  edit(user: User): AuthorizerResponse {
    return user.isAdmin
  }

  delete(user: User): AuthorizerResponse {
    return user.isAdmin
  }
}