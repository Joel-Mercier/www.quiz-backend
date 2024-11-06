import Notification from '#models/notification'
import User from '#models/user'
import { BasePolicy } from '@adonisjs/bouncer'
import { AuthorizerResponse } from '@adonisjs/bouncer/types'

export default class NotificationPolicy extends BasePolicy {
  view(user: User, notification: Notification): AuthorizerResponse {
    return user.id === notification.user.id
  }
  
  create(): AuthorizerResponse {
    return true
  }

  edit(user: User, notification: Notification): AuthorizerResponse {
    return user.id === notification.user.id
  }

  delete(user: User, notification: Notification): AuthorizerResponse {
    return user.id === notification.user.id
  }
}