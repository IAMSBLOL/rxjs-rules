
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Search, Loader2Icon } from "lucide-react"
import { Button } from '@/components/ui/button'
import { useStore1 } from '@/store/index.store1'

export const SearchHeader = () => {
  const setSearchKey = useStore1((s) => s.setSearchKey)
  const searchAndReload = useStore1((s) => s.searchAndReload)
  const searchLoading = useStore1((s) => s.searchLoading)

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchKey(e.target.value)
  }

  const handleSearch = () => {
    searchAndReload()
  }
  return (
    <div className="px-8 py-4">
      <InputGroup>
        <InputGroupInput placeholder="Search..." onChange={handleInput} />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">

          <Button size="sm" onClick={handleSearch}>
            查询
            {
              searchLoading && <Loader2Icon className=" animate-spin" />
            }
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}