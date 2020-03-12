import React from 'react'
import { Header } from '../../molecules/header'
import { Container } from '../../atoms/container'
import classes from './style.module.less'
import '@app/styles/reset.less'

export const BaseTemplate: React.FC = ({ children }) => {
  return (
    <div className={classes.wrapper}>
      <Header className={classes.header} />

      <Container>
        {children}
      </Container>
    </div>
  )
}
