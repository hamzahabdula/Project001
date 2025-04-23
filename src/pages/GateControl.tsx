import React, { useState } from 'react';
import { Search, Filter, Calendar, Plus, Truck, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import StatusBadge from '../components/ui/StatusBadge';
import Badge from '../components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { gateAccesses, cargos } from '../data/mockData';

const GateControl: React.FC = () => {
  const [view, setView] = useState<'list' | 'appointments'>('list');

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Gate Control</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage vehicle access, appointments, and terminal entry
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button
            leftIcon={<Calendar className="h-4 w-4" />}
            variant={view === 'appointments' ? 'primary' : 'outline'}
            onClick={() => setView('appointments')}
          >
            Appointments
          </Button>
          <Button
            leftIcon={<Truck className="h-4 w-4" />}
            variant={view === 'list' ? 'primary' : 'outline'}
            onClick={() => setView('list')}
          >
            Active Vehicles
          </Button>
          <Button leftIcon={<Plus className="h-4 w-4" />} variant="secondary">
            New Entry
          </Button>
        </div>
      </div>

      {/* Gate status overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-success-100 text-success-600 mr-4">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Vehicles in Terminal</p>
                <p className="text-2xl font-semibold mt-1">
                  {gateAccesses.filter((g) => g.status === 'in-terminal').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
                <Calendar className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Today's Appointments</p>
                <p className="text-2xl font-semibold mt-1">
                  {gateAccesses.filter((g) => g.status === 'scheduled').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-warning-100 text-warning-600 mr-4">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Wait Time</p>
                <p className="text-2xl font-semibold mt-1">~15 min</p>
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
                placeholder="Search by license plate, driver name, or company..."
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

      {/* Main content */}
      <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Vehicle
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Driver & Company
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Purpose
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {view === 'appointments' ? 'Appointment Time' : 'Entry Time'}
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
              {gateAccesses
                .filter((access) => {
                  if (view === 'appointments') {
                    return access.status === 'scheduled';
                  } else {
                    return access.status === 'checked-in' || access.status === 'in-terminal';
                  }
                })
                .map((access) => {
                  const relatedCargo = access.cargoId
                    ? cargos.find((c) => c.id === access.cargoId)
                    : null;

                  return (
                    <tr key={access.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                            <Truck className="h-6 w-6 text-gray-500" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {access.licensePlate}
                            </div>
                            <div className="text-sm text-gray-500 capitalize">
                              {access.vehicleType}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{access.driverName}</div>
                        <div className="text-sm text-gray-500">{access.company}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{access.purpose}</div>
                        {relatedCargo && (
                          <div className="mt-1">
                            <Badge variant="secondary" size="sm">
                              {relatedCargo.name}
                            </Badge>
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {new Date(access.appointmentTime).toLocaleString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: 'numeric',
                            minute: '2-digit',
                            hour12: true,
                          })}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={access.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {access.status === 'scheduled' && (
                          <Button size="sm" variant="primary">
                            Check In
                          </Button>
                        )}
                        {access.status === 'checked-in' && (
                          <Button size="sm" variant="success">
                            Approve Entry
                          </Button>
                        )}
                        {access.status === 'in-terminal' && (
                          <Button size="sm" variant="secondary">
                            Mark Departure
                          </Button>
                        )}
                        <Button size="sm" variant="ghost" className="ml-2">
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

export default GateControl;