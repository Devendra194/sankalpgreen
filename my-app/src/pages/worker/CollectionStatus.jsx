import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import './WorkerDashboard.css';

const workerMenuItems = [
  { path: '/worker', icon: '🏠', label: 'Home' },
  { path: '/worker/route', icon: '🗺️', label: 'Today\'s Route' },
  { path: '/worker/collection', icon: '🗑️', label: 'Collection Status' },
  { path: '/worker/training', icon: '🎓', label: 'Safety & Training' },
  { path: '/worker/performance', icon: '📊', label: 'Performance' },
  { path: '/worker/profile', icon: '👤', label: 'Profile' },
];

function CollectionStatus() {
  const [selectedStop, setSelectedStop] = useState(null);

  const stops = [
    { id: 1, name: 'Gandhi Street Block A', status: 'completed', type: 'Mixed', weight: '45kg', time: '6:30 AM' },
    { id: 2, name: 'Park Lane Apartments', status: 'completed', type: 'Organic', weight: '32kg', time: '7:00 AM' },
    { id: 3, name: 'Market Square East', status: 'completed', type: 'Recyclable', weight: '28kg', time: '7:30 AM' },
    { id: 4, name: 'School Street', status: 'completed', type: 'Mixed', weight: '52kg', time: '8:00 AM' },
    { id: 5, name: 'Hospital Road', status: 'completed', type: 'Hazardous', weight: '15kg', time: '8:30 AM' },
    { id: 6, name: 'Shopping Complex', status: 'completed', type: 'Mixed', weight: '78kg', time: '9:00 AM' },
    { id: 7, name: 'Residential Area A', status: 'completed', type: 'Organic', weight: '41kg', time: '9:30 AM' },
    { id: 8, name: 'Tech Park', status: 'completed', type: 'Recyclable', weight: '35kg', time: '10:00 AM' },
    { id: 9, name: 'Central Plaza', status: 'completed', type: 'Mixed', weight: '67kg', time: '10:30 AM' },
    { id: 10, name: 'Bus Terminal', status: 'completed', type: 'Mixed', weight: '89kg', time: '11:00 AM' },
    { id: 11, name: 'Railway Station', status: 'completed', type: 'Mixed', weight: '95kg', time: '11:30 AM' },
    { id: 12, name: 'Gandhi Street Block B', status: 'completed', type: 'Mixed', weight: '43kg', time: '12:00 PM' },
    { id: 13, name: 'Park Avenue Complex', status: 'current', type: 'Recyclable', weight: null, time: 'Now' },
    { id: 14, name: 'Market Square West', status: 'pending', type: 'Mixed + Organic', weight: null, time: 'ETA 12:30' },
    { id: 15, name: 'Residential Area B', status: 'pending', type: 'Organic', weight: null, time: 'ETA 1:00' },
    { id: 16, name: 'Industrial Zone', status: 'pending', type: 'Hazardous', weight: null, time: 'ETA 1:30' },
    { id: 17, name: 'City Center', status: 'pending', type: 'Mixed', weight: null, time: 'ETA 2:00' },
    { id: 18, name: 'Depot Return', status: 'pending', type: 'Drop-off', weight: null, time: 'ETA 2:30' }
  ];

  const handleStatusUpdate = (stopId, newStatus, notes = '') => {
    // Handle status update logic
    alert(`Stop ${stopId} marked as ${newStatus}${notes ? ` with notes: ${notes}` : ''}`);
    setSelectedStop(null);
  };

  return (
    <DashboardLayout userType="worker" menuItems={workerMenuItems}>
      <div className="page-header">
        <h1 className="page-title">🗑️ Collection Status</h1>
        <p className="page-subtitle">Mark collection status for each stop on your route</p>
      </div>

      {/* Progress Summary */}
      <div className="stats-grid">
        <div className="stat-card worker-primary">
          <h3>✅ Completed</h3>
          <div className="stat-value">12</div>
          <div className="stat-trend">of 18 stops</div>
        </div>
        <div className="stat-card">
          <h3>📍 Current Stop</h3>
          <div className="stat-value">13</div>
          <div className="stat-trend">Park Avenue Complex</div>
        </div>
        <div className="stat-card">
          <h3>⚖️ Total Collected</h3>
          <div className="stat-value">620kg</div>
          <div className="stat-trend">Target: 800kg</div>
        </div>
        <div className="stat-card">
          <h3>⏰ On Schedule</h3>
          <div className="stat-value">+5 min</div>
          <div className="stat-trend">Slightly ahead</div>
        </div>
      </div>

      <div className="content-grid collection-layout">
        <div className="content-card stops-list-card">
          <h3>📍 Route Stops</h3>
          <div className="stops-container">
            {stops.map((stop) => (
              <div 
                key={stop.id} 
                className={`stop-card ${stop.status} ${selectedStop?.id === stop.id ? 'selected' : ''}`}
                onClick={() => stop.status !== 'completed' && setSelectedStop(stop)}
              >
                <div className="stop-header">
                  <span className="stop-id">#{stop.id}</span>
                  <span className={`status-badge ${stop.status}`}>
                    {stop.status === 'completed' && '✅'}
                    {stop.status === 'current' && '🔄'}
                    {stop.status === 'pending' && '⏳'}
                    {stop.status === 'overflow' && '⚠️'}
                    {stop.status === 'maintenance' && '🔧'}
                  </span>
                </div>
                <h4 className="stop-name">{stop.name}</h4>
                <div className="stop-info">
                  <span className="waste-type">{stop.type}</span>
                  <span className="stop-time">{stop.time}</span>
                </div>
                {stop.weight && (
                  <div className="weight-info">⚖️ {stop.weight}</div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="content-card action-panel">
          {selectedStop ? (
            <div className="stop-actions">
              <h3>📍 {selectedStop.name}</h3>
              <div className="stop-details-panel">
                <div className="detail-item">
                  <strong>Stop ID:</strong> #{selectedStop.id}
                </div>
                <div className="detail-item">
                  <strong>Waste Type:</strong> {selectedStop.type}
                </div>
                <div className="detail-item">
                  <strong>Scheduled Time:</strong> {selectedStop.time}
                </div>
                <div className="detail-item">
                  <strong>Current Status:</strong> 
                  <span className={`status-text ${selectedStop.status}`}>
                    {selectedStop.status.charAt(0).toUpperCase() + selectedStop.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="status-actions">
                <h4>Update Status</h4>
                <div className="action-grid">
                  <button 
                    className="status-btn collected"
                    onClick={() => handleStatusUpdate(selectedStop.id, 'collected')}
                  >
                    ✅ Collected
                  </button>
                  <button 
                    className="status-btn overflow"
                    onClick={() => handleStatusUpdate(selectedStop.id, 'overflow')}
                  >
                    ⚠️ Overflow
                  </button>
                  <button 
                    className="status-btn maintenance"
                    onClick={() => handleStatusUpdate(selectedStop.id, 'maintenance')}
                  >
                    🔧 Maintenance Needed
                  </button>
                  <button 
                    className="status-btn skip"
                    onClick={() => handleStatusUpdate(selectedStop.id, 'skipped')}
                  >
                    ⏭️ Skip Stop
                  </button>
                </div>
              </div>

              <div className="weight-input">
                <h4>Record Weight</h4>
                <div className="weight-controls">
                  <input 
                    type="number" 
                    placeholder="Weight in kg" 
                    className="weight-field"
                  />
                  <button className="weight-btn">⚖️ Record</button>
                </div>
              </div>

              <div className="notes-section">
                <h4>Add Notes</h4>
                <textarea 
                  placeholder="Any issues, observations, or special notes..."
                  className="notes-field"
                  rows="3"
                />
                <button className="notes-btn">📝 Save Notes</button>
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <h3>📋 Collection Management</h3>
              <div className="instruction-panel">
                <div className="instruction-item">
                  <span className="instruction-icon">👆</span>
                  <p>Click on any pending stop to update its status</p>
                </div>
                <div className="instruction-item">
                  <span className="instruction-icon">✅</span>
                  <p>Mark stops as collected, overflow, or maintenance needed</p>
                </div>
                <div className="instruction-item">
                  <span className="instruction-icon">⚖️</span>
                  <p>Record waste weight for performance tracking</p>
                </div>
                <div className="instruction-item">
                  <span className="instruction-icon">📝</span>
                  <p>Add notes for special conditions or issues</p>
                </div>
              </div>

              <div className="summary-stats">
                <h4>📊 Today's Summary</h4>
                <div className="summary-grid">
                  <div className="summary-item">
                    <span className="summary-number">620kg</span>
                    <span className="summary-label">Total Collected</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-number">12</span>
                    <span className="summary-label">Stops Completed</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-number">0</span>
                    <span className="summary-label">Overflow Issues</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-number">67%</span>
                    <span className="summary-label">Route Progress</span>
                  </div>
                </div>
              </div>

              <div className="quick-actions-panel">
                <h4>⚡ Quick Actions</h4>
                <button className="quick-action report">📱 Report Emergency</button>
                <button className="quick-action fuel">⛽ Request Fuel</button>
                <button className="quick-action supervisor">📞 Call Supervisor</button>
                <button className="quick-action break">☕ Break Request</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CollectionStatus;