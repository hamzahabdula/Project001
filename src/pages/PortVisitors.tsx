import React, { useState } from 'react';
import { Users, Search, Filter, Plus, Clock, Building2, Briefcase, MapPin, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import Badge from '../components/ui/Badge';

interface Visitor {
  id: string;
  name: string;
  company: string;
  role: string;
  purpose: 'office-visit' | 'cargo-inspection' | 'vessel-visit' | 'loading-supervision' | 'maintenance' | 'contractor';
  status: 'checked-in' | 'checked-out' | 'scheduled' | 'in-progress';
  checkIn?: string;
  checkOut?: string;
  scheduledTime: string;
  location: string;
  photo: string;
}

const visitors: Visitor[] = [
  {
    id: 'v1',
    name: 'John Smith',
    company: 'Global Shipping Co.',
    role: 'Operations Manager',
    purpose: 'cargo-inspection',
    status: 'in-progress',
    checkIn: '2025-06-15T09:00:00',
    scheduledTime: '2025-06-15T09:00:00',
    location: 'Container Terminal',
    photo: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
  },
  {
    id: 'v2',
    name: 'Sarah Johnson',
    company: 'Maritime Services Ltd.',
    role: 'Loading Supervisor',
    purpose: 'loading-supervision',
    status: 'checked-in',
    checkIn: '2025-06-15T08:30:00',
    scheduledTime: '2025-06-15T08:30:00',
    location: 'Berth A2',
    photo: 'https://images.pexels.com/photos/3796217/pexels-photo-3796217.jpeg'
  },
  {
    id: 'v3',
    name: 'Michael Chen',
    company: 'Port Authority',
    role: 'Safety Inspector',
    purpose: 'vessel-visit',
    status: 'scheduled',
    scheduledTime: '2025-06-15T11:00:00',
    location: 'MV STAR PHOENIX',
    photo: 'https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg'
  },
  {
    id: 'v4',
    name: 'Emma Davis',
    company: 'Logistics Solutions Inc.',
    role: 'Client Representative',
    purpose: 'office-visit',
    status: 'checked-out',
    checkIn: '2025-06-15T09:00:00',
    checkOut: '2025-06-15T10:30:00',
    scheduledTime: '2025-06-15T09:00:00',
    location: 'Port Office',
    photo: 'https://images.pexels.com/photos/1587009/pexels-photo-1587009.jpeg'
  }
];

const PortVisitors: React.FC = () => {
  const [filter, setFilter] = useState<'all' | 'checked-in' | 'scheduled' | 'checked-out'>('all');
  const [purposeFilter, setPurposeFilter] = useState<Visitor['purpose'] | 'all'>('all');

  const getStatusColor = (status: Visitor['status']) => {
    switch (status) {
      case 'checked-in':
        return 'success';
      case 'checked-out':
        return 'secondary';
      case 'scheduled':
        return 'warning';
      case 'in-progress':
        return 'primary';
    }
  };

  const getPurposeIcon = (purpose: Visitor['purpose']) => {
    switch (purpose) {
      case 'office-visit':
        return <Building2 className="h-5 w-5" />;
      case 'cargo-inspection':
        return <Package className="h-5 w-5" />;
      case 'vessel-visit':
        return <Ship className="h-5 w-5" />;
      case 'loading-supervision':
        return <Eye className="h-5 w-5" />;
      case 'maintenance':
        return <Wrench className="h-5 w-5" />;
      case 'contractor':
        return <HardHat className="h-5 w-5" />;
    }
  };

  const filteredVisitors = visitors.filter(visitor => {
    if (filter !== 'all' && visitor.status !== filter) return false;
    if (purposeFilter !== 'all' && visitor.purpose !== purposeFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Port Visitors</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage and track visitors within port facilities
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button leftIcon={<Plus className="h-4 w-4" />} variant="primary">
            New Visitor
          </Button>
        </div>
      </div>

      {/* Visitor status overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-success-100 text-success-600 mr-4">
                <Users className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Currently Present</p>
                <p className="text-2xl font-semibold mt-1">
                  {visitors.filter(v => v.status === 'checked-in' || v.status === 'in-progress').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-warning-100 text-warning-600 mr-4">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Expected Today</p>
                <p className="text-2xl font-semibold mt-1">
                  {visitors.filter(v => v.status === 'scheduled').length}
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
                <p className="text-sm font-medium text-gray-500">Check-ins Today</p>
                <p className="text-2xl font-semibold mt-1">
                  {visitors.filter(v => v.checkIn?.startsWith('2025-06-15')).length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-secondary-100 text-secondary-600 mr-4">
                <Building2 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Active Companies</p>
                <p className="text-2xl font-semibold mt-1">
                  {new Set(visitors.map(v => v.company)).size}
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
                placeholder="Search visitors by name, company, or purpose..."
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
              variant={filter === 'checked-in' ? 'primary' : 'outline'}
              onClick={() => setFilter('checked-in')}
            >
              Checked In
            </Button>
            <Button
              variant={filter === 'scheduled' ? 'primary' : 'outline'}
              onClick={() => setFilter('scheduled')}
            >
              Scheduled
            </Button>
          </div>
          <Button leftIcon={<Filter className="h-4 w-4" />} variant="outline">
            More Filters
          </Button>
        </div>
      </div>

      {/* Visitors list */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredVisitors.map((visitor) => (
          <div
            key={visitor.id}
            className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
          >
            <div className="p-4">
              <div className="flex items-start space-x-4">
                <img
                  src={visitor.photo}
                  alt={visitor.name}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-medium text-gray-900">{visitor.name}</h3>
                  <p className="text-sm text-gray-500">{visitor.company}</p>
                </div>
                <Badge variant={getStatusColor(visitor.status)}>
                  {visitor.status}
                </Badge>
              </div>

              <div className="mt-4 space-y-2">
                <div className="flex items-center text-sm">
                  <Briefcase className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">{visitor.role}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">{visitor.location}</span>
                </div>
                <div className="flex items-center text-sm">
                  <Clock className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">
                    {new Date(visitor.scheduledTime).toLocaleTimeString()}
                  </span>
                </div>
              </div>

              <div className="mt-4 flex justify-between items-center">
                <Badge variant="secondary" size="sm" className="capitalize">
                  {visitor.purpose.replace('-', ' ')}
                </Badge>
                {visitor.status === 'scheduled' ? (
                  <Button size="sm" variant="primary">
                    Check In
                  </Button>
                ) : visitor.status === 'checked-in' || visitor.status === 'in-progress' ? (
                  <Button size="sm" variant="error">
                    Check Out
                  </Button>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortVisitors;