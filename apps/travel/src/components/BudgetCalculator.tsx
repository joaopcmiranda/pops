import { useState, useEffect } from 'react'
import { Plus, DollarSign, Calculator, PieChart, TrendingUp, Edit2, Trash2 } from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Input } from '@pops/ui'
import { tripApiClient } from '@/lib/api-client'
import { useIsMobile } from '@/hooks/use-mobile'

interface BudgetItem {
  id: string
  categoryId: string
  description: string
  budgetedAmount: number
  actualAmount: number
  notes?: string
  tags?: string[]
  dateSpent?: Date
  createdAt: Date
  updatedAt: Date
}

interface BudgetCategory {
  id: string
  name: string
  color: string
  icon: string
  description?: string
  isDefault: boolean
  createdAt: Date
  updatedAt: Date
}

interface BudgetSummary {
  totalBudgeted: number
  totalActual: number
  remaining: number
  utilizationPercentage: number
  categoryBreakdown: {
    categoryId: string
    categoryName: string
    budgeted: number
    actual: number
    itemCount: number
  }[]
}

export function BudgetCalculator() {
  const [budgetItems, setBudgetItems] = useState<BudgetItem[]>([])
  const [budgetCategories, setBudgetCategories] = useState<BudgetCategory[]>([])
  const [budgetSummary, setBudgetSummary] = useState<BudgetSummary | null>(null)
  const [loading, setLoading] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [newItem, setNewItem] = useState({
    categoryId: '',
    description: '',
    budgetedAmount: 0
  })
  const isMobile = useIsMobile()

  const getCurrentTripId = () => {
    const storedTrip = localStorage.getItem('currentTrip')
    if (storedTrip) {
      const trip = JSON.parse(storedTrip)
      return trip.id
    }
    throw new Error('No active trip found')
  }

  // Load budget data
  const loadBudgetData = async () => {
    try {
      setLoading(true)
      const tripId = getCurrentTripId()
      const client = tripApiClient()

      // Load categories
      const categoriesResponse = await client.get(`/trips/${tripId}/budget/categories`)
      let categories = categoriesResponse.data || []
      
      // If no categories exist, initialize defaults
      if (categories.length === 0) {
        await client.post(`/trips/${tripId}/budget/categories/initialize`)
        const newCategoriesResponse = await client.get(`/trips/${tripId}/budget/categories`)
        categories = newCategoriesResponse.data || []
      }

      setBudgetCategories(categories)

      // Set first category as default for new items
      if (categories.length > 0 && !newItem.categoryId) {
        setNewItem(prev => ({ ...prev, categoryId: categories[0].id }))
      }

      // Load items and summary
      await Promise.all([loadBudgetItems(), loadBudgetSummary()])
    } catch (error) {
      console.error('Error loading budget data:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadBudgetItems = async () => {
    try {
      const tripId = getCurrentTripId()
      const client = tripApiClient()
      
      const response = await client.get(`/trips/${tripId}/budget/items`)
      setBudgetItems(response.data || [])
    } catch (error) {
      console.error('Error loading budget items:', error)
    }
  }

  const loadBudgetSummary = async () => {
    try {
      const tripId = getCurrentTripId()
      const client = tripApiClient()
      
      const response = await client.get(`/trips/${tripId}/budget/summary`)
      setBudgetSummary(response.data || null)
    } catch (error) {
      console.error('Error loading budget summary:', error)
    }
  }

  useEffect(() => {
    loadBudgetData()
  }, [])

  const handleAddItem = async () => {
    if (!newItem.description || newItem.budgetedAmount <= 0 || !newItem.categoryId) return

    try {
      const tripId = getCurrentTripId()
      const client = tripApiClient()

      await client.post(`/trips/${tripId}/budget/items`, {
        categoryId: newItem.categoryId,
        description: newItem.description,
        budgetedAmount: newItem.budgetedAmount,
      })

      // Reload data
      await Promise.all([loadBudgetItems(), loadBudgetSummary()])
      
      // Reset form
      setNewItem({ 
        categoryId: budgetCategories.length > 0 ? budgetCategories[0].id : '', 
        description: '', 
        budgetedAmount: 0 
      })
      setShowAddForm(false)
    } catch (error) {
      console.error('Error adding budget item:', error)
    }
  }

  const handleUpdateActual = async (id: string, actualAmount: number) => {
    try {
      const tripId = getCurrentTripId()
      const client = tripApiClient()

      await client.put(`/trips/${tripId}/budget/items/${id}`, {
        actualAmount,
      })

      // Reload data
      await Promise.all([loadBudgetItems(), loadBudgetSummary()])
    } catch (error) {
      console.error('Error updating budget item:', error)
    }
  }

  const handleDeleteItem = async (id: string) => {
    try {
      const tripId = getCurrentTripId()
      const client = tripApiClient()

      await client.delete(`/trips/${tripId}/budget/items/${id}`)

      // Reload data
      await Promise.all([loadBudgetItems(), loadBudgetSummary()])
    } catch (error) {
      console.error('Error deleting budget item:', error)
    }
  }

  // const getCategoryById = (categoryId: string): BudgetCategory | undefined => {
  //   return budgetCategories.find(cat => cat.id === categoryId)
  // }

  const getItemsByCategory = (categoryId: string): BudgetItem[] => {
    return budgetItems.filter(item => item.categoryId === categoryId)
  }

  return (
    <main className={`app-content animate-fade-in ${isMobile ? 'mobile' : ''}`}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: isMobile ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          marginBottom: isMobile ? '1.5rem' : '2rem',
          flexDirection: isMobile ? 'column' : 'row',
          gap: isMobile ? '1rem' : '0',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <Calculator style={{ width: '32px', height: '32px', color: '#eab308' }} />
          <div>
            <h1
              style={{
                fontSize: isMobile ? '1.5rem' : '2rem',
                fontWeight: '700',
                color: '#0f172a',
                margin: 0,
                fontFamily: 'Poppins, sans-serif',
              }}
            >
              Budget Calculator
            </h1>
            <p style={{ color: '#64748b', fontSize: isMobile ? '0.875rem' : '1rem', margin: 0 }}>
              Track your trip expenses and budget
            </p>
          </div>
        </div>

        <Button 
          className='button-hover focus-ring'
          onClick={() => setShowAddForm(true)}
          style={{ 
            minHeight: isMobile ? '44px' : 'auto',
            width: isMobile ? '100%' : 'auto'
          }}
        >
          <Plus style={{ width: '16px', height: '16px', marginRight: '0.5rem' }} />
          {isMobile ? 'Add Expense' : 'Add Expense'}
        </Button>
      </div>

      {/* Budget Summary Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: isMobile ? '0.75rem' : '1rem',
          marginBottom: isMobile ? '1.5rem' : '2rem',
        }}
      >
        <Card>
          <CardHeader style={{ paddingBottom: '0.5rem' }}>
            <CardTitle style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: '500' }}>
              Total Budget
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <DollarSign style={{ width: '20px', height: '20px', color: '#3b82f6' }} />
              <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0f172a' }}>
                ${budgetSummary?.totalBudgeted.toLocaleString() || '0'}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader style={{ paddingBottom: '0.5rem' }}>
            <CardTitle style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: '500' }}>
              Total Spent
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <TrendingUp style={{ width: '20px', height: '20px', color: '#ef4444' }} />
              <span style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0f172a' }}>
                ${budgetSummary?.totalActual.toLocaleString() || '0'}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader style={{ paddingBottom: '0.5rem' }}>
            <CardTitle style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: '500' }}>
              Remaining
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <PieChart style={{ width: '20px', height: '20px', color: '#10b981' }} />
              <span 
                style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '700', 
                  color: (budgetSummary?.remaining || 0) >= 0 ? '#10b981' : '#ef4444' 
                }}
              >
                ${budgetSummary?.remaining.toLocaleString() || '0'}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader style={{ paddingBottom: '0.5rem' }}>
            <CardTitle style={{ fontSize: '0.875rem', color: '#64748b', fontWeight: '500' }}>
              Budget Used
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div 
                style={{ 
                  width: '20px', 
                  height: '20px', 
                  borderRadius: '50%',
                  backgroundColor: (budgetSummary?.utilizationPercentage || 0) > 100 ? '#ef4444' : '#3b82f6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '0.75rem',
                  color: 'white'
                }}
              >
                %
              </div>
              <span 
                style={{ 
                  fontSize: '1.5rem', 
                  fontWeight: '700', 
                  color: (budgetSummary?.utilizationPercentage || 0) > 100 ? '#ef4444' : '#0f172a' 
                }}
              >
                {budgetSummary?.utilizationPercentage.toFixed(0) || '0'}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Item Form */}
      {showAddForm && (
        <Card style={{ marginBottom: '2rem' }}>
          <CardHeader>
            <CardTitle>Add Budget Item</CardTitle>
            <CardDescription>Add a new expense category to track</CardDescription>
          </CardHeader>
          <CardContent>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto auto', gap: '1rem', alignItems: 'end' }}>
              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', display: 'block', marginBottom: '0.5rem' }}>
                  Category
                </label>
                <select 
                  value={newItem.categoryId}
                  onChange={(e) => setNewItem(prev => ({ ...prev, categoryId: e.target.value }))}
                  style={{
                    padding: '0.5rem',
                    border: '1px solid #d1d5db',
                    borderRadius: '0.375rem',
                    fontSize: '0.875rem'
                  }}
                >
                  {budgetCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', display: 'block', marginBottom: '0.5rem' }}>
                  Description
                </label>
                <Input
                  value={newItem.description}
                  onChange={(e) => setNewItem(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="e.g., Hotel booking for 3 nights"
                />
              </div>

              <div>
                <label style={{ fontSize: '0.875rem', fontWeight: '500', display: 'block', marginBottom: '0.5rem' }}>
                  Budget ($)
                </label>
                <Input
                  type="number"
                  value={newItem.budgetedAmount || ''}
                  onChange={(e) => setNewItem(prev => ({ ...prev, budgetedAmount: Number(e.target.value) }))}
                  placeholder="0"
                  min="0"
                  step="0.01"
                />
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <Button onClick={handleAddItem} disabled={!newItem.description || newItem.budgetedAmount <= 0}>
                  Add
                </Button>
                <Button variant="outline" onClick={() => setShowAddForm(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Budget Items List */}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {[1, 2, 3].map(i => (
            <Card key={i}>
              <div className="animate-pulse" style={{ padding: '1.5rem' }}>
                <div style={{ width: '200px', height: '20px', backgroundColor: '#e2e8f0', borderRadius: '4px', marginBottom: '1rem' }} />
                <div style={{ width: '100%', height: '60px', backgroundColor: '#f1f5f9', borderRadius: '8px' }} />
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {budgetCategories.map((category) => {
            const items = getItemsByCategory(category.id)
            if (items.length === 0) return null

            const categoryBreakdown = budgetSummary?.categoryBreakdown.find(cb => cb.categoryId === category.id)

            return (
              <Card key={category.id}>
                <CardHeader style={{ padding: isMobile ? '1rem' : '1.5rem' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: isMobile ? 'flex-start' : 'center', 
                    justifyContent: 'space-between',
                    flexDirection: isMobile ? 'column' : 'row',
                    gap: isMobile ? '0.5rem' : '0'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ fontSize: '1.5rem' }}>{category.icon}</span>
                      <CardTitle>{category.name}</CardTitle>
                      <span 
                        style={{
                          padding: '0.25rem 0.5rem',
                          borderRadius: '9999px',
                          fontSize: '0.75rem',
                          fontWeight: '500',
                          backgroundColor: category.color + '20',
                          color: category.color,
                        }}
                      >
                        {items.length} {items.length === 1 ? 'item' : 'items'}
                      </span>
                    </div>
                    <div style={{ 
                      fontSize: isMobile ? '0.75rem' : '0.875rem', 
                      color: '#64748b',
                      fontWeight: isMobile ? '600' : 'normal'
                    }}>
                      ${categoryBreakdown?.actual.toLocaleString() || '0'} / ${categoryBreakdown?.budgeted.toLocaleString() || '0'}
                    </div>
                  </div>
                </CardHeader>
              <CardContent style={{ padding: isMobile ? '1rem' : '1.5rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: isMobile ? '0.75rem' : '0.5rem' }}>
                  {items.map(item => (
                    <div 
                      key={item.id} 
                      style={{ 
                        display: isMobile ? 'flex' : 'grid', 
                        flexDirection: isMobile ? 'column' : 'row',
                        gridTemplateColumns: isMobile ? 'none' : '1fr auto auto auto auto',
                        gap: isMobile ? '0.5rem' : '1rem',
                        alignItems: isMobile ? 'stretch' : 'center',
                        padding: isMobile ? '1rem' : '0.75rem',
                        backgroundColor: '#f9fafb',
                        borderRadius: '0.375rem'
                      }}
                    >
                      <div>
                        <div style={{ fontWeight: '500', color: '#0f172a' }}>{item.description}</div>
                        <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                          Budgeted: ${item.budgetedAmount.toLocaleString()}
                        </div>
                      </div>

                      <div style={{ 
                        display: 'flex', 
                        alignItems: 'center', 
                        gap: '0.5rem',
                        justifyContent: isMobile ? 'space-between' : 'flex-start'
                      }}>
                        <span style={{ fontSize: '0.875rem', color: '#64748b' }}>Actual: $</span>
                        <Input
                          type="number"
                          value={item.actualAmount || ''}
                          onChange={(e) => handleUpdateActual(item.id, Number(e.target.value))}
                          placeholder="0"
                          min="0"
                          step="0.01"
                          style={{ 
                            width: isMobile ? '120px' : '100px',
                            minHeight: isMobile ? '44px' : 'auto'
                          }}
                        />
                      </div>

                      <div 
                        style={{ 
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          color: item.actualAmount <= item.budgetedAmount ? '#10b981' : '#ef4444' 
                        }}
                      >
                        {item.actualAmount <= item.budgetedAmount ? 'Under' : 'Over'}: $
                        {Math.abs(item.actualAmount - item.budgetedAmount).toLocaleString()}
                      </div>

                      <Button 
                        variant="outline" 
                        size="sm"
                        style={{
                          minHeight: isMobile ? '44px' : 'auto',
                          minWidth: isMobile ? '44px' : 'auto'
                        }}
                      >
                        <Edit2 style={{ width: isMobile ? '18px' : '14px', height: isMobile ? '18px' : '14px' }} />
                      </Button>

                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteItem(item.id)}
                        className="text-red-600 hover:text-red-700"
                        style={{
                          minHeight: isMobile ? '44px' : 'auto',
                          minWidth: isMobile ? '44px' : 'auto'
                        }}
                      >
                        <Trash2 style={{ width: '14px', height: '14px' }} />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
        </div>
      )}

      {!loading && budgetItems.length === 0 && !showAddForm && (
        <Card style={{ textAlign: 'center', padding: '3rem' }}>
          <CardContent>
            <Calculator
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
              No budget items yet
            </h3>
            <p style={{ color: '#64748b', marginBottom: '1.5rem' }}>
              Start tracking your trip expenses by adding budget categories.
            </p>
            <Button 
              className='button-hover focus-ring'
              onClick={() => setShowAddForm(true)}
            >
              <Plus style={{ width: '16px', height: '16px', marginRight: '0.5rem' }} />
              Add Your First Expense
            </Button>
          </CardContent>
        </Card>
      )}
    </main>
  )
}