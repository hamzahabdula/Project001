import { Vessel } from '../types';

export const vessels: Vessel[] = [
  {
    id: 'v1',
    name: 'MV Ocean Voyager',
    imo: 'IMO9876544',
    type: 'Container Ship',
    length: 294,
    status: 'berthed',
    eta: '2025-06-15T07:00:00',
    etd: '2025-06-16T18:00:00',
    berthId: 'b1',
    operationsHistory: [
      {
        id: 'op1',
        type: 'unloading',
        status: 'in-progress',
        startTime: '2025-06-15T08:00:00',
        totalCargo: 500,
        processedCargo: 250,
        unit: 'TEU',
        shifts: [
          {
            id: 'shift1',
            shiftNumber: 1,
            date: '2025-06-15',
            startTime: '2025-06-15T08:00:00',
            endTime: '2025-06-15T16:00:00',
            progress: {
              start: 0,
              midFirst: 45,
              midSecond: 85,
              end: 120
            },
            supervisor: 'James Wilson',
            notes: 'Normal operations, slight delay due to rain at 14:00'
          },
          {
            id: 'shift2',
            shiftNumber: 2,
            date: '2025-06-15',
            startTime: '2025-06-15T16:00:00',
            endTime: '2025-06-16T00:00:00',
            progress: {
              start: 120,
              midFirst: 165,
              midSecond: 210,
              end: 250
            },
            supervisor: 'Sarah Chen',
            notes: 'Increased productivity in second half of shift'
          }
        ],
        delays: [
          {
            id: 'del1',
            startTime: '2025-06-15T10:30:00',
            endTime: '2025-06-15T11:30:00',
            reason: 'Equipment maintenance',
            impact: 'medium',
            resolution: 'Crane repairs completed'
          }
        ]
      },
      {
        id: 'op2',
        type: 'loading',
        status: 'completed',
        startTime: '2025-06-15T12:00:00',
        endTime: '2025-06-15T16:00:00',
        totalCargo: 300,
        processedCargo: 300,
        unit: 'TEU',
        shifts: [
          {
            id: 'shift3',
            shiftNumber: 1,
            date: '2025-06-15',
            startTime: '2025-06-15T12:00:00',
            endTime: '2025-06-15T20:00:00',
            progress: {
              start: 0,
              midFirst: 80,
              midSecond: 175,
              end: 300
            },
            supervisor: 'Mike Johnson',
            notes: 'Excellent productivity throughout the shift'
          }
        ]
      }
    ],
    category: {
      name: 'container',
      requiredDocuments: [
        {
          id: 'doc1',
          name: 'Cargo Manifest',
          type: { code: 'manifest', description: 'Cargo Manifest' },
          stage: 'arrival',
          required: true
        },
        {
          id: 'doc2',
          name: 'Customs Declaration',
          type: { code: 'customs', description: 'Customs Declaration' },
          stage: 'both',
          required: true
        }
      ]
    },
    contacts: {
      shipper: {
        name: 'John Smith',
        company: 'Global Shipping Co.',
        role: 'Operations Manager',
        phone: '+1-555-0123',
        email: 'john.smith@globalshipping.com'
      },
      buyer: [
        {
          name: 'Sarah Chen',
          company: 'Pacific Trade Ltd.',
          role: 'Import Manager',
          phone: '+1-555-0124',
          email: 'sarah.chen@pacifictrade.com'
        }
      ],
      shippingAgent: {
        name: 'Mike Johnson',
        company: 'Maritime Services Inc.',
        role: 'Port Agent',
        phone: '+1-555-0125',
        email: 'mike.j@maritimeservices.com'
      },
      truckingAgents: [
        {
          name: 'David Wilson',
          company: 'FastFreight Logistics',
          role: 'Transport Coordinator',
          phone: '+1-555-0126',
          email: 'david.w@fastfreight.com'
        }
      ]
    }
  },
  {
    id: 'v2',
    name: 'MV Star Phoenix',
    imo: 'IMO9876545',
    type: 'Bulk Carrier',
    length: 225,
    status: 'approaching',
    eta: '2025-06-16T14:30:00',
    etd: '2025-06-17T20:00:00',
    category: {
      name: 'bulk',
      requiredDocuments: [
        {
          id: 'doc3',
          name: 'Bill of Lading',
          type: { code: 'bill-of-lading', description: 'Bill of Lading' },
          stage: 'arrival',
          required: true
        }
      ]
    },
    contacts: {
      shipper: {
        name: 'Robert Lee',
        company: 'Bulk Solutions Co.',
        role: 'Shipping Manager',
        phone: '+1-555-0127',
        email: 'robert.lee@bulksolutions.com'
      },
      buyer: [
        {
          name: 'Emma Davis',
          company: 'Industrial Materials Inc.',
          role: 'Procurement Director',
          phone: '+1-555-0128',
          email: 'emma.d@industrialmaterials.com'
        }
      ],
      shippingAgent: {
        name: 'James Brown',
        company: 'Port Agency Services',
        role: 'Senior Agent',
        phone: '+1-555-0129',
        email: 'james.b@portagency.com'
      },
      truckingAgents: [
        {
          name: 'Lisa Martinez',
          company: 'Cargo Transport Co.',
          role: 'Logistics Manager',
          phone: '+1-555-0130',
          email: 'lisa.m@cargotransport.com'
        }
      ]
    }
  },
  {
    id: 'v3',
    name: 'MV Pacific Trader',
    imo: 'IMO9876546',
    type: 'General Cargo',
    length: 183,
    status: 'berthed',
    eta: '2025-06-15T09:45:00',
    etd: '2025-06-16T15:00:00',
    berthId: 'b5',
    operationsHistory: [
      {
        id: 'op3',
        type: 'unloading',
        status: 'completed',
        startTime: '2025-06-15T10:00:00',
        endTime: '2025-06-15T14:00:00',
        totalCargo: 1500,
        processedCargo: 1500,
        unit: 'MT',
        shifts: [
          {
            id: 'shift4',
            shiftNumber: 1,
            date: '2025-06-15',
            startTime: '2025-06-15T10:00:00',
            endTime: '2025-06-15T18:00:00',
            progress: {
              start: 0,
              midFirst: 400,
              midSecond: 900,
              end: 1500
            },
            supervisor: 'Robert Chen',
            notes: 'Completed ahead of schedule'
          }
        ],
        delays: [
          {
            id: 'del2',
            startTime: '2025-06-15T11:00:00',
            endTime: '2025-06-15T11:45:00',
            reason: 'Weather conditions',
            impact: 'low',
            resolution: 'Operations resumed after weather improved'
          }
        ]
      }
    ],
    category: {
      name: 'multi-purpose',
      requiredDocuments: [
        {
          id: 'doc4',
          name: 'Cargo Declaration',
          type: { code: 'manifest', description: 'Cargo Declaration' },
          stage: 'both',
          required: true
        }
      ]
    },
    contacts: {
      shipper: {
        name: 'Thomas Anderson',
        company: 'Pacific Trading Co.',
        role: 'Operations Director',
        phone: '+1-555-0131',
        email: 'thomas.a@pacifictrading.com'
      },
      buyer: [
        {
          name: 'Maria Garcia',
          company: 'Global Imports Ltd.',
          role: 'Purchase Manager',
          phone: '+1-555-0132',
          email: 'maria.g@globalimports.com'
        }
      ],
      shippingAgent: {
        name: 'Peter Zhang',
        company: 'Ocean Agency Services',
        role: 'Port Representative',
        phone: '+1-555-0133',
        email: 'peter.z@oceanagency.com'
      },
      truckingAgents: [
        {
          name: 'Karen White',
          company: 'Express Logistics',
          role: 'Transport Manager',
          phone: '+1-555-0134',
          email: 'karen.w@expresslogistics.com'
        }
      ]
    }
  }
];