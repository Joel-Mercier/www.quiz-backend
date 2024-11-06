import type { ExtractModelRelations } from "@adonisjs/lucid/types/relations";
import { Infer } from "@vinejs/vine/types";
import { SortOption } from "#types/sortOption";
import { filterNotificationValidator } from "#validators/notification";
import Notification from "#models/notification";


export default class NotificationService {
  static sortOptions: SortOption[] = [
    { key: 'created_at_desc', field: 'created_at', dir: 'desc' },
    { key: 'created_at_asc', field: 'created_at', dir: 'asc' },
  ]

  static getFiltered(filters: Infer<typeof filterNotificationValidator>) {
    const sort = this.sortOptions.find((option) => option.key === filters.sort) || this.sortOptions[0]
    const notifications = Notification.query()
      .if(filters.user, (query) => query.where('user_id', filters.user!))
      .if(filters.relations, (query) => {
        const relations = typeof filters.relations === 'string' ? [filters.relations] : filters.relations
        relations?.map((relation) => {
          query.preload(relation as ExtractModelRelations<Notification>)
        })
      })
      .orderBy(sort.field, sort.dir)
      .paginate(filters.page || 1, filters.limit || 12)
    return notifications
  }
}