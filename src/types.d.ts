import { type AUTO_LANGUAGES, type SUPPORTED_LANGUAGES } from "./constant"

export type Language = keyof typeof SUPPORTED_LANGUAGES
export type AutoLanguage = typeof AUTO_LANGUAGES
export type FromLanguage = Language | AutoLanguage


export interface State {

  fromLanguage: strin
  toLanguage: string
  fromText:string
  result:string
  loading: boolean

}


export type Action =
 | { type: 'SET_FROM_LANGUAGE', payload: string }
 | { type: 'INTERCHANGE_LANGUAGES' }
 | { type: 'SET_TO_LANGUAGE', payload: string }
 | { type: 'SET_FROM_TEXT', payload: string }
 | { type: 'SET_RESULT', payload: string }