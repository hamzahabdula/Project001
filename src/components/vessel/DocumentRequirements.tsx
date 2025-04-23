import React from 'react';
import { FileCheck, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import Badge from '../ui/Badge';
import ProgressBar from '../ui/ProgressBar';
import { Vessel, RequiredDocument } from '../../types';
import { documentProgress } from '../../data/mockData';

interface DocumentRequirementsProps {
  vessel: Vessel;
}

const DocumentRequirements: React.FC<DocumentRequirementsProps> = ({ vessel }) => {
  const progress = documentProgress[vessel.id];
  const documents = vessel.category.requiredDocuments;

  const getDocumentStatus = (doc: RequiredDocument) => {
    const isArrival = vessel.status === 'scheduled' || vessel.status === 'approaching';
    const relevantProgress = isArrival ? progress.arrival : progress.departure;
    
    if (relevantProgress === 100) return 'approved';
    if (relevantProgress > 0) return 'in-review';
    return 'pending';
  };

  return (
    <Card className="h-full">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle className="text-lg font-semibold">Document Requirements</CardTitle>
          <p className="text-sm text-gray-500 mt-1">
            {vessel.name} ({vessel.imo})
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <FileCheck className="h-5 w-5 text-gray-500" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Overall Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">Arrival Documentation</h3>
              <span className="text-sm text-gray-500">{progress.arrival}% Complete</span>
            </div>
            <ProgressBar
              value={progress.arrival}
              variant={progress.arrival === 100 ? 'success' : 'primary'}
              size="md"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">Departure Documentation</h3>
              <span className="text-sm text-gray-500">{progress.departure}% Complete</span>
            </div>
            <ProgressBar
              value={progress.departure}
              variant={progress.departure === 100 ? 'success' : 'primary'}
              size="md"
            />
          </div>

          {/* Required Documents List */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium border-b pb-2">Required Documents</h3>
            
            {documents.map((doc) => (
              <div key={doc.id} className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium">{doc.name}</p>
                  <p className="text-xs text-gray-500 capitalize">{doc.type.description}</p>
                  <div className="flex items-center mt-1">
                    <Badge
                      variant={doc.stage === 'both' ? 'warning' : 'info'}
                      size="sm"
                    >
                      {doc.stage === 'both' ? 'Required Both' : doc.stage === 'arrival' ? 'Arrival' : 'Departure'}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center">
                  {doc.required && (
                    <Badge variant="error" size="sm" className="mr-2">
                      Required
                    </Badge>
                  )}
                  <Badge
                    variant={
                      getDocumentStatus(doc) === 'approved'
                        ? 'success'
                        : getDocumentStatus(doc) === 'in-review'
                        ? 'warning'
                        : 'default'
                    }
                  >
                    {getDocumentStatus(doc)}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {/* Warning for Missing Documents */}
          {(progress.arrival < 100 || progress.departure < 100) && (
            <div className="bg-warning-50 border border-warning-200 rounded-lg p-3 flex items-start">
              <AlertCircle className="h-5 w-5 text-warning-500 mr-2 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-warning-700">
                <p className="font-medium">Missing Required Documents</p>
                <p className="mt-1">
                  Please submit all required documentation to proceed with {vessel.status === 'berthed' ? 'departure' : 'arrival'}.
                </p>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentRequirements;