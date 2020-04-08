import React from 'react'
import { Layout, Menu } from 'antd'
import { useStore } from 'effector-react'
import { BookOutlined } from '@ant-design/icons'
import { Auth } from '@app/shared-features/core'
import { FormattedMessage } from 'react-intl'
import { NicknameDropdown } from '../../organisms/nickname-dropdown'
import classes from './style.module.less'

export const AdminTemplate: React.FC = ({ children }) => {
  const user = useStore(Auth.$user)

  return (
    <Layout className={classes.wrapper}>
      <Layout.Header className={classes.header}>
        <span>
          <FormattedMessage id='sections.admin' />
        </span>

        {user && (
          <NicknameDropdown />
        )}
      </Layout.Header>

      <Layout>
        <Layout.Sider
          className={classes.sider}
          width={200}
        >
          <Menu
            className={classes.menu}
            mode='inline'
          >
            <Menu.Item>
              <BookOutlined />
              <FormattedMessage id='articles.entity' />
            </Menu.Item>
          </Menu>
        </Layout.Sider>

        <Layout.Content className={classes.content}>
          {children}
        </Layout.Content>
      </Layout>
    </Layout>
  )
}
