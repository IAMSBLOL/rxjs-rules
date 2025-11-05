import { List, Description, Header, Container, ListItemContent } from '../common'

export const Demo2 = () => {
  return (
    <Container>
      <Header>Demo-2:Hooks</Header>
      <Description>
        优点是可复用，逻辑内聚在组件内，缺点是跨组件调用时，带来非必要的状态变更和内存开销，一旦逻辑足够复杂，依然不可避免走向demo-1的弊端。
      </Description>
      <List/>
      <ListItemContent />
    </Container>
  )
}