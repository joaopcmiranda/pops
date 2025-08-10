import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, Progress, Badge } from '@pops/ui'

export const ProgressView: React.FC = () => {
  const progressData = [
    { metric: 'Weight Loss', current: 7, goal: 15, unit: 'kg' },
    { metric: 'Muscle Gain', current: 2, goal: 5, unit: 'kg' },
    { metric: 'Running Distance', current: 15, goal: 30, unit: 'km/week' }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-fitness-primary">Progress Tracking</h1>

      <div className="space-y-6">
        {progressData.map((item, index) => (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{item.metric}</CardTitle>
              <Badge variant="outline">
                {item.current}/{item.goal} {item.unit}
              </Badge>
            </CardHeader>
            <CardContent>
              <Progress 
                value={(item.current / item.goal) * 100} 
                className="h-3"
              />
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}