import { MigrationInterface, QueryRunner } from 'typeorm'
import { User } from '@app/auth/user.entity'

export class UserSeeds1585949889248 implements MigrationInterface {
  public async up (queryRunner: QueryRunner): Promise<any> {
    queryRunner.connection
      .getRepository('user')
      .insert([{
        firstName: 'Sergei',
        lastName: 'Antipin',
        password: User.hashPassword('3dxlq0tj'),
        tgContact: '@mabunny',
        username: '@mabunny'
      }])
  }

  public async down (queryRunner: QueryRunner): Promise<any> {
    const repository = await queryRunner.connection.getRepository('user')

    const seedingUsers = await repository.find({
      where: [
        { username: '@mabunny' }
      ]
    })

    return Promise.all(seedingUsers.map(user => repository.remove(user)))
  }
}
