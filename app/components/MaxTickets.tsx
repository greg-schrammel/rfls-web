export function MaxTickets() {
  return (
    <div className="flex gap-2 flex-col min-w-64 w-72">
      <div className="flex flex-col">
        <span className="font-semibold">Max Tickets</span>
        <span className="text-sm text-gray-500">
          Put a cap in how many tickets can be sold, this guarantees each ticket will have a set
          chance of winning
        </span>
      </div>
      <div className="flex gap-1 w-full peer">
        <button className="flex peer-hover:opacity-60 hover:scale-[1.02] hover:opacity-100 cursor-default bg-gray-200 text-sm rounded-xl p-2 py-1 items-center h-full">
          <span className="font-medium">Unlimited</span>
        </button>
        <button className="flex peer hover:scale-[1.02] hover:opacity-100 bg-gray-200 cursor-default text-sm rounded-xl p-2 py-1 items-center h-full opacity-60">
          <span className="font-medium ">Capped</span>
        </button>
      </div>
    </div>
  )
}
