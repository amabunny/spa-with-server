import React, { useCallback } from 'react'
import { FormattedMessage } from 'react-intl'
import { RouteComponentProps, navigate } from '@reach/router'
import { UnauthorizedTemplate } from '@app/ui/templates/unauthorized'
import { LoginForm } from '@app/features/auth'
import { RouterService } from '@app/services/router'

export const LoginPage: React.FC<RouteComponentProps> = () => {
  const onLoginSuccess = useCallback(() => {
    navigate(RouterService.getIndexRoute())
  }, [])

  return (
    <UnauthorizedTemplate title={<FormattedMessage id='auth.login' />}>
      <LoginForm onLoginSuccess={onLoginSuccess} />
    </UnauthorizedTemplate>
  )
}
