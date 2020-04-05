import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UsersService } from '@app/users/users.service'
import { User } from '@app/users/user.entity'
import omit from 'lodash/omit'
import { Crypt } from './crypt'

@Injectable()
export class AuthService {
  constructor (
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  public async validateUser (username: string, password: string) {
    const user = await this.usersService.usersRepository.findOne({ username })

    if (user && Crypt.comparePasswords(password, user.password)) {
      return omit(user, ['password'])
    }

    return null
  }

  public async login (user: User) {
    return {
      accessToken: this.jwtService.sign({
        username: user.username,
        sub: user.id
      })
    }
  }
}
