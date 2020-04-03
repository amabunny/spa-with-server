import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { User } from '@app/auth/user.entity'

export default class CreateUsers implements Seeder {
  public async run (factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([{
        firstName: 'Sergei',
        lastName: 'Antipin',
        password: User.hashPassword('3dxlq0tj'),
        tgContact: '@mabunny',
        username: '@mabunny'
      }])
      .execute()
  }
}
