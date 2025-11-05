
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Fragment } from 'react'
import { useStore1 } from '@/store/index.store1'


export const List = () => {
  const listData = useStore1((s) => (s.listData))
  const handleClick = () => {
    //
  }
  return (
    <ScrollArea className="h-72 w-full rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">List</h4>
        {listData?.map((tag) => (
          <Fragment key={tag.id}>
            <div className="py-2 cursor-pointer" onClick={handleClick}>
              <div className="text-sm text-gray-800">{tag.id}{tag.searchKey}</div>
            </div>
            <Separator />
          </Fragment>

        ))}
      </div>
    </ScrollArea>
  )
}