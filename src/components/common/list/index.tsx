
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Fragment } from 'react'

import type { ListData } from '@/types'
import { cn } from "@/lib/utils"
interface Props {
  data: ListData[]
  activeId?: string
  onSelect?: (d: ListData) => void
}
export const List = (props: Props) => {
  const { data, activeId, onSelect } = props


  return (
    <ScrollArea className="h-72 w-full rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">List</h4>
        {data?.map((tag) => (
          <Fragment key={tag.id}>
            <div
              className={
                cn(
                  "py-2 cursor-pointer text-gray-800",
                  {
                    "text-blue-500": activeId === tag.id
                  }
                )
              }
              onClick={() => onSelect?.(tag)}>
              <div className="text-sm">{tag.id}{tag.searchKey}</div>
            </div>
            <Separator />
          </Fragment>

        ))}
      </div>
    </ScrollArea>
  )
}