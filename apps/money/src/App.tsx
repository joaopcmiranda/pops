import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { UnifiedHeader } from '@pops/navigation'
import { Dashboard } from './components/Dashboard'
import { Accounts } from './components/Accounts'
import { Transactions } from './components/Transactions'
import { Budget } from './components/Budget'
import { Reports } from './components/Reports'

import './styles/globals.css'

const MoneyApp: React.FC = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-money-background">
        <UnifiedHeader 
          currentApp="money" 
          title="Money Manager"
        />
        <main className="flex-grow p-4 mt-16">
          <Routes>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/accounts" element={<Accounts />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/budget" element={<Budget />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default MoneyApp