/* eslint-disable react-refresh/only-export-components */
import { useState, createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import { X, CheckCircle, AlertCircle, Info, AlertTriangle } from 'lucide-react'
import { Button } from './ui/button'

export type ToastType = 'success' | 'error' | 'warning' | 'info'

export interface Toast {
  id: string
  title: string
  description?: string
  type: ToastType
  duration?: number
  action?: {
    label: string
    onClick: () => void
  }
}

interface ToastContextValue {
  toasts: Toast[]
  addToast: (toast: Omit<Toast, 'id'>) => void
  removeToast: (id: string) => void
  showSuccess: (title: string, description?: string) => void
  showError: (title: string, description?: string) => void
  showWarning: (title: string, description?: string) => void
  showInfo: (title: string, description?: string) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider')
  }
  return context
}

interface ToastProviderProps {
  children: ReactNode
}

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast: Toast = {
      id,
      duration: 5000, // 5 seconds default
      ...toast,
    }

    setToasts(prev => [...prev, newToast])

    // Auto remove after duration
    if (newToast.duration && newToast.duration > 0) {
      setTimeout(() => {
        removeToast(id)
      }, newToast.duration)
    }
  }

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id))
  }

  const showSuccess = (title: string, description?: string) => {
    addToast({ title, description, type: 'success' })
  }

  const showError = (title: string, description?: string) => {
    addToast({ title, description, type: 'error', duration: 7000 }) // Errors stay longer
  }

  const showWarning = (title: string, description?: string) => {
    addToast({ title, description, type: 'warning' })
  }

  const showInfo = (title: string, description?: string) => {
    addToast({ title, description, type: 'info' })
  }

  return (
    <ToastContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        showSuccess,
        showError,
        showWarning,
        showInfo,
      }}
    >
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  )
}

interface ToastContainerProps {
  toasts: Toast[]
  onRemove: (id: string) => void
}

function ToastContainer({ toasts, onRemove }: ToastContainerProps) {
  if (toasts.length === 0) return null

  return (
    <div
      style={{
        position: 'fixed',
        top: '1rem',
        right: '1rem',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
        maxWidth: '420px',
      }}
    >
      {toasts.map(toast => (
        <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
      ))}
    </div>
  )
}

interface ToastItemProps {
  toast: Toast
  onRemove: (id: string) => void
}

function ToastItem({ toast, onRemove }: ToastItemProps) {
  const [isExiting, setIsExiting] = useState(false)

  const handleRemove = () => {
    setIsExiting(true)
    setTimeout(() => {
      onRemove(toast.id)
    }, 300) // Match animation duration
  }

  const getToastStyles = () => {
    const baseStyles = {
      padding: '1rem',
      borderRadius: '0.5rem',
      backgroundColor: 'white',
      border: '1px solid #e2e8f0',
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      display: 'flex',
      alignItems: 'flex-start',
      gap: '0.75rem',
      minWidth: '320px',
    }

    const typeStyles = {
      success: { borderLeftColor: '#10b981', borderLeftWidth: '4px' },
      error: { borderLeftColor: '#ef4444', borderLeftWidth: '4px' },
      warning: { borderLeftColor: '#f59e0b', borderLeftWidth: '4px' },
      info: { borderLeftColor: '#3b82f6', borderLeftWidth: '4px' },
    }

    return { ...baseStyles, ...typeStyles[toast.type] }
  }

  const getIcon = () => {
    const iconProps = { style: { width: '20px', height: '20px', flexShrink: 0 } }

    switch (toast.type) {
      case 'success':
        return <CheckCircle {...iconProps} style={{ ...iconProps.style, color: '#10b981' }} />
      case 'error':
        return <AlertCircle {...iconProps} style={{ ...iconProps.style, color: '#ef4444' }} />
      case 'warning':
        return <AlertTriangle {...iconProps} style={{ ...iconProps.style, color: '#f59e0b' }} />
      case 'info':
        return <Info {...iconProps} style={{ ...iconProps.style, color: '#3b82f6' }} />
    }
  }

  return (
    <div
      style={getToastStyles()}
      className={`notification-enter ${isExiting ? 'notification-exit' : ''}`}
    >
      {getIcon()}

      <div style={{ flex: 1 }}>
        <h4
          style={{
            fontSize: '0.875rem',
            fontWeight: '600',
            color: '#0f172a',
            margin: 0,
            marginBottom: toast.description ? '0.25rem' : 0,
          }}
        >
          {toast.title}
        </h4>

        {toast.description && (
          <p
            style={{
              fontSize: '0.75rem',
              color: '#64748b',
              margin: 0,
              lineHeight: '1.4',
            }}
          >
            {toast.description}
          </p>
        )}

        {toast.action && (
          <Button
            variant='outline'
            size='sm'
            onClick={toast.action.onClick}
            style={{ marginTop: '0.5rem', fontSize: '0.75rem', padding: '0.25rem 0.5rem' }}
            className='button-hover button-entrance'
          >
            {toast.action.label}
          </Button>
        )}
      </div>

      <Button
        variant='ghost'
        size='sm'
        onClick={handleRemove}
        style={{ padding: '0.25rem', minWidth: 'auto' }}
        className='button-hover'
      >
        <X style={{ width: '16px', height: '16px' }} />
      </Button>
    </div>
  )
}
