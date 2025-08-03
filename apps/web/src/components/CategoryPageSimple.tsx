import { useState, useEffect } from 'react'
import { Plus, FileText } from 'lucide-react'
import { ContentService, type ContentItem } from '@/services/contentService'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button/button.tsx'

interface CategoryPageProps {
  category: string
  categoryName: string
  categoryIcon: React.ComponentType<{ style?: React.CSSProperties }>
}

export function CategoryPageSimple({
  category,
  categoryName,
  categoryIcon: IconComponent,
}: CategoryPageProps) {
  const [contentItems, setContentItems] = useState<ContentItem[]>([])

  useEffect(() => {
    const items = ContentService.getContentByCategory(category)
    setContentItems(items)
  }, [category])

  return (
    <main className='app-content'>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '2rem',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <IconComponent style={{ width: '32px', height: '32px', color: '#3b82f6' }} />
          <div>
            <h1
              style={{
                fontSize: '2rem',
                fontWeight: '700',
                color: '#0f172a',
                margin: 0,
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              {categoryName}
            </h1>
            <p style={{ color: '#64748b', fontSize: '1rem', margin: 0 }}>
              {contentItems.length} {contentItems.length === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>

        <Button>
          <Plus style={{ width: '16px', height: '16px', marginRight: '0.5rem' }} />
          Add New
        </Button>
      </div>

      {/* Content List */}
      {contentItems.length === 0 ? (
        <Card style={{ textAlign: 'center', padding: '3rem' }}>
          <CardContent>
            <FileText
              style={{
                width: '48px',
                height: '48px',
                color: '#94a3b8',
                margin: '0 auto 1rem',
              }}
            />
            <h3
              style={{
                fontSize: '1.25rem',
                fontWeight: '600',
                color: '#1e293b',
                marginBottom: '0.5rem',
              }}
            >
              No {categoryName.toLowerCase()} yet
            </h3>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
              Get started by adding your first {categoryName.toLowerCase().slice(0, -1)} item.
            </p>
            <Button>
              <Plus style={{ width: '16px', height: '16px', marginRight: '0.5rem' }} />
              Add Your First {categoryName.slice(0, -1)}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {contentItems.map(item => (
            <Card key={item.id} className='category-card'>
              <CardHeader>
                <CardTitle style={{ fontSize: '1.25rem' }}>{item.title}</CardTitle>
                <CardDescription>
                  {item.content.substring(0, 150).replace(/[#*]/g, '')}...
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Button variant='outline' style={{ flex: 1 }}>
                    View
                  </Button>
                  <Button variant='outline' style={{ flex: 1 }}>
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  )
}
