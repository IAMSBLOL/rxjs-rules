
import { useStore1 } from '@/store/demo-2/index.store1'

import { fetchList } from '@/services'
import { useCallback } from 'react'
import { useShallow } from 'zustand/react/shallow'
import { useContent } from './use-content'

export const useList = () => {
  const {
    setSearchLoading,
    setListData
  } = useStore1(
    useShallow(
      (s) => (
        {
          setSearchLoading: s.setSearchLoading,
          searchKey: s.searchKey,
          setListData: s.setListData,
        }
      )
    )
  )

  const { fetchDetailsFn } = useContent()

  const fetchListFn = useCallback(async (str?: string) => {
    try {
      setSearchLoading(true)
      const res = await fetchList({ searchKey: str || useStore1.getState().searchKey })
      setListData(res)
      if (res[0]) {
        await fetchDetailsFn(res[0].id)
      }
      setSearchLoading(false)
    } catch (e) {
      console.log(e)
      setSearchLoading(false)
    }
  }, [
    setSearchLoading,
    setListData,
    fetchDetailsFn
  ])

  return {
    fetchListFn
  }
}