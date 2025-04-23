import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Ship } from 'lucide-react';
import { berths, vessels } from '../../data/mockData';

const BerthMap = () => {
  const getVesselName = (berthId: string) => {
    const berth = berths.find(b => b.id === berthId);
    if (!berth || !berth.vesselId) return null;
    
    const vessel = vessels.find(v => v.id === berth.vesselId);
    return vessel?.name;
  };

  const getBerthStatusClass = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-success-100 border-success-300';
      case 'occupied':
        return 'bg-warning-100 border-warning-300';
      case 'maintenance':
        return 'bg-error-100 border-error-300';
      default:
        return 'bg-gray-100 border-gray-300';
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Berth Status Map</CardTitle>
        <Ship className="h-5 w-5 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="bg-secondary-50 p-3 rounded-md border border-secondary-100 text-secondary-800 text-sm mb-4">
          <p>Interactive berth map with real-time status</p>
        </div>
        
        <div className="relative h-96 border-2 border-secondary-200 rounded-lg overflow-hidden">
          {/* Water background - moved to bottom layer */}
          <div className="absolute inset-0 bg-blue-50" style={{ zIndex: 0 }} />
          
          {/* Port structure - middle layer */}
          <div className="absolute left-0 right-0 bottom-0 h-24 bg-gray-100" style={{ zIndex: 1 }} />
          
          {/* Berths - top layer */}
          <div className="absolute inset-4 flex flex-col" style={{ zIndex: 2 }}>
            {/* Horizontal part of T (top berths) */}
            <div className="flex justify-center space-x-2 mb-2">
              {berths.slice(0, 4).map((berth) => (
                <div 
                  key={berth.id}
                  className={`relative w-32 h-24 border-2 rounded p-2 ${getBerthStatusClass(berth.status)}`}
                >
                  <div className="text-xs font-medium">{berth.name}</div>
                  <div className="text-xs text-gray-600 mt-1">
                    {berth.length}m × {berth.depth}m
                  </div>
                  
                  {berth.status === 'occupied' && berth.vesselId && (
                    <div className="absolute inset-x-2 bottom-2 top-10 bg-blue-200 rounded flex items-center justify-center">
                      <div className="text-[10px] font-medium text-center line-clamp-2 px-1">
                        {getVesselName(berth.id)}
                      </div>
                    </div>
                  )}
                  
                  {berth.status === 'maintenance' && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
                      <span className="text-[10px] font-bold text-error-600">MAINTENANCE</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Vertical part of T (side berths) */}
            <div className="flex justify-center">
              <div className="grid grid-cols-2 gap-2">
                {berths.slice(4).map((berth) => (
                  <div 
                    key={berth.id}
                    className={`relative w-32 h-24 border-2 rounded p-2 ${getBerthStatusClass(berth.status)}`}
                  >
                    <div className="text-xs font-medium">{berth.name}</div>
                    <div className="text-xs text-gray-600 mt-1">
                      {berth.length}m × {berth.depth}m
                    </div>
                    
                    {berth.status === 'occupied' && berth.vesselId && (
                      <div className="absolute inset-x-2 bottom-2 top-10 bg-blue-200 rounded flex items-center justify-center">
                        <div className="text-[10px] font-medium text-center line-clamp-2 px-1">
                          {getVesselName(berth.id)}
                        </div>
                      </div>
                    )}
                    
                    {berth.status === 'maintenance' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-70">
                        <span className="text-[10px] font-bold text-error-600">MAINTENANCE</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-4 flex space-x-4 justify-center">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-success-100 border border-success-300 rounded mr-1"></div>
            <span className="text-xs text-gray-600">Available</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-warning-100 border border-warning-300 rounded mr-1"></div>
            <span className="text-xs text-gray-600">Occupied</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-error-100 border border-error-300 rounded mr-1"></div>
            <span className="text-xs text-gray-600">Maintenance</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BerthMap;