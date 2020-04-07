import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { UsersService } from '@app/users/users.service'
import { User } from '@app/users/user.entity'
import omit from 'lodash/omit'
import { Crypt } from './crypt'

@Injectable()
export class AuthService {
  constructor (
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  public async validateUser (username: string, password: string) {
    const user = await this.usersService.usersRepository.findOne({ username })

    if (user && Crypt.comparePasswords(password, user.password)) {
      return omit(user, ['password'])
    }

    return null
  }

  public async login (user: Omit<User, 'password'>) {
    const tokenPayload = {
      username: user.username,
      sub: user.id
    }

    return {
      accessToken: this.jwtService.sign(tokenPayload)
    }
  }
}
