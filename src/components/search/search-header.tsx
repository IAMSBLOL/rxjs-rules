
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Search, Loader2Icon } from "lucide-react"
import { Button } from '@/components/ui/button'


interface Props {
  onSearch?: () => void
  onInput?: (s: string) => void
  loading?: boolean
}

export const SearchHeader = (props: Props) => {
  const { onSearch, onInput, loading } = props


  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    onInput?.(e.target.value)
  }

  const handleSearch = () => {
    onSearch?.()
  }
  return (
    <div className="py-4">
      <InputGroup>
        <InputGroupInput placeholder="Search..." onChange={handleInput} />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">

          <Button size="sm" onClick={handleSearch}>
            查询
            {
              loading && <Loader2Icon className=" animate-spin" />
            }
          </Button>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}