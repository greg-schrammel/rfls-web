'use client'

import { useBlockNumber } from 'wagmi'

export function DrawDate() {
  const { data } = useBlockNumber()

  return (
    <div className="flex gap-2 flex-col min-w-64 w-72">
      <div className="flex flex-col">
        <span className="font-semibold">Draw time</span>
        <span className="text-sm text-gray-500">
          To be fully onchain the draw happens in a given block, the exact timestamp cannot be
          reliably predicted
        </span>
      </div>
      <div className="flex flex-col gap-0.5 w-full">
        <div className="flex gap-1 p-1 rounded-xl border-dashed border h-9 border-gray-300 w-48 bg-gray-200">
          <div className="flex bg-gray-500/10 text-sm rounded-lg gap-1 px-1.5 py-1 items-center h-full">
            <span className="text-gray-500 font-medium whitespace-nowrap">Block #</span>
          </div>
          <input className="bg-transparent border-none w-full outline-none caret-gray-400" />
        </div>
        <span className="text-gray-500 ml-1 text-xs whitespace-nowrap">
          Current block {data?.toString()}
        </span>
      </div>
    </div>
  )
}
