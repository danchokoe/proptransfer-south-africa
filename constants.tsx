
import { Property, TransactionMilestone, UserProfile, UserRole } from './types';

const DEFAULT_DOCS = {
  idCopy: false,
  proofOfRes: false,
  bankStatements: false,
  payslips: false,
  taxNumber: false,
  ficaForm: false,
  popiaConsent: false,
  mandate: false,
  ffc: false
};

const MOCK_RATING = {
  average: 4.8,
  count: 124,
  metrics: {
    friendliness: 4.9,
    professionalism: 4.8,
    communication: 4.7,
    turnaround: 4.8
  }
};

export const MOCK_USERS: UserProfile[] = [
  {
    id: 'u1',
    name: 'Thabo Mbeki',
    role: UserRole.BUYER,
    email: 'thabo@proptransfer.co.za',
    income: 55000,
    creditScore: 715,
    verified: true,
    biometricsVerified: true,
    documents: { ...DEFAULT_DOCS, idCopy: true, ficaForm: true },
    rating: MOCK_RATING
  },
  {
    id: 'u2',
    name: 'Sarah Jenkins',
    role: UserRole.SELLER,
    email: 'sarah.j@gmail.com',
    income: 85000,
    creditScore: 780,
    verified: true,
    biometricsVerified: true,
    documents: { ...DEFAULT_DOCS, mandate: true },
    rating: MOCK_RATING
  },
  {
    id: 'u3',
    name: 'Adv. Sipho Dlamini',
    role: UserRole.CONVEYANCER,
    email: 'sipho@dlamini-law.co.za',
    subscription: 'Expert',
    verified: true,
    biometricsVerified: true,
    documents: { ...DEFAULT_DOCS, ffc: true },
    rating: MOCK_RATING
  },
  {
    id: 'u4',
    name: 'Kevin Naidoo',
    role: UserRole.BOND_ORIGINATOR,
    email: 'kevin@betterbond-demo.co.za',
    subscription: 'Professional',
    verified: true,
    biometricsVerified: true,
    documents: { ...DEFAULT_DOCS },
    rating: MOCK_RATING
  },
  {
    id: 'u5',
    name: 'Priya Chetty',
    role: UserRole.REAL_ESTATE_AGENT,
    email: 'priya@urban-estates.co.za',
    subscription: 'Expert',
    verified: true,
    biometricsVerified: true,
    documents: { ...DEFAULT_DOCS, ffc: true, ficaForm: true, popiaConsent: true },
    rating: MOCK_RATING
  },
  {
    id: 'u10',
    name: 'Monyake Makhoana',
    role: UserRole.REAL_ESTATE_AGENT,
    email: 'monyake@expert-realty.co.za',
    subscription: 'Professional',
    verified: true,
    biometricsVerified: false, // Needs setup
    documents: { ...DEFAULT_DOCS, ffc: true },
    rating: { ...MOCK_RATING, average: 4.5 }
  },
  {
    id: 'u11',
    name: 'Jason Sterling',
    role: UserRole.REAL_ESTATE_AGENT,
    email: 'jason@platinum-sales.co.za',
    subscription: 'Expert',
    verified: true,
    biometricsVerified: true,
    documents: { ...DEFAULT_DOCS, ffc: true, ficaForm: true, popiaConsent: true },
    rating: {
      average: 4.9,
      count: 215,
      metrics: {
        friendliness: 5.0,
        professionalism: 5.0,
        communication: 4.8,
        turnaround: 4.9
      }
    }
  },
  {
    id: 'u6',
    name: 'FNB Home Loans',
    role: UserRole.BANK,
    email: 'homeloans@fnb.co.za',
    verified: true,
    biometricsVerified: true,
    documents: { ...DEFAULT_DOCS },
    rating: MOCK_RATING
  },
  {
    id: 'u7',
    name: 'PPRA Compliance',
    role: UserRole.REGULATORY,
    email: 'audit@ppra.org.za',
    verified: true,
    biometricsVerified: true,
    documents: { ...DEFAULT_DOCS },
    rating: MOCK_RATING
  },
  {
    id: 'u8',
    name: 'City of JHB',
    role: UserRole.MUNICIPAL,
    email: 'rates@joburg.org.za',
    verified: true,
    biometricsVerified: true,
    documents: { ...DEFAULT_DOCS },
    rating: MOCK_RATING
  },
  {
    id: 'u9',
    name: 'Pretoria Deeds',
    role: UserRole.DEEDS_OFFICE,
    email: 'registrar@deeds.gov.za',
    verified: true,
    biometricsVerified: true,
    documents: { ...DEFAULT_DOCS },
    rating: MOCK_RATING
  }
];

export const MOCK_PROPERTIES: Property[] = [
  {
    id: '1',
    title: 'Modern Luxury in Sandton',
    description: 'Breathtaking 4-bedroom home with panoramic views. Features a heated pool and smart home automation.',
    price: 4500000,
    location: 'Morningside, Sandton',
    beds: 4,
    baths: 3,
    sqm: 450,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800',
    type: 'House',
    listingType: 'SALE',
    features: ['Pool', 'Security Estate', 'Solar Powered']
  },
  {
    id: '2',
    title: 'Contemporary Waterfront Apartment',
    description: 'Perfect for professionals. A stone\'s throw from the V&A Waterfront. Excellent rental yield.',
    price: 2800000,
    location: 'Cape Town City Centre',
    beds: 2,
    baths: 2,
    sqm: 110,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=800',
    type: 'Apartment',
    listingType: 'SALE',
    features: ['Concierge', 'Gym', 'Fibre Ready']
  },
  {
    id: '3',
    title: 'Spacious Family Townhouse',
    description: 'Quiet neighborhood near top schools. Large garden for kids and pets.',
    price: 1750000,
    location: 'Umhlanga, Durban',
    beds: 3,
    baths: 2.5,
    sqm: 220,
    image: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=800',
    type: 'Townhouse',
    listingType: 'SALE',
    features: ['Pet Friendly', 'Double Garage', 'Garden']
  },
  {
    id: '4',
    title: 'Executive Rental: Sandton Skye',
    description: 'Fully furnished executive suite. Walking distance to Gautrain.',
    price: 15000, // Monthly rental
    location: 'Sandton Central',
    beds: 1,
    baths: 1,
    sqm: 55,
    image: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&q=80&w=800',
    type: 'Apartment',
    listingType: 'RENT',
    features: ['Furnished', 'Pool', 'Cleaning Service']
  }
];

// Based on the 6-week activity timeline in spec
export const TRANSACTION_MILESTONES: TransactionMilestone[] = [
  { 
    id: '1', 
    week: 1,
    label: 'Mandate & Pre-qualification', 
    status: 'completed', 
    updatedAt: 'Week 1',
    description: 'Mandate signed, photos taken, listing live. Buyer pre-qualified with FICA/POPIA.',
    responsibleParty: 'Seller, Agent, Bond Originator'
  },
  { 
    id: '2', 
    week: 2,
    label: 'Offer to Purchase (OTP)', 
    status: 'completed', 
    updatedAt: 'Week 2',
    description: 'Viewings completed. OTP signed by all parties. Instructions sent to attorneys.',
    responsibleParty: 'Buyer, Seller, Agent'
  },
  { 
    id: '3', 
    week: 3,
    label: 'Bond Application & Transfer Docs', 
    status: 'in-progress', 
    updatedAt: 'Current',
    description: 'Transfer docs signed. Bond applied. Rates figures requested from Muni.',
    responsibleParty: 'Conveyancer, Bond Originator'
  },
  { 
    id: '4', 
    week: 4,
    label: 'Guarantees & Certificates', 
    status: 'pending', 
    updatedAt: '-',
    description: 'Rates paid. Clearance certs received. Bond guarantees issued.',
    responsibleParty: 'Attorneys, Municipality, Bank'
  },
  { 
    id: '5', 
    week: 5,
    label: 'Lodgement', 
    status: 'pending', 
    updatedAt: '-',
    description: 'Documents lodged at Deeds Office for examination.',
    responsibleParty: 'Conveyancers, Deeds Office'
  },
  { 
    id: '6', 
    week: 6,
    label: 'Registration', 
    status: 'pending', 
    updatedAt: '-',
    description: 'Property transferred. Bond registered/cancelled.',
    responsibleParty: 'Deeds Office'
  }
];
