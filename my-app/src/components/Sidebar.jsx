import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.css';

function Sidebar({ userType, menuItems }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const getUserTypeColor = () => {
    switch (userType) {
      case 'citizen': return 'var(--primary-green)';
      case 'worker': return '#2196F3';
      case 'admin': return '#FF9800';
      default: return 'var(--primary-green)';
    }
  };

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🌱</span>
          {!isCollapsed && <h2>Sankalp Green</h2>}
        </div>
        <button className="collapse-btn" onClick={toggleSidebar}>
          {isCollapsed ? '→' : '←'}
        </button>
      </div>

      <div className="user-badge" style={{ backgroundColor: getUserTypeColor() }}>
        <span className="user-icon">
          {userType === 'citizen' && '👤'}
          {userType === 'worker' && '👷'}
          {userType === 'admin' && '⚙️'}
        </span>
        {!isCollapsed && <span className="user-type">{userType.charAt(0).toUpperCase() + userType.slice(1)}</span>}
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item, index) => (
          <Link 
            key={index}
            to={item.path} 
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            title={isCollapsed ? item.label : ''}
          >
            <span className="nav-icon">{item.icon}</span>
            {!isCollapsed && <span className="nav-label">{item.label}</span>}
          </Link>
        ))}
      </nav>

      <div className="sidebar-footer">
        <Link to="/" className="nav-item">
          <span className="nav-icon">🏠</span>
          {!isCollapsed && <span className="nav-label">Back to Home</span>}
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;