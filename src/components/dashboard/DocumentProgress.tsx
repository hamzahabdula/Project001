import React from 'react';
import { FileText } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import ProgressBar from '../ui/ProgressBar';
import { vessels, documentProgress } from '../../data/mockData';

const DocumentProgress: React.FC = () => {
  // Get vessels with pending documentation
  const vesselsWithPendingDocs = vessels
    .filter(v => v.status !== 'departed')
    .map(vessel => ({
      ...vessel,
      progress: documentProgress[vessel.id] || { arrival: 0, departure: 0 }
    }))
    .sort((a, b) => {
      // Sort by documentation completion (ascending) and then by name
      const aProgress = (a.progress.arrival + a.progress.departure) / 2;
      const bProgress = (b.progress.arrival + b.progress.departure) / 2;
      return aProgress - bProgress || a.name.localeCompare(b.name);
    })
    .slice(0, 3); // Show only top 3 vessels

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Document Requirements</CardTitle>
        <FileText className="h-5 w-5 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {vesselsWithPendingDocs.map(vessel => (
            <div key={vessel.id} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium">{vessel.name}</p>
                  <p className="text-xs text-gray-500">{vessel.imo}</p>
                </div>
                <span className="text-xs font-medium text-gray-500">
                  {vessel.status === 'berthed' ? 'Departure Pending' : 'Arrival Pending'}
                </span>
              </div>
              
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-500">Arrival Documentation</span>
                    <span className="text-xs text-gray-500">{vessel.progress.arrival}%</span>
                  </div>
                  <ProgressBar
                    value={vessel.progress.arrival}
                    variant={vessel.progress.arrival === 100 ? 'success' : 'primary'}
                    size="sm"
                  />
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-xs text-gray-500">Departure Documentation</span>
                    <span className="text-xs text-gray-500">{vessel.progress.departure}%</span>
                  </div>
                  <ProgressBar
                    value={vessel.progress.departure}
                    variant={vessel.progress.departure === 100 ? 'success' : 'primary'}
                    size="sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentProgress;