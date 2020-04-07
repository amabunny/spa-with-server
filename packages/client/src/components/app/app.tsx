import React, { useEffect } from 'react'
import { hot } from 'react-hot-loader/root'
import { useStore } from 'effector-react'
import { IntlProvider, Intl, AvailableLocales } from '@app/shared-features/intl'
import { useAuth, Auth } from '@app/shared-features/core'
import { FullscreenLoaderTemplate } from '@app/ui'
import { Router } from '../router'

const AppView = () => {
  useAuth()

  const authInit = useStore(Auth.$initializing)
  const { loading: intlInit } = useStore(Intl.$intlData)

  useEffect(() => {
    Auth.init()
    Intl.changeLocale(AvailableLocales.enUS)
  }, [])

  if (authInit || intlInit) {
    return (
      <FullscreenLoaderTemplate />
    )
  }

  return (
    <IntlProvider>
      <Router />
    </IntlProvider>
  )
}

export const App = hot(AppView)
