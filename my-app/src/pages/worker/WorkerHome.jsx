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

function WorkerHome() {
  return (
    <DashboardLayout userType="worker" menuItems={workerMenuItems}>
      <div className="page-header">
        <h1 className="page-title">👷 Worker Dashboard</h1>
        <div className="worker-actions">
          <button className="action-btn start-shift">🚀 Start Shift</button>
          <button className="action-btn emergency">🚨 Emergency</button>
        </div>
      </div>

      {/* Shift Overview */}
      <div className="stats-grid">
        <div className="stat-card worker-primary">
          <h3>📍 Current Route</h3>
          <div className="stat-value">Zone A-7</div>
          <div className="stat-trend">12/18 stops completed</div>
        </div>
        <div className="stat-card">
          <h3>⏱️ Shift Progress</h3>
          <div className="stat-value">67%</div>
          <div className="stat-trend">5h 20m elapsed</div>
        </div>
        <div className="stat-card">
          <h3>🗑️ Collections Today</h3>
          <div className="stat-value">147</div>
          <div className="stat-trend">Target: 180</div>
        </div>
        <div className="stat-card">
          <h3>⭐ Performance Score</h3>
          <div className="stat-value">92%</div>
          <div className="stat-trend">+3% this week</div>
        </div>
      </div>

      <div className="content-grid">
        <div className="content-card">
          <h3>🗺️ Today's Route Overview</h3>
          <div className="route-summary">
            <div className="route-info">
              <div className="route-detail">
                <h4>🚛 Vehicle</h4>
                <p>Truck #GJ-07-AB-1234</p>
              </div>
              <div className="route-detail">
                <h4>👥 Team</h4>
                <p>Raj Kumar (Driver) + You</p>
              </div>
              <div className="route-detail">
                <h4>📍 Zone</h4>
                <p>Sector A-7 (Gandhi Nagar)</p>
              </div>
              <div className="route-detail">
                <h4>⏰ Shift Time</h4>
                <p>6:00 AM - 2:00 PM</p>
              </div>
            </div>
          </div>

          <div className="route-progress">
            <h4>📊 Route Progress</h4>
            <div className="progress-bar-container">
              <div className="progress-bar">
                <div className="progress-fill worker-progress" style={{ width: '67%' }}></div>
              </div>
              <span className="progress-text">12 of 18 stops completed (67%)</span>
            </div>
          </div>

          <div className="next-stops">
            <h4>📍 Next 3 Stops</h4>
            <div className="stop-list">
              <div className="stop-item next">
                <span className="stop-number">13</span>
                <div className="stop-details">
                  <h5>Gandhi Street Block B</h5>
                  <p>🗑️ Mixed Waste • ⏰ ETA: 11:30 AM</p>
                </div>
                <span className="stop-status next-stop">Next</span>
              </div>
              <div className="stop-item">
                <span className="stop-number">14</span>
                <div className="stop-details">
                  <h5>Park Avenue Complex</h5>
                  <p>♻️ Recyclables • ⏰ ETA: 12:00 PM</p>
                </div>
                <span className="stop-status pending">Pending</span>
              </div>
              <div className="stop-item">
                <span className="stop-number">15</span>
                <div className="stop-details">
                  <h5>Market Square</h5>
                  <p>🗑️ Mixed + 🟢 Organic • ⏰ ETA: 12:30 PM</p>
                </div>
                <span className="stop-status pending">Pending</span>
              </div>
            </div>
          </div>
        </div>

        <div className="content-card">
          <h3>📋 Today's Tasks</h3>
          <div className="task-list">
            <div className="task-item completed">
              <span className="task-icon">✅</span>
              <div className="task-details">
                <h5>Pre-shift Vehicle Check</h5>
                <small>Completed at 5:45 AM</small>
              </div>
            </div>
            <div className="task-item completed">
              <span className="task-icon">✅</span>
              <div className="task-details">
                <h5>Safety Equipment Verification</h5>
                <small>Completed at 5:50 AM</small>
              </div>
            </div>
            <div className="task-item active">
              <span className="task-icon">🔄</span>
              <div className="task-details">
                <h5>Collection Route A-7</h5>
                <small>In Progress - 67% complete</small>
              </div>
            </div>
            <div className="task-item pending">
              <span className="task-icon">⏳</span>
              <div className="task-details">
                <h5>Post-shift Report</h5>
                <small>Pending completion</small>
              </div>
            </div>
          </div>

          <div className="alerts-section">
            <h4>🚨 Alerts & Notifications</h4>
            <div className="alert-item priority">
              <span className="alert-icon">⚠️</span>
              <div className="alert-content">
                <p><strong>Overflow Reported</strong></p>
                <small>Gandhi Street Block A - Reported 30 min ago</small>
              </div>
            </div>
            <div className="alert-item info">
              <span className="alert-icon">ℹ️</span>
              <div className="alert-content">
                <p><strong>Route Optimization</strong></p>
                <small>New route suggested for Market Square area</small>
              </div>
            </div>
          </div>

          <div className="quick-actions">
            <h4>⚡ Quick Actions</h4>
            <div className="action-buttons">
              <button className="quick-action-btn">📱 Report Issue</button>
              <button className="quick-action-btn">⛽ Fuel Request</button>
              <button className="quick-action-btn">🔧 Maintenance</button>
              <button className="quick-action-btn">📞 Contact Supervisor</button>
            </div>
          </div>
        </div>
      </div>

      {/* Weather & Safety Info */}
      <div className="content-card">
        <h3>🌤️ Today's Conditions</h3>
        <div className="conditions-grid">
          <div className="condition-item">
            <span className="condition-icon">🌡️</span>
            <div className="condition-details">
              <h5>Temperature</h5>
              <p>28°C - Pleasant</p>
            </div>
          </div>
          <div className="condition-item">
            <span className="condition-icon">☁️</span>
            <div className="condition-details">
              <h5>Weather</h5>
              <p>Partly Cloudy</p>
            </div>
          </div>
          <div className="condition-item">
            <span className="condition-icon">💧</span>
            <div className="condition-details">
              <h5>Humidity</h5>
              <p>65% - Moderate</p>
            </div>
          </div>
          <div className="condition-item">
            <span className="condition-icon">🌬️</span>
            <div className="condition-details">
              <h5>Air Quality</h5>
              <p>Good (AQI: 85)</p>
            </div>
          </div>
        </div>
        
        <div className="safety-reminder">
          <h4>🦺 Safety Reminder</h4>
          <div className="safety-tips">
            <p>• Wear safety vest and gloves at all times</p>
            <p>• Maintain social distancing during collections</p>
            <p>• Stay hydrated - temperature is rising</p>
            <p>• Report any hazardous materials immediately</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default WorkerHome;