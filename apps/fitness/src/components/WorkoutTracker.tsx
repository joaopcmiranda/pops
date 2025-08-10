import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, Input, Button, Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, Badge } from '@pops/ui'

export const WorkoutTracker: React.FC = () => {
  const [workouts] = useState([
    { id: 1, type: 'Cardio', duration: 45, calories: 350 },
    { id: 2, type: 'Strength', duration: 60, calories: 450 }
  ])

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-fitness-primary">Workout Tracker</h1>

      <Dialog>
        <DialogTrigger asChild>
          <Button>Add New Workout</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Log New Workout</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <Input placeholder="Workout Type (e.g., Cardio, Strength, Yoga)" />
            <Input placeholder="Duration (minutes)" type="number" />
            <Input placeholder="Calories Burned" type="number" />
            <Button>Save Workout</Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="mt-6 space-y-4">
        {workouts.map(workout => (
          <Card key={workout.id}>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>{workout.type} Workout</CardTitle>
              <Badge variant="outline">
                {workout.calories} cal
              </Badge>
            </CardHeader>
            <CardContent>
              <p>Duration: {workout.duration} minutes</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}