import { hostApi } from '@app/api/host'

export const UsersModelService = {
  async getProfile () {
    const { data } = await hostApi.get('/users/profile')
    return data
  }
}
