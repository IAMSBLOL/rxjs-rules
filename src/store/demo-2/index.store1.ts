import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { ListData } from '@/types'

interface Store {
  // state
  searchKey: string
  searchLoading: boolean
  listData?: ListData[],
  // actions
  setSearchKey: (str: string) => void
  setSearchLoading: (str: boolean) => void
  setListData: (list: ListData[]) => void
}

export const useStore1 = create<Store>()(
  immer(
    (set) => {
      return {
        // demo-1
        searchKey: '',
        searchLoading: false,
        listData: [],

        setSearchKey: (str) => {
          set((state) => {
            state.searchKey = str
          })
        },
        setSearchLoading: (str) => {
          set((state) => {
            state.searchLoading = str
          })
        },
        setListData: (data) => {
          set((state) => {
            state.listData = data
          })
        },
      }
    },
  ),
)
