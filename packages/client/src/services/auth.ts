import { hostApi } from '@app/api/host'

export class AuthService {
  static async getUser () {
    const { data } = await hostApi.get('auth/user')
    return data
  }

  static async login (username: string, password: string) {
    const { data } = await hostApi.post('auth/login', {
      username,
      password
    })

    return data
  }
}
