import { Controller, Get } from '@nestjs/common'
import { AuthService } from './auth.service'

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
}
