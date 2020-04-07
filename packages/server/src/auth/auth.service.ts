import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ConfigService } from '@nestjs/config'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { UsersService } from '@app/users/users.service'
import { User } from '@app/users/user.entity'
import { Session } from './session.entity'
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
      return user
    }

    return null
  }

  public async login (user: User, fingerprint: string, ip: string) {
    const accessToken = this.signNewToken(user)
    const { refreshToken } = await this.createNewSession(user.id, fingerprint, ip)

    return {
      accessToken,
      refreshToken
    }
  }

  public async revokeAccessToken (fingerprint: string, refreshToken: string, ip: string) {
    const oldSession = await this.sessionsRepository.findOne({ refreshToken }, {
      relations: ['user']
    })

    if (!oldSession) throw new Error('Incorrect refresh token.')
    if (oldSession.fingerprint !== fingerprint) throw new Error('Incorrect browser fingerprint.')
    if (!oldSession.user) throw new Error("Can't load user relation.")

    if (oldSession.expires < new Date().getTime()) {
      this.sessionsRepository.delete(oldSession)

      return {
        type: 'error' as const,
        message: 'Refresh token is expired'
      }
    }

    const { id: userId } = oldSession.user

    this.sessionsRepository.delete(oldSession)

    const accessToken = this.signNewToken(oldSession.user)
    const { refreshToken: newRefreshToken } = await this.createNewSession(userId, fingerprint, ip)

    return {
      type: 'success' as const,
      accessToken,
      refreshToken: newRefreshToken
    }
  }

  private async createNewSession (userId: number, fingerprint: string, ip: string) {
    const session = new Session()

    session.expires = new Date().getTime() + this.configService.get('JWT_REFRESH_TOKEN_ALIVE_SECONDS') * 1000
    session.userId = userId
    session.fingerprint = fingerprint
    session.ip = ip

    return this.sessionsRepository.save(session)
  }

  private signNewToken (user: User) {
    return this.jwtService.sign({
      username: user.username,
      sub: user.id
    })
  }
}
