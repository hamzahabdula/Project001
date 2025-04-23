import React from 'react';
import { Ship } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import StatusBadge from '../ui/StatusBadge';
import { vessels } from '../../data/mockData';

const RecentVessels: React.FC = () => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      hour12: true
    });
  };

  // Filter out departed vessels and get the most recent 5
  const recentVessels = vessels
    .filter(v => v.status !== 'departed')
    .sort((a, b) => new Date(b.eta).getTime() - new Date(a.eta).getTime())
    .slice(0, 5);

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Recent Vessel Activity</CardTitle>
        <Ship className="h-5 w-5 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {recentVessels.map((vessel) => (
            <div key={vessel.id} className="flex items-start">
              <div className="flex-shrink-0 mr-3">
                <div className="bg-primary-100 rounded-full p-2 text-primary-600">
                  <Ship className="h-5 w-5" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">{vessel.name}</p>
                <div className="flex items-center mt-1">
                  <p className="text-xs text-gray-500 truncate">
                    {vessel.status === 'scheduled' || vessel.status === 'approaching'
                      ? `ETA: ${formatDate(vessel.eta)}`
                      : vessel.status === 'berthed'
                      ? `ETD: ${formatDate(vessel.etd)}`
                      : `Departed: ${formatDate(vessel.etd)}`}
                  </p>
                </div>
                <div className="mt-1">
                  <StatusBadge status={vessel.status} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentVessels;