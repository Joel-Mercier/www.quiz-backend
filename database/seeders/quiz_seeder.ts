import Quiz from '#models/quiz'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  static environment = ['development', 'testing']

  async run() {
    // Write your database queries inside the run method
    await Quiz.createMany([
      {
        name: 'Test Quiz',
        description: 'This is a test quiz',
        timesPlayed: 0,
        isPublic: true,
        likesCount: 0,
        userId: 1,
        categoryId: 1,
      }
    ])
  }
}
