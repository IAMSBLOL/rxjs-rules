import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'


interface Store {
  // state
  searchKey: string
  // actions
  setSearchKey: (str: string) => void
}

export const store1 = create<Store>()(
  immer(
    (set) => (
      {
        searchKey: '',
        setSearchKey: (str) => {
          set((state) => {
            state.searchKey = str
          })
        },
      }
    ),
  ),
)
