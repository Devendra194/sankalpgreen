import { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './ScrapCollector.css';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png'
});

// Custom scrap collector icons
const createCollectorIcon = (rating) => {
  const colors = {
    excellent: '#4CAF50',
    good: '#2196F3',
    average: '#FF9800',
    poor: '#f44336'
  };
  
  return L.divIcon({
    html: `<div style="background-color: ${colors[rating] || '#9E9E9E'}; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; color: white; font-size: 16px; border: 2px solid white; box-shadow: 0 2px 4px rgba(0,0,0,0.3);">♻️</div>`,
    className: 'custom-collector-marker',
    iconSize: [32, 32],
    iconAnchor: [16, 16]
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

function ScrapCollector() {
  const [userLocation, setUserLocation] = useState({ lat: 19.2124328, lng: 73.0803325 }); // Dombivli default
  const [selectedCollector, setSelectedCollector] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('distance');
  
  const [scrapCollectors, setScrapCollectors] = useState([
    {
      id: 'SC-001',
      name: 'GreenCycle Solutions',
      owner: 'Rajesh Patel',
      phone: '+91 98765 43210',
      email: 'rajesh@greencycle.com',
      address: '123 Industrial Area, Dombivli East, Mumbai',
      location: { lat: 19.2124328, lng: 73.0803325 },
      rating: 'excellent',
      stars: 4.8,
      reviewCount: 156,
      specialties: ['Paper', 'Cardboard', 'Plastic Bottles', 'Metal Cans'],
      priceRange: '₹15-25/kg',
      openHours: '8:00 AM - 6:00 PM',
      workingDays: 'Mon-Sat',
      services: ['Doorstep Collection', 'Bulk Purchase', 'Weighing Service'],
      verified: true,
      experience: '8 years',
      monthlyCapacity: '500 tons',
      lastActive: '2 hours ago',
      description: 'Reliable scrap collection service with fair pricing and doorstep pickup facility.'
    },
    {
      id: 'SC-002',
      name: 'EcoWaste Recyclers',
      owner: 'Priya Sharma',
      phone: '+91 87654 32109',
      email: 'priya@ecowaste.com',
      address: '456 Recycle Street, Dombivli West, Mumbai',
      location: { lat: 19.2084, lng: 73.0753 },
      rating: 'good',
      stars: 4.2,
      reviewCount: 89,
      specialties: ['Electronics', 'Appliances', 'Computer Parts', 'Mobile Phones'],
      priceRange: '₹20-35/kg',
      openHours: '9:00 AM - 7:00 PM',
      workingDays: 'Mon-Sun',
      services: ['E-waste Certified', 'Data Destruction', 'Pickup Service'],
      verified: true,
      experience: '5 years',
      monthlyCapacity: '200 tons',
      lastActive: '1 day ago',
      description: 'Specialized in electronic waste recycling with certified data destruction services.'
    },
    {
      id: 'SC-003',
      name: 'Metal Masters',
      owner: 'Amit Kumar',
      phone: '+91 76543 21098',
      email: 'amit@metalmasters.com',
      address: '789 Iron Market, Kalyan East, Mumbai',
      location: { lat: 19.2183, lng: 73.1046 },
      rating: 'excellent',
      stars: 4.9,
      reviewCount: 203,
      specialties: ['Iron', 'Steel', 'Copper', 'Aluminum', 'Brass'],
      priceRange: '₹25-45/kg',
      openHours: '7:00 AM - 8:00 PM',
      workingDays: 'Mon-Sat',
      services: ['Metal Testing', 'Bulk Collection', 'Industrial Pickup'],
      verified: true,
      experience: '12 years',
      monthlyCapacity: '800 tons',
      lastActive: '30 minutes ago',
      description: 'Highest rates for metal scraps with professional testing and grading services.'
    },
    {
      id: 'SC-004',
      name: 'Paper Plus Recycling',
      owner: 'Sunita Gupta',
      phone: '+91 65432 10987',
      email: 'sunita@paperplus.com',
      address: '321 Paper Mill Road, Thane West, Mumbai',
      location: { lat: 19.2065, lng: 73.0684 },
      rating: 'good',
      stars: 4.1,
      reviewCount: 67,
      specialties: ['Newspaper', 'Books', 'Office Paper', 'Cardboard Boxes'],
      priceRange: '₹8-15/kg',
      openHours: '8:30 AM - 5:30 PM',
      workingDays: 'Mon-Fri',
      services: ['Document Shredding', 'Paper Sorting', 'Office Pickup'],
      verified: true,
      experience: '6 years',
      monthlyCapacity: '300 tons',
      lastActive: '3 hours ago',
      description: 'Specialized paper recycling with secure document destruction for offices.'
    },
    {
      id: 'SC-005',
      name: 'Plastic World Recyclers',
      owner: 'Vikram Singh',
      phone: '+91 54321 09876',
      email: 'vikram@plasticworld.com',
      address: '654 Plastic Park, Ulhasnagar, Mumbai',
      location: { lat: 19.2174, lng: 73.1478 },
      rating: 'average',
      stars: 3.8,
      reviewCount: 45,
      specialties: ['PET Bottles', 'Plastic Bags', 'Containers', 'Toys'],
      priceRange: '₹10-18/kg',
      openHours: '9:00 AM - 6:00 PM',
      workingDays: 'Mon-Sat',
      services: ['Plastic Sorting', 'Cleaning Service', 'Quality Check'],
      verified: false,
      experience: '3 years',
      monthlyCapacity: '150 tons',
      lastActive: '1 week ago',
      description: 'Focused on plastic waste recycling with cleaning and sorting services.'
    },
    {
      id: 'SC-006',
      name: 'Universal Scrap Hub',
      owner: 'Meera Joshi',
      phone: '+91 43210 98765',
      email: 'meera@universalscrap.com',
      address: '987 Mixed Waste Center, Badlapur, Mumbai',
      location: { lat: 19.1559, lng: 73.2673 },
      rating: 'excellent',
      stars: 4.6,
      reviewCount: 124,
      specialties: ['Mixed Waste', 'Furniture', 'Appliances', 'Construction Waste'],
      priceRange: '₹5-30/kg',
      openHours: '7:00 AM - 7:00 PM',
      workingDays: 'Mon-Sun',
      services: ['Any Waste Type', 'Large Item Pickup', '24/7 Helpline'],
      verified: true,
      experience: '10 years',
      monthlyCapacity: '600 tons',
      lastActive: '1 hour ago',
      description: 'One-stop solution for all types of scrap with 24/7 customer support.'
    }
  ]);

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

  const getRatingColor = (rating) => {
    switch (rating) {
      case 'excellent': return '#4CAF50';
      case 'good': return '#2196F3';
      case 'average': return '#FF9800';
      case 'poor': return '#f44336';
      default: return '#9E9E9E';
    }
  };

  const getFilteredCollectors = () => {
    let filtered = scrapCollectors;
    
    if (filterType !== 'all') {
      filtered = filtered.filter(collector => 
        collector.specialties.some(specialty => 
          specialty.toLowerCase().includes(filterType.toLowerCase())
        )
      );
    }

    // Sort collectors
    if (sortBy === 'distance') {
      filtered = filtered.sort((a, b) => 
        calculateDistance(userLocation, a.location) - calculateDistance(userLocation, b.location)
      );
    } else if (sortBy === 'rating') {
      filtered = filtered.sort((a, b) => b.stars - a.stars);
    } else if (sortBy === 'price') {
      filtered = filtered.sort((a, b) => {
        const aPrice = parseInt(a.priceRange.split('-')[1]);
        const bPrice = parseInt(b.priceRange.split('-')[1]);
        return bPrice - aPrice;
      });
    }

    return filtered;
  };

  const handleCall = (phone) => {
    window.open(`tel:${phone}`, '_self');
  };

  const handleWhatsApp = (phone, name) => {
    const message = `Hi ${name}, I found your contact through SankalpGreen app. I have some scrap items to sell. Could you please provide more details about your collection service?`;
    window.open(`https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <DashboardLayout userType="citizen" menuItems={citizenMenuItems}>
      <div className="page-header">
        <h1 className="page-title">♻️ Scrap Collectors</h1>
        <div className="scrap-actions">
          <button className="action-btn refresh">🔄 Refresh</button>
          <button className="action-btn location">📍 My Location</button>
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>♻️ Active Collectors</h3>
          <div className="stat-value">{scrapCollectors.filter(c => c.verified).length}</div>
          <div className="stat-trend">verified dealers</div>
        </div>
        <div className="stat-card">
          <h3>📍 Nearest Collector</h3>
          <div className="stat-value">2-3 km</div>
          <div className="stat-trend">from your location</div>
        </div>
        <div className="stat-card">
          <h3>⭐ Avg Rating</h3>
          <div className="stat-value">
            {(scrapCollectors.reduce((sum, c) => sum + c.stars, 0) / scrapCollectors.length).toFixed(1)}
          </div>
          <div className="stat-trend">customer satisfaction</div>
        </div>
        <div className="stat-card">
          <h3>💰 Best Rate</h3>
          <div className="stat-value">₹45/kg</div>
          <div className="stat-trend">for metal scraps</div>
        </div>
      </div>

      <div className="scrap-layout">
        {/* Map Container */}
        <div className="map-container">
          <div className="map-header">
            <h3>🗺️ Nearby Scrap Collectors</h3>
            <div className="map-controls">
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="filter-select">
                <option value="all">All Types</option>
                <option value="paper">Paper</option>
                <option value="plastic">Plastic</option>
                <option value="metal">Metal</option>
                <option value="electronic">Electronics</option>
              </select>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select">
                <option value="distance">Sort by Distance</option>
                <option value="rating">Sort by Rating</option>
                <option value="price">Sort by Price</option>
              </select>
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
                radius={2000}
                pathOptions={{
                  color: '#2196F3',
                  fillColor: '#2196F3',
                  fillOpacity: 0.1,
                  weight: 2
                }}
              />
              
              {/* Scrap Collector Markers */}
              {getFilteredCollectors().map((collector) => (
                <Marker
                  key={collector.id}
                  position={[collector.location.lat, collector.location.lng]}
                  icon={createCollectorIcon(collector.rating)}
                  eventHandlers={{
                    click: () => setSelectedCollector(collector)
                  }}
                >
                  <Popup>
                    <div className="popup-content">
                      <h4>♻️ {collector.name}</h4>
                      <p><strong>Owner:</strong> {collector.owner}</p>
                      <p><strong>Rating:</strong> ⭐ {collector.stars} ({collector.reviewCount} reviews)</p>
                      <p><strong>Specialties:</strong> {collector.specialties.slice(0, 2).join(', ')}</p>
                      <p><strong>Price Range:</strong> {collector.priceRange}</p>
                      <p><strong>Distance:</strong> {calculateDistance(userLocation, collector.location)} km</p>
                      <div className="popup-buttons">
                        <button className="detail-btn call" onClick={() => handleCall(collector.phone)}>📞 Call</button>
                        <button className="detail-btn message" onClick={() => handleWhatsApp(collector.phone, collector.name)}>💬 WhatsApp</button>
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
              <span className="legend-marker collector">♻️</span>
              <span>Scrap Collectors</span>
            </div>
            <div className="legend-item">
              <span className="legend-color excellent"></span>
              <span>Excellent (4.5+)</span>
            </div>
            <div className="legend-item">
              <span className="legend-color good"></span>
              <span>Good (4.0+)</span>
            </div>
          </div>
        </div>

        {/* Collectors List */}
        <div className="collectors-panel">
          {selectedCollector ? (
            <div className="collector-details">
              <div className="detail-header">
                <h3>♻️ {selectedCollector.name}</h3>
                <div className="header-actions">
                  <span className={`status-badge ${selectedCollector.rating}`}>
                    {selectedCollector.rating}
                  </span>
                  {selectedCollector.verified && (
                    <span className="verified-badge">✅ Verified</span>
                  )}
                </div>
              </div>

              <div className="collector-info-grid">
                <div className="info-item">
                  <span className="info-label">👨‍💼 Owner:</span>
                  <span className="info-value">{selectedCollector.owner}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">⭐ Rating:</span>
                  <span className="info-value">{selectedCollector.stars}/5 ({selectedCollector.reviewCount} reviews)</span>
                </div>
                <div className="info-item">
                  <span className="info-label">📞 Phone:</span>
                  <span className="info-value">{selectedCollector.phone}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">📧 Email:</span>
                  <span className="info-value">{selectedCollector.email}</span>
                </div>
                <div className="info-item full-width">
                  <span className="info-label">📍 Address:</span>
                  <span className="info-value">{selectedCollector.address}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">💰 Price Range:</span>
                  <span className="info-value">{selectedCollector.priceRange}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">📏 Distance:</span>
                  <span className="info-value">{calculateDistance(userLocation, selectedCollector.location)} km</span>
                </div>
                <div className="info-item">
                  <span className="info-label">🕐 Hours:</span>
                  <span className="info-value">{selectedCollector.openHours}</span>
                </div>
                <div className="info-item">
                  <span className="info-label">📅 Days:</span>
                  <span className="info-value">{selectedCollector.workingDays}</span>
                </div>
              </div>

              <div className="specialties-section">
                <h4>🔧 Specialties</h4>
                <div className="specialties-tags">
                  {selectedCollector.specialties.map(specialty => (
                    <span key={specialty} className="specialty-tag">{specialty}</span>
                  ))}
                </div>
              </div>

              <div className="services-section">
                <h4>🛠️ Services</h4>
                <div className="services-list">
                  {selectedCollector.services.map(service => (
                    <div key={service} className="service-item">
                      <span className="service-icon">✅</span>
                      <span>{service}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="description-section">
                <h4>ℹ️ About</h4>
                <p>{selectedCollector.description}</p>
              </div>

              <div className="business-info">
                <div className="business-stat">
                  <span className="stat-label">Experience:</span>
                  <span className="stat-value">{selectedCollector.experience}</span>
                </div>
                <div className="business-stat">
                  <span className="stat-label">Monthly Capacity:</span>
                  <span className="stat-value">{selectedCollector.monthlyCapacity}</span>
                </div>
                <div className="business-stat">
                  <span className="stat-label">Last Active:</span>
                  <span className="stat-value">{selectedCollector.lastActive}</span>
                </div>
              </div>

              <div className="action-buttons">
                <button 
                  className="detail-btn call" 
                  onClick={() => handleCall(selectedCollector.phone)}
                >
                  📞 Call Now
                </button>
                <button 
                  className="detail-btn message" 
                  onClick={() => handleWhatsApp(selectedCollector.phone, selectedCollector.name)}
                >
                  💬 WhatsApp
                </button>
                <button className="detail-btn direction">🗺️ Get Directions</button>
              </div>
            </div>
          ) : (
            <div className="collectors-list">
              <h3>♻️ Nearby Collectors ({getFilteredCollectors().length})</h3>
              
              {getFilteredCollectors().map(collector => (
                <div 
                  key={collector.id} 
                  className={`collector-item ${collector.rating}`}
                  onClick={() => setSelectedCollector(collector)}
                >
                  <div className="collector-header">
                    <div className="collector-info">
                      <h4>{collector.name}</h4>
                      <div className="collector-meta">
                        <span className="rating">⭐ {collector.stars}</span>
                        <span className="distance">{calculateDistance(userLocation, collector.location)} km</span>
                        {collector.verified && <span className="verified">✅</span>}
                      </div>
                    </div>
                    <div className="price-range">{collector.priceRange}</div>
                  </div>
                  
                  <div className="collector-details-preview">
                    <div className="specialties-preview">
                      {collector.specialties.slice(0, 3).map(specialty => (
                        <span key={specialty} className="specialty-chip">{specialty}</span>
                      ))}
                    </div>
                    <div className="collector-status">
                      <span className="owner">👨‍💼 {collector.owner}</span>
                      <span className="hours">🕐 {collector.openHours}</span>
                    </div>
                  </div>
                  
                  <div className="quick-actions">
                    <button 
                      className="quick-btn call" 
                      onClick={(e) => { e.stopPropagation(); handleCall(collector.phone); }}
                    >
                      📞
                    </button>
                    <button 
                      className="quick-btn message" 
                      onClick={(e) => { e.stopPropagation(); handleWhatsApp(collector.phone, collector.name); }}
                    >
                      💬
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ScrapCollector;