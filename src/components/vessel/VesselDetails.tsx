import React from 'react';
import { Ship, FileText, Package, Clock, Calendar, Anchor, MapPin, Phone, Mail, Building2, Truck, Droplet, Box, AlertTriangle, ArrowUp, ArrowDown, Pause, CheckCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import StatusBadge from '../ui/StatusBadge';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';
import { Vessel, Contact } from '../../types';
import { documentProgress, cargos, serviceRequests, berths } from '../../data/mockData';

interface VesselDetailsProps {
  vessel: Vessel;
}

const ContactInfo: React.FC<{ contact: Contact }> = ({ contact }) => (
  <div className="space-y-1">
    <p className="text-sm font-medium">{contact.name}</p>
    <p className="text-xs text-gray-500">{contact.company}</p>
    <p className="text-xs text-gray-500">{contact.role}</p>
    <div className="flex items-center space-x-4 mt-1">
      <a
        href={`tel:${contact.phone}`}
        className="text-xs text-primary-600 hover:text-primary-700 flex items-center"
      >
        <Phone className="h-3 w-3 mr-1" />
        {contact.phone}
      </a>
      <a
        href={`mailto:${contact.email}`}
        className="text-xs text-primary-600 hover:text-primary-700 flex items-center"
      >
        <Mail className="h-3 w-3 mr-1" />
        {contact.email}
      </a>
    </div>
  </div>
);

const VesselDetails: React.FC<VesselDetailsProps> = ({ vessel }) => {
  const vesselProgress = documentProgress[vessel.id] || { arrival: 0, departure: 0 };
  const vesselCargos = cargos.filter(c => c.vesselId === vessel.id);
  const vesselServices = serviceRequests.filter(s => s.vesselId === vessel.id);
  const berth = vessel.berthId ? berths.find(b => b.id === vessel.berthId) : null;

  const getTimeRemaining = (date: string) => {
    const target = new Date(date);
    const now = new Date();
    const diff = target.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const holds = [
    { id: 1, name: 'Hold 1 (Bow)', maxCapacity: 1000, maxTEU: 250 },
    { id: 2, name: 'Hold 2', maxCapacity: 1500, maxTEU: 375 },
    { id: 3, name: 'Hold 3 (Midship)', maxCapacity: 2000, maxTEU: 500 },
    { id: 4, name: 'Hold 4', maxCapacity: 1500, maxTEU: 375 },
    { id: 5, name: 'Hold 5 (Stern)', maxCapacity: 1000, maxTEU: 250 }
  ];

  const holdCargos = holds.map(hold => ({
    ...hold,
    cargos: vesselCargos.filter((_, index) => Math.floor(index / (vesselCargos.length / holds.length)) === hold.id - 1)
  }));

  const getCargoColor = (type: string) => {
    switch (type) {
      case 'Container':
        return 'bg-blue-100 border-blue-300';
      case 'Bulk':
        return 'bg-amber-100 border-amber-300';
      case 'Liquid Bulk':
        return 'bg-cyan-100 border-cyan-300';
      case 'Break Bulk':
        return 'bg-purple-100 border-purple-300';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };

  const getCargoIcon = (type: string) => {
    switch (type) {
      case 'Container':
        return <Package className="h-5 w-5 text-blue-600" />;
      case 'Bulk':
        return <Box className="h-5 w-5 text-amber-600" />;
      case 'Liquid Bulk':
        return <Droplet className="h-5 w-5 text-cyan-600" />;
      case 'Break Bulk':
        return <Package className="h-5 w-5 text-purple-600" />;
      default:
        return <Box className="h-5 w-5 text-gray-600" />;
    }
  };

  const getOperationIcon = (type: 'loading' | 'unloading') => {
    return type === 'loading' ? <ArrowUp className="h-4 w-4" /> : <ArrowDown className="h-4 w-4" />;
  };

  const getOperationStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in-progress':
        return 'primary';
      case 'halted':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  const getDelayImpactColor = (impact: string) => {
    switch (impact) {
      case 'low':
        return 'success';
      case 'medium':
        return 'warning';
      case 'high':
        return 'error';
      default:
        return 'secondary';
    }
  };

  const calculateDuration = (startTime: string, endTime?: string) => {
    const start = new Date(startTime);
    const end = endTime ? new Date(endTime) : new Date();
    const diff = end.getTime() - start.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  const formatShiftTime = (time: string) => {
    return new Date(time).toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  return (
    <div className="space-y-6">
      {/* Basic Info Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle className="text-lg font-semibold">Vessel Details</CardTitle>
            <p className="text-sm text-gray-500 mt-1">{vessel.name} ({vessel.imo})</p>
          </div>
          <StatusBadge status={vessel.status} />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <Ship className="h-4 w-4 mr-1" />
                <span>Type</span>
              </div>
              <p className="text-sm font-medium">{vessel.type}</p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span>Berth</span>
              </div>
              <p className="text-sm font-medium">
                {berth ? berth.name : 'Not Assigned'}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <Calendar className="h-4 w-4 mr-1" />
                <span>ETA/ETD</span>
              </div>
              <p className="text-xs">
                {new Date(vessel.eta).toLocaleString()} -
                {new Date(vessel.etd).toLocaleString()}
              </p>
            </div>
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center text-sm text-gray-500 mb-1">
                <Clock className="h-4 w-4 mr-1" />
                <span>Time Remaining</span>
              </div>
              <p className="text-sm font-medium">{getTimeRemaining(vessel.etd)}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Document Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Document Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Arrival Documentation</span>
                <span className="text-sm text-gray-600">{vesselProgress.arrival}%</span>
              </div>
              <ProgressBar
                value={vesselProgress.arrival}
                variant={vesselProgress.arrival === 100 ? 'success' : 'primary'}
                size="sm"
              />
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-600">Departure Documentation</span>
                <span className="text-sm text-gray-600">{vesselProgress.departure}%</span>
              </div>
              <ProgressBar
                value={vesselProgress.departure}
                variant={vesselProgress.departure === 100 ? 'success' : 'primary'}
                size="sm"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stowage Plan Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-lg font-semibold">Stowage Plan</CardTitle>
          <Ship className="h-5 w-5 text-gray-500" />
        </CardHeader>
        <CardContent>
          {/* Vessel Visualization */}
          <div className="relative">
            {/* Vessel outline */}
            <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50">
              {/* Vessel shape */}
              <div className="relative h-64">
                {/* Vessel hull */}
                <div className="absolute inset-x-0 bottom-0 h-48 bg-primary-100 border-2 border-primary-300 rounded-lg overflow-hidden">
                  {/* Bridge (right side) */}
                  <div className="absolute right-4 top-0 w-12 h-20 bg-primary-200 border-2 border-primary-300 rounded-t-lg" />
                  
                  {/* Cargo holds grid */}
                  <div className="absolute inset-4 grid grid-cols-5 gap-2 mt-6">
                    {holdCargos.map((hold) => (
                      <div
                        key={hold.id}
                        className="relative border-2 rounded p-2 border-primary-200 bg-primary-50"
                      >
                        <div className="text-xs font-medium mb-1 text-center">Hold {hold.id}</div>
                        {hold.cargos.length > 0 && (
                          <div className={`h-full min-h-[80px] rounded ${getCargoColor(hold.cargos[0].type)}`}>
                            {hold.cargos.map((cargo, index) => (
                              <div
                                key={cargo.id}
                                className="flex items-center justify-between p-1 border-b border-gray-200 last:border-0"
                              >
                                <div className="flex items-center">
                                  {getCargoIcon(cargo.type)}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Water line */}
                <div className="absolute bottom-0 inset-x-0 h-12 bg-blue-100 opacity-50" />
              </div>
            </div>
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 pt-3 mt-3 border-t border-gray-200">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-100 border border-blue-300 rounded mr-1"></div>
              <span className="text-xs">Containers</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-amber-100 border border-amber-300 rounded mr-1"></div>
              <span className="text-xs">Bulk</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-cyan-100 border border-cyan-300 rounded mr-1"></div>
              <span className="text-xs">Liquid Bulk</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-100 border border-purple-300 rounded mr-1"></div>
              <span className="text-xs">Break Bulk</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Operations History */}
      {vessel.operationsHistory && vessel.operationsHistory.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold">Operations History</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {vessel.operationsHistory.map((operation) => (
                <div key={operation.id} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      {getOperationIcon(operation.type)}
                      <h3 className="text-base font-medium ml-2 capitalize">
                        {operation.type} Operation
                      </h3>
                    </div>
                    <StatusBadge status={operation.status} />
                  </div>

                  {/* Overall Progress */}
                  <div className="mb-4">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-sm text-gray-600">Overall Progress</span>
                      <span className="text-sm text-gray-600">
                        {operation.processedCargo} / {operation.totalCargo} {operation.unit}
                      </span>
                    </div>
                    <ProgressBar
                      value={(operation.processedCargo / operation.totalCargo) * 100}
                      variant={operation.status === 'completed' ? 'success' : 'primary'}
                      size="sm"
                    />
                  </div>

                  {/* Shift-wise Progress */}
                  <div className="space-y-4">
                    {operation.shifts.map((shift) => (
                      <div key={shift.id} className="bg-white rounded-lg p-4 border border-gray-200">
                        <div className="flex justify-between items-center mb-3">
                          <h4 className="text-sm font-medium">
                            Shift {shift.shiftNumber} - {new Date(shift.date).toLocaleDateString()}
                          </h4>
                          <span className="text-xs text-gray-500">
                            {formatShiftTime(shift.startTime)} - {formatShiftTime(shift.endTime)}
                          </span>
                        </div>

                        {/* Progress Timeline */}
                        <div className="relative pt-8 pb-2">
                          <div className="absolute top-0 left-0 right-0 flex justify-between text-xs text-gray-500">
                            <span>Start</span>
                            <span>+2h</span>
                            <span>-2h</span>
                            <span>End</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full relative">
                            {[
                              { value: shift.progress.start, label: 'start' },
                              { value: shift.progress.midFirst, label: '+2h' },
                              { value: shift.progress.midSecond, label: '-2h' },
                              { value: shift.progress.end, label: 'end' }
                            ].map((point, index) => (
                              <div
                                key={index}
                                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary-500"
                                style={{ left: `${(index / 3) * 100}%` }}
                              >
                                <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 text-xs font-medium">
                                  {point.value} {operation.unit}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Shift Details */}
                        <div className="mt-4 text-sm">
                          <div className="flex justify-between items-center text-gray-600">
                            <span>Supervisor: {shift.supervisor}</span>
                            <span>
                              Progress: +{shift.progress.end - shift.progress.start} {operation.unit}
                            </span>
                          </div>
                          {shift.notes && (
                            <p className="mt-2 text-xs text-gray-500">
                              Notes: {shift.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Delays */}
                  {operation.delays && operation.delays.length > 0 && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="text-sm font-medium mb-3">Operation Delays</h4>
                      <div className="space-y-3">
                        {operation.delays.map((delay) => (
                          <div key={delay.id} className="bg-white rounded-lg p-3 border border-gray-200">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center">
                                <Pause className="h-4 w-4 text-warning-500 mr-2" />
                                <span className="text-sm font-medium">{delay.reason}</span>
                              </div>
                              <Badge
                                variant={getDelayImpactColor(delay.impact)}
                                size="sm"
                                className="capitalize"
                              >
                                {delay.impact} Impact
                              </Badge>
                            </div>
                            <div className="grid grid-cols-2 gap-2 text-xs text-gray-500">
                              <div>Start: {new Date(delay.startTime).toLocaleString()}</div>
                              {delay.endTime && (
                                <div>End: {new Date(delay.endTime).toLocaleString()}</div>
                              )}
                              <div>
                                Duration: {calculateDuration(delay.startTime, delay.endTime)}
                              </div>
                            </div>
                            {delay.resolution && (
                              <div className="mt-2 text-xs text-success-600 flex items-center">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Resolution: {delay.resolution}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Cargo Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Cargo Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {vesselCargos.map(cargo => (
              <div
                key={cargo.id}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <Package className="h-4 w-4 text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm font-medium">{cargo.description}</p>
                    <p className="text-xs text-gray-500">{cargo.type}</p>
                  </div>
                </div>
                <div className="text-right">
                  <Badge variant="secondary" size="sm">
                    {cargo.quantity} {cargo.unit}
                  </Badge>
                  <div className="mt-1">
                    <StatusBadge status={cargo.status} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Service Requests */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Service Requests</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {vesselServices.map(service => (
              <div
                key={service.id}
                className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
              >
                <div className="flex items-center">
                  <Anchor className="h-4 w-4 text-gray-400 mr-2" />
                  <div>
                    <p className="text-sm font-medium capitalize">
                      {service.type.replace('-', ' ')}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(service.requestedTime).toLocaleString()}
                    </p>
                  </div>
                </div>
                <StatusBadge status={service.status} />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Contact Information */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Contact Information</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Shipper */}
            {vessel.contacts?.shipper && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <Building2 className="h-5 w-5 text-gray-400 mr-2" />
                  <h4 className="text-sm font-medium">Shipper</h4>
                </div>
                <ContactInfo contact={vessel.contacts.shipper} />
              </div>
            )}

            {/* Buyers */}
            {vessel.contacts?.buyer && vessel.contacts.buyer.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <Building2 className="h-5 w-5 text-gray-400 mr-2" />
                  <h4 className="text-sm font-medium">Buyers</h4>
                </div>
                <div className="space-y-4">
                  {vessel.contacts.buyer.map((buyer, index) => (
                    <div key={index} className="border-t border-gray-200 pt-3 first:border-0 first:pt-0">
                      <ContactInfo contact={buyer} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Shipping Agent */}
            {vessel.contacts?.shippingAgent && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <Anchor className="h-5 w-5 text-gray-400 mr-2" />
                  <h4 className="text-sm font-medium">Shipping Agent</h4>
                </div>
                <ContactInfo contact={vessel.contacts.shippingAgent} />
              </div>
            )}

            {/* Trucking Agents */}
            {vessel.contacts?.truckingAgents && vessel.contacts.truckingAgents.length > 0 && (
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center mb-3">
                  <Truck className="h-5 w-5 text-gray-400 mr-2" />
                  <h4 className="text-sm font-medium">Trucking Agents</h4>
                </div>
                <div className="space-y-4">
                  {vessel.contacts.truckingAgents.map((agent, index) => (
                    <div key={index} className="border-t border-gray-200 pt-3 first:border-0 first:pt-0">
                      <ContactInfo contact={agent} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VesselDetails;