import { useStore2 } from '@/store//demo-2/index.store2'
import { useShallow } from 'zustand/react/shallow'
import { fetchDetails } from '@/services'
import { useCallback } from 'react'

export const useContent = () => {
  const {
    setContentData,
    setContentLoading,
  } = useStore2(
    useShallow(
      (s) => (
        {
          setContentData: s.setContentData,
          setContentLoading: s.setContentLoading,
          currentId: s.currentId
        }
      )
    )
  )

  const fetchDetailsFn = useCallback(async (id?: string) => {
    try {
      setContentLoading(true)
      const res = await fetchDetails({ "id": id || useStore2.getState().currentId })
      setContentData(res)
      setContentLoading(false)
    } catch (e) {
      console.error(e)
      setContentLoading(false)
    }


  }, [
    setContentData,
    setContentLoading,
  ])

  return {
    fetchDetailsFn
  }
}