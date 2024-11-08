import User from '#models/user'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  static environment = ['development', 'testing']

  async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        username: 'Admin',
        email: 'admin@wwwquiz.com',
        password: 'abcd1234',
        isAdmin: true,
      },
    ])
  }
}
