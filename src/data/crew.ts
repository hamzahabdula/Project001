import { CrewMember } from '../types';

export const crewMembers: CrewMember[] = [
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