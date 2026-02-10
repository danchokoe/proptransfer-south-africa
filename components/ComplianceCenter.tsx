
import React, { useState, useEffect } from 'react';
import { UserProfile, UserRole } from '../types';
import { 
  ShieldCheck, Fingerprint, ScanFace, Upload, CheckCircle2, 
  AlertCircle, FileText, CreditCard, ChevronRight, Lock, 
  Briefcase, Check, Sparkles
} from 'lucide-react';

interface ComplianceCenterProps {
  user: UserProfile;
}

const ComplianceCenter: React.FC<ComplianceCenterProps> = ({ user }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [scanning, setScanning] = useState(false);
  const [biometricsDone, setBiometricsDone] = useState(user.biometricsVerified || false);
  
  // Mock document state
  const [docs, setDocs] = useState({
    fica: user.documents.ficaForm,
    popia: user.documents.popiaConsent,
    id: user.documents.idCopy,
    bank: user.documents.bankStatements,
    ffc: user.documents.ffc
  });

  const [selectedPlan, setSelectedPlan] = useState(user.subscription || null);

  const isProfessional = [UserRole.REAL_ESTATE_AGENT, UserRole.AGENCY, UserRole.CONVEYANCER, UserRole.BOND_ORIGINATOR].includes(user.role);
  
  const totalSteps = isProfessional ? 3 : 2;

  // Fix logic for visual demo:
  const requiredDocs = [
    { key: 'id', label: 'ID / Passport Copy', required: true },
    { key: 'fica', label: 'FICA Declaration', required: true },
    { key: 'popia', label: 'POPIA Consent', required: true },
    ...(user.role === UserRole.BUYER ? [{ key: 'bank', label: '3 Months Bank Statements', required: true }] : []),
    ...(isProfessional ? [{ key: 'ffc', label: 'Fidelity Fund Certificate', required: true }] : [])
  ];
  
  const docsCompleted = requiredDocs.every(d => docs[d.key as keyof typeof docs]);

  useEffect(() => {
    if (biometricsDone && activeStep === 1) {
      setTimeout(() => setActiveStep(2), 800);
    }
  }, [biometricsDone, activeStep]);

  useEffect(() => {
    if (docsCompleted && activeStep === 2 && isProfessional) {
       setTimeout(() => setActiveStep(3), 800);
    }
  }, [docsCompleted, activeStep, isProfessional]);

  const simulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
      setBiometricsDone(true);
    }, 2000);
  };

  const toggleDoc = (key: keyof typeof docs) => {
    setDocs(prev => ({...prev, [key]: !prev[key]}));
  };

  const getProgress = () => {
    let completed = 0;
    if (biometricsDone) completed++;
    if (docsCompleted) completed++;
    if (isProfessional && selectedPlan) completed++;
    if (!isProfessional && docsCompleted) completed++; // Normalize for non-pros
    return Math.min(100, Math.round((completed / totalSteps) * 100));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      
      {/* Header Card */}
      <div className="bg-slate-900 text-white p-8 rounded-3xl relative overflow-hidden shadow-xl">
        <div className="relative z-10 flex justify-between items-end">
          <div>
            <div className="flex items-center gap-2 mb-2">
               <ShieldCheck className="text-emerald-400" size={24} />
               <span className="text-emerald-400 font-bold text-sm uppercase tracking-wider">Verification Center</span>
            </div>
            <h1 className="text-3xl font-bold mb-2">Complete Your Profile</h1>
            <p className="text-slate-400 max-w-md">
              To ensure a safe marketplace, PropTransfer requires all users to be verified before transacting.
            </p>
          </div>
          <div className="text-right hidden md:block">
             <div className="text-4xl font-black text-amber-500">{getProgress()}%</div>
             <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Completed</div>
          </div>
        </div>
        
        {/* Progress Bar */}
        <div className="absolute bottom-0 left-0 w-full h-1.5 bg-slate-800">
           <div 
             className="h-full bg-gradient-to-r from-emerald-500 to-amber-500 transition-all duration-1000 ease-out" 
             style={{ width: `${getProgress()}%` }}
           ></div>
        </div>

        {/* Decorative elements */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none"></div>
      </div>

      {/* Steps Container */}
      <div className="space-y-4">
        
        {/* STEP 1: Biometrics */}
        <div className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${activeStep === 1 ? 'border-amber-500 shadow-md ring-1 ring-amber-100' : 'border-slate-200'}`}>
          <div 
            className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
            onClick={() => setActiveStep(1)}
          >
             <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${biometricsDone ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                   {biometricsDone ? <Check size={20} /> : '1'}
                </div>
                <div>
                   <h3 className={`font-bold text-lg ${biometricsDone ? 'text-slate-900' : 'text-slate-700'}`}>Identity Verification</h3>
                   {!biometricsDone && activeStep !== 1 && <p className="text-sm text-slate-500">Biometric setup required</p>}
                   {biometricsDone && <p className="text-xs text-emerald-600 font-bold flex items-center gap-1"><ShieldCheck size={12}/> Biometrics Verified</p>}
                </div>
             </div>
             <ChevronRight size={20} className={`text-slate-300 transition-transform ${activeStep === 1 ? 'rotate-90' : ''}`} />
          </div>

          {activeStep === 1 && (
            <div className="px-5 pb-8 pl-[4.5rem] animate-in slide-in-from-top-2">
               <p className="text-sm text-slate-500 mb-6 max-w-lg">
                 We use bank-grade facial recognition to verify your identity. This protects your property assets and prevents fraud.
               </p>
               
               {!biometricsDone ? (
                <button 
                  onClick={simulateScan}
                  disabled={scanning}
                  className="bg-slate-900 text-white px-8 py-4 rounded-xl font-bold flex items-center gap-3 hover:bg-slate-800 transition-all shadow-lg active:scale-95 disabled:opacity-80"
                >
                  {scanning ? (
                    <>
                      <div className="relative">
                         <ScanFace size={24} className="animate-pulse text-amber-500" />
                         <div className="absolute inset-0 bg-amber-500/20 animate-ping rounded-full"></div>
                      </div>
                      <span>Verifying Identity...</span>
                    </>
                  ) : (
                    <>
                      <Fingerprint size={24} className="text-amber-500" />
                      <span>Start Biometric Scan</span>
                    </>
                  )}
                </button>
               ) : (
                 <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-xl flex items-center gap-3 text-emerald-800 max-w-md">
                    <CheckCircle2 size={24} className="text-emerald-500" />
                    <div>
                       <p className="font-bold text-sm">Verification Successful</p>
                       <p className="text-xs text-emerald-600">Your digital identity token has been minted.</p>
                    </div>
                 </div>
               )}
            </div>
          )}
        </div>

        {/* STEP 2: Documentation */}
        <div className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${activeStep === 2 ? 'border-amber-500 shadow-md ring-1 ring-amber-100' : 'border-slate-200'}`}>
           <div 
            className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
            onClick={() => setActiveStep(2)}
           >
             <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${docsCompleted ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                   {docsCompleted ? <Check size={20} /> : '2'}
                </div>
                <div>
                   <h3 className="font-bold text-lg text-slate-900">Regulatory Compliance</h3>
                   {docsCompleted 
                     ? <p className="text-xs text-emerald-600 font-bold flex items-center gap-1"><FileText size={12}/> All Documents Approved</p>
                     : <p className="text-sm text-slate-500">FICA & POPIA Documentation</p>
                   }
                </div>
             </div>
             <ChevronRight size={20} className={`text-slate-300 transition-transform ${activeStep === 2 ? 'rotate-90' : ''}`} />
          </div>

          {activeStep === 2 && (
             <div className="px-5 pb-8 pl-[4.5rem] animate-in slide-in-from-top-2">
               <p className="text-sm text-slate-500 mb-6">
                 Please upload clear copies of the following documents. Click to simulate upload.
               </p>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {requiredDocs.map((doc) => (
                    <div 
                      key={doc.key}
                      onClick={() => toggleDoc(doc.key as keyof typeof docs)}
                      className={`p-4 rounded-xl border-2 border-dashed cursor-pointer transition-all flex items-center justify-between group ${
                        docs[doc.key as keyof typeof docs] 
                        ? 'bg-emerald-50 border-emerald-200' 
                        : 'bg-slate-50 border-slate-200 hover:border-amber-400 hover:bg-amber-50'
                      }`}
                    >
                       <div className="flex items-center gap-3">
                          <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${docs[doc.key as keyof typeof docs] ? 'bg-white text-emerald-500' : 'bg-white text-slate-400'}`}>
                             <FileText size={16} />
                          </div>
                          <div>
                             <p className={`text-xs font-bold ${docs[doc.key as keyof typeof docs] ? 'text-emerald-900' : 'text-slate-700'}`}>{doc.label}</p>
                             <p className="text-[10px] text-slate-400">{docs[doc.key as keyof typeof docs] ? 'Uploaded & Verified' : 'Tap to upload'}</p>
                          </div>
                       </div>
                       {docs[doc.key as keyof typeof docs] ? (
                         <CheckCircle2 size={18} className="text-emerald-500" />
                       ) : (
                         <Upload size={18} className="text-slate-300 group-hover:text-amber-500" />
                       )}
                    </div>
                  ))}
               </div>
             </div>
          )}
        </div>

        {/* STEP 3: Subscription (Professional Only) */}
        {isProfessional && (
          <div className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${activeStep === 3 ? 'border-amber-500 shadow-md ring-1 ring-amber-100' : 'border-slate-200'}`}>
            <div 
              className="p-5 flex items-center justify-between cursor-pointer hover:bg-slate-50 transition-colors"
              onClick={() => setActiveStep(3)}
            >
              <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-colors ${selectedPlan ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-500'}`}>
                    {selectedPlan ? <Check size={20} /> : '3'}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg text-slate-900">Professional Package</h3>
                    {selectedPlan 
                      ? <p className="text-xs text-amber-600 font-bold uppercase tracking-wider">{selectedPlan} Plan Active</p>
                      : <p className="text-sm text-slate-500">Select your subscription tier</p>
                    }
                  </div>
              </div>
              <ChevronRight size={20} className={`text-slate-300 transition-transform ${activeStep === 3 ? 'rotate-90' : ''}`} />
            </div>

            {activeStep === 3 && (
              <div className="px-5 pb-8 pl-0 md:pl-[4.5rem] animate-in slide-in-from-top-2">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                   {[
                     { name: 'Beginner', price: 'Free', features: ['3 Listings', 'Standard Support'] },
                     { name: 'Professional', price: 'R499', features: ['15 Listings', 'Priority Support', 'Market Reports'], popular: true },
                     { name: 'Expert', price: 'R999', features: ['Unlimited Listings', 'AI Tools', 'Dedicated Account Mgr'] }
                   ].map(plan => (
                     <div 
                        key={plan.name}
                        onClick={() => setSelectedPlan(plan.name)}
                        className={`relative p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          selectedPlan === plan.name 
                          ? 'border-amber-500 bg-amber-50' 
                          : 'border-slate-100 bg-white hover:border-amber-200 hover:shadow-lg'
                        }`}
                     >
                        {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">Popular</div>}
                        <div className="flex justify-between items-start mb-2">
                           <span className="font-bold text-slate-900">{plan.name}</span>
                           {selectedPlan === plan.name ? <CheckCircle2 size={18} className="text-amber-500" /> : <div className="w-4 h-4 rounded-full border border-slate-300"></div>}
                        </div>
                        <div className="text-2xl font-black text-slate-900 mb-3">{plan.price}<span className="text-xs font-normal text-slate-400">/mo</span></div>
                        <ul className="space-y-1.5">
                           {plan.features.map(f => (
                             <li key={f} className="text-xs text-slate-600 flex items-center gap-1.5">
                               <Check size={12} className="text-emerald-500" />
                               {f}
                             </li>
                           ))}
                        </ul>
                     </div>
                   ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex justify-end pt-4">
         <button className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg shadow-slate-300 flex items-center gap-2">
            Save & Continue
            <ChevronRight size={18} />
         </button>
      </div>
    </div>
  );
};

export default ComplianceCenter;
