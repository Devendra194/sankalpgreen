import { Link } from 'react-router-dom';
import DashboardLayout from '../../components/DashboardLayout';
import './CitizenDashboard.css';

const citizenMenuItems = [
  { path: '/citizen', icon: '🏠', label: 'Home' },
  { path: '/citizen/report', icon: '📋', label: 'Report Problem' },
  { path: '/citizen/schedule', icon: '📅', label: 'Collection Schedule' },
  { path: '/citizen/learning', icon: '🎓', label: 'Learning Hub' },
  { path: '/citizen/rewards', icon: '🏆', label: 'Rewards & Leaderboard' },
  { path: '/citizen/truck-tracker', icon: '🚛', label: 'Track Trucks' },
  { path: '/citizen/scrap-collector', icon: '♻️', label: 'Scrap Collectors' },
  { path: '/citizen/community', icon: '🤝', label: 'Community' },
  { path: '/citizen/profile', icon: '👤', label: 'Profile' },
];

function CitizenHome() {
  return (
    <DashboardLayout userType="citizen" menuItems={citizenMenuItems}>
      <div className="page-header">
        <h1 className="page-title">Welcome Back, Citizen! 🌱</h1>
        <div className="quick-actions">
          <button className="quick-btn report-btn">📋 Report Issue</button>
          <button className="quick-btn schedule-btn">📅 Check Schedule</button>
        </div>
      </div>

      {/* Green Points Overview */}
      <div className="stats-grid">
        <div className="stat-card green-points">
          <h3>Green Points Balance</h3>
          <div className="stat-value">1,247</div>
          <div className="stat-trend">+52 this week ⬆️</div>
        </div>
        <div className="stat-card">
          <h3>Reports Submitted</h3>
          <div className="stat-value">8</div>
          <div className="stat-trend">+2 this month</div>
        </div>
        <div className="stat-card">
          <h3>Training Completed</h3>
          <div className="stat-value">5/7</div>
          <div className="stat-trend">71% complete</div>
        </div>
        <div className="stat-card">
          <h3>Community Rank</h3>
          <div className="stat-value">#23</div>
          <div className="stat-trend">in your ward</div>
        </div>
      </div>

      <div className="content-grid">
        <div className="content-card">
          <h3>📊 Your Impact Dashboard</h3>
          <div className="impact-metrics">
            <div className="impact-item">
              <span className="impact-icon">♻️</span>
              <div className="impact-details">
                <h4>Waste Recycled</h4>
                <p>45.2 kg this month</p>
              </div>
            </div>
            <div className="impact-item">
              <span className="impact-icon">🌍</span>
              <div className="impact-details">
                <h4>CO₂ Saved</h4>
                <p>23.1 kg equivalent</p>
              </div>
            </div>
            <div className="impact-item">
              <span className="impact-icon">💰</span>
              <div className="impact-details">
                <h4>Money Earned</h4>
                <p>₹185 from recycling</p>
              </div>
            </div>
          </div>
          
          <div className="progress-section">
            <h4>Weekly Goal Progress</h4>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: '68%' }}></div>
            </div>
            <p>68% complete - 13.2 kg / 20 kg target</p>
          </div>
        </div>

        <div className="content-card">
          <h3>🚛 Next Collection</h3>
          <div className="collection-info">
            <div className="collection-date">
              <h4>Tomorrow</h4>
              <p>March 15, 2024</p>
            </div>
            <div className="collection-time">
              <h4>Expected Time</h4>
              <p>10:30 AM - 11:00 AM</p>
            </div>
            <div className="collection-type">
              <h4>Collection Type</h4>
              <p>🗂️ Mixed Waste & ♻️ Recyclables</p>
            </div>
          </div>
          <Link to="/citizen/truck-tracker" className="track-truck-btn">🚛 Track Trucks Live</Link>

          <div className="recent-activity">
            <h4>📈 Recent Activity</h4>
            <div className="activity-item">
              <span className="activity-icon">✅</span>
              <div className="activity-text">
                <p>Report #1247 resolved</p>
                <small>2 hours ago</small>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon">🎯</span>
              <div className="activity-text">
                <p>Completed Segregation Quiz</p>
                <small>Yesterday</small>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon">🏆</span>
              <div className="activity-text">
                <p>Earned 25 Green Points</p>
                <small>2 days ago</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default CitizenHome;