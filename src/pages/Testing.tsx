import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { ArrowUp, ArrowDown, Pause, CheckCircle } from 'lucide-react';
import Badge from '../components/ui/Badge';
import StatusBadge from '../components/ui/StatusBadge';
import ProgressBar from '../components/ui/ProgressBar';
import { vessels } from '../data/mockData';

const Testing: React.FC = () => {
  const vessel = vessels.find(v => v.id === 'v1');

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
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Operations Testing</h1>
        <p className="mt-1 text-sm text-gray-500">
          Monitor and track cargo operations progress
        </p>
      </div>

      {vessel?.operationsHistory && vessel.operationsHistory.length > 0 && (
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
    </div>
  );
};

export default Testing;