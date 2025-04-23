// Mock notifications data
export const notifications = [
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

// Mock documents data
export const documents = [
  {
    id: 'doc1',
    title: 'Cargo Manifest - MV Ocean Voyager',
    type: 'manifest',
    submissionDate: '2025-06-15T08:30:00',
    submittedBy: 'Mike Johnson',
    status: 'in-review'
  },
  {
    id: 'doc2',
    title: 'Customs Declaration - MV Star Phoenix',
    type: 'customs',
    submissionDate: '2025-06-15T07:45:00',
    submittedBy: 'James Brown',
    status: 'submitted'
  },
  {
    id: 'doc3',
    title: 'Bill of Lading - MV Star Phoenix',
    type: 'bill-of-lading',
    submissionDate: '2025-06-14T16:20:00',
    submittedBy: 'Robert Lee',
    status: 'approved'
  },
  {
    id: 'doc4',
    title: 'Safety Certificate - MV Pacific Trader',
    type: 'certificate',
    submissionDate: '2025-06-14T14:15:00',
    submittedBy: 'Peter Zhang',
    status: 'approved'
  },
  {
    id: 'doc5',
    title: 'Dangerous Goods Declaration',
    type: 'customs',
    submissionDate: '2025-06-14T11:30:00',
    submittedBy: 'Thomas Anderson',
    status: 'rejected'
  },
  {
    id: 'doc6',
    title: 'Cargo Declaration - MV Pacific Trader',
    type: 'manifest',
    submissionDate: '2025-06-14T09:45:00',
    submittedBy: 'Peter Zhang',
    status: 'draft'
  }
];

// Mock crew members data
export const crewMembers = [
  {
    id: 'cm1',
    name: 'James Wilson',
    rank: 'Captain',
    vesselId: 'v1',
    status: 'on-duty',
    documents: [
      {
        id: 'cd1',
        type: 'passport',
        number: 'P123456',
        issuingCountry: 'United States',
        issueDate: '2022-01-15',
        expiryDate: '2032-01-14',
        status: 'valid'
      },
      {
        id: 'cd2',
        type: 'seaman-book',
        number: 'SB789012',
        issuingCountry: 'United States',
        issueDate: '2023-03-20',
        expiryDate: '2025-07-01',
        status: 'expiring-soon'
      }
    ]
  },
  {
    id: 'cm2',
    name: 'Maria Rodriguez',
    rank: 'Chief Engineer',
    vesselId: 'v1',
    status: 'shore-leave',
    shoreLeaveEnd: '2025-06-15T18:00:00',
    documents: [
      {
        id: 'cd3',
        type: 'passport',
        number: 'P234567',
        issuingCountry: 'Spain',
        issueDate: '2020-05-10',
        expiryDate: '2030-05-09',
        status: 'valid'
      },
      {
        id: 'cd4',
        type: 'engineering-certificate',
        number: 'EC345678',
        issuingCountry: 'Spain',
        issueDate: '2021-08-15',
        expiryDate: '2025-01-20',
        status: 'valid'
      }
    ]
  },
  {
    id: 'cm3',
    name: 'Chen Wei',
    rank: 'Second Officer',
    vesselId: 'v2',
    status: 'pending-approval',
    documents: [
      {
        id: 'cd5',
        type: 'passport',
        number: 'P345678',
        issuingCountry: 'China',
        issueDate: '2019-11-30',
        expiryDate: '2024-06-20',
        status: 'expired'
      },
      {
        id: 'cd6',
        type: 'officer-certificate',
        number: 'OC456789',
        issuingCountry: 'China',
        issueDate: '2022-04-01',
        expiryDate: '2027-03-31',
        status: 'valid'
      }
    ]
  }
];

// Mock berths data
export const berths = [
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

// Mock vessels data
export const vessels = [
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

// Mock port capacity data
export const portCapacity = {
  containerCapacity: {
    used: 3500,
    total: 5000
  },
  bulkCapacity: {
    used: 15000,
    total: 20000
  },
  berthOccupancy: 65,
  yardUtilization: 70,
  warehouseUtilization: 55,
  tankFarmUtilization: 40
};

// Mock service requests data
export const serviceRequests = [
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

// Mock document progress data
export const documentProgress: { [key: string]: { arrival: number; departure: number } } = {
  'v1': { arrival: 75, departure: 50 },
  'v2': { arrival: 100, departure: 25 },
  'v3': { arrival: 50, departure: 100 }
};

// Mock statistics data
export const statistics = {
  vesselsInPort: 10,
  vesselsExpected: 5,
  cargoInTransit: 150,
  documentsPendingReview: 20,
  gateAppointmentsToday: 30,
  pendingServiceRequests: 5
};

// Mock cargos data
export const cargos = [
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

// Mock gate accesses data
export const gateAccesses = [
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

// Mock bonded zones data
export const bondedZones = [
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