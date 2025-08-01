import { MapPin, Calendar, Plane, Home, Activity, DollarSign, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'

function App() {
  const categories = [
    { id: 'destinations', name: 'Destinations', icon: MapPin, color: 'bg-blue-500' },
    { id: 'itinerary', name: 'Itinerary', icon: Calendar, color: 'bg-green-500' },
    { id: 'transport', name: 'Transport', icon: Plane, color: 'bg-purple-500' },
    { id: 'accommodation', name: 'Accommodation', icon: Home, color: 'bg-orange-500' },
    { id: 'activities', name: 'Activities', icon: Activity, color: 'bg-red-500' },
    { id: 'budget', name: 'Budget', icon: DollarSign, color: 'bg-yellow-500' },
    { id: 'documents', name: 'Documents', icon: FileText, color: 'bg-gray-500' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            🇧🇷 Brazil Trip Organizer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your personal trip planning companion for an amazing Brazilian adventure. 
            Organize destinations, plan itineraries, track expenses, and more!
          </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {categories.map((category) => {
            const IconComponent = category.icon
            return (
              <div
                key={category.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 p-6"
              >
                <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mb-4`}>
                  <IconComponent className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Manage your {category.name.toLowerCase()} information and planning details.
                </p>
                <Button variant="outline" className="w-full">
                  View {category.name}
                </Button>
              </div>
            )
          })}
        </div>

        <div className="mt-12 bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Quick Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">0</div>
              <div className="text-sm text-gray-600">Destinations Planned</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">0</div>
              <div className="text-sm text-gray-600">Days Scheduled</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">$0</div>
              <div className="text-sm text-gray-600">Budget Allocated</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
