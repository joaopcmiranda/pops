import { useState, useEffect } from 'react'
import { Plus, FileText, Eye, ArrowLeft } from 'lucide-react'
import { ContentService, type ContentItem } from '@/services/contentService'
import { ContentViewer } from '@/components/ContentViewer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { SkeletonCard } from './ui/skeleton'

interface CategoryPageProps {
  category: string
  categoryName: string
  categoryIcon: React.ComponentType<{ style?: React.CSSProperties }>
}

export function CategoryPageMinimal({
  category,
  categoryName,
  categoryIcon: IconComponent,
}: CategoryPageProps) {
  const [contentItems, setContentItems] = useState<ContentItem[]>([])
  const [selectedContent, setSelectedContent] = useState<ContentItem | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    // Simulate loading delay for demonstration
    setTimeout(() => {
      const items = ContentService.getContentByCategory(category)
      setContentItems(items)
      setLoading(false)
    }, 300)
  }, [category])

  const handleViewContent = (item: ContentItem) => {
    setSelectedContent(item)
  }

  const handleBackToList = () => {
    setSelectedContent(null)
  }

  // If viewing a specific content item, show the content viewer
  if (selectedContent) {
    return (
      <main className='app-content animate-fade-in'>
        <div style={{ marginBottom: '2rem' }}>
          <Button
            variant='outline'
            onClick={handleBackToList}
            style={{ marginBottom: '1rem' }}
            className='button-hover focus-ring'
          >
            <ArrowLeft style={{ width: '16px', height: '16px', marginRight: '0.5rem' }} />
            Back to {categoryName}
          </Button>
        </div>
        <ContentViewer content={selectedContent} />
      </main>
    )
  }

  return (
    <main className='app-content animate-fade-in page-enter'>
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

        <Button className='button-hover focus-ring'>
          <Plus style={{ width: '16px', height: '16px', marginRight: '0.5rem' }} />
          Add New
        </Button>
      </div>

      {/* Content List */}
      {loading ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {[1, 2, 3].map(i => (
            <Card key={i}>
              <SkeletonCard />
            </Card>
          ))}
        </div>
      ) : contentItems.length === 0 ? (
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
            <Button className='button-hover focus-ring'>
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
          {contentItems.map((item, index) => (
            <Card
              key={item.id}
              className={`category-card card-hover animate-fade-in-up stagger-${index + 1}`}
            >
              <CardHeader>
                <CardTitle style={{ fontSize: '1.25rem' }}>{item.title}</CardTitle>
                <CardDescription>
                  {item.content.substring(0, 150).replace(/[#*]/g, '')}...
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <Button
                    variant='outline'
                    style={{ flex: 1 }}
                    onClick={() => handleViewContent(item)}
                    className='button-hover focus-ring'
                  >
                    <Eye style={{ width: '16px', height: '16px', marginRight: '0.5rem' }} />
                    View
                  </Button>
                  <Button variant='outline' style={{ flex: 1 }} className='button-hover focus-ring'>
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
