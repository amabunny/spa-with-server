import { Controller, Get, Body } from '@nestjs/common'
import { AuthService } from './auth.service'
import { NewUserDTO } from './dto/new-user'

@Controller('auth')
export class AuthController {
  constructor (public readonly authService: AuthService) {

  }

  @Get()
  index () {
    return this.authService.findAll()
  }

  @Get('user')
  getUser () {
    return process.env
  }

  @Get('regiser')
  async register (@Body() newUserDto: NewUserDTO) {
    this.authService.createUser(newUserDto)
  }
}
