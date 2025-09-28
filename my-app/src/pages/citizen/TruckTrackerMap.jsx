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

const citizenMenuItems = [
  { path: '/citizen', icon: '🏠', label: 'Home' },
  { path: '/citizen/report', icon: '📋', label: 'Report Problem' },
  { path: '/citizen/schedule', icon: '📅', label: 'Collection Schedule' },
  { path: '/citizen/learning', icon: '🎓', label: 'Learning Hub' },
  { path: '/citizen/rewards', icon: '🏆', label: 'Rewards & Leaderboard' },
  { path: '/citizen/map', icon: '🗺️', label: 'Recycling Centers' },
  { path: '/citizen/truck-tracker', icon: '🚛', label: 'Track Trucks' },
  { path: '/citizen/community', icon: '🤝', label: 'Community' },
  { path: '/citizen/profile', icon: '👤', label: 'Profile' },
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

function TruckTrackerMap() {
  const [userLocation, setUserLocation] = useState({ lat: 23.0225, lng: 72.5714 }); // Ahmedabad default
  const [selectedTruck, setSelectedTruck] = useState(null);
  const [showUserLocation, setShowUserLocation] = useState(true);
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

  // Get user's live location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userPos);
          setMapCenter([userPos.lat, userPos.lng]);
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

  const focusOnUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userPos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setUserLocation(userPos);
          setMapCenter([userPos.lat, userPos.lng]);
        }
      );
    }
  };

  return (
    <DashboardLayout userType="citizen" menuItems={citizenMenuItems}>
      <div className="page-header">
        <h1 className="page-title">🗺️ Live Truck Tracker - Real Map</h1>
        <div className="tracker-actions">
          <button className="action-btn refresh" onClick={() => window.location.reload()}>
            🔄 Refresh
          </button>
          <button className="action-btn location" onClick={focusOnUserLocation}>
            📍 My Location
          </button>
          <button 
            className={`action-btn toggle ${showUserLocation ? 'active' : ''}`}
            onClick={() => setShowUserLocation(!showUserLocation)}
          >
            👁️ Show Me
          </button>
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
          <div className="stat-value">
            {Math.min(...trucks.map(t => calculateDistance(userLocation, t.currentLocation)))} km
          </div>
          <div className="stat-trend">from your location</div>
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
              userLocation={userLocation}
              trucks={trucks}
              selectedTruck={selectedTruck}
            />

            {/* User Location */}
            {showUserLocation && (
              <>
                <Marker 
                  position={[userLocation.lat, userLocation.lng]}
                  icon={createCustomIcon('📍', '#2196F3', true)}
                >
                  <Popup>
                    <div className="popup-content">
                      <h4>📍 Your Location</h4>
                      <p>Lat: {userLocation.lat.toFixed(4)}</p>
                      <p>Lng: {userLocation.lng.toFixed(4)}</p>
                    </div>
                  </Popup>
                </Marker>
                <Circle
                  center={[userLocation.lat, userLocation.lng]}
                  radius={500}
                  pathOptions={{ 
                    color: '#2196F3',
                    fillColor: '#2196F3',
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
                        <button onClick={() => setSelectedTruck(truck)}>View Details</button>
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

        {/* Info Panel */}
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
                  <span className="value">{calculateDistance(userLocation, selectedTruck.currentLocation)} km</span>
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
                <button className="truck-action-btn message">💬 Message</button>
                <button className="truck-action-btn center" onClick={() => setMapCenter([selectedTruck.currentLocation.lat, selectedTruck.currentLocation.lng])}>
                  🎯 Center Map
                </button>
              </div>
            </div>
          ) : (
            <div className="default-map-info">
              <h3>🗺️ Interactive Map</h3>
              <p>Click on any truck or dumping yard to view details</p>
              
              <div className="map-legend">
                <h4>Legend</h4>
                <div className="legend-items">
                  <div className="legend-item">
                    <span className="legend-icon">📍</span>
                    <span>Your Location</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-icon" style={{color: '#4CAF50'}}>🚛</span>
                    <span>Collecting Truck</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-icon" style={{color: '#2196F3'}}>🚛</span>
                    <span>En-route Truck</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-icon" style={{color: '#FF9800'}}>🚛</span>
                    <span>Dumping Truck</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-icon" style={{color: '#f44336'}}>🚛</span>
                    <span>Maintenance</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-icon">🏭</span>
                    <span>Dumping Yards</span>
                  </div>
                </div>
              </div>

              <div className="nearby-trucks-list">
                <h4>Nearby Trucks</h4>
                {trucks
                  .sort((a, b) => calculateDistance(userLocation, a.currentLocation) - calculateDistance(userLocation, b.currentLocation))
                  .slice(0, 3)
                  .map(truck => (
                    <div key={truck.id} className="nearby-truck-item" onClick={() => setSelectedTruck(truck)}>
                      <div className="nearby-truck-info">
                        <strong>{truck.id}</strong>
                        <small>{calculateDistance(userLocation, truck.currentLocation)} km away</small>
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
            <h4>🏭 Dumping Yards Status</h4>
            {dumpingYards.map(yard => (
              <div key={yard.id} className="yard-summary-item">
                <div className="yard-summary-header">
                  <strong>{yard.id}</strong>
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

export default TruckTrackerMap;