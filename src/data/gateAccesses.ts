import { GateAccess } from '../types';

export const gateAccesses: GateAccess[] = [
  {
    id: 'ga1',
    licensePlate: 'TRK-1234',
    vehicleType: 'container truck',
    driverName: 'John Smith',
    company: 'FastFreight Logistics',
    purpose: 'Container Pickup',
    appointmentTime: '2025-06-15T09:00:00',
    status: 'in-terminal',
    cargoId: 'c1'
  },
  {
    id: 'ga2',
    licensePlate: 'BLK-5678',
    vehicleType: 'bulk carrier',
    driverName: 'Mike Johnson',
    company: 'Bulk Transport Co.',
    purpose: 'Bulk Cargo Delivery',
    appointmentTime: '2025-06-15T10:30:00',
    status: 'scheduled',
    cargoId: 'c2'
  },
  {
    id: 'ga3',
    licensePlate: 'TRK-9012',
    vehicleType: 'flatbed truck',
    driverName: 'Sarah Wilson',
    company: 'Express Logistics',
    purpose: 'Break Bulk Pickup',
    appointmentTime: '2025-06-15T11:15:00',
    status: 'checked-in',
    cargoId: 'c3'
  },
  {
    id: 'ga4',
    licensePlate: 'TRK-3456',
    vehicleType: 'container truck',
    driverName: 'David Brown',
    company: 'Global Transport Ltd.',
    purpose: 'Container Delivery',
    appointmentTime: '2025-06-15T13:45:00',
    status: 'scheduled',
    cargoId: 'c4'
  },
  {
    id: 'ga5',
    licensePlate: 'BLK-7890',
    vehicleType: 'bulk carrier',
    driverName: 'Lisa Chen',
    company: 'Bulk Solutions Inc.',
    purpose: 'Bulk Cargo Pickup',
    appointmentTime: '2025-06-15T14:30:00',
    status: 'scheduled',
    cargoId: 'c5'
  }
];