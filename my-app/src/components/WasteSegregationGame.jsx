import { useState, useEffect } from 'react';
import './WasteSegregationGame.css';

const WasteSegregationGame = ({ onGameComplete, onPointsEarned }) => {
  const [gameState, setGameState] = useState('menu'); // 'menu', 'playing', 'completed'
  const [score, setScore] = useState(0);
  const [level, setLevel] = useState(1);
  const [lives, setLives] = useState(3);
  const [currentItem, setCurrentItem] = useState(null);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isCorrect, setIsCorrect] = useState(null);
  const [gameStats, setGameStats] = useState({
    totalItems: 0,
    correctAnswers: 0,
    wrongAnswers: 0
  });

  const wasteItems = [
    // Organic Waste
    { name: 'Apple Core', emoji: '🍎', category: 'organic', points: 10 },
    { name: 'Banana Peel', emoji: '🍌', category: 'organic', points: 10 },
    { name: 'Vegetable Scraps', emoji: '🥕', category: 'organic', points: 10 },
    { name: 'Eggshell', emoji: '🥚', category: 'organic', points: 10 },
    { name: 'Tea Leaves', emoji: '🍃', category: 'organic', points: 10 },
    { name: 'Coffee Grounds', emoji: '☕', category: 'organic', points: 10 },
    
    // Recyclable Waste
    { name: 'Plastic Bottle', emoji: '🍼', category: 'recyclable', points: 15 },
    { name: 'Aluminum Can', emoji: '🥤', category: 'recyclable', points: 15 },
    { name: 'Glass Jar', emoji: '🏺', category: 'recyclable', points: 15 },
    { name: 'Newspaper', emoji: '📰', category: 'recyclable', points: 15 },
    { name: 'Cardboard Box', emoji: '📦', category: 'recyclable', points: 15 },
    { name: 'Metal Can', emoji: '🥫', category: 'recyclable', points: 15 },
    
    // Hazardous Waste
    { name: 'Battery', emoji: '🔋', category: 'hazardous', points: 25 },
    { name: 'Paint Can', emoji: '🎨', category: 'hazardous', points: 25 },
    { name: 'Medicine', emoji: '💊', category: 'hazardous', points: 25 },
    { name: 'Fluorescent Bulb', emoji: '💡', category: 'hazardous', points: 25 },
    { name: 'Cleaning Chemical', emoji: '🧴', category: 'hazardous', points: 25 },
    { name: 'Electronic Device', emoji: '📱', category: 'hazardous', points: 25 },
    
    // General Waste
    { name: 'Tissue Paper', emoji: '🧼', category: 'general', points: 5 },
    { name: 'Broken Glass', emoji: '🔨', category: 'general', points: 5 },
    { name: 'Dust', emoji: '🌪️', category: 'general', points: 5 },
    { name: 'Cigarette Butt', emoji: '😬', category: 'general', points: 5 },
    { name: 'Diaper', emoji: '👶', category: 'general', points: 5 },
    { name: 'Cat Litter', emoji: '🐈', category: 'general', points: 5 },
    { name: 'Rubber Glove', emoji: '🧤', category: 'general', points: 5 },
    
    // More Organic Waste
    { name: 'Orange Peel', emoji: '🍊', category: 'organic', points: 10 },
    { name: 'Bread Crumbs', emoji: '🍞', category: 'organic', points: 10 },
    { name: 'Fish Bones', emoji: '🐟', category: 'organic', points: 10 },
    { name: 'Flower Petals', emoji: '🌸', category: 'organic', points: 10 },
    
    // More Recyclable Items
    { name: 'Tin Foil', emoji: '🧽', category: 'recyclable', points: 15 },
    { name: 'Wine Bottle', emoji: '🍷', category: 'recyclable', points: 15 },
    { name: 'Cereal Box', emoji: '🥣', category: 'recyclable', points: 15 },
    { name: 'Shampoo Bottle', emoji: '🧼', category: 'recyclable', points: 15 },
    
    // More Hazardous Items
    { name: 'Nail Polish', emoji: '💅', category: 'hazardous', points: 25 },
    { name: 'Printer Ink', emoji: '🖨️', category: 'hazardous', points: 25 },
    { name: 'Car Oil', emoji: '🚗', category: 'hazardous', points: 25 },
    { name: 'Thermometer', emoji: '🌡️', category: 'hazardous', points: 25 }
  ];

  const bins = [
    { id: 'organic', name: 'Organic', color: '#4CAF50', emoji: '🟢', description: 'Food scraps, garden waste' },
    { id: 'recyclable', name: 'Recyclable', color: '#2196F3', emoji: '🔵', description: 'Plastic, metal, glass, paper' },
    { id: 'hazardous', name: 'Hazardous', color: '#f44336', emoji: '🔴', description: 'Batteries, chemicals, electronics' },
    { id: 'general', name: 'General', color: '#9E9E9E', emoji: '⚫', description: 'Non-recyclable waste' }
  ];

  // Timer effect
  useEffect(() => {
    let timer;
    if (gameState === 'playing' && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && gameState === 'playing') {
      endGame();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, gameState]);

  const startGame = () => {
    setGameState('playing');
    setScore(0);
    setLevel(1);
    setLives(3);
    setStreak(0);
    setTimeLeft(30 + (level - 1) * 10);
    setGameStats({ totalItems: 0, correctAnswers: 0, wrongAnswers: 0 });
    generateNewItem();
  };

  const generateNewItem = () => {
    // All waste categories are available from level 1
    const randomItem = wasteItems[Math.floor(Math.random() * wasteItems.length)];
    setCurrentItem(randomItem);
    setIsCorrect(null);
  };

  const handleBinClick = (binId) => {
    if (!currentItem || gameState !== 'playing') return;

    const correct = currentItem.category === binId;
    setIsCorrect(correct);

    setGameStats(prev => ({
      totalItems: prev.totalItems + 1,
      correctAnswers: prev.correctAnswers + (correct ? 1 : 0),
      wrongAnswers: prev.wrongAnswers + (correct ? 0 : 1)
    }));

    if (correct) {
      const points = currentItem.points + (streak * 2); // Bonus for streak
      setScore(prev => prev + points);
      setStreak(prev => prev + 1);
      
      // Level up every 10 correct answers
      if (gameStats.correctAnswers + 1 >= level * 10) {
        setLevel(prev => prev + 1);
        setTimeLeft(prev => prev + 15); // Bonus time for level up
      }
    } else {
      setLives(prev => prev - 1);
      setStreak(0);
      
      if (lives - 1 <= 0) {
        endGame();
        return;
      }
    }

    // Show feedback for 1 second then generate new item
    setTimeout(() => {
      if (gameState === 'playing') {
        generateNewItem();
      }
    }, 1000);
  };

  const endGame = () => {
    setGameState('completed');
    const finalPoints = Math.floor(score * (gameStats.correctAnswers / Math.max(gameStats.totalItems, 1)));
    
    if (onPointsEarned) {
      onPointsEarned(finalPoints);
    }
    if (onGameComplete) {
      onGameComplete({
        score: finalPoints,
        level,
        accuracy: Math.round((gameStats.correctAnswers / Math.max(gameStats.totalItems, 1)) * 100),
        streak
      });
    }
  };

  const resetGame = () => {
    setGameState('menu');
    setCurrentItem(null);
    setIsCorrect(null);
  };

  if (gameState === 'menu') {
    return (
      <div className="waste-game-container">
        <div className="game-menu">
          <div className="game-logo">
            <div className="game-icon">🎮</div>
            <h2>Waste Segregation Challenge</h2>
            <p>Test your knowledge and earn green points!</p>
          </div>
          
          <div className="game-rules">
            <h3>🎯 How to Play</h3>
            <ul>
              <li>🗂️ Sort waste items into the correct bins</li>
              <li>⏱️ Race against time to maximize your score</li>
              <li>🔥 Build streaks for bonus points</li>
              <li>⭐ All waste categories available from start</li>
              <li>❤️ You have 3 lives - use them wisely!</li>
              <li>🏆 Higher levels = more time & better rewards</li>
            </ul>
          </div>
          
          <div className="difficulty-levels">
            <h3>🏆 Levels</h3>
            <div className="level-info">
              <span className="level-badge beginner">Level 1: Beginner</span>
              <small>All waste categories available</small>
            </div>
            <div className="level-info">
              <span className="level-badge intermediate">Level 2: Intermediate</span>
              <small>Faster gameplay + bonus time</small>
            </div>
            <div className="level-info">
              <span className="level-badge expert">Level 3+: Expert</span>
              <small>Maximum speed + highest rewards</small>
            </div>
          </div>
          
          <button className="start-game-btn" onClick={startGame}>
            🚀 Start Game
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'completed') {
    const accuracy = Math.round((gameStats.correctAnswers / Math.max(gameStats.totalItems, 1)) * 100);
    const finalScore = Math.floor(score * (accuracy / 100));
    
    return (
      <div className="waste-game-container">
        <div className="game-complete">
          <div className="completion-header">
            <div className="completion-icon">🏆</div>
            <h2>Game Complete!</h2>
            <div className="final-score">{finalScore} Points Earned</div>
          </div>
          
          <div className="game-summary">
            <div className="summary-grid">
              <div className="summary-item">
                <span className="summary-label">Level Reached</span>
                <span className="summary-value">{level}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Items Sorted</span>
                <span className="summary-value">{gameStats.totalItems}</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Accuracy</span>
                <span className="summary-value">{accuracy}%</span>
              </div>
              <div className="summary-item">
                <span className="summary-label">Best Streak</span>
                <span className="summary-value">{streak}</span>
              </div>
            </div>
          </div>
          
          <div className="performance-rating">
            {accuracy >= 90 && <div className="rating excellent">🌟 Excellent! Waste sorting expert!</div>}
            {accuracy >= 70 && accuracy < 90 && <div className="rating good">👏 Good job! Keep practicing!</div>}
            {accuracy >= 50 && accuracy < 70 && <div className="rating average">👍 Not bad! Room for improvement!</div>}
            {accuracy < 50 && <div className="rating poor">💪 Keep trying! Practice makes perfect!</div>}
          </div>
          
          <div className="game-actions">
            <button className="play-again-btn" onClick={startGame}>
              🔄 Play Again
            </button>
            <button className="back-menu-btn" onClick={resetGame}>
              🏠 Back to Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="waste-game-container">
      <div className="game-header">
        <div className="game-info">
          <div className="info-item">
            <span className="info-label">Score</span>
            <span className="info-value">{score}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Level</span>
            <span className="info-value">{level}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Lives</span>
            <span className="info-value">{'❤️'.repeat(lives)}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Time</span>
            <span className={`info-value ${timeLeft <= 10 ? 'urgent' : ''}`}>{timeLeft}s</span>
          </div>
        </div>
        {streak > 0 && (
          <div className="streak-indicator">
            🔥 Streak: {streak}x
          </div>
        )}
      </div>

      <div className="game-area">
        <div className="item-display">
          {currentItem && (
            <div className={`waste-item ${isCorrect === true ? 'correct' : isCorrect === false ? 'incorrect' : ''}`}>
              <div className="item-emoji">{currentItem.emoji}</div>
              <div className="item-name">{currentItem.name}</div>
              <div className="item-question">Where does this belong?</div>
              
              {isCorrect === true && (
                <div className="feedback correct-feedback">
                  ✅ Correct! +{currentItem.points + (streak * 2)} points
                </div>
              )}
              {isCorrect === false && (
                <div className="feedback incorrect-feedback">
                  ❌ Wrong! Correct bin: {bins.find(b => b.id === currentItem.category)?.name}
                </div>
              )}
            </div>
          )}
        </div>

        <div className="bins-container">
          {bins.map(bin => (
            <div
              key={bin.id}
              className={`waste-bin ${bin.id}`}
              onClick={() => handleBinClick(bin.id)}
            >
              <div className="bin-emoji">{bin.emoji}</div>
              <div className="bin-name">{bin.name}</div>
              <div className="bin-description">{bin.description}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="game-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${(gameStats.correctAnswers / (level * 10)) * 100}%` }}
          ></div>
        </div>
        <div className="progress-text">
          Level {level}: {gameStats.correctAnswers}/{level * 10} correct to next level
        </div>
      </div>
    </div>
  );
};

export default WasteSegregationGame;