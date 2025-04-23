import { BondedZone } from '../types';

export const bondedZones: BondedZone[] = [
  {
    id: 'bz1',
    name: 'Bonded Zone A',
    type: 'container-storage',
    status: 'active',
    securityLevel: 'High',
    capacity: {
      total: 1000,
      used: 750,
      unit: 'TEU'
    },
    nextInspection: '2025-06-20T10:00:00'
  },
  {
    id: 'bz2',
    name: 'Bonded Zone B',
    type: 'warehouse',
    status: 'active',
    securityLevel: 'High',
    capacity: {
      total: 5000,
      used: 3500,
      unit: 'sqm'
    },
    nextInspection: '2025-06-22T14:00:00',
    restrictions: [
      'Temperature controlled access only',
      'Special handling required'
    ]
  },
  {
    id: 'bz3',
    name: 'Bonded Zone C',
    type: 'dangerous-goods',
    status: 'maintenance',
    securityLevel: 'Maximum',
    capacity: {
      total: 2000,
      used: 1200,
      unit: 'sqm'
    },
    nextInspection: '2025-06-18T09:00:00',
    restrictions: [
      'Hazmat certification required',
      'Limited access hours'
    ]
  }
];