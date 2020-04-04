import React from 'react'
import { FormattedMessage } from 'react-intl'
import { Input, Button } from 'antd'
import classes from './style.module.less'

export const RegisterForm = () => {
  return (
    <form className={classes.wrapper}>
      <label>
        <FormattedMessage id='auth.registerForm.username' />
      </label>

      <div>
        <Input />
      </div>

      <label>
        <FormattedMessage id='auth.registerForm.firstName' />
      </label>

      <div>
        <Input />
      </div>

      <label>
        <FormattedMessage id='auth.registerForm.lastName' />
      </label>

      <div>
        <Input />
      </div>

      <label>
        <FormattedMessage id='auth.registerForm.tgContact' />
      </label>

      <div>
        <Input />
      </div>

      <label>
        <FormattedMessage id='auth.registerForm.password' />
      </label>

      <div>
        <Input />
      </div>

      <label>
        <FormattedMessage id='auth.registerForm.confirmPassword' />
      </label>

      <div>
        <Input />
      </div>

      <div className={classes.submitBtn}>
        <Button type='primary'>
          <FormattedMessage id='auth.registerForm.submit' />
        </Button>
      </div>
    </form>
  )
}
