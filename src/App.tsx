import { ClosedCaptionIcon } from 'lucide-react'
import { Demo1 } from './components/demo-1'
import { Demo2 } from './components/demo-2'
import { Demo3 } from './components/demo-3'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className='bg-gray-50 w-full h-lvh'>
      <div className=' sticky top-0 h-10 shadow backdrop-blur-md flex items-center gap-2 px-3 z-40'>
        <ClosedCaptionIcon />
        <span className=' font-semibold text-sm'>
          zus & observable-hooks
        </span>
      </div>
      <div className='grid py-5 sm:grid-cols-2 lg:grid-cols-3 @min-xs:grid-cols-1'>
        <Demo1 />
        <Demo2 />
        <Demo3 />
      </div>
    </div>
  )
}

export default App
