import { ExtractJwt, Strategy } from 'passport-jwt'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { JwtUserPayload } from '@app/auth/types'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor (configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET')
    })
  }

  async validate (payload: JwtUserPayload) {
    return {
      userId: payload.sub,
      username: payload.username
    }
  }
}
