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
import Notification from './notification.js'
import Achievement from './achievement.js'
import encryption from '@adonisjs/core/services/encryption'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export type TwoFactorSecret = { secret: string, uri: string, qr: string }

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare username: string

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare password: string

  @column({
    serialize: (value: 1 | 0) => {
      return value === 1
    },
  })
  declare isAdmin: boolean

  @column()
  declare avatar: string

  @column()
  declare provider: string

  @column()
  declare providerId: string

  @hasMany(() => Quiz)
  declare quizzes: HasMany<typeof Quiz>

  @hasMany(() => Like)
  declare likes: HasMany<typeof Like>

  @hasMany(() => Collection)
  declare collections: HasMany<typeof Collection>

  @hasMany(() => Game)
  declare gamesAsLeader: HasMany<typeof Game>

  @hasMany(() => Notification)
  declare notifications: HasMany<typeof Notification>

  @hasMany(() => Score)
  declare scores: HasMany<typeof Score>

  @hasManyThrough([() => Quiz, () => Like])
  declare likedQuizzes: HasManyThrough<typeof Quiz>

  @manyToMany(() => Game, {
    pivotTimestamps: true,
  })
  declare games: ManyToMany<typeof Game>

  @manyToMany(() => Achievement, {
    pivotTimestamps: true,
  })
  declare achievements: ManyToMany<typeof Achievement>

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

  @column({ consume: (value) => Boolean(value) })
  declare isTwoFactorEnabled: boolean

  @column({
    serializeAs: null,
    consume: (value: string) => (value ? encryption.decrypt(value) : null),
    prepare: (value: string) => encryption.encrypt(value),
  })
  declare twoFactorSecret: TwoFactorSecret | null

  @column({
    serializeAs: null,
    consume: (value: string) => (value ? encryption.decrypt(value) : null),
    prepare: (value: string) => encryption.encrypt(value),
  })
  declare twoFactorRecoveryCodes: string[]

  static accessTokens = DbAccessTokensProvider.forModel(User, {
    expiresIn: '30 days',
    prefix: 'oat_',
    table: 'auth_access_tokens',
    type: 'auth_token',
    tokenSecretLength: 40,
  })

  currentAccessToken?: AccessToken
}
