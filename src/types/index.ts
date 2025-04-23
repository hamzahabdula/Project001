export interface Vessel {
  id: string;
  name: string;
  imo: string;
  type: string;
  length: number;
  eta: string;
  etd: string;
  status: 'scheduled' | 'approaching' | 'berthed' | 'departed';
  berthId?: string;
  category: VesselCategory;
  contacts: {
    shipper: Contact;
    buyer: Contact[];
    shippingAgent: Contact;
    truckingAgents: Contact[];
  };
  operationsHistory?: OperationHistory[];
}

export interface Contact {
  name: string;
  company: string;
  role: string;
  phone: string;
  email: string;
}

export interface VesselCategory {
  name: string;
  requiredDocuments: RequiredDocument[];
}

export interface RequiredDocument {
  id: string;
  name: string;
  type: {
    code: string;
    description: string;
  };
  stage: 'arrival' | 'departure' | 'both';
  required: boolean;
}

export interface OperationHistory {
  id: string;
  type: 'loading' | 'unloading';
  status: 'in-progress' | 'completed' | 'halted';
  startTime: string;
  endTime?: string;
  totalCargo: number;
  processedCargo: number;
  unit: string;
  delays?: OperationDelay[];
  shifts: ShiftProgress[];
}

export interface ShiftProgress {
  id: string;
  shiftNumber: number;
  date: string;
  startTime: string;
  endTime: string;
  progress: {
    start: number;
    midFirst: number;
    midSecond: number;
    end: number;
  };
  supervisor: string;
  notes?: string;
}

export interface OperationDelay {
  id: string;
  startTime: string;
  endTime?: string;
  reason: string;
  impact: 'low' | 'medium' | 'high';
  resolution?: string;
}

export interface BerthInfo {
  id: string;
  name: string;
  length: number;
  depth: number;
  status: 'available' | 'occupied' | 'maintenance';
  vesselId: string | null;
}

export interface CargoInfo {
  id: string;
  vesselId: string;
  type: string;
  status: string;
  quantity: number;
  unit: string;
  description: string;
  destination: string;
  eta: string;
  customsStatus: string;
  hazardous: boolean;
  location?: string;
  arrivalDate?: string;
  name?: string;
}

export interface BondedZone {
  id: string;
  name: string;
  type: string;
  status: string;
  securityLevel: string;
  capacity: {
    total: number;
    used: number;
    unit: string;
  };
  nextInspection: string;
  restrictions?: string[];
}

export interface Document {
  id: string;
  title: string;
  type: string;
  submissionDate: string;
  submittedBy: string;
  status: string;
}

export interface GateAccess {
  id: string;
  licensePlate: string;
  vehicleType: string;
  driverName: string;
  company: string;
  purpose: string;
  appointmentTime: string;
  status: string;
  cargoId: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface ServiceRequest {
  id: string;
  vesselId: string;
  vesselName: string;
  type: string;
  status: string;
  requestedTime: string;
  estimatedDuration: string;
  priority: string;
  requestedBy: {
    name: string;
    company: string;
    role: string;
  };
  scheduledDate?: string;
}