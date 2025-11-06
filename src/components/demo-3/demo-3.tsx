import { List, Description, Header, Container, ListItemContent } from '../common'
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
  useContentEpic()

  const contentData = useStore2((s) => s.contentData)
  const contentLoading = useStore2((s) => s.contentLoading)

  const handleReflesh = () => {
    fetchDetailsTrigger$.next()
  }

  return (
    <ListItemContent data={contentData} loading={contentLoading} onReflesh={handleReflesh} />
  )
}

export const Demo3 = () => {
  useListEpic()
  console.log('Demo3')
  return (
    <Container>
      <Header>Demo-3:observable-hooks</Header>
      <Description>
        优点是，逻辑内聚（组件颗粒度可以非常小），无额外状态、内存开销，复用性极强。缺点是需要引入rxjs订阅。
      </Description>
      <Demo3SearchHeader />
      <Demo3List />
      <Demo3ListItemContent />
    </Container>
  )
}