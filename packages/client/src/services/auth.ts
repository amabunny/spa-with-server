import { hostApi } from '@app/api/host'
import fingerprint from 'fingerprintjs2'

export const AuthService = {
  async login ({ password, username }: { username: string, password: string }) {
    const components = await fingerprint.getPromise()
    const values = components.map(({ value }) => value)
    const browserPrint = fingerprint.x64hash128(values.join(), 31)

    const { data } = await hostApi.post<{ accessToken: string }>('auth/login', {
      username,
      password,
      fingerprint: browserPrint
    })

    return data
  },

  async logout () {

  }
}
