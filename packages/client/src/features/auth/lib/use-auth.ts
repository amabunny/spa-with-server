import { useCallback, useEffect } from 'react'
import { navigate } from '@reach/router'
import { Auth } from '@app/shared-features/core'
import { createAxiosInterceptors } from '@app/lib/auth-interceptors'
import { AuthInterceptorService } from '@app/services/auth'

export const useAuth = () => {
  const onRefreshTokenSuccess = useCallback((result: { accessToken: string, refreshToken: string }) => {
    Auth.setTokens({ accessToken: result.accessToken, refreshToken: result.refreshToken })
  }, [])

  const onRefreshTokenError = useCallback(() => {
    Auth.resetUser()
    navigate('/login')
  }, [])

  useEffect(() => {
    const { requestInterceptor, errorResponseInterceptor } = createAxiosInterceptors({
      onRefreshTokenError,
      onRefreshTokenSuccess,
      getAccessToken: () => Auth.$tokens.getState().accessToken,
      getRefreshToken: () => Auth.$tokens.getState().refreshToken
    })

    const requestInterceptorsId = AuthInterceptorService.useRequestInterceptor(requestInterceptor)
    const responseInterceptorsId = AuthInterceptorService.useErrorResponseInterceptor(errorResponseInterceptor)

    return () => {
      AuthInterceptorService.ejectRequestInterceptor(requestInterceptorsId)
      AuthInterceptorService.ejectErrorResponseInterceptor(responseInterceptorsId)
    }
  }, [onRefreshTokenError, onRefreshTokenSuccess])

  useEffect(() => {
    Auth.init()
  }, [])
}
