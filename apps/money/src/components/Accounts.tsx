import React from 'react'
import { Card } from '@pops/ui'

export const Accounts: React.FC = () => {
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold text-money-primary">Accounts</h1>
      <Card className="p-4">
        <div className="space-y-3">
          <div className="grid grid-cols-3 gap-4 font-semibold border-b pb-2">
            <span>Account</span>
            <span>Balance</span>
            <span>Type</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <span>Checking</span>
            <span>$5,600.00</span>
            <span>Primary</span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <span>Savings</span>
            <span>$4,900.00</span>
            <span>Emergency Fund</span>
          </div>
        </div>
      </Card>
    </div>
  )
}