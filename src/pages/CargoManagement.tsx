import React, { useState } from 'react';
import { Search, Filter, Plus, Package, ArrowDown, ArrowUp, Ban } from 'lucide-react';
import { Button } from '../components/ui/Button';
import StatusBadge from '../components/ui/StatusBadge';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import CargoStatusBanner from '../components/cargo/CargoStatusBanner';
import { cargos, vessels } from '../data/mockData';

const CargoManagement: React.FC = () => {
  const [cargoType, setCargoType] = useState<'all' | 'container' | 'bulk' | 'break'>('all');

  const filteredCargos = cargos.filter((cargo) => {
    if (cargoType === 'all') return true;
    if (cargoType === 'container') return cargo.type === 'Container';
    if (cargoType === 'bulk') return cargo.type === 'Bulk' || cargo.type === 'Liquid Bulk';
    if (cargoType === 'break') return cargo.type === 'Break Bulk' || cargo.type === 'Ro-Ro';
    return true;
  });

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cargo Management</h1>
          <p className="mt-1 text-sm text-gray-500">
            Track and manage all cargo within the port facilities
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button leftIcon={<Plus className="h-4 w-4" />} variant="primary">
            New Cargo
          </Button>
        </div>
      </div>

      {/* Cargo status cards */}
      <CargoStatusBanner />

      {/* Cargo type filter */}
      <div className="p-1 bg-gray-100 rounded-md inline-flex space-x-1">
        <Button
          size="sm"
          variant={cargoType === 'all' ? 'primary' : 'ghost'}
          onClick={() => setCargoType('all')}
        >
          All Types
        </Button>
        <Button
          size="sm"
          variant={cargoType === 'container' ? 'primary' : 'ghost'}
          onClick={() => setCargoType('container')}
        >
          Containers
        </Button>
        <Button
          size="sm"
          variant={cargoType === 'bulk' ? 'primary' : 'ghost'}
          onClick={() => setCargoType('bulk')}
        >
          Bulk
        </Button>
        <Button
          size="sm"
          variant={cargoType === 'break' ? 'primary' : 'ghost'}
          onClick={() => setCargoType('break')}
        >
          Break Bulk
        </Button>
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
                placeholder="Search by cargo name, type, or location..."
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

      {/* Cargo table */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Cargo
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Type & Quantity
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
                  Location
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
              {filteredCargos.map((cargo) => {
                const vessel = vessels.find((v) => v.id === cargo.vesselId);

                return (
                  <tr key={cargo.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-secondary-100 flex items-center justify-center">
                          <Package className="h-6 w-6 text-secondary-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{cargo.name}</div>
                          <div className="text-sm text-gray-500">ID: {cargo.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{cargo.type}</div>
                      <div className="text-sm text-gray-500">
                        {cargo.quantity} {cargo.unit}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{vessel?.name}</div>
                      <div className="text-sm text-gray-500">
                        Arrived: {new Date(cargo.arrivalDate).toLocaleDateString()}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{cargo.location}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={cargo.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <Button
                        size="sm"
                        variant="outline"
                        className="mr-2"
                        leftIcon={
                          cargo.status === 'pending' || cargo.status === 'in-transit' ? (
                            <ArrowDown className="h-4 w-4" />
                          ) : cargo.status === 'stored' ? (
                            <ArrowUp className="h-4 w-4" />
                          ) : (
                            <Ban className="h-4 w-4" />
                          )
                        }
                      >
                        {cargo.status === 'pending' || cargo.status === 'in-transit'
                          ? 'Receive'
                          : cargo.status === 'stored'
                          ? 'Release'
                          : 'Complete'}
                      </Button>
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

export default CargoManagement;