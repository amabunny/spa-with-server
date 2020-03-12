import { createEffect, createStore, createEvent, combine } from 'effector'

interface ILoadDataFactory<T, Params> {
  loadDataHandler: (params: Params) => Promise<T>,
  initialState: T
}

/** Factory: used to load data from handler and store it */
export const loadDataFactory = <T, Params = void>({
  loadDataHandler,
  initialState
}: ILoadDataFactory<T, Params>) => {
  const reset = createEvent()
  const loadData = createEffect({ handler: loadDataHandler })

  const $data = createStore(initialState)

  $data
    .on(loadData.done, (_, { result }) => result)
    .reset(loadData.fail)
    .reset(reset)

  const $error = createStore<null | string>(null)

  $error
    .on(loadData.fail, (_, { error }) => error.message)
    .reset(loadData.done)
    .reset(reset)

  const $totalData = combine(loadData.pending, $data, $error, (loading, data, error) => ({
    loading,
    data,
    error
  }))

  return {
    loadData,
    $data,
    $error,
    $loading: loadData.pending,
    $totalData
  }
}
