import { useState } from 'react'
import { MapPin, Calendar, Plane, Home, Activity, DollarSign, FileText, TrendingUp, Clock, Target } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AppHeader } from '@/components/AppHeader'
import { AppSidebar } from '@/components/AppSidebar'

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('dashboard')

  const categories = [
    { id: 'destinations', name: 'Destinations', icon: MapPin, color: 'icon-blue', count: 3 },
    { id: 'itinerary', name: 'Itinerary', icon: Calendar, color: 'icon-green', count: 5 },
    { id: 'transport', name: 'Transport', icon: Plane, color: 'icon-purple', count: 2 },
    { id: 'accommodation', name: 'Accommodation', icon: Home, color: 'icon-orange', count: 4 },
    { id: 'activities', name: 'Activities', icon: Activity, color: 'icon-red', count: 12 },
    { id: 'budget', name: 'Budget', icon: DollarSign, color: 'icon-yellow', count: 1 },
    { id: 'documents', name: 'Documents', icon: FileText, color: 'icon-gray', count: 8 },
  ]

  const quickStats = [
    { icon: MapPin, label: 'Destinations', value: '7', change: '+2', color: 'text-blue-600' },
    { icon: Clock, label: 'Days Planned', value: '14', change: '+3', color: 'text-green-600' },
    { icon: DollarSign, label: 'Budget', value: '$2,450', change: '+$320', color: 'text-yellow-600' },
    { icon: Target, label: 'Activities', value: '23', change: '+5', color: 'text-purple-600' },
  ]

  const handleCategorySelect = (category: string) => {
    setActiveCategory(category)
    setSidebarOpen(false) // Close sidebar on mobile after selection
  }

  return (
    <div className="app-layout">
      <AppSidebar
        isOpen={sidebarOpen}
        activeCategory={activeCategory}
        onCategorySelect={handleCategorySelect}
      />
      
      <div className="app-main">
        <AppHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        
        <main className="app-content">
          {/* Welcome Section */}
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ 
              fontSize: '2rem', 
              fontWeight: '700', 
              color: '#0f172a', 
              marginBottom: '0.5rem',
              fontFamily: 'Poppins, sans-serif'
            }}>
              Welcome back! 🇧🇷
            </h1>
            <p style={{ color: '#64748b', fontSize: '1rem' }}>
              Your Brazilian adventure is taking shape. Here's your trip overview.
            </p>
          </div>

          {/* Quick Stats */}
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '1rem', 
            marginBottom: '2rem' 
          }}>
            {quickStats.map((stat, index) => {
              const IconComponent = stat.icon
              return (
                <Card key={index} style={{ padding: '1.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <p style={{ fontSize: '0.875rem', color: '#64748b', marginBottom: '0.25rem' }}>
                        {stat.label}
                      </p>
                      <p style={{ fontSize: '1.5rem', fontWeight: '700', color: '#0f172a', margin: 0 }}>
                        {stat.value}
                      </p>
                      <p style={{ fontSize: '0.75rem', color: '#10b981', marginTop: '0.25rem', margin: 0 }}>
                        {stat.change} this week
                      </p>
                    </div>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      backgroundColor: '#f1f5f9',
                      borderRadius: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}>
                      <IconComponent style={{ width: '24px', height: '24px', color: '#64748b' }} />
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          {/* Categories Grid */}
          <div style={{ marginBottom: '2rem' }}>
            <h2 style={{ 
              fontSize: '1.5rem', 
              fontWeight: '600', 
              color: '#0f172a', 
              marginBottom: '1rem',
              fontFamily: 'Poppins, sans-serif'
            }}>
              Trip Categories
            </h2>
            <div className="app-grid">
              {categories.map((category) => {
                const IconComponent = category.icon
                return (
                  <Card key={category.id} className="category-card">
                    <CardHeader style={{ paddingBottom: '16px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <div className={`${category.color}`} style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '10px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center'
                        }}>
                          <IconComponent style={{ width: '20px', height: '20px', color: 'white' }} />
                        </div>
                        <span style={{
                          backgroundColor: '#f1f5f9',
                          color: '#64748b',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: '500'
                        }}>
                          {category.count} items
                        </span>
                      </div>
                      <CardTitle style={{ fontSize: '1.125rem', marginBottom: '4px' }}>
                        {category.name}
                      </CardTitle>
                      <CardDescription style={{ fontSize: '0.875rem' }}>
                        Manage your {category.name.toLowerCase()} information and planning details.
                      </CardDescription>
                    </CardHeader>
                    <CardContent style={{ paddingTop: 0 }}>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => handleCategorySelect(category.id)}
                        style={{ fontSize: '0.875rem' }}
                      >
                        View {category.name}
                      </Button>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default App
