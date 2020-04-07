import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UsersService } from '@app/users/users.service'
import { User } from '@app/users/user.entity'
import { Session } from './session.entity'
import omit from 'lodash/omit'
import { Crypt } from './crypt'

@Injectable()
export class AuthService {
  constructor (
    @InjectRepository(Session) public readonly sessionsRepository: Repository<Session>,
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

  public async login (user: Omit<User, 'password'>, fingerprint: string, ip: string) {
    const tokenPayload = {
      username: user.username,
      sub: user.id
    }

    const session = new Session()

    session.expires = new Date().getTime() + this.configService.get('JWT_REFRESH_TOKEN_ALIVE_SECONDS') * 1000
    session.userId = user.id
    session.fingerprint = fingerprint
    session.ip = ip

    const { refreshToken } = await this.sessionsRepository.save(session)

    return {
      accessToken: this.jwtService.sign(tokenPayload),
      refreshToken
    }
  }
}
