import { Notification } from '../types';

export const notifications: Notification[] = [
  {
    id: 'n1',
    title: 'Vessel Arrival',
    message: 'MV Ocean Voyager has arrived at berth B1',
    timestamp: '2025-06-15T07:15:00',
    read: false
  },
  {
    id: 'n2',
    title: 'Document Update',
    message: 'New cargo manifest uploaded for MV Star Phoenix',
    timestamp: '2025-06-15T06:30:00',
    read: false
  },
  {
    id: 'n3',
    title: 'Schedule Change',
    message: 'ETD updated for MV Pacific Trader',
    timestamp: '2025-06-14T22:45:00',
    read: true
  },
  {
    id: 'n4',
    title: 'Berth Assignment',
    message: 'Berth B5 assigned to MV Pacific Trader',
    timestamp: '2025-06-14T20:15:00',
    read: true
  },
  {
    id: 'n5',
    title: 'System Update',
    message: 'Port management system maintenance scheduled for tonight',
    timestamp: '2025-06-14T18:00:00',
    read: true
  }
];