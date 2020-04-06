import { hostApi } from '@app/api/host'
import { SafeUser } from '@app/types/entities'

export const UsersModelService = {
  async getProfile () {
    const { data } = await hostApi.get<SafeUser>('/users/profile')
    return data
  }
}
