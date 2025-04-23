import { CargoInfo } from '../types';

export const cargos: CargoInfo[] = [
  {
    id: 'c1',
    vesselId: 'v1',
    type: 'Container',
    status: 'discharged',
    quantity: 250,
    unit: 'TEU',
    description: 'Mixed consumer goods',
    destination: 'Inland Container Depot',
    eta: '2025-06-15T12:00:00',
    customsStatus: 'cleared',
    hazardous: false
  },
  {
    id: 'c2',
    vesselId: 'v2',
    type: 'Bulk',
    status: 'in-transit',
    quantity: 45000,
    unit: 'MT',
    description: 'Iron ore',
    destination: 'Bulk Storage Area B',
    eta: '2025-06-16T16:00:00',
    customsStatus: 'pending',
    hazardous: false
  },
  {
    id: 'c3',
    vesselId: 'v3',
    type: 'Break Bulk',
    status: 'loading',
    quantity: 1500,
    unit: 'MT',
    description: 'Steel coils',
    destination: 'Warehouse 7',
    eta: '2025-06-15T14:00:00',
    customsStatus: 'cleared',
    hazardous: false
  },
  {
    id: 'c4',
    vesselId: 'v1',
    type: 'Container',
    status: 'awaiting-discharge',
    quantity: 150,
    unit: 'TEU',
    description: 'Automotive parts',
    destination: 'Container Terminal A',
    eta: '2025-06-15T13:00:00',
    customsStatus: 'in-progress',
    hazardous: false
  },
  {
    id: 'c5',
    vesselId: 'v2',
    type: 'Bulk',
    status: 'scheduled',
    quantity: 30000,
    unit: 'MT',
    description: 'Coal',
    destination: 'Bulk Storage Area C',
    eta: '2025-06-16T18:00:00',
    customsStatus: 'not-started',
    hazardous: true
  }
];