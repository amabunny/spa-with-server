import { Controller, Get, Post, BadRequestException, Param, UseGuards, Request } from '@nestjs/common'
import omit from 'lodash/omit'
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
  async getProfile (@Request() req: NestRequest<JwtUserPayload>) {
    const user = await this.usersService.usersRepository.findOne(req.user.sub)

    if (user) {
      return omit(user, ['password'])
    }

    throw new BadRequestException()
  }

  @Post('delete/:id')
  async delete (@Param('id') id: number) {
    try {
      const deletedUser = await this.usersService.deleteUser(id)
      return deletedUser
    } catch {
      return new BadRequestException()
    }
  }
}
