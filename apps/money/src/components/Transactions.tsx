import React from 'react'
import { Card, Badge } from '@pops/ui'

export const Transactions: React.FC = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-money-primary">Transactions</h1>
      <Card className="p-4">
        <div className="space-y-3">
          <div className="grid grid-cols-4 gap-4 font-semibold border-b pb-2">
            <span>Date</span>
            <span>Description</span>
            <span>Amount</span>
            <span>Category</span>
          </div>
          <div className="grid grid-cols-4 gap-4 items-center">
            <span>2025-08-10</span>
            <span>Grocery Shopping</span>
            <span className="text-red-500">-$120.50</span>
            <div><Badge variant="outline">Food</Badge></div>
          </div>
          <div className="grid grid-cols-4 gap-4 items-center">
            <span>2025-08-09</span>
            <span>Salary Deposit</span>
            <span className="text-green-500">+$4,500.00</span>
            <div><Badge variant="secondary">Income</Badge></div>
          </div>
        </div>
      </Card>
    </div>
  )
}