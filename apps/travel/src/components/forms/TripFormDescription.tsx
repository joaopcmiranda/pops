interface TripFormData {
  description: string
}

interface TripFormDescriptionProps {
  formData: TripFormData
  onChange: (field: string, value: string) => void
}

export function TripFormDescription({ formData, onChange }: TripFormDescriptionProps) {
  return (
    <div style={{ marginBottom: '2rem' }}>
      <label
        style={{
          display: 'block',
          fontSize: '0.875rem',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '0.5rem',
        }}
      >
        Description (Optional)
      </label>
      <textarea
        value={formData.description}
        onChange={e => onChange('description', e.target.value)}
        placeholder='Tell us about your trip plans...'
        rows={3}
        style={{
          width: '100%',
          padding: '0.75rem',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          fontSize: '0.875rem',
          resize: 'vertical',
        }}
      />
    </div>
  )
}
