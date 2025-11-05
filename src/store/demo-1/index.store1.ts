import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import { fetchList } from '@/services'
import type { ListData } from '@/types'
import { isArray, isNil } from 'lodash-es'
import { useStore2 } from './index.store2'

interface Store {
  // state
  searchKey: string
  searchLoading: boolean
  listData?: ListData[],
  // actions
  setSearchKey: (str: string) => void
  setSearchLoading: (str: boolean) => void
  searchAndReload: () => void
}

export const useStore1 = create<Store>()(
  immer(
    (set, get) => {
      return {
        // demo-1
        searchKey: '',
        searchLoading: false,
        listData: [],
        // demo-2

        // demo-3
        // 通用
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

        // 头部请求逻辑，获取列表，初始化第一个数据项，并且初始化完后再停止loading、动画
        // async 副作用
        searchAndReload: async () => {
          try {
            const searchKey = get().searchKey
            // 可以把部分设置状态的逻辑写在按钮点击事件，但是同样不友好，假如有很多按钮点击都可以触发逻辑呢？
            useStore2.getState().setContentLoading(true)

            set((state) => {
              state.searchLoading = true
            })
            const listRes = await fetchList({ searchKey: searchKey })

            if (isArray(listRes)) {
              set((state) => {
                state.listData = listRes
              })
              const first = listRes[0]
              if (!isNil(first)) {
                // 初始化第一个
                const { id } = first
                // 问题：
                // 1、fetchDetails的逻辑写在这个store-1 ？
                // 2、从store-2引入使用fetchDetails ？

                // 如果 fetchDetails 的逻辑非常复杂呢？写在store-1有两个问题：
                // 1、代码逻辑冗余，store-2的状态修改依然要用store-2.getState().xxxx修改
                // 2、单独使用fetchDetails刷新和选择不同的item怎么办，代码复用性、可读性非常差

                // 如果写在store-2，也有问题
                // 1、store-1-searchLoading设置也需要store-1.getState().xxxx修改，回调当然也行，但应该杜绝回调
                // 2、那么存在store交叉调用，显然不是个好的实践方式。
                

                useStore2.getState().fetchDetailsAction(id as string)
              }
            }
          } catch (e) {
            console.error(e)
            set((state) => {
              state.searchLoading = false
            })
          }

        }
      }
    },
  ),
)
