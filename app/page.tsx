'use client'

import { elementToSVG } from 'dom-to-svg'
import { useRef, useState } from 'react'
import { useHotkeys } from 'react-hotkeys-hook'

const Cell = ({ num }: { num: number }) => {
  return (
    <td className="font-bold border-[0.01px] border-black w-[2cm] h-[0.8cm] flex items-center p-[0.1cm] text-[10.5pt] whitespace-nowrap">
      NS: {num}
    </td>
  )
}

const Table = ({ start }: { start: number }) => {
  const values = Array.from({ length: 24 }, (_, i) => Array.from({ length: 4 }, () => +start + i))
  return (
    <table className="border-collapse w-min border-[0.01px] border-black">
      {values.map((row, ri) => (
        <tr key={ri} className="flex">
          {row.map((n, ni) => (
            <Cell key={`${n}_${ni}`} num={n} />
          ))}
        </tr>
      ))}
    </table>
  )
}

import { AnimatePresence, motion } from 'framer-motion'
export default function Home() {
  const numsRef = useRef<HTMLDivElement>(null)

  const [showCopied, setShowCopied] = useState(false)

  const copy = () => {
    if (!numsRef.current) return
    const svg = elementToSVG(numsRef.current)
    navigator.clipboard.writeText(new XMLSerializer().serializeToString(svg))
    setShowCopied(true)
    setTimeout(() => {
      setShowCopied(false)
    }, 1000)
  }

  useHotkeys('meta+c', copy, { preventDefault: true })
  const [start, setStart] = useState(27477)

  return (
    <main className="flex flex-col p-4 gap-2 h-full w-full">
      <div className="flex gap-2 relative w-min">
        <input
          onChange={(e) => {
            const v = +e.target.value.split(' ')[1]
            if (!!v) setStart(v)
          }}
          value={`NS: ${start}`}
          className="font-bold border-[0.01px] border-black w-[2cm] h-[0.8cm] flex items-center p-[0.1cm] text-[10.5pt] whitespace-nowrap"
        />
        <button className="font-bold flex items-center p-[0.1cm] text-[10.5pt]" onClick={copy}>
          Copiar
        </button>
        <AnimatePresence>
          {showCopied && (
            <motion.span
              className="absolute text-3xl -right-4"
              initial={{ scale: 0, opacity: 1, rotate: 180, y: 30, x: -20 }}
              animate={{ scale: 1, opacity: 1, rotate: 0, y: 0, x: 0 }}
              exit={{ scale: 0, opacity: 0, rotate: -190, y: 20, x: 20 }}
              transition={{ duration: 0.3 }}
            >
              👍
            </motion.span>
          )}
        </AnimatePresence>
      </div>
      <div ref={numsRef} className="flex gap-4">
        <Table start={start} />
        <Table start={start + 24} />
        <Table start={start + 48} />
        <Table start={start + 64} />
      </div>
    </main>
  )
}
