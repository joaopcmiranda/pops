import { Plus } from 'lucide-react'

interface NewTripCardProps {
  onClick: () => void
}

export function NewTripCard({ onClick }: NewTripCardProps) {
  return (
    <div
      className='card-hover cursor-pointer'
      onClick={onClick}
      style={{
        border: '2px dashed #d1d5db',
        borderRadius: '8px',
        backgroundColor: 'white',
        boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
        padding: '2rem',
        textAlign: 'center',
        transition: 'all 0.2s ease',
      }}
    >
      <Plus style={{ width: '48px', height: '48px', color: '#3b82f6', margin: '0 auto 1rem' }} />
      <h3
        style={{ fontSize: '1.25rem', fontWeight: '600', color: '#0f172a', marginBottom: '0.5rem' }}
      >
        Create New Trip
      </h3>
      <p style={{ color: '#64748b' }}>Start planning your next adventure</p>
    </div>
  )
}
