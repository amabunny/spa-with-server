import React, { useCallback } from 'react'
import cn from 'classnames'
import { useStore } from 'effector-react'
import { Dropdown, Menu } from 'antd'
import { SettingOutlined, LogoutOutlined, UsergroupAddOutlined, HomeOutlined } from '@ant-design/icons'
import { Link, useNavigate } from '@reach/router'
import { FormattedMessage } from 'react-intl'
import { Auth } from '@app/shared-features/core'
import { SergeiService } from '@app/services/models/sergei'
import { RouterService } from '@app/services/router'
import { Container } from '../../atoms/container'
import classes from './style.module.less'

interface IProps {
  className?: string
}

export const Header: React.FC<IProps> = ({ className }) => {
  const navigate = useNavigate()
  const user = useStore(Auth.$user)

  const onAdminClick = useCallback(() => {
    navigate(RouterService.getAdminRoute())
  }, [navigate])

  const onHomeClick = useCallback(() => {
    navigate(RouterService.getIndexRoute())
  }, [navigate])

  const onLogoutClick = useCallback(() => {
    Auth.logout()
  }, [])

  return (
    <div className={cn(className, classes.wrapper)}>
      <Container className={classes.wrapperContainer}>
        <h1 className={classes.title}>
          <FormattedMessage
            id='blogArticles.title'
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
            <Dropdown
              overlay={
                <Menu>
                  <Menu.Item onClick={onHomeClick}>
                    <HomeOutlined />
                    <FormattedMessage id='menu.goHome' />
                  </Menu.Item>

                  <Menu.Item onClick={onAdminClick}>
                    <UsergroupAddOutlined />
                    <FormattedMessage id='menu.adminPanel' />
                  </Menu.Item>

                  <Menu.Item onClick={onLogoutClick}>
                    <LogoutOutlined />
                    <FormattedMessage id='auth.logout' />
                  </Menu.Item>
                </Menu>
              }
            >
              <div className={classes.loggedUserTile}>
                <span>
                  {user.username}
                </span>

                <SettingOutlined />
              </div>
            </Dropdown>
          )}
        </div>
      </Container>
    </div>
  )
}
