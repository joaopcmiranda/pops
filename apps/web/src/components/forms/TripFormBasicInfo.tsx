import { MapPin } from 'lucide-react'

interface TripFormData {
  title: string
  destination: string
  country: string
  type: string
}

interface TripFormBasicInfoProps {
  formData: TripFormData
  onChange: (field: string, value: string) => void
}

export function TripFormBasicInfo({ formData, onChange }: TripFormBasicInfoProps) {
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
        <MapPin style={{ width: '20px', height: '20px', marginRight: '0.5rem' }} />
        Trip Details
      </h3>

      <div style={{ display: 'grid', gap: '1rem' }}>
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
            Trip Title *
          </label>
          <input
            type='text'
            required
            value={formData.title}
            onChange={e => onChange('title', e.target.value)}
            placeholder='e.g., Summer in Europe'
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '0.875rem',
            }}
          />
        </div>

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
              Destination *
            </label>
            <input
              type='text'
              required
              value={formData.destination}
              onChange={e => onChange('destination', e.target.value)}
              placeholder='e.g., Paris'
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
              Country *
            </label>
            <input
              type='text'
              required
              value={formData.country}
              onChange={e => onChange('country', e.target.value)}
              placeholder='e.g., France'
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
            Trip Type
          </label>
          <select
            value={formData.type}
            onChange={e => onChange('type', e.target.value)}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #d1d5db',
              borderRadius: '6px',
              fontSize: '0.875rem',
            }}
          >
            <option value='leisure'>Leisure</option>
            <option value='business'>Business</option>
            <option value='family'>Family</option>
            <option value='adventure'>Adventure</option>
            <option value='honeymoon'>Honeymoon</option>
            <option value='solo'>Solo</option>
            <option value='group'>Group</option>
            <option value='other'>Other</option>
          </select>
        </div>
      </div>
    </div>
  )
}
