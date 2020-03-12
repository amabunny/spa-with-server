import { selfApi } from '@app/api/self'
import { IDictionary } from '@spa-with-node/types'

export enum AvailableLocales {
  ruRU = 'ru-RU',
  enUS = 'en-US'
}

export class IntlService {
  static async loadDictionaries (locale: AvailableLocales) {
    const { data } = await selfApi.get<IDictionary<string>>(`locales/${locale}.json`)
    return data
  }
}
