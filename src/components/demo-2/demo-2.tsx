import { List, Header, Container, ListItemContent } from '../common'
import { useStore1 } from '@/store/demo-2/index.store1'
import { useStore2 } from '@/store/demo-2/index.store2'
import { SearchHeader } from '@/components/search'
import { useList } from './hooks/use-list'
import { useContent } from './hooks/use-content'
import type { ListData } from '@/types'

const Demo2SearchHeader = () => {
  const setSearchKey = useStore1((s) => s.setSearchKey)
  const searchLoading = useStore1((s) => s.searchLoading)
  const { fetchListFn } = useList()
  return (
    <SearchHeader loading={searchLoading} onInput={setSearchKey} onSearch={fetchListFn} />
  )
}

const Demo2List = () => {
  const listData = useStore1((s) => (s.listData))
  const setCurrentId = useStore2((s) => s.setCurrentId)
  const currentId = useStore2((s) => s.currentId)

  const { fetchDetailsFn } = useContent()

  const handleSelect = (data: ListData) => {
    setCurrentId(data.id!)
    fetchDetailsFn(data.id!)
  }
  return (
    <List
      data={listData!}
      onSelect={handleSelect}
      activeId={currentId}
    />
  )
}

const Demo2ListItemContent = () => {
  const contentData = useStore2((s) => s.contentData)
  const contentLoading = useStore2((s) => s.contentLoading)
  const { fetchDetailsFn } = useContent()

  const handleReflesh = () => {
    fetchDetailsFn()
  }
  return (
    <ListItemContent data={contentData} loading={contentLoading} onReflesh={handleReflesh} />
  )
}

export const Demo2 = () => {

   useContent()
   console.log('Demo2')

  return (
    <Container>
      <Header>Demo-2: React Hooks</Header>
      <Demo2SearchHeader />
      <Demo2List />
      <Demo2ListItemContent />
    </Container>
  )
}