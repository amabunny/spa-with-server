import React from 'react'
import { FormattedMessage } from 'react-intl'
import { RouteComponentProps } from '@reach/router'
import { UnauthorizedTemplate } from '@app/ui/templates/unauthorized'
import { LoginForm } from '@app/features/auth'

export const LoginPage: React.FC<RouteComponentProps> = () => {
  return (
    <UnauthorizedTemplate title={<FormattedMessage id='auth.login' />}>
      <LoginForm />
    </UnauthorizedTemplate>
  )
}
