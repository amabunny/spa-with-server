import React from 'react'
import cn from 'classnames'
import { useStore } from 'effector-react'
import { Link } from '@reach/router'
import { FormattedMessage } from 'react-intl'
import { Auth } from '@app/shared-features/core'
import { SergeiService } from '@app/services/models/sergei'
import { RouterService } from '@app/services/router'
import { Container } from '../../atoms/container'
import { NicknameDropdown } from '../nickname-dropdown'
import classes from './style.module.less'

interface IProps {
  className?: string
}

export const BaseTemplateHeader: React.FC<IProps> = ({ className }) => {
  const user = useStore(Auth.$user)

  return (
    <div className={cn(className, classes.wrapper)}>
      <Container className={classes.wrapperContainer}>
        <h1 className={classes.title}>
          <FormattedMessage
            id='sections.index'
            values={{ nickname: SergeiService.nickname }}
          />
        </h1>

        <div>
          {!user && (
            <div className={classes.signLinks}>
              <Link to={RouterService.getLoginRoute()}>
                <FormattedMessage id='auth.login' />
              </Link>

              <Link to={RouterService.getRegisterRoute()}>
                <FormattedMessage id='auth.register' />
              </Link>
            </div>
          )}

          {user && (
            <NicknameDropdown />
          )}
        </div>
      </Container>
    </div>
  )
}
