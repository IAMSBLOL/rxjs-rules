import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { DetailData } from '@/types'

interface Store {
  // state
  currentId: string
  contentLoading: boolean
  contentData?: DetailData,

  // actions
  setCurrentId: (str: string) => void
  setContentLoading: (str: boolean) => void
  setContentData: (data: DetailData) => void
}

export const useStore2 = create<Store>()(
  immer(
    (set) => {
      return {
        currentId: '',
        contentLoading: false,
        contentData: undefined,
        //
        setCurrentId: (id) => {
          set((state) => {
            state.currentId = id
          })
        },
        setContentLoading: (loading) => {
          set((state) => {
            state.contentLoading = loading
          })
        },
        setContentData: (data) => {
          set((state) => {
            state.contentData = data
          })
        },
      }
    },
  ),
)
