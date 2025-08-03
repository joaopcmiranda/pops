import type { GlobalProvider } from '@ladle/react';
import '../apps/web/src/index.css';
import './skeleton.css';

export const Provider: GlobalProvider = ({ children }) => (
  <div className="min-h-screen bg-gray-50">
    {children}
  </div>
);