import { useState } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import WasteSegregationGame from '../../components/WasteSegregationGame';
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

function Rewards() {
  const [totalPoints, setTotalPoints] = useState(1247);
  const [weeklyPoints, setWeeklyPoints] = useState(52);
  const [gamesPlayed, setGamesPlayed] = useState(47);
  const [accuracy, setAccuracy] = useState(89);
  const [bestStreak, setBestStreak] = useState(12);
  const [gamePoints, setGamePoints] = useState(940);
  const [showGame, setShowGame] = useState(false);

  const handleGameComplete = (gameResults) => {
    // Update game stats
    setGamesPlayed(prev => prev + 1);
    setAccuracy(prev => Math.round((prev * gamesPlayed + gameResults.accuracy) / (gamesPlayed + 1)));
    if (gameResults.streak > bestStreak) {
      setBestStreak(gameResults.streak);
    }
  };

  const handlePointsEarned = (points) => {
    setTotalPoints(prev => prev + points);
    setWeeklyPoints(prev => prev + points);
    setGamePoints(prev => prev + points);
  };

  return (
    <DashboardLayout userType="citizen" menuItems={citizenMenuItems}>
      <div className="page-header">
        <h1 className="page-title">🏆 Rewards & Leaderboard</h1>
        <p className="page-subtitle">Earn green points and compete with your community for a cleaner environment</p>
      </div>

      {/* Points Overview */}
      <div className="stats-grid">
        <div className="stat-card green-points">
          <h3>🌟 Total Green Points</h3>
          <div className="stat-value">{totalPoints.toLocaleString()}</div>
          <div className="stat-trend">+{weeklyPoints} this week</div>
        </div>
        <div className="stat-card">
          <h3>🏅 Current Level</h3>
          <div className="stat-value">Gold</div>
          <div className="stat-trend">Next: Platinum</div>
        </div>
        <div className="stat-card">
          <h3>📊 Ward Rank</h3>
          <div className="stat-value">#23</div>
          <div className="stat-trend">of 145 members</div>
        </div>
        <div className="stat-card">
          <h3>🎯 Weekly Goal</h3>
          <div className="stat-value">78%</div>
          <div className="stat-trend">156/200 points</div>
        </div>
      </div>

      <div className="content-grid">
        <div className="content-card">
          <div className="game-header-section">
            <h3>🎮 Interactive Segregation Game</h3>
            {!showGame && (
              <button 
                className="toggle-game-btn"
                onClick={() => setShowGame(true)}
              >
                🎮 Play Game
              </button>
            )}
            {showGame && (
              <button 
                className="toggle-game-btn secondary"
                onClick={() => setShowGame(false)}
              >
                📊 View Stats
              </button>
            )}
          </div>
          
          {showGame ? (
            <WasteSegregationGame 
              onGameComplete={handleGameComplete}
              onPointsEarned={handlePointsEarned}
            />
          ) : (
            <div className="game-section">
              <div className="game-preview">
                <div className="game-screen">
                  <div className="game-title">🗂️ Sort It Right!</div>
                  <div className="game-description">
                    <p>Test your waste segregation knowledge with our interactive game!</p>
                    <ul>
                      <li>🎯 Sort waste items into correct bins</li>
                      <li>⏱️ Race against time for bonus points</li>
                      <li>🔥 Build streaks for multiplier bonuses</li>
                      <li>⬆️ Unlock advanced levels</li>
                    </ul>
                  </div>
                  <button 
                    className="play-game-btn"
                    onClick={() => setShowGame(true)}
                  >
                    🎮 Start Playing (+Points)
                  </button>
                </div>
              </div>
              
              <div className="game-stats">
                <h4>🎯 Your Game Stats</h4>
                <div className="game-stat-item">
                  <span className="stat-label">Games Played:</span>
                  <span className="stat-number">{gamesPlayed}</span>
                </div>
                <div className="game-stat-item">
                  <span className="stat-label">Accuracy Rate:</span>
                  <span className="stat-number">{accuracy}%</span>
                </div>
                <div className="game-stat-item">
                  <span className="stat-label">Best Streak:</span>
                  <span className="stat-number">{bestStreak}</span>
                </div>
                <div className="game-stat-item">
                  <span className="stat-label">Points Earned:</span>
                  <span className="stat-number">{gamePoints.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          <div className="level-progress">
            <h4>🏅 Level Progress</h4>
            <div className="level-bar">
              <div className="level-fill" style={{ width: `${(totalPoints / 1500) * 100}%` }}></div>
            </div>
            <div className="level-info">
              <span>Gold Level</span>
              <span>{totalPoints.toLocaleString()} / 1,500 points</span>
            </div>
            <p className="next-level">{1500 - totalPoints} more points to reach Platinum level!</p>
          </div>
        </div>

        <div className="content-card">
          <h3>🏆 Ward Leaderboard</h3>
          <div className="leaderboard">
            <div className="leaderboard-item rank-1">
              <div className="rank-badge">🥇</div>
              <div className="user-info">
                <h5>Priya Singh</h5>
                <small>2,134 points</small>
              </div>
              <div className="user-level">Diamond</div>
            </div>
            <div className="leaderboard-item rank-2">
              <div className="rank-badge">🥈</div>
              <div className="user-info">
                <h5>Raj Kumar</h5>
                <small>1,967 points</small>
              </div>
              <div className="user-level">Platinum</div>
            </div>
            <div className="leaderboard-item rank-3">
              <div className="rank-badge">🥉</div>
              <div className="user-info">
                <h5>Maya Patel</h5>
                <small>1,823 points</small>
              </div>
              <div className="user-level">Platinum</div>
            </div>
            <div className="leaderboard-item">
              <div className="rank-number">4</div>
              <div className="user-info">
                <h5>Amit Shah</h5>
                <small>1,542 points</small>
              </div>
              <div className="user-level">Gold</div>
            </div>
            <div className="leaderboard-item current-user">
              <div className="rank-number">23</div>
              <div className="user-info">
                <h5>You</h5>
                <small>1,247 points</small>
              </div>
              <div className="user-level">Gold</div>
            </div>
          </div>

          <div className="achievements">
            <h4>🎖️ Recent Achievements</h4>
            <div className="achievement-list">
              <div className="achievement-item">
                <span className="achievement-icon">🔥</span>
                <div className="achievement-details">
                  <h6>Week Warrior</h6>
                  <small>7 days reporting streak</small>
                </div>
              </div>
              <div className="achievement-item">
                <span className="achievement-icon">♻️</span>
                <div className="achievement-details">
                  <h6>Recycling Champion</h6>
                  <small>50kg waste recycled</small>
                </div>
              </div>
              <div className="achievement-item locked">
                <span className="achievement-icon">🌟</span>
                <div className="achievement-details">
                  <h6>Game Master</h6>
                  <small>Play 100 games (47/100)</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rewards Store */}
      <div className="content-card">
        <h3>🛍️ Rewards Store</h3>
        <div className="rewards-grid">
          <div className="reward-item">
            <div className="reward-icon">🧴</div>
            <h5>Eco-friendly Bottle</h5>
            <div className="reward-cost">200 Points</div>
            <button className="redeem-btn">Redeem</button>
          </div>
          <div className="reward-item">
            <div className="reward-icon">🌱</div>
            <h5>Plant Sapling Kit</h5>
            <div className="reward-cost">350 Points</div>
            <button className="redeem-btn">Redeem</button>
          </div>
          <div className="reward-item">
            <div className="reward-icon">🛍️</div>
            <h5>Reusable Shopping Bag</h5>
            <div className="reward-cost">150 Points</div>
            <button className="redeem-btn">Redeem</button>
          </div>
          <div className="reward-item">
            <div className="reward-icon">💰</div>
            <h5>₹100 Cashback</h5>
            <div className="reward-cost">1000 Points</div>
            <button className="redeem-btn disabled">Not Available</button>
          </div>
          <div className="reward-item">
            <div className="reward-icon">🏆</div>
            <h5>Green Champion Badge</h5>
            <div className="reward-cost">2000 Points</div>
            <button className="redeem-btn disabled">Not Available</button>
          </div>
          <div className="reward-item">
            <div className="reward-icon">🎫</div>
            <h5>Eco-tour Tickets</h5>
            <div className="reward-cost">1500 Points</div>
            <button className="redeem-btn disabled">Not Available</button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Rewards;