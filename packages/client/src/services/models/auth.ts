import { hostApi } from '@app/api/host'

export class AuthModelService {
  static async getUser () {
    const { data } = await hostApi.get('auth/user')
    return data
  }
}
