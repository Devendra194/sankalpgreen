import DashboardLayout from '../../components/DashboardLayout';
import './AdminDashboard.css';

const adminMenuItems = [
  { path: '/admin', icon: '🏠', label: 'Dashboard' },
  { path: '/admin/analytics', icon: '📊', label: 'Analytics & Heatmaps' },
  { path: '/admin/complaints', icon: '📋', label: 'Complaints Tracker' },
  { path: '/admin/training', icon: '🎓', label: 'Training Status' },
  { path: '/admin/forecasts', icon: '📈', label: 'Waste Forecasts' },
  { path: '/admin/infrastructure', icon: '🏗️', label: 'Infrastructure' },
  { path: '/admin/workers', icon: '👥', label: 'Manage Workers' },
  { path: '/admin/reports', icon: '📄', label: 'Reports & Exports' },
  { path: '/admin/profile', icon: '👤', label: 'Profile' },
];

function AdminHome() {
  return (
    <DashboardLayout userType="admin" menuItems={adminMenuItems}>
      <div className="page-header">
        <h1 className="page-title">⚙️ Admin Dashboard</h1>
        <div className="admin-actions">
          <button className="action-btn export">📊 Export Report</button>
          <button className="action-btn alert">🚨 Send Alert</button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="stats-grid">
        <div className="stat-card admin-primary">
          <h3>🏘️ Total Wards</h3>
          <div className="stat-value">24</div>
          <div className="stat-trend">95% operational</div>
        </div>
        <div className="stat-card">
          <h3>👥 Active Workers</h3>
          <div className="stat-value">156</div>
          <div className="stat-trend">98% attendance</div>
        </div>
        <div className="stat-card">
          <h3>🗑️ Daily Collections</h3>
          <div className="stat-value">2,847</div>
          <div className="stat-trend">+12% vs yesterday</div>
        </div>
        <div className="stat-card">
          <h3>📋 Open Complaints</h3>
          <div className="stat-value">23</div>
          <div className="stat-trend">-8 from yesterday</div>
        </div>
      </div>

      <div className="content-grid admin-layout">
        <div className="content-card">
          <h3>🗺️ City-wide Heatmap</h3>
          <div className="heatmap-container">
            <div className="heatmap-visualization">
              <div className="ward-zone high-priority">
                <span className="zone-label">Zone A</span>
                <div className="zone-stats">
                  <span className="collection-rate">78%</span>
                  <span className="status-indicator high">⚠️ High Priority</span>
                </div>
              </div>
              <div className="ward-zone medium-priority">
                <span className="zone-label">Zone B</span>
                <div className="zone-stats">
                  <span className="collection-rate">85%</span>
                  <span className="status-indicator medium">🟡 Medium</span>
                </div>
              </div>
              <div className="ward-zone low-priority">
                <span className="zone-label">Zone C</span>
                <div className="zone-stats">
                  <span className="collection-rate">92%</span>
                  <span className="status-indicator low">✅ Good</span>
                </div>
              </div>
              <div className="ward-zone medium-priority">
                <span className="zone-label">Zone D</span>
                <div className="zone-stats">
                  <span className="collection-rate">88%</span>
                  <span className="status-indicator medium">🟡 Medium</span>
                </div>
              </div>
            </div>
            
            <div className="heatmap-legend">
              <h4>Collection Efficiency</h4>
              <div className="legend-items">
                <div className="legend-item">
                  <span className="legend-color high"></span>
                  <span>Below 80% - High Priority</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color medium"></span>
                  <span>80-90% - Medium</span>
                </div>
                <div className="legend-item">
                  <span className="legend-color low"></span>
                  <span>Above 90% - Good</span>
                </div>
              </div>
            </div>
          </div>

          <div className="performance-metrics">
            <h4>📊 Today's Performance</h4>
            <div className="metrics-grid">
              <div className="metric-item">
                <span className="metric-value">89.4%</span>
                <span className="metric-label">Avg Collection Rate</span>
              </div>
              <div className="metric-item">
                <span className="metric-value">2.3 hrs</span>
                <span className="metric-label">Avg Response Time</span>
              </div>
              <div className="metric-item">
                <span className="metric-value">847 kg</span>
                <span className="metric-label">Waste Processed</span>
              </div>
            </div>
          </div>
        </div>

        <div className="content-card">
          <h3>🚨 Priority Alerts</h3>
          <div className="alerts-list">
            <div className="admin-alert critical">
              <div className="alert-header">
                <span className="alert-icon">🔴</span>
                <span className="alert-priority">Critical</span>
                <span className="alert-time">10 min ago</span>
              </div>
              <h5>Vehicle Breakdown - Zone A</h5>
              <p>Truck #GJ-07-AB-1234 reported mechanical failure. Route coverage affected.</p>
              <div className="alert-actions">
                <button className="alert-btn assign">👥 Assign Backup</button>
                <button className="alert-btn dismiss">✅ Dismiss</button>
              </div>
            </div>

            <div className="admin-alert high">
              <div className="alert-header">
                <span className="alert-icon">🟠</span>
                <span className="alert-priority">High</span>
                <span className="alert-time">25 min ago</span>
              </div>
              <h5>Multiple Overflow Reports</h5>
              <p>5+ overflow complaints in Gandhi Nagar area. Immediate attention required.</p>
              <div className="alert-actions">
                <button className="alert-btn dispatch">🚛 Dispatch Team</button>
                <button className="alert-btn view">👁️ View Details</button>
              </div>
            </div>

            <div className="admin-alert medium">
              <div className="alert-header">
                <span className="alert-icon">🟡</span>
                <span className="alert-priority">Medium</span>
                <span className="alert-time">1 hr ago</span>
              </div>
              <h5>Worker Training Due</h5>
              <p>12 workers have pending safety training renewals this week.</p>
              <div className="alert-actions">
                <button className="alert-btn schedule">📅 Schedule</button>
                <button className="alert-btn notify">📱 Notify</button>
              </div>
            </div>
          </div>

          <div className="recent-activities">
            <h4>📈 Recent Activities</h4>
            <div className="activity-feed">
              <div className="activity-item">
                <span className="activity-icon">✅</span>
                <div className="activity-details">
                  <p>Route A-7 completed successfully</p>
                  <small>2 hours ago • Zone A</small>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-icon">👥</span>
                <div className="activity-details">
                  <p>New worker onboarded - Amit Sharma</p>
                  <small>3 hours ago • HR Department</small>
                </div>
              </div>
              <div className="activity-item">
                <span className="activity-icon">🏆</span>
                <div className="activity-details">
                  <p>Zone C achieved 95% efficiency milestone</p>
                  <small>5 hours ago • Performance Metrics</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Management Overview */}
      <div className="management-overview">
        <div className="overview-card">
          <h3>👥 Workforce Management</h3>
          <div className="workforce-stats">
            <div className="workforce-item">
              <span className="workforce-number">156</span>
              <span className="workforce-label">Total Workers</span>
              <span className="workforce-trend">+3 this month</span>
            </div>
            <div className="workforce-item">
              <span className="workforce-number">24</span>
              <span className="workforce-label">Team Leaders</span>
              <span className="workforce-trend">All zones covered</span>
            </div>
            <div className="workforce-item">
              <span className="workforce-number">98.2%</span>
              <span className="workforce-label">Attendance Rate</span>
              <span className="workforce-trend">Above target</span>
            </div>
          </div>
          <div className="management-actions">
            <button className="mgmt-btn">📊 View Details</button>
            <button className="mgmt-btn">📅 Schedule Training</button>
          </div>
        </div>

        <div className="overview-card">
          <h3>📊 Performance Analytics</h3>
          <div className="performance-chart">
            <div className="chart-placeholder">
              <div className="chart-bars">
                <div className="bar" style={{ height: '60%' }}><span>Mon</span></div>
                <div className="bar" style={{ height: '75%' }}><span>Tue</span></div>
                <div className="bar active" style={{ height: '85%' }}><span>Wed</span></div>
                <div className="bar" style={{ height: '70%' }}><span>Thu</span></div>
                <div className="bar" style={{ height: '90%' }}><span>Fri</span></div>
                <div className="bar" style={{ height: '65%' }}><span>Sat</span></div>
                <div className="bar" style={{ height: '55%' }}><span>Sun</span></div>
              </div>
              <div className="chart-title">Weekly Collection Efficiency</div>
            </div>
          </div>
          <div class="performance-summary">
            <p><strong>This Week:</strong> 84.2% average efficiency</p>
            <p><strong>Target:</strong> 85% (98.1% achieved)</p>
            <p><strong>Best Day:</strong> Friday (90% efficiency)</p>
          </div>
        </div>

        <div className="overview-card">
          <h3>🎓 Training & Compliance</h3>
          <div className="training-overview">
            <div className="training-stat">
              <span className="stat-number">142</span>
              <span className="stat-description">Workers Certified</span>
              <div className="progress-mini">
                <div className="progress-fill-mini" style={{ width: '91%' }}></div>
              </div>
            </div>
            <div className="training-stat">
              <span className="stat-number">12</span>
              <span className="stat-description">Pending Renewals</span>
              <div className="progress-mini warning">
                <div className="progress-fill-mini" style={{ width: '75%' }}></div>
              </div>
            </div>
          </div>
          <div className="training-actions">
            <button className="training-btn priority">🎯 Schedule Priority Training</button>
            <button className="training-btn">📋 View All Status</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default AdminHome;