'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { Cross2Icon } from '@radix-ui/react-icons'
import { AnimatePresence, motion } from 'framer-motion'
import { PropsWithChildren, ReactNode, useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'
import { useAccountNFTs } from '../hooks/useAccountNfts'
import { useStateWithHistory } from '../hooks/useStateWithHistory'
import { cn } from '../utils/cn'

const NFTList = ({
  onSelect,
  selected,
}: {
  onSelect: (u: (p: string[]) => string[]) => void
  selected: string[]
}) => {
  const { data: nfts } = useAccountNFTs({
    chain: 'eth-mainnet',
    account: '0x507F0daA42b215273B8a063B092ff3b6d27767aF',
  })

  const lastIndex = useRef<number>(0)

  if (!nfts)
    return (
      <AnimatePresence>
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={`reward picker skeleton #${i}`}
            className={cn(
              `bg-gray-200 h-auto w-full aspect-square rounded-2xl transition-all animate-pulse`,
            )}
          />
        ))}
      </AnimatePresence>
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

  return nfts.map(({ image_256, id }, i) => {
    const isSelected = selected.includes(id)
    return (
      <motion.div
        key={id}
        aria-selected={isSelected}
        className="transition-all group rounded-2xl aria-selected:outline outline-gray-950 outline-4"
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
          whileTap={{ scale: 0.99 }}
          onPointerUp={(e) => {
            if (e.shiftKey)
              selectMultiple(lastIndex.current, i, selected.includes(nfts[lastIndex.current].id))
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
  })
}

const cap = (n: number, max: number) => (n > max ? max : n)
const ConfirmSelection = ({
  selected,
  onConfirm,
}: {
  selected: string[]
  onConfirm: VoidFunction
}) => {
  const { data: nfts } = useAccountNFTs({
    chain: 'eth-mainnet',
    account: '0x507F0daA42b215273B8a063B092ff3b6d27767aF',
  })

  const selectedNfts = selected.map((id) => nfts?.find((nft) => nft.id === id)).filter(Boolean)

  return (
    <div className="flex flex-row-reverse shadow-lg shadow-gray-500/10 justify-between items-center bg-neutral-50/90 backdrop-blur-md absolute bottom-3 inset-x-3 p-2 z-10 rounded-2xl">
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
                className={cn(`h-8 w-8 object-cover rounded-lg transition-all shadow-md absolute`)}
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
    </div>
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

      <div className="justify-center grid grid-cols-2 md:grid-cols-3 gap-3 h-[80vh] w-full rounded-2xl overflow-scroll py-24 px-4">
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
      <BottomSheet>
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

const Sheet = DialogPrimitive.Dialog
const SheetTrigger = DialogPrimitive.Trigger
const SheetClose = DialogPrimitive.Close

function BottomSheet({ children }: PropsWithChildren) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-grey-20/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogPrimitive.Content
        className={cn(
          'fixed z-50 ease-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-200 data-[state=open]:duration-200',
          'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
          'data-[state=open]:zoom-in-50 data-[state=closed]:zoom-out-75',
          'bottom-4 inset-x-1 mx-auto max-w-[536px]',
        )}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}
