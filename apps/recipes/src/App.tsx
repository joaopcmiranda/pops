import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { UnifiedHeader } from '@pops/navigation'
import { Card, CardContent, CardDescription, CardHeader, CardTitle, Button, Input, Badge } from '@pops/ui'
import { ChefHat, Plus, Search, Clock, Users, Star } from 'lucide-react'

function Dashboard() {
  const [recipes] = useState([
    { id: 1, title: 'Chicken Tikka Masala', cookTime: '30 min', servings: 4, rating: 4.8, tags: ['Indian', 'Spicy'] },
    { id: 2, title: 'Classic Caesar Salad', cookTime: '15 min', servings: 2, rating: 4.6, tags: ['Salad', 'Healthy'] },
    { id: 3, title: 'Beef Tacos', cookTime: '25 min', servings: 6, rating: 4.7, tags: ['Mexican', 'Quick'] },
  ])

  return (
    <main className="container mx-auto p-6 max-w-7xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <ChefHat className="h-8 w-8 text-orange-600" />
            Recipe Manager
          </h1>
          <p className="text-gray-600 mt-2">Organize your favorite recipes and plan meals</p>
        </div>
        <Button className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Recipe
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input placeholder="Search recipes..." className="pl-10" />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Recipes</p>
                <p className="text-2xl font-bold text-gray-900">127</p>
              </div>
              <ChefHat className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Favorites</p>
                <p className="text-2xl font-bold text-gray-900">23</p>
              </div>
              <Star className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Meal Plans</p>
                <p className="text-2xl font-bold text-gray-900">5</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Shopping Lists</p>
                <p className="text-2xl font-bold text-gray-900">2</p>
              </div>
              <Plus className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Recipes */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Recent Recipes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recipes.map((recipe) => (
            <Card key={recipe.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <CardTitle className="text-lg">{recipe.title}</CardTitle>
                <CardDescription>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {recipe.cookTime}
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      {recipe.servings} servings
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-500" />
                      {recipe.rating}
                    </div>
                  </div>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {recipe.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Plus className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Add New Recipe</h3>
            <p className="text-sm text-gray-600">Create and save your favorite recipes</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <Clock className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Plan Meals</h3>
            <p className="text-sm text-gray-600">Schedule meals for the week</p>
          </CardContent>
        </Card>
        <Card className="hover:shadow-lg transition-shadow cursor-pointer">
          <CardContent className="p-6 text-center">
            <ChefHat className="h-12 w-12 text-orange-600 mx-auto mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Shopping List</h3>
            <p className="text-sm text-gray-600">Generate ingredient lists</p>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <UnifiedHeader
        currentApp="recipes"
        title="Recipe Manager"
        showDomainSwitcher={true}
        showNotifications={true}
        showSearch={true}
      />
      <Router>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </div>
  )
}

export default App