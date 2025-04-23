import React from 'react';
import { Shield, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import Badge from '../ui/Badge';
import { bondedZones } from '../../data/mockData';

export const BondedZoneStatus: React.FC = () => {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Bonded Zone Status</CardTitle>
        <Shield className="h-5 w-5 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {bondedZones.map((zone) => {
            const utilizationPercentage = (zone.capacity.used / zone.capacity.total) * 100;
            
            return (
              <div key={zone.id} className="space-y-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-medium">{zone.name}</h3>
                    <p className="text-xs text-gray-500 mt-1">Type: {zone.type.replace('-', ' ')}</p>
                  </div>
                  <Badge
                    variant={
                      zone.status === 'active'
                        ? 'success'
                        : zone.status === 'maintenance'
                        ? 'warning'
                        : 'error'
                    }
                    size="sm"
                  >
                    {zone.status}
                  </Badge>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-500">Capacity Utilization</span>
                    <span className="text-xs text-gray-500">
                      {zone.capacity.used} / {zone.capacity.total} {zone.capacity.unit}
                    </span>
                  </div>
                  <ProgressBar
                    value={utilizationPercentage}
                    variant={utilizationPercentage > 80 ? 'warning' : 'primary'}
                    size="sm"
                  />
                </div>

                <div className="flex justify-between items-center text-xs text-gray-500">
                  <span>Security Level: {zone.securityLevel}</span>
                  <span>
                    Next Inspection:{' '}
                    {new Date(zone.nextInspection!).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>

                {zone.restrictions && zone.restrictions.length > 0 && (
                  <div className="mt-2 p-2 bg-warning-50 rounded-md">
                    <div className="flex items-start">
                      <AlertTriangle className="h-4 w-4 text-warning-500 mt-0.5 mr-2 flex-shrink-0" />
                      <div className="text-xs text-warning-700">
                        <p className="font-medium">Restrictions:</p>
                        <ul className="mt-1 list-disc list-inside">
                          {zone.restrictions.map((restriction, index) => (
                            <li key={index}>{restriction}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default BondedZoneStatus;