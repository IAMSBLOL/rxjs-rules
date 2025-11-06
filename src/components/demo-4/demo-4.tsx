import { List, Header, Container, ListItemContent } from '../common'
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
      <Demo4SearchHeader />
      <Demo4List />
      <Demo4ListItemContent />
    </Container>
  )
}