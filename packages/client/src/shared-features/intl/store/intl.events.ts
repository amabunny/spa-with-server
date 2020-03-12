import { createEvent } from 'effector'
import { AvailableLocales } from '@app/services/intl'

export const changeLocale = createEvent<AvailableLocales>()

export const getBrowserLocaleAndChangeLanguage = createEvent()
