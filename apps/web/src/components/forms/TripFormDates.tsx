import { Calendar } from 'lucide-react'

interface TripFormData {
  startDate: string
  endDate: string
}

interface TripFormDatesProps {
  formData: TripFormData
  onChange: (field: string, value: string) => void
}

export function TripFormDates({ formData, onChange }: TripFormDatesProps) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <h3
        style={{
          fontSize: '1.125rem',
          fontWeight: '600',
          color: '#0f172a',
          marginBottom: '1rem',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Calendar style={{ width: '20px', height: '20px', marginRight: '0.5rem' }} />
        Travel Dates
      </h3>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div>
          <label
            style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.5rem',
            }}
          >
            Start Date *
          </label>
          <input
            type='date'
            required
            value={formData.startDate}
            onChange={e => onChange('startDate', e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '0.875rem',
            }}
          />
        </div>

        <div>
          <label
            style={{
              display: 'block',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '0.5rem',
            }}
          >
            End Date *
          </label>
          <input
            type='date'
            required
            value={formData.endDate}
            onChange={e => onChange('endDate', e.target.value)}
            min={formData.startDate}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '0.875rem',
            }}
          />
        </div>
      </div>
    </div>
  )
}
