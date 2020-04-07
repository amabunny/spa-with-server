import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { BaseTemplate } from '@app/ui'
import { usePrivateRoute } from '@app/shared-features/core'

export const AdminPage: React.FC<RouteComponentProps> = () => {
  usePrivateRoute()

  return (
    <BaseTemplate>
      admin page
    </BaseTemplate>
  )
}
