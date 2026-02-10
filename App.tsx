
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Marketplace from './components/Marketplace';
import AIHub from './components/AIHub';
import Conveyancing from './components/Conveyancing';
import ComplianceCenter from './components/ComplianceCenter';
import ListingsManager from './components/ListingsManager';
import WorkflowGuide from './components/WorkflowGuide';
import Settings from './components/Settings';
import { UserProfile, Property } from './types';
import { MOCK_USERS, MOCK_PROPERTIES } from './constants';
import { Bell, Search as SearchIcon, ChevronDown } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [user, setUser] = useState<UserProfile>(MOCK_USERS[0]);
  
  // Simulated Backend State
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);
  const [cart, setCart] = useState<string[]>([]);

  const handleUserChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUser = MOCK_USERS.find(u => u.id === e.target.value);
    if (selectedUser) {
      setUser(selectedUser);
      setActiveTab('dashboard');
    }
  };

  const handleAddProperty = (newProperty: Property) => {
    setProperties(prev => [newProperty, ...prev]);
  };

  const handleAddToCart = (propertyId: string) => {
    if (!cart.includes(propertyId)) {
      setCart(prev => [...prev, propertyId]);
      // Also update local user state for UI consistency if needed
      setUser(prev => ({ ...prev, cart: [...(prev.cart || []), propertyId] }));
    }
  };

  const handleNavigate = (tabId: string) => {
    setActiveTab(tabId);
  };

  const handleLogout = () => {
    if (window.confirm("Are you sure you want to log out?")) {
        // Reset to default state simulation
        setUser(MOCK_USERS[0]);
        setActiveTab('dashboard');
        alert("You have been logged out securely.");
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard user={user} onNavigate={handleNavigate} />;
      case 'workflow-guide':
        return <WorkflowGuide />;
      case 'marketplace':
        return (
          <Marketplace 
            user={user} 
            properties={properties}
            cart={cart}
            onAddToCart={handleAddToCart}
            onNavigateToCompliance={() => setActiveTab('profile-setup')} 
          />
        );
      case 'listings':
        return (
          <ListingsManager 
            user={user} 
            properties={properties}
            onCreateListing={handleAddProperty}
          />
        );
      case 'ai-insights':
        return <AIHub user={user} />;
      case 'conveyancing':
        return <Conveyancing user={user} />;
      case 'profile-setup':
        return <ComplianceCenter user={user} />;
      case 'settings':
        return <Settings user={user} />;
      default:
        return <Dashboard user={user} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar 
        role={user.role} 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onSettings={() => setActiveTab('settings')}
        onLogout={handleLogout}
      />
      
      <main className="flex-1 ml-64">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 h-16 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center bg-slate-100 rounded-full px-4 py-2 w-96">
            <SearchIcon size={18} className="text-slate-400" />
            <input 
              type="text" 
              placeholder="Search properties, documents, or help..." 
              className="bg-transparent border-none outline-none ml-2 text-sm w-full"
            />
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 border-r border-slate-200 pr-6">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Switch Profile:</span>
              <div className="relative">
                <select 
                  value={user.id} 
                  onChange={handleUserChange}
                  className="appearance-none text-sm bg-amber-50 text-amber-700 font-medium pl-3 pr-8 py-1.5 rounded-lg border border-amber-100 outline-none focus:ring-2 focus:ring-amber-500 transition-all cursor-pointer"
                >
                  {MOCK_USERS.map(u => (
                    <option key={u.id} value={u.id}>{u.name} ({u.role.replace('_', ' ')})</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-amber-500 pointer-events-none" />
              </div>
            </div>
            
            <button className="text-slate-500 hover:text-amber-600 relative p-2 rounded-full hover:bg-slate-50 transition-colors">
              <Bell size={20} />
              {cart.length > 0 && (
                 <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
              )}
            </button>
            
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900 leading-tight">{user.name}</p>
                <p className="text-[10px] font-semibold text-amber-600 uppercase tracking-widest">{user.role.replace('_', ' ')}</p>
              </div>
              <div className="w-10 h-10 bg-slate-900 text-white rounded-xl shadow-md flex items-center justify-center font-bold text-sm">
                {user.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="p-8">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default App;
    