import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { UnauthorizedTemplate } from '@app/ui/templates/unauthorized'
import { RegisterForm } from '@app/features/auth'

export const RegisterPage: React.FC<RouteComponentProps> = () => {
  return (
    <UnauthorizedTemplate>
      <RegisterForm />
    </UnauthorizedTemplate>
  )
}
