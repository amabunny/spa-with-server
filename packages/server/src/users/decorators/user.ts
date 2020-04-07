import { createParamDecorator } from '@nestjs/common'
import { NestRequest } from '@app/types/http'
import { User } from '@app/users/user.entity'

export const LocalUser = createParamDecorator((data: unknown, req: NestRequest<User>) => {
  return req.user as User
})
