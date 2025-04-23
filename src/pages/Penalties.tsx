import React, { useState } from 'react';
import { AlertTriangle, DollarSign, Filter, Plus, Search, Clock, FileText, Ship, Package, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import { vessels } from '../data/mockData';

interface Penalty {
  id: string;
  vesselId: string;
  type: 'late-arrival' | 'environmental' | 'safety' | 'documentation' | 'operational';
  description: string;
  amount: number;
  status: 'pending' | 'paid' | 'disputed' | 'waived';
  issueDate: string;
  dueDate: string;
  violationDate: string;
}

// Sample penalties data
const penalties: Penalty[] = [
  {
    id: 'p1',
    vesselId: 'v1',
    type: 'late-arrival',
    description: 'Vessel arrived 6 hours after scheduled berthing time',
    amount: 5000,
    status: 'pending',
    issueDate: '2025-06-15T10:00:00',
    dueDate: '2025-06-30T23:59:59',
    violationDate: '2025-06-15T06:00:00'
  },
  {
    id: 'p2',
    vesselId: 'v2',
    type: 'environmental',
    description: 'Unauthorized discharge of ballast water',
    amount: 15000,
    status: 'disputed',
    issueDate: '2025-06-14T15:30:00',
    dueDate: '2025-06-29T23:59:59',
    violationDate: '2025-06-14T14:20:00'
  },
  {
    id: 'p3',
    vesselId: 'v3',
    type: 'documentation',
    description: 'Late submission of cargo manifest',
    amount: 2500,
    status: 'paid',
    issueDate: '2025-06-13T09:15:00',
    dueDate: '2025-06-28T23:59:59',
    violationDate: '2025-06-13T08:00:00'
  }
];

const Penalties: React.FC = () => {
  const [filter, setFilter] = useState<'all' | Penalty['status']>('all');

  const getPenaltyTypeColor = (type: Penalty['type']) => {
    switch (type) {
      case 'late-arrival':
        return 'warning';
      case 'environmental':
        return 'error';
      case 'safety':
        return 'error';
      case 'documentation':
        return 'primary';
      case 'operational':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const getStatusColor = (status: Penalty['status']) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'paid':
        return 'success';
      case 'disputed':
        return 'error';
      case 'waived':
        return 'secondary';
      default:
        return 'default';
    }
  };

  const filteredPenalties = penalties.filter(penalty => {
    if (filter === 'all') return true;
    return penalty.status === filter;
  });

  const totalPending = penalties.reduce((sum, penalty) => 
    penalty.status === 'pending' ? sum + penalty.amount : sum, 0
  );

  const totalCollected = penalties.reduce((sum, penalty) => 
    penalty.status === 'paid' ? sum + penalty.amount : sum, 0
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Penalties</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track port regulation violations and penalties
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button leftIcon={<Plus className="h-4 w-4" />} variant="primary">
            Issue Penalty
          </Button>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-warning-100 text-warning-600 mr-4">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Penalties</p>
                <p className="text-2xl font-semibold mt-1">
                  {penalties.filter(p => p.status === 'pending').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-success-100 text-success-600 mr-4">
                <DollarSign className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Amount Collected</p>
                <p className="text-2xl font-semibold mt-1">
                  ${totalCollected.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-error-100 text-error-600 mr-4">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Disputed Cases</p>
                <p className="text-2xl font-semibold mt-1">
                  {penalties.filter(p => p.status === 'disputed').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Amount Due</p>
                <p className="text-2xl font-semibold mt-1">
                  ${totalPending.toLocaleString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and search */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
          <div className="flex-grow">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                placeholder="Search penalties..."
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={filter === 'all' ? 'primary' : 'outline'}
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'pending' ? 'primary' : 'outline'}
              onClick={() => setFilter('pending')}
            >
              Pending
            </Button>
            <Button
              variant={filter === 'disputed' ? 'primary' : 'outline'}
              onClick={() => setFilter('disputed')}
            >
              Disputed
            </Button>
            <Button
              variant={filter === 'paid' ? 'primary' : 'outline'}
              onClick={() => setFilter('paid')}
            >
              Paid
            </Button>
          </div>
          <Button leftIcon={<Filter className="h-4 w-4" />} variant="outline">
            More Filters
          </Button>
        </div>
      </div>

      {/* Penalties List */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vessel & Violation
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Due Date
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredPenalties.map((penalty) => {
                const vessel = vessels.find(v => v.id === penalty.vesselId);
                
                return (
                  <tr key={penalty.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          <Ship className="h-6 w-6 text-primary-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{vessel?.name}</div>
                          <div className="text-sm text-gray-500">{penalty.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={getPenaltyTypeColor(penalty.type)}
                        className="capitalize"
                      >
                        {penalty.type.replace('-', ' ')}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        ${penalty.amount.toLocaleString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        Issued: {new Date(penalty.issueDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={getStatusColor(penalty.status)} className="capitalize">
                        {penalty.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(penalty.dueDate).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(penalty.dueDate).toLocaleTimeString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {penalty.status === 'pending' && (
                        <>
                          <Button size="sm" variant="success" className="mr-2">
                            Mark Paid
                          </Button>
                          <Button size="sm" variant="error" className="mr-2">
                            Dispute
                          </Button>
                        </>
                      )}
                      {penalty.status === 'disputed' && (
                        <Button size="sm" variant="warning" className="mr-2">
                          Review
                        </Button>
                      )}
                      <Button size="sm" variant="ghost">
                        Details
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Penalties;