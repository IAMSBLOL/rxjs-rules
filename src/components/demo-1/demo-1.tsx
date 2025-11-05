
import { List, Description, Header, Container, ListItemContent } from '../common'

export const Demo1 = () => {
  return (
    <Container>
      <Header>Demo-1:all in store</Header>
      <Description>
        异步逻辑全部all in store, 即使拆分slice、action。
        优点是无额外内存开销。缺点是跨组件、store时，逻辑会非常冗余，并且异步逻辑无法复用。
      </Description>
      <List />
      <ListItemContent />
    </Container>
  )
}