
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Search, Loader2Icon } from "lucide-react"

export const SearchHeader = () => {
  return (
    <div className="px-8 py-4">
      <InputGroup>
        <InputGroupInput placeholder="Search..." />
        <InputGroupAddon>
          <Search />
        </InputGroupAddon>
        <InputGroupAddon align="inline-end">
          <Loader2Icon className=" animate-spin"/>
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}