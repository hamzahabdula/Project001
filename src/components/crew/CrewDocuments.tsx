import React from 'react';
import { FileText, AlertTriangle, CheckCircle, Clock } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import { crewMembers } from '../../data/mockData';

const CrewDocuments: React.FC = () => {
  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-lg font-semibold">Crew Documents</CardTitle>
        <FileText className="h-5 w-5 text-gray-500" />
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {crewMembers.map((crew) => (
            <div key={crew.id} className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-sm font-medium">{crew.name}</h3>
                  <p className="text-xs text-gray-500">{crew.rank}</p>
                </div>
              </div>

              <div className="space-y-2">
                {crew.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3 bg-gray-50 rounded border border-gray-200"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="text-sm font-medium capitalize">
                          {doc.type.replace('-', ' ')}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {doc.number} • {doc.issuingCountry}
                        </p>
                      </div>
                      <Badge
                        variant={
                          doc.status === 'expired'
                            ? 'error'
                            : doc.status === 'expiring-soon'
                            ? 'warning'
                            : 'success'
                        }
                        size="sm"
                        className="flex items-center"
                      >
                        {doc.status === 'expired' ? (
                          <AlertTriangle className="h-3 w-3 mr-1" />
                        ) : doc.status === 'expiring-soon' ? (
                          <Clock className="h-3 w-3 mr-1" />
                        ) : (
                          <CheckCircle className="h-3 w-3 mr-1" />
                        )}
                        {doc.status === 'expired'
                          ? 'Expired'
                          : doc.status === 'expiring-soon'
                          ? 'Expiring Soon'
                          : 'Valid'}
                      </Badge>
                    </div>

                    <div className="mt-2 flex items-center space-x-4 text-xs text-gray-500">
                      <span>
                        Issued: {new Date(doc.issueDate).toLocaleDateString()}
                      </span>
                      <span>
                        Expires: {new Date(doc.expiryDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default CrewDocuments;