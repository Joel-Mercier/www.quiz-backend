import User from '#models/user'
import Collection from '#models/collection'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class CollectionPolicy extends BasePolicy {
  create(): AuthorizerResponse {
    return true
  }

  edit(user: User, collection: Collection): AuthorizerResponse {
    return user.id === collection.user.id
  }

  delete(user: User, collection: Collection): AuthorizerResponse {
    return user.id === collection.user.id
  }
}