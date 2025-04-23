import { Document } from '../types';

export const documents: Document[] = [
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