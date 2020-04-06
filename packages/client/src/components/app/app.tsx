import React, { useEffect } from 'react'
import { hot } from 'react-hot-loader/root'
import { IntlProvider } from '@app/shared-features/intl'
import { Auth } from '@app/shared-features/core'
import { hostApi } from '@app/api/host'
import { createAxiosInterceptors } from '@app/lib/auth-interceptors'
import { Router } from '../router'

const AppView = () => {
  useEffect(() => {
    const { requestInterceptor } = createAxiosInterceptors()

    hostApi.interceptors.request.use(requestInterceptor)
  }, [])

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
