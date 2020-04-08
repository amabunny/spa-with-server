import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { BaseTemplate } from '@app/ui'
import { useRouteScope } from '@app/shared-features/core'

export const AdminPage: React.FC<RouteComponentProps> = () => {
  const { guardedRedirect } = useRouteScope({ scope: 'private' })

  return (
    <>
      {guardedRedirect}
      <BaseTemplate>
        admin page
      </BaseTemplate>
    </>
  )
}
