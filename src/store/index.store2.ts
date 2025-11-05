import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { fetchDetails } from '../services'
import type { DetailData } from '../types'
import { useStore1 } from './index.store1'

interface Store {
  // state
  currentId: string
  contentLoading: boolean
  contentData?: DetailData,
  // actions
  setCurrentId: (str: string) => void
  setContentLoading: (str: boolean) => void
  fetchDetailsAction: (id: string) => void
}

export const useStore2 = create<Store>()(
  immer(
    (set, get) => {
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

        fetchDetailsAction: async (id: string) => {
          try {
            if (id) {
              get().setCurrentId(id)
            }

            set((state) => {
              state.contentLoading = true
            })
            // 兼容刷新场景，刷新无ID参数
            const detailRes = await fetchDetails({ id: id || get().currentId })

            if (detailRes) {
              set((state) => {
                state.contentData = detailRes
              })
            }
             set((state) => {
              state.contentLoading = false
            })
            useStore1.getState().setSearchLoading(false)
          } catch (e) {
            console.error(e)
            set((state) => {
              state.contentLoading = false
            })
            useStore1.getState().setSearchLoading(false)
          }

        }
      }
    },
  ),
)
