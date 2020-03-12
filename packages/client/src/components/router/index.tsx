import React from 'react'
import { Router as ReachRouter } from '@reach/router'
import { BlogArticlesPage } from '@app/features/blog-articles'
import { AdminPage } from '@app/features/admin'

export const Router = () => {
  return (
    <ReachRouter>
      <BlogArticlesPage path='/' />
      <AdminPage path='/admin' />
    </ReachRouter>
  )
}
