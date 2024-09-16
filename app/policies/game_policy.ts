import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class GamePolicy extends BasePolicy {
  create(): AuthorizerResponse {
    return true
  }

  edit(): AuthorizerResponse {
    return false
  }

  delete(): AuthorizerResponse {
    return false
  }
}