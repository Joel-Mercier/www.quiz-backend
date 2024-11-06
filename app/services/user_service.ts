import User from "#models/user";
import { SortOption } from "#types/sortOption";
import { filterUserValidator } from "#validators/user";
import type { ExtractModelRelations } from "@adonisjs/lucid/types/relations";
import { Infer } from "@vinejs/vine/types";

export default class UserService {
  static sortOptions: SortOption[] = [
    { key: 'created_at_desc', field: 'created_at', dir: 'desc' },
    { key: 'created_at_asc', field: 'created_at', dir: 'asc' },
    { key: 'name_desc', field: 'name', dir: 'asc' },
    { key: 'name_asc', field: 'name', dir: 'desc' },
  ]

  static getFiltered(filters: Infer<typeof filterUserValidator>) {
    const sort = this.sortOptions.find((option) => option.key === filters.sort) || this.sortOptions[0]
    const users = User.query()
      .if(filters.search, (query) => query.whereLike('name', `%${filters.search}%`))
      .if(filters.isPublic !== undefined, (query) => query.where('is_public', filters.isPublic!))
      .if(filters.relations, (query) => {
        const relations = typeof filters.relations === 'string' ? [filters.relations] : filters.relations
        relations?.map((relation) => {
          query.preload(relation as ExtractModelRelations<User>)
        })
      })
      .orderBy(sort.field, sort.dir)
      .paginate(filters.page || 1, filters.limit || 12)

    return users
  }
}