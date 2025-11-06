import { ClosedCaptionIcon } from 'lucide-react'
import { Demo1 } from './components/demo-1'
import { Demo2 } from './components/demo-2'
import { Demo3 } from './components/demo-3'
import { Demo4 } from './components/demo-4'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className='bg-gray-50 w-full h-lvh'>
      <div className=' sticky top-0 h-10 shadow backdrop-blur-md flex items-center gap-2 px-3 z-40'>
        <ClosedCaptionIcon />
        <span className=' font-semibold text-xs'>
          副作用管理探讨例子
        </span>
      </div>
      <pre className='px-10 py-6 text-sm whitespace-pre-wrap'>
        假设场景：<br/>
        1、搜索框输入后，点击查询按钮<br/>
        2、查询后默认选中第一条初始化<br/>

        限定：<br/>
        1、搜索的store必须和详情store拆分，假设搜索是写在layout的固定组件，详情只是某个大的模块
      </pre>
      <div className='grid py-5 sm:grid-cols-2 lg:grid-cols-3 @min-xs:grid-cols-1'>
        <Demo1 />
        <Demo2 />
        <Demo3 />
        <Demo4 />
      </div>
    </div>
  )
}

export default App
