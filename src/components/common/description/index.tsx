interface Props {
  children:React.ReactNode
}

export const Description = (props:Props)=>{
  return (
    <div className="px-8 py-3 text-xs text-gray-500">
      {props.children}
    </div>
  )
}