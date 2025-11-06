import { List, Header, Container, ListItemContent } from '../common'
import { useStore1 } from '@/store/demo-3/index.store1'
import { useStore2 } from '@/store/demo-3/index.store2'
import { fetchListTrigger$, fetchDetailsTrigger$ } from '@/store/demo-3/subject'
import { SearchHeader } from '@/components/search'
import { useListEpic } from './epic-hooks/use-list-epic'
import { useContentEpic } from './epic-hooks/use-content-epic'
import type { ListData } from '@/types'

const Demo3SearchHeader = () => {
  const setSearchKey = useStore1((s) => s.setSearchKey)
  const searchLoading = useStore1((s) => s.searchLoading)

  const handleSearch = () => {
    fetchListTrigger$.next()
  }
  return (
    <SearchHeader loading={searchLoading} onInput={setSearchKey} onSearch={handleSearch} />
  )
}

const Demo3List = () => {

  const listData = useStore1((s) => (s.listData))
  const setCurrentId = useStore2((s) => s.setCurrentId)
  const currentId = useStore2((s) => s.currentId)
  const handleSelect = (data: ListData) => {
    setCurrentId(data.id!)
    fetchDetailsTrigger$.next(data.id)
  }

  return (
    <List
      data={listData!}
      activeId={currentId}
      onSelect={handleSelect}
    />
  )
}

const Demo3ListItemContent = () => {


  const contentData = useStore2((s) => s.contentData)
  const contentLoading = useStore2((s) => s.contentLoading)

  const handleReflesh = () => {
    fetchDetailsTrigger$.next()
  }

  return (
    <ListItemContent data={contentData} loading={contentLoading} onReflesh={handleReflesh} />
  )
}

const EpicHooks = () => {
  useListEpic()
  useContentEpic()
  return null
}

export const Demo3 = () => {
  // useListEpic()
  console.log('Demo3')
  return (
    <Container>
      <EpicHooks />
      <Header>Demo-3:observable-hooks</Header>

      <Demo3SearchHeader />
      <Demo3List />
      <Demo3ListItemContent />
    </Container>
  )
}