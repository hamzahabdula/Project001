import React from 'react';
import Badge from '../ui/Badge';
import { Package, Truck, Warehouse, Check } from 'lucide-react';
import { cargos } from '../../data/mockData';

const CargoStatusBanner: React.FC = () => {
  // Count cargos by status
  const countByStatus = cargos.reduce(
    (counts, cargo) => {
      counts[cargo.status] = (counts[cargo.status] || 0) + 1;
      return counts;
    },
    {} as Record<string, number>
  );

  const statuses = [
    {
      name: 'Pending',
      count: countByStatus['pending'] || 0,
      icon: <Truck className="h-5 w-5" />,
      color: 'bg-blue-50 text-blue-700',
      iconColor: 'text-blue-500',
    },
    {
      name: 'In Transit',
      count: countByStatus['in-transit'] || 0,
      icon: <Package className="h-5 w-5" />,
      color: 'bg-primary-50 text-primary-700',
      iconColor: 'text-primary-500',
    },
    {
      name: 'Stored',
      count: countByStatus['stored'] || 0,
      icon: <Warehouse className="h-5 w-5" />,
      color: 'bg-secondary-50 text-secondary-700',
      iconColor: 'text-secondary-500',
    },
    {
      name: 'Cleared',
      count: countByStatus['cleared'] || 0,
      icon: <Check className="h-5 w-5" />,
      color: 'bg-success-50 text-success-700',
      iconColor: 'text-success-500',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {statuses.map((status) => (
        <div
          key={status.name}
          className={`${status.color} rounded-lg p-4 flex items-center shadow-sm`}
        >
          <div className={`${status.iconColor} p-2 rounded-full bg-white mr-3`}>
            {status.icon}
          </div>
          <div>
            <p className="text-sm font-medium">{status.name}</p>
            <div className="flex items-center mt-1">
              <span className="text-lg font-bold mr-2">{status.count}</span>
              <Badge size="sm" variant="primary">
                Cargo Items
              </Badge>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CargoStatusBanner;