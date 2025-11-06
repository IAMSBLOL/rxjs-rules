import { Effect, Context, Layer, Duration } from "effect"
import type { ListData } from '@/types'
import { fetchList as fetchListFn } from '@/services'
import { useCallback } from "react"
import { useStore1 } from '@/store/demo-4/index.store1'
import { useStore2 } from '@/store/demo-4/index.store2'
import { useContent } from './use-content.effect'

class FetchList extends Context.Tag("FetchList")<
  FetchList,
  {
    readonly fetchList: (id: string) => Effect.Effect<ListData[]>
  }
>() { }

export const FetchListLive = Layer.succeed(
  FetchList,
  {
    fetchList: (searchKey) => {
      return Effect.gen(function* () {
        const res = yield* Effect.promise(() => fetchListFn({ searchKey }))
        return res
      })
    }
  }
)

export const getListProgram = (key: string) => {
  return Effect.gen(function* () {

    console.log('getListProgram')
    const service = yield* FetchList
    const data = yield* service.fetchList(key)
    return data
  }).pipe(
    Effect.provide(FetchListLive),
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

export const useList = () => {
  const setSearchLoading = useStore1((s) => s.setSearchLoading)
  const setListData = useStore1((s) => s.setListData)
  const setContentLoading = useStore2((s) => s.setContentLoading)

  const { getContent } = useContent()

  const getList = useCallback((key: string) => {
    setSearchLoading(true)
    setContentLoading(true)

    Effect.runPromise(getListProgram(key))
      .then((data) => {
        // 成功
        setListData(data)
        console.log('获取成功:', data.length, '条')
        getContent(data[0].id!)
      })
      .catch((error) => {
        // 失败
        console.error('获取列表失败:', error)
      })
      .finally(() => {
        // 结束加载
        setSearchLoading(false)
        setContentLoading(false)
      })
  }, [getContent, setContentLoading, setListData, setSearchLoading])

  return {
    getList
  }
}