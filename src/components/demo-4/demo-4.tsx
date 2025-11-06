import { List, Description, Header, Container, ListItemContent } from '../common'
import { useStore1 } from '@/store/demo-4/index.store1'
import { useStore2 } from '@/store/demo-4/index.store2'

import { useList } from './effect-hooks/use-list.effect'
import { useContent } from './effect-hooks/use-content.effect'
import { SearchHeader } from '@/components/search'

import type { ListData } from '@/types'

const Demo4SearchHeader = () => {
  const setSearchKey = useStore1((s) => s.setSearchKey)
  const searchLoading = useStore1((s) => s.searchLoading)
  const searchKey = useStore1((s) => s.searchKey)

  const { getList } = useList()

  const handleSearch = () => {
    getList(searchKey)
  }
  return (
    <SearchHeader loading={searchLoading} onInput={setSearchKey} onSearch={handleSearch} />
  )
}

const Demo4List = () => {

  const listData = useStore1((s) => (s.listData))
  const setCurrentId = useStore2((s) => s.setCurrentId)
  const currentId = useStore2((s) => s.currentId)
  const { getContent } = useContent()
  const handleSelect = (data: ListData) => {
    setCurrentId(data.id!)
    // fetchDetailsTrigger$.next(data.id)
    getContent(data.id!)
  }

  return (
    <List
      data={listData!}
      activeId={currentId}
      onSelect={handleSelect}
    />
  )
}

const Demo4ListItemContent = () => {
  const { getContent } = useContent()

  const contentData = useStore2((s) => s.contentData)
  const contentLoading = useStore2((s) => s.contentLoading)

  const handleReflesh = () => {
    // fetchDetailsTrigger$.next()
    getContent()
  }

  return (
    <ListItemContent data={contentData} loading={contentLoading} onReflesh={handleReflesh} />
  )
}

const EpicHooks = () => {
  // useListEpic()
  // useContentEpic()
  return null
}

export const Demo4 = () => {
  // useListEpic()
  console.log('Demo4')
  return (
    <Container>
      <EpicHooks />
      <Header>Demo-4:effect ts</Header>
      <Description>
        函数式+描述业务，通过run-xxx驱动业务蓝图，而且比demo-3的约束更强。但是很遗憾的是，它是自带体系的，针对数据处理确实非常棒。
        但在浏览器环境中难以发挥实力。并且门槛比方案3高。编程思维需要改变，团队协作是个问题。
      </Description>
      <Demo4SearchHeader />
      <Demo4List />
      <Demo4ListItemContent />
    </Container>
  )
}