import Notification from '#models/notification'
import NotificationPolicy from '#policies/notification_policy'
import NotificationService from '#services/notification_service'
import { createNotificationValidator, filterNotificationValidator, updateNotificationValidator } from '#validators/notification'
import type { HttpContext } from '@adonisjs/core/http'

export default class NotificationsController {
  async index({ request }: HttpContext) {
    const filters = await filterNotificationValidator.validate(request.qs())
    const notifications = await NotificationService.getFiltered(filters)

    return notifications.serialize()
  }

  async store({ request }: HttpContext) {
    const payload = await request.validateUsing(createNotificationValidator)
    const notification = new Notification()
    await notification.fill(payload).save()
    return notification.serialize()
  }

  async show({ params }: HttpContext) {
    const notification = await Notification.findOrFail(params.id)
    return notification.serialize()
  }

  async update({ request, bouncer, response }: HttpContext) {
    const payload = await request.validateUsing(updateNotificationValidator)
    const notification = await Notification.findOrFail(request.params().id)
    if (await bouncer.with(NotificationPolicy).denies('edit', notification)) {
      return response.forbidden('Cannot edit a notification that is not owned by the user')
    }
    await notification.merge(payload).save()
    return notification.serialize()
  }

  async destroy({ params, bouncer, response }: HttpContext) {
    const notification = await Notification.findOrFail(params.id)
    if (await bouncer.with(NotificationPolicy).denies('delete', notification)) {
      return response.forbidden('Cannot delete a notification that is not owned by the user')
    }
    await notification.delete()
  }
}