import React, { useEffect, useCallback } from 'react'
import { hot } from 'react-hot-loader/root'
import { navigate } from '@reach/router'
import { IntlProvider } from '@app/shared-features/intl'
import { Auth } from '@app/shared-features/core'
import { hostApi } from '@app/api/host'
import { createAxiosInterceptors } from '@app/lib/auth-interceptors'
import { Router } from '../router'

const AppView = () => {
  const onRefreshTokenError = useCallback(() => {
    navigate('/login')
  }, [])

  useEffect(() => {
    const { requestInterceptor, errorResponseInterceptor } = createAxiosInterceptors({
      onRefreshError: onRefreshTokenError
    })

    const requestInterceptorsId = hostApi.interceptors.request.use(requestInterceptor)
    const responseInterceptorsId = hostApi.interceptors.response.use(undefined, errorResponseInterceptor)

    return () => {
      hostApi.interceptors.request.eject(requestInterceptorsId)
      hostApi.interceptors.response.eject(responseInterceptorsId)
    }
  }, [onRefreshTokenError])

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
