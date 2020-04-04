import React from 'react'
import classes from './style.module.less'

interface IProps {
  title?: React.ReactNode
}

export const UnauthorizedTemplate: React.FC<IProps> = ({
  children,
  title = 'Unauthorized'
}) => {
  return (
    <div className={classes.wrapper}>
      <div className={classes.container}>
        <h1 className={classes.title}>
          {title}
        </h1>

        {children}
      </div>
    </div>
  )
}
