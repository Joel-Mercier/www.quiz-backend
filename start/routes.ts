/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import UsersController from '#controllers/users_controller'
import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'
import FollowsController from '#controllers/follows_controller'
import SessionsController from '#controllers/sessions_controller'
import CategoriesController from '#controllers/categories_controller'
import QuizzesController from '#controllers/quizzes_controller'
import QuestionsController from '#controllers/questions_controller'
import QuestionTypesController from '#controllers/question_types_controller'
import CollectionsController from '#controllers/collections_controller'
import GamesController from '#controllers/games_controller'
import LikesController from '#controllers/likes_controller'

router
  .group(() => {
    router
      .group(() => {
        router
          .resource('users', UsersController)
          .apiOnly()
          .use(
            '*',
            middleware.auth({
              guards: ['api'],
            })
          )
        router
          .resource('users.follows', FollowsController)
          .apiOnly()
          .except(['update', 'show'])
          .use(
            '*',
            middleware.auth({
              guards: ['api'],
            })
          )
        router
          .resource('collections', CollectionsController)
          .apiOnly()
          .use(
            ['destroy', 'index', 'show', 'store', 'update'],
            middleware.auth({
              guards: ['api'],
            })
          )
        router
          .resource('categories', CategoriesController)
          .apiOnly()
          .use(
            ['destroy', 'index', 'show', 'store', 'update'],
            middleware.auth({
              guards: ['api'],
            })
          )
        router
          .resource('quizzes', QuizzesController)
          .apiOnly()
          .use(
            ['destroy', 'index', 'show', 'store', 'update'],
            middleware.auth({
              guards: ['api'],
            })
          )
        router
          .resource('quizzes.likes', LikesController)
          .apiOnly()
          .except(['update', 'show'])
          .use(
            ['destroy', 'index', 'store'],
            middleware.auth({
              guards: ['api'],
            })
          )
        router
          .resource('questions', QuestionsController)
          .apiOnly()
          .use(
            ['destroy', 'index', 'show', 'store', 'update'],
            middleware.auth({
              guards: ['api'],
            })
          )
        router
          .resource('question_types', QuestionTypesController)
          .apiOnly()
          .except(['update', 'show', 'store', 'destroy'])
          .use(
            ['index'],
            middleware.auth({
              guards: ['api'],
            })
          )
        router
          .resource('games', GamesController)
          .apiOnly()
          .use(
            ['destroy', 'index', 'show', 'store', 'update'],
            middleware.auth({
              guards: ['api'],
            })
          )
        router.post('auth/login', [SessionsController, 'login'])
        router.post('auth/logout', [SessionsController, 'logout'])
      })
      .prefix('/v1')
  })
  .prefix('/api')
