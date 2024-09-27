import Quiz from "#models/quiz";
import { filterQuizValidator } from "#validators/quiz";
import type { ExtractModelRelations } from "@adonisjs/lucid/types/relations";
import { Infer } from "@vinejs/vine/types";

type QuizSortOption = {
  key: string
  field: string
  dir: 'asc' | 'desc' | undefined
}

export default class QuizService {
  static sortOptions: QuizSortOption[] = [
    { key: 'created_at_desc', field: 'created_at', dir: 'desc' },
    { key: 'created_at_asc', field: 'created_at', dir: 'asc' },
    { key: 'name_desc', field: 'name', dir: 'asc' },
    { key: 'name_asc', field: 'name', dir: 'desc' },
    { key: 'likes_count_desc', field: 'likesCount', dir: 'desc' },
    { key: 'likes_count_asc', field: 'likesCount', dir: 'asc' },
  ]

  static getFiltered(filters: Infer<typeof filterQuizValidator>, page: number, limit: number) {
    const sort = this.sortOptions.find((option) => option.key === filters.sort) || this.sortOptions[0]
    const quizzes = Quiz.query()
      .if(filters.search, (query) => query.whereLike('name', `%${filters.search}%`))
      .if(filters.category, (query) => query.where('category_id', filters.category!))
      .if(filters.collection, (query) => query.where('collection_id', filters.collection!))
      .if(filters.user, (query) => query.where('user_id', filters.user!))
      .if(filters.isPublic, (query) => query.where('is_public', filters.isPublic!))
      .if(filters.relations, (query) => {
        const relations = typeof filters.relations === 'string' ? [filters.relations] : filters.relations
        relations?.map((relation) => {
          query.preload(relation as ExtractModelRelations<Quiz>)
        })
      })
      .orderBy(sort.field, sort.dir)
      .paginate(page, limit)

    return quizzes
  }
}