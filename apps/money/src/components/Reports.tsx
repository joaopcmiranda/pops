import React from 'react'
import { Card, Badge } from '@pops/ui'

export const Reports: React.FC = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-money-primary">Financial Reports</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h2 className="text-lg font-semibold">Monthly Summary</h2>
          <div className="space-y-2 mt-2">
            <div className="flex justify-between">
              <span>Total Income</span>
              <Badge variant="outline">$4,500.00</Badge>
            </div>
            <div className="flex justify-between">
              <span>Total Expenses</span>
              <Badge variant="destructive">$2,300.00</Badge>
            </div>
            <div className="flex justify-between">
              <span>Net Savings</span>
              <Badge variant="default">$2,200.00</Badge>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <h2 className="text-lg font-semibold">Category Breakdown</h2>
          <div className="space-y-2 mt-2">
            <div className="flex justify-between">
              <span>Food</span>
              <Badge variant="outline">$450.00</Badge>
            </div>
            <div className="flex justify-between">
              <span>Transportation</span>
              <Badge variant="outline">$250.00</Badge>
            </div>
            <div className="flex justify-between">
              <span>Entertainment</span>
              <Badge variant="outline">$200.00</Badge>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}