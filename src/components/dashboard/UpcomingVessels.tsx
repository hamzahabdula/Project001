import React from 'react';
import { Ship, Anchor, Clock, MapPin } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import StatusBadge from '../ui/StatusBadge';
import Badge from '../ui/Badge';
import { vessels } from '../../data/mockData';

const UpcomingVessels: React.FC = () => {
  // Get upcoming vessels (scheduled or approaching)
  const upcomingVessels = vessels
    .filter(v => v.status === 'scheduled' || v.status === 'approaching')
    .sort((a, b) => new Date(a.eta).getTime() - new Date(b.eta).getTime())
    .slice(0, 4);

  const getTimeRemaining = (eta: string) => {
    const now = new Date();
    const arrival = new Date(eta);
    const diff = arrival.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Upcoming Vessels</CardTitle>
        <Ship className="h-5 w-5 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {upcomingVessels.map((vessel) => (
            <div
              key={vessel.id}
              className="bg-gray-50 rounded-lg border border-gray-200 p-4"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center">
                    <h3 className="text-base font-medium text-gray-900">{vessel.name}</h3>
                    <span className="mx-2 text-gray-300">•</span>
                    <StatusBadge status={vessel.status} />
                  </div>
                  <p className="text-sm text-gray-500 mt-1">{vessel.type}</p>
                </div>
                <Badge variant="secondary" size="sm" className="flex items-center">
                  <Clock className="h-3 w-3 mr-1" />
                  {getTimeRemaining(vessel.eta)}
                </Badge>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-4">
                <div className="flex items-center text-sm">
                  <Anchor className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">IMO: {vessel.imo}</span>
                </div>
                <div className="flex items-center text-sm">
                  <MapPin className="h-4 w-4 text-gray-400 mr-2" />
                  <span className="text-gray-600">Berth: Pending</span>
                </div>
              </div>

              <div className="mt-3 text-xs text-gray-500">
                <div className="flex justify-between items-center">
                  <span>ETA: {new Date(vessel.eta).toLocaleString()}</span>
                  <span>ETD: {new Date(vessel.etd).toLocaleString()}</span>
                </div>
              </div>
            </div>
          ))}

          <button className="w-full text-center py-2 text-sm text-primary-600 hover:text-primary-700 font-medium">
            View all upcoming vessels
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingVessels;