import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { FormattedMessage } from 'react-intl'
import { useRouteScope } from '@app/shared-features/core'
import { UnauthorizedTemplate } from '@app/ui/templates/unauthorized'
import { RegisterForm } from '@app/features/auth'

export const RegisterPage: React.FC<RouteComponentProps> = () => {
  useRouteScope({ scope: 'unathorized' })

  return (
    <UnauthorizedTemplate title={<FormattedMessage id='auth.register' />}>
      <RegisterForm />
    </UnauthorizedTemplate>
  )
}
