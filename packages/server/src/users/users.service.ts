import { Repository } from 'typeorm'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { User } from './user.entity'

@Injectable()
export class UsersService {
  constructor (@InjectRepository(User) public readonly usersRepository: Repository<User>) {}

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
