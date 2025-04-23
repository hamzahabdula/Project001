import React from 'react';
import { Ship, Anchor, Package, FileText, Truck, Users } from 'lucide-react';
import StatCard from '../components/ui/StatCard';
import RecentVessels from '../components/dashboard/RecentVessels';
import PortCapacity from '../components/dashboard/PortCapacity';
import UpcomingVessels from '../components/dashboard/UpcomingVessels';
import BerthMap from '../components/vessel/BerthMap';
import ServiceRequestsTable from '../components/dashboard/ServiceRequestsTable';
import DocumentProgress from '../components/dashboard/DocumentProgress';
import { statistics } from '../data/mockData';

const Dashboard: React.FC = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500">
          Overview of port operations and activities
        </p>
      </div>

      {/* Key statistics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
        <StatCard
          title="Vessels In Port"
          value={statistics.vesselsInPort}
          icon={<Ship className="h-5 w-5" />}
          className="col-span-1"
        />
        <StatCard
          title="Vessels Expected"
          value={statistics.vesselsExpected}
          icon={<Anchor className="h-5 w-5" />}
          className="col-span-1"
        />
        <StatCard
          title="Cargo In Transit"
          value={statistics.cargoInTransit}
          icon={<Package className="h-5 w-5" />}
          className="col-span-1"
        />
        <StatCard
          title="Documents Pending"
          value={statistics.documentsPendingReview}
          icon={<FileText className="h-5 w-5" />}
          className="col-span-1"
        />
        <StatCard
          title="Gate Appointments"
          value={statistics.gateAppointmentsToday}
          icon={<Truck className="h-5 w-5" />}
          trend="up"
          trendValue="12% ↑"
          className="col-span-1"
        />
        <StatCard
          title="Service Requests"
          value={statistics.pendingServiceRequests}
          icon={<Users className="h-5 w-5" />}
          className="col-span-1"
        />
      </div>

      {/* Main content area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left column */}
        <div className="col-span-2 space-y-6">
          {/* Service Requests Table */}
          <ServiceRequestsTable />
          
          {/* Berth Map */}
          <BerthMap />

          {/* Document Progress */}
          <DocumentProgress />
          
          {/* Upcoming Vessels */}
          <UpcomingVessels />
        </div>

        {/* Right column */}
        <div className="col-span-1 space-y-6">
          <RecentVessels />
          <PortCapacity />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;