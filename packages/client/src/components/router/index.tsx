import React from 'react'
import { Router as ReachRouter } from '@reach/router'
import { IndexPage } from '@app/pages/index'
import { AdminPage } from '@app/pages/admin'
import { LoginPage } from '@app/pages/login'
import { RegisterPage } from '@app/pages/register'

export const Router = () => {
  return (
    <ReachRouter>
      <IndexPage path='/' />
      <AdminPage path='/admin' />
      <RegisterPage path='/register' />
      <LoginPage path='/login' />
    </ReachRouter>
  )
}
