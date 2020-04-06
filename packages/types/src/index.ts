export * from './entities'

export interface IDictionary<T = unknown> {
  [key: string]: T
}