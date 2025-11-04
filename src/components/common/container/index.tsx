interface Props {
  children:React.ReactNode
}

export const Header = (props:Props)=>{
  return (
    <div className="px-2 py-1 text-center">
      {props.children}
    </div>
  )
}