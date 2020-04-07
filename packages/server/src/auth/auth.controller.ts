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
  async login (@Request() req: NestRequest<LocalUserPayload>) {
    return this.authService.login(req.user)
  }
}
