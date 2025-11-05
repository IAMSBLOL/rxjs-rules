import { List, Description, Header, Container, ListItemContent } from '../common'
import { useStore1 } from '@/store/index.store1'
import { SearchHeader } from '@/components/search'

export const Demo3 = () => {
  const listData = useStore1((s) => (s.listData))
  return (
    <Container>
      <Header>Demo-3:observable-hooks</Header>
      <Description>
        优点是，逻辑内聚（组件颗粒度可以非常小），无额外状态、内存开销，复用性极强。缺点是需要引入rxjs订阅。
      </Description>
      <SearchHeader />
      <List data={listData!} />
      <ListItemContent />
    </Container>
  )
}