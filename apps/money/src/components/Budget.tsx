import React from 'react'
import { Card, Progress, Badge } from '@pops/ui'

export const Budget: React.FC = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-money-primary">Budget</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h2 className="text-lg font-semibold">Food</h2>
          <Progress value={75} className="mt-2" />
          <div className="flex justify-between mt-2">
            <Badge variant="outline">$450 / $600</Badge>
            <Badge variant="destructive">Over Budget</Badge>
          </div>
        </Card>
        <Card className="p-4">
          <h2 className="text-lg font-semibold">Entertainment</h2>
          <Progress value={40} className="mt-2" />
          <div className="flex justify-between mt-2">
            <Badge variant="outline">$200 / $500</Badge>
            <Badge variant="default">On Track</Badge>
          </div>
        </Card>
      </div>
    </div>
  )
}