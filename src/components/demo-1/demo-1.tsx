
import { List, Header, Container, ListItemContent } from '../common'
import { useStore1 } from '@/store/demo-1/index.store1'
import { useStore2 } from '@/store//demo-1/index.store2'
import { SearchHeader } from '@/components/search'
import type { ListData } from '@/types'

const Demo1SearchHeader = () => {
  const setSearchKey = useStore1((s) => s.setSearchKey)
  const searchLoading = useStore1((s) => s.searchLoading)
  const searchAndReload = useStore1((s) => s.searchAndReload)

  return (
    <SearchHeader loading={searchLoading} onInput={setSearchKey} onSearch={searchAndReload} />
  )
}

const Demo1List = () => {
  const listData = useStore1((s) => (s.listData))
  const setCurrentId = useStore2((s) => s.setCurrentId)
  const fetchDetailsAction = useStore2((s) => s.fetchDetailsAction)
  const currentId = useStore2((s) => s.currentId)

  const handleSelect = (data: ListData) => {
    setCurrentId(data.id!)
    fetchDetailsAction(data.id!)
  }
  return (
    <List
      data={listData!}
      onSelect={handleSelect}
      activeId={currentId}
    />
  )
}

const Demo1ListItemContent = () => {
  const contentData = useStore2((s) => s.contentData)
  const contentLoading = useStore2((s) => s.contentLoading)
  const fetchDetailsAction = useStore2((s) => s.fetchDetailsAction)

  const handleReflesh = () => {
    fetchDetailsAction()
    console.log(2424)
  }
  return (
    <ListItemContent data={contentData} loading={contentLoading} onReflesh={handleReflesh} />
  )
}

export const Demo1 = () => {
  return (
    <Container>
      <Header>Demo-1:all in store</Header>
      <Demo1SearchHeader />
      <Demo1List />
      <Demo1ListItemContent />
    </Container>
  )
}