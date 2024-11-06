import NotificationService from '#services/notification_service'
import vine from '@vinejs/vine'

export const createNotificationValidator = vine.compile(
  vine.object({
    type: vine.enum(['quiz', 'user', 'collection', 'follow']),
    data: vine.object({}),
    userId: vine.number(),
  })
)

export const updateNotificationValidator = vine.compile(
  vine.object({
    type: vine.enum(['quiz', 'user', 'collection', 'follow']),
    data: vine.object({}),
    userId: vine.number()
  })
)

export const filterNotificationValidator = vine.compile(
  vine.object({
    limit: vine.number().optional(),
    page: vine.number().optional(),
    user: vine.number().optional(),
    sort: vine.string().exists(async (db, value) => {
      return NotificationService.sortOptions.some((option) => option.key === value)
    }).optional(),
    relations: vine.array(vine.string()).optional(),
  })
)
