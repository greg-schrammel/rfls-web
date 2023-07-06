export function TicketPrice() {
  return (
    <div className="flex gap-2 flex-col min-w-64 w-72">
      <div className="flex flex-col">
        <span className="font-semibold">Ticket Price</span>
        <span className="text-sm text-gray-500">Price of each participation ticket</span>
      </div>
      <div className="flex justify-between gap-1 p-1 pl-2 rounded-xl border-dashed border h-9 border-gray-300 w-48 bg-gray-200">
        <input className="bg-transparent border-none outline-none caret-gray-400 w-24" />

        <div className="flex bg-blue-500/10 text-sm rounded-lg gap-1 px-1.5 py-1 items-center h-full">
          {/*  eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Circle_USDC_Logo.svg/1024px-Circle_USDC_Logo.svg.png"
            alt="usdc"
            className="h-4 w-4 object-cover bg-blue-500 rounded-full"
          />
          <span className="text-blue-500 font-medium">USDC</span>
        </div>
      </div>
    </div>
  )
}
