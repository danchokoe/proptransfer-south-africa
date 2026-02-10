
import React, { useState } from 'react';
import { 
  CheckCircle2, Clock, Calendar, ArrowRight, 
  User, Building, Landmark, Scale, Gavel, FileText, Briefcase, 
  Users, Home, ShieldCheck, ChevronDown, ChevronUp, BookOpen, 
  Fingerprint, CreditCard, MapPin, FileCheck, Banknote, HelpCircle
} from 'lucide-react';

const WorkflowGuide: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'workflow' | 'manual'>('workflow');
  const [activeWeek, setActiveWeek] = useState<number | null>(1);
  const [activeDocSection, setActiveDocSection] = useState<string | null>('setup');

  const workflowSteps = [
    {
      week: 1,
      title: "Mandate & Listing",
      stakeholders: ["Seller", "Agent"],
      description: "Establishing the relationship and preparing the property for market.",
      tasks: [
        { role: "Seller", action: "Sign Digital Mandate & Disclosure Form" },
        { role: "Agent", action: "Take Photos, List Property, Create Marketing Assets" },
        { role: "System", action: "Verify Property Ownership (Deeds) & Agent Status (FFC)" }
      ],
      icon: Home
    },
    {
      week: 2,
      title: "Marketing & Offers",
      stakeholders: ["Buyer", "Seller", "Agent"],
      description: "Connecting with buyers and securing a valid Offer to Purchase (OTP).",
      tasks: [
        { role: "Buyer", action: "Pre-qualification (FICA, Credit Check)" },
        { role: "Agent", action: "Host Showdays, Facilitate Viewings" },
        { role: "Buyer/Seller", action: "Sign Offer to Purchase (OTP)" }
      ],
      icon: Users
    },
    {
      week: 3,
      title: "Bond Application & Instruction",
      stakeholders: ["Buyer", "Bond Originator", "Bank", "Conveyancer"],
      description: "Securing finance and instructing the transfer attorneys.",
      tasks: [
        { role: "Buyer/Originator", action: "Submit Bond Application to Banks" },
        { role: "Bank", action: "Grant Bond & Issue Quote" },
        { role: "Conveyancer", action: "Receive Instruction, Draft Transfer Documents" }
      ],
      icon: Briefcase
    },
    {
      week: 4,
      title: "Guarantees & Compliance",
      stakeholders: ["Conveyancer", "Municipality", "Bank"],
      description: "Gathering all necessary certificates and financial guarantees.",
      tasks: [
        { role: "Conveyancer", action: "Pay Transfer Duty to SARS" },
        { role: "Municipality", action: "Issue Rates Clearance Certificate" },
        { role: "Bank", action: "Issue Bond Guarantees" }
      ],
      icon: ShieldCheck
    },
    {
      week: 5,
      title: "Lodgement",
      stakeholders: ["Conveyancer", "Deeds Office"],
      description: "Documents are handed over to the Deeds Office for examination.",
      tasks: [
        { role: "Conveyancer", action: "Lodge Documents at Deeds Office" },
        { role: "Deeds Office", action: "Level 1-3 Examination of Documents" },
        { role: "Deeds Office", action: "Prep for Registration" }
      ],
      icon: Scale
    },
    {
      week: 6,
      title: "Registration & Pay Out",
      stakeholders: ["Deeds Office", "Bank", "Seller", "Agent"],
      description: "Ownership officially changes hands and funds are disbursed.",
      tasks: [
        { role: "Deeds Office", action: "Execute Registration" },
        { role: "Bank", action: "Pay out Bond Proceeds" },
        { role: "Conveyancer", action: "Pay Seller & Agent Commission" }
      ],
      icon: Gavel
    }
  ];

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 pb-12">
      <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Help Center</h1>
          <p className="text-slate-500">Guides, workflows, and documentation for PropTransfer users.</p>
        </div>
        <div className="bg-slate-100 p-1 rounded-xl flex">
          <button 
            onClick={() => setActiveTab('workflow')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'workflow' ? 'bg-white shadow text-amber-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            Transaction Workflow
          </button>
          <button 
            onClick={() => setActiveTab('manual')}
            className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'manual' ? 'bg-white shadow text-amber-600' : 'text-slate-500 hover:text-slate-700'}`}
          >
            User Manual
          </button>
        </div>
      </div>

      {activeTab === 'workflow' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-in slide-in-from-right-4 duration-300">
          {/* Navigation Sidebar */}
          <div className="hidden lg:block space-y-4">
            <div className="sticky top-24 space-y-2">
              {workflowSteps.map((step) => (
                <button
                  key={step.week}
                  onClick={() => setActiveWeek(step.week)}
                  className={`w-full text-left px-4 py-3 rounded-xl flex items-center justify-between transition-all ${
                    activeWeek === step.week 
                      ? 'bg-slate-900 text-white shadow-lg shadow-slate-300' 
                      : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      activeWeek === step.week ? 'bg-amber-500 text-slate-900' : 'bg-slate-200 text-slate-500'
                    }`}>
                      {step.week}
                    </div>
                    <span className="font-semibold text-sm">{step.title}</span>
                  </div>
                  {activeWeek === step.week && <ArrowRight size={16} className="text-amber-500" />}
                </button>
              ))}
            </div>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-2 space-y-6">
            {workflowSteps.map((step) => (
              <div 
                key={step.week}
                id={`week-${step.week}`}
                className={`bg-white rounded-2xl border transition-all duration-300 overflow-hidden ${
                  activeWeek === step.week 
                    ? 'border-amber-500 shadow-xl ring-1 ring-amber-100' 
                    : 'border-slate-200 opacity-60 hover:opacity-100'
                }`}
              >
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => setActiveWeek(activeWeek === step.week ? null : step.week)}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex gap-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                         activeWeek === step.week ? 'bg-slate-900 text-amber-500' : 'bg-slate-100 text-slate-400'
                      }`}>
                        <step.icon size={24} />
                      </div>
                      <div>
                        <h3 className={`text-xl font-bold ${activeWeek === step.week ? 'text-slate-900' : 'text-slate-700'}`}>
                          Week {step.week}: {step.title}
                        </h3>
                        <p className="text-slate-500 text-sm mt-1">{step.description}</p>
                      </div>
                    </div>
                    <div className="text-slate-400">
                      {activeWeek === step.week ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </div>
                  </div>
                </div>

                {activeWeek === step.week && (
                  <div className="px-6 pb-6 animate-in slide-in-from-top-2 duration-300">
                    <div className="border-t border-slate-100 pt-4 mt-2">
                      <div className="flex flex-wrap gap-2 mb-6">
                        {step.stakeholders.map(s => (
                          <span key={s} className="text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-600 px-2 py-1 rounded-md">
                            {s}
                          </span>
                        ))}
                      </div>

                      <div className="space-y-4">
                        {step.tasks.map((task, idx) => (
                          <div key={idx} className="flex items-start gap-4 p-3 rounded-xl bg-slate-50 border border-slate-100">
                            <div className="mt-1">
                               {task.role === 'System' ? <Landmark size={16} className="text-amber-600" /> : <CheckCircle2 size={16} className="text-slate-400" />}
                            </div>
                            <div>
                              <span className="text-xs font-bold text-amber-600 uppercase tracking-wide block mb-0.5">{task.role}</span>
                              <span className="text-sm font-medium text-slate-800">{task.action}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'manual' && (
        <div className="animate-in slide-in-from-right-4 duration-300">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-4 min-h-[600px]">
              {/* Doc Sidebar */}
              <div className="bg-slate-50 border-r border-slate-200 p-4">
                <h3 className="font-bold text-slate-900 mb-4 px-2">Documentation</h3>
                <nav className="space-y-1">
                   <button 
                    onClick={() => setActiveDocSection('setup')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${activeDocSection === 'setup' ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
                   >
                     Getting Started - Profile Setup
                   </button>
                   <button 
                    onClick={() => setActiveDocSection('verification')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${activeDocSection === 'verification' ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
                   >
                     Compliance Verification
                   </button>
                   <button 
                    onClick={() => setActiveDocSection('payments')}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${activeDocSection === 'payments' ? 'bg-white text-amber-600 shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
                   >
                     Payments & Fees
                   </button>
                </nav>
              </div>

              {/* Doc Content */}
              <div className="md:col-span-3 p-8 overflow-y-auto max-h-[700px]">
                 {activeDocSection === 'setup' && (
                   <div className="space-y-8 animate-in fade-in duration-300">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Getting Started: Profile Setup</h2>
                        <p className="text-slate-500">A comprehensive guide to registering and setting up your PropTransfer profile.</p>
                      </div>

                      <div className="bg-amber-50 border border-amber-100 rounded-xl p-6">
                         <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-4">
                            <Briefcase size={20} className="text-amber-600" />
                            Agent Registration Process
                         </h3>
                         <div className="space-y-6">
                            <div className="flex gap-4">
                               <div className="w-8 h-8 rounded-full bg-white border-2 border-amber-500 flex items-center justify-center font-bold text-slate-900 shrink-0">1</div>
                               <div>
                                  <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                                    Security Setup
                                    <Fingerprint size={16} className="text-slate-400" />
                                  </h4>
                                  <p className="text-sm text-slate-600 leading-relaxed">
                                    Create your profile using a verified email. You must enable <span className="font-bold">biometric authentication</span> (FaceID or Fingerprint) via your device and set 3 security questions for account recovery. This ensures transaction integrity.
                                  </p>
                               </div>
                            </div>
                            
                            <div className="flex gap-4">
                               <div className="w-8 h-8 rounded-full bg-white border-2 border-amber-500 flex items-center justify-center font-bold text-slate-900 shrink-0">2</div>
                               <div>
                                  <h4 className="font-bold text-slate-900 mb-1 flex items-center gap-2">
                                    Role & Subscription
                                    <CreditCard size={16} className="text-slate-400" />
                                  </h4>
                                  <p className="text-sm text-slate-600 leading-relaxed mb-2">
                                    Select <span className="font-bold">Real Estate Agent</span> as your role. Choose your subscription tier:
                                  </p>
                                  <ul className="list-disc list-inside text-xs text-slate-500 space-y-1 ml-1">
                                     <li><span className="font-bold">Beginner:</span> Basic listing limit (3), standard support.</li>
                                     <li><span className="font-bold">Professional:</span> Increased listings (15), priority support.</li>
                                     <li><span className="font-bold">Expert:</span> Unlimited listings, AI Valuation tools.</li>
                                     <li><span className="font-bold">Agency:</span> Multi-user management, API access.</li>
                                  </ul>
                                  <p className="text-xs text-slate-500 mt-2 italic">Payment via secure gateway required upon selection.</p>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>
                 )}

                 {activeDocSection === 'verification' && (
                   <div className="space-y-8 animate-in fade-in duration-300">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Compliance Verification</h2>
                        <p className="text-slate-500">Understanding mandatory regulatory requirements (FICA, POPIA, FFC).</p>
                      </div>

                      <div className="grid grid-cols-1 gap-6">
                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                           <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
                              <ShieldCheck size={20} className="text-emerald-500" />
                              FICA Requirements
                           </h3>
                           <p className="text-sm text-slate-600 mb-4">The Financial Intelligence Centre Act (FICA) requires all property practitioners and conveyancers to identify and verify their clients.</p>
                           <ul className="space-y-2">
                              <li className="flex items-start gap-2 text-sm text-slate-700">
                                <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                                <span><span className="font-bold">Proof of Identity:</span> Valid SA ID Book, Smart Card, or Passport.</span>
                              </li>
                              <li className="flex items-start gap-2 text-sm text-slate-700">
                                <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />
                                <span><span className="font-bold">Proof of Residence:</span> Utility bill or bank statement less than 3 months old showing your name and physical address.</span>
                              </li>
                           </ul>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                           <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
                              <FileCheck size={20} className="text-amber-500" />
                              Fidelity Fund Certificate (FFC)
                           </h3>
                           <p className="text-sm text-slate-600 mb-4">Strictly for Real Estate Agents. You cannot earn commission without a valid FFC.</p>
                           <div className="bg-amber-50 border border-amber-100 rounded-lg p-3 text-sm text-amber-800 flex gap-2">
                             <HelpCircle size={18} className="shrink-0" />
                             PropTransfer automatically verifies your FFC status against the PPRA database annually.
                           </div>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                           <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 mb-3">
                              <Briefcase size={20} className="text-slate-500" />
                              POPIA Consent
                           </h3>
                           <p className="text-sm text-slate-600">The Protection of Personal Information Act ensures your data is handled securely. You must sign a digital consent form allowing us to share your FICA documents with involved Conveyancers and Banks.</p>
                        </div>
                      </div>
                   </div>
                 )}

                 {activeDocSection === 'payments' && (
                   <div className="space-y-8 animate-in fade-in duration-300">
                      <div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-2">Payments & Fees</h2>
                        <p className="text-slate-500">Breakdown of platform fees, commissions, and transfer costs.</p>
                      </div>

                      <div className="space-y-6">
                        <div className="bg-slate-900 text-white rounded-xl p-6 shadow-lg">
                           <h3 className="text-lg font-bold flex items-center gap-2 mb-4">
                              <Banknote size={20} className="text-amber-500" />
                              Commission Structure
                           </h3>
                           <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-4">
                             <div>
                               <p className="font-bold text-lg">5.0% + VAT</p>
                               <p className="text-xs text-slate-400">Standard Seller's Commission</p>
                             </div>
                             <div className="text-right">
                               <p className="font-bold text-amber-500">Upon Registration</p>
                               <p className="text-xs text-slate-400">Paid by Conveyancer</p>
                             </div>
                           </div>
                           <p className="text-sm text-slate-300 leading-relaxed">
                             PropTransfer standardizes commission at 5% plus VAT. This is deducted from the purchase price by the transferring attorney before the net proceeds are paid to the seller.
                           </p>
                        </div>

                        <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm">
                           <h3 className="text-lg font-bold text-slate-900 mb-3">Transfer Costs (Buyer's Account)</h3>
                           <p className="text-sm text-slate-600 mb-4">Costs are calculated based on a sliding scale relative to the property purchase price.</p>
                           <div className="overflow-hidden rounded-lg border border-slate-200">
                             <table className="w-full text-sm text-left">
                               <thead className="bg-slate-50 text-slate-700 font-bold">
                                 <tr>
                                   <th className="p-3">Cost Item</th>
                                   <th className="p-3">Beneficiary</th>
                                   <th className="p-3">Example (R2m Prop)</th>
                                 </tr>
                               </thead>
                               <tbody className="divide-y divide-slate-100">
                                 <tr>
                                   <td className="p-3 font-medium">Transfer Duty</td>
                                   <td className="p-3 text-slate-500">SARS</td>
                                   <td className="p-3 text-slate-700">~R 60,500</td>
                                 </tr>
                                 <tr>
                                   <td className="p-3 font-medium">Attorney Transfer Fee</td>
                                   <td className="p-3 text-slate-500">Conveyancer</td>
                                   <td className="p-3 text-slate-700">~R 38,000</td>
                                 </tr>
                                 <tr>
                                   <td className="p-3 font-medium">Bond Registration Fee</td>
                                   <td className="p-3 text-slate-500">Bond Attorney</td>
                                   <td className="p-3 text-slate-700">~R 35,000</td>
                                 </tr>
                               </tbody>
                             </table>
                           </div>
                        </div>
                      </div>
                   </div>
                 )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default WorkflowGuide;
