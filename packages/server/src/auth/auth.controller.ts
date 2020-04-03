import { Controller, Get, Body, Post, ForbiddenException, BadRequestException } from '@nestjs/common'
import { AuthService } from './auth.service'
import { NewUserDTO } from './dto/new-user'

@Controller('auth')
export class AuthController {
  constructor (public readonly authService: AuthService) {}

  @Get()
  index () {
    return this.authService.findAll()
  }

  @Get('user')
  getUser () {
    return process.env
  }

  @Post('register')
  async register (@Body() newUserDto: NewUserDTO) {
    try {
      const createdUser = await this.authService.createUser(newUserDto)
      return createdUser
    } catch {
      return new BadRequestException()
    }
  }

  @Post('delete')
  async delete (@Body() deleteUserBody: { id: string }) {
    try {
      const deletedUser = await this.authService.deleteUser(deleteUserBody.id)
      return deletedUser
    } catch {
      return new BadRequestException()
    }
  }

  @Post('login')
  async login (@Body() loginUserBody: { username: string, password: string }) {
    try {
      const user = await this.authService.validateUser(loginUserBody.username, loginUserBody.password)
      return user
    } catch {
      return new ForbiddenException()
    }
  }
}
