import { fetchListTrigger$, fetchDetailsTrigger$ } from '@/store/demo-3/subject'
import { useStore1 } from '@/store/demo-3/index.store1'
import { useStore2 } from '@/store/demo-3/index.store2'
import { fetchList } from '@/services'
import { from, map, withLatestFrom, debounceTime, catchError, startWith, endWith, of, switchMap, } from 'rxjs'
import type { Observable } from 'rxjs'
import { useShallow } from 'zustand/react/shallow'
import { useSubscription, useObservable } from 'observable-hooks'
import { useMemo } from 'react'
import type { ListData } from '@/types'

type FetchAction =
  | { type: "success"; payload: ListData[] }
  | { type: "start-fetch" }
  | { type: "end-fetch" }
  | { type: "error-fetch" }

export const useListEpic = () => {
  const {
    setListData,
    setSearchLoading,
    searchKey
  } = useStore1(
    useShallow(
      (s) => ({
        setListData: s.setListData,
        setSearchLoading: s.setSearchLoading,
        searchKey: s.searchKey
      })
    )
  )

  const obDeps$ = useObservable((input$) => {
    return input$.pipe(
      map(([s]) => s)
    )
  }, [searchKey])

  const sub$ = useMemo(() => {
    return fetchListTrigger$.pipe(
      debounceTime(200),
      withLatestFrom(obDeps$),
      switchMap(([s, obDpes]) => {
        return from(fetchList({ searchKey: s || obDpes })).pipe(
          map((s): FetchAction => {
            if (s[0]) {
              fetchDetailsTrigger$.next(s[0].id)
            }

            return {
              type: "success",
              payload: s
            }
          }),

          startWith<FetchAction>({
            type: "start-fetch",
          }),
          endWith<FetchAction>({
            type: "end-fetch",
          }),
          catchError((): Observable<FetchAction> => {
            return of({
              type: "error-fetch",
            })
          })
        )
      })
    )
  }, [obDeps$])

  useSubscription(
    sub$,
    (data) => {
      if (data.type === 'success') {
        setListData(data.payload!)
      }

      if (data.type === 'start-fetch') {
        setSearchLoading(true)
        useStore2.getState().setContentLoading(true)
      }

      if (data.type === 'end-fetch') {
        setSearchLoading(false)
      }

      if (data.type === "error-fetch") {
        setSearchLoading(false)
      }
    }
  )
}