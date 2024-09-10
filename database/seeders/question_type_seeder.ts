import QuestionType from '#models/question_type'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  static environment = ['development', 'testing']

  async run() {
    // Write your database queries inside the run method
    await QuestionType.createMany([
      {
        name: 'Quiz',
        value: 'quiz'
      },
      {
        name: 'True or False',
        value: 'boolean'
      },
    ])
  }
}
