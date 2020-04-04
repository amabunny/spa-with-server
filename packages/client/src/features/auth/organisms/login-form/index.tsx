import React, { useMemo } from 'react'
import { FormattedMessage } from 'react-intl'
import { Form, Input, Button } from 'antd'
import { ColProps } from 'antd/lib/grid/col'
import classes from './style.module.less'

export const LoginForm = () => {
  const labelLayout = useMemo<ColProps>(() => ({
    xs: { span: 24 },
    sm: { span: 8 }
  }), [])

  const wrapperLayout = useMemo<ColProps>(() => ({
    xs: { span: 24 },
    sm: { span: 16 }
  }), [])

  return (
    <Form
      labelCol={labelLayout}
      wrapperCol={wrapperLayout}
    >
      <Form.Item
        label={<FormattedMessage id='auth.loginForm.username' />}
        required
      >
        <Input />
      </Form.Item>

      <Form.Item
        label={<FormattedMessage id='auth.loginForm.password' />}
        required
      >
        <Input type='password' />
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
  )
}
