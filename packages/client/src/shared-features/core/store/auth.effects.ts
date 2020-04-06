import { createEffect } from 'effector'
import { AuthService } from '@app/services/auth'
import { UsersModelService } from '@app/services/models/user'

export const getUser = createEffect({
  handler: UsersModelService.getProfile
})

export const login = createEffect({
  handler: AuthService.login
})

export const logout = createEffect({
  handler: AuthService.logout
})
