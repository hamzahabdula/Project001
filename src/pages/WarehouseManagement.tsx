import React from 'react';
import { Warehouse, Package, Thermometer, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import StatCard from '../components/ui/StatCard';
import BondedZoneStatus from '../components/bonded/BondedZoneStatus';
import { bondedZones, portCapacity } from '../data/mockData';

const WarehouseManagement: React.FC = () => {
  // Calculate warehouse statistics
  const totalWarehouseSpace = portCapacity.containerCapacity.total + portCapacity.bulkCapacity.total;
  const usedWarehouseSpace = portCapacity.containerCapacity.used + portCapacity.bulkCapacity.used;
  const warehouseUtilization = Math.round((usedWarehouseSpace / totalWarehouseSpace) * 100);
  
  const activeBondedZones = bondedZones.filter(zone => zone.status === 'active').length;
  const maintenanceZones = bondedZones.filter(zone => zone.status === 'maintenance').length;

  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Warehouse Management</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of warehouse facilities and bonded zones
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Warehouse Utilization"
          value={`${warehouseUtilization}%`}
          icon={<Warehouse className="h-5 w-5" />}
          className="col-span-1"
        />
        <StatCard
          title="Container Storage"
          value={`${portCapacity.containerCapacity.used} TEU`}
          description={`of ${portCapacity.containerCapacity.total} TEU`}
          icon={<Package className="h-5 w-5" />}
          className="col-span-1"
        />
        <StatCard
          title="Active Bonded Zones"
          value={activeBondedZones}
          description={`${maintenanceZones} in maintenance`}
          icon={<AlertTriangle className="h-5 w-5" />}
          className="col-span-1"
        />
        <StatCard
          title="Temperature Controlled"
          value={`${portCapacity.warehouseUtilization}%`}
          icon={<Thermometer className="h-5 w-5" />}
          className="col-span-1"
        />
      </div>

      {/* Main content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Warehouse Status */}
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Warehouse Status</CardTitle>
          </CardHeader>
          <CardContent>
            {/* Add warehouse status content here */}
          </CardContent>
        </Card>

        {/* Bonded Zone Status */}
        <BondedZoneStatus />
      </div>
    </div>
  );
};

export default WarehouseManagement;