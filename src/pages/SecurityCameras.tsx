import React, { useState } from 'react';
import { Camera, Play, Pause, Maximize2, RotateCw, AlertTriangle, Plus, Filter, Search } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import Badge from '../components/ui/Badge';

interface CameraFeed {
  id: string;
  name: string;
  location: string;
  status: 'online' | 'offline' | 'maintenance';
  type: 'fixed' | 'ptz';
  lastMotion?: string;
  image: string;
}

const cameras: CameraFeed[] = [
  {
    id: 'cam1',
    name: 'Gate Entrance A',
    location: 'Main Gate',
    status: 'online',
    type: 'ptz',
    lastMotion: '2 minutes ago',
    image: 'https://images.pexels.com/photos/2226458/pexels-photo-2226458.jpeg'
  },
  {
    id: 'cam2',
    name: 'Container Yard North',
    location: 'Container Terminal',
    status: 'online',
    type: 'fixed',
    lastMotion: '5 minutes ago',
    image: 'https://images.pexels.com/photos/1427107/pexels-photo-1427107.jpeg'
  },
  {
    id: 'cam3',
    name: 'Berth A2 Overview',
    location: 'Berth A',
    status: 'online',
    type: 'ptz',
    lastMotion: '1 minute ago',
    image: 'https://images.pexels.com/photos/1554646/pexels-photo-1554646.jpeg'
  },
  {
    id: 'cam4',
    name: 'Warehouse Entrance',
    location: 'Warehouse Complex',
    status: 'maintenance',
    type: 'fixed',
    image: 'https://images.pexels.com/photos/2199293/pexels-photo-2199293.jpeg'
  },
  {
    id: 'cam5',
    name: 'Loading Bay 3',
    location: 'Cargo Terminal',
    status: 'online',
    type: 'fixed',
    lastMotion: '3 minutes ago',
    image: 'https://images.pexels.com/photos/3206153/pexels-photo-3206153.jpeg'
  },
  {
    id: 'cam6',
    name: 'Parking Area B',
    location: 'Staff Parking',
    status: 'offline',
    type: 'fixed',
    image: 'https://images.pexels.com/photos/1004665/pexels-photo-1004665.jpeg'
  }
];

const SecurityCameras: React.FC = () => {
  const [selectedCamera, setSelectedCamera] = useState<string | null>(null);
  const [layout, setLayout] = useState<'grid' | 'single'>('grid');
  const [filter, setFilter] = useState<'all' | 'online' | 'offline' | 'maintenance'>('all');

  const filteredCameras = cameras.filter(camera => {
    if (filter === 'all') return true;
    return camera.status === filter;
  });

  const getStatusColor = (status: CameraFeed['status']) => {
    switch (status) {
      case 'online':
        return 'success';
      case 'offline':
        return 'error';
      case 'maintenance':
        return 'warning';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Security Cameras</h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor port facilities and security cameras
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button leftIcon={<Plus className="h-4 w-4" />} variant="primary">
            Add Camera
          </Button>
        </div>
      </div>

      {/* Camera status overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-success-100 text-success-600 mr-4">
                <Camera className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Online Cameras</p>
                <p className="text-2xl font-semibold mt-1">
                  {cameras.filter(c => c.status === 'online').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-error-100 text-error-600 mr-4">
                <AlertTriangle className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Offline Cameras</p>
                <p className="text-2xl font-semibold mt-1">
                  {cameras.filter(c => c.status === 'offline').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-warning-100 text-warning-600 mr-4">
                <RotateCw className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">In Maintenance</p>
                <p className="text-2xl font-semibold mt-1">
                  {cameras.filter(c => c.status === 'maintenance').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
                <Play className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Active Streams</p>
                <p className="text-2xl font-semibold mt-1">
                  {cameras.filter(c => c.status === 'online').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
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
                placeholder="Search cameras by name or location..."
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <Button
              variant={filter === 'all' ? 'primary' : 'outline'}
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'online' ? 'primary' : 'outline'}
              onClick={() => setFilter('online')}
            >
              Online
            </Button>
            <Button
              variant={filter === 'offline' ? 'primary' : 'outline'}
              onClick={() => setFilter('offline')}
            >
              Offline
            </Button>
            <Button
              variant={filter === 'maintenance' ? 'primary' : 'outline'}
              onClick={() => setFilter('maintenance')}
            >
              Maintenance
            </Button>
          </div>
          <Button leftIcon={<Filter className="h-4 w-4" />} variant="outline">
            More Filters
          </Button>
        </div>
      </div>

      {/* Camera Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCameras.map((camera) => (
          <div
            key={camera.id}
            className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden"
          >
            <div className="relative">
              <img
                src={camera.image}
                alt={camera.name}
                className="w-full h-48 object-cover"
              />
              <div className="absolute top-2 right-2 flex space-x-2">
                <Badge variant={getStatusColor(camera.status)} size="sm">
                  {camera.status}
                </Badge>
                {camera.type === 'ptz' && (
                  <Badge variant="secondary" size="sm">
                    PTZ
                  </Badge>
                )}
              </div>
              {camera.status === 'online' && (
                <div className="absolute bottom-2 right-2 flex space-x-2">
                  <Button size="sm" variant="primary" className="bg-opacity-90">
                    <Play className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="bg-opacity-90">
                    <Maximize2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">{camera.name}</h3>
              <p className="text-sm text-gray-500">{camera.location}</p>
              {camera.lastMotion && camera.status === 'online' && (
                <p className="text-xs text-gray-400 mt-2">
                  Last motion detected: {camera.lastMotion}
                </p>
              )}
              {camera.status === 'maintenance' && (
                <div className="mt-2 text-sm text-warning-600 flex items-center">
                  <AlertTriangle className="h-4 w-4 mr-1" />
                  Under maintenance
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SecurityCameras;