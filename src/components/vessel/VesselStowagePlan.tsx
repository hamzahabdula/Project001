import React, { useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Ship, Package, Droplet, Box, Info } from 'lucide-react';
import { Button } from '../ui/Button';
import Badge from '../ui/Badge';
import { vessels, cargos } from '../../data/mockData';

const VesselStowagePlan: React.FC = () => {
  const [selectedVessel, setSelectedVessel] = useState(vessels[0].id);
  const [selectedHold, setSelectedHold] = useState<number | null>(null);

  const vessel = vessels.find((v) => v.id === selectedVessel);
  const vesselCargos = cargos.filter((c) => c.vesselId === selectedVessel);

  // Simulate cargo distribution across holds
  const holds = [
    { id: 1, name: 'Hold 1 (Bow)', maxCapacity: 1000, maxTEU: 250 },
    { id: 2, name: 'Hold 2', maxCapacity: 1500, maxTEU: 375 },
    { id: 3, name: 'Hold 3 (Midship)', maxCapacity: 2000, maxTEU: 500 },
    { id: 4, name: 'Hold 4', maxCapacity: 1500, maxTEU: 375 },
    { id: 5, name: 'Hold 5 (Stern)', maxCapacity: 1000, maxTEU: 250 }
  ];

  // Distribute cargos across holds
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

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Vessel Stowage Plan</CardTitle>
        <div className="flex space-x-2">
          {vessels
            .filter((v) => v.status === 'berthed' || v.status === 'approaching')
            .map((v) => (
              <Button
                key={v.id}
                size="sm"
                variant={selectedVessel === v.id ? 'primary' : 'outline'}
                onClick={() => setSelectedVessel(v.id)}
              >
                {v.name}
              </Button>
            ))}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Vessel Info */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium">{vessel?.name}</h3>
              <p className="text-xs text-gray-500">IMO: {vessel?.imo}</p>
            </div>
            <Badge variant="primary" size="sm">
              {vessel?.status}
            </Badge>
          </div>

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
                        className={`relative border-2 rounded p-2 cursor-pointer transition-colors ${
                          selectedHold === hold.id ? 'border-primary-500 bg-white' : 'border-primary-200 bg-primary-50'
                        }`}
                        onClick={() => setSelectedHold(hold.id)}
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

          {/* Selected hold details */}
          {selectedHold !== null && (
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-sm font-medium">{holds[selectedHold - 1].name}</h4>
                <div className="flex items-center text-xs text-gray-500">
                  <Info className="h-4 w-4 mr-1" />
                  Max Capacity: {holds[selectedHold - 1].maxCapacity} MT / {holds[selectedHold - 1].maxTEU} TEU
                </div>
              </div>
              
              <div className="space-y-3">
                {holdCargos[selectedHold - 1].cargos.map((cargo) => (
                  <div
                    key={cargo.id}
                    className={`p-3 rounded-lg border ${getCargoColor(cargo.type)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="flex items-center">
                          {getCargoIcon(cargo.type)}
                          <span className="ml-2 text-sm font-medium">{cargo.name}</span>
                        </div>
                        <div className="mt-1 space-x-2">
                          <Badge variant="secondary" size="sm">
                            {cargo.quantity} {cargo.unit}
                          </Badge>
                          <Badge variant="primary" size="sm">
                            {cargo.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-2 text-xs text-gray-500 grid grid-cols-2 gap-2">
                      <div>
                        <span className="font-medium">Location: </span>
                        {cargo.location}
                      </div>
                      <div>
                        <span className="font-medium">Arrival: </span>
                        {new Date(cargo.arrivalDate).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Legend */}
          <div className="flex flex-wrap gap-3 pt-3 border-t border-gray-200">
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
        </div>
      </CardContent>
    </Card>
  );
};

export default VesselStowagePlan;

export { VesselStowagePlan }