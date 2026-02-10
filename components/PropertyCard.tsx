
import React from 'react';
import { BedDouble, Bath, Maximize, MapPin, Sparkles } from 'lucide-react';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  onViewDetails?: (id: string) => void;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property, onViewDetails }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-md transition-shadow group">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={property.image} 
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-slate-800 shadow-sm">
          {property.type}
        </div>
        <button className="absolute top-4 right-4 p-2 bg-white/90 backdrop-blur-sm rounded-full text-slate-600 hover:text-amber-500 transition-colors shadow-sm">
          <Sparkles size={16} />
        </button>
      </div>
      
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-slate-900 truncate pr-2">{property.title}</h3>
          <span className="text-amber-600 font-bold whitespace-nowrap">R {(property.price / 1000000).toFixed(1)}M</span>
        </div>
        
        <div className="flex items-center text-slate-500 text-sm gap-1 mb-4">
          <MapPin size={14} />
          <span>{property.location}</span>
        </div>
        
        <div className="grid grid-cols-3 gap-4 border-y border-slate-100 py-3 mb-4">
          <div className="flex items-center gap-2 text-slate-600">
            <BedDouble size={18} className="text-amber-500" />
            <span className="text-sm font-medium">{property.beds}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Bath size={18} className="text-amber-500" />
            <span className="text-sm font-medium">{property.baths}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-600">
            <Maximize size={18} className="text-amber-500" />
            <span className="text-sm font-medium">{property.sqm}m²</span>
          </div>
        </div>

        <button 
          onClick={() => onViewDetails?.(property.id)}
          className="w-full bg-slate-50 text-slate-700 font-semibold py-2 rounded-lg hover:bg-slate-900 hover:text-white transition-all"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PropertyCard;
