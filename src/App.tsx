import { MapPin, Calendar, Plane, Home, Activity, DollarSign, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

function App() {
  const categories = [
    { id: 'destinations', name: 'Destinations', icon: MapPin, color: 'icon-blue' },
    { id: 'itinerary', name: 'Itinerary', icon: Calendar, color: 'icon-green' },
    { id: 'transport', name: 'Transport', icon: Plane, color: 'icon-purple' },
    { id: 'accommodation', name: 'Accommodation', icon: Home, color: 'icon-orange' },
    { id: 'activities', name: 'Activities', icon: Activity, color: 'icon-red' },
    { id: 'budget', name: 'Budget', icon: DollarSign, color: 'icon-yellow' },
    { id: 'documents', name: 'Documents', icon: FileText, color: 'icon-gray' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-6 py-12 max-w-7xl">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🇧🇷 Brazil Trip Organizer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your personal trip planning companion for an amazing Brazilian adventure. 
            Organize destinations, plan itineraries, track expenses, and more!
          </p>
        </header>

        <div className="app-grid">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <div key={category.id} className="category-card">
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                  <div className={`${category.color}`} style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '16px'
                  }}>
                    <IconComponent style={{ width: '24px', height: '24px', color: 'white' }} />
                  </div>
                  <h3 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1f2937', margin: 0 }}>
                    {category.name}
                  </h3>
                </div>
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '20px', lineHeight: '1.5' }}>
                  Manage your {category.name.toLowerCase()} information and planning details.
                </p>
                <Button variant="outline" className="w-full">
                  View {category.name}
                </Button>
              </div>
            )
          })}
        </div>

        <Card className="mt-12">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-blue-50 rounded-lg border">
                <div className="text-2xl font-bold text-blue-600">0</div>
                <div className="text-sm text-muted-foreground">Destinations Planned</div>
              </div>
              <div className="text-center p-4 bg-green-50 rounded-lg border">
                <div className="text-2xl font-bold text-green-600">0</div>
                <div className="text-sm text-muted-foreground">Days Scheduled</div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-lg border">
                <div className="text-2xl font-bold text-yellow-600">$0</div>
                <div className="text-sm text-muted-foreground">Budget Allocated</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default App
