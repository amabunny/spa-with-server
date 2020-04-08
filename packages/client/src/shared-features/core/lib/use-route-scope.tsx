import React, { useMemo, Fragment } from 'react'
import { Redirect } from '@reach/router'
import { useStore } from 'effector-react'
import { RouterService } from '@app/services/router'
import { Auth } from '../store'

interface IRouteScopeParams {
  scope: 'private' | 'unathorized'
  fallbackPage?: string
  onGuardTriggered?: () => void
}

export const useRouteScope = ({ fallbackPage, onGuardTriggered, scope }: IRouteScopeParams) => {
  const user = useStore(Auth.$user)
  const isAuthInitializing = useStore(Auth.$initializing)

  const isRouteAvailable = useMemo(() => {
    switch (scope) {
      case 'private':
        return Boolean(user)

      case 'unathorized':
        return !user
    }
  }, [scope, user])

  const fallback = useMemo(() => {
    if (fallbackPage) return fallbackPage

    switch (scope) {
      case 'private':
        return RouterService.getLoginRoute()

      case 'unathorized':
        return RouterService.getIndexRoute()
    }
  }, [fallbackPage, scope])

  return useMemo(() => {
    if (isAuthInitializing || isRouteAvailable) {
      return {
        guardedRedirect: <Fragment />
      }
    }

    if (onGuardTriggered) {
      onGuardTriggered()
    }

    return {
      guardedRedirect: (
        <Redirect
          noThrow
          to={fallback}
        />
      )
    }
  }, [fallback, isAuthInitializing, isRouteAvailable, onGuardTriggered])
}
