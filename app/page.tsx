'use client'

import { useHotkeys } from 'react-hotkeys-hook'
import { DrawDate } from './components/DrawDate'
import { MaxTickets } from './components/MaxTickets'
import { Rewards } from './components/Rewards/Rewards'
import { TicketPrice } from './components/TickerPrice/TicketPrice'

export default function Home() {
  useHotkeys('meta+s', () => null, { preventDefault: true })
  return (
    <main className="flex flex-col items-center justify-center p-4 gap-2">
      <div className="fixed top-4 left-6 text-xl">
        <span>🎟️ 🎉 ✨</span>
      </div>
      <h1 className="text-2xl font-bold">Create Raffle</h1>
      <div className="h-[1px] w-[400px] bg-gray-200 mb-8" />

      <div className="flex gap-8 max-w-4xl flex-wrap">
        <div className="flex flex-col gap-4">
          <TicketPrice />
          <MaxTickets />
          <DrawDate />
        </div>
        <div className="flex flex-col gap-4">
          <Rewards />
        </div>
      </div>
    </main>
  )
}
