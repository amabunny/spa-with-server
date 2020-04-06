import { createStore } from 'effector'
import { LocalStorageService } from '@app/services/local-storage'
import { SafeUser } from '@app/types/entities'
import { getUser, login, logout } from './auth.effects'

const $user = createStore<SafeUser | null>(null)
$user.on(getUser.done, (_, { result }) => result)

login.done.watch(({ result }) => {
  LocalStorageService.setAccessToken(result.accessToken)
  getUser()
})

logout.done.watch(() => {
  LocalStorageService.setAccessToken(null)
})

export {
  getUser,
  $user,
  login,
  logout
}
