import { useState } from 'react';
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

function ComplaintsTracker() {
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [filterStatus, setFilterStatus] = useState('all');

  const complaints = [
    { id: 1247, type: 'Overflowing Bin', location: 'Gandhi Street Block A', citizen: 'Priya Sharma', priority: 'high', status: 'open', time: '30 min ago', assignedTo: 'Team A-7', description: 'Large commercial bin overflowing with mixed waste. Attracting flies and causing smell issues.' },
    { id: 1246, type: 'Missed Collection', location: 'Park Avenue Complex', citizen: 'Raj Kumar', priority: 'medium', status: 'in-progress', time: '2 hrs ago', assignedTo: 'Team B-3', description: 'Scheduled collection missed for organic waste bins. Residents complaining about accumulation.' },
    { id: 1245, type: 'Broken Bin', location: 'Market Square', citizen: 'Maya Patel', priority: 'low', status: 'resolved', time: '4 hrs ago', assignedTo: 'Maintenance Team', description: 'Recyclable waste bin damaged and needs replacement.' },
    { id: 1244, type: 'Illegal Dumping', location: 'Industrial Zone', citizen: 'Anonymous', priority: 'high', status: 'open', time: '6 hrs ago', assignedTo: null, description: 'Construction waste dumped in designated organic waste area. Immediate cleanup required.' },
    { id: 1243, type: 'Vehicle Issue', location: 'City Center', citizen: 'Worker Report', priority: 'critical', status: 'open', time: '8 hrs ago', assignedTo: 'Supervisor Team', description: 'Collection truck breakdown causing route delays and missed pickups.' },
    { id: 1242, type: 'Overflowing Bin', location: 'Residential Area B', citizen: 'Amit Shah', priority: 'medium', status: 'in-progress', time: '12 hrs ago', assignedTo: 'Team C-1', description: 'Multiple household bins overflowing in residential complex.' },
    { id: 1241, type: 'Safety Concern', location: 'Hospital Road', citizen: 'Dr. Singh', priority: 'high', status: 'open', time: '1 day ago', assignedTo: 'Safety Team', description: 'Medical waste mixing with regular waste. Potential health hazard.' },
    { id: 1240, type: 'Route Optimization', location: 'Tech Park Area', citizen: 'Facility Manager', priority: 'low', status: 'resolved', time: '1 day ago', assignedTo: 'Planning Team', description: 'Request for more frequent collection due to increased waste volume.' }
  ];

  const filteredComplaints = complaints.filter(complaint => {
    if (filterStatus === 'all') return true;
    return complaint.status === filterStatus;
  });

  const getStatusColor = (status) => {
    switch (status) {
      case 'open': return 'status-open';
      case 'in-progress': return 'status-progress';
      case 'resolved': return 'status-resolved';
      default: return '';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'critical': return 'priority-critical';
      case 'high': return 'priority-high';
      case 'medium': return 'priority-medium';
      case 'low': return 'priority-low';
      default: return '';
    }
  };

  const handleAssignTeam = (complaintId, team) => {
    alert(`Complaint #${complaintId} assigned to ${team}`);
    setSelectedComplaint(null);
  };

  const handleStatusUpdate = (complaintId, newStatus) => {
    alert(`Complaint #${complaintId} status updated to ${newStatus}`);
    setSelectedComplaint(null);
  };

  return (
    <DashboardLayout userType="admin" menuItems={adminMenuItems}>
      <div className="page-header">
        <h1 className="page-title">📋 Complaints Tracker</h1>
        <p className="page-subtitle">Monitor and manage all citizen and worker complaints</p>
      </div>

      {/* Summary Stats */}
      <div className="stats-grid">
        <div className="stat-card admin-primary">
          <h3>📊 Total Complaints</h3>
          <div className="stat-value">{complaints.length}</div>
          <div className="stat-trend">Last 7 days</div>
        </div>
        <div className="stat-card">
          <h3>🔴 Critical/High</h3>
          <div className="stat-value">{complaints.filter(c => c.priority === 'critical' || c.priority === 'high').length}</div>
          <div className="stat-trend">Need attention</div>
        </div>
        <div className="stat-card">
          <h3>⏳ Open</h3>
          <div className="stat-value">{complaints.filter(c => c.status === 'open').length}</div>
          <div className="stat-trend">Awaiting assignment</div>
        </div>
        <div className="stat-card">
          <h3>⚡ Avg Response</h3>
          <div className="stat-value">2.3 hrs</div>
          <div className="stat-trend">-15 min improvement</div>
        </div>
      </div>

      {/* Filters */}
      <div className="complaints-filters">
        <div className="filter-group">
          <label>Filter by Status:</label>
          <select 
            value={filterStatus} 
            onChange={(e) => setFilterStatus(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Complaints</option>
            <option value="open">Open</option>
            <option value="in-progress">In Progress</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
        <div className="quick-filters">
          <button className="quick-filter-btn critical">🔴 Critical</button>
          <button className="quick-filter-btn high">🟠 High Priority</button>
          <button className="quick-filter-btn unassigned">👥 Unassigned</button>
        </div>
      </div>

      <div className="content-grid complaints-layout">
        <div className="content-card complaints-list-card">
          <h3>📋 Complaints List</h3>
          <div className="complaints-container">
            {filteredComplaints.map((complaint) => (
              <div 
                key={complaint.id} 
                className={`complaint-card ${complaint.priority} ${selectedComplaint?.id === complaint.id ? 'selected' : ''}`}
                onClick={() => setSelectedComplaint(complaint)}
              >
                <div className="complaint-header">
                  <span className="complaint-id">#{complaint.id}</span>
                  <span className={`priority-badge ${getPriorityColor(complaint.priority)}`}>
                    {complaint.priority === 'critical' && '🔴'}
                    {complaint.priority === 'high' && '🟠'}
                    {complaint.priority === 'medium' && '🟡'}
                    {complaint.priority === 'low' && '🟢'}
                    {complaint.priority.charAt(0).toUpperCase() + complaint.priority.slice(1)}
                  </span>
                  <span className={`status-badge ${getStatusColor(complaint.status)}`}>
                    {complaint.status === 'open' && '🔴'}
                    {complaint.status === 'in-progress' && '🟡'}
                    {complaint.status === 'resolved' && '✅'}
                    {complaint.status.replace('-', ' ').charAt(0).toUpperCase() + complaint.status.replace('-', ' ').slice(1)}
                  </span>
                </div>
                
                <h4 className="complaint-type">{complaint.type}</h4>
                <div className="complaint-details">
                  <div className="detail-row">
                    <span className="detail-label">📍 Location:</span>
                    <span className="detail-value">{complaint.location}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">👤 Citizen:</span>
                    <span className="detail-value">{complaint.citizen}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">👥 Assigned:</span>
                    <span className="detail-value">{complaint.assignedTo || 'Unassigned'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">⏰ Time:</span>
                    <span className="detail-value">{complaint.time}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="content-card complaint-details-panel">
          {selectedComplaint ? (
            <div className="complaint-management">
              <h3>📋 Complaint #{selectedComplaint.id}</h3>
              
              <div className="complaint-info">
                <div className="info-section">
                  <h4>📊 Details</h4>
                  <div className="info-grid">
                    <div className="info-item">
                      <strong>Type:</strong> {selectedComplaint.type}
                    </div>
                    <div className="info-item">
                      <strong>Location:</strong> {selectedComplaint.location}
                    </div>
                    <div className="info-item">
                      <strong>Citizen:</strong> {selectedComplaint.citizen}
                    </div>
                    <div className="info-item">
                      <strong>Priority:</strong> 
                      <span className={`priority-text ${getPriorityColor(selectedComplaint.priority)}`}>
                        {selectedComplaint.priority.charAt(0).toUpperCase() + selectedComplaint.priority.slice(1)}
                      </span>
                    </div>
                    <div className="info-item">
                      <strong>Status:</strong> 
                      <span className={`status-text ${getStatusColor(selectedComplaint.status)}`}>
                        {selectedComplaint.status.replace('-', ' ').charAt(0).toUpperCase() + selectedComplaint.status.replace('-', ' ').slice(1)}
                      </span>
                    </div>
                    <div className="info-item">
                      <strong>Assigned To:</strong> {selectedComplaint.assignedTo || 'Unassigned'}
                    </div>
                  </div>
                </div>

                <div className="info-section">
                  <h4>📝 Description</h4>
                  <p className="complaint-description">{selectedComplaint.description}</p>
                </div>
              </div>

              <div className="management-actions">
                <div className="action-section">
                  <h4>👥 Assign Team</h4>
                  <div className="assign-buttons">
                    <button 
                      className="assign-btn team-a"
                      onClick={() => handleAssignTeam(selectedComplaint.id, 'Team A-7')}
                    >
                      👥 Team A-7
                    </button>
                    <button 
                      className="assign-btn team-b"
                      onClick={() => handleAssignTeam(selectedComplaint.id, 'Team B-3')}
                    >
                      👥 Team B-3
                    </button>
                    <button 
                      className="assign-btn maintenance"
                      onClick={() => handleAssignTeam(selectedComplaint.id, 'Maintenance Team')}
                    >
                      🔧 Maintenance
                    </button>
                    <button 
                      className="assign-btn supervisor"
                      onClick={() => handleAssignTeam(selectedComplaint.id, 'Supervisor Team')}
                    >
                      👮 Supervisor
                    </button>
                  </div>
                </div>

                <div className="action-section">
                  <h4>📊 Update Status</h4>
                  <div className="status-buttons">
                    <button 
                      className="status-update-btn in-progress"
                      onClick={() => handleStatusUpdate(selectedComplaint.id, 'in-progress')}
                    >
                      🔄 In Progress
                    </button>
                    <button 
                      className="status-update-btn resolved"
                      onClick={() => handleStatusUpdate(selectedComplaint.id, 'resolved')}
                    >
                      ✅ Resolved
                    </button>
                    <button 
                      className="status-update-btn escalate"
                      onClick={() => handleStatusUpdate(selectedComplaint.id, 'escalated')}
                    >
                      ⚠️ Escalate
                    </button>
                  </div>
                </div>

                <div className="action-section">
                  <h4>📱 Communications</h4>
                  <div className="communication-buttons">
                    <button className="comm-btn citizen">📞 Call Citizen</button>
                    <button className="comm-btn worker">📱 Notify Worker</button>
                    <button className="comm-btn supervisor">📧 Email Supervisor</button>
                  </div>
                </div>

                <div className="action-section">
                  <h4>📝 Add Notes</h4>
                  <textarea 
                    className="notes-textarea"
                    placeholder="Add internal notes, updates, or instructions..."
                    rows="3"
                  />
                  <button className="notes-save-btn">💾 Save Notes</button>
                </div>
              </div>
            </div>
          ) : (
            <div className="no-selection">
              <h3>📋 Complaint Management</h3>
              <div className="selection-instructions">
                <div className="instruction">
                  <span className="instruction-icon">👆</span>
                  <p>Select a complaint from the list to view details and take action</p>
                </div>
                <div className="instruction">
                  <span className="instruction-icon">👥</span>
                  <p>Assign teams to handle specific complaint types</p>
                </div>
                <div className="instruction">
                  <span className="instruction-icon">📊</span>
                  <p>Update status and track resolution progress</p>
                </div>
                <div className="instruction">
                  <span className="instruction-icon">📱</span>
                  <p>Communicate with citizens and workers directly</p>
                </div>
              </div>

              <div className="quick-stats">
                <h4>📊 Quick Overview</h4>
                <div className="overview-stats">
                  <div className="overview-stat">
                    <span className="stat-num">{complaints.filter(c => c.status === 'open').length}</span>
                    <span className="stat-desc">Open Complaints</span>
                  </div>
                  <div className="overview-stat">
                    <span className="stat-num">{complaints.filter(c => c.priority === 'critical' || c.priority === 'high').length}</span>
                    <span className="stat-desc">High Priority</span>
                  </div>
                  <div className="overview-stat">
                    <span className="stat-num">{complaints.filter(c => !c.assignedTo).length}</span>
                    <span className="stat-desc">Unassigned</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ComplaintsTracker;