import React from 'react'
import cn from 'classnames'
import { FormattedMessage } from 'react-intl'
import { SergeiService } from '@app/services/models/sergei'
import { Container } from '../../atoms/container'
import classes from './style.module.less'

interface IProps {
  className?: string
}

export const Header: React.FC<IProps> = ({ className }) => {
  return (
    <div className={cn(className, classes.wrapper)}>
      <Container className={classes.wrapperContainer}>
        <h1 className={classes.title}>
          <FormattedMessage
            id='blogArticles.title'
            values={{ nickname: SergeiService.nickname }}
          />
        </h1>

        this is a header!
      </Container>
    </div>
  )
}
