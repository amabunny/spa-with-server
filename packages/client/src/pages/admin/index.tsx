import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { BaseTemplate } from '@app/ui'
import { useRouteScope } from '@app/shared-features/core'

export const AdminPage: React.FC<RouteComponentProps> = () => {
  useRouteScope({ scope: 'private' })

  return (
    <BaseTemplate>
      admin page
    </BaseTemplate>
  )
}
