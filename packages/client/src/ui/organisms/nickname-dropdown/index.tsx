import React, { useCallback } from 'react'
import { Dropdown, Menu } from 'antd'
import { HomeOutlined, LogoutOutlined, UsergroupAddOutlined, SettingOutlined } from '@ant-design/icons'
import { FormattedMessage } from 'react-intl'
import { useNavigate } from '@reach/router'
import { useStore } from 'effector-react'
import { Auth } from '@app/shared-features/core'
import { RouterService } from '@app/services/router'
import classes from './style.module.less'

export const NicknameDropdown = () => {
  const user = useStore(Auth.$user)
  const navigate = useNavigate()

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
    <>
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
    </>
  )
}