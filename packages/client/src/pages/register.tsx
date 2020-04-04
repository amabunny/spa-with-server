import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { FormattedMessage } from 'react-intl'
import { UnauthorizedTemplate } from '@app/ui/templates/unauthorized'
import { RegisterForm } from '@app/features/auth'

export const RegisterPage: React.FC<RouteComponentProps> = () => {
  return (
    <UnauthorizedTemplate title={<FormattedMessage id='auth.register' />}>
      <RegisterForm />
    </UnauthorizedTemplate>
  )
}
