import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class AuthService {
  constructor (@InjectRepository(User) private readonly usersRepository: Repository<User>) {

  }

  public findAll () {
    return this.usersRepository.find()
  }

  public findUser (id: string) {
    return this.usersRepository.findOneOrFail(id)
  }

  public async validateUser (username: string, password: string) {
    const user = await this.usersRepository.findOne(username)

    if (user && user.password === password) {
      return user
    }

    return null
  }
}
