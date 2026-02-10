
import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Save, Bell, Lock, User, Mail, Globe, Moon } from 'lucide-react';

interface SettingsProps {
  user: UserProfile;
}

const Settings: React.FC<SettingsProps> = ({ user }) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
        {/* Header */}
        <div>
            <h1 className="text-2xl font-bold text-slate-900">Account Settings</h1>
            <p className="text-slate-500">Manage your profile, security, and preferences.</p>
        </div>

        {/* Profile Section */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <User size={20} className="text-amber-500" />
                Profile Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Full Name</label>
                    <input type="text" defaultValue={user.name} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Email Address</label>
                    <input type="email" defaultValue={user.email} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:ring-2 focus:ring-amber-500 outline-none" />
                </div>
                <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Role</label>
                    <input type="text" value={user.role.replace(/_/g, ' ')} disabled className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-500 cursor-not-allowed" />
                </div>
                 <div>
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-1">Subscription Tier</label>
                    <input type="text" value={user.subscription || 'Free'} disabled className="w-full bg-slate-100 border border-slate-200 rounded-xl px-4 py-2.5 text-sm text-slate-500 cursor-not-allowed" />
                </div>
            </div>
        </div>

        {/* Preferences */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
             <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Globe size={20} className="text-amber-500" />
                Preferences
            </h2>
            <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-slate-600 shadow-sm">
                            <Bell size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 text-sm">Push Notifications</p>
                            <p className="text-xs text-slate-500">Receive updates about your property journey.</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={notifications} onChange={() => setNotifications(!notifications)} className="sr-only peer" />
                        <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-500"></div>
                    </label>
                </div>

                <div className="flex items-center justify-between p-3 bg-slate-50 rounded-xl">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-slate-600 shadow-sm">
                            <Moon size={20} />
                        </div>
                        <div>
                            <p className="font-bold text-slate-900 text-sm">Dark Mode</p>
                            <p className="text-xs text-slate-500">Easy on the eyes for late night browsing.</p>
                        </div>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                        <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} className="sr-only peer" />
                         <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-slate-900"></div>
                    </label>
                </div>
            </div>
        </div>

        {/* Security */}
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
             <h2 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Lock size={20} className="text-amber-500" />
                Security
            </h2>
            <div className="space-y-3">
                <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-sm font-semibold text-slate-700 transition-colors flex justify-between items-center">
                    Change Password
                    <span className="text-xs text-slate-400">Last changed 3 months ago</span>
                </button>
                <button className="w-full text-left px-4 py-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-sm font-semibold text-slate-700 transition-colors flex justify-between items-center">
                    Two-Factor Authentication
                    <span className="text-xs text-emerald-600 font-bold bg-emerald-100 px-2 py-1 rounded">Enabled</span>
                </button>
            </div>
        </div>
        
        <div className="flex justify-end">
            <button className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-slate-800 shadow-lg shadow-slate-200">
                <Save size={18} />
                Save Changes
            </button>
        </div>
    </div>
  );
};

export default Settings;
    