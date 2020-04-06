import React, { useMemo, useState, useCallback } from 'react'
import { FormattedMessage } from 'react-intl'
import { Form, Input, Button, Spin } from 'antd'
import { ColProps } from 'antd/lib/grid/col'
import { Auth } from '@app/shared-features/core'
import classes from './style.module.less'

export const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isAuthorizing, setIsAuthorizing] = useState(false)

  const onUsernameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value)
  }, [])

  const onPasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value)
  }, [])

  const onSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsAuthorizing(true)

    try {
      await Auth.login({ username, password })
    } catch {
      alert('Error till login')
    } finally {
      setIsAuthorizing(false)
    }
  }, [username, password])

  const labelLayout = useMemo<ColProps>(() => ({
    xs: { span: 24 },
    sm: { span: 8 }
  }), [])

  const wrapperLayout = useMemo<ColProps>(() => ({
    xs: { span: 24 },
    sm: { span: 16 }
  }), [])

  return (
    <Spin spinning={isAuthorizing}>
      <Form
        labelCol={labelLayout}
        onSubmitCapture={onSubmit}
        wrapperCol={wrapperLayout}
      >
        <Form.Item
          label={<FormattedMessage id='auth.loginForm.username' />}
          required
        >
          <Input
            name='name'
            onChange={onUsernameChange}
            value={username}
          />
        </Form.Item>

        <Form.Item
          label={<FormattedMessage id='auth.loginForm.password' />}
          required
        >
          <Input
            name='password'
            onChange={onPasswordChange}
            type='password'
            value={password}
          />
        </Form.Item>

        <div className={classes.buttonFormItem}>
          <Button
            htmlType='submit'
            type='primary'
          >
            <FormattedMessage id='auth.loginForm.submit' />
          </Button>
        </div>
      </Form>
    </Spin>
  )
}
