import vine from '@vinejs/vine'

export const createSoundValidator = vine.compile(
  vine.object({
    file: vine.file({
      size: '10mb',
      extnames: ['mp3', 'wav', 'ogg'],
    }),
  })
)
