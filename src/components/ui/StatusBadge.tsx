import React from 'react';
import Badge from './Badge';

type StatusVariant = 
  | 'scheduled' 
  | 'approaching' 
  | 'berthed' 
  | 'departed' 
  | 'available' 
  | 'occupied' 
  | 'maintenance' 
  | 'pending' 
  | 'in-transit' 
  | 'stored' 
  | 'cleared' 
  | 'delivered'
  | 'confirmed'
  | 'in-progress'
  | 'completed'
  | 'cancelled'
  | 'checked-in'
  | 'in-terminal'
  | 'draft'
  | 'submitted'
  | 'in-review'
  | 'approved'
  | 'rejected';

interface StatusBadgeProps {
  status: StatusVariant;
  className?: string;
}

const statusConfig: Record<StatusVariant, { variant: string; label: string }> = {
  // Vessel statuses
  'scheduled': { variant: 'info', label: 'Scheduled' },
  'approaching': { variant: 'warning', label: 'Approaching' },
  'berthed': { variant: 'success', label: 'Berthed' },
  'departed': { variant: 'default', label: 'Departed' },
  
  // Berth statuses
  'available': { variant: 'success', label: 'Available' },
  'occupied': { variant: 'warning', label: 'Occupied' },
  'maintenance': { variant: 'error', label: 'Maintenance' },
  
  // Cargo statuses
  'pending': { variant: 'info', label: 'Pending' },
  'in-transit': { variant: 'primary', label: 'In Transit' },
  'stored': { variant: 'secondary', label: 'Stored' },
  'cleared': { variant: 'success', label: 'Cleared' },
  'delivered': { variant: 'default', label: 'Delivered' },
  
  // Service request statuses
  'confirmed': { variant: 'primary', label: 'Confirmed' },
  'in-progress': { variant: 'warning', label: 'In Progress' },
  'completed': { variant: 'success', label: 'Completed' },
  'cancelled': { variant: 'error', label: 'Cancelled' },
  
  // Gate access statuses
  'checked-in': { variant: 'primary', label: 'Checked In' },
  'in-terminal': { variant: 'warning', label: 'In Terminal' },
  
  // Document statuses
  'draft': { variant: 'default', label: 'Draft' },
  'submitted': { variant: 'info', label: 'Submitted' },
  'in-review': { variant: 'warning', label: 'In Review' },
  'approved': { variant: 'success', label: 'Approved' },
  'rejected': { variant: 'error', label: 'Rejected' }
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className = '' }) => {
  const config = statusConfig[status] || { variant: 'default', label: status };
  
  return (
    <Badge variant={config.variant as any} className={className}>
      {config.label}
    </Badge>
  );
};

export default StatusBadge;