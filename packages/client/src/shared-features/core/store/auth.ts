import { createStore } from 'effector'
import { getUser, login, logout } from './auth.effects'

const $user = createStore<any>(null)

$user.on(getUser.done, (_, { result }) => result)

export {
  getUser,
  $user,
  login,
  logout
}
