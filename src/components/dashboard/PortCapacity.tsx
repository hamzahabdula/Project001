import React from 'react';
import { Database } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import { portCapacity } from '../../data/mockData';

const PortCapacity: React.FC = () => {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Port Capacity</CardTitle>
        <Database className="h-5 w-5 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <ProgressBar
              label="Berth Occupancy"
              value={portCapacity?.berthOccupancy ?? 0}
              showValue
              variant={(portCapacity?.berthOccupancy ?? 0) > 80 ? 'warning' : 'primary'}
            />
          </div>
          <div>
            <ProgressBar
              label="Yard Utilization"
              value={portCapacity?.yardUtilization ?? 0}
              showValue
              variant={(portCapacity?.yardUtilization ?? 0) > 80 ? 'warning' : 'primary'}
            />
          </div>
          <div>
            <ProgressBar
              label="Warehouse Utilization"
              value={portCapacity?.warehouseUtilization ?? 0}
              showValue
              variant={(portCapacity?.warehouseUtilization ?? 0) > 80 ? 'warning' : 'primary'}
            />
          </div>
          <div>
            <ProgressBar
              label="Tank Farm Utilization"
              value={portCapacity?.tankFarmUtilization ?? 0}
              showValue
              variant={(portCapacity?.tankFarmUtilization ?? 0) > 80 ? 'warning' : 'primary'}
            />
          </div>
          
          <div className="pt-2">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-50 p-3 rounded border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Container Capacity</p>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">{portCapacity?.containerCapacity?.used ?? 0} TEU</p>
                  <p className="text-xs text-gray-500">
                    of {portCapacity?.containerCapacity?.total ?? 0} TEU
                  </p>
                </div>
              </div>
              <div className="bg-gray-50 p-3 rounded border border-gray-100">
                <p className="text-xs text-gray-500 mb-1">Bulk Capacity</p>
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium">
                    {((portCapacity?.bulkCapacity?.used ?? 0) / 1000).toFixed(0)}K Tons
                  </p>
                  <p className="text-xs text-gray-500">
                    of {((portCapacity?.bulkCapacity?.total ?? 0) / 1000).toFixed(0)}K Tons
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PortCapacity;