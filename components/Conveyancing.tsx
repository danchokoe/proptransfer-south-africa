
import React, { useRef } from 'react';
import { UserProfile } from '../types';
import { TRANSACTION_MILESTONES } from '../constants';
import { CheckCircle2, Circle, Clock, AlertCircle, FileText, Download, Share2 } from 'lucide-react';

interface ConveyancingProps {
  user: UserProfile;
}

const Conveyancing: React.FC<ConveyancingProps> = ({ user }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDownloadStatement = () => {
    alert("Downloading current transaction statement (PDF)...");
  };

  const handleContactConveyancer = () => {
    alert(`Opening secure chat channel with conveyancers for ${user.name}...`);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      alert(`Document "${e.target.files[0].name}" uploaded successfully for verification.`);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Conveyancing Tracker</h1>
          <p className="text-slate-500">Live monitoring of your property transfer at the Deeds Office.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={handleDownloadStatement}
            className="flex items-center gap-2 bg-white border border-slate-200 px-4 py-2 rounded-lg text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Download size={18} />
            Statement
          </button>
          <button 
            onClick={handleContactConveyancer}
            className="flex items-center gap-2 bg-slate-900 px-4 py-2 rounded-lg text-sm font-semibold text-white hover:bg-slate-800 transition-colors shadow-sm shadow-slate-300"
          >
            <Share2 size={18} />
            Contact Conveyancer
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Timeline */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
          <div className="relative">
            <div className="absolute left-[19px] top-2 bottom-2 w-0.5 bg-slate-100"></div>
            
            <div className="space-y-12">
              {TRANSACTION_MILESTONES.map((m) => (
                <div key={m.id} className="relative flex gap-6 group">
                  <div className={`z-10 w-10 h-10 rounded-full flex items-center justify-center border-4 border-white shadow-sm transition-transform group-hover:scale-110 ${
                    m.status === 'completed' ? 'bg-emerald-500 text-white' :
                    m.status === 'in-progress' ? 'bg-amber-500 text-slate-900 animate-pulse' :
                    m.status === 'delayed' ? 'bg-rose-500 text-white' :
                    'bg-slate-100 text-slate-400'
                  }`}>
                    {m.status === 'completed' ? <CheckCircle2 size={20} /> : 
                     m.status === 'in-progress' ? <Clock size={20} /> :
                     m.status === 'delayed' ? <AlertCircle size={20} /> :
                     <Circle size={20} />}
                  </div>
                  
                  <div className="flex-1 pt-1">
                    <div className="flex justify-between items-start mb-1">
                      <div className="flex items-center gap-2">
                          <h3 className={`font-bold transition-colors ${m.status === 'pending' ? 'text-slate-400' : 'text-slate-900'}`}>
                            {m.label}
                          </h3>
                          <span className="text-[10px] font-bold bg-slate-100 text-slate-500 px-1.5 py-0.5 rounded uppercase tracking-wide">Week {m.week}</span>
                      </div>
                      <span className="text-xs font-medium text-slate-400">{m.updatedAt}</span>
                    </div>
                    <p className={`text-sm ${m.status === 'pending' ? 'text-slate-300' : 'text-slate-500'}`}>
                      {m.description}
                    </p>
                    <p className="text-[10px] text-amber-600 font-bold mt-1 uppercase tracking-wider">
                        Action: {m.responsibleParty}
                    </p>
                    
                    {m.status === 'in-progress' && (
                      <div className="mt-4 p-3 bg-amber-50 rounded-xl border border-amber-100 flex items-center gap-3">
                        <div className="w-8 h-8 bg-amber-200 rounded-lg flex items-center justify-center text-amber-900">
                          <FileText size={16} />
                        </div>
                        <div className="flex-1">
                          <p className="text-xs font-bold text-slate-900">Waiting for Bank Guarantee</p>
                          <div className="w-full bg-amber-200 rounded-full h-1 mt-1">
                            <div className="bg-amber-500 h-1 rounded-full w-2/3"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Legal Details & Docs */}
        <div className="space-y-6">
          <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-lg">
            <h3 className="font-bold text-lg mb-4">Transfer Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-slate-400 text-sm">Purchase Price</span>
                <span className="font-bold">R 4,500,000</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-slate-400 text-sm">Estimated Costs</span>
                <span className="font-bold">R 342,000</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/10 pb-3">
                <span className="text-slate-400 text-sm">Transfer Attorney</span>
                <span className="font-bold">Smith & Associates</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-400 text-sm">Est. Completion</span>
                <span className="font-bold text-amber-400">Dec 15, 2023</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h3 className="font-bold text-slate-900 mb-4">Document Vault</h3>
            <div className="space-y-3">
              {[
                { name: 'OTP_Signed.pdf', size: '1.2 MB', status: 'verified' },
                { name: 'FICA_ID.jpg', size: '2.4 MB', status: 'verified' },
                { name: 'Bond_Instruction.pdf', size: '0.8 MB', status: 'pending' },
              ].map((doc) => (
                <div key={doc.name} className="flex items-center justify-between p-3 bg-slate-50 rounded-xl border border-slate-100 hover:border-amber-200 transition-colors">
                  <div className="flex items-center gap-3 overflow-hidden">
                    <FileText size={18} className="text-slate-400 shrink-0" />
                    <div className="overflow-hidden">
                      <p className="text-xs font-bold text-slate-700 truncate">{doc.name}</p>
                      <p className="text-[10px] text-slate-400">{doc.size}</p>
                    </div>
                  </div>
                  {doc.status === 'verified' ? (
                    <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                  ) : (
                    <div className="w-2 h-2 bg-amber-400 rounded-full shrink-0"></div>
                  )}
                </div>
              ))}
              <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} />
              <button 
                onClick={handleUploadClick}
                className="w-full mt-2 border-2 border-dashed border-slate-200 p-3 rounded-xl text-xs font-bold text-slate-500 hover:border-amber-400 hover:text-amber-600 transition-all uppercase tracking-wider"
              >
                + Upload Document
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conveyancing;
