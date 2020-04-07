import { createParamDecorator } from '@nestjs/common'
import { Request } from 'express'

export const ClientIp = createParamDecorator((data: unknown, req: Request) => {
  const xForwardedFor = Array.isArray(req.headers['x-forwarded-for'])
    ? req.headers['x-forwarded-for'].join(',')
    : req.headers['x-forwarded-for']

  return xForwardedFor || req.connection.remoteAddress
})
