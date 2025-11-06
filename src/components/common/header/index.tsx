interface Props {
  children:React.ReactNode
}

export const Header = (props:Props)=>{
  console.log('Header')
  return (
    <div className="px-2 py-1 text-center font-semibold text-sm">
      {props.children}
    </div>
  )
}