import { fetchDetailsTrigger$ } from '@/store/demo-3/subject'
import { useMemo } from 'react'
import { useSubscription } from 'observable-hooks'
import { fetchDetails } from '@/services'
import { useStore2 } from '@/store/demo-3/index.store2'
import { catchError, debounceTime, EMPTY, from, map, switchMap, tap } from 'rxjs'
import { useShallow } from 'zustand/react/shallow'

export const useContentEpic = () => {
  const {
    setContentLoading,
    setContentData,
    setCurrentId
  } = useStore2(
    useShallow(
      (s) => ({
        setContentData: s.setContentData,
        setContentLoading: s.setContentLoading,
        setCurrentId: s.setCurrentId
      })
    )
  )

  const sub$ = useMemo(
    () => {
      return fetchDetailsTrigger$.pipe(
        tap(() => {
          console.log('262626')
        }),
        debounceTime(100),
        switchMap((id) => {
          setContentLoading(true)
          if(id) {
            setCurrentId(id)
          }
          return from(fetchDetails({ id: id || useStore2.getState().currentId })).pipe(
            map((s) => {
              setContentData(s)
              return s
            }),
            tap({
              "complete": () => {
                setContentLoading(false)
              }
            }),
            catchError(() => {
              setContentLoading(false)
              return EMPTY
            })
          )
        })
      )
    }, [setContentData, setContentLoading, setCurrentId]
  )

  useSubscription(sub$)
}