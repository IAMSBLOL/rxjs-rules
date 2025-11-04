import type { FetchListData,FetchDetailData } from '../types'

const getListResult = (data: FetchListData) => {
  return Array.from({ length: 10 }).fill('fetchList').map((_o, i) => {
    return {
      ...data,
      id: i + Math.random()
    }
  })
}

export const fetchList = async (data: FetchListData) => {
  return new Promise(
    (resolve) => {
      const timer = setTimeout(() => {
        resolve(getListResult(data))
        clearTimeout(timer)
      }, 1000)
    }
  )
}


export const fetchDetails = async (data: FetchDetailData) => {
  return new Promise(
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

