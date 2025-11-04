import { ClosedCaptionIcon } from 'lucide-react'
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className='bg-yellow-50 w-full h-lvh'>
      <div className=' sticky top-0 h-10 shadow-xl backdrop-blur-2xl flex items-center gap-2 px-3'>
        <ClosedCaptionIcon />
        <span className=' font-semibold text-sm'>
          zus-observable-hooks
        </span>
      </div>
      <div className='grid grid-cols-3 py-5'>
        <div>
          1231
        </div>
        <div>
          12
        </div>
        <div>
          123
        </div>
      </div>
    </div>
  )
}

export default App
