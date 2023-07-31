import { createI18n } from 'vue-i18n'
import zh_cn from './translations/zh_cn.json'
import en_us from './translations/en_us.json'

const messages = {
  zh_cn,
  en_us
}

const i18nConfig = {
  legacy: false,
  locale: 'zh_cn',
  fallbackLocale: 'en_us',
  messages
}

const i18n = new createI18n(i18nConfig)

function tr(key) {
  return i18n.global.t(key)
}

export { i18n, tr }
