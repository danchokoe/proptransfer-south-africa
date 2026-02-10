
export enum UserRole {
  BUYER = 'BUYER', // Lessee
  SELLER = 'SELLER', // Lessor
  CONVEYANCER = 'CONVEYANCER',
  BOND_ORIGINATOR = 'BOND_ORIGINATOR',
  REAL_ESTATE_AGENT = 'REAL_ESTATE_AGENT',
  AGENCY = 'AGENCY',
  BANK = 'BANK', // Funder
  REGULATORY = 'REGULATORY', // PPRA / EAAB
  MUNICIPAL = 'MUNICIPAL', // Local Government
  DEEDS_OFFICE = 'DEEDS_OFFICE'
}

export interface Property {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  beds: number;
  baths: number;
  sqm: number;
  image: string;
  type: 'House' | 'Apartment' | 'Townhouse';
  listingType: 'SALE' | 'RENT';
  features: string[];
  status?: 'Draft' | 'Mandate_Signed' | 'Listed' | 'Offer_Pending' | 'Sold';
}

export interface Lead {
  id: string;
  name: string;
  matchScore: number;
  preQualifiedAmount: number;
  status: 'New' | 'Contacted' | 'Viewing_Arranged' | 'Offer_Made';
}

export interface TransactionMilestone {
  id: string;
  week: number;
  label: string;
  status: 'pending' | 'in-progress' | 'completed' | 'delayed';
  updatedAt: string;
  description: string;
  responsibleParty: string;
}

export interface UserDocuments {
  idCopy: boolean;
  proofOfRes: boolean;
  bankStatements: boolean; // For Buyers/Lessees
  payslips: boolean;       // For Buyers/Lessees
  taxNumber: boolean;      // For Sellers
  ficaForm: boolean;
  popiaConsent: boolean;
  mandate: boolean;        // For Sellers
  ffc: boolean;            // For Agents
}

export interface Rating {
  average: number;
  count: number;
  metrics: {
    friendliness: number;
    professionalism: number;
    communication: number;
    turnaround: number;
  }
}

export interface UserProfile {
  id: string;
  name: string;
  role: UserRole;
  email: string;
  income?: number;
  creditScore?: number;
  subscription?: 'Beginner' | 'Professional' | 'Expert' | 'Agency';
  verified?: boolean; // General Verification
  biometricsVerified?: boolean; // Face/Fingerprint
  documents: UserDocuments;
  rating?: Rating;
  cart?: string[]; // IDs of properties in cart
  qualifications?: {
    ffc: boolean;
    fica: boolean;
    popia: boolean;
  };
}
