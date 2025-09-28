import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';

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

function ReportProblem() {
  const [formData, setFormData] = useState({
    problemType: '',
    description: '',
    location: '',
    urgency: 'medium',
    photo: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    setFormData(prev => ({
      ...prev,
      photo: file
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Report submitted successfully! You earned 10 Green Points.');
    setFormData({
      problemType: '',
      description: '',
      location: '',
      urgency: 'medium',
      photo: null
    });
  };

  return (
    <DashboardLayout userType="citizen" menuItems={citizenMenuItems}>
      <div className="page-header">
        <h1 className="page-title">📋 Report a Problem</h1>
        <p className="page-subtitle">Help keep your community clean by reporting waste management issues</p>
      </div>

      <div className="content-grid">
        <div className="content-card">
          <h3>🚨 Submit New Report</h3>
          <form onSubmit={handleSubmit} className="report-form">
            <div className="form-group">
              <label>Problem Type</label>
              <select 
                name="problemType" 
                value={formData.problemType}
                onChange={handleInputChange}
                required
              >
                <option value="">Select problem type</option>
                <option value="overflowing-bin">🗑️ Overflowing Bin</option>
                <option value="missed-collection">📅 Missed Collection</option>
                <option value="illegal-dumping">🚫 Illegal Dumping</option>
                <option value="broken-bin">🔧 Broken Bin</option>
                <option value="road-blockage">🚧 Road Blockage</option>
                <option value="other">❓ Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea 
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe the problem in detail..."
                rows="4"
                required
              />
            </div>

            <div className="form-group">
              <label>📍 Location</label>
              <input 
                type="text"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                placeholder="Enter address or landmark"
                required
              />
              <button type="button" className="location-btn">📱 Use Current Location</button>
            </div>

            <div className="form-group">
              <label>📸 Upload Photo</label>
              <div className="photo-upload">
                <input 
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoUpload}
                  id="photo-upload"
                />
                <label htmlFor="photo-upload" className="upload-label">
                  {formData.photo ? '✅ Photo Selected' : '📷 Choose Photo'}
                </label>
                {formData.photo && <p className="photo-name">{formData.photo.name}</p>}
              </div>
            </div>

            <div className="form-group">
              <label>🚨 Urgency Level</label>
              <div className="urgency-options">
                <label className="radio-option">
                  <input 
                    type="radio" 
                    name="urgency" 
                    value="low"
                    checked={formData.urgency === 'low'}
                    onChange={handleInputChange}
                  />
                  <span className="urgency-low">🟢 Low</span>
                </label>
                <label className="radio-option">
                  <input 
                    type="radio" 
                    name="urgency" 
                    value="medium"
                    checked={formData.urgency === 'medium'}
                    onChange={handleInputChange}
                  />
                  <span className="urgency-medium">🟡 Medium</span>
                </label>
                <label className="radio-option">
                  <input 
                    type="radio" 
                    name="urgency" 
                    value="high"
                    checked={formData.urgency === 'high'}
                    onChange={handleInputChange}
                  />
                  <span className="urgency-high">🔴 High</span>
                </label>
              </div>
            </div>

            <button type="submit" className="submit-btn">
              📋 Submit Report (+10 Green Points)
            </button>
          </form>
        </div>

        <div className="content-card">
          <h3>📊 Your Reports</h3>
          <div className="reports-list">
            <div className="report-item">
              <div className="report-header">
                <span className="report-id">#1247</span>
                <span className="status-resolved">✅ Resolved</span>
              </div>
              <p className="report-desc">Overflowing bin at Park Street</p>
              <small className="report-date">Submitted: March 10, 2024</small>
            </div>
            <div className="report-item">
              <div className="report-header">
                <span className="report-id">#1239</span>
                <span className="status-in-progress">🔄 In Progress</span>
              </div>
              <p className="report-desc">Missed collection on Gandhi Road</p>
              <small className="report-date">Submitted: March 8, 2024</small>
            </div>
            <div className="report-item">
              <div className="report-header">
                <span className="report-id">#1235</span>
                <span className="status-resolved">✅ Resolved</span>
              </div>
              <p className="report-desc">Broken bin near bus stop</p>
              <small className="report-date">Submitted: March 5, 2024</small>
            </div>
          </div>

          <div className="rewards-info">
            <h4>🏆 Reporting Rewards</h4>
            <div className="reward-item">
              <span className="reward-icon">📋</span>
              <div className="reward-details">
                <p>Report Submission: +10 Points</p>
                <p>Photo Evidence: +5 Points</p>
                <p>Location Pin: +3 Points</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ReportProblem;