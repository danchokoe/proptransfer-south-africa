
import React from 'react';
import { Home, Search, FileText, BarChart2, Shield, Settings, LogOut, MessageSquare, Building2, Gavel, FileCheck, Fingerprint, BookOpen } from 'lucide-react';
import { UserRole } from '../types';

interface SidebarProps {
  role: UserRole;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onSettings?: () => void;
  onLogout?: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ role, activeTab, setActiveTab, onSettings, onLogout }) => {
  const menuItems = [
    { 
      id: 'dashboard', 
      label: 'Dashboard', 
      icon: Home, 
      roles: Object.values(UserRole) // All roles
    },
    { 
      id: 'workflow-guide', 
      label: 'Workflow Guide', 
      icon: BookOpen, 
      roles: Object.values(UserRole) // All roles
    },
    { 
      id: 'marketplace', 
      label: 'Marketplace', 
      icon: Search, 
      roles: [UserRole.BUYER, UserRole.REAL_ESTATE_AGENT, UserRole.AGENCY] 
    },
    { 
      id: 'listings', 
      label: 'My Listings', 
      icon: FileText, 
      roles: [UserRole.SELLER, UserRole.REAL_ESTATE_AGENT, UserRole.AGENCY] 
    },
    { 
      id: 'applications', 
      label: 'Bond Apps', 
      icon: BarChart2, 
      roles: [UserRole.BOND_ORIGINATOR, UserRole.BUYER, UserRole.BANK] 
    },
    { 
      id: 'conveyancing', 
      label: 'Transfers', 
      icon: Shield, 
      roles: [UserRole.CONVEYANCER, UserRole.BUYER, UserRole.SELLER, UserRole.REAL_ESTATE_AGENT, UserRole.AGENCY, UserRole.DEEDS_OFFICE] 
    },
    { 
      id: 'compliance', 
      label: 'Compliance', 
      icon: FileCheck, 
      roles: [UserRole.REGULATORY, UserRole.REAL_ESTATE_AGENT, UserRole.AGENCY, UserRole.CONVEYANCER] 
    },
    { 
      id: 'rates', 
      label: 'Rates & Taxes', 
      icon: Building2, 
      roles: [UserRole.MUNICIPAL, UserRole.CONVEYANCER] 
    },
    { 
      id: 'ai-insights', 
      label: 'AI Hub', 
      icon: MessageSquare, 
      roles: [UserRole.BUYER, UserRole.SELLER, UserRole.REAL_ESTATE_AGENT, UserRole.AGENCY] 
    },
    {
      id: 'profile-setup',
      label: 'Profile & Security',
      icon: Fingerprint,
      roles: Object.values(UserRole) // All roles need profile setup
    }
  ];

  const filteredItems = menuItems.filter(item => item.roles.includes(role));

  return (
    <div className="w-64 h-screen bg-slate-900 text-white flex flex-col fixed left-0 top-0 z-50 border-r border-slate-800">
      <div className="p-6">
        <div className="flex items-center gap-2 mb-8">
          <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg shadow-amber-900/20 text-slate-900">P</div>
          <span className="text-xl font-bold tracking-tight">PropTransfer <span className="text-xs text-amber-500 font-normal">ZA</span></span>
        </div>
        
        <nav className="space-y-1">
          {filteredItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === item.id 
                ? 'bg-amber-500 text-slate-900 shadow-md font-bold' 
                : 'text-slate-400 hover:bg-slate-800 hover:text-amber-500'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-800">
        <div className="mb-4 flex items-center gap-2 px-2">
           <div className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></div>
           <span className="text-xs text-slate-400 font-mono">System Online</span>
        </div>
        <button 
          onClick={onSettings}
          className={`flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white transition-colors w-full ${activeTab === 'settings' ? 'bg-slate-800 text-white rounded-lg' : ''}`}
        >
          <Settings size={20} />
          <span>Settings</span>
        </button>
        <button 
          onClick={onLogout}
          className="flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-rose-400 transition-colors w-full mt-1"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
    