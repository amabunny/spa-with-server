import React from 'react'
import { Typography } from 'antd'
import { FormattedMessage } from 'react-intl'
import { Container } from '../../atoms/container'
import { SergeiService } from '@app/services/sergei'

interface IProps {
  className?: string
}

export const Header: React.FC<IProps> = ({ className }) => {
  return (
    <div className={className}>
      <Container>
        <Typography.Title level={4}>
          <FormattedMessage
            id='blogArticles.title'
            values={{ nickname: SergeiService.nickname }}
          />
        </Typography.Title>

        this is a header!
      </Container>
    </div>
  )
}
