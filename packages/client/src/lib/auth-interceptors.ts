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
    let takenAccessToken = null

    if (refreshingPromise) {
      const { accessToken } = await refreshingPromise
      takenAccessToken = accessToken
    } else {
      takenAccessToken = getAccessToken()
    }

    return {
      ...config,
      headers: {
        ...config.headers,
        Authorization: takenAccessToken ? `Bearer ${takenAccessToken}` : undefined
      }
    }
  }

  const errorResponseInterceptor = async (error: AxiosError) => {
    const takenRefreshToken = getRefreshToken()

    if (error?.response?.status === 401 && takenRefreshToken) {
      try {
        refreshingPromise = AuthService.refreshToken({ refreshToken: takenRefreshToken })
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
