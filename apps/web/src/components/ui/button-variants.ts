import { cva } from 'class-variance-authority'

export const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap font-semibold transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative overflow-hidden border-0 cursor-pointer select-none',
  {
    variants: {
      variant: {
        default:
          'bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl shadow-lg shadow-blue-500/25 hover:shadow-xl hover:shadow-blue-500/40 hover:from-blue-700 hover:to-blue-800 active:scale-95 transform hover:scale-105 hover:-translate-y-1 backdrop-blur-sm',
        destructive:
          'bg-gradient-to-r from-red-600 to-red-700 text-white rounded-xl shadow-lg shadow-red-500/25 hover:shadow-xl hover:shadow-red-500/40 hover:from-red-700 hover:to-red-800 active:scale-95 transform hover:scale-105 hover:-translate-y-1',
        outline:
          'border-2 border-blue-200 bg-white/90 text-blue-800 rounded-xl shadow-md backdrop-blur-sm hover:bg-blue-50 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-200/50 active:scale-95 transform hover:scale-105 hover:-translate-y-1',
        secondary:
          'bg-gradient-to-r from-slate-50 to-blue-50 text-blue-900 border border-blue-100 rounded-xl shadow-md hover:from-blue-50 hover:to-blue-100 hover:shadow-lg hover:border-blue-200 active:scale-95 transform hover:scale-105 hover:-translate-y-1',
        ghost:
          'text-blue-700 rounded-xl hover:bg-blue-50/80 hover:text-blue-900 active:bg-blue-100 backdrop-blur-sm transition-colors',
        link: 'text-blue-600 hover:text-blue-800 underline-offset-4 hover:underline transition-colors',
      },
      size: {
        default: 'h-11 px-8 py-3 text-sm',
        sm: 'h-9 px-6 py-2 text-xs rounded-lg',
        lg: 'h-14 px-10 py-4 text-base rounded-2xl',
        icon: 'h-11 w-11 rounded-xl',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
)
