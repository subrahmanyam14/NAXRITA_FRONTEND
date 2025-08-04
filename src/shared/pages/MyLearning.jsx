import React, { useState, useEffect } from 'react';
import { 
  BookOpen, CheckCircle, AlertCircle, Clock, Users, Plus,
  Download, Search, Edit, Eye, TrendingUp, Target, Award,
  BarChart3, PieChart, LineChart, Activity, Zap, Calendar,
  Star, ArrowUp, ArrowDown, Minus, Brain, Trophy, Gauge,
  Menu, X, Home, User, Settings, LogOut, Bell, ChevronRight,
  ChevronLeft, Play, Pause
} from 'lucide-react';

const PerformanceDashboard = () => {
  const [view, setView] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [timeRange, setTimeRange] = useState('6months');
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Animated background elements
  useEffect(() => {
    const createStars = () => {
      const starfield = document.getElementById('starfield');
      if (!starfield) return;
      
      for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'absolute bg-white rounded-full animate-pulse';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() * 3 + 1 + 'px';
        star.style.height = star.style.width;
        star.style.opacity = Math.random() * 0.6 + 0.2;
        star.style.animationDuration = Math.random() * 3 + 2 + 's';
        starfield.appendChild(star);
      }
    };

    createStars();
  }, []);

  // Mock performance data
  const performanceData = {
    overall: {
      score: 94,
      trend: 'up',
      change: 8
    },
    metrics: {
      productivity: 96,
      quality: 92,
      collaboration: 89,
      innovation: 91,
      leadership: 87,
      learning: 94
    },
    goals: {
      completed: 24,
      total: 28,
      progress: 86
    },
    projects: {
      completed: 15,
      inProgress: 4,
      delayed: 1,
      successRate: 94
    },
    skills: [
      { name: 'React Development', level: 95, growth: 5 },
      { name: 'Team Leadership', level: 88, growth: 12 },
      { name: 'Project Management', level: 82, growth: 8 },
      { name: 'Communication', level: 91, growth: 3 },
      { name: 'Problem Solving', level: 89, growth: 7 },
      { name: 'Data Analysis', level: 76, growth: 15 }
    ],
    monthlyTrends: [
      { month: 'Jan', score: 85, projects: 2, goals: 4 },
      { month: 'Feb', score: 88, projects: 3, goals: 5 },
      { month: 'Mar', score: 91, projects: 2, goals: 3 },
      { month: 'Apr', score: 93, projects: 4, goals: 6 },
      { month: 'May', score: 96, projects: 3, goals: 4 },
      { month: 'Jun', score: 94, projects: 1, goals: 6 }
    ],
    announcements: [
      {
        id: 1,
        title: "Q1 Performance Results",
        content: "Outstanding team performance this quarter with 94% overall score.",
        type: "success"
      },
      {
        id: 2,
        title: "New Learning Modules Available",
        content: "Advanced React Patterns and Leadership Excellence courses now live.",
        type: "info"
      },
      {
        id: 3,
        title: "Innovation Award Winner",
        content: "Congratulations on winning the March Innovation Award!",
        type: "celebration"
      }
    ]
  };

  


  // Auto-carousel functionality
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => 
        prev === performanceData.announcements.length - 1 ? 0 : prev + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, performanceData.announcements.length]);

  // Progress components
  const CircularProgress = ({ value, size = 60, strokeWidth = 6, color = "#2563eb", showLabel = true }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / 100) * circumference;

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#2a2a2a"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out drop-shadow-lg"
            style={{ filter: `drop-shadow(0 0 10px ${color}30)` }}
          />
        </svg>
        {showLabel && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium text-white">{value}%</span>
          </div>
        )}
      </div>
    );
  };

  const LinearProgress = ({ value, color = "#2563eb", size = "md", label = "" }) => {
    const sizeClasses = {
      sm: "h-1.5",
      md: "h-2",
      lg: "h-3"
    };
    
    return (
      <div className="w-full">
        {label && (
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-400 font-medium">{label}</span>
            <span className="text-xs text-gray-300">{value}%</span>
          </div>
        )}
        <div className={`w-full bg-gray-800 rounded-full ${sizeClasses[size]}`}>
          <div 
            className={`${sizeClasses[size]} rounded-full transition-all duration-500 ease-out`}
            style={{ 
              width: `${value}%`,
              background: color,
              boxShadow: `0 0 10px ${color}40`
            }}
          />
        </div>
      </div>
    );
  };

  const MetricCard = ({ icon: Icon, title, value, unit, trend, change, color = "#2563eb" }) => (
    <div 
      className="bg-gray-900 backdrop-blur-lg rounded-xl p-6 border border-gray-700 hover:border-gray-600 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-1 group"
      style={{ background: 'rgba(30, 30, 30, 0.8)' }}
    >
      <div className="flex items-center justify-between mb-4">
        <div 
          className="p-3 rounded-lg backdrop-blur-sm"
          style={{ background: `${color}20`, boxShadow: `0 0 20px ${color}30` }}
        >
          <Icon className="h-5 w-5" style={{ color }} />
        </div>
        <div className="flex items-center space-x-1">
          {trend === 'up' ? (
            <ArrowUp className="h-3 w-3 text-green-400" />
          ) : trend === 'down' ? (
            <ArrowDown className="h-3 w-3 text-red-400" />
          ) : (
            <Minus className="h-3 w-3 text-gray-500" />
          )}
          <span className={`text-xs font-medium ${
            trend === 'up' ? 'text-green-400' : trend === 'down' ? 'text-red-400' : 'text-gray-500'
          }`}>
            {change > 0 ? '+' : ''}{change}%
          </span>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-light text-white">
          {value}<span className="text-sm text-gray-400 font-normal">{unit}</span>
        </p>
        <p className="text-xs text-gray-400 font-medium">{title}</p>
      </div>
    </div>
  );

  const Carousel = ({ items }) => {
    const nextSlide = () => {
      setCurrentSlide((prev) => prev === items.length - 1 ? 0 : prev + 1);
    };

    const prevSlide = () => {
      setCurrentSlide((prev) => prev === 0 ? items.length - 1 : prev - 1);
    };

    const toggleAutoPlay = () => {
      setIsAutoPlaying(!isAutoPlaying);
    };

    return (
      <div className="relative bg-gray-900 backdrop-blur-lg rounded-xl border border-gray-700 overflow-hidden">
        <div className="relative h-32 overflow-hidden">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                index === currentSlide ? 'translate-x-0' : 
                index < currentSlide ? '-translate-x-full' : 'translate-x-full'
              }`}
            >
              <div className="p-6 h-full flex flex-col justify-center">
                <h3 className="text-lg font-medium text-white mb-2">{item.title}</h3>
                <p className="text-sm text-gray-400">{item.content}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black hover:bg-gray-800 text-white p-2 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black hover:bg-gray-800 text-white p-2 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/30"
        >
          <ChevronRight className="h-4 w-4" />
        </button>

        {/* Indicators */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                index === currentSlide 
                  ? 'bg-blue-500 shadow-lg shadow-blue-500/50' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* Auto-play control */}
        <button
          onClick={toggleAutoPlay}
          className="absolute top-2 right-2 bg-black/50 hover:bg-black/70 text-white p-1 rounded transition-all duration-200"
        >
          {isAutoPlaying ? <Pause className="h-3 w-3" /> : <Play className="h-3 w-3" />}
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white font-['Plus_Jakarta_Sans'] relative overflow-hidden">
      {/* Animated starfield background */}
      {/* <div id="starfield" className="fixed inset-0 pointer-events-none z-0"></div> */}
      
   
      <div className={`transition-all duration-300 `}>
        
        {/* Header */}
        <header className="h-18 bg-black backdrop-blur-lg border-b border-gray-700 px-8 py-4 sticky top-0 z-20" style={{ background: 'rgba(10, 10, 10, 0.9)' }}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-light text-white">Performance Dashboard</h1>
              <p className="text-sm text-gray-400 font-medium">
                Track your performance metrics, goals, and professional development.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-200">
                <Bell className="h-5 w-5 text-gray-400" />
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg text-sm font-medium text-gray-300 hover:text-white transition-all duration-200">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-all duration-200 shadow-lg shadow-blue-500/30">
                <Target className="h-4 w-4 mr-2" />
                Set Goals
              </button>
            </div>
          </div>
        </header>

        {/* Content area */}
        <main className="p-8 relative z-10" style={{ background: 'rgba(10, 10, 10, 0.7)' }}>
          
          {/* Navigation tabs */}
          <div className="mb-8 border-b border-gray-700">
            <nav className="-mb-px flex space-x-8">
              {['overview', 'skills', 'learning', 'analytics'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setView(tab)}
                  className={`py-3 px-1 border-b-2 font-medium text-sm transition-all duration-200 ${
                    view === tab
                      ? 'border-blue-500 text-blue-400'
                      : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600'
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </nav>
          </div>

          {view === 'overview' && (
            <div className="space-y-8">
              
              {/* Announcements Carousel */}
              <div className="mb-8">
                <h2 className="text-lg font-medium text-white mb-4">Company Announcements</h2>
                <Carousel items={performanceData.announcements} />
              </div>

              {/* Overall Performance Section */}
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                <div className="lg:col-span-1">
                  <div className="bg-gray-900 backdrop-blur-lg rounded-xl p-8 border border-gray-700 text-center" style={{ background: 'rgba(30, 30, 30, 0.8)' }}>
                    <div className="flex justify-center mb-4">
                      <CircularProgress 
                        value={performanceData.overall.score} 
                        size={100} 
                        strokeWidth={8}
                        color="#22c55e"
                      />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-2">Overall Performance</h3>
                    <div className="flex items-center justify-center space-x-2">
                      <ArrowUp className="h-4 w-4 text-green-400" />
                      <span className="text-sm text-green-400 font-medium">+{performanceData.overall.change}% this quarter</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-3">
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-6">
                    <MetricCard 
                      icon={Zap} 
                      title="Productivity" 
                      value={performanceData.metrics.productivity} 
                      unit="%" 
                      trend="up" 
                      change={4}
                      color="#3b82f6"
                    />
                    <MetricCard 
                      icon={Award} 
                      title="Quality Score" 
                      value={performanceData.metrics.quality} 
                      unit="%" 
                      trend="up" 
                      change={2}
                      color="#8b5cf6"
                    />
                    <MetricCard 
                      icon={Users} 
                      title="Collaboration" 
                      value={performanceData.metrics.collaboration} 
                      unit="%" 
                      trend="down" 
                      change={-1}
                      color="#22c55e"
                    />
                    <MetricCard 
                      icon={Brain} 
                      title="Innovation" 
                      value={performanceData.metrics.innovation} 
                      unit="%" 
                      trend="up" 
                      change={6}
                      color="#f59e0b"
                    />
                    <MetricCard 
                      icon={Trophy} 
                      title="Leadership" 
                      value={performanceData.metrics.leadership} 
                      unit="%" 
                      trend="up" 
                      change={8}
                      color="#ef4444"
                    />
                    <MetricCard 
                      icon={BookOpen} 
                      title="Learning" 
                      value={performanceData.metrics.learning} 
                      unit="%" 
                      trend="up" 
                      change={3}
                      color="#6366f1"
                    />
                  </div>
                </div>
              </div>

              {/* Goals and Projects Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                
                {/* Goals Progress */}
                <div className="bg-gray-900 backdrop-blur-lg rounded-xl p-8 border border-gray-700" style={{ background: 'rgba(30, 30, 30, 0.8)' }}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-white flex items-center">
                      <Target className="h-5 w-5 mr-3 text-blue-500" />
                      Goal Progress
                    </h3>
                    <button className="text-xs text-blue-400 hover:text-blue-300 font-medium">View All</button>
                  </div>
                  
                  <div className="text-center mb-6">
                    <CircularProgress 
                      value={performanceData.goals.progress} 
                      size={120} 
                      strokeWidth={10}
                      color="#3b82f6"
                    />
                    <div className="mt-4">
                      <p className="text-2xl font-light text-white">
                        {performanceData.goals.completed}/{performanceData.goals.total}
                      </p>
                      <p className="text-xs text-gray-400 font-medium">Goals Completed</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400 font-medium">Quarterly Objectives</span>
                      <div className="flex-1 ml-4">
                        <LinearProgress value={92} color="#22c55e" size="sm" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400 font-medium">Development Goals</span>
                      <div className="flex-1 ml-4">
                        <LinearProgress value={78} color="#3b82f6" size="sm" />
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400 font-medium">Learning Targets</span>
                      <div className="flex-1 ml-4">
                        <LinearProgress value={88} color="#8b5cf6" size="sm" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Status */}
                <div className="bg-gray-900 backdrop-blur-lg rounded-xl p-8 border border-gray-700" style={{ background: 'rgba(30, 30, 30, 0.8)' }}>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-medium text-white flex items-center">
                      <BarChart3 className="h-5 w-5 mr-3 text-purple-500" />
                      Project Overview
                    </h3>
                    <button className="text-xs text-blue-400 hover:text-blue-300 font-medium">View Details</button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <CircularProgress 
                        value={100} 
                        size={60} 
                        strokeWidth={6}
                        color="#22c55e"
                      />
                      <p className="text-xs text-gray-400 font-medium mt-2">Completed</p>
                      <p className="text-sm text-green-400 font-medium">{performanceData.projects.completed}</p>
                    </div>
                    <div className="text-center">
                      <CircularProgress 
                        value={75} 
                        size={60} 
                        strokeWidth={6}
                        color="#3b82f6"
                      />
                      <p className="text-xs text-gray-400 font-medium mt-2">In Progress</p>
                      <p className="text-sm text-blue-400 font-medium">{performanceData.projects.inProgress}</p>
                    </div>
                    <div className="text-center">
                      <CircularProgress 
                        value={25} 
                        size={60} 
                        strokeWidth={6}
                        color="#f59e0b"
                      />
                      <p className="text-xs text-gray-400 font-medium mt-2">Delayed</p>
                      <p className="text-sm text-amber-400 font-medium">{performanceData.projects.delayed}</p>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4 border-t border-gray-700">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400 font-medium">Success Rate</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20">
                          <LinearProgress value={performanceData.projects.successRate} color="#22c55e" size="sm" />
                        </div>
                        <span className="text-xs text-green-400 font-medium">{performanceData.projects.successRate}%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400 font-medium">On-Time Delivery</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-20">
                          <LinearProgress value={87} color="#3b82f6" size="sm" />
                        </div>
                        <span className="text-xs text-blue-400 font-medium">87%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Performance Trends */}
              <div className="bg-gray-900 backdrop-blur-lg rounded-xl p-8 border border-gray-700" style={{ background: 'rgba(30, 30, 30, 0.8)' }}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-medium text-white">Performance Trends</h3>
                  <select className="text-xs border border-gray-600 bg-gray-800 text-white rounded px-3 py-2 font-medium">
                    <option>Last 6 months</option>
                    <option>Last year</option>
                  </select>
                </div>
                <div className="grid grid-cols-6 gap-4 h-48">
                  {performanceData.monthlyTrends.map((item, index) => (
                    <div key={index} className="flex flex-col items-center space-y-2">
                      <div className="flex-1 flex flex-col justify-end w-full">
                        <div 
                          className="bg-gradient-to-t from-blue-500 to-blue-300 rounded-sm transition-all duration-700 ease-out shadow-lg"
                          style={{ 
                            height: `${(item.score / 100) * 100}%`,
                            boxShadow: '0 0 15px rgba(59, 130, 246, 0.4)'
                          }}
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-gray-400 font-medium">{item.month}</p>
                        <p className="text-xs text-blue-400 font-medium">{item.score}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Other views would follow similar dark theme patterns... */}
        </main>
      </div>
    </div>
  );
};

export default PerformanceDashboard;
