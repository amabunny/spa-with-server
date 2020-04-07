import { createEffect } from 'effector'
import { AuthService } from '@app/services/auth'
import { UsersModelService } from '@app/services/models/user'
import { LocalStorageService } from '@app/services/local-storage'

export const getUser = createEffect({
  handler: UsersModelService.getProfile
})

export const login = createEffect({
  handler: AuthService.login
})

export const logout = createEffect({
  handler: AuthService.logout
})

export const setTokens = createEffect({
  handler: (params: { accessToken?: string | null, refreshToken?: string | null}) => {
    if (typeof params.accessToken !== 'undefined') {
      LocalStorageService.setAccessToken(params.accessToken)
    }

    if (typeof params.refreshToken !== 'undefined') {
      LocalStorageService.setRefreshToken(params.refreshToken)
    }
  }
})

export const getTokens = createEffect({
  handler () {
    return {
      accessToken: LocalStorageService.getAccessToken(),
      refreshToken: LocalStorageService.getRefreshToken()
    }
  }
})
