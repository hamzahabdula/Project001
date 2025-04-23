import React, { useState } from 'react';
import { FileText, Search, Filter, Plus, Clock, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '../components/ui/Button';
import StatusBadge from '../components/ui/StatusBadge';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { documents, vessels } from '../data/mockData';
import DocumentRequirements from '../components/vessel/DocumentRequirements';

const Documentation: React.FC = () => {
  const [documentType, setDocumentType] = useState<string>('all');

  // Count documents by status
  const pendingCount = documents.filter(
    (doc) => doc.status === 'draft' || doc.status === 'submitted' || doc.status === 'in-review'
  ).length;
  
  const approvedCount = documents.filter((doc) => doc.status === 'approved').length;
  
  const rejectedCount = documents.filter((doc) => doc.status === 'rejected').length;

  const filteredDocuments = documents.filter(
    (doc) => documentType === 'all' || doc.type === documentType
  );

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documentation</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage vessel documentation and requirements
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button leftIcon={<Plus className="h-4 w-4" />} variant="primary">
            New Document
          </Button>
        </div>
      </div>

      {/* Document status cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Pending Review</p>
                <p className="text-2xl font-semibold mt-1">{pendingCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-success-100 text-success-600 mr-4">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Approved</p>
                <p className="text-2xl font-semibold mt-1">{approvedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-error-100 text-error-600 mr-4">
                <AlertCircle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Rejected</p>
                <p className="text-2xl font-semibold mt-1">{rejectedCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Document Requirements */}
      <Card>
        <CardHeader>
          <CardTitle>Document Requirements</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {vessels.map((vessel) => (
            <DocumentRequirements key={vessel.id} vessel={vessel} />
          ))}
        </CardContent>
      </Card>

      {/* Document List */}
      <div className="space-y-6">
        {/* Document type filter */}
        <div className="p-1 bg-gray-100 rounded-md inline-flex space-x-1 overflow-x-auto">
          <Button
            size="sm"
            variant={documentType === 'all' ? 'primary' : 'ghost'}
            onClick={() => setDocumentType('all')}
          >
            All Types
          </Button>
          <Button
            size="sm"
            variant={documentType === 'customs' ? 'primary' : 'ghost'}
            onClick={() => setDocumentType('customs')}
          >
            Customs
          </Button>
          <Button
            size="sm"
            variant={documentType === 'manifest' ? 'primary' : 'ghost'}
            onClick={() => setDocumentType('manifest')}
          >
            Manifest
          </Button>
          <Button
            size="sm"
            variant={documentType === 'bill-of-lading' ? 'primary' : 'ghost'}
            onClick={() => setDocumentType('bill-of-lading')}
          >
            Bill of Lading
          </Button>
          <Button
            size="sm"
            variant={documentType === 'certificate' ? 'primary' : 'ghost'}
            onClick={() => setDocumentType('certificate')}
          >
            Certificates
          </Button>
        </div>

        {/* Filters and search */}
        <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-grow">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
                  placeholder="Search documents..."
                />
              </div>
            </div>
            <div className="flex space-x-2">
              <Button leftIcon={<Filter className="h-4 w-4" />} variant="outline">
                Filters
              </Button>
              <Button variant="secondary">Apply</Button>
            </div>
          </div>
        </div>

        {/* Documents table */}
        <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Document
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Type
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredDocuments.map((document) => (
                  <tr key={document.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                          <FileText className="h-6 w-6 text-blue-600" />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{document.title}</div>
                          <div className="text-sm text-gray-500">
                            {new Date(document.submissionDate).toLocaleString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: '2-digit',
                              hour12: true,
                            })}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 capitalize">
                        {document.type.replace('-', ' ')}
                      </div>
                      <div className="text-sm text-gray-500">{document.submittedBy}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <StatusBadge status={document.status} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {(document.status === 'submitted' || document.status === 'in-review') && (
                        <>
                          <Button size="sm" variant="success" className="mr-1">
                            Approve
                          </Button>
                          <Button size="sm" variant="error" className="mr-1">
                            Reject
                          </Button>
                        </>
                      )}
                      <Button size="sm" variant="ghost">
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documentation;