import type { FetchListData, FetchDetailData, ListData, DetailData } from '../types'

const getListResult = (data: FetchListData) => {
  return Array.from({ length: 10 }).fill('fetchList').map((_o, i) => {
    return {
      ...data,
      id: i + Math.random() + ''
    }
  }) as ListData[]
}

export const fetchList = async (data: FetchListData) => {
  return new Promise<ListData[]>(
    (resolve) => {
      const timer = setTimeout(() => {
        resolve(getListResult(data))
        clearTimeout(timer)
      }, 1000)
    }
  )
}


export const fetchDetails = async (data: FetchDetailData) => {
  return new Promise<DetailData>(
    (resolve) => {
      const timer = setTimeout(() => {
        resolve({
          ...data,
          content: `我是i:${data.id}的最新内容${new Date().getUTCDate()}`
        })
        clearTimeout(timer)
      }, 1000)
    }
  )
}

