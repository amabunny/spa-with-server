import React from 'react'
import { Spin } from 'antd'
import * as classes from './style.module.less'

export const FullscreenLoaderTemplate = () => {
  return (
    <div className={classes.wrapper}>
      <Spin className={classes.spinner} />
    </div>
  )
}
