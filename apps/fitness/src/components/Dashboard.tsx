import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, Progress, Button } from '@pops/ui'

export const Dashboard: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-fitness-primary">Fitness Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Daily Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium">Workout Goal</h3>
                <Progress value={65} className="mt-2" />
              </div>
              <div>
                <h3 className="text-sm font-medium">Calories Burned</h3>
                <Progress value={45} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Workouts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="p-4 bg-gray-50 rounded text-center">
              <p className="text-gray-600">Calendar placeholder</p>
            </div>
            <Button className="w-full mt-4">Schedule Workout</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}