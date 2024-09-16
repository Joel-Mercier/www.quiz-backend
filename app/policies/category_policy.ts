import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class CategoryPolicy extends BasePolicy {
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