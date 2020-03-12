import React from 'react'
import { Header } from '../../molecules/header'
import { Container } from '../../atoms/container'
import classes from './style.module.less'

export const BaseTemplate: React.FC = ({ children }) => {
  return (
    <div className={classes.wrapper}>
      <Header />

      <Container>
        {children}
      </Container>
    </div>
  )
}
