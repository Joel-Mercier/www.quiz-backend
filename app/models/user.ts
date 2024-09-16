import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany, hasManyThrough, manyToMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import type { HasMany, ManyToMany, HasManyThrough } from '@adonisjs/lucid/types/relations'
import Quiz from './quiz.js'
import Like from './like.js'
import Collection from './collection.js'
import Game from './game.js'
import Score from './score.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare firstName: string

  @column()
  declare lastName: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column()
  declare isAdmin: boolean

  @column()
  declare avatar: string

  @hasMany(() => Quiz)
  declare quizzes: HasMany<typeof Quiz>

  @hasMany(() => Like)
  declare likes: HasMany<typeof Like>

  @hasMany(() => Collection)
  declare collections: HasMany<typeof Collection>

  @hasMany(() => Game)
  declare gamesAsLeader: HasMany<typeof Game>

  @manyToMany(() => Game, {
    pivotTimestamps: true,
  })
  declare games: ManyToMany<typeof Game>

  @hasMany(() => Score)
  declare scores: HasMany<typeof Score>

  @hasManyThrough([() => Quiz, () => Like])
  declare likedQuizzes: HasManyThrough<typeof Quiz>

  @manyToMany(() => User, {
    pivotTimestamps: true,
    pivotTable: 'follows',
    localKey: 'id',
    pivotForeignKey: 'follower_id',
    relatedKey: 'id',
    pivotRelatedForeignKey: 'followed_id',
  })
  declare follows: ManyToMany<typeof User>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '30 days',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })

  currentAccessToken?: AccessToken
}
