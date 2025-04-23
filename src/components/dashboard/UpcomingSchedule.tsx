import React, { useState } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { vessels } from '../../data/mockData';
import StatusBadge from '../ui/StatusBadge';

const UpcomingSchedule: React.FC = () => {
  const [currentDay, setCurrentDay] = useState(new Date());
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
    });
  };
  
  const addDays = (date: Date, days: number) => {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  };
  
  const previousDay = () => {
    setCurrentDay(addDays(currentDay, -1));
  };
  
  const nextDay = () => {
    setCurrentDay(addDays(currentDay, 1));
  };

  const getScheduledVessels = () => {
    // In a real app, we would filter vessels based on actual date
    // For the prototype, we'll just return some of the vessels
    return vessels.filter(v => v.status === 'scheduled' || v.status === 'approaching').slice(0, 3);
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Schedule</CardTitle>
        <div className="flex items-center space-x-2">
          <button
            onClick={previousDay}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-gray-500 mr-2" />
            <span className="text-sm font-medium">{formatDate(currentDay)}</span>
          </div>
          <button
            onClick={nextDay}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-500"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {getScheduledVessels().map((vessel) => (
            <div key={vessel.id} className="p-3 bg-gray-50 rounded-lg border border-gray-100">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-sm font-medium text-gray-900">{vessel.name}</p>
                  <p className="text-xs text-gray-500 mt-1">{vessel.type}</p>
                </div>
                <StatusBadge status={vessel.status} />
              </div>
              <div className="mt-2 text-xs text-gray-500">
                <div className="flex items-center">
                  <span className="font-medium text-gray-700 mr-2">ETA:</span>
                  <span>
                    {new Date(vessel.eta).toLocaleString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </span>
                </div>
                <div className="flex items-center mt-1">
                  <span className="font-medium text-gray-700 mr-2">ETD:</span>
                  <span>
                    {new Date(vessel.etd).toLocaleString('en-US', {
                      hour: 'numeric',
                      minute: '2-digit',
                      hour12: true
                    })}
                  </span>
                </div>
                <div className="flex items-center mt-1">
                  <span className="font-medium text-gray-700 mr-2">Berth:</span>
                  <span className="italic">Pending Assignment</span>
                </div>
              </div>
            </div>
          ))}
          
          <button className="w-full text-center py-2 text-sm text-primary-600 hover:text-primary-800 font-medium">
            View full schedule
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingSchedule;