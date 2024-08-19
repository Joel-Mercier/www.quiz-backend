import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    params: vine.object({
      email: vine.string().trim().email(),
      password: vine.string().trim().minLength(8),
    }),
  })
)

export const logoutValidator = vine.compile(
  vine.object({
    params: vine.object({
      id: vine.number(),
    }),
  })
)
