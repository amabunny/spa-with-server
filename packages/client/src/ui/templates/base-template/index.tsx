import React from 'react'
import { Header } from '../../organisms/header'
import { Container } from '../../atoms/container'
import '@app/styles/reset.less'
import classes from './style.module.less'

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
