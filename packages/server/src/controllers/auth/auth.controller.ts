import { Controller, Get } from '@nestjs/common'

@Controller('auth')
export class AuthController {
  @Get('user')
  getUser () {
    return process.env
  }
}
