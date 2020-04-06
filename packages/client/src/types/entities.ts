import { User } from '@spa-with-node/types'

export type SafeUser = Omit<User, 'password'>
