import { useEffect } from 'react'
import { navigate } from '@reach/router'
import { useStore } from 'effector-react'
import { Auth } from '../store'

interface IPrivateRouteParams {
  fallbackPage: string
  onGuardTriggered?: () => void
}

const defaultParams: IPrivateRouteParams = {
  fallbackPage: '/login'
}

export const usePrivateRoute = ({ fallbackPage, onGuardTriggered }: IPrivateRouteParams = defaultParams) => {
  const user = useStore(Auth.$user)

  useEffect(() => {
    if (user) return

    if (onGuardTriggered) {
      onGuardTriggered()
    }

    navigate(fallbackPage)
  }, [user, fallbackPage, onGuardTriggered])
}
