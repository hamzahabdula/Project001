import React from 'react';
import { User, Clock, MapPin, AlertTriangle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import StatusBadge from '../ui/StatusBadge';
import Badge from '../ui/Badge';
import { crewMembers, vessels } from '../../data/mockData';
import { CrewMember } from '../../types';

const CrewShoreLeave: React.FC = () => {
  const getDocumentStatus = (crew: CrewMember) => {
    const hasExpiredDocs = crew.documents.some(doc => doc.status === 'expired');
    const hasExpiringSoonDocs = crew.documents.some(doc => doc.status === 'expiring-soon');
    
    if (hasExpiredDocs) return 'error';
    if (hasExpiringSoonDocs) return 'warning';
    return 'success';
  };

  const getTimeRemaining = (endTime: string) => {
    const end = new Date(endTime);
    const now = new Date();
    const diff = end.getTime() - now.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m remaining`;
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Shore Leave Status</CardTitle>
        <User className="h-5 w-5 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {crewMembers.map((crew) => {
            const vessel = vessels.find(v => v.id === crew.vesselId);
            const documentStatus = getDocumentStatus(crew);

            return (
              <div
                key={crew.id}
                className="p-4 bg-gray-50 rounded-lg border border-gray-200"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center">
                      <h3 className="text-sm font-medium">{crew.name}</h3>
                      <span className="mx-2 text-gray-300">•</span>
                      <span className="text-sm text-gray-500">{crew.rank}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">{vessel?.name}</p>
                  </div>
                  <StatusBadge status={crew.status as any} />
                </div>

                <div className="mt-3 flex items-center space-x-4">
                  <Badge
                    variant={documentStatus}
                    size="sm"
                    className="flex items-center"
                  >
                    <AlertTriangle className="h-3 w-3 mr-1" />
                    {documentStatus === 'error'
                      ? 'Expired Documents'
                      : documentStatus === 'warning'
                      ? 'Documents Expiring Soon'
                      : 'Documents Valid'}
                  </Badge>

                  {crew.status === 'shore-leave' && crew.shoreLeaveEnd && (
                    <>
                      <Badge variant="primary" size="sm" className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {getTimeRemaining(crew.shoreLeaveEnd)}
                      </Badge>
                      <Badge variant="secondary" size="sm" className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        City Center
                      </Badge>
                    </>
                  )}
                </div>

                {crew.status === 'pending-approval' && (
                  <div className="mt-3 flex space-x-2">
                    <button className="text-sm text-white bg-primary-500 hover:bg-primary-600 px-3 py-1 rounded">
                      Approve
                    </button>
                    <button className="text-sm text-white bg-error-500 hover:bg-error-600 px-3 py-1 rounded">
                      Reject
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default CrewShoreLeave;