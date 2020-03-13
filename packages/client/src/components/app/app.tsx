import React, { useEffect } from 'react'
import { hot } from 'react-hot-loader/root'
import { IntlProvider } from '@app/shared-features/intl'
import { Auth } from '@app/shared-features/core'
import { Router } from '../router'

const AppView = () => {
  useEffect(() => {
    Auth.getUser()
  }, [])

  return (
    <IntlProvider>
      <Router />
    </IntlProvider>
  )
}

export const App = hot(AppView)
