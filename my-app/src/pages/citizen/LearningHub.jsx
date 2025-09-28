import React, { useState, useEffect } from 'react';
import DashboardLayout from '../../components/DashboardLayout';
import './LearningHub.css';

// Define citizenMenuItems for the sidebar
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

const LearningHub = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [progress, setProgress] = useState({});
  const [bookmarks, setBookmarks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Educational video content
  const videoCategories = [
    { id: 'all', name: 'All Topics', icon: '📚', color: '#4CAF50' },
    { id: 'waste-segregation', name: 'Waste Segregation', icon: '♻️', color: '#2196F3' },
    { id: 'composting', name: 'Composting', icon: '🌱', color: '#8BC34A' },
    { id: 'recycling', name: 'Recycling', icon: '🔄', color: '#FF9800' },
    { id: 'sustainability', name: 'Sustainability', icon: '🌍', color: '#607D8B' },
    { id: 'environmental-tips', name: 'Environmental Tips', icon: '💡', color: '#9C27B0' },
  ];

  const videoContent = [
    {
      id: 1,
      title: "Waste Segregation Basics: A Complete Guide",
      description: "Learn the fundamentals of proper waste segregation at home and in your community.",
      category: 'waste-segregation',
      duration: '12:45',
      difficulty: 'Beginner',
      thumbnail: '🗂️',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ', // Replace with actual URLs
      topics: ['Dry Waste', 'Wet Waste', 'Hazardous Waste', 'E-waste'],
      instructor: 'Dr. Priya Sharma',
      views: 15420,
      rating: 4.8
    },
    {
      id: 2,
      title: "Home Composting: Turn Kitchen Waste into Gold",
      description: "Step-by-step guide to creating nutrient-rich compost from your kitchen scraps.",
      category: 'composting',
      duration: '18:30',
      difficulty: 'Intermediate',
      thumbnail: '🥬',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      topics: ['Organic Waste', 'Composting Methods', 'Maintenance', 'Usage'],
      instructor: 'Rajesh Kumar',
      views: 12890,
      rating: 4.9
    },
    {
      id: 3,
      title: "Plastic Recycling: Know Your Numbers",
      description: "Understanding plastic recycling codes and what can be recycled in your area.",
      category: 'recycling',
      duration: '15:20',
      difficulty: 'Beginner',
      thumbnail: '🔢',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      topics: ['Plastic Types', 'Recycling Codes', 'Local Facilities', 'Best Practices'],
      instructor: 'Meera Patel',
      views: 9876,
      rating: 4.7
    },
    {
      id: 4,
      title: "Creating a Zero Waste Lifestyle",
      description: "Practical tips and strategies to minimize waste generation in daily life.",
      category: 'sustainability',
      duration: '22:15',
      difficulty: 'Advanced',
      thumbnail: '🎯',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      topics: ['Reduce', 'Reuse', 'Refuse', 'Lifestyle Changes'],
      instructor: 'Ananya Gupta',
      views: 18765,
      rating: 4.9
    },
    {
      id: 5,
      title: "Water Conservation Techniques at Home",
      description: "Simple methods to reduce water consumption and preserve this precious resource.",
      category: 'environmental-tips',
      duration: '14:10',
      difficulty: 'Beginner',
      thumbnail: '💧',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      topics: ['Water Saving', 'Rainwater Harvesting', 'Greywater', 'Conservation'],
      instructor: 'Suresh Reddy',
      views: 11234,
      rating: 4.6
    },
    {
      id: 6,
      title: "E-Waste Management: Safe Disposal Methods",
      description: "How to properly dispose of electronic waste and prevent environmental damage.",
      category: 'waste-segregation',
      duration: '16:45',
      difficulty: 'Intermediate',
      thumbnail: '📱',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      topics: ['Electronic Waste', 'Data Security', 'Recycling Centers', 'Hazards'],
      instructor: 'Dr. Amit Singh',
      views: 13567,
      rating: 4.8
    },
    {
      id: 7,
      title: "Vermicomposting: Worms as Your Garden Helpers",
      description: "Advanced composting technique using earthworms for faster decomposition.",
      category: 'composting',
      duration: '20:30',
      difficulty: 'Advanced',
      thumbnail: '🪱',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      topics: ['Earthworms', 'Vermi Setup', 'Maintenance', 'Harvesting'],
      instructor: 'Kavita Joshi',
      views: 8945,
      rating: 4.7
    },
    {
      id: 8,
      title: "DIY Eco-Friendly Cleaning Products",
      description: "Make your own natural cleaning products and reduce chemical waste.",
      category: 'environmental-tips',
      duration: '11:25',
      difficulty: 'Beginner',
      thumbnail: '🧽',
      videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
      topics: ['Natural Cleaners', 'DIY Recipes', 'Safe Ingredients', 'Cost Saving'],
      instructor: 'Neha Agarwal',
      views: 16789,
      rating: 4.5
    }
  ];

  // Load progress and bookmarks from localStorage
  useEffect(() => {
    const savedProgress = JSON.parse(localStorage.getItem('learningProgress') || '{}');
    const savedBookmarks = JSON.parse(localStorage.getItem('learningBookmarks') || '[]');
    setProgress(savedProgress);
    setBookmarks(savedBookmarks);
  }, []);

  const filteredVideos = videoContent.filter(video => {
    const matchesCategory = selectedCategory === 'all' || video.category === selectedCategory;
    const matchesSearch = video.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         video.topics.some(topic => topic.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const updateProgress = (videoId, progressPercent) => {
    const newProgress = { ...progress, [videoId]: progressPercent };
    setProgress(newProgress);
    localStorage.setItem('learningProgress', JSON.stringify(newProgress));
  };

  const toggleBookmark = (videoId) => {
    const newBookmarks = bookmarks.includes(videoId)
      ? bookmarks.filter(id => id !== videoId)
      : [...bookmarks, videoId];
    setBookmarks(newBookmarks);
    localStorage.setItem('learningBookmarks', JSON.stringify(newBookmarks));
  };

  const getCompletedVideos = () => {
    return Object.entries(progress).filter(([_, percent]) => percent >= 95).length;
  };

  const getTotalWatchTime = () => {
    const completedVideos = videoContent.filter(video => progress[video.id] >= 95);
    return completedVideos.reduce((total, video) => {
      const [minutes, seconds] = video.duration.split(':').map(Number);
      return total + minutes + (seconds / 60);
    }, 0).toFixed(0);
  };

  return (
    <DashboardLayout userType="citizen" menuItems={citizenMenuItems}>
      <div className="learning-hub">
        <div className="page-header">
          <div className="header-content">
            <h1 className="page-title">🎓 Learning Hub</h1>
            <p className="page-subtitle">Expand your knowledge with our environmental education videos</p>
          </div>
          <div className="learning-stats">
            <div className="stat-item">
              <span className="stat-number">{getCompletedVideos()}</span>
              <span className="stat-label">Completed</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{bookmarks.length}</span>
              <span className="stat-label">Bookmarked</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">{getTotalWatchTime()}min</span>
              <span className="stat-label">Watch Time</span>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="learning-controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="🔍 Search videos, topics, or instructors..."
              className="search-input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="category-filters">
            {videoCategories.map(category => (
              <button
                key={category.id}
                className={`category-btn ${selectedCategory === category.id ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.id)}
                style={{ '--category-color': category.color }}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-name">{category.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Featured Learning Path */}
        <div className="featured-section">
          <h2 className="section-title">🌟 Featured Learning Path</h2>
          <div className="learning-path-card">
            <div className="path-header">
              <h3>🚀 Waste Management Fundamentals</h3>
              <span className="path-badge">Beginner Friendly</span>
            </div>
            <p className="path-description">
              Master the basics of waste management with our curated 4-video series. 
              Perfect for beginners looking to make a positive environmental impact.
            </p>
            <div className="path-videos">
              {videoContent.slice(0, 4).map((video, index) => (
                <div key={video.id} className="path-video-item">
                  <div className="path-video-number">{index + 1}</div>
                  <div className="path-video-info">
                    <h4>{video.title}</h4>
                    <span className="path-video-duration">{video.duration}</span>
                  </div>
                  <div className="path-progress">
                    <div 
                      className="path-progress-fill" 
                      style={{ width: `${progress[video.id] || 0}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            <button className="start-path-btn">▶️ Start Learning Path</button>
          </div>
        </div>

        {/* Video Library */}
        <div className="video-library">
          <div className="library-header">
            <h2 className="section-title">📚 Video Library</h2>
            <div className="library-stats">
              <span className="video-count">{filteredVideos.length} videos found</span>
            </div>
          </div>

          <div className="video-grid">
            {filteredVideos.map(video => (
              <div key={video.id} className="video-card">
                <div className="video-thumbnail">
                  <div className="thumbnail-icon">{video.thumbnail}</div>
                  <div className="video-duration">{video.duration}</div>
                  <div className="video-difficulty">{video.difficulty}</div>
                  <button 
                    className={`bookmark-btn ${bookmarks.includes(video.id) ? 'bookmarked' : ''}`}
                    onClick={() => toggleBookmark(video.id)}
                  >
                    {bookmarks.includes(video.id) ? '🔖' : '📌'}
                  </button>
                  {progress[video.id] >= 95 && (
                    <div className="completion-badge">✅</div>
                  )}
                </div>
                
                <div className="video-content">
                  <h3 className="video-title">{video.title}</h3>
                  <p className="video-description">{video.description}</p>
                  
                  <div className="video-topics">
                    {video.topics.slice(0, 3).map(topic => (
                      <span key={topic} className="topic-tag">{topic}</span>
                    ))}
                    {video.topics.length > 3 && (
                      <span className="topic-tag more">+{video.topics.length - 3} more</span>
                    )}
                  </div>

                  <div className="video-meta">
                    <div className="instructor">
                      <span className="instructor-icon">👨‍🏫</span>
                      <span className="instructor-name">{video.instructor}</span>
                    </div>
                    <div className="video-stats">
                      <span className="views">👁️ {video.views.toLocaleString()}</span>
                      <span className="rating">⭐ {video.rating}</span>
                    </div>
                  </div>

                  {progress[video.id] > 0 && (
                    <div className="progress-container">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill" 
                          style={{ width: `${progress[video.id]}%` }}
                        ></div>
                      </div>
                      <span className="progress-text">{Math.round(progress[video.id])}% complete</span>
                    </div>
                  )}

                  <div className="video-actions">
                    <button 
                      className="play-btn"
                      onClick={() => setSelectedVideo(video)}
                    >
                      ▶️ {progress[video.id] > 0 ? 'Continue' : 'Start'} Learning
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Video Player Modal */}
        {selectedVideo && (
          <div className="video-player-modal">
            <div className="video-player-container">
              <div className="player-header">
                <h3 className="player-title">{selectedVideo.title}</h3>
                <button 
                  className="close-player-btn"
                  onClick={() => setSelectedVideo(null)}
                >
                  ✖️
                </button>
              </div>
              
              <div className="video-player">
                <iframe
                  width="100%"
                  height="400"
                  src={selectedVideo.videoUrl}
                  title={selectedVideo.title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>

              <div className="player-content">
                <div className="video-info">
                  <p className="video-full-description">{selectedVideo.description}</p>
                  
                  <div className="learning-objectives">
                    <h4>📋 Learning Objectives</h4>
                    <ul>
                      {selectedVideo.topics.map(topic => (
                        <li key={topic}>Understanding {topic}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="player-actions">
                  <button 
                    className="complete-btn"
                    onClick={() => {
                      updateProgress(selectedVideo.id, 100);
                      setSelectedVideo(null);
                    }}
                  >
                    ✅ Mark as Complete
                  </button>
                  <button 
                    className="bookmark-btn-large"
                    onClick={() => toggleBookmark(selectedVideo.id)}
                  >
                    {bookmarks.includes(selectedVideo.id) ? '🔖 Bookmarked' : '📌 Add Bookmark'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default LearningHub;