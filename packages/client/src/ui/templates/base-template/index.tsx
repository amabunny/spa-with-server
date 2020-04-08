import React from 'react'
import { BaseTemplateHeader } from '../../organisms/base-template-header'
import { Container } from '../../atoms/container'
import '@app/styles/reset.less'
import classes from './style.module.less'

export const BaseTemplate: React.FC = ({ children }) => {
  return (
    <div className={classes.wrapper}>
      <BaseTemplateHeader className={classes.header} />

      <Container>
        {children}
      </Container>
    </div>
  )
}
