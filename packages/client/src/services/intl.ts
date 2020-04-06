import { selfApi } from '@app/api/self'
import { IDictionary } from '@spa-with-node/types'
import { union, Contract } from 'typed-contracts'

export enum AvailableLocales {
  ruRU = 'ru-RU',
  enUS = 'en-US'
}

export const IntlService = {
  AvailableLocales,

  availableLocalesContract (): Contract<AvailableLocales> {
    return union(...Object.values(IntlService.AvailableLocales))
  },

  async loadDictionaries (locale: AvailableLocales) {
    const { data } = await selfApi.get<IDictionary<string>>(`locales/${locale}.json`)
    return data
  }
}
