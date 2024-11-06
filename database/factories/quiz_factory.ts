import factory from '@adonisjs/lucid/factories'
import Quiz from '#models/quiz'

export const QuizFactory = factory
  .define(Quiz, async ({ faker }) => {
    return {
      name: faker.lorem.sentence({ min: 2, max: 8 }),
      description: faker.lorem.lines({ min: 2, max: 10 }),
      timesPlayed: faker.number.int({ min: 0, max: 1000 }),
      isPublic: faker.datatype.boolean({ probability: 0.75 }),
      likesCount: faker.number.int({ min: 0, max: 1000 }),
    }
  })
  .build()