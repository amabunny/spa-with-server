import { hostApi } from '@app/api/host'

export const AuthService = {
  async getUser () {
    const { data } = await hostApi.get('auth/user')
    return data
  },

  async login ({ password, username }: { username: string, password: string }) {
    const { data } = await hostApi.post<{ accessToken: string }>('auth/login', {
      username,
      password
    })

    return data
  },

  async logout () {

  }
}
