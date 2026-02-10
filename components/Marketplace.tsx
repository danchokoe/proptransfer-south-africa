
import React, { useState } from 'react';
import PropertyCard from './PropertyCard';
import { SlidersHorizontal, Map as MapIcon, Grid, ShoppingCart, Search, AlertCircle, ArrowRight, Sparkles, Bookmark, X, CheckCircle2, BedDouble, Bath, Maximize } from 'lucide-react';
import { UserProfile, Property } from '../types';
import { MOCK_USERS } from '../constants';

interface MarketplaceProps {
  user?: UserProfile; 
  properties: Property[];
  cart: string[];
  onAddToCart: (id: string) => void;
  onNavigateToCompliance?: () => void;
}

interface DreamHomeRequirements {
  location: string;
  budget: number;
  keywords: string;
}

const Marketplace: React.FC<MarketplaceProps> = ({ 
  user = MOCK_USERS[0], 
  properties, 
  cart, 
  onAddToCart,
  onNavigateToCompliance 
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'map'>('grid');
  const [listingType, setListingType] = useState<'SALE' | 'RENT'>('SALE');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);

  // Search State
  const [searchLocation, setSearchLocation] = useState('');
  const [searchBudget, setSearchBudget] = useState('');
  const [searchKeywords, setSearchKeywords] = useState('');
  const [savedRequirements, setSavedRequirements] = useState<DreamHomeRequirements | null>(null);

  const handleSaveRequirements = () => {
    const budget = parseInt(searchBudget.replace(/\D/g, '')) || 0;
    setSavedRequirements({
        location: searchLocation,
        budget: budget,
        keywords: searchKeywords
    });
  };

  const handleClearRequirements = () => {
    setSavedRequirements(null);
    setSearchLocation('');
    setSearchBudget('');
    setSearchKeywords('');
  };

  const handleAttemptAddToCart = (propertyId: string) => {
    // Spec Requirement: Pre-qualification is required prior to viewing/adding to cart
    const isPreQualified = user.documents.bankStatements && user.documents.payslips && user.documents.ficaForm;

    if (!isPreQualified) {
        setShowAuthModal(true);
    } else {
        onAddToCart(propertyId);
    }
  };

  const handleViewDetails = (id: string) => {
    const prop = properties.find(p => p.id === id);
    if (prop) setSelectedProperty(prop);
  };

  const filteredProperties = properties.filter(p => {
    // 1. Basic type filter
    if (listingType && p.listingType !== listingType) return false;

    // 2. Saved requirements filter (Dream Home Match)
    if (savedRequirements) {
        if (savedRequirements.location && !p.location.toLowerCase().includes(savedRequirements.location.toLowerCase())) return false;
        if (savedRequirements.budget > 0 && p.price > savedRequirements.budget) return false;
        
        if (savedRequirements.keywords) {
            const keywords = savedRequirements.keywords.toLowerCase().split(/[\s,]+/); 
            const propText = `${p.title} ${p.description} ${p.features.join(' ')}`.toLowerCase();
            const hasMatch = keywords.some(k => k && propText.includes(k));
            if (!hasMatch) return false;
        }
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500 relative">
      
      {/* Property Details Modal */}
      {selectedProperty && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setSelectedProperty(null)}>
          <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
             <div className="relative h-64 md:h-80">
                <img src={selectedProperty.image} alt={selectedProperty.title} className="w-full h-full object-cover" />
                <button 
                  onClick={() => setSelectedProperty(null)}
                  className="absolute top-4 right-4 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
                <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg font-bold text-slate-900 shadow-lg">
                  R {(selectedProperty.price/1000000).toFixed(2)} Million
                </div>
                <div className="absolute bottom-4 right-4 bg-amber-500 text-white px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                  {selectedProperty.listingType}
                </div>
             </div>
             
             <div className="p-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
                   <div>
                      <h2 className="text-2xl font-bold text-slate-900 mb-2">{selectedProperty.title}</h2>
                      <div className="flex items-center gap-2 text-slate-500">
                        <MapIcon size={18} />
                        {selectedProperty.location}
                      </div>
                   </div>
                   <div className="flex gap-3">
                       <button className="px-4 py-2 border border-slate-200 rounded-xl font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                          Share
                       </button>
                       <button 
                         onClick={() => {
                           handleAttemptAddToCart(selectedProperty.id);
                           setSelectedProperty(null);
                         }}
                         disabled={cart.includes(selectedProperty.id)}
                         className="px-6 py-2 bg-slate-900 text-white rounded-xl font-bold hover:bg-slate-800 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                       >
                          <ShoppingCart size={18} />
                          {cart.includes(selectedProperty.id) ? 'Added to Cart' : 'Add to Cart'}
                       </button>
                   </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-8">
                   <div className="bg-slate-50 p-4 rounded-xl flex items-center gap-3 border border-slate-100">
                      <BedDouble size={24} className="text-amber-500" />
                      <div>
                        <p className="text-xs text-slate-500 font-bold uppercase">Bedrooms</p>
                        <p className="font-bold text-slate-900">{selectedProperty.beds}</p>
                      </div>
                   </div>
                   <div className="bg-slate-50 p-4 rounded-xl flex items-center gap-3 border border-slate-100">
                      <Bath size={24} className="text-amber-500" />
                      <div>
                        <p className="text-xs text-slate-500 font-bold uppercase">Bathrooms</p>
                        <p className="font-bold text-slate-900">{selectedProperty.baths}</p>
                      </div>
                   </div>
                   <div className="bg-slate-50 p-4 rounded-xl flex items-center gap-3 border border-slate-100">
                      <Maximize size={24} className="text-amber-500" />
                      <div>
                        <p className="text-xs text-slate-500 font-bold uppercase">Size</p>
                        <p className="font-bold text-slate-900">{selectedProperty.sqm} m²</p>
                      </div>
                   </div>
                </div>

                <div className="space-y-6">
                   <div>
                     <h3 className="font-bold text-lg text-slate-900 mb-3">Description</h3>
                     <p className="text-slate-600 leading-relaxed">{selectedProperty.description}</p>
                   </div>
                   
                   <div>
                     <h3 className="font-bold text-lg text-slate-900 mb-3">Features</h3>
                     <div className="flex flex-wrap gap-2">
                        {selectedProperty.features.map((feat, i) => (
                           <span key={i} className="bg-amber-50 text-amber-800 px-3 py-1 rounded-full text-sm font-medium border border-amber-100">
                             {feat}
                           </span>
                        ))}
                     </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Pre-qual Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={() => setShowAuthModal(false)}>
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                <div className="w-12 h-12 bg-rose-100 text-rose-600 rounded-full flex items-center justify-center mb-4">
                    <AlertCircle size={24} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Pre-qualification Required</h3>
                <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                    To prevent scams and ensure serious inquiries, PropTransfer requires verified documents (FICA, POPIA, Proof of Funds) before you can request viewings.
                </p>
                <div className="flex gap-3">
                    <button 
                        onClick={() => setShowAuthModal(false)}
                        className="flex-1 px-4 py-3 rounded-xl border border-slate-200 text-slate-600 font-bold text-sm hover:bg-slate-50"
                    >
                        Cancel
                    </button>
                    <button 
                        onClick={() => { setShowAuthModal(false); onNavigateToCompliance?.(); }}
                        className="flex-1 px-4 py-3 rounded-xl bg-slate-900 text-white font-bold text-sm hover:bg-slate-800 flex items-center justify-center gap-2"
                    >
                        Upload Docs
                        <ArrowRight size={16} />
                    </button>
                </div>
            </div>
        </div>
      )}

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">PropTransfer Marketplace</h1>
          <p className="text-slate-500">Find your ideal property and add to cart to request viewings.</p>
        </div>
        
        <div className="flex gap-3">
            <button className="relative bg-white border border-slate-200 text-slate-700 px-4 py-2 rounded-xl text-sm font-semibold hover:bg-slate-50 transition-colors flex items-center gap-2">
                <ShoppingCart size={18} />
                Viewing Cart
                {cart.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-amber-500 text-slate-900 w-5 h-5 rounded-full text-xs flex items-center justify-center font-bold">{cart.length}</span>
                )}
            </button>
            <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
            <button 
                onClick={() => setViewMode('grid')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === 'grid' ? 'bg-amber-50 text-amber-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <Grid size={16} />
                Grid
            </button>
            <button 
                onClick={() => setViewMode('map')}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${viewMode === 'map' ? 'bg-amber-50 text-amber-600' : 'text-slate-500 hover:text-slate-700'}`}
            >
                <MapIcon size={16} />
                Map
            </button>
            </div>
        </div>
      </div>

      {/* Property Requirements Input (Dream Home Builder) */}
      <div className="bg-slate-900 p-6 rounded-2xl shadow-lg text-white relative overflow-hidden transition-all duration-500">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        
        {!savedRequirements ? (
            <div className="relative z-10">
                <div className="mb-6">
                    <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
                        <Sparkles size={20} className="text-amber-500" />
                        Describe Your Dream Home
                    </h3>
                    <p className="text-slate-400 text-sm">Save your requirements. We'll show you matches and notify you of new listings.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-4">
                         <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Location</label>
                         <input 
                            type="text" 
                            value={searchLocation}
                            onChange={(e) => setSearchLocation(e.target.value)}
                            placeholder="e.g. Sandton, Cape Town" 
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:bg-white/20 transition-all focus:border-amber-500/50" 
                         />
                    </div>
                    <div className="md:col-span-3">
                         <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Max Budget (ZAR)</label>
                         <input 
                            type="text" 
                            value={searchBudget}
                            onChange={(e) => setSearchBudget(e.target.value)}
                            placeholder="e.g. 3000000" 
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:bg-white/20 transition-all focus:border-amber-500/50" 
                         />
                    </div>
                    <div className="md:col-span-5">
                         <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Must-haves / Keywords</label>
                         <div className="flex gap-2">
                             <input 
                                type="text" 
                                value={searchKeywords}
                                onChange={(e) => setSearchKeywords(e.target.value)}
                                placeholder="e.g. Pool, Garden, Security, Pet Friendly" 
                                className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-sm text-white placeholder:text-slate-500 outline-none focus:bg-white/20 transition-all focus:border-amber-500/50" 
                             />
                             <button 
                                onClick={handleSaveRequirements}
                                className="bg-amber-500 text-slate-900 px-6 rounded-xl text-sm font-bold hover:bg-amber-400 transition-colors shadow-lg shadow-amber-900/20 flex items-center gap-2 whitespace-nowrap"
                             >
                                <Bookmark size={18} />
                                Save
                             </button>
                         </div>
                    </div>
                </div>
            </div>
        ) : (
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                     <div className="flex items-center gap-2 mb-2">
                        <span className="bg-amber-500 text-slate-900 text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-wider">Active Search</span>
                        <h3 className="font-bold text-lg">My Dream Home</h3>
                     </div>
                     <div className="flex flex-wrap gap-4 text-sm text-slate-300">
                        {savedRequirements.location && <span className="flex items-center gap-1.5"><MapIcon size={16} className="text-amber-500"/> {savedRequirements.location}</span>}
                        {savedRequirements.budget > 0 && <span className="flex items-center gap-1.5"><span className="text-amber-500 font-bold">R</span> {savedRequirements.budget.toLocaleString()} Max</span>}
                        {savedRequirements.keywords && <span className="flex items-center gap-1.5"><Sparkles size={16} className="text-amber-500"/> {savedRequirements.keywords}</span>}
                     </div>
                </div>
                <div className="flex gap-3">
                     <button 
                        onClick={() => {
                             // Restore values for editing
                             setSearchLocation(savedRequirements.location);
                             setSearchBudget(savedRequirements.budget ? savedRequirements.budget.toString() : '');
                             setSearchKeywords(savedRequirements.keywords);
                             setSavedRequirements(null); 
                        }}
                        className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-xl text-sm font-bold transition-colors"
                     >
                        Edit Criteria
                     </button>
                     <button 
                        onClick={handleClearRequirements}
                        className="bg-white/10 hover:bg-rose-500/20 hover:text-rose-200 text-slate-300 p-2.5 rounded-xl transition-colors"
                     >
                        <X size={20} />
                     </button>
                </div>
            </div>
        )}
      </div>

      {/* Filters & Toggles */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-500 uppercase">Property Type</label>
          <select className="w-full text-sm border-none bg-slate-50 rounded-lg p-2 focus:ring-2 focus:ring-amber-500 outline-none">
            <option>All Types</option>
            <option>House</option>
            <option>Apartment</option>
            <option>Commercial</option>
          </select>
        </div>
        <div className="space-y-1">
          <label className="text-xs font-semibold text-slate-500 uppercase">Price Range</label>
          <select className="w-full text-sm border-none bg-slate-50 rounded-lg p-2 focus:ring-2 focus:ring-amber-500 outline-none">
            <option>Any Price</option>
            <option>R0 - R1.5M</option>
            <option>R1.5M - R3M</option>
            <option>R3M+</option>
          </select>
        </div>
        <div className="space-y-1">
           <label className="text-xs font-semibold text-slate-500 uppercase">Listing Type</label>
           <div className="flex bg-slate-100 p-1 rounded-lg">
              <button 
                onClick={() => setListingType('SALE')}
                className={`flex-1 py-1 text-xs font-bold rounded-md transition-all ${listingType === 'SALE' ? 'bg-white shadow text-amber-600' : 'text-slate-500'}`}
              >
                Buy
              </button>
              <button 
                onClick={() => setListingType('RENT')}
                className={`flex-1 py-1 text-xs font-bold rounded-md transition-all ${listingType === 'RENT' ? 'bg-white shadow text-amber-600' : 'text-slate-500'}`}
              >
                Rent
              </button>
           </div>
        </div>
        <div className="flex items-end">
          <button className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2 rounded-lg flex items-center justify-center gap-2 transition-colors">
            <SlidersHorizontal size={18} />
            More Filters
          </button>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.length > 0 ? filteredProperties.map((property) => (
            <div key={property.id} className="relative group flex flex-col">
                <PropertyCard property={property} onViewDetails={handleViewDetails} />
                <div className="mt-3">
                     <button 
                        onClick={() => handleAttemptAddToCart(property.id)}
                        disabled={cart.includes(property.id)}
                        className={`w-full font-bold py-3 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all active:scale-95 ${
                          cart.includes(property.id) 
                            ? 'bg-emerald-500 text-white cursor-default' 
                            : 'bg-slate-900 hover:bg-slate-800 text-white'
                        }`}
                     >
                        {cart.includes(property.id) ? (
                          <>
                            <CheckCircle2 size={18} />
                            Added to Cart
                          </>
                        ) : (
                          <>
                            <ShoppingCart size={18} className="text-amber-500" />
                            Add to Cart ({listingType === 'SALE' ? 'Buy' : 'Rent'})
                          </>
                        )}
                     </button>
                     <p className="text-[10px] text-center text-slate-400 mt-1">Pre-qualification required for viewing</p>
                </div>
            </div>
          )) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-20 text-slate-400 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
                  <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search size={32} className="text-slate-400" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-600 mb-1">No matches found</h3>
                  <p className="text-sm">We'll notify you when a property matching your dream home criteria is listed!</p>
                  <button 
                    onClick={handleClearRequirements}
                    className="mt-4 text-amber-600 font-bold text-sm hover:underline"
                  >
                    Clear Search
                  </button>
              </div>
          )}
        </div>
      ) : (
        <div className="bg-slate-200 h-[600px] rounded-2xl flex items-center justify-center relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=2000" 
            alt="Map View Placeholder" 
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 flex items-center justify-center">
             <div className="bg-white/90 backdrop-blur px-6 py-4 rounded-2xl shadow-xl text-center">
                <MapIcon size={48} className="text-amber-500 mx-auto mb-3" />
                <h3 className="font-bold text-lg text-slate-900">Map View is coming soon</h3>
                <p className="text-slate-500 text-sm">Interactive property mapping for South Africa.</p>
             </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Marketplace;
