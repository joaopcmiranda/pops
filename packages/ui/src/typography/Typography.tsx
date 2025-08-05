import * as React from 'react'
import { cva, type VariantProps } from 'class-variance-authority'
import { cn } from '../lib/utils'

const headingVariants = cva('font-semibold tracking-tight', {
  variants: {
    variant: {
      h1: 'text-4xl lg:text-5xl',
      h2: 'text-3xl',
      h3: 'text-2xl',
      h4: 'text-xl',
      h5: 'text-lg',
      h6: 'text-base',
    },
  },
  defaultVariants: {
    variant: 'h1',
  },
})

const textVariants = cva('', {
  variants: {
    variant: {
      body: 'text-base',
      lead: 'text-xl text-muted-foreground',
      large: 'text-lg',
      small: 'text-sm',
      muted: 'text-sm text-muted-foreground',
    },
  },
  defaultVariants: {
    variant: 'body',
  },
})

export interface HeadingProps
  extends React.HTMLAttributes<HTMLHeadingElement>,
    VariantProps<typeof headingVariants> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export function Heading({ className, variant, as, ...props }: HeadingProps) {
  const Comp = as || variant || 'h1'

  return <Comp className={cn(headingVariants({ variant: variant || as }), className)} {...props} />
}

export interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {
  as?: 'p' | 'span' | 'div'
}

export function Text({ className, variant, as: Comp = 'p', ...props }: TextProps) {
  return <Comp className={cn(textVariants({ variant }), className)} {...props} />
}

export interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children?: React.ReactNode
}

export function Label({ className, ...props }: LabelProps) {
  return (
    <label
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className
      )}
      {...props}
    />
  )
}
