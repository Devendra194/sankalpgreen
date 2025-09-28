import DashboardLayout from '../../components/DashboardLayout';
import './CitizenDashboard.css';

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

function CollectionSchedule() {
  return (
    <DashboardLayout userType="citizen" menuItems={citizenMenuItems}>
      <div className="page-header">
        <h1 className="page-title">📅 Collection Schedule</h1>
        <p className="page-subtitle">Track waste collection schedules and truck locations in your area</p>
      </div>

      {/* Current Status */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>🚛 Next Collection</h3>
          <div className="stat-value">Tomorrow</div>
          <div className="stat-trend">10:30 AM - 11:00 AM</div>
        </div>
        <div className="stat-card">
          <h3>📍 Truck Status</h3>
          <div className="stat-value">En Route</div>
          <div className="stat-trend">ETA: 25 minutes</div>
        </div>
        <div className="stat-card">
          <h3>♻️ Collection Type</h3>
          <div className="stat-value">Mixed</div>
          <div className="stat-trend">+ Recyclables</div>
        </div>
        <div className="stat-card">
          <h3>🎯 Success Rate</h3>
          <div className="stat-value">94%</div>
          <div className="stat-trend">Last 30 collections</div>
        </div>
      </div>

      <div className="content-grid">
        <div className="content-card">
          <h3>🗓️ Weekly Schedule</h3>
          <div className="schedule-calendar">
            <div className="schedule-day">
              <div className="day-header">
                <h4>Monday</h4>
                <span className="date">Mar 11</span>
              </div>
              <div className="collection-types">
                <span className="collection-tag organic">🟢 Organic</span>
                <span className="collection-tag recyclable">🔵 Recyclable</span>
              </div>
              <div className="time-slot">6:00 AM - 10:00 AM</div>
            </div>
            
            <div className="schedule-day">
              <div className="day-header">
                <h4>Tuesday</h4>
                <span className="date">Mar 12</span>
              </div>
              <div className="collection-types">
                <span className="collection-tag mixed">🟡 Mixed</span>
              </div>
              <div className="time-slot">8:00 AM - 12:00 PM</div>
            </div>

            <div className="schedule-day active">
              <div className="day-header">
                <h4>Wednesday</h4>
                <span className="date">Mar 13</span>
              </div>
              <div className="collection-types">
                <span className="collection-tag hazardous">🔴 Hazardous</span>
              </div>
              <div className="time-slot">10:00 AM - 2:00 PM</div>
              <div className="current-indicator">📍 Today</div>
            </div>

            <div className="schedule-day">
              <div className="day-header">
                <h4>Thursday</h4>
                <span className="date">Mar 14</span>
              </div>
              <div className="collection-types">
                <span className="collection-tag organic">🟢 Organic</span>
              </div>
              <div className="time-slot">7:00 AM - 11:00 AM</div>
            </div>

            <div className="schedule-day next">
              <div className="day-header">
                <h4>Friday</h4>
                <span className="date">Mar 15</span>
              </div>
              <div className="collection-types">
                <span className="collection-tag mixed">🟡 Mixed</span>
                <span className="collection-tag recyclable">🔵 Recyclable</span>
              </div>
              <div className="time-slot">8:30 AM - 12:30 PM</div>
              <div className="next-indicator">⏰ Next</div>
            </div>
          </div>

          <div className="preparation-tips">
            <h4>📝 Preparation Tips</h4>
            <div className="tip-list">
              <div className="prep-tip">
                <span className="tip-icon">🗑️</span>
                <p>Segregate waste properly according to type</p>
              </div>
              <div className="prep-tip">
                <span className="tip-icon">⏰</span>
                <p>Keep bins ready 30 minutes before collection time</p>
              </div>
              <div className="prep-tip">
                <span className="tip-icon">🚫</span>
                <p>No plastic bags for organic waste</p>
              </div>
            </div>
          </div>
        </div>

        <div className="content-card">
          <h3>🚛 Live Truck Tracking</h3>
          <div className="truck-tracker">
            <div className="truck-route">
              <div className="route-stop completed">
                <span className="stop-icon">✅</span>
                <div className="stop-details">
                  <h5>Gandhi Street</h5>
                  <small>Completed - 9:45 AM</small>
                </div>
              </div>
              <div className="route-stop completed">
                <span className="stop-icon">✅</span>
                <div className="stop-details">
                  <h5>Park Avenue</h5>
                  <small>Completed - 10:15 AM</small>
                </div>
              </div>
              <div className="route-stop current">
                <span className="stop-icon">🚛</span>
                <div className="stop-details">
                  <h5>MG Road</h5>
                  <small>In Progress - ETA 5 min</small>
                </div>
              </div>
              <div className="route-stop next">
                <span className="stop-icon">📍</span>
                <div className="stop-details">
                  <h5>Your Location</h5>
                  <small>Upcoming - ETA 25 min</small>
                </div>
              </div>
              <div className="route-stop pending">
                <span className="stop-icon">⏳</span>
                <div className="stop-details">
                  <h5>Market Square</h5>
                  <small>Pending - ETA 45 min</small>
                </div>
              </div>
            </div>
          </div>

          <div className="notification-settings">
            <h4>🔔 Notifications</h4>
            <div className="notification-toggles">
              <label className="toggle-option">
                <input type="checkbox" defaultChecked />
                <span className="toggle-text">SMS alerts</span>
              </label>
              <label className="toggle-option">
                <input type="checkbox" defaultChecked />
                <span className="toggle-text">15-min reminders</span>
              </label>
              <label className="toggle-option">
                <input type="checkbox" />
                <span className="toggle-text">Collection complete</span>
              </label>
            </div>
          </div>

          <div className="emergency-contact">
            <h4>🚨 Emergency Contact</h4>
            <div className="contact-info">
              <p><strong>Control Room:</strong> +91-9876543210</p>
              <p><strong>Supervisor:</strong> +91-9876543211</p>
              <button className="contact-btn">📞 Call Now</button>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CollectionSchedule;