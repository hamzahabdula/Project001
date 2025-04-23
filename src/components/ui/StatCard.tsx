import React from 'react';
import { Card } from './Card';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  description?: string;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  description,
  trend,
  trendValue,
  className = '',
}) => {
  const renderTrend = () => {
    if (!trend || !trendValue) return null;

    const trendClasses = {
      up: 'text-success-600',
      down: 'text-error-600',
      neutral: 'text-gray-500',
    };

    const trendIcons = {
      up: (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18 15l-6-6-6 6"></path>
        </svg>
      ),
      down: (
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
          <path d="M6 9l6 6 6-6"></path>
        </svg>
      ),
      neutral: null,
    };

    return (
      <div className={`flex items-center text-sm ${trendClasses[trend]}`}>
        {trendIcons[trend]}
        <span className="ml-1">{trendValue}</span>
      </div>
    );
  };

  return (
    <Card className={`h-full ${className}`}>
      <div className="p-5">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <h4 className="mt-2 text-2xl font-semibold text-gray-900">{value}</h4>
            {description && <p className="mt-1 text-sm text-gray-500">{description}</p>}
            {renderTrend()}
          </div>
          {icon && (
            <div className="p-2 bg-primary-50 rounded-full text-primary-500">{icon}</div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default StatCard;