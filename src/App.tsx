import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Dashboard from './pages/Dashboard';
import VesselOperations from './pages/VesselOperations';
import GateControl from './pages/GateControl';
import CargoManagement from './pages/CargoManagement';
import PortServices from './pages/Services';
import Documentation from './pages/Documentation';
import Schedule from './pages/Schedule';
import WarehouseManagement from './pages/WarehouseManagement';
import Finance from './pages/Finance';
import SecurityCameras from './pages/SecurityCameras';
import PortVisitors from './pages/PortVisitors';
import History from './pages/History';
import WeatherMonitoring from './pages/WeatherMonitoring';
import Penalties from './pages/Penalties';
import Testing from './pages/Testing';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="vessels" element={<VesselOperations />} />
          <Route path="gate" element={<GateControl />} />
          <Route path="cargo" element={<CargoManagement />} />
          <Route path="warehouse" element={<WarehouseManagement />} />
          <Route path="services" element={<PortServices />} />
          <Route path="documents" element={<Documentation />} />
          <Route path="schedule" element={<Schedule />} />
          <Route path="finance" element={<Finance />} />
          <Route path="security" element={<SecurityCameras />} />
          <Route path="visitors" element={<PortVisitors />} />
          <Route path="history" element={<History />} />
          <Route path="weather" element={<WeatherMonitoring />} />
          <Route path="penalties" element={<Penalties />} />
          <Route path="testing" element={<Testing />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;