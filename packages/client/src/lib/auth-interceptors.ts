import { AxiosRequestConfig, AxiosError } from 'axios'
import { AuthService, ILoginTokenResult } from '@app/services/auth'
import { LocalStorageService } from '@app/services/local-storage'

export const createAxiosInterceptors = () => {
  let refreshingPromise: Promise<ILoginTokenResult> | null = null

  const requestInterceptor = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    if (refreshingPromise) {
      await refreshingPromise
    }

    const Authorization = LocalStorageService.getAccessToken()

    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: Authorization ? `Bearer ${Authorization}` : undefined
      }
    }
  }

  const errorResponseInterceptor = async (error: AxiosError) => {
    const refreshTokenLs = LocalStorageService.getRefreshToken()

    if (
      error &&
      error.response &&
      error.response.status === 401 &&
      refreshTokenLs
    ) {
      refreshingPromise = AuthService.revokeToken({ refreshToken: refreshTokenLs })
      const { refreshToken, accessToken } = await refreshingPromise

      LocalStorageService.setAccessToken(accessToken)
      LocalStorageService.setRefreshToken(refreshToken)

      refreshingPromise = null

      return error.config
    }

    return Promise.reject(error)
  }

  return {
    requestInterceptor,
    errorResponseInterceptor
  }
}
