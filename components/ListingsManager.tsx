
import React, { useState } from 'react';
import { Property, UserProfile, UserRole, Lead } from '../types';
import { geminiService } from '../services/geminiService';
import { 
  Plus, Home, FileSignature, CheckCircle2, Upload, Camera, 
  AlertTriangle, Users, Phone, Calendar, ChevronRight, Search,
  Sparkles, Loader2, TrendingUp, Target, ListPlus
} from 'lucide-react';

interface ListingsManagerProps {
  user: UserProfile;
  properties: Property[];
  onCreateListing: (property: Property) => void;
}

const ListingsManager: React.FC<ListingsManagerProps> = ({ user, properties, onCreateListing }) => {
  const [view, setView] = useState<'list' | 'create'>('list');
  const [step, setStep] = useState(1); // 1: Details, 2: Condition, 3: Mandate, 4: Media
  
  // State for new listing form
  const [newListing, setNewListing] = useState<Partial<Property>>({
    title: '',
    location: '',
    price: 0,
    type: 'House',
    beds: 3,
    baths: 2,
    sqm: 100,
    features: ['Security', 'Garden']
  });

  const [featureInput, setFeatureInput] = useState('');
  const [isValuating, setIsValuating] = useState(false);
  const [valuationData, setValuationData] = useState<any>(null);

  // Mock Leads for Agents
  const leads: Lead[] = [
    { id: 'l1', name: 'Thabo Mbeki', matchScore: 95, preQualifiedAmount: 2400000, status: 'New' },
    { id: 'l2', name: 'Sarah Connor', matchScore: 88, preQualifiedAmount: 2100000, status: 'Viewing_Arranged' },
    { id: 'l3', name: 'James Smith', matchScore: 72, preQualifiedAmount: 1800000, status: 'Contacted' },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewListing(prev => ({
      ...prev,
      [name]: name === 'price' || name === 'beds' || name === 'baths' || name === 'sqm' ? Number(value) : value
    }));
  };

  const handleAddFeature = () => {
    if (featureInput.trim()) {
        setNewListing(prev => ({
            ...prev,
            features: [...(prev.features || []), featureInput.trim()]
        }));
        setFeatureInput('');
    }
  };

  const handleRemoveFeature = (feat: string) => {
    setNewListing(prev => ({
        ...prev,
        features: (prev.features || []).filter(f => f !== feat)
    }));
  };

  const handleGetValuation = async () => {
    if (!newListing.location) {
        alert("Please enter a location first to get an accurate valuation.");
        return;
    }
    
    setIsValuating(true);
    try {
        const result = await geminiService.getPropertyValuation({
            location: newListing.location,
            type: newListing.type,
            beds: newListing.beds,
            features: newListing.features || []
        });
        setValuationData(result);
    } catch (e) {
        console.error("Valuation failed", e);
    } finally {
        setIsValuating(false);
    }
  };

  const handleCreateListing = () => {
    const finalProperty: Property = {
        id: Math.random().toString(36).substr(2, 9),
        title: newListing.title || 'New Market Listing',
        description: 'A beautiful property recently listed on PropTransfer.',
        price: newListing.price || 0,
        location: newListing.location || 'Unknown Location',
        beds: newListing.beds || 3,
        baths: newListing.baths || 2,
        sqm: newListing.sqm || 100,
        type: newListing.type as any || 'House',
        listingType: 'SALE',
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
        features: newListing.features || [],
        status: 'Listed'
    };

    onCreateListing(finalProperty);
    alert("Listing published successfully! It is now visible in the Marketplace.");
    setView('list');
    setStep(1);
    setNewListing({ title: '', location: '', price: 0, type: 'House', beds: 3, baths: 2, sqm: 100, features: ['Security', 'Garden'] });
    setValuationData(null);
  };

  // ----------------------------------------------------------------------
  // SELLER WORKFLOW: CREATE LISTING WIZARD
  // ----------------------------------------------------------------------
  if (view === 'create') {
    return (
      <div className="max-w-5xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => setView('list')} className="text-slate-400 hover:text-slate-600">Back</button>
          <h1 className="text-2xl font-bold text-slate-900">List Your Property</h1>
        </div>

        {/* Progress Stepper */}
        <div className="flex justify-between items-center mb-8 px-4">
          {['Property Details', 'Condition Report', 'Sign Mandate', 'Photos & Media'].map((label, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${step > idx + 1 ? 'bg-emerald-500 text-white' : step === idx + 1 ? 'bg-amber-500 text-slate-900 shadow-lg shadow-amber-200' : 'bg-slate-100 text-slate-400'}`}>
                {step > idx + 1 ? <CheckCircle2 size={20} /> : idx + 1}
              </div>
              <span className={`text-xs font-semibold ${step === idx + 1 ? 'text-amber-600' : 'text-slate-400'}`}>{label}</span>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-8">
            {step === 1 && (
                <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900">Property Details</h2>
                <div className="grid grid-cols-2 gap-6">
                    <div className="space-y-2 col-span-2">
                    <label className="text-sm font-bold text-slate-700">Listing Title</label>
                    <input name="title" value={newListing.title} onChange={handleInputChange} type="text" placeholder="e.g. Stunning 3 Bed Family Home" className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-amber-500" />
                    </div>
                    <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Street Address</label>
                    <input name="location" value={newListing.location} onChange={handleInputChange} type="text" placeholder="e.g. 42 Sandton Drive" className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-amber-500" />
                    </div>
                    <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">Property Type</label>
                    <select name="type" value={newListing.type} onChange={handleInputChange} className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-amber-500">
                        <option>House</option>
                        <option>Apartment</option>
                        <option>Townhouse</option>
                    </select>
                    </div>
                    
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Bedrooms</label>
                        <input name="beds" value={newListing.beds} onChange={handleInputChange} type="number" className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-amber-500" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Bathrooms</label>
                        <input name="baths" value={newListing.baths} onChange={handleInputChange} type="number" className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-amber-500" />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-700">Size (m²)</label>
                        <input name="sqm" value={newListing.sqm} onChange={handleInputChange} type="number" className="w-full p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-amber-500" />
                    </div>

                    <div className="space-y-2 col-span-2">
                        <label className="text-sm font-bold text-slate-700">Features</label>
                        <div className="flex gap-2 mb-2">
                            <input 
                                type="text" 
                                value={featureInput}
                                onChange={(e) => setFeatureInput(e.target.value)}
                                placeholder="Add features (e.g. Pool, Solar, Fibre)"
                                className="flex-1 p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-amber-500"
                                onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
                            />
                            <button onClick={handleAddFeature} className="bg-slate-200 hover:bg-slate-300 text-slate-700 p-3 rounded-xl">
                                <ListPlus size={20} />
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {newListing.features?.map((f, i) => (
                                <span key={i} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                                    {f}
                                    <button onClick={() => handleRemoveFeature(f)} className="hover:text-rose-500"><Search size={0} className="hidden" />&times;</button>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-2 col-span-2">
                        <label className="text-sm font-bold text-slate-700">Asking Price (R)</label>
                        <div className="flex gap-3">
                            <input name="price" value={newListing.price || ''} onChange={handleInputChange} type="number" placeholder="e.g. 2500000" className="flex-1 p-3 bg-slate-50 rounded-xl border border-slate-200 outline-none focus:ring-2 focus:ring-amber-500" />
                            <button 
                                onClick={handleGetValuation}
                                disabled={isValuating}
                                className="bg-amber-500 hover:bg-amber-600 disabled:opacity-70 text-slate-900 px-6 rounded-xl font-bold flex items-center gap-2 whitespace-nowrap shadow-md"
                            >
                                {isValuating ? <Loader2 size={18} className="animate-spin" /> : <Sparkles size={18} />}
                                {isValuating ? 'Analyzing...' : 'AI Valuation'}
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex justify-end pt-4">
                    <button 
                        onClick={() => setStep(2)} 
                        disabled={!newListing.title || !newListing.location || !newListing.price}
                        className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        Next: Condition Report
                    </button>
                </div>
                </div>
            )}

            {step === 2 && (
                <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900">Mandatory Disclosure Form</h2>
                <p className="text-sm text-slate-500 bg-amber-50 p-4 rounded-xl border border-amber-100 flex gap-2">
                    <AlertTriangle className="text-amber-500 shrink-0" size={20} />
                    By law, you must disclose all known defects. This protects you from future claims.
                </p>
                
                <div className="space-y-4">
                    {['Roof leaks or damage?', 'Electrical system faults?', 'Damp or water damage?', 'Plumbing issues?'].map((q, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="font-medium text-slate-700">{q}</span>
                        <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name={`q${i}`} className="w-4 h-4 text-amber-500" />
                            <span className="text-sm">Yes</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name={`q${i}`} defaultChecked className="w-4 h-4 text-amber-500" />
                            <span className="text-sm">No</span>
                        </label>
                        </div>
                    </div>
                    ))}
                </div>
                <div className="flex justify-between pt-4">
                    <button onClick={() => setStep(1)} className="text-slate-500 font-bold">Back</button>
                    <button onClick={() => setStep(3)} className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800">Next: Mandate</button>
                </div>
                </div>
            )}

            {step === 3 && (
                <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900">Exclusive Sole Mandate</h2>
                <div className="h-64 overflow-y-auto bg-slate-50 p-6 rounded-xl border border-slate-200 text-sm text-slate-600 leading-relaxed font-mono">
                    <p className="font-bold mb-4">AGREEMENT OF MANDATE</p>
                    <p className="mb-4">I/We, the undersigned Seller(s), hereby grant PropTransfer and its assigned Agent an exclusive sole mandate to market and sell the property described in Step 1 ({newListing.location}).</p>
                    <p className="mb-4">1. COMMISSION: The Seller agrees to pay brokerage commission of 5% plus VAT upon registration of transfer.</p>
                    <p className="mb-4">2. DURATION: This mandate shall remain valid for a period of 90 days from date of signature.</p>
                    <p>3. MARKETING: The Agent is authorized to erect "For Sale" boards, hold show days, and list the property on online portals.</p>
                    <p>...</p>
                </div>
                
                <div className="flex items-center gap-3">
                    <input type="checkbox" id="terms" className="w-5 h-5 text-amber-500 rounded" />
                    <label htmlFor="terms" className="text-sm font-medium text-slate-700">I accept the terms and sign this mandate digitally.</label>
                </div>

                <div className="flex justify-between pt-4">
                    <button onClick={() => setStep(2)} className="text-slate-500 font-bold">Back</button>
                    <button onClick={() => setStep(4)} className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 flex items-center gap-2">
                    <FileSignature size={18} />
                    Sign & Continue
                    </button>
                </div>
                </div>
            )}

            {step === 4 && (
                <div className="space-y-6">
                <h2 className="text-xl font-bold text-slate-900">Photos & Media</h2>
                <div className="border-2 border-dashed border-slate-300 rounded-2xl p-12 flex flex-col items-center justify-center text-slate-400 hover:border-amber-400 hover:text-amber-600 transition-all cursor-pointer bg-slate-50 hover:bg-amber-50">
                    <Camera size={48} className="mb-4" />
                    <p className="font-bold text-lg">Click to Upload Photos</p>
                    <p className="text-sm mt-2">or drag and drop files here (Max 20MB)</p>
                </div>
                
                <div className="flex justify-between pt-4">
                    <button onClick={() => setStep(3)} className="text-slate-500 font-bold">Back</button>
                    <button onClick={handleCreateListing} className="bg-emerald-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200">
                    Publish Listing
                    </button>
                </div>
                </div>
            )}
            </div>

            {/* Sidebar for Valuation */}
            <div className="lg:col-span-1 space-y-6">
                <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/10 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-4">
                            <Sparkles size={20} className="text-amber-500" />
                            <h3 className="font-bold text-lg">Listing Assistant</h3>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed mb-4">
                            Fill in your property details and click "AI Valuation" to get a real-time price estimate and selling tips.
                        </p>
                        
                        {!valuationData ? (
                           <div className="bg-white/5 border border-white/10 rounded-xl p-4 text-center">
                                <Search size={24} className="mx-auto text-slate-500 mb-2" />
                                <p className="text-xs text-slate-500">Waiting for data...</p>
                           </div>
                        ) : (
                            <div className="space-y-4 animate-in slide-in-from-right-4 duration-500">
                                <div className="bg-white/10 border border-white/20 rounded-xl p-4">
                                    <p className="text-[10px] text-amber-500 font-bold uppercase tracking-widest mb-1">Estimated Value</p>
                                    <p className="text-2xl font-black">{valuationData.estimatedRange}</p>
                                </div>
                                
                                <div className="space-y-2">
                                    <div className="flex justify-between items-center text-xs">
                                        <span className="text-slate-400">Market Demand</span>
                                        <span className={`font-bold ${valuationData.marketSentiment?.includes('High') ? 'text-emerald-400' : 'text-amber-400'}`}>
                                            {valuationData.marketSentiment}
                                        </span>
                                    </div>
                                    <p className="text-xs text-slate-300 italic bg-white/5 p-2 rounded-lg border border-white/5">
                                        {valuationData.marketDemandPrediction}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-amber-500 text-xs font-bold uppercase tracking-widest">
                                        <Target size={14} />
                                        Key Selling Points
                                    </div>
                                    <ul className="space-y-2">
                                        {valuationData.sellingPoints?.map((sp: string, i: number) => (
                                            <li key={i} className="text-xs text-slate-300 flex items-start gap-2">
                                                <CheckCircle2 size={12} className="text-emerald-500 mt-0.5 shrink-0" />
                                                {sp}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------------------------
  // AGENT/SELLER DASHBOARD VIEW
  // ----------------------------------------------------------------------
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Listings</h1>
          <p className="text-slate-500">Manage your properties and active leads.</p>
        </div>
        {(user.role === UserRole.SELLER || user.role === UserRole.REAL_ESTATE_AGENT) && (
          <button 
            onClick={() => setView('create')}
            className="bg-slate-900 text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 flex items-center gap-2 shadow-lg shadow-slate-300 transition-all active:scale-95"
          >
            <Plus size={20} />
            List New Property
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {properties.map((property) => (
          <div key={property.id} className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
            <div className="h-48 relative">
              <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm">
                R {(property.price/1000000).toFixed(2)}M
              </div>
              <div className="absolute bottom-4 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-sm flex items-center gap-1">
                <CheckCircle2 size={12} />
                Mandate Active
              </div>
            </div>
            
            <div className="p-6 flex-1 flex flex-col">
              <h3 className="font-bold text-lg text-slate-900 mb-1">{property.title}</h3>
              <p className="text-slate-500 text-sm mb-4">{property.location}</p>
              
              <div className="mt-auto">
                <div className="border-t border-slate-100 pt-4 mb-4">
                   <div className="flex justify-between items-center mb-2">
                      <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center gap-2">
                        <Users size={14} />
                        Matching Buyers
                      </h4>
                      <span className="bg-amber-100 text-amber-700 text-xs px-2 py-0.5 rounded-full font-bold">
                        {leads.length} found
                      </span>
                   </div>
                   
                   {/* Mini Lead List */}
                   <div className="space-y-2">
                      {leads.map(lead => (
                        <div key={lead.id} className="flex justify-between items-center p-2 hover:bg-slate-50 rounded-lg transition-colors cursor-pointer group">
                           <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${lead.matchScore > 90 ? 'bg-emerald-500' : 'bg-amber-500'}`}>
                                {lead.matchScore}%
                              </div>
                              <div>
                                <p className="text-sm font-bold text-slate-700">{lead.name}</p>
                                <p className="text-[10px] text-slate-400">Pre-qual: R {(lead.preQualifiedAmount/1000000).toFixed(1)}M</p>
                              </div>
                           </div>
                           <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button 
                                onClick={(e) => { e.stopPropagation(); alert(`Dialing ${lead.name}...`); }}
                                className="p-1.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-lg"
                                title="Call Lead"
                              >
                                <Phone size={16} />
                              </button>
                              <button 
                                onClick={(e) => { e.stopPropagation(); alert(`Opening calendar to schedule viewing with ${lead.name}`); }}
                                className="p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg"
                                title="Schedule Viewing"
                              >
                                <Calendar size={16} />
                              </button>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>

                <button className="w-full border border-slate-200 text-slate-600 py-2 rounded-xl text-sm font-bold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                  Manage Listing
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListingsManager;
