/**
 * @fileoverview Welcome Screen Component
 *
 * Initial welcome screen for new users or non-authenticated sessions.
 */

import { ArrowRight, Grid, Zap, Shield } from 'lucide-react'
import { Button } from '@pops/ui'
import { useAppSuite } from '@pops/navigation'

interface WelcomeScreenProps {
  onGetStarted: () => void
}

export function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  const { login } = useAppSuite()

  const handleLogin = async () => {
    try {
      // Mock login - in production this would redirect to accounts.mypops.io
      await login('demo@mypops.io', 'password')
      onGetStarted()
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const features = [
    {
      icon: Grid,
      title: 'Unified Dashboard',
      description: 'Access all your apps from one central location',
    },
    {
      icon: Zap,
      title: 'Real-time Updates',
      description: 'Stay informed with live data across all applications',
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your data stays safe with enterprise-grade security',
    },
  ]

  return (
    <div className='min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 p-4'>
      <div className='max-w-4xl mx-auto text-center'>
        {/* Logo and Title */}
        <div className='mb-8'>
          <h1 className='text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4'>
            Welcome to <span className='text-blue-600'>POps</span>
          </h1>
          <p className='text-xl text-gray-600 dark:text-gray-400'>Your Personal Operations Suite</p>
        </div>

        {/* Features */}
        <div className='grid md:grid-cols-3 gap-8 mb-12'>
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className='bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm'>
                <Icon className='h-12 w-12 text-blue-600 mx-auto mb-4' />
                <h3 className='text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2'>
                  {feature.title}
                </h3>
                <p className='text-gray-600 dark:text-gray-400'>{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* CTA */}
        <div className='space-y-4'>
          <Button
            onClick={handleLogin}
            size='lg'
            className='bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg'
          >
            Get Started
            <ArrowRight className='ml-2 h-5 w-5' />
          </Button>

          <p className='text-sm text-gray-500 dark:text-gray-400'>
            Demo login - no registration required
          </p>
        </div>
      </div>
    </div>
  )
}
