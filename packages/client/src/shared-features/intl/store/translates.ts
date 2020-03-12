import { loadDataFactory } from '@app/utils/factory/load-data'
import { IntlService } from '@app/services/intl'

const {
  $totalData: $intl,
  loadData: loadDictionaries
} = loadDataFactory({
  loadDataHandler: IntlService.loadDictionaries,
  initialState: {}
})

export {
  $intl,
  loadDictionaries
}
