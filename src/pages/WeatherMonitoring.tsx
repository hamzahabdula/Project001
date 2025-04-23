import React, { useState } from 'react';
import { Cloud, Wind, Droplets, Sun, CloudRain, CloudLightning, AlertTriangle, ThermometerSun, Compass, ArrowUp, ArrowDown, Ship, Package } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import Badge from '../components/ui/Badge';
import ProgressBar from '../components/ui/ProgressBar';

interface WeatherAlert {
  id: string;
  type: 'warning' | 'advisory' | 'watch' | 'severe';
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  impactLevel: 'low' | 'moderate' | 'high' | 'severe';
  affectedOperations: string[];
}

interface WeatherForecast {
  time: string;
  temperature: number;
  condition: string;
  windSpeed: number;
  windDirection: string;
  precipitation: number;
  waveHeight: number;
  visibility: number;
}

// Sample weather alerts
const weatherAlerts: WeatherAlert[] = [
  {
    id: 'wa1',
    type: 'warning',
    title: 'Strong Winds Advisory',
    description: 'Strong winds expected with gusts up to 45 knots',
    startTime: '2025-06-15T12:00:00',
    endTime: '2025-06-15T20:00:00',
    impactLevel: 'moderate',
    affectedOperations: ['crane-operations', 'vessel-berthing']
  },
  {
    id: 'wa2',
    type: 'severe',
    title: 'Storm Warning',
    description: 'Severe thunderstorm approaching with potential for lightning',
    startTime: '2025-06-15T14:00:00',
    endTime: '2025-06-16T02:00:00',
    impactLevel: 'high',
    affectedOperations: ['outdoor-operations', 'vessel-navigation']
  }
];

// Sample weather forecast
const weatherForecast: WeatherForecast[] = [
  {
    time: '2025-06-15T12:00:00',
    temperature: 28,
    condition: 'partly-cloudy',
    windSpeed: 15,
    windDirection: 'NE',
    precipitation: 0,
    waveHeight: 1.2,
    visibility: 10
  },
  {
    time: '2025-06-15T15:00:00',
    temperature: 30,
    condition: 'cloudy',
    windSpeed: 20,
    windDirection: 'NE',
    precipitation: 30,
    waveHeight: 1.5,
    visibility: 8
  },
  {
    time: '2025-06-15T18:00:00',
    temperature: 27,
    condition: 'rain',
    windSpeed: 25,
    windDirection: 'E',
    precipitation: 70,
    waveHeight: 1.8,
    visibility: 5
  }
];

const WeatherMonitoring: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'6h' | '12h' | '24h' | '48h'>('24h');

  const getWeatherIcon = (condition: string) => {
    switch (condition) {
      case 'clear':
        return <Sun className="h-6 w-6 text-warning-500" />;
      case 'partly-cloudy':
        return <Cloud className="h-6 w-6 text-gray-500" />;
      case 'cloudy':
        return <Cloud className="h-6 w-6 text-gray-600" />;
      case 'rain':
        return <CloudRain className="h-6 w-6 text-primary-500" />;
      case 'storm':
        return <CloudLightning className="h-6 w-6 text-error-500" />;
      default:
        return <Cloud className="h-6 w-6 text-gray-500" />;
    }
  };

  const getAlertColor = (type: WeatherAlert['type']) => {
    switch (type) {
      case 'warning':
        return 'warning';
      case 'advisory':
        return 'primary';
      case 'watch':
        return 'secondary';
      case 'severe':
        return 'error';
    }
  };

  const getImpactColor = (level: WeatherAlert['impactLevel']) => {
    switch (level) {
      case 'low':
        return 'success';
      case 'moderate':
        return 'warning';
      case 'high':
        return 'error';
      case 'severe':
        return 'error';
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Weather Monitoring</h1>
          <p className="mt-1 text-sm text-gray-500">
            Monitor weather conditions affecting port operations
          </p>
        </div>
        <div className="mt-4 md:mt-0 flex space-x-3">
          <Button leftIcon={<AlertTriangle className="h-4 w-4" />} variant="error">
            Active Alerts ({weatherAlerts.length})
          </Button>
        </div>
      </div>

      {/* Current Conditions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
                <ThermometerSun className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Temperature</p>
                <p className="text-2xl font-semibold mt-1">28°C</p>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <ArrowUp className="h-3 w-3 text-error-500 mr-1" />
                  High: 32°C
                  <ArrowDown className="h-3 w-3 text-primary-500 mx-1" />
                  Low: 24°C
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-warning-100 text-warning-600 mr-4">
                <Wind className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Wind</p>
                <div className="flex items-center">
                  <p className="text-2xl font-semibold">15</p>
                  <span className="text-sm ml-1">knots</span>
                </div>
                <div className="flex items-center text-xs text-gray-500 mt-1">
                  <Compass className="h-3 w-3 mr-1" />
                  Direction: NE (45°)
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-primary-100 text-primary-600 mr-4">
                <Droplets className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Sea Conditions</p>
                <div className="flex items-center">
                  <p className="text-2xl font-semibold">1.2</p>
                  <span className="text-sm ml-1">m waves</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Moderate swell</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center">
              <div className="p-3 rounded-full bg-secondary-100 text-secondary-600 mr-4">
                <Cloud className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Visibility</p>
                <div className="flex items-center">
                  <p className="text-2xl font-semibold">10</p>
                  <span className="text-sm ml-1">km</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Clear conditions</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weather Alerts */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Active Weather Alerts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {weatherAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`bg-${getAlertColor(alert.type)}-50 border border-${getAlertColor(
                  alert.type
                )}-100 rounded-lg p-4`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start">
                    <AlertTriangle
                      className={`h-5 w-5 text-${getAlertColor(alert.type)}-500 mt-0.5 mr-3`}
                    />
                    <div>
                      <h3 className="text-base font-medium">{alert.title}</h3>
                      <p className="text-sm mt-1">{alert.description}</p>
                    </div>
                  </div>
                  <Badge variant={getAlertColor(alert.type)}>
                    {alert.type.toUpperCase()}
                  </Badge>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant={getImpactColor(alert.impactLevel)} size="sm">
                    Impact: {alert.impactLevel}
                  </Badge>
                  {alert.affectedOperations.map((op) => (
                    <Badge key={op} variant="secondary" size="sm">
                      {op.replace('-', ' ')}
                    </Badge>
                  ))}
                </div>

                <div className="mt-3 text-sm">
                  <span className="text-gray-600">
                    Valid: {new Date(alert.startTime).toLocaleString()} -{' '}
                    {new Date(alert.endTime).toLocaleString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Forecast */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-lg font-semibold">Weather Forecast</CardTitle>
          <div className="flex space-x-2">
            {['6h', '12h', '24h', '48h'].map((range) => (
              <Button
                key={range}
                size="sm"
                variant={timeRange === range ? 'primary' : 'outline'}
                onClick={() => setTimeRange(range as any)}
              >
                {range}
              </Button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {weatherForecast.map((forecast) => (
              <div
                key={forecast.time}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
              >
                <div className="flex items-center bg-gray-50 rounded-lg p-3">
                  <div className="mr-3">{getWeatherIcon(forecast.condition)}</div>
                  <div>
                    <p className="text-sm font-medium">
                      {new Date(forecast.time).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {forecast.temperature}°C • {forecast.condition}
                    </p>
                  </div>
                </div>

                <div className="flex items-center bg-gray-50 rounded-lg p-3">
                  <Wind className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium">{forecast.windSpeed} knots</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Direction: {forecast.windDirection}
                    </p>
                  </div>
                </div>

                <div className="flex items-center bg-gray-50 rounded-lg p-3">
                  <CloudRain className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium">{forecast.precipitation}% chance</p>
                    <p className="text-xs text-gray-500 mt-1">Precipitation</p>
                  </div>
                </div>

                <div className="flex items-center bg-gray-50 rounded-lg p-3">
                  <Ship className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="text-sm font-medium">{forecast.waveHeight}m waves</p>
                    <p className="text-xs text-gray-500 mt-1">
                      Visibility: {forecast.visibility}km
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Operations Impact */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-semibold">Operations Impact Analysis</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Vessel Operations</span>
                <span className="text-sm text-gray-500">75% Efficiency</span>
              </div>
              <ProgressBar value={75} variant="warning" size="sm" />
              <div className="flex items-center mt-1 text-xs text-warning-600">
                <AlertTriangle className="h-3 w-3 mr-1" />
                <span>Strong winds may affect berthing operations</span>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Cargo Operations</span>
                <span className="text-sm text-gray-500">90% Efficiency</span>
              </div>
              <ProgressBar value={90} variant="success" size="sm" />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Terminal Operations</span>
                <span className="text-sm text-gray-500">85% Efficiency</span>
              </div>
              <ProgressBar value={85} variant="primary" size="sm" />
            </div>

            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Recommended Actions</h4>
              <div className="space-y-2">
                <div className="flex items-start p-3 bg-warning-50 rounded-lg">
                  <Ship className="h-5 w-5 text-warning-500 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-warning-700">
                      Review vessel scheduling
                    </p>
                    <p className="text-xs text-warning-600 mt-1">
                      Consider adjusting arrival times for incoming vessels
                    </p>
                  </div>
                </div>
                <div className="flex items-start p-3 bg-primary-50 rounded-lg">
                  <Package className="h-5 w-5 text-primary-500 mt-0.5 mr-2" />
                  <div>
                    <p className="text-sm font-medium text-primary-700">
                      Secure loose cargo
                    </p>
                    <p className="text-xs text-primary-600 mt-1">
                      Ensure all outdoor cargo is properly secured
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WeatherMonitoring;