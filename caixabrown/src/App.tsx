import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Dashboard from './pages/Dashboard';
import ProductManagement from './pages/ProductManagement';
import Settings from './pages/Settings';
import CustomerManagement from './pages/CustomerManagement';
import Navbar from './components/layout/Navbar';
import SyncStatus from './components/common/SyncStatus';

function App() {
  return (
    <AppProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Navbar />
          <main className="flex-grow p-4">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/products" element={<ProductManagement />} />
              <Route path="/customers" element={<CustomerManagement />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </main>
          <SyncStatus />
        </div>
      </Router>
    </AppProvider>
  );
}

export default App;