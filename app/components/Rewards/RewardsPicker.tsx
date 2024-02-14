'use client'

import { Cross2Icon } from '@radix-ui/react-icons'
import { AnimatePresence, motion } from 'framer-motion'
import { ReactNode, useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useAccount } from 'wagmi'
import { useStateWithHistory } from '../../hooks/useStateWithHistory'
import { cn } from '../../utils/cn'
import { BottomSheet, Sheet, SheetClose, SheetTrigger } from '../Sheet'
import { useAccountNFTs } from './useAccountNfts'

const NFTList = ({
  onSelect,
  selected,
}: {
  onSelect: (u: (p: string[]) => string[]) => void
  selected: string[]
}) => {
  const { address: account } = useAccount()
  const { data: nfts, isFetching, refetch } = useAccountNFTs({ chain: 'eth-mainnet', account })

  const lastIndex = useRef<number>(0)

  if (isFetching)
    return (
      <div className="gap-3 grid grid-cols-2 md:grid-cols-3">
        <AnimatePresence>
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              initial={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              key={`reward picker skeleton #${i}`}
              className={cn(
                `bg-gray-200 h-auto w-full aspect-square rounded-2xl transition-all animate-pulse`,
              )}
            />
          ))}
        </AnimatePresence>
      </div>
    )

  if (!nfts?.length)
    return (
      <div className="flex flex-col justify-center items-center rounded-xl shadow-gray-300/30 bg-slate-100 h-full w-full">
        <span className="px-4 py-2  text-gray-500 text-center text-sm ">
          {`Couldn't`} find any NFT in this account <span className="text-xl align-middle">😕</span>
        </span>
        {/* <button
          onClick={() => refetch()}
          className="flex hover:scale-[1.02] transition-all hover:bg-gray-200 active:scale-95 hover:opacity-100 cursor-default font-medium text-sm rounded-xl px-2.5 py-1 items-center opacity-60"
        >
          <span className="font-medium ">Try again</span>
        </button> */}
      </div>
    )

  const selectMultiple = (from: number, to: number, value: boolean) =>
    onSelect((s) => {
      let [_from, _to] = [from, to + 1]
      if (from > to) [_from, _to] = [to, from]
      let newSelection = [...s]
      nfts
        .slice(_from, _to)
        .forEach(({ id }) =>
          value ? newSelection.push(id) : (newSelection = newSelection.filter((_id) => _id !== id)),
        )
      return [...new Set(newSelection)]
    })

  return (
    <div className="gap-3 grid grid-cols-2 md:grid-cols-3">
      {nfts.map(({ image_256, id }, i) => {
        const isSelected = selected.includes(id)
        return (
          <motion.div
            key={id}
            aria-selected={isSelected}
            className="transition-all group rounded-2xl ring-gray-950 aria-selected:ring-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: isSelected ? 0.9 : 1 }}
          >
            <motion.img
              draggable={false}
              src={image_256}
              onPointerEnter={(e) => {
                // if (e.pressure > 0) selectMultiple(lastIndex.current, i, !selected[image])
              }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.9 }}
              onPointerUp={(e) => {
                if (e.shiftKey)
                  selectMultiple(
                    lastIndex.current,
                    i,
                    selected.includes(nfts[lastIndex.current].id),
                  )
                else onSelect((s) => (isSelected ? s.filter((i) => i != id) : [...s, id]))
                lastIndex.current = i
              }}
              className={cn(
                `h-auto w-full aspect-square rounded-2xl transition-all object-cover`,
                isSelected && 'opacity-60',
              )}
            />
          </motion.div>
        )
      })}
    </div>
  )
}

const cap = (n: number, max: number) => (n > max ? max : n)
const ConfirmSelection = ({
  selected,
  onConfirm,
}: {
  selected: string[]
  onConfirm: VoidFunction
}) => {
  const { address: account } = useAccount()
  const { data: nfts } = useAccountNFTs({ chain: 'eth-mainnet', account })

  const selectedNfts = selected.map((id) => nfts?.find((nft) => nft.id === id)).filter(Boolean)

  return (
    <AnimatePresence>
      {selectedNfts.length > 0 && (
        <motion.div
          animate={{ opacity: 0, scale: 0, y: 50 }}
          initial={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 50 }}
          className="flex flex-row-reverse shadow-lg shadow-gray-500/10 justify-between items-center bg-neutral-50/90 backdrop-blur-md absolute bottom-3 inset-x-3 p-2 z-10 rounded-2xl"
        >
          <button
            onClick={onConfirm}
            className="px-4 cursor-default active:scale-[.98] hover:scale-[1.02] transition-all py-2 z-10 text-sm whitespace-nowrap bg-black rounded-xl text-white font-semibold"
          >
            Select Rewards
          </button>
          {!!selectedNfts?.length && (
            <div className="flex items-center relative">
              <AnimatePresence mode="popLayout">
                {selectedNfts.map(({ image_256, id }, i) => (
                  <motion.img
                    key={id}
                    src={image_256}
                    initial={{ y: 20, opacity: 0, rotate: 40 }}
                    animate={{ y: 0, opacity: 1, rotate: 0 }}
                    exit={{ y: 20, opacity: 0, rotate: 40 }}
                    transition={{ duration: 0.2 }}
                    style={{ zIndex: i, x: 5 * i }}
                    className={cn(
                      `h-8 w-8 object-cover rounded-lg transition-all shadow-md absolute`,
                    )}
                  />
                ))}
                <motion.span
                  layout="position"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ x: cap(selectedNfts.length * 5 + 32, 50), zIndex: 1000 }}
                  className="text-xs ml-3 whitespace-nowrap text-gray-500 px-2 py-1 rounded-md bg-gray-50"
                >
                  {selected.length} selected
                </motion.span>
              </AnimatePresence>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function _RewardsPicker({
  onConfirm,
  initialSelected,
}: {
  onConfirm: (s: string[]) => void
  initialSelected: string[]
}) {
  const [selected, setSelected, undo, redo] = useStateWithHistory<string[]>(initialSelected || [])

  useHotkeys('meta+z', () => undo(), { preventDefault: true })
  useHotkeys('shift+meta+z', () => redo(), { preventDefault: true })

  return (
    <div className="mx-1 flex gap-8 flex-col items-center rounded-3xl relative bg-gray-50 shadow-xl shadow-gray-200 overflow-hidden">
      <div className="flex flex-col bg-gray-50/80 backdrop-blur-md absolute top-0 inset-x-0 p-5 z-10 rounded-2xl">
        <span className="font-semibold">Pick Rewards</span>
        <span className="text-sm text-gray-500">
          Select as many tokens and NFTs you wish to raffle
        </span>
      </div>

      <div className="justify-center h-[80vh] w-full rounded-2xl overflow-scroll py-24 px-4">
        <NFTList onSelect={setSelected} selected={selected} />
      </div>

      <ConfirmSelection selected={selected} onConfirm={() => onConfirm(selected)} />
    </div>
  )
}

export function RewardsPicker({
  trigger,
  onConfirm,
  selected,
}: {
  trigger: ReactNode
  onConfirm: (s: string[]) => void
  selected: string[]
}) {
  const [open, setOpen] = useState(false)

  return (
    <Sheet onOpenChange={setOpen} open={open}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <BottomSheet className="max-w-[536px]">
        <div className="relative">
          <SheetClose className="absolute hover:bg-gray-200/80 transition-all hover:scale-105 cursor-default z-50 right-4 top-3 bg-gray-200/50 backdrop-blur-md rounded-full p-2">
            <Cross2Icon className="h-4 w-4 text-gray-500" />
          </SheetClose>
          <_RewardsPicker
            initialSelected={selected}
            onConfirm={(s) => (onConfirm(s), setOpen(false))}
          />
        </div>
      </BottomSheet>
    </Sheet>
  )
}
