import { Controller, Get, Post, BadRequestException, Param, UseGuards, Request } from '@nestjs/common'
import { JwtAuthGuard } from '@app/auth/jwt-auth.guard'
import { JwtUserPayload } from '@app/auth/types'
import { UsersService } from './users.service'
import { NestRequest } from '@app/types/http'

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
  getProfile (@Request() req: NestRequest<JwtUserPayload>) {
    return this.usersService.usersRepository.findOne(req.user.sub)
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
