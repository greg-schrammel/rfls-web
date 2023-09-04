'use client'

import * as DialogPrimitive from '@radix-ui/react-dialog'
import { PropsWithChildren } from 'react'
import { cn } from '../utils/cn'

export const Sheet = DialogPrimitive.Dialog
export const SheetTrigger = DialogPrimitive.Trigger
export const SheetClose = DialogPrimitive.Close

export function BottomSheet({ children, className }: PropsWithChildren<{ className: string }>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-grey-20/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
      <DialogPrimitive.Content
        className={cn(
          'fixed z-50 ease-out data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:duration-200 data-[state=open]:duration-200',
          'data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
          'data-[state=open]:zoom-in-50 data-[state=closed]:zoom-out-75',
          'bottom-4 inset-x-1 mx-auto',
          className,
        )}
      >
        {children}
      </DialogPrimitive.Content>
    </DialogPrimitive.Portal>
  )
}
