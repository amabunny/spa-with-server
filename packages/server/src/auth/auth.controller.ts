import {
  Controller,
  Body,
  Post,
  BadRequestException,
  UseGuards,
  Request
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { UsersService } from '@app/users/users.service'
import { NewUserDTO } from './dto/new-user'
import { AuthService } from './auth.service'
import { LocalAuthGuard } from './local-auth.guard'

@Controller('auth')
export class AuthController {
  constructor (
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly configService: ConfigService
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
  async login (@Request() req) {
    return this.authService.login(req.user)
  }
}
