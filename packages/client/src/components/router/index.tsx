import React from 'react'
import { Router as ReachRouter } from '@reach/router'
import { BlogArticlesPage } from '@app/features/blog-articles'

export const Router = () => {
  return (
    <ReachRouter>
      <BlogArticlesPage path='/' />
    </ReachRouter>
  )
}
