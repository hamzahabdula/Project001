import React, { useState } from 'react';
import { History as HistoryIcon, Search, Filter, Calendar, Ship, Package, FileText, Users, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import Badge from '../components/ui/Badge';

interface HistoryEvent {
  id: string;
  type: 'vessel' | 'cargo' | 'document' | 'crew' | 'service' | 'gate' | 'system';
  title: string;
  description: string;
  timestamp: string;
  status: string;
  actor: {
    name: string;
    role: string;
  };
  metadata?: {
    vesselName?: string;
    cargoId?: string;
    documentId?: string;
    location?: string;
  };
}

// Sample historical events
const historicalEvents: HistoryEvent[] = [
  {
    id: 'he1',
    type: 'vessel',
    title: 'Vessel Berthing',
    description: 'MV Ocean Voyager successfully berthed at Berth A2',
    timestamp: '2025-06-15T07:30:00',
    status: 'completed',
    actor: {
      name: 'John Smith',
      role: 'Port Operator'
    },
    metadata: {
      vesselName: 'MV Ocean Voyager',
      location: 'Berth A2'
    }
  },
  {
    id: 'he2',
    type: 'cargo',
    title: 'Cargo Discharge',
    description: 'Completed discharge of 250 TEU containers',
    timestamp: '2025-06-15T09:45:00',
    status: 'completed',
    actor: {
      name: 'Mike Johnson',
      role: 'Terminal Supervisor'
    },
    metadata: {
      vesselName: 'MV Ocean Voyager',
      cargoId: 'c1'
    }
  },
  {
    id: 'he3',
    type: 'document',
    title: 'Document Approval',
    description: 'Cargo Manifest approved for MV Star Phoenix',
    timestamp: '2025-06-15T08:15:00',
    status: 'approved',
    actor: {
      name: 'Sarah Chen',
      role: 'Documentation Officer'
    },
    metadata: {
      vesselName: 'MV Star Phoenix',
      documentId: 'doc1'
    }
  },
  {
    id: 'he4',
    type: 'crew',
    title: 'Shore Leave Approval',
    description: 'Shore leave granted for 5 crew members',
    timestamp: '2025-06-15T10:00:00',
    status: 'approved',
    actor: {
      name: 'David Wilson',
      role: 'Security Officer'
    },
    metadata: {
      vesselName: 'MV Ocean Voyager'
    }
  },
  {
    id: 'he5',
    type: 'service',
    title: 'Bunkering Service',
    description: 'Completed bunkering operation',
    timestamp: '2025-06-15T11:30:00',
    status: 'completed',
    actor: {
      name: 'Robert Lee',
      role: 'Service Coordinator'
    },
    metadata: {
      vesselName: 'MV Pacific Trader'
    }
  }
];

const History: React.FC = () => {
  const [filter, setFilter] = useState<'all' | HistoryEvent['type']>('all');
  const [dateRange, setDateRange] = useState<'today' | 'week' | 'month'>('today');

  const getEventIcon = (type: HistoryEvent['type']) => {
    switch (type) {
      case 'vessel':
        return <Ship className="h-5 w-5" />;
      case 'cargo':
        return <Package className="h-5 w-5" />;
      case 'document':
        return <FileText className="h-5 w-5" />;
      case 'crew':
        return <Users className="h-5 w-5" />;
      case 'service':
        return <HistoryIcon className="h-5 w-5" />;
      default:
        return <Clock className="h-5 w-5" />;
    }
  };

  const getEventColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'error';
      default:
        return 'primary';
    }
  };

  const filteredEvents = historicalEvents.filter(event => {
    if (filter !== 'all' && event.type !== filter) return false;
    // Add date range filtering logic here
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">History</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track historical events and activities in the port
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button leftIcon={<Calendar className="h-4 w-4" />} variant="outline">
            Export Report
          </Button>
        </div>
      </div>

      {/* Event type statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {['vessel', 'cargo', 'document', 'crew', 'service', 'system'].map((type) => (
          <Card key={type}>
            <CardContent className="p-4">
              <div className="flex items-center">
                <div className="p-2 rounded-full bg-primary-100 text-primary-600 mr-3">
                  {getEventIcon(type as HistoryEvent['type'])}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500 capitalize">{type} Events</p>
                  <p className="text-xl font-semibold mt-1">
                    {historicalEvents.filter(e => e.type === type).length}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
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
                placeholder="Search events..."
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={dateRange === 'today' ? 'primary' : 'outline'}
              onClick={() => setDateRange('today')}
            >
              Today
            </Button>
            <Button
              variant={dateRange === 'week' ? 'primary' : 'outline'}
              onClick={() => setDateRange('week')}
            >
              This Week
            </Button>
            <Button
              variant={dateRange === 'month' ? 'primary' : 'outline'}
              onClick={() => setDateRange('month')}
            >
              This Month
            </Button>
          </div>
          <Button leftIcon={<Filter className="h-4 w-4" />} variant="outline">
            More Filters
          </Button>
        </div>
      </div>

      {/* Event Timeline */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold">Event Timeline</h2>
        </div>
        <div className="p-4">
          <div className="space-y-6">
            {filteredEvents.map((event, index) => (
              <div key={event.id} className="relative">
                {/* Timeline line */}
                {index !== filteredEvents.length - 1 && (
                  <div className="absolute top-8 left-6 bottom-0 w-px bg-gray-200" />
                )}
                
                <div className="flex items-start">
                  {/* Event icon */}
                  <div className={`relative z-10 flex-shrink-0 w-12 h-12 flex items-center justify-center rounded-full bg-${getEventColor(event.status)}-100`}>
                    {getEventIcon(event.type)}
                  </div>

                  {/* Event content */}
                  <div className="ml-4 flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-medium text-gray-900">{event.title}</h3>
                      <Badge variant={getEventColor(event.status)} size="sm">
                        {event.status}
                      </Badge>
                    </div>
                    <p className="mt-1 text-sm text-gray-500">{event.description}</p>
                    <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-gray-500">
                      <span className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(event.timestamp).toLocaleString()}
                      </span>
                      <span>
                        By: {event.actor.name} ({event.actor.role})
                      </span>
                      {event.metadata?.vesselName && (
                        <Badge variant="secondary" size="sm">
                          {event.metadata.vesselName}
                        </Badge>
                      )}
                      {event.metadata?.location && (
                        <Badge variant="secondary" size="sm">
                          {event.metadata.location}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default History;