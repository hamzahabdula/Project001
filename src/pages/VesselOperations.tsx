import React, { useState } from 'react';
import { Ship, Package, ArrowDown, ArrowUp, Filter, Search, Plus, Eye, Wrench, HardHat } from 'lucide-react';
import { vessels, cargos } from '../data/mockData';
import BerthMap from '../components/vessel/BerthMap';
import VesselDetails from '../components/vessel/VesselDetails';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import StatusBadge from '../components/ui/StatusBadge';
import Badge from '../components/ui/Badge';

const VesselOperations: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'loading' | 'unloading'>('unloading');
  const [selectedVessel, setSelectedVessel] = useState(vessels[0].id);

  // Filter cargos based on loading/unloading
  const loadingCargos = cargos.filter(cargo => cargo.status === 'pending');
  const unloadingCargos = cargos.filter(cargo => cargo.status === 'in-transit');

  // Group cargos by vessel
  const groupCargosByVessel = (cargoList: typeof cargos) => {
    const grouped = new Map();
    cargoList.forEach(cargo => {
      const vessel = vessels.find(v => v.id === cargo.vesselId);
      if (!vessel) return;
      
      if (!grouped.has(vessel.id)) {
        grouped.set(vessel.id, {
          vessel,
          cargos: []
        });
      }
      grouped.get(vessel.id).cargos.push(cargo);
    });
    return Array.from(grouped.values());
  };

  const groupedLoadingCargos = groupCargosByVessel(loadingCargos);
  const groupedUnloadingCargos = groupCargosByVessel(unloadingCargos);

  const selectedVesselData = vessels.find(v => v.id === selectedVessel);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Vessel Operations</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage vessel loading, unloading, and stowage plans
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button leftIcon={<Plus className="h-4 w-4" />} variant="primary">
            New Operation
          </Button>
        </div>
      </div>

      {/* Berth Map */}
      <BerthMap />

      {/* Operation Status */}
      <Card>
        <CardHeader className="pb-0">
          <div className="flex items-center justify-between mb-4">
            <CardTitle className="text-lg font-semibold">Operation Status</CardTitle>
            <div className="flex space-x-2">
              <Button
                size="sm"
                variant={activeTab === 'unloading' ? 'primary' : 'outline'}
                onClick={() => setActiveTab('unloading')}
                leftIcon={<ArrowDown className="h-4 w-4" />}
              >
                Unloading
              </Button>
              <Button
                size="sm"
                variant={activeTab === 'loading' ? 'primary' : 'outline'}
                onClick={() => setActiveTab('loading')}
                leftIcon={<ArrowUp className="h-4 w-4" />}
              >
                Loading
              </Button>
            </div>
          </div>

          {/* Operation type title */}
          <div className="flex items-center space-x-2 mb-4">
            {activeTab === 'unloading' ? (
              <>
                <ArrowDown className="h-5 w-5 text-primary-500" />
                <h2 className="text-xl font-semibold text-primary-500">Unloading Operations</h2>
              </>
            ) : (
              <>
                <ArrowUp className="h-5 w-5 text-primary-500" />
                <h2 className="text-xl font-semibold text-primary-500">Loading Operations</h2>
              </>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {(activeTab === 'loading' ? groupedLoadingCargos : groupedUnloadingCargos).map(({ vessel, cargos: vesselCargos }) => (
              <div
                key={vessel.id}
                className="bg-gray-50 rounded-lg border border-gray-200 p-4 hover:border-primary-300 transition-colors"
              >
                {/* Vessel Name */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <Ship className="h-5 w-5 text-primary-600 mr-2" />
                    <h3 className="text-lg font-medium text-gray-900">{vessel.name}</h3>
                  </div>
                  <StatusBadge status={vessel.status} />
                </div>

                {/* Cargo List */}
                <div className="space-y-3">
                  {vesselCargos.map((cargo) => (
                    <div key={cargo.id} className="bg-white rounded border border-gray-200 p-3">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-900">{cargo.description}</p>
                          <div className="mt-1 flex items-center space-x-2">
                            <Badge variant="secondary" size="sm">
                              {cargo.quantity} {cargo.unit}
                            </Badge>
                            <Badge variant="primary" size="sm">
                              {cargo.type}
                            </Badge>
                          </div>
                        </div>
                        <Button size="sm" variant="outline">
                          Details
                        </Button>
                      </div>

                      {/* Operation timeline */}
                      <div className="mt-3 pt-2 border-t border-gray-100">
                        <div className="flex items-center space-x-2 text-xs text-gray-500">
                          <Ship className="h-4 w-4" />
                          <span>
                            {activeTab === 'loading' ? 'Loading' : 'Unloading'} Time: 
                            {' '}{new Date().toLocaleTimeString()} - {new Date(Date.now() + 3600000).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Vessel Selection */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Select Vessel</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {vessels.map((vessel) => (
            <button
              key={vessel.id}
              className={`p-4 rounded-lg border-2 transition-colors ${
                selectedVessel === vessel.id
                  ? 'border-primary-500 bg-primary-50'
                  : 'border-gray-200 hover:border-primary-200'
              }`}
              onClick={() => setSelectedVessel(vessel.id)}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-base font-medium">{vessel.name}</h3>
                  <p className="text-sm text-gray-500">{vessel.imo}</p>
                </div>
                <StatusBadge status={vessel.status} />
              </div>
              <div className="mt-2 text-sm text-gray-600">
                <p>{vessel.type}</p>
                <p className="mt-1">
                  {vessel.berthId
                    ? `Berth: ${vessel.berthId.toUpperCase()}`
                    : 'No berth assigned'}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Vessel Details */}
      {selectedVesselData && <VesselDetails vessel={selectedVesselData} />}
    </div>
  );
};

export default VesselOperations;