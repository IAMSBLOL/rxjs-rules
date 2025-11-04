export const ListItemContent = () => {
  return (
    <div className="relative">

      <div className="absolute inset-0 bg-linear-to-br from-cyan-500/10 to-blue-500/10 rounded-3xl blur-2xl"></div>


      <div className="relative bg-white/3 backdrop-blur-[2px] rounded-2xl border border-white/10 shadow-[0_8px_32px_0_rgba(255,255,255,0.1)] p-6">
        内容
      </div>
    </div>
  )
}