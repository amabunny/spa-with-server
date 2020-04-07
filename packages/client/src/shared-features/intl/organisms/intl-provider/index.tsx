import React from 'react'
import { IntlProvider as ReactIntlProvider } from 'react-intl'
import { useStore } from 'effector-react'
import { Intl } from '../../store'

interface IProps {
  fallback?: React.ReactNode
}

export const IntlProvider: React.FC<IProps> = ({
  children,
  fallback = null
}) => {
  const { data, loading } = useStore(Intl.$intlData)
  const locale = useStore(Intl.$locale)

  if (loading || !locale) {
    return (
      <>
        {fallback}
      </>
    )
  }

  return (
    <ReactIntlProvider
      locale={locale}
      messages={data}
    >
      {children}
    </ReactIntlProvider>
  )
}
