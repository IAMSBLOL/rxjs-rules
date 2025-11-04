
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Fragment } from 'react'

const tags = Array.from({ length: 50 }).map(
  (_, i, a) => `v1.2.0-beta.${a.length - i}`
)

export const List = () => {
  const handleClick = ()=>{
    //
  }
  return (
    <ScrollArea className="h-72 w-full rounded-md border">
      <div className="p-4">
        <h4 className="mb-4 text-sm leading-none font-medium">List</h4>
        {tags.map((tag) => (
          <Fragment key={tag}>
            <div className="py-2 cursor-pointer" onClick={handleClick}>
              <div className="text-sm">{tag}</div>
            </div>
            <Separator />
          </Fragment>

        ))}
      </div>
    </ScrollArea>
  )
}