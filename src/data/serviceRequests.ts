import { ServiceRequest } from '../types';

export const serviceRequests: ServiceRequest[] = [
  {
    id: 'sr1',
    vesselId: 'v1',
    vesselName: 'MV Ocean Voyager',
    type: 'Pilotage',
    status: 'pending',
    requestedTime: '2025-06-15T06:00:00',
    estimatedDuration: '1 hour',
    priority: 'high',
    requestedBy: {
      name: 'Mike Johnson',
      company: 'Maritime Services Inc.',
      role: 'Port Agent'
    }
  },
  {
    id: 'sr2',
    vesselId: 'v1',
    vesselName: 'MV Ocean Voyager',
    type: 'Bunkering',
    status: 'approved',
    requestedTime: '2025-06-15T14:00:00',
    estimatedDuration: '4 hours',
    priority: 'medium',
    requestedBy: {
      name: 'Mike Johnson',
      company: 'Maritime Services Inc.',
      role: 'Port Agent'
    }
  },
  {
    id: 'sr3',
    vesselId: 'v2',
    vesselName: 'MV Star Phoenix',
    type: 'Pilotage',
    status: 'pending',
    requestedTime: '2025-06-16T13:30:00',
    estimatedDuration: '1 hour',
    priority: 'high',
    requestedBy: {
      name: 'James Brown',
      company: 'Port Agency Services',
      role: 'Senior Agent'
    }
  },
  {
    id: 'sr4',
    vesselId: 'v3',
    vesselName: 'MV Pacific Trader',
    type: 'Fresh Water Supply',
    status: 'in-progress',
    requestedTime: '2025-06-15T10:00:00',
    estimatedDuration: '2 hours',
    priority: 'medium',
    requestedBy: {
      name: 'Peter Zhang',
      company: 'Ocean Agency Services',
      role: 'Port Representative'
    }
  },
  {
    id: 'sr5',
    vesselId: 'v3',
    vesselName: 'MV Pacific Trader',
    type: 'Waste Collection',
    status: 'scheduled',
    requestedTime: '2025-06-15T13:00:00',
    estimatedDuration: '3 hours',
    priority: 'medium',
    requestedBy: {
      name: 'Peter Zhang',
      company: 'Ocean Agency Services',
      role: 'Port Representative'
    }
  }
];