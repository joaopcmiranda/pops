import React from 'react'
import { Card, CardContent, CardHeader, CardTitle, Button, Input, Badge } from '@pops/ui'

export const ProfileView: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-fitness-primary">Fitness Profile</h1>

      <Card>
        <CardHeader>
          <CardTitle>Personal Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Name" />
            <Input placeholder="Age" type="number" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input placeholder="Height (cm)" type="number" />
            <Input placeholder="Weight (kg)" type="number" />
          </div>
          
          <div className="flex items-center space-x-2">
            <Badge variant="outline">Body Mass Index</Badge>
            <span className="font-semibold">22.5</span>
          </div>

          <div className="flex items-center space-x-2">
            <Badge variant="outline">Fitness Level</Badge>
            <span className="font-semibold">Intermediate</span>
          </div>

          <Button className="w-full">Update Profile</Button>
        </CardContent>
      </Card>
    </div>
  )
}