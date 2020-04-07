import { createStore, forward, merge } from 'effector'
import { SafeUser } from '@app/types/entities'
import { getUser, login, logout, setTokens, getTokens } from './auth.effects'
import { resetUser, init } from './auth.events'
import { ITokensStore } from './auth.types'

const $user = createStore<SafeUser | null>(null)

$user
  .on(getUser.done, (_, { result }) => result)
  .reset(resetUser)

const $tokens = createStore<ITokensStore>({ accessToken: null, refreshToken: null })
$tokens
  .on(setTokens.done, (state, { params }) => ({ ...state, ...params }))
  .on(getTokens.done, (_, { result }) => result)
  .reset(resetUser)

forward({
  from: init,
  to: getTokens
})

forward({
  from: login.doneData,
  to: setTokens
})

forward({
  from: merge([
    login.done,
    getTokens.doneData.filterMap(({ accessToken }) => accessToken || undefined)
  ]),
  to: getUser
})

forward({
  from: [logout, resetUser],
  to: setTokens.prepend(() => ({ accessToken: null, refreshToken: null }))
})

export {
  getUser,
  $user,
  $tokens,
  login,
  logout,
  resetUser,
  setTokens,
  init
}
