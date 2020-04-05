import { createEffect } from 'effector'
import { AuthService } from '@app/services/auth'

export const getUser = createEffect({
  handler: AuthService.getUser
})

export const login = createEffect({
  handler: () => {

  }
})

export const logout = createEffect({
  handler: () => {

  }
})
