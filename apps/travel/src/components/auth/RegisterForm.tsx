import { useState, FormEvent } from 'react'
import { Eye, EyeOff, Lock, Mail, User, AlertCircle } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'
import { Button, Card, CardContent, CardDescription, CardHeader, CardTitle } from '@pops/ui'

interface RegisterFormProps {
  onSwitchToLogin: () => void
}

export function RegisterForm({ onSwitchToLogin }: RegisterFormProps) {
  const { register, isLoading, error, clearError } = useAuth()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState('')

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setFormError('')
    clearError()

    // Basic validation
    if (!name || !email || !password) {
      setFormError('Please fill in all fields')
      return
    }

    if (name.length < 2) {
      setFormError('Name must be at least 2 characters long')
      return
    }

    if (!email.includes('@')) {
      setFormError('Please enter a valid email address')
      return
    }

    if (password.length < 6) {
      setFormError('Password must be at least 6 characters long')
      return
    }

    try {
      await register({ name, email, password })
      // Registration successful - AuthContext will handle state updates
    } catch (err) {
      // Error is handled by AuthContext
      console.error('Registration failed:', err)
    }
  }

  const displayError = formError || error

  return (
    <Card style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>
      <CardHeader style={{ textAlign: 'center' }}>
        <CardTitle style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0f172a' }}>
          Create Account
        </CardTitle>
        <CardDescription>Join us to start planning your amazing trips</CardDescription>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
        >
          {/* Name Field */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label
              htmlFor='name'
              style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}
            >
              Full Name
            </label>
            <div style={{ position: 'relative' }}>
              <User
                style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '16px',
                  height: '16px',
                  color: '#9ca3af',
                }}
              />
              <input
                id='name'
                type='text'
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder='John Doe'
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  backgroundColor: isLoading ? '#f9fafb' : 'white',
                }}
                onFocus={e => (e.target.style.borderColor = '#3b82f6')}
                onBlur={e => (e.target.style.borderColor = '#d1d5db')}
              />
            </div>
          </div>

          {/* Email Field */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label
              htmlFor='email'
              style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}
            >
              Email
            </label>
            <div style={{ position: 'relative' }}>
              <Mail
                style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '16px',
                  height: '16px',
                  color: '#9ca3af',
                }}
              />
              <input
                id='email'
                type='email'
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder='john@example.com'
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '0.75rem 0.75rem 0.75rem 2.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  backgroundColor: isLoading ? '#f9fafb' : 'white',
                }}
                onFocus={e => (e.target.style.borderColor = '#3b82f6')}
                onBlur={e => (e.target.style.borderColor = '#d1d5db')}
              />
            </div>
          </div>

          {/* Password Field */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <label
              htmlFor='password'
              style={{ fontSize: '0.875rem', fontWeight: '500', color: '#374151' }}
            >
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock
                style={{
                  position: 'absolute',
                  left: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: '16px',
                  height: '16px',
                  color: '#9ca3af',
                }}
              />
              <input
                id='password'
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder='Create a strong password'
                disabled={isLoading}
                style={{
                  width: '100%',
                  padding: '0.75rem 2.5rem 0.75rem 2.5rem',
                  border: '1px solid #d1d5db',
                  borderRadius: '0.5rem',
                  fontSize: '0.875rem',
                  outline: 'none',
                  transition: 'border-color 0.2s',
                  backgroundColor: isLoading ? '#f9fafb' : 'white',
                }}
                onFocus={e => (e.target.style.borderColor = '#3b82f6')}
                onBlur={e => (e.target.style.borderColor = '#d1d5db')}
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                disabled={isLoading}
                style={{
                  position: 'absolute',
                  right: '0.75rem',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0',
                  color: '#9ca3af',
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#6b7280', margin: '0' }}>
              Must be at least 6 characters long
            </p>
          </div>

          {/* Error Message */}
          {displayError && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem',
                backgroundColor: '#fef2f2',
                border: '1px solid #fecaca',
                borderRadius: '0.5rem',
                color: '#dc2626',
              }}
            >
              <AlertCircle size={16} />
              <span style={{ fontSize: '0.875rem' }}>{displayError}</span>
            </div>
          )}

          {/* Submit Button */}
          <Button
            type='submit'
            disabled={isLoading}
            style={{
              width: '100%',
              backgroundColor: isLoading ? '#9ca3af' : '#3b82f6',
              color: 'white',
              padding: '0.75rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              cursor: isLoading ? 'not-allowed' : 'pointer',
            }}
          >
            {isLoading ? 'Creating account...' : 'Create account'}
          </Button>

          {/* Switch to Login */}
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <span style={{ fontSize: '0.875rem', color: '#6b7280' }}>
              Already have an account?{' '}
            </span>
            <button
              type='button'
              onClick={onSwitchToLogin}
              disabled={isLoading}
              style={{
                background: 'none',
                border: 'none',
                color: '#3b82f6',
                fontSize: '0.875rem',
                fontWeight: '500',
                cursor: 'pointer',
                textDecoration: 'underline',
              }}
            >
              Sign in
            </button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
