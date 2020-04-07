import axios from 'axios'
import { hostApi } from '@app/api/host'
import fingerprint from 'fingerprintjs2'
import { EnvService } from './env'

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

  },

  async revokeToken ({ refreshToken } : { refreshToken: string }) {
    const browserPrint = await AuthService.getBrowserPrint()

    const { data } = await axios.post<ILoginTokenResult>(`${EnvService.getHostUrl()}/auth/revoke`, {
      refreshToken,
      fingerprint: browserPrint
    })

    return data
  }
}
