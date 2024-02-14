import { CaretDownIcon } from '@radix-ui/react-icons'
import { useState } from 'react'
import { NumericFormat } from 'react-number-format'
import { TokenPicker } from './TokenPicker'

export function TicketPrice() {
  const [price, setPrice] = useState(0)
  const [token, setToken] = useState('usdc')

  return (
    <div className="flex gap-2 flex-col min-w-64 w-72">
      <div className="flex flex-col">
        <span className="font-semibold">Ticket Price</span>
        <span className="text-sm text-gray-500">Price of each participation ticket</span>
      </div>
      <div className="flex justify-between gap-1 p-1 pl-2 rounded-xl border-dashed border h-9 border-gray-300 w-52 bg-gray-200">
        <NumericFormat
          value={price}
          onValueChange={(v, s) => setPrice(v.floatValue || 0)}
          placeholder="0.00"
          thousandSeparator
          allowedDecimalSeparators={['.', ',']}
          inputMode="decimal"
          valueIsNumericString
          allowNegative={false}
          className="bg-transparent border-none outline-none caret-gray-400 w-24 max-w-full"
        />

        <TokenPicker
          onConfirm={() => null}
          selected={''}
          trigger={
            <div className="flex bg-blue-500/10 text-sm rounded-xl gap-1 px-1.5 py-1 items-center">
              {/*  eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Circle_USDC_Logo.svg/1024px-Circle_USDC_Logo.svg.png"
                alt="usdc"
                className="h-4 w-4 object-cover bg-blue-500 rounded-full"
              />
              <span className="text-blue-500 font-medium uppercase">USDC</span>
              <CaretDownIcon className="h-5 w-5 -mx-1 text-blue-500" />
            </div>
          }
        />
      </div>
      <span className="text-xs text-gray-500 whitespace-nowrap ml-2 -mt-2">
        <span className="text-lg align-middle">🎟️</span> = 1000 USDC ($ 1.032,40)
      </span>
    </div>
  )
}
