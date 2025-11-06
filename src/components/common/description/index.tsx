interface Props {
  children:React.ReactNode
}

export const Description = (props:Props)=>{
  return (
    <pre className="px-8 py-3 text-xs text-gray-500 whitespace-pre-wrap">
      {props.children}
    </pre>
  )
}