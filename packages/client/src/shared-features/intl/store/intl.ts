import { forward, createStore } from 'effector'
import { loadDataFactory } from '@app/lib/factory/load-data'
import { IntlService, AvailableLocales } from '@app/services/intl'
import { changeLocale } from './intl.events'

const {
  $totalData: $intlData,
  loadData: loadDictionaries
} = loadDataFactory({
  loadDataHandler: IntlService.loadDictionaries,
  initialState: {}
})

const $locale = createStore<AvailableLocales | null>(null)

$locale.on(changeLocale, (_, locale) => locale)

forward({
  from: changeLocale,
  to: loadDictionaries
})

export {
  $intlData,
  $locale,
  loadDictionaries,
  changeLocale
}
