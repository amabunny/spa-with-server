import axios, { AxiosRequestConfig, AxiosError } from 'axios'
import { AuthService, ILoginTokenResult } from '@app/services/auth'

interface ICreateInterceptorsParams {
  getAccessToken: () => string | null
  getRefreshToken: () => string | null
  onRefreshTokenError: () => void
  onRefreshTokenSuccess: (params: { accessToken: string, refreshToken: string }) => void
}

export const createAxiosInterceptors = ({
  getAccessToken,
  getRefreshToken,
  onRefreshTokenError,
  onRefreshTokenSuccess
}: ICreateInterceptorsParams) => {
  let refreshingPromise: Promise<ILoginTokenResult> | null = null

  const requestInterceptor = async (config: AxiosRequestConfig): Promise<AxiosRequestConfig> => {
    if (refreshingPromise) {
      await refreshingPromise
    }

    const accessTokenLs = getAccessToken()

    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: accessTokenLs ? `Bearer ${accessTokenLs}` : undefined
      }
    }
  }

  const errorResponseInterceptor = async (error: AxiosError) => {
    const refreshTokenLs = getRefreshToken()

    if (error?.response?.status === 401 && refreshTokenLs) {
      try {
        refreshingPromise = AuthService.refreshToken({ refreshToken: refreshTokenLs })
        const { refreshToken, accessToken } = await refreshingPromise

        onRefreshTokenSuccess({ refreshToken, accessToken })

        refreshingPromise = null

        return axios({
          ...error.config,
          headers: {
            ...error.config.headers,
            Authorization: `Bearer ${accessToken}`
          }
        })
      } catch (e) {
        refreshingPromise = null

        onRefreshTokenError()
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
