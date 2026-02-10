
import React from 'react';
import { UserProfile, UserRole } from '../types';
import { TrendingUp, FileText, CheckCircle, Clock, Zap, ArrowRight, Home, Users, Briefcase, Paintbrush, ShieldCheck, Building, Star, Scale, FileCheck, Landmark, BadgeCheck } from 'lucide-react';

interface DashboardProps {
  user: UserProfile;
  onNavigate?: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onNavigate }) => {
  const getRoleStats = (role: UserRole) => {
    switch (role) {
      case UserRole.BUYER:
        return [
          { label: 'Cart Items', value: user.cart?.length?.toString() || '0', icon: Home, color: 'text-amber-600', bg: 'bg-amber-100', target: 'marketplace' },
          { label: 'Pre-Qual', value: user.documents.bankStatements ? 'Ready' : 'Pending', icon: Zap, color: 'text-slate-600', bg: 'bg-slate-100', target: 'profile-setup' },
          { label: 'OTP Status', value: 'Draft', icon: FileText, color: 'text-emerald-600', bg: 'bg-emerald-100', target: 'conveyancing' },
          { label: 'Transfer', value: 'Week 1', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', target: 'conveyancing' },
        ];
      case UserRole.SELLER:
        return [
          { label: 'Mandate', value: user.documents.mandate ? 'Signed' : 'Pending', icon: FileCheck, color: 'text-amber-600', bg: 'bg-amber-100', target: 'listings' },
          { label: 'Shortfall', value: 'Clear', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-100', target: 'conveyancing' },
          { label: 'Viewings', value: '12', icon: Users, color: 'text-slate-600', bg: 'bg-slate-100', target: 'listings' },
          { label: 'Offers', value: '2', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-50', target: 'conveyancing' },
        ];
      case UserRole.REAL_ESTATE_AGENT:
      case UserRole.AGENCY:
        return [
          { label: 'Mandates', value: '12', icon: Home, color: 'text-amber-600', bg: 'bg-amber-100', target: 'listings' },
          { label: 'Pre-Qual Buyers', value: '8', icon: Users, color: 'text-slate-600', bg: 'bg-slate-100', target: 'listings' },
          { label: 'Showdays', value: '3', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', target: 'listings' },
          { label: 'Comm. Due', value: 'R 185k', icon: Zap, color: 'text-emerald-600', bg: 'bg-emerald-100', target: 'conveyancing' },
        ];
      case UserRole.CONVEYANCER:
        return [
          { label: 'Transfers', value: '14', icon: Briefcase, color: 'text-amber-600', bg: 'bg-amber-100', target: 'conveyancing' },
          { label: 'Lodgements', value: '3', icon: FileText, color: 'text-slate-600', bg: 'bg-slate-100', target: 'conveyancing' },
          { label: 'Clearance', value: 'Pending', icon: Building, color: 'text-amber-600', bg: 'bg-amber-50', target: 'rates' },
          { label: 'Registrations', value: '5', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100', target: 'conveyancing' },
        ];
      case UserRole.BOND_ORIGINATOR:
        return [
          { label: 'New Leads', value: '42', icon: Users, color: 'text-amber-600', bg: 'bg-amber-100', target: 'applications' },
          { label: 'Submitted', value: '18', icon: FileText, color: 'text-slate-600', bg: 'bg-slate-100', target: 'applications' },
          { label: 'Approvals', value: '15', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100', target: 'applications' },
          { label: 'Conversion', value: '64%', icon: TrendingUp, color: 'text-amber-600', bg: 'bg-amber-50', target: 'ai-insights' },
        ];
      case UserRole.BANK:
        return [
          { label: 'Bond Apps', value: '156', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-100', target: 'applications' },
          { label: 'Risk Flags', value: '2', icon: ShieldCheck, color: 'text-rose-600', bg: 'bg-rose-100', target: 'compliance' },
          { label: 'Guarantees', value: '45', icon: FileCheck, color: 'text-emerald-600', bg: 'bg-emerald-100', target: 'conveyancing' },
          { label: 'Disbursed', value: 'R 12M', icon: Landmark, color: 'text-slate-600', bg: 'bg-slate-100', target: 'conveyancing' },
        ];
      case UserRole.REGULATORY:
        return [
          { label: 'Audited', value: '1,204', icon: Users, color: 'text-amber-600', bg: 'bg-amber-100', target: 'compliance' },
          { label: 'Compliant', value: '98%', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-100', target: 'compliance' },
          { label: 'Complaints', value: '3', icon: Scale, color: 'text-rose-600', bg: 'bg-rose-100', target: 'compliance' },
          { label: 'SLA Active', value: 'Yes', icon: FileCheck, color: 'text-slate-600', bg: 'bg-slate-100', target: 'profile-setup' },
        ];
      case UserRole.MUNICIPAL:
        return [
          { label: 'Rate Req', value: '85', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-100', target: 'rates' },
          { label: 'Clearance', value: '62', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100', target: 'rates' },
          { label: 'Valuations', value: '12', icon: Home, color: 'text-amber-600', bg: 'bg-amber-50', target: 'rates' },
          { label: 'Revenue', value: 'R 4.2M', icon: Landmark, color: 'text-slate-600', bg: 'bg-slate-100', target: 'rates' },
        ];
      case UserRole.DEEDS_OFFICE:
        return [
          { label: 'Lodgements', value: '342', icon: FileText, color: 'text-amber-600', bg: 'bg-amber-100', target: 'conveyancing' },
          { label: 'Exams', value: '210', icon:  ShieldCheck, color: 'text-slate-600', bg: 'bg-slate-100', target: 'conveyancing' },
          { label: 'Rejections', value: '15', icon: Scale, color: 'text-rose-600', bg: 'bg-rose-100', target: 'conveyancing' },
          { label: 'Registered', value: '128', icon: CheckCircle, color: 'text-emerald-600', bg: 'bg-emerald-100', target: 'conveyancing' },
        ];
      default:
        return [];
    }
  };

  const stats = getRoleStats(user.role);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
             <h1 className="text-3xl font-bold text-slate-900">Hello, {user.name.split(' ')[0]}</h1>
             {user.biometricsVerified && <ShieldCheck size={20} className="text-emerald-500" title="Biometrics Verified" />}
          </div>
          
          <div className="flex items-center gap-2 text-slate-500 font-medium">
             <span>Role: <span className="text-amber-600 font-bold">{user.role.replace(/_/g, ' ')}</span></span>
             {user.subscription && (
               <span className="bg-amber-50 text-amber-700 text-xs px-2 py-0.5 rounded-full border border-amber-100 font-bold">
                 {user.subscription}
               </span>
             )}
             {user.documents.ffc && (
                <span className="flex items-center gap-1 bg-slate-100 text-slate-700 text-xs px-2 py-0.5 rounded-full border border-slate-200">
                  <BadgeCheck size={12} /> FFC
                </span>
             )}
          </div>
        </div>
        <div className="bg-white px-4 py-2 rounded-xl border border-slate-200 flex items-center gap-3 shadow-sm">
          <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
          <span className="text-sm font-semibold text-slate-600">PropTransfer Network Online</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <div 
            key={stat.label} 
            onClick={() => stat.target && onNavigate?.(stat.target)}
            className={`bg-white p-6 rounded-2xl border border-slate-200 shadow-sm transition-all duration-300 group ${stat.target ? 'cursor-pointer hover:shadow-lg hover:border-amber-400 active:scale-95' : ''}`}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bg} p-2.5 rounded-xl ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <div className="text-[10px] font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded-md uppercase tracking-wider group-hover:text-amber-500">Live</div>
            </div>
            <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">{stat.label}</p>
            <p className="text-3xl font-black text-slate-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-xl text-slate-900">Workflow Tracker</h3>
              <button 
                onClick={() => onNavigate?.('workflow-guide')}
                className="text-amber-600 text-sm font-bold hover:bg-amber-50 px-3 py-1.5 rounded-lg transition-colors"
              >
                Full History
              </button>
            </div>
            <div className="relative pl-10 space-y-8 before:content-[''] before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-1 before:bg-slate-50">
              {[
                { label: 'Phase 1: Mandate & Pre-qualification', status: 'Completed', date: 'Week 1', done: true, icon: CheckCircle },
                { label: 'Phase 2: OTP & Instructions', status: 'Completed', date: 'Week 2', done: true, icon: FileText },
                { label: 'Phase 3: Bond & Transfer Docs', status: 'In Progress', date: 'Week 3', done: false, icon: Clock },
                { label: 'Phase 4: Guarantees & Clearance', status: 'Pending', date: 'Week 4', done: false, icon: Zap },
              ].map((item, idx) => (
                <div key={idx} className="relative">
                  <div className={`absolute -left-10 w-10 h-10 rounded-full border-4 border-white shadow-md flex items-center justify-center transition-all ${item.done ? 'bg-emerald-500 text-white' : item.status === 'In Progress' ? 'bg-amber-500 text-slate-900 shadow-amber-100' : 'bg-slate-100 text-slate-300'}`}>
                    <item.icon size={16} />
                  </div>
                  <div className="flex justify-between items-center bg-slate-50/50 hover:bg-slate-50 p-4 rounded-xl border border-transparent hover:border-slate-100 transition-all cursor-default">
                    <div>
                      <p className={`font-bold text-sm ${item.done ? 'text-slate-900' : 'text-slate-600'}`}>{item.label}</p>
                      <p className="text-xs font-medium text-slate-400 mt-0.5">{item.status}</p>
                    </div>
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{item.date}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
           {/* Actions Card based on Role */}
           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-lg text-slate-900 mb-4">Required Actions</h3>
            <div className="space-y-3">
              {user.role === UserRole.BUYER && (
                <>
                  <button 
                    onClick={() => onNavigate?.('profile-setup')}
                    className="w-full flex items-center justify-between p-3 bg-amber-50 text-amber-700 rounded-xl text-sm font-semibold hover:bg-amber-100 transition-colors"
                  >
                    <span>Upload FICA Docs</span>
                    <ArrowRight size={16} />
                  </button>
                  <button 
                    onClick={() => onNavigate?.('marketplace')}
                    className="w-full flex items-center justify-between p-3 bg-slate-50 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-100 transition-colors"
                  >
                    <span>Checkout Cart</span>
                    <ArrowRight size={16} />
                  </button>
                </>
              )}
               {user.role === UserRole.SELLER && (
                <>
                   <button 
                    onClick={() => onNavigate?.('listings')}
                    className="w-full flex items-center justify-between p-3 bg-amber-50 text-amber-700 rounded-xl text-sm font-semibold hover:bg-amber-100 transition-colors"
                   >
                    <span>Complete Disclosure</span>
                    <ArrowRight size={16} />
                  </button>
                  <button 
                    onClick={() => onNavigate?.('conveyancing')}
                    className="w-full flex items-center justify-between p-3 bg-slate-50 text-slate-700 rounded-xl text-sm font-semibold hover:bg-slate-100 transition-colors"
                  >
                    <span>Review Offer #2</span>
                    <ArrowRight size={16} />
                  </button>
                </>
              )}
              {(user.role !== UserRole.BUYER && user.role !== UserRole.SELLER) && (
                 <button className="w-full flex items-center justify-between p-3 bg-amber-50 text-amber-700 rounded-xl text-sm font-semibold hover:bg-amber-100 transition-colors">
                    <span>Process Queue</span>
                    <ArrowRight size={16} />
                  </button>
              )}
            </div>
           </div>

          {(user.role === UserRole.SELLER || user.role === UserRole.REAL_ESTATE_AGENT) && (
            <div className="bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:rotate-12 transition-transform">
                <Paintbrush size={48} className="text-amber-500" />
              </div>
              <h3 className="font-bold text-white mb-2 flex items-center gap-2">
                <Paintbrush size={18} className="text-amber-500" />
                Property Doctor
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Use AI to generate a list of minor renovations and staging tips to increase value by up to 10%.
              </p>
              <button 
                onClick={() => onNavigate?.('ai-insights')}
                className="text-[10px] font-black text-amber-500 uppercase tracking-widest hover:underline flex items-center gap-1"
              >
                Start Analysis
                <ArrowRight size={12} />
              </button>
            </div>
          )}

          {/* Service Rating Widget */}
          {user.rating && (
              <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-lg">
                 <div className="flex justify-between items-center mb-4">
                   <h3 className="font-bold text-sm uppercase tracking-wider">Service Rating</h3>
                   <div className="bg-white/10 px-2 py-1 rounded text-xs font-bold">{user.rating.average}/5</div>
                 </div>
                 <div className="flex gap-1 mb-4">
                   {[1,2,3,4,5].map(i => <Star key={i} size={16} className={`${i <= Math.round(user.rating!.average) ? 'text-amber-400 fill-amber-400' : 'text-slate-600'}`} />)}
                 </div>
                 
                 <div className="space-y-2 text-xs text-slate-400">
                    <div className="flex justify-between">
                        <span>Professionalism</span>
                        <span className="text-white font-bold">{user.rating.metrics.professionalism}</span>
                    </div>
                    <div className="flex justify-between">
                        <span>Turnaround Time</span>
                        <span className="text-white font-bold">{user.rating.metrics.turnaround}</span>
                    </div>
                 </div>
              </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
