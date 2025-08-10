import { useState, useEffect, useCallback } from 'react'
import { Plus, Heart, MapPin, DollarSign, Trash2, Edit2, ArrowRight } from 'lucide-react'
import { WishlistService } from '@/services/wishlistService'
import { useTripContext } from '@/hooks/useTripContext'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  SkeletonCard,
} from '@pops/ui'
import { ErrorScreen } from '@/components/ErrorScreen'
import type { WishlistItem, NewWishlistItem } from '@pops/types'

interface WishlistViewProps {
  category?: string
}

export function WishlistView({ category }: WishlistViewProps) {
  const { currentTrip } = useTripContext()
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)

  const loadWishlistItems = useCallback(async () => {
    if (!currentTrip) return

    try {
      setLoading(true)
      setError(null)

      let items
      if (category) {
        items = await WishlistService.getByCategoryAndTrip(currentTrip.id, category)
      } else {
        items = await WishlistService.getByTripId(currentTrip.id)
      }

      setWishlistItems(items)
    } catch (error) {
      console.error('Error loading wishlist items:', error)
      setError('Failed to load wishlist items')
    } finally {
      setLoading(false)
    }
  }, [currentTrip, category])

  useEffect(() => {
    loadWishlistItems()
  }, [loadWishlistItems])

  const handleAddItem = async (data: NewWishlistItem) => {
    if (!currentTrip) return

    try {
      await WishlistService.create(currentTrip.id, data)
      setShowAddModal(false)
      loadWishlistItems() // Reload the list
    } catch (error) {
      console.error('Error adding wishlist item:', error)
      // TODO: Show error toast
    }
  }

  const handleDeleteItem = async (itemId: string) => {
    if (!currentTrip) return

    if (!confirm('Are you sure you want to delete this wishlist item?')) {
      return
    }

    try {
      await WishlistService.delete(currentTrip.id, itemId)
      loadWishlistItems() // Reload the list
    } catch (error) {
      console.error('Error deleting wishlist item:', error)
      // TODO: Show error toast
    }
  }

  const handleConvertToItinerary = async (itemId: string) => {
    if (!currentTrip) return

    try {
      await WishlistService.convertToItinerary(currentTrip.id, itemId)
      loadWishlistItems() // Reload the list
      // TODO: Show success toast
    } catch (error) {
      console.error('Error converting wishlist item:', error)
      // TODO: Show error toast
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50'
      case 'medium':
        return 'text-yellow-600 bg-yellow-50'
      case 'low':
        return 'text-green-600 bg-green-50'
      default:
        return 'text-gray-600 bg-gray-50'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'place':
        return MapPin
      case 'food':
        return '🍽️'
      case 'experience':
        return '🎯'
      case 'accommodation':
        return '🏨'
      case 'transport':
        return '✈️'
      case 'activity':
        return '🏃'
      default:
        return Heart
    }
  }

  if (error) {
    return (
      <ErrorScreen
        type='loading'
        title='Wishlist Loading Error'
        description={error}
        onRetry={loadWishlistItems}
        showHome={false}
      />
    )
  }

  return (
    <main className='app-content animate-fade-in'>
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
          <Heart style={{ width: '32px', height: '32px', color: '#ec4899' }} />
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
              {category ? `${category} Wishlist` : 'Trip Wishlist'}
            </h1>
            <p style={{ color: '#64748b', fontSize: '1rem', margin: 0 }}>
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'}
            </p>
          </div>
        </div>

        <Button className='button-hover focus-ring' onClick={() => setShowAddModal(true)}>
          <Plus style={{ width: '16px', height: '16px', marginRight: '0.5rem' }} />
          Add to Wishlist
        </Button>
      </div>

      {/* Wishlist Items */}
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
      ) : wishlistItems.length === 0 ? (
        <Card style={{ textAlign: 'center', padding: '3rem' }}>
          <CardContent>
            <Heart
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
              No wishlist items yet
            </h3>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
              Start building your dream trip by adding places, foods, and experiences to your
              wishlist.
            </p>
            <Button className='button-hover focus-ring' onClick={() => setShowAddModal(true)}>
              <Plus style={{ width: '16px', height: '16px', marginRight: '0.5rem' }} />
              Add Your First Item
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
          {wishlistItems.map((item, index) => {
            const TypeIcon = getTypeIcon(item.type)
            const isIconComponent = typeof TypeIcon !== 'string'

            return (
              <Card
                key={item.id}
                className={`category-card card-hover animate-fade-in-up stagger-${index + 1}`}
              >
                <CardHeader>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {isIconComponent ? (
                          <TypeIcon style={{ width: '16px', height: '16px', color: '#64748b' }} />
                        ) : (
                          <span style={{ fontSize: '16px' }}>{TypeIcon}</span>
                        )}
                        <CardTitle style={{ fontSize: '1.25rem', margin: 0 }}>
                          {item.title}
                        </CardTitle>
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.5rem',
                          marginBottom: '0.5rem',
                        }}
                      >
                        <span
                          className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(item.priority)}`}
                        >
                          {item.priority} priority
                        </span>
                        <span className='inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-50 text-blue-600'>
                          {item.type}
                        </span>
                      </div>
                      {item.description && (
                        <CardDescription>
                          {item.description.substring(0, 120)}
                          {item.description.length > 120 ? '...' : ''}
                        </CardDescription>
                      )}
                    </div>
                  </div>
                </CardHeader>

                <CardContent>
                  {(item.location || item.estimatedCost) && (
                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '1rem',
                        marginBottom: '1rem',
                        fontSize: '0.875rem',
                        color: '#64748b',
                      }}
                    >
                      {item.location && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <MapPin style={{ width: '14px', height: '14px' }} />
                          <span>{item.location}</span>
                        </div>
                      )}
                      {item.estimatedCost && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                          <DollarSign style={{ width: '14px', height: '14px' }} />
                          <span>${item.estimatedCost}</span>
                        </div>
                      )}
                    </div>
                  )}

                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <Button
                      variant='default'
                      size='sm'
                      style={{ flex: 1 }}
                      onClick={() => handleConvertToItinerary(item.id)}
                      className='button-hover focus-ring'
                    >
                      <ArrowRight
                        style={{ width: '14px', height: '14px', marginRight: '0.5rem' }}
                      />
                      Plan It
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => {}} // TODO: Implement edit modal
                      className='button-hover focus-ring'
                    >
                      <Edit2 style={{ width: '14px', height: '14px' }} />
                    </Button>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => handleDeleteItem(item.id)}
                      className='button-hover focus-ring text-red-600 hover:text-red-700'
                    >
                      <Trash2 style={{ width: '14px', height: '14px' }} />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      )}

      {/* TODO: Add Modal Component */}
      {showAddModal && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
          }}
        >
          <Card style={{ width: '500px', maxWidth: '90vw' }}>
            <CardHeader>
              <CardTitle>Add to Wishlist</CardTitle>
              <CardDescription>Add something you'd like to do or see on your trip</CardDescription>
            </CardHeader>
            <CardContent>
              {/* Simple form - TODO: Create proper AddWishlistModal component */}
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '0.5rem' }}>
                <Button
                  variant='outline'
                  onClick={() => setShowAddModal(false)}
                  style={{ flex: 1 }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    // TODO: Implement form submission
                    handleAddItem({
                      title: 'Sample Wishlist Item',
                      type: 'place',
                      category: category || 'destinations',
                      description: 'This is a sample wishlist item',
                    })
                  }}
                  style={{ flex: 1 }}
                >
                  Add Item
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </main>
  )
}
