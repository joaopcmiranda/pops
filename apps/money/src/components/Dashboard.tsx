import React from 'react'
import { Card, Badge } from '@pops/ui'

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-money-primary">Money Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <h2 className="text-lg font-semibold">Total Balance</h2>
          <p className="text-2xl font-bold text-money-accent">$10,500.00</p>
          <Badge variant="outline" className="mt-2">Up 5% from last month</Badge>
        </Card>
        <Card className="p-4">
          <h2 className="text-lg font-semibold">Monthly Expenses</h2>
          <p className="text-2xl font-bold text-red-500">$2,300.00</p>
          <Badge variant="destructive" className="mt-2">Over budget</Badge>
        </Card>
        <Card className="p-4">
          <h2 className="text-lg font-semibold">Savings Goal</h2>
          <p className="text-2xl font-bold text-green-500">$5,000 / $10,000</p>
          <Badge variant="secondary" className="mt-2">50% Complete</Badge>
        </Card>
      </div>
    </div>
  )
}