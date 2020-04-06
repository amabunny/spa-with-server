import { Request as ExpressRequest } from 'express'

export interface NestRequest<GuardedUser = unknown> extends ExpressRequest {
  user: GuardedUser
}
