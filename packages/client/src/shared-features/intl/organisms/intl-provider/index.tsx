import React, { useEffect } from 'react'
import { IntlProvider as ReactIntlProvider } from 'react-intl'
import { useStore } from 'effector-react'
import { AvailableLocales } from '@app/services/intl'
import { translates } from '../../store'

export const IntlProvider: React.FC = ({ children }) => {
  const { data, loading } = useStore(translates.$intl)

  useEffect(() => {
    translates.loadDictionaries(AvailableLocales.enUS)
  }, [])

  if (loading && !Object.entries(data).length) return null

  return (
    <ReactIntlProvider
      locale={'en'}
      messages={data}
    >
      {children}
    </ReactIntlProvider>
  )
}
