import React, { useState } from 'react';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Calendar as CalendarIcon, Plus, Filter, Search } from 'lucide-react';
import { vessels, serviceRequests } from '../data/mockData';

const Schedule: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [notes, setNotes] = useState<string>('');

  // Convert vessels and service requests to calendar events
  const events = [
    // Vessel events
    ...vessels.map(vessel => ({
      id: `vessel-${vessel.id}`,
      title: `${vessel.name} - ${vessel.status}`,
      start: vessel.eta,
      end: vessel.etd,
      backgroundColor: getEventColor(vessel.status),
      extendedProps: {
        type: 'vessel',
        vessel
      }
    })),
    // Service request events
    ...serviceRequests.map(service => ({
      id: `service-${service.id}`,
      title: `${service.type.replace('-', ' ')} - ${service.status}`,
      start: service.scheduledDate,
      backgroundColor: getServiceEventColor(service.status),
      extendedProps: {
        type: 'service',
        service
      }
    }))
  ];

  function getEventColor(status: string) {
    switch (status) {
      case 'scheduled':
        return '#0F4C81'; // primary-500
      case 'approaching':
        return '#FFB900'; // warning-500
      case 'berthed':
        return '#00AF5F'; // success-500
      case 'departed':
        return '#E10000'; // error-500
      default:
        return '#1A7B87'; // secondary-500
    }
  }

  function getServiceEventColor(status: string) {
    switch (status) {
      case 'pending':
        return '#0F4C81'; // primary-500
      case 'confirmed':
        return '#1A7B87'; // secondary-500
      case 'in-progress':
        return '#FFB900'; // warning-500
      case 'completed':
        return '#00AF5F'; // success-500
      case 'cancelled':
        return '#E10000'; // error-500
      default:
        return '#1A7B87'; // secondary-500
    }
  }

  const handleDateClick = (arg: { date: Date }) => {
    setSelectedDate(arg.date);
  };

  const handleEventClick = (arg: { event: any }) => {
    const event = arg.event;
    if (event.extendedProps.type === 'vessel') {
      const vessel = event.extendedProps.vessel;
      setNotes(`Vessel: ${vessel.name}\nIMO: ${vessel.imo}\nStatus: ${vessel.status}\nETA: ${new Date(vessel.eta).toLocaleString()}\nETD: ${new Date(vessel.etd).toLocaleString()}`);
    } else {
      const service = event.extendedProps.service;
      setNotes(`Service: ${service.type}\nStatus: ${service.status}\nRequested By: ${service.requestedBy}\nScheduled: ${new Date(service.scheduledDate).toLocaleString()}`);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Schedule</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage vessel arrivals, departures, and service appointments
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button leftIcon={<Plus className="h-4 w-4" />} variant="primary">
            New Event
          </Button>
        </div>
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
                placeholder="Search schedule..."
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

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-3">
          <Card className="h-full">
            <CardContent className="p-4">
              <FullCalendar
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView="timeGridWeek"
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay'
                }}
                events={events}
                dateClick={handleDateClick}
                eventClick={handleEventClick}
                height="auto"
                aspectRatio={1.8}
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
              />
            </CardContent>
          </Card>
        </div>

        {/* Notes and Details */}
        <div className="lg:col-span-1">
          <Card className="h-full">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">Notes & Details</CardTitle>
              <CalendarIcon className="h-5 w-5 text-gray-500" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {selectedDate && (
                  <div className="text-sm text-gray-500">
                    Selected Date: {selectedDate.toLocaleDateString()}
                  </div>
                )}
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full h-48 p-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Click an event to see details or add notes..."
                />
                <Button variant="primary" className="w-full">
                  Save Notes
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Schedule;