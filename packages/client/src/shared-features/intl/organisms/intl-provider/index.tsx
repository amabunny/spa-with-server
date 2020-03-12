import React, { useEffect } from 'react'
import { IntlProvider as ReactIntlProvider } from 'react-intl'
import { useStore } from 'effector-react'
import { IntlService } from '@app/services/intl'
import { intl } from '../../store'

interface IProps {
  fallback?: React.ReactNode
}

export const IntlProvider: React.FC<IProps> = ({
  children,
  fallback = null
}) => {
  const { data, loading } = useStore(intl.$intlData)
  const locale = useStore(intl.$locale)

  useEffect(() => {
    intl.changeLocale(IntlService.AvailableLocales.enUS)
  }, [])

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
