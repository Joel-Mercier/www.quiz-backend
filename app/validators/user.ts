import UserService from '#services/user_service'
import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    username: vine.string().trim(),
    email: vine
      .string()
      .trim()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().minLength(8),
    passwordConfirmation: vine.string().minLength(8).sameAs('password'),
    avatar: vine.file({
      size: '1mb',
      extnames: ['jpg', 'png', 'jpeg', 'webp'],
    }).nullable(),
  })
)

export const updateUserValidator = vine.withMetaData<{ userId: number }>().compile(
  vine.object({
    username: vine.string().trim(),
    email: vine
      .string()
      .trim()
      .email()
      .unique(async (db, value, field) => {
        const user = await db
          .from('users')
          .whereNot('id', field.meta.userId)
          .where('email', value)
          .first()
        return !user
      }),
    avatar: vine.file({
      size: '1mb',
      extnames: ['jpg', 'png', 'jpeg', 'webp'],
    }).nullable(),
    params: vine.object({
      id: vine.number(),
    }),
    
  })
)

export const filterUserValidator = vine.compile(
  vine.object({
    limit: vine.number().optional(),
    page: vine.number().optional(),
    search: vine.string().trim().optional(),
    isPublic: vine.boolean().optional(),
    sort: vine.string().exists(async (db, value) => {
      return UserService.sortOptions.some((option) => option.key === value)
    }).optional(),
    relations: vine.array(vine.string()).optional(),
  })
)
