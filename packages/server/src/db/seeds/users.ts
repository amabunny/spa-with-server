import { Factory, Seeder } from 'typeorm-seeding'
import { Connection } from 'typeorm'
import { Crypt } from '@app/auth/crypt'

export default class CreateUsers implements Seeder {
  public async run (factory: Factory, connection: Connection): Promise<any> {
    await connection.getRepository('user')
      .insert([{
        firstName: 'Sergei',
        lastName: 'Antipin',
        password: Crypt.hashPassword('3dxlq0tj'),
        tgContact: '@mabunny',
        username: '@mabunny'
      }])
  }
}
