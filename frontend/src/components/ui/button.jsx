import React from 'react'
import { cn } from '@/lib/utils'

export const Button = React.forwardRef(function Button(
  { className = '', variant = 'default', ...props },
  ref,
) {
  const variants = {
    default: 'bg-black text-white hover:bg-black/90',
    outline: 'border border-input bg-white hover:bg-slate-50',
    ghost: 'bg-transparent hover:bg-slate-100',
  }

  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black disabled:pointer-events-none disabled:opacity-50',
        variants[variant] ?? variants.default,
        className,
      )}
      {...props}
    />
  )
})

