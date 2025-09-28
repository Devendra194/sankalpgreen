import { useState, useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import DashboardLayout from '../../components/DashboardLayout';
import './TruckTrackerMap.css';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.divIcon({
  className: 'custom-div-icon',
  html: "",
  iconSize: [30, 30],
  iconAnchor: [15, 30]
});

L.Marker.prototype.options.icon = DefaultIcon;

const adminMenuItems = [
  { path: '/admin', icon: '🏠', label: 'Dashboard' },
  { path: '/admin/complaints', icon: '📋', label: 'Complaints Tracker' },
  { path: '/admin/truck-tracker', icon: '🚛', label: 'Live Truck Tracker' },
  { path: '/admin/routes', icon: '🗺️', label: 'Route Management' },
  { path: '/admin/workers', icon: '👷', label: 'Worker Management' },
  { path: '/admin/analytics', icon: '📊', label: 'Analytics & Reports' },
  { path: '/admin/zones', icon: '🏘️', label: 'Zone Management' },
  { path: '/admin/vehicles', icon: '🚚', label: 'Vehicle Fleet' },
  { path: '/admin/settings', icon: '⚙️', label: 'System Settings' },
];

// Custom marker icons
const createCustomIcon = (emoji, color, isSelected = false) => {
  return L.divIcon({
    className: 'custom-marker-icon',
    html: `
      <div class="marker-container ${isSelected ? 'selected' : ''}" style="--marker-color: ${color}">
        <div class="marker-icon">${emoji}</div>
        ${isSelected ? '<div class="marker-pulse"></div>' : ''}
      </div>
    `,
    iconSize: [40, 40],
    iconAnchor: [20, 40],
    popupAnchor: [0, -40]
  });
};

function MapController({ center, userLocation, trucks, selectedTruck }) {
  const map = useMap();
  
  useEffect(() => {
    if (selectedTruck) {
      map.setView([selectedTruck.currentLocation.lat, selectedTruck.currentLocation.lng], 16);
    }
  }, [selectedTruck, map]);

  return null;
}

function AdminTruckTrackerMap() {
  const [adminLocation, setAdminLocation] = useState({ lat: 23.0225, lng: 72.5714 }); // Admin office default
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [showAdminLocation, setShowAdminLocation] = useState(true);
  const [mapCenter, setMapCenter] = useState([23.0225, 72.5714]);
  const [trucks, setTrucks] = useState([
    {
      id: 'GJ-07-AB-1234',
      driver: 'Raj Kumar',
      status: 'collecting',
      route: 'Zone A-7',
      currentLocation: { lat: 23.0325, lng: 72.5814 },
      progress: 67,
      nextStop: 'Gandhi Street Block B',
      eta: '15 min',
      wasteCollected: '620 kg',
      capacity: '85%',
      route_path: [
        [23.0325, 72.5814],
        [23.0335, 72.5824],
        [23.0345, 72.5834]
      ]
    },
    {
      id: 'GJ-07-CD-5678',
      driver: 'Priya Patel',
      status: 'en-route',
      route: 'Zone B-3',
      currentLocation: { lat: 23.0125, lng: 72.5614 },
      progress: 45,
      nextStop: 'Market Square',
      eta: '8 min',
      wasteCollected: '450 kg',
      capacity: '65%',
      route_path: [
        [23.0125, 72.5614],
        [23.0135, 72.5624],
        [23.0145, 72.5634]
      ]
    },
    {
      id: 'GJ-07-EF-9012',
      driver: 'Amit Singh',
      status: 'dumping',
      route: 'Zone C-1',
      currentLocation: { lat: 22.9925, lng: 72.5914 },
      progress: 90,
      nextStop: 'Dumping Yard',
      eta: '2 min',
      wasteCollected: '850 kg',
      capacity: '95%',
      route_path: [
        [22.9925, 72.5914],
        [22.9935, 72.5924],
        [22.9945, 72.5934]
      ]
    },
    {
      id: 'GJ-07-GH-3456',
      driver: 'Maya Sharma',
      status: 'maintenance',
      route: 'Zone D-2',
      currentLocation: { lat: 23.0425, lng: 72.5514 },
      progress: 0,
      nextStop: 'Maintenance Depot',
      eta: 'N/A',
      wasteCollected: '0 kg',
      capacity: '0%',
      route_path: []
    },
    {
      id: 'GJ-07-IJ-7890',
      driver: 'Suresh Yadav',
      status: 'collecting',
      route: 'Zone E-5',
      currentLocation: { lat: 23.0225, lng: 72.5814 },
      progress: 30,
      nextStop: 'Industrial Area',
      eta: '20 min',
      wasteCollected: '280 kg',
      capacity: '40%',
      route_path: [
        [23.0225, 72.5814],
        [23.0235, 72.5824],
        [23.0245, 72.5834]
      ]
    }
  ]);

  const [dumpingYards, setDumpingYards] = useState([
    {
      id: 'DY-01',
      name: 'Central Waste Processing',
      location: { lat: 22.9825, lng: 72.6014 },
      capacity: 78,
      status: 'operational',
      wasteTypes: ['Mixed', 'Organic'],
      dailyInput: '2.3 tons',
      queueLength: 2
    },
    {
      id: 'DY-02',
      name: 'Recyclable Processing Hub',
      location: { lat: 23.0525, lng: 72.5314 },
      capacity: 45,
      status: 'operational',
      wasteTypes: ['Recyclable', 'Plastic'],
      dailyInput: '1.8 tons',
      queueLength: 0
    },
    {
      id: 'DY-03',
      name: 'Hazardous Waste Facility',
      location: { lat: 22.9725, lng: 72.5714 },
      capacity: 92,
      status: 'warning',
      wasteTypes: ['Hazardous', 'Medical'],
      dailyInput: '0.5 tons',
      queueLength: 1
    }
  ]);

  // Simulate truck movement
  useEffect(() => {
    const interval = setInterval(() => {
      setTrucks(prevTrucks => 
        prevTrucks.map(truck => {
          if (truck.status === 'collecting' || truck.status === 'en-route') {
            // Simulate movement by slightly changing coordinates
            const deltaLat = (Math.random() - 0.5) * 0.001;
            const deltaLng = (Math.random() - 0.5) * 0.001;
            
            return {
              ...truck,
              currentLocation: {
                lat: truck.currentLocation.lat + deltaLat,
                lng: truck.currentLocation.lng + deltaLng
              }
            };
          }
          return truck;
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Get admin office location (or current location)
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const adminPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setAdminLocation(adminPos);
          setMapCenter([adminPos.lat, adminPos.lng]);
        },
        (error) => {
          console.log('Location access denied, using default admin office location');
        }
      );
    }
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'collecting': return '#4CAF50';
      case 'en-route': return '#2196F3';
      case 'dumping': return '#FF9800';
      case 'maintenance': return '#f44336';
      default: return '#9E9E9E';
    }
  };

  const getDumpingYardStatusColor = (status) => {
    switch (status) {
      case 'operational': return '#4CAF50';
      case 'warning': return '#FF9800';
      case 'critical': return '#f44336';
      default: return '#9E9E9E';
    }
  };

  const calculateDistance = (loc1, loc2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (loc2.lat - loc1.lat) * Math.PI / 180;
    const dLon = (loc2.lng - loc1.lng) * Math.PI / 180;
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(loc1.lat * Math.PI / 180) * Math.cos(loc2.lat * Math.PI / 180) *
              Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return (R * c).toFixed(1);
  };

  const focusOnAdminLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const adminPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setAdminLocation(adminPos);
          setMapCenter([adminPos.lat, adminPos.lng]);
        }
      );
    }
  };

  const sendDispatchCommand = (truckId, command) => {
    alert(`Dispatch command "${command}" sent to truck ${truckId}`);
    // Here you would integrate with your backend API
  };

  return (
    <DashboardLayout userType="admin" menuItems={adminMenuItems}>
      <div className="page-header">
        <h1 className="page-title">🚛 Fleet Management - Live Truck Tracker</h1>
        <div className="tracker-actions">
          <button className="action-btn refresh" onClick={() => window.location.reload()}>
            🔄 Refresh All
          </button>
          <button className="action-btn location" onClick={focusOnAdminLocation}>
            🏢 Admin Office
          </button>
          <button 
            className={`action-btn toggle ${showAdminLocation ? 'active' : ''}`}
            onClick={() => setShowAdminLocation(!showAdminLocation)}
          >
            👁️ Show Office
          </button>
          <button className="action-btn emergency">
            🚨 Emergency Alert
          </button>
        </div>
      </div>

      {/* Admin Stats Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>🚛 Fleet Status</h3>
          <div className="stat-value">{trucks.filter(t => t.status !== 'maintenance').length}/{trucks.length}</div>
          <div className="stat-trend">trucks operational</div>
        </div>
        <div className="stat-card">
          <h3>⚠️ Alerts</h3>
          <div className="stat-value">{trucks.filter(t => t.status === 'maintenance').length}</div>
          <div className="stat-trend">maintenance required</div>
        </div>
        <div className="stat-card">
          <h3>🏭 Yards Status</h3>
          <div className="stat-value">{dumpingYards.filter(d => d.status === 'operational').length}/{dumpingYards.length}</div>
          <div className="stat-trend">yards operational</div>
        </div>
        <div className="stat-card">
          <h3>📊 Daily Progress</h3>
          <div className="stat-value">{Math.round(trucks.reduce((sum, t) => sum + t.progress, 0) / trucks.length)}%</div>
          <div className="stat-trend">average completion</div>
        </div>
      </div>

      <div className="map-tracker-layout">
        {/* Real Interactive Map */}
        <div className="real-map-container">
          <MapContainer
            center={mapCenter}
            zoom={13}
            style={{ height: '600px', width: '100%' }}
            className="leaflet-map"
          >
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />

            <MapController 
              center={mapCenter} 
              userLocation={adminLocation}
              trucks={trucks}
              selectedTruck={selectedTruck}
            />

            {/* Admin Office Location */}
            {showAdminLocation && (
              <>
                <Marker 
                  position={[adminLocation.lat, adminLocation.lng]}
                  icon={createCustomIcon('🏢', '#9C27B0', true)}
                >
                  <Popup>
                    <div className="popup-content">
                      <h4>🏢 Admin Office</h4>
                      <p>Control Center</p>
                      <p>Lat: {adminLocation.lat.toFixed(4)}</p>
                      <p>Lng: {adminLocation.lng.toFixed(4)}</p>
                    </div>
                  </Popup>
                </Marker>
                <Circle
                  center={[adminLocation.lat, adminLocation.lng]}
                  radius={1000}
                  pathOptions={{ 
                    color: '#9C27B0',
                    fillColor: '#9C27B0',
                    fillOpacity: 0.1
                  }}
                />
              </>
            )}

            {/* Trucks */}
            {trucks.map((truck) => (
              <div key={truck.id}>
                <Marker
                  position={[truck.currentLocation.lat, truck.currentLocation.lng]}
                  icon={createCustomIcon('🚛', getStatusColor(truck.status), selectedTruck?.id === truck.id)}
                  eventHandlers={{
                    click: () => setSelectedTruck(truck)
                  }}
                >
                  <Popup>
                    <div className="popup-content">
                      <h4>🚛 {truck.id}</h4>
                      <p><strong>Driver:</strong> {truck.driver}</p>
                      <p><strong>Status:</strong> <span style={{color: getStatusColor(truck.status)}}>{truck.status}</span></p>
                      <p><strong>Route:</strong> {truck.route}</p>
                      <p><strong>Progress:</strong> {truck.progress}%</p>
                      <p><strong>Next Stop:</strong> {truck.nextStop}</p>
                      <p><strong>ETA:</strong> {truck.eta}</p>
                      <p><strong>Collected:</strong> {truck.wasteCollected}</p>
                      <p><strong>Capacity:</strong> {truck.capacity}</p>
                      <div className="popup-actions">
                        <button onClick={() => setSelectedTruck(truck)}>Manage Truck</button>
                        <button onClick={() => sendDispatchCommand(truck.id, 'Priority Route')}>🚨 Priority</button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
                
                {/* Route Path */}
                {truck.route_path.length > 0 && (
                  <Polyline
                    positions={truck.route_path}
                    pathOptions={{
                      color: getStatusColor(truck.status),
                      weight: 3,
                      opacity: 0.7,
                      dashArray: '10, 10'
                    }}
                  />
                )}
              </div>
            ))}

            {/* Dumping Yards */}
            {dumpingYards.map((yard) => (
              <div key={yard.id}>
                <Marker
                  position={[yard.location.lat, yard.location.lng]}
                  icon={createCustomIcon('🏭', getDumpingYardStatusColor(yard.status))}
                >
                  <Popup>
                    <div className="popup-content">
                      <h4>🏭 {yard.name}</h4>
                      <p><strong>ID:</strong> {yard.id}</p>
                      <p><strong>Status:</strong> <span style={{color: getDumpingYardStatusColor(yard.status)}}>{yard.status}</span></p>
                      <p><strong>Capacity:</strong> {yard.capacity}%</p>
                      <p><strong>Queue:</strong> {yard.queueLength} trucks</p>
                      <p><strong>Daily Input:</strong> {yard.dailyInput}</p>
                      <div className="waste-types-popup">
                        <strong>Waste Types:</strong>
                        <br />
                        {yard.wasteTypes.join(', ')}
                      </div>
                    </div>
                  </Popup>
                </Marker>
                <Circle
                  center={[yard.location.lat, yard.location.lng]}
                  radius={200}
                  pathOptions={{ 
                    color: getDumpingYardStatusColor(yard.status),
                    fillColor: getDumpingYardStatusColor(yard.status),
                    fillOpacity: 0.2
                  }}
                />
              </div>
            ))}
          </MapContainer>
        </div>

        {/* Admin Info Panel */}
        <div className="map-info-panel">
          {selectedTruck ? (
            <div className="selected-truck-info">
              <div className="truck-header">
                <h3>🚛 {selectedTruck.id}</h3>
                <span className={`status-badge ${selectedTruck.status}`} style={{backgroundColor: getStatusColor(selectedTruck.status)}}>
                  {selectedTruck.status}
                </span>
              </div>

              <div className="truck-details-grid">
                <div className="detail-item">
                  <span className="label">👨‍✈️ Driver:</span>
                  <span className="value">{selectedTruck.driver}</span>
                </div>
                <div className="detail-item">
                  <span className="label">🗺️ Route:</span>
                  <span className="value">{selectedTruck.route}</span>
                </div>
                <div className="detail-item">
                  <span className="label">📍 Next Stop:</span>
                  <span className="value">{selectedTruck.nextStop}</span>
                </div>
                <div className="detail-item">
                  <span className="label">⏰ ETA:</span>
                  <span className="value">{selectedTruck.eta}</span>
                </div>
                <div className="detail-item">
                  <span className="label">📊 Progress:</span>
                  <span className="value">{selectedTruck.progress}%</span>
                </div>
                <div className="detail-item">
                  <span className="label">⚖️ Collected:</span>
                  <span className="value">{selectedTruck.wasteCollected}</span>
                </div>
                <div className="detail-item">
                  <span className="label">📏 Distance:</span>
                  <span className="value">{calculateDistance(adminLocation, selectedTruck.currentLocation)} km</span>
                </div>
                <div className="detail-item">
                  <span className="label">🏗️ Capacity:</span>
                  <span className="value">{selectedTruck.capacity}</span>
                </div>
              </div>

              <div className="truck-progress-visual">
                <h4>Route Progress</h4>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{width: `${selectedTruck.progress}%`, backgroundColor: getStatusColor(selectedTruck.status)}}
                  ></div>
                </div>
                <span className="progress-label">{selectedTruck.progress}% Complete</span>
              </div>

              <div className="truck-actions">
                <button className="truck-action-btn call">📞 Call Driver</button>
                <button className="truck-action-btn message">📡 Send Command</button>
                <button className="truck-action-btn center" onClick={() => setMapCenter([selectedTruck.currentLocation.lat, selectedTruck.currentLocation.lng])}>
                  🎯 Center Map
                </button>
              </div>

              <div className="admin-dispatch-controls">
                <h4>🚨 Dispatch Controls</h4>
                <div className="dispatch-buttons">
                  <button onClick={() => sendDispatchCommand(selectedTruck.id, 'Return to Base')}>🏠 Return to Base</button>
                  <button onClick={() => sendDispatchCommand(selectedTruck.id, 'Emergency Stop')}>⛔ Emergency Stop</button>
                  <button onClick={() => sendDispatchCommand(selectedTruck.id, 'Maintenance Required')}>🔧 Request Maintenance</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="default-map-info">
              <h3>🗺️ Fleet Management Center</h3>
              <p>Monitor and manage your entire waste collection fleet in real-time</p>
              
              <div className="map-legend">
                <h4>Fleet Legend</h4>
                <div className="legend-items">
                  <div className="legend-item">
                    <span className="legend-icon">🏢</span>
                    <span>Admin Office</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-icon" style={{color: '#4CAF50'}}>🚛</span>
                    <span>Collecting</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-icon" style={{color: '#2196F3'}}>🚛</span>
                    <span>En-route</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-icon" style={{color: '#FF9800'}}>🚛</span>
                    <span>Dumping</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-icon" style={{color: '#f44336'}}>🚛</span>
                    <span>Maintenance</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-icon">🏭</span>
                    <span>Processing Yards</span>
                  </div>
                </div>
              </div>

              <div className="fleet-overview">
                <h4>🚛 Fleet Overview</h4>
                {trucks.map(truck => (
                  <div key={truck.id} className="nearby-truck-item" onClick={() => setSelectedTruck(truck)}>
                    <div className="nearby-truck-info">
                      <strong>{truck.id}</strong>
                      <small>{truck.driver} - {calculateDistance(adminLocation, truck.currentLocation)} km away</small>
                    </div>
                    <span 
                      className="nearby-status" 
                      style={{backgroundColor: getStatusColor(truck.status)}}
                    >
                      {truck.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="yards-summary">
            <h4>🏭 Processing Facilities</h4>
            {dumpingYards.map(yard => (
              <div key={yard.id} className="yard-summary-item">
                <div className="yard-summary-header">
                  <strong>{yard.name}</strong>
                  <span 
                    className="yard-summary-status"
                    style={{backgroundColor: getDumpingYardStatusColor(yard.status)}}
                  >
                    {yard.status}
                  </span>
                </div>
                <div className="yard-summary-details">
                  <span>Capacity: {yard.capacity}%</span>
                  <span>Queue: {yard.queueLength}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AdminTruckTrackerMap;