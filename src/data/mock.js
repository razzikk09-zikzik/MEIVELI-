// src/data/mock.js
// Mock data for MEYVIZHI scam-checking app

export const mapMarkers = [
  {
    id: 1,
    name: 'Adyar',
    lat: 13.0012,
    lng: 80.2565,
    reports: 3,
    level: 'low', // yellow
  },
  {
    id: 2,
    name: 'Velachery',
    lat: 12.9815,
    lng: 80.2180,
    reports: 14,
    level: 'high', // red
  },
  {
    id: 3,
    name: 'Sholinganallur',
    lat: 12.9010,
    lng: 80.2279,
    reports: 3,
    level: 'medium', // orange
  },
];

export const exampleMessages = {
  'Bank KYC':
    'Dear Customer, your SBI account will be suspended. Update KYC immediately at http://sbi-kyc-update.xyz or call 9876543210.',
  'Courier':
    'Your parcel is held at customs. Pay Rs.199 delivery fee at: http://dhl-india-delivery.net/pay to release.',
  'UPI':
    'Congratulations! You have received Rs.5000 in your UPI account. Click here to claim: http://upi-prize.in/claim',
  'Electricity':
    'TNEB Notice: Your electricity connection will be cut tonight at 9 PM due to pending dues. Call 9988776655 to pay now.',
  'Job scam':
    'Hiring! Work from home. Earn Rs.50,000/month. No experience needed. Pay Rs.2000 registration. WhatsApp: 9123456789',
};

export const recentScams = [
  {
    id: 1,
    title: 'Bank KYC Impersonation',
    risk: 'HIGH RISK',
    description: 'Fake bank messages asking for OTP.',
    icon: 'Building2',
    color: 'red',
  },
  {
    id: 2,
    title: 'Courier Refund Scam',
    risk: 'MEDIUM RISK',
    description: 'Fake delivery links asking for payment.',
    icon: 'Truck',
    color: 'amber',
  },
  {
    id: 3,
    title: 'Fake Job Recruitment',
    risk: 'HIGH RISK',
    description: 'Job offers asking for upfront money.',
    icon: 'Briefcase',
    color: 'red',
  },
];

export const navItems = [
  { id: 'home', label: 'Home', icon: 'Home', active: true },
  { id: 'report', label: 'Report a Scam', icon: 'ShieldAlert', active: false },
  { id: 'threats', label: 'Active Threats', icon: 'TriangleAlert', active: false },
  { id: 'guide', label: 'Safety Guide', icon: 'BookOpen', active: false },
  { id: 'help', label: 'Help & Resources', icon: 'FileText', active: false },
];

export const reportTiles = [
  { id: 'sms', label: 'SMS', icon: 'MessageSquare', color: '#2563EB' },
  { id: 'call', label: 'Phone Call', icon: 'Phone', color: '#16A34A' },
  { id: 'whatsapp', label: 'WhatsApp', icon: 'MessageCircle', color: '#16A34A' },
  { id: 'website', label: 'Website / URL', icon: 'Globe', color: '#2563EB' },
  { id: 'upi', label: 'UPI / Payment', icon: 'IndianRupee', color: '#DC2626' },
  { id: 'job', label: 'Job Offer', icon: 'Briefcase', color: '#7C3AED' },
];
