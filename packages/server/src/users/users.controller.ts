import { Controller, Get, Post, BadRequestException, Param } from '@nestjs/common'
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

  @Get('user')
  getUser () {
    return process.env
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
