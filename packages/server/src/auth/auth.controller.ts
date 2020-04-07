import {
  Controller,
  Body,
  Post,
  BadRequestException,
  UseGuards,
  Request
} from '@nestjs/common'
import { UsersService } from '@app/users/users.service'
import { NewUserDTO } from './dto/new-user'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './local-auth.guard'
import { NestRequest } from '@app/types/http'
import { LoginDTO } from './dto/login'
import { LocalUserPayload } from './types'

@Controller('auth')
export class AuthController {
  constructor (
    private readonly authService: AuthService,
    private readonly usersService: UsersService
  ) {}

  @Post('register')
  async register (@Body() newUserDto: NewUserDTO) {
    try {
      const createdUser = await this.usersService.createUser(newUserDto)
      return createdUser
    } catch {
      return new BadRequestException()
    }
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login (@Request() req: NestRequest<LocalUserPayload>, @Body() { fingerprint }: LoginDTO) {
    const xForwardedFor = Array.isArray(req.headers['x-forwarded-for'])
      ? req.headers['x-forwarded-for'].join(',')
      : req.headers['x-forwarded-for']

    const clientIp = xForwardedFor || req.connection.remoteAddress

    if (!clientIp) {
      throw new BadRequestException()
    }

    return this.authService.login(
      req.user,
      fingerprint,
      clientIp
    )
  }
}
