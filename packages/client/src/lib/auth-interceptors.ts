import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { AuthService, ILoginTokenResult } from '@app/services/auth'
import { LocalStorageService } from '@app/services/local-storage'

interface ICreateInterceptorsParams {
  onRefreshError: () => void
}

export const createAxiosInterceptors = ({ onRefreshError }: ICreateInterceptorsParams) => {
  let refreshingPromise: Promise<ILoginTokenResult> | null = null

  const requestInterceptor = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    if (refreshingPromise) {
      await refreshingPromise
    }

    const accessTokenLs = LocalStorageService.getAccessToken()

    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: accessTokenLs ? `Bearer ${accessTokenLs}` : undefined
      }
    }
  }

  const errorResponseInterceptor = async (error: AxiosError) => {
    const refreshTokenLs = LocalStorageService.getRefreshToken()

    if (error?.response?.status === 401 && refreshTokenLs) {
      try {
        refreshingPromise = AuthService.revokeToken({ refreshToken: refreshTokenLs })
        const { refreshToken, accessToken } = await refreshingPromise

        LocalStorageService.setAccessToken(accessToken)
        LocalStorageService.setRefreshToken(refreshToken)

        refreshingPromise = null

        return axios({
          ...error.config,
          headers: {
            ...error.config.headers,
            Authorization: `Bearer ${accessToken}`
          }
        })
      } catch (e) {
        LocalStorageService.setAccessToken(null)
        LocalStorageService.setRefreshToken(null)

        refreshingPromise = null

        onRefreshError()
        return Promise.reject(e)
      }
    }

    return Promise.reject(error)
  }

  return {
    requestInterceptor,
    errorResponseInterceptor
  }
}
