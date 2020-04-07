import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const ClientIp = createParamDecorator((data: unknown, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest()

  const xForwardedFor = Array.isArray(req.headers['x-forwarded-for'])
    ? req.headers['x-forwarded-for'].join(',')
    : req.headers['x-forwarded-for']

  return xForwardedFor || req.connection.remoteAddress
})
