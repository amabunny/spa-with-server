import {
  Controller,
  Body,
  Post,
  BadRequestException,
  UseGuards,
  Request,
  ForbiddenException
} from '@nestjs/common'
import { UsersService } from '@app/users/users.service'
import { NewUserDTO } from './dto/new-user'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './local-auth.guard'
import { NestRequest } from '@app/types/http'
import { LoginDTO } from './dto/login'
import { LogoutDTO } from './dto/logout'
import { RefreshDTO } from './dto/refresh'
import { ClientIp } from './decorators/client-ip'
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
  async login (
    @Request() req: NestRequest<LocalUserPayload>,
    @Body() { fingerprint }: LoginDTO,
    @ClientIp() clientIp: string
  ) {
    if (!clientIp) {
      throw new BadRequestException()
    }

    return this.authService.login(req.user, fingerprint, clientIp)
  }

  @Post('refresh')
  async refresh (
    @Body() { refreshToken, fingerprint }: RefreshDTO,
    @ClientIp() clientIp: string
  ) {
    const refreshResult = await this.authService.refreshAccessToken(fingerprint, refreshToken, clientIp)

    if (refreshResult.type === 'success') {
      const { accessToken, refreshToken } = refreshResult

      return {
        accessToken,
        refreshToken
      }
    } else {
      throw new ForbiddenException(refreshResult.message)
    }
  }

  @Post('logout')
  async logout (
    @Body() { refreshToken, fingerprint }: LogoutDTO
  ) {
    await this.authService.revokeRefreshToken(fingerprint, refreshToken)

    return {
      success: true
    }
  }
}
