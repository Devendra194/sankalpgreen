import Sidebar from './Sidebar';
import './DashboardLayout.css';

function DashboardLayout({ userType, menuItems, children }) {
  return (
    <div className="dashboard-layout">
      <Sidebar userType={userType} menuItems={menuItems} />
      <main className="dashboard-content">
        {children}
      </main>
    </div>
  );
}

export default DashboardLayout;