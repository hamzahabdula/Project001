import React, { useState } from 'react';
import { Briefcase, Plus, Search, Filter } from 'lucide-react';
import { Button } from '../components/ui/Button';
import StatusBadge from '../components/ui/StatusBadge';
import CrewShoreLeave from '../components/crew/CrewShoreLeave';
import CrewDocuments from '../components/crew/CrewDocuments';
import { serviceRequests, vessels } from '../data/mockData';

// Service type icons
import { 
  Plane as Crane, 
  Anchor, 
  PackageOpen, 
  Hammer, 
  ShoppingBag,
  Warehouse,
  Thermometer,
  PackagePlus,
  Boxes,
  AlertTriangle,
  Truck,
  FileCheck,
  User,
  Ambulance,
  Bus
} from 'lucide-react';

const PortServices: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('all');

  const getServiceIcon = (type: string) => {
    switch (type) {
      // Marine Services
      case 'pilotage':
        return <Anchor className="h-5 w-5" />;
      case 'tug':
        return <Anchor className="h-5 w-5" />;
      case 'mooring':
        return <Anchor className="h-5 w-5" />;
      case 'bunkering':
        return <Anchor className="h-5 w-5" />;
      
      // Cargo Handling
      case 'crane':
        return <Crane className="h-5 w-5" />;
      case 'forklift':
        return <PackageOpen className="h-5 w-5" />;
      case 'reach-stacker':
        return <Crane className="h-5 w-5" />;
      
      // Warehouse Services
      case 'container-storage':
        return <Warehouse className="h-5 w-5" />;
      case 'bulk-storage':
        return <Boxes className="h-5 w-5" />;
      case 'cold-storage':
        return <Thermometer className="h-5 w-5" />;
      case 'hazmat-storage':
        return <AlertTriangle className="h-5 w-5" />;
      case 'cross-docking':
        return <Truck className="h-5 w-5" />;
      case 'consolidation':
        return <PackagePlus className="h-5 w-5" />;
      case 'distribution':
        return <Truck className="h-5 w-5" />;
      case 'inventory-management':
        return <Boxes className="h-5 w-5" />;
      
      // Shore Leave Services
      case 'shore-leave-transport':
        return <Bus className="h-5 w-5" />;
      case 'crew-transport':
        return <Bus className="h-5 w-5" />;
      case 'medical-assistance':
        return <Ambulance className="h-5 w-5" />;
      case 'shore-leave-permit':
        return <FileCheck className="h-5 w-5" />;
      case 'crew-welfare':
        return <User className="h-5 w-5" />;
      case 'emergency-response':
        return <Ambulance className="h-5 w-5" />;
      
      // Bonded Zone Services
      case 'bonded-storage':
        return <Warehouse className="h-5 w-5" />;
      case 'customs-inspection':
        return <FileCheck className="h-5 w-5" />;
      case 'duty-processing':
        return <FileCheck className="h-5 w-5" />;
      case 'customs-clearance':
        return <FileCheck className="h-5 w-5" />;
      case 'bonded-transport':
        return <Truck className="h-5 w-5" />;
      
      // Maintenance & Support
      case 'maintenance':
        return <Hammer className="h-5 w-5" />;
      case 'cleaning':
        return <Hammer className="h-5 w-5" />;
      case 'inspection':
        return <FileCheck className="h-5 w-5" />;
      case 'repair':
        return <Hammer className="h-5 w-5" />;
      
      // Supply Services
      case 'provisions':
        return <ShoppingBag className="h-5 w-5" />;
      case 'water-supply':
        return <ShoppingBag className="h-5 w-5" />;
      case 'waste-collection':
        return <ShoppingBag className="h-5 w-5" />;
      
      default:
        return <Briefcase className="h-5 w-5" />;
    }
  };

  const serviceTypes = [
    { id: 'all', name: 'All Services' },
    { id: 'marine', name: 'Marine Services', types: ['pilotage', 'tug', 'mooring', 'bunkering'] },
    { id: 'cargo', name: 'Cargo Handling', types: ['crane', 'forklift', 'reach-stacker'] },
    { 
      id: 'warehouse', 
      name: 'Warehouse Services', 
      types: [
        'container-storage', 
        'bulk-storage', 
        'cold-storage', 
        'hazmat-storage',
        'cross-docking',
        'consolidation',
        'distribution',
        'inventory-management'
      ] 
    },
    { 
      id: 'shore-leave', 
      name: 'Shore Leave', 
      types: [
        'shore-leave-transport',
        'crew-transport',
        'medical-assistance',
        'shore-leave-permit',
        'crew-welfare',
        'emergency-response'
      ] 
    },
    { 
      id: 'bonded', 
      name: 'Bonded Zone', 
      types: [
        'bonded-storage',
        'customs-inspection',
        'duty-processing',
        'customs-clearance',
        'bonded-transport'
      ] 
    },
    { 
      id: 'maintenance', 
      name: 'Maintenance', 
      types: ['maintenance', 'cleaning', 'inspection', 'repair'] 
    },
    { 
      id: 'supply', 
      name: 'Supply Services', 
      types: ['provisions', 'water-supply', 'waste-collection'] 
    },
  ];

  const filteredRequests = serviceRequests.filter((request) => {
    if (activeTab === 'all') return true;
    const category = serviceTypes.find(type => 
      type.types?.includes(request.type)
    );
    return category?.id === activeTab;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Port Services</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage service requests for vessels and port operations
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button leftIcon={<Plus className="h-4 w-4" />} variant="primary">
            New Service Request
          </Button>
        </div>
      </div>

      {/* Service type tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8 overflow-x-auto">
          {serviceTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setActiveTab(type.id)}
              className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === type.id
                  ? 'border-primary-500 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              {type.id !== 'all' && getServiceIcon(type.types?.[0] || type.id)}
              <span className={type.id !== 'all' ? 'ml-2' : ''}>{type.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Shore Leave Management */}
      {activeTab === 'shore-leave' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <CrewShoreLeave />
          <CrewDocuments />
        </div>
      )}

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
                placeholder="Search services..."
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <Button leftIcon={<Filter className="h-4 w-4" />} variant="outline">
              Filters
            </Button>
            <Button variant="secondary">Apply</Button>
          </div>
        </div>
      </div>

      {/* Service requests */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Service
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Requested By
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Vessel
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Schedule
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredRequests.map((service) => {
                const vessel = vessels.find((v) => v.id === service.vesselId);

                return (
                  <tr key={service.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                          {getServiceIcon(service.type)}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 capitalize">
                            {service.type.replace('-', ' ')}
                          </div>
                          <div className="text-sm text-gray-500">ID: {service.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{service.requestedBy.name}</div>
                      <div className="text-sm text-gray-500">
                        {service.requestedBy.company} - {service.requestedBy.role}
                      </div>
                      <div className="text-sm text-gray-500">
                        Requested: {new Date(service.requestDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{vessel?.name}</div>
                      <div className="text-sm text-gray-500">{vessel?.type}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(service.scheduledDate).toLocaleString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          hour: 'numeric',
                          minute: '2-digit',
                          hour12: true,
                        })}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={service.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {service.status === 'pending' && (
                        <Button size="sm" variant="primary" className="mr-2">
                          Confirm
                        </Button>
                      )}
                      {service.status === 'confirmed' && (
                        <Button size="sm" variant="success" className="mr-2">
                          Start
                        </Button>
                      )}
                      {service.status === 'in-progress' && (
                        <Button size="sm" variant="success" className="mr-2">
                          Complete
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

export default PortServices;