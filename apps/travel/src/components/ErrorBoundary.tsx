import type { ReactNode, ErrorInfo } from 'react'
import { Component } from 'react'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import { Button } from './ui/button/button'

interface Props {
  children: ReactNode
  fallback?: ReactNode
  onError?: (error: Error, errorInfo: ErrorInfo) => void
}

interface State {
  hasError: boolean
  error: Error | null
  errorInfo: ErrorInfo | null
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    }
  }

  static getDerivedStateFromError(error: Error): Partial<State> {
    return {
      hasError: true,
      error,
    }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error Boundary caught an error:', error, errorInfo)

    this.setState({
      error,
      errorInfo,
    })

    // Call the onError prop if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo)
    }

    // In a real app, you would send this to your error reporting service
    // For example: reportErrorToService(error, errorInfo)
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
  }

  handleGoHome = () => {
    // Reset error state and navigate to home
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      // Custom error UI
      if (this.props.fallback) {
        return this.props.fallback
      }

      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            backgroundColor: '#f8fafc',
          }}
          className='animate-fade-in'
        >
          <Card style={{ maxWidth: '500px', width: '100%' }}>
            <CardContent style={{ padding: '3rem', textAlign: 'center' }}>
              <AlertTriangle
                style={{
                  width: '64px',
                  height: '64px',
                  color: '#ef4444',
                  margin: '0 auto 1.5rem',
                }}
              />

              <h1
                style={{
                  fontSize: '1.5rem',
                  fontWeight: '700',
                  color: '#0f172a',
                  marginBottom: '0.5rem',
                  fontFamily: 'Poppins, sans-serif',
                }}
              >
                Oops! Something went wrong
              </h1>

              <p
                style={{
                  color: '#64748b',
                  marginBottom: '2rem',
                  lineHeight: '1.6',
                }}
              >
                We encountered an unexpected error while loading this part of your trip planner.
                Don't worry - your data is safe.
              </p>

              {/* Error details (only in development) */}
              {import.meta.env.DEV && this.state.error && (
                <details
                  style={{
                    marginBottom: '2rem',
                    padding: '1rem',
                    backgroundColor: '#fee2e2',
                    border: '1px solid #fecaca',
                    borderRadius: '0.5rem',
                    textAlign: 'left',
                  }}
                >
                  <summary
                    style={{
                      cursor: 'pointer',
                      fontWeight: '600',
                      color: '#dc2626',
                      marginBottom: '0.5rem',
                    }}
                  >
                    Error Details (Development)
                  </summary>
                  <pre
                    style={{
                      fontSize: '0.75rem',
                      color: '#7f1d1d',
                      overflow: 'auto',
                      whiteSpace: 'pre-wrap',
                    }}
                  >
                    {this.state.error.toString()}
                    {this.state.errorInfo && this.state.errorInfo.componentStack}
                  </pre>
                </details>
              )}

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                <Button onClick={this.handleRetry} className='button-hover focus-ring'>
                  <RefreshCw style={{ width: '16px', height: '16px', marginRight: '0.5rem' }} />
                  Try Again
                </Button>

                <Button
                  variant='outline'
                  onClick={this.handleGoHome}
                  className='button-hover focus-ring'
                >
                  <Home style={{ width: '16px', height: '16px', marginRight: '0.5rem' }} />
                  Go to Dashboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )
    }

    return this.props.children
  }
}
