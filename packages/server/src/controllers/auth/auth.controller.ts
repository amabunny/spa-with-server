import { Controller, Get } from '@nestjs/common'

@Controller('auth')
export class AuthController {
  @Get('user')
  getUser () {
    return {
      status: 'success',
      message: 'This method will be implemented later'
    }
  }
}
