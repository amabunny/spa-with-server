import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from './user.entity'

@Injectable()
export class AuthService {
  constructor (@InjectRepository(User) private readonly usersRepository: Repository<User>) {}

  public findAll () {
    return this.usersRepository.find()
  }

  public findUser (id: string) {
    return this.usersRepository.findOneOrFail(id)
  }

  public async validateUser (username: string, password: string) {
    const user = await this.usersRepository.findOne({ username })

    if (user && User.comparePasswords(password, user.password)) {
      return user
    }

    throw new Error('Not valid user.')
  }

  public async createUser (user: Omit<User, 'id' | 'hashUserPassword'>) {
    const newUser = Object.assign(new User(), user)
    return this.usersRepository.save(newUser)
  }

  public async deleteUser (id: string) {
    const user = await this.usersRepository.findOne({ id })

    if (user) {
      return this.usersRepository.remove(user)
    }

    throw new Error('Cannot delete user. Not found in repository.')
  }
}
