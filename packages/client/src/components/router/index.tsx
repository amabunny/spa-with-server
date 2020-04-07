import React from 'react'
import { Router as ReachRouter } from '@reach/router'
import { RouterService } from '@app/services/router'
import { IndexPage } from '@app/pages/index'
import { AdminPage } from '@app/pages/admin'
import { LoginPage } from '@app/pages/login'
import { RegisterPage } from '@app/pages/register'

export const Router = () => {
  return (
    <ReachRouter>
      <IndexPage
        path={RouterService.getIndexRoute()}
      />

      <AdminPage
        path={RouterService.getAdminRoute()}
      />

      <RegisterPage
        path={RouterService.getRegisterRoute()}
      />

      <LoginPage
        path={RouterService.getLoginRoute()}
      />
    </ReachRouter>
  )
}
