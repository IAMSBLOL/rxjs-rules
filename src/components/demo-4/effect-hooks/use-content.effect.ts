import { Effect, Context, Layer, Duration } from "effect"
import type { DetailData } from '@/types'
import { fetchDetails as fetchDetailsFn } from '@/services'
import { useCallback } from "react"
import { useStore2 } from '@/store/demo-4/index.store2'

class FetchDetails extends Context.Tag("FetchList")<
  FetchDetails,
  {
    readonly fetchDetails: (id: string) => Effect.Effect<DetailData>
  }
>() { }

export const FetchDetailsLive = Layer.succeed(
  FetchDetails,
  {
    fetchDetails: (id) => {
      return Effect.gen(function* () {
        const res = yield* Effect.promise(() => fetchDetailsFn({ id }))
        return res
      })
    }
  }
)

export const getContentProgram = (key: string) => {
  return Effect.gen(function* () {

    console.log('getListProgram')
    const service = yield* FetchDetails
    const data = yield* service.fetchDetails(key)
    return data
  }).pipe(
    Effect.provide(FetchDetailsLive),
    Effect.delay(Duration.millis(300)),
    Effect.catchAll((error) =>
      Effect.gen(function* () {

        // 可以在这里处理错误,比如设置错误状态
        // store.setError(error)
        console.error('获取列表失败:', error)
        return yield* Effect.fail(error)
      })
    )
  )
}

export const useContent = () => {

  const setContentLoading = useStore2((s) => s.setContentLoading)
  const setContentData = useStore2((s) => s.setContentData)

  const getContent = useCallback((key?: string) => {

    setContentLoading(true)

    Effect.runPromise(getContentProgram(key || useStore2.getState().currentId))
      .then((data) => {
        // 成功
        setContentData(data)

      })
      .catch((error) => {
        // 失败
        console.error('获取失败:', error)
      })
      .finally(() => {
        // 结束加载

        setContentLoading(false)
      })
  }, [setContentData, setContentLoading])

  return {
    getContent
  }
}