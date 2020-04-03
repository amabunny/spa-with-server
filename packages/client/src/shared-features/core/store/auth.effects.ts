import { createEffect } from 'effector'
import { AuthModelService } from '@app/services/models/auth'

export const getUser = createEffect({
  handler: AuthModelService.getUser
})

export const login = createEffect({
  handler: () => {

  }
})

export const logout = createEffect({
  handler: () => {

  }
})
