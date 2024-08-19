import vine from '@vinejs/vine'

export const createUserValidator = vine.compile(
  vine.object({
    firstName: vine.string().trim(),
    lastName: vine.string().trim(),
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
  })
)

export const updateUserValidator = vine.withMetaData<{ userId: number }>().compile(
  vine.object({
    firstName: vine.string().trim(),
    lastName: vine.string().trim(),
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
    params: vine.object({
      id: vine.number(),
    }),
  })
)
