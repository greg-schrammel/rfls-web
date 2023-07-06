'use client'

import { PlusIcon } from '@radix-ui/react-icons'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { RewardsPicker } from '../components/RewardsPicker'
import { useAccountNFTs } from '../hooks/useAccountNfts'
import { cn } from '../utils/cn'

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.2 } },
}

const item = {
  hidden: { scale: 0.6 },
  show: { scale: 1, transition: { type: 'spring' } },
}

export function Rewards() {
  const { data: nfts } = useAccountNFTs({
    chain: 'eth-mainnet',
    account: '0x507F0daA42b215273B8a063B092ff3b6d27767aF',
  })

  const [selected, setSelected] = useState<string[]>([])
  const selectedNfts = selected.map((id) => nfts?.find((nft) => nft.id === id)).filter(Boolean)

  return (
    <div className="flex gap-2 flex-col min-w-64 w-72">
      <div className="flex flex-col">
        <span className="font-semibold">Rewards</span>
        <span className="text-sm text-gray-500">
          Select as many tokens and NFTs you wish to raffle
        </span>
        <span className="text-xs text-amber-500">
          Beware the rewards will be escrowed by the contract until the raffle winners are choosen{' '}
        </span>
      </div>

      <div className="flex flex-col gap-1.5">
        <motion.div
          variants={container}
          className="grid grid-cols-3 max-w-xs gap-2 overflow-scroll p-4 -m-4 rounded-lg"
        >
          {selectedNfts?.map(({ image_256, name, id }, i) => (
            <motion.div
              key={id}
              variants={item}
              initial="hidden"
              animate="show"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* eslint-disable @next/next/no-img-element */}
              <img
                src={image_256}
                alt={name}
                draggable={false}
                className="aspect-square w-full rounded-xl object-cover"
              />
            </motion.div>
          ))}
          <RewardsPicker
            onConfirm={setSelected}
            selected={selected}
            trigger={
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={cn(
                  `bg-gray-200 border-4 border-dashed border-gray-300 aspect-square w-full rounded-xl duration-500 cursor-default transition-all flex items-center justify-center group hover:bg-gray-300/60`,
                )}
              >
                <PlusIcon className="h-8 w-8 text-gray-400 transition-colors group-hover:text-gray-500" />
              </motion.button>
            }
          />
        </motion.div>
        <span className="text-gray-400 text-xs">{selectedNfts?.length} rewards selected</span>
      </div>
    </div>
  )
}
