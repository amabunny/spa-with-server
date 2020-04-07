import { User } from '@app/users/user.entity'

export interface JwtUserPayload {
  sub: string
  username: string
}

export type LocalUserPayload = User
