import vine from '@vinejs/vine'

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().trim().email(),
    password: vine.string().trim().minLength(8),
  })
)

export const providerValidator = vine.compile(
  vine.object({
    params: vine.object({
      provider: vine.enum(['google', 'github', 'discord', 'facebook']),
    })
  })
)
