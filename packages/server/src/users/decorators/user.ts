import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '@app/users/user.entity'

export const LocalUser = createParamDecorator((data: unknown, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest()
  return req.user as User
})
