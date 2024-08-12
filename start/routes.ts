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
import JamsController from '#controllers/jams_controller'
import FollowsController from '#controllers/follows_controller'
import SessionsController from '#controllers/sessions_controller'

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
          .resource('jams', JamsController)
          .apiOnly()
          .use(
            ['destroy', 'index', 'show', 'store'],
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
