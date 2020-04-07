import axios, { AxiosRequestConfig } from 'axios'
import { hostApi } from '@app/api/host'
import fingerprint from 'fingerprintjs2'
import { EnvService } from './env'
import { LocalStorageService } from './local-storage'

export interface ILoginTokenResult {
  accessToken: string
  refreshToken: string
}

export const AuthService = {
  async getBrowserPrint () {
    const components = await fingerprint.getPromise()
    const values = components.map(({ value }) => value)
    return fingerprint.x64hash128(values.join(), 31)
  },

  async login ({ password, username }: { username: string, password: string }) {
    const browserPrint = await AuthService.getBrowserPrint()

    const { data } = await hostApi.post<ILoginTokenResult>('auth/login', {
      username,
      password,
      fingerprint: browserPrint
    })

    return data
  },

  async logout () {
    const browserPrint = await AuthService.getBrowserPrint()

    const { data } = await hostApi.post<{ success: boolean }>('/auth/logout', {
      fingerprint: browserPrint,
      refreshToken: LocalStorageService.getRefreshToken()
    })

    return data
  },

  async refreshToken ({ refreshToken } : { refreshToken: string }) {
    const browserPrint = await AuthService.getBrowserPrint()

    const { data } = await axios.post<ILoginTokenResult>(`${EnvService.getHostUrl()}/auth/refresh`, {
      refreshToken,
      fingerprint: browserPrint
    })

    return data
  }
}

export const AuthInterceptorService = {
  useRequestInterceptor (
    interceptor: ((value: AxiosRequestConfig) => AxiosRequestConfig | Promise<AxiosRequestConfig>)
  ) {
    return hostApi.interceptors.request.use(interceptor)
  },

  useErrorResponseInterceptor (interceptor: ((error: any) => any)) {
    return hostApi.interceptors.response.use(undefined, interceptor)
  },

  ejectRequestInterceptor (id: number) {
    hostApi.interceptors.request.eject(id)
  },

  ejectErrorResponseInterceptor (id: number) {
    hostApi.interceptors.response.eject(id)
  }
}
