import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import CitizenHome from './pages/citizen/CitizenHome';
import ReportProblem from './pages/citizen/ReportProblem';
import CollectionSchedule from './pages/citizen/CollectionSchedule';
import Rewards from './pages/citizen/Rewards';
import TruckTracker from './pages/citizen/TruckTracker';
import ScrapCollector from './pages/citizen/ScrapCollector';
import LearningHub from './pages/citizen/LearningHub';
import WorkerHome from './pages/worker/WorkerHome';
import CollectionStatus from './pages/worker/CollectionStatus';
import AdminHome from './pages/admin/AdminHome';
import ComplaintsTracker from './pages/admin/ComplaintsTracker';
import ThemeToggle from './components/ThemeToggle';
import './App.css'

// Home Page Component
function HomePage() {
  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="nav">
            <div className="logo">
              <span className="logo-icon">🌱</span>
              <h1>Sankalp Green</h1>
            </div>
            <div className="header-actions">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h2 className="tagline">Real Life Solutions for Waste Management</h2>
            <p className="subtitle">Building a sustainable future through smart waste management solutions</p>
            
            {/* Login Buttons */}
            <div className="login-buttons">
              <Link to="/citizen" className="login-btn citizen">
                <span className="btn-icon">👤</span>
                Citizen Login
              </Link>
              <Link to="/worker" className="login-btn worker">
                <span className="btn-icon">👷</span>
                Worker Login
              </Link>
              <Link to="/admin" className="login-btn admin">
                <span className="btn-icon">⚙️</span>
                Admin Login
              </Link>
            </div>
          </div>
          
          <div className="hero-illustration">
            <div className="eco-circle">
              <span className="eco-icon">♻️</span>
            </div>
          </div>
        </div>
      </section>

      {/* Blog/Tips Section */}
      <section className="blog-tips">
        <div className="container">
          <h3>Latest Tips & Insights</h3>
          <div className="tips-grid">
            <div className="tip-card">
              <div className="tip-icon">🗂️</div>
              <h4>Waste Segregation</h4>
              <p>Learn how to properly separate waste for better recycling outcomes.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">🌍</div>
              <h4>Eco-Friendly Living</h4>
              <p>Simple daily habits that can make a big difference for our planet.</p>
            </div>
            <div className="tip-card">
              <div className="tip-icon">📱</div>
              <h4>Smart Solutions</h4>
              <p>Technology-driven approaches to modern waste management.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 Sankalp Green. Real Life Solutions for Waste Management.</p>
        </div>
      </footer>
    </div>
  );
}

// Placeholder component for Admin dashboard
function AdminDashboard() {
  return (
    <div style={{ padding: '50px', textAlign: 'center' }}>
      <h1>⚙️ Admin Dashboard</h1>
      <p>Coming Soon! Admin dashboard with analytics, complaints tracker, and management tools.</p>
      <Link to="/" style={{ color: 'var(--primary-green)', textDecoration: 'none', fontSize: '1.1rem' }}>← Back to Home</Link>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/citizen" element={<CitizenHome />} />
          <Route path="/citizen/report" element={<ReportProblem />} />
          <Route path="/citizen/schedule" element={<CollectionSchedule />} />
          <Route path="/citizen/learning" element={<LearningHub />} />
          <Route path="/citizen/rewards" element={<Rewards />} />
          <Route path="/citizen/truck-tracker" element={<TruckTracker />} />
          <Route path="/citizen/scrap-collector" element={<ScrapCollector />} />
          <Route path="/worker" element={<WorkerHome />} />
          <Route path="/worker/collection" element={<CollectionStatus />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/complaints" element={<ComplaintsTracker />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App
