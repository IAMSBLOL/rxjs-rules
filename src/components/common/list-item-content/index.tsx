
import { Button } from '@/components/ui/button'
import type { DetailData } from '@/types'
import { Loader } from 'lucide-react'

interface Props {
  data?: DetailData
  onReflesh?: () => void
  loading?: boolean
}

export const ListItemContent = (props: Props) => {
  const { onReflesh, data, loading } = props

  return (
    <div className="p-4 border relative my-3">
      <div>
        详情：
        {
          data?.id
        }
      </div>

      <div className="relative bg-white/3 backdrop-blur-[2px] rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] p-6">
        {
          data?.content
        }
      </div>
      <Button
        className='w-full cursor-pointer'
        onClick={onReflesh}
        disabled={!data?.id}
      >
        刷新
        {
          loading && (
            <Loader className=' animate-spin' />
          )
        }
      </Button>
    </div>
  )
}