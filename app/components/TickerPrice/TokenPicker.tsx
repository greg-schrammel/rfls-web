'use client'

import { truncateAddress } from '@/app/utils/truncateAddress'
import { Cross2Icon } from '@radix-ui/react-icons'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode, useState } from 'react'
import { cn } from '../../utils/cn'
import { BottomSheet, Sheet, SheetClose, SheetTrigger } from '../Sheet'

const TokenList = ({ onSelect }: { onSelect: (t: string) => void }) => {
  // return (
  //   <AnimatePresence>
  //     {Array.from({ length: 12 }).map((_, i) => (
  //       <motion.div
  //         initial={{ opacity: 1, scale: 1 }}
  //         exit={{ opacity: 0, scale: 0.9 }}
  //         key={`token picker skeleton #${i}`}
  //         className={cn(`w-full py-2 rounded-xl transition-all flex items-center gap-2`)}
  //       >
  //         <div className="h-10 w-10 aspect-square rounded-full bg-gray-200 animate-pulse" />
  //         <div className="flex flex-col gap-2 w-full">
  //           <div className="flex justify-between">
  //             <span className="h-4 w-32 rounded-md bg-gray-200 animate-pulse" />
  //             <span className="h-4 w-20 rounded-md bg-gray-200 animate-pulse" />
  //           </div>
  //           <div className="flex">
  //             <span className="h-4 w-24 rounded-md bg-gray-200 animate-pulse" />
  //           </div>
  //         </div>
  //       </motion.div>
  //     ))}
  //   </AnimatePresence>
  // )

  return (
    <AnimatePresence>
      <div className="flex justify-between gap-1 p-1 pl-2 rounded-xl border border-gray-200 w-52 bg-gray-100">
        <input className="bg-transparent border-none outline-none" />
      </div>
      <div className="gap-3 grid grid-cols-2">
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            initial={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            key={`token picker skeleton #${i}`}
            className={cn(`w-full py-2 rounded-xl transition-all flex items-center gap-2`)}
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Circle_USDC_Logo.svg/1024px-Circle_USDC_Logo.svg.png"
              alt="usdc"
              className="h-8 w-8 object-cover bg-blue-600 rounded-full"
            />
            <div className="flex flex-col w-full">
              <div className="flex justify-between">
                <span className="text-blue-500 font-bold text-sm uppercase">USDC</span>
              </div>
              <div className="flex">
                <span className="text-gray-500 text-xs">
                  {truncateAddress('0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48')}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </AnimatePresence>
  )
}

export function _TokenPicker({ onConfirm }: { onConfirm: (s: string) => void }) {
  return (
    <div className="mx-1 flex gap-8 flex-col items-center rounded-3xl relative bg-gray-50 shadow-xl shadow-gray-200 overflow-hidden">
      <div className="flex flex-col bg-gray-50/80 backdrop-blur-md absolute top-0 inset-x-0 p-5 z-10 rounded-2xl">
        <span className="font-semibold">Ticket token</span>
        <span className="text-sm text-gray-500">
          Select the token the raffle tickets will be sold in
        </span>
      </div>

      <div className="h-[80vh] w-full flex flex-col gap-2 rounded-2xl overflow-scroll py-24 px-4">
        <TokenList onSelect={onConfirm} />
      </div>
    </div>
  )
}

export function TokenPicker({
  trigger,
  onConfirm,
  selected,
}: {
  trigger: ReactNode
  onConfirm: (s: string) => void
  selected: string
}) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <BottomSheet className="max-w-sm">
        <div className="relative">
          <SheetClose className="absolute hover:bg-gray-200/80 transition-all hover:scale-105 cursor-default z-50 right-4 top-3 bg-gray-200/50 backdrop-blur-md rounded-full p-2">
            <Cross2Icon className="h-4 w-4 text-gray-500" />
          </SheetClose>
          <_TokenPicker onConfirm={(s) => (onConfirm(s), setOpen(false))} />
        </div>
      </BottomSheet>
    </Sheet>
  )
}
