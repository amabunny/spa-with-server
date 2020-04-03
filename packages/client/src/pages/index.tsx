import React from 'react'
import { RouteComponentProps } from '@reach/router'
import { BaseTemplate } from '@app/ui'

export const IndexPage: React.FC<RouteComponentProps> = () => {
  return (
    <BaseTemplate>
      hello, world!
    </BaseTemplate>
  )
}
