import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class UserPolicy extends BasePolicy {
  create(): AuthorizerResponse {
    return true
  }

  edit(): AuthorizerResponse {
    return true
  }

  delete(): AuthorizerResponse {
    return true
  }
}