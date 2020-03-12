import React from 'react'
import cn from 'classnames'
import classes from './style.module.less'

interface IProps {
  className?: string
}

export const Container: React.FC<IProps> = ({ children, className }) => {
  return (
    <div className={cn(classes.wrapper, className)}>
      {children}
    </div>
  )
}
