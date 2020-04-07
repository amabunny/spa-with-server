import React from 'react'
import { hot } from 'react-hot-loader/root'
import { IntlProvider } from '@app/shared-features/intl'
import { useAuth } from '@app/features/auth'
import { Router } from '../router'

const AppView = () => {
  useAuth()

  return (
    <IntlProvider>
      <Router />
    </IntlProvider>
  )
}

export const App = hot(AppView)
