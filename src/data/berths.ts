import { BerthInfo } from '../types';

export const berths: BerthInfo[] = [
  {
    id: 'b1',
    name: 'Berth 1',
    length: 300,
    depth: 15,
    status: 'occupied',
    vesselId: 'v1'
  },
  {
    id: 'b2',
    name: 'Berth 2',
    length: 280,
    depth: 14,
    status: 'available',
    vesselId: null
  },
  {
    id: 'b3',
    name: 'Berth 3',
    length: 250,
    depth: 13,
    status: 'maintenance',
    vesselId: null
  },
  {
    id: 'b4',
    name: 'Berth 4',
    length: 320,
    depth: 16,
    status: 'available',
    vesselId: null
  },
  {
    id: 'b5',
    name: 'Berth 5',
    length: 290,
    depth: 15,
    status: 'occupied',
    vesselId: 'v3'
  },
  {
    id: 'b6',
    name: 'Berth 6',
    length: 270,
    depth: 14,
    status: 'available',
    vesselId: null
  }
];