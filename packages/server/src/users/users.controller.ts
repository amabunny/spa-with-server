import { Controller, Get, Post, BadRequestException, Param, UseGuards, Request } from '@nestjs/common'
import { JwtAuthGuard } from '@app/auth/jwt-auth.guard'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor (
    private readonly usersService: UsersService
  ) {}

  @Get()
  getUsersList () {
    return this.usersService.usersRepository.find()
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getUser (@Request() req) {
    return req.user
  }

  @Post('delete/:id')
  async delete (@Param('id') id: string) {
    try {
      const deletedUser = await this.usersService.deleteUser(id)
      return deletedUser
    } catch {
      return new BadRequestException()
    }
  }
}
