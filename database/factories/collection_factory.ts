import factory from '@adonisjs/lucid/factories'
import Collection from '#models/collection'

export const CollectionFactory = factory
  .define(Collection, async ({ faker }) => {
    return {
      name: faker.commerce.department(),
      isPublic: faker.datatype.boolean({ probability: 0.75})
    }
  })
  .build()