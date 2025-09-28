import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './TruckTracker.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

// Custom truck icons
const createTruckIcon = (status) => {
  const colors = {
    collecting: '#4CAF50',
    'en-route': '#2196F3',
    dumping: '#FF9800',
    maintenance: '#f44336'
  };
  
  return L.divIcon({
    html: `<div style="background-color: ${colors[status] || '#9E9E9E'}; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 16px; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">🚛</div>`,
    className: 'custom-truck-marker',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });
};

const createYardIcon = (status) => {
  const colors = {
    operational: '#4CAF50',
    warning: '#FF9800',
    critical: '#f44336'
  };
  
  return L.divIcon({
    html: `<div style="background-color: ${colors[status] || '#9E9E9E'}; width: 35px; height: 35px; border-radius: 8px; display: flex; align-items: center; justify-content: center; color: white; font-size: 18px; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">🏭</div>`,
    className: 'custom-yard-marker',
    iconSize: [35, 35],
    iconAnchor: [17, 17]
  });
};

const createUserIcon = () => {
  return L.divIcon({
    html: `<div class="user-location-marker">📍</div>`,
    className: 'custom-user-marker',
    iconSize: [30, 30],
    iconAnchor: [15, 15]
  });
};

const citizenMenuItems = [
  { path: '/citizen', icon: '🏠', label: 'Home' },
  { path: '/citizen/report', icon: '📋', label: 'Report Problem' },
  { path: '/citizen/schedule', icon: '📅', label: 'Collection Schedule' },
  { path: '/citizen/learning', icon: '🎓', label: 'Learning Hub' },
  { path: '/citizen/rewards', icon: '🏆', label: 'Rewards & Leaderboard' },
  { path: '/citizen/map', icon: '🗺️', label: 'Recycling Centers' },
  { path: '/citizen/truck-tracker', icon: '🚛', label: 'Track Trucks' },
  { path: '/citizen/scrap-collector', icon: '♻️', label: 'Scrap Collectors' },
  { path: '/citizen/community', icon: '🤝', label: 'Community' },
  { path: '/citizen/profile', icon: '👤', label: 'Profile' },
];

function TruckTracker() {
  const [userLocation, setUserLocation] = useState({ lat: 19.2124328, lng: 73.0803325 }); // Dombivli default
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [trucks, setTrucks] = useState([
    {
      id: 'MH-04-AB-1234',
      driver: 'Raj Kumar',
      status: 'collecting',
      route: 'Zone A-7',
      currentLocation: { lat: 19.2164, lng: 73.0853 },
      progress: 67,
      nextStop: 'Dombivli East Station Road',
      eta: '15 min',
      wasteCollected: '620 kg',
      capacity: '85%'
    },
    {
      id: 'MH-04-CD-5678',
      driver: 'Priya Patel',
      status: 'en-route',
      route: 'Zone B-3',
      currentLocation: { lat: 19.2084, lng: 73.0753 },
      progress: 45,
      nextStop: 'Dombivli West Market',
      eta: '8 min',
      wasteCollected: '450 kg',
      capacity: '65%'
    },
    {
      id: 'MH-04-EF-9012',
      driver: 'Amit Singh',
      status: 'dumping',
      route: 'Zone C-1',
      currentLocation: { lat: 19.2183, lng: 73.1046 },
      progress: 90,
      nextStop: 'Kalyan Dumping Yard',
      eta: '2 min',
      wasteCollected: '850 kg',
      capacity: '95%'
    },
    {
      id: 'MH-04-GH-3456',
      driver: 'Maya Sharma',
      status: 'maintenance',
      route: 'Zone D-2',
      currentLocation: { lat: 19.2065, lng: 73.0684 },
      progress: 0,
      nextStop: 'Thane Maintenance Depot',
      eta: 'N/A',
      wasteCollected: '0 kg',
      capacity: '0%'
    }
  ]);

  const [dumpingYards, setDumpingYards] = useState([
    {
      id: 'DY-01',
      name: 'Central Waste Processing',
      location: { lat: 19.0544, lng: 72.8206 }, // Bandra - 30km away
      capacity: '78%',
      status: 'operational',
      wasteTypes: ['Mixed', 'Organic'],
      dailyInput: '2.3 tons',
      queueLength: 2
    },
    {
      id: 'DY-02',
      name: 'Recyclable Processing Hub',
      location: { lat: 18.9647, lng: 72.8258 }, // Worli - 35km away
      capacity: '45%',
      status: 'operational',
      wasteTypes: ['Recyclable', 'Plastic'],
      dailyInput: '1.8 tons',
      queueLength: 0
    },
    {
      id: 'DY-03',
      name: 'Hazardous Waste Facility',
      location: { lat: 19.1176, lng: 72.9060 }, // Powai - 20km away
      capacity: '92%',
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
            const deltaLat = (Math.random() - 0.5) * 0.002;
            const deltaLng = (Math.random() - 0.5) * 0.002;
            
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
    }, 3000); // Update every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Get user's live location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied, using default location');
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

  return (
    <DashboardLayout userType="citizen" menuItems={citizenMenuItems}>
      <div className="page-header">
        <h1 className="page-title">🚛 Live Truck Tracker</h1>
        <div className="tracker-actions">
          <button className="action-btn refresh">🔄 Refresh</button>
          <button className="action-btn location">📍 My Location</button>
        </div>
      </div>

      {/* Status Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>🚛 Active Trucks</h3>
          <div className="stat-value">{trucks.filter(t => t.status !== 'maintenance').length}</div>
          <div className="stat-trend">of {trucks.length} total</div>
        </div>
        <div className="stat-card">
          <h3>📍 Nearest Truck</h3>
          <div className="stat-value">30 km</div>
          <div className="stat-trend">ETA: 12 min</div>
        </div>
        <div className="stat-card">
          <h3>🏭 Dumping Yards</h3>
          <div className="stat-value">{dumpingYards.filter(d => d.status === 'operational').length}</div>
          <div className="stat-trend">operational</div>
        </div>
        <div className="stat-card">
          <h3>⚖️ Total Waste</h3>
          <div className="stat-value">1.92</div>
          <div className="stat-trend">tons collected</div>
        </div>
      </div>

      <div className="tracker-layout">
        {/* Map Container */}
        <div className="map-container">
          <div className="map-header">
            <h3>🗺️ Live Tracking Map</h3>
            <div className="map-controls">
              <button className="map-btn active" data-layer="trucks">🚛 Trucks</button>
              <button className="map-btn active" data-layer="yards">🏭 Yards</button>
              <button className="map-btn" data-layer="routes">🛣️ Routes</button>
            </div>
          </div>
          
          <div className="leaflet-map-container">
            <MapContainer
              center={[userLocation.lat, userLocation.lng]}
              zoom={13}
              style={{ height: '500px', width: '100%' }}
              className="leaflet-map"
            >
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              
              {/* User Location Marker */}
              <Marker 
                position={[userLocation.lat, userLocation.lng]} 
                icon={createUserIcon()}
              >
                <Popup>
                  <div className="popup-content">
                    <h4>📍 Your Location</h4>
                    <p>Current position</p>
                  </div>
                </Popup>
              </Marker>
              
              {/* User Location Circle */}
              <Circle
                center={[userLocation.lat, userLocation.lng]}
                radius={30000}
                pathOptions={{
                  color: '#2196F3',
                  fillColor: '#2196F3',
                  fillOpacity: 0.1,
                  weight: 2
                }}
              />
              
              {/* Truck Markers */}
              {trucks.map((truck) => (
                <Marker
                  key={truck.id}
                  position={[truck.currentLocation.lat, truck.currentLocation.lng]}
                  icon={createTruckIcon(truck.status)}
                  eventHandlers={{
                    click: () => setSelectedTruck(truck)
                  }}
                >
                  <Popup>
                    <div className="popup-content">
                      <h4>🚛 {truck.id}</h4>
                      <p><strong>Driver:</strong> {truck.driver}</p>
                      <p><strong>Status:</strong> <span className={`status-badge ${truck.status}`}>{truck.status}</span></p>
                      <p><strong>Route:</strong> {truck.route}</p>
                      <p><strong>Next Stop:</strong> {truck.nextStop}</p>
                      <p><strong>ETA:</strong> {truck.eta}</p>
                      <p><strong>Capacity:</strong> {truck.capacity}</p>
                      <p><strong>Waste Collected:</strong> {truck.wasteCollected}</p>
                      <div className="popup-buttons">
                        <button className="detail-btn call">📞 Call</button>
                        <button className="detail-btn message">💬 Message</button>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
              
              {/* Dumping Yard Markers */}
              {dumpingYards.map((yard) => (
                <Marker
                  key={yard.id}
                  position={[yard.location.lat, yard.location.lng]}
                  icon={createYardIcon(yard.status)}
                >
                  <Popup>
                    <div className="popup-content">
                      <h4>🏭 {yard.name}</h4>
                      <p><strong>Status:</strong> <span className={`status-badge ${yard.status}`}>{yard.status}</span></p>
                      <p><strong>Capacity:</strong> {yard.capacity}</p>
                      <p><strong>Daily Input:</strong> {yard.dailyInput}</p>
                      <p><strong>Queue:</strong> {yard.queueLength} trucks</p>
                      <div className="waste-types">
                        {yard.wasteTypes.map(type => (
                          <span key={type} className="waste-type-tag">{type}</span>
                        ))}
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          <div className="map-legend">
            <div className="legend-item">
              <span className="legend-marker user">📍</span>
              <span>Your Location</span>
            </div>
            <div className="legend-item">
              <span className="legend-marker truck">🚛</span>
              <span>Collection Trucks</span>
            </div>
            <div className="legend-item">
              <span className="legend-marker yard">🏭</span>
              <span>Dumping Yards</span>
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="info-panel">
          {selectedTruck ? (
            <div className="truck-details">
              <div className="detail-header">
                <h3>🚛 {selectedTruck.id}</h3>
                <span className={`status-badge ${selectedTruck.status}`}>
                  {selectedTruck.status}
                </span>
              </div>

              <div className="truck-info-grid">
                <div className="info-item">
                  <span className="info-label">👨‍✈️ Driver:</span>
                  <span className="info-value">{selectedTruck.driver}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">🗺️ Route:</span>
                  <span className="info-value">{selectedTruck.route}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">📍 Next Stop:</span>
                  <span className="info-value">{selectedTruck.nextStop}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">⏰ ETA:</span>
                  <span className="info-value">{selectedTruck.eta}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">📊 Progress:</span>
                  <span className="info-value">{selectedTruck.progress}%</span>
                </div>
                <div className="info-item">
                  <span className="info-label">⚖️ Collected:</span>
                  <span className="info-value">{selectedTruck.wasteCollected}</span>
                </div>
              </div>

              <div className="progress-section">
                <h4>Route Progress</h4>
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{width: `${selectedTruck.progress}%`}}
                  ></div>
                </div>
                <div className="progress-text">{selectedTruck.progress}% Complete</div>
              </div>

              <div className="truck-capacity">
                <h4>Truck Capacity</h4>
                <div className="capacity-visual">
                  <div className="capacity-bar">
                    <div 
                      className="capacity-fill" 
                      style={{height: selectedTruck.capacity}}
                    ></div>
                  </div>
                  <span className="capacity-percentage">{selectedTruck.capacity}</span>
                </div>
              </div>

              <div className="action-buttons">
                <button className="detail-btn call">📞 Call Driver</button>
                <button className="detail-btn message">💬 Send Message</button>
                <button className="detail-btn route">🗺️ View Route</button>
              </div>
            </div>
          ) : (
            <div className="default-info">
              <h3>🚛 Truck Information</h3>
              <p>Click on any truck on the map to view detailed information</p>
              
              <div className="quick-stats">
                <h4>Quick Stats</h4>
                <div className="stat-list">
                  <div className="stat-row">
                    <span>Active Trucks:</span>
                    <span>{trucks.filter(t => t.status !== 'maintenance').length}</span>
                  </div>
                  <div className="stat-row">
                    <span>Collecting:</span>
                    <span>{trucks.filter(t => t.status === 'collecting').length}</span>
                  </div>
                  <div className="stat-row">
                    <span>En Route:</span>
                    <span>{trucks.filter(t => t.status === 'en-route').length}</span>
                  </div>
                  <div className="stat-row">
                    <span>At Yard:</span>
                    <span>{trucks.filter(t => t.status === 'dumping').length}</span>
                  </div>
                </div>
              </div>

              <div className="nearby-trucks">
                <h4>Nearby Trucks</h4>
                {trucks
                  .sort((a, b) => calculateDistance(userLocation, a.currentLocation) - calculateDistance(userLocation, b.currentLocation))
                  .slice(0, 3)
                  .map(truck => (
                    <div key={truck.id} className="nearby-item" onClick={() => setSelectedTruck(truck)}>
                      <div className="nearby-info">
                        <strong>{truck.id}</strong>
                        <span className="distance">{calculateDistance(userLocation, truck.currentLocation)} km away</span>
                      </div>
                      <span className={`nearby-status ${truck.status}`}>
                        {truck.status}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Dumping Yards Status */}
          <div className="yards-section">
            <h3>🏭 Dumping Yards Status</h3>
            <div className="yards-list">
              {dumpingYards.map(yard => (
                <div key={yard.id} className={`yard-item ${yard.status}`}>
                  <div className="yard-header">
                    <strong>{yard.name}</strong>
                    <span className={`yard-status ${yard.status}`}>
                      {yard.status}
                    </span>
                  </div>
                  <div className="yard-details">
                    <div className="yard-metric">
                      <span>Capacity: {yard.capacity}</span>
                      <div className="mini-bar">
                        <div 
                          className="mini-fill" 
                          style={{width: yard.capacity}}
                        ></div>
                      </div>
                    </div>
                    <div className="yard-info-row">
                      <span>Queue: {yard.queueLength} trucks</span>
                      <span>Today: {yard.dailyInput}</span>
                    </div>
                    <div className="waste-types">
                      {yard.wasteTypes.map(type => (
                        <span key={type} className="waste-type-tag">{type}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default TruckTracker;