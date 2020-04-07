import { useEffect, useMemo } from 'react'
import { navigate } from '@reach/router'
import { useStore } from 'effector-react'
import { RouterService } from '@app/services/router'
import { Auth } from '../store'

interface IPrivateRouteParams {
  scope: 'private' | 'unathorized'
  fallbackPage?: string
  onGuardTriggered?: () => void
}

export const useRouteScope = ({ fallbackPage, onGuardTriggered, scope }: IPrivateRouteParams) => {
  const user = useStore(Auth.$user)

  const fallback = useMemo(() => {
    if (fallbackPage) return fallbackPage

    switch (scope) {
      case 'private':
        return RouterService.getLoginRoute()

      case 'unathorized':
        return RouterService.getIndexRoute()
    }
  }, [fallbackPage, scope])

  useEffect(() => {
    if (user) return

    if (onGuardTriggered) {
      onGuardTriggered()
    }

    navigate(fallback)
  }, [user, fallback, onGuardTriggered])
}
