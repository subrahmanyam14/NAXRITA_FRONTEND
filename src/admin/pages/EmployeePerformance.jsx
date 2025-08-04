import { useState, useEffect } from 'react';
import { employees, departments, designations, getDepartmentById } from '../../data/employees';

const EmployeePerformance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedEmployee, setExpandedEmployee] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'overallRating', direction: 'desc' });
  const [activeTab, setActiveTab] = useState('overview');
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
  const [autoScrollEnabled, setAutoScrollEnabled] = useState(true);
  
  // Mock performance reviews data
  const [performanceReviews, setPerformanceReviews] = useState(() => {
    return employees.map(emp => ({
      employeeId: emp.id,
      overallRating: (Math.random() * 4 + 1).toFixed(1),
      lastReviewDate: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30 * 6)).toISOString().split('T')[0],
      performanceStatus: ['exceeds', 'meets', 'needs_improvement', 'below'][Math.floor(Math.random() * 4)],
      productivity: Math.floor(Math.random() * 40) + 60,
      attendance: Math.floor(Math.random() * 20) + 80,
      teamwork: Math.floor(Math.random() * 30) + 70,
      communication: Math.floor(Math.random() * 25) + 75,
      goals: [
        { id: 1, name: 'Complete project X', status: Math.random() > 0.5 ? 'completed' : 'in_progress', progress: Math.floor(Math.random() * 100) },
        { id: 2, name: 'Improve technical skills', status: Math.random() > 0.5 ? 'completed' : 'in_progress', progress: Math.floor(Math.random() * 100) },
        { id: 3, name: 'Enhance teamwork', status: Math.random() > 0.3 ? 'completed' : 'in_progress', progress: Math.floor(Math.random() * 100) },
      ],
      monthlyPerformance: [
        { month: 'Jan', score: Math.floor(Math.random() * 40) + 60 },
        { month: 'Feb', score: Math.floor(Math.random() * 40) + 60 },
        { month: 'Mar', score: Math.floor(Math.random() * 40) + 60 },
        { month: 'Apr', score: Math.floor(Math.random() * 40) + 60 },
        { month: 'May', score: Math.floor(Math.random() * 40) + 60 },
        { month: 'Jun', score: Math.floor(Math.random() * 40) + 60 },
      ],
      skills: emp.skills?.map(skillId => ({
        id: skillId,
        name: ['JavaScript', 'React', 'Python', 'Leadership', 'Communication'][Math.floor(Math.random() * 5)],
        rating: Math.floor(Math.random() * 5) + 1,
        target: 5
      })) || [],
      feedback: [
        { id: 1, from: 'John Manager', comment: 'Excellent leadership skills and project delivery', date: '2023-06-15', type: 'positive' },
        { id: 2, from: 'Jane Lead', comment: 'Could improve time management and communication', date: '2023-06-10', type: 'improvement' },
      ]
    }));
  });

  // Mock announcements for carousel
  const announcements = [
    { id: 1, title: 'Q4 Performance Reviews Starting', message: 'Schedule your annual performance reviews by Dec 15th', type: 'info', priority: 'high' },
    { id: 2, title: 'Top Performers Recognition', message: 'Congratulations to our star performers this quarter!', type: 'success', priority: 'medium' },
    { id: 3, title: 'New Goal Setting Framework', message: 'Updated SMART goals framework now available', type: 'update', priority: 'medium' },
    { id: 4, title: 'Performance Training Workshop', message: 'Join us for advanced performance management training', type: 'event', priority: 'low' }
  ];

  // Auto-scroll carousel
  useEffect(() => {
    if (!autoScrollEnabled) return;
    
    const interval = setInterval(() => {
      setCurrentAnnouncementIndex((prevIndex) => 
        (prevIndex + 1) % announcements.length
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [autoScrollEnabled, announcements.length]);

  // Toggle employee details
  const toggleEmployeeDetails = (employeeId) => {
    setExpandedEmployee(expandedEmployee === employeeId ? null : employeeId);
  };

  // Get employee data with performance
  const getEmployeesWithPerformance = () => {
    return employees.map(emp => {
      const performance = performanceReviews.find(p => p.employeeId === emp.id) || {};
      return { ...emp, ...performance };
    });
  };

  // Filter and sort employees
  const filteredEmployees = getEmployeesWithPerformance()
    .filter(emp => {
      const matchesSearch = 
        `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = 
        selectedDepartment === 'all' || emp.departmentId === selectedDepartment;
      
      const matchesStatus = 
        selectedStatus === 'all' || emp.performanceStatus === selectedStatus;
      
      return matchesSearch && matchesDepartment && matchesStatus;
    });

  // Performance statistics
  const performanceStats = {
    totalEmployees: employees.length,
    avgRating: (performanceReviews.reduce((sum, review) => sum + parseFloat(review.overallRating), 0) / performanceReviews.length).toFixed(1),
    topPerformers: performanceReviews.filter(r => parseFloat(r.overallRating) >= 4.5).length,
    needsImprovement: performanceReviews.filter(r => r.performanceStatus === 'needs_improvement').length,
    completedGoals: performanceReviews.reduce((sum, emp) => sum + emp.goals.filter(g => g.status === 'completed').length, 0),
    totalGoals: performanceReviews.reduce((sum, emp) => sum + emp.goals.length, 0)
  };

  // Animated Background Component
  const AnimatedBackground = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Starfield */}
      <div className="absolute inset-0">
        {[...Array(150)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              backgroundColor: ['#ffffff', '#2563eb', '#a3a3a3', '#6b7280'][Math.floor(Math.random() * 4)],
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`,
              opacity: Math.random() * 0.6 + 0.2
            }}
          />
        ))}
      </div>

      {/* Floating Sparkles */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 4 + 6}s`
            }}
          >
            <div
              className="w-2 h-2 rounded-full opacity-60"
              style={{
                backgroundColor: ['#2563eb', '#22c55e', '#f59e0b', '#ffffff'][Math.floor(Math.random() * 4)],
                boxShadow: `0 0 10px ${['#2563eb', '#22c55e', '#f59e0b', '#ffffff'][Math.floor(Math.random() * 4)]}`
              }}
            />
          </div>
        ))}
      </div>

      {/* Animated Dots with Connection Lines */}
      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => (
          <div
            key={`dot-${i}`}
            className="absolute w-1 h-1 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: ['rgba(37, 99, 235, 0.3)', 'rgba(163, 163, 163, 0.2)', 'rgba(107, 114, 128, 0.1)'][Math.floor(Math.random() * 3)],
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${Math.random() * 3 + 3}s`
            }}
          />
        ))}
      </div>
    </div>
  );

  // Enhanced Sparkle Trail Effect
  const SparkleTrail = ({ children, className }) => (
    <div className={`relative group ${className}`}>
      {children}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: '1s'
            }}
          />
        ))}
      </div>
    </div>
  );

  // Carousel Component
  const AnnouncementCarousel = () => {
    const nextSlide = () => {
      setCurrentAnnouncementIndex((prevIndex) => 
        (prevIndex + 1) % announcements.length
      );
    };

    const prevSlide = () => {
      setCurrentAnnouncementIndex((prevIndex) => 
        prevIndex === 0 ? announcements.length - 1 : prevIndex - 1
      );
    };

    const goToSlide = (index) => {
      setCurrentAnnouncementIndex(index);
    };

    return (
      <div 
        className="relative bg-gradient-to-r from-gray-800/80 to-gray-900/80 backdrop-blur-xl rounded-2xl border border-gray-700 overflow-hidden mb-6"
        onMouseEnter={() => setAutoScrollEnabled(false)}
        onMouseLeave={() => setAutoScrollEnabled(true)}
      >
        <div className="relative h-32 overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out h-full"
            style={{ transform: `translateX(-${currentAnnouncementIndex * 100}%)` }}
          >
            {announcements.map((announcement, index) => (
              <div
                key={announcement.id}
                className="w-full flex-shrink-0 p-6 flex items-center justify-between"
              >
                <div className="flex items-center space-x-4">
                  <div className={`p-3 rounded-xl ${
                    announcement.type === 'success' ? 'bg-emerald-500/20 text-emerald-400' :
                    announcement.type === 'info' ? 'bg-blue-500/20 text-blue-400' :
                    announcement.type === 'update' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-amber-500/20 text-amber-400'
                  }`}>
                    <div className="w-6 h-6 rounded-full bg-current opacity-20" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1">{announcement.title}</h3>
                    <p className="text-gray-300 text-xs">{announcement.message}</p>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                  announcement.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                  announcement.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-green-500/20 text-green-400'
                }`}>
                  {announcement.priority}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Buttons */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
        >
          ←
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center text-white transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30"
        >
          →
        </button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {announcements.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentAnnouncementIndex 
                  ? 'bg-blue-400 shadow-lg shadow-blue-400/50' 
                  : 'bg-gray-600 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>

        {/* Auto-scroll toggle */}
        <button
          onClick={() => setAutoScrollEnabled(!autoScrollEnabled)}
          className={`absolute top-4 right-4 p-2 rounded-lg text-xs transition-all duration-300 ${
            autoScrollEnabled 
              ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30' 
              : 'bg-gray-500/20 text-gray-400 hover:bg-gray-500/30'
          }`}
        >
          {autoScrollEnabled ? '⏸️' : '▶️'}
        </button>
      </div>
    );
  };

  // Chart component for performance trends with dark theme
  const PerformanceChart = ({ data, title }) => (
    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-2xl p-4 border border-gray-700">
      <h4 className="text-xs font-medium text-gray-300 mb-3">{title}</h4>
      <div className="flex items-end space-x-1 h-24">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full bg-gradient-to-t from-blue-600 to-blue-400 rounded-t-sm transition-all duration-300 hover:from-blue-500 hover:to-blue-300 hover:shadow-lg hover:shadow-blue-500/30"
              style={{ height: `${(item.score / 100) * 100}%` }}
            />
            <span className="text-xs text-gray-400 mt-1">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // Circular progress component with dark theme
  const CircularProgress = ({ percentage, size = 40, color = 'blue' }) => {
    const radius = (size - 4) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    const colorMap = {
      blue: '#3b82f6',
      emerald: '#10b981',
      purple: '#8b5cf6',
      amber: '#f59e0b',
      red: '#ef4444'
    };

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#374151"
            strokeWidth="2"
            fill="transparent"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={colorMap[color]}
            strokeWidth="2"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="transition-all duration-300"
            strokeLinecap="round"
            style={{ filter: `drop-shadow(0 0 6px ${colorMap[color]}40)` }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-medium text-white">{percentage}%</span>
        </div>
      </div>
    );
  };

  // Status indicator with dark theme
  const StatusIndicator = ({ status }) => {
    const statusConfig = {
      exceeds: { color: 'emerald', label: 'Exceeds', dot: '●', bg: 'bg-emerald-500/20', text: 'text-emerald-400', border: 'border-emerald-500/30' },
      meets: { color: 'blue', label: 'Meets', dot: '●', bg: 'bg-blue-500/20', text: 'text-blue-400', border: 'border-blue-500/30' },
      needs_improvement: { color: 'amber', label: 'Needs Work', dot: '●', bg: 'bg-amber-500/20', text: 'text-amber-400', border: 'border-amber-500/30' },
      below: { color: 'red', label: 'Below', dot: '●', bg: 'bg-red-500/20', text: 'text-red-400', border: 'border-red-500/30' }
    };
    
    const config = statusConfig[status] || statusConfig.meets;
    
    return (
      <div className={`inline-flex items-center px-2 py-1 rounded-full ${config.bg} border ${config.border}`}>
        <span className={`${config.text} text-xs mr-1`}>{config.dot}</span>
        <span className={`${config.text} text-xs font-medium`}>{config.label}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Animated Background */}
      {/* <AnimatedBackground /> */}
      
      <div className="relative z-10 p-4">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <SparkleTrail>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white mb-1">Performance Dashboard</h1>
                  <p className="text-sm text-gray-400">Monitor and analyze employee performance metrics</p>
                </div>
                <div className="mt-3 sm:mt-0 flex space-x-2">
                  <SparkleTrail>
                    <button className="px-4 py-2 bg-gray-800/80 backdrop-blur-xl text-gray-300 text-xs font-medium border border-gray-600 rounded-lg hover:bg-gray-700/80 hover:border-gray-500 transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/20">
                      Export Data
                    </button>
                  </SparkleTrail>
                  <SparkleTrail>
                    <button className="px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-500 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30">
                      Generate Report
                    </button>
                  </SparkleTrail>
                </div>
              </div>
            </SparkleTrail>
          </div>

          {/* Announcement Carousel */}
          <AnnouncementCarousel />

          {/* Tabs */}
          <div className="mb-6">
            <nav className="flex space-x-1 bg-gray-900/80 backdrop-blur-xl p-1 rounded-xl border border-gray-700">
              {['overview', 'individual', 'analytics'].map((tab) => (
                <SparkleTrail key={tab}>
                  <button
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-xs font-medium rounded-lg transition-all duration-300 ${
                      activeTab === tab
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                        : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-300'
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                </SparkleTrail>
              ))}
            </nav>
          </div>

          {activeTab === 'overview' && (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
                {[
                  { label: 'Total Employees', value: performanceStats.totalEmployees, change: '+2 this month', color: 'blue' },
                  { label: 'Avg Rating', value: performanceStats.avgRating, progress: (performanceStats.avgRating / 5) * 100, color: 'emerald' },
                  { label: 'Top Performers', value: performanceStats.topPerformers, subtitle: '4.5+ rating', color: 'purple' },
                  { label: 'Need Support', value: performanceStats.needsImprovement, subtitle: 'Improvement plans', color: 'amber' },
                  { label: 'Goal Progress', value: `${Math.round((performanceStats.completedGoals / performanceStats.totalGoals) * 100)}%`, subtitle: `${performanceStats.completedGoals}/${performanceStats.totalGoals} goals`, color: 'indigo' },
                  { label: 'Reviews Due', value: Math.floor(employees.length * 0.25), subtitle: 'This month', color: 'pink' }
                ].map((stat, index) => (
                  <SparkleTrail key={index}>
                    <div className="bg-gray-900/80 backdrop-blur-xl rounded-xl p-4 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-gray-500/20 hover:transform hover:translateY(-2px)">
                      <div className="text-xs text-gray-400 mb-1">{stat.label}</div>
                      <div className="text-xl font-bold text-white">{stat.value}</div>
                      {stat.change && <div className="text-xs text-emerald-400 mt-1">{stat.change}</div>}
                      {stat.progress && (
                        <div className="flex items-center mt-1">
                          <div className="w-12 h-1 bg-gray-700 rounded-full overflow-hidden">
                            <div className="h-full bg-emerald-500" style={{ width: `${stat.progress}%` }} />
                          </div>
                        </div>
                      )}
                      {stat.subtitle && <div className="text-xs text-gray-500 mt-1">{stat.subtitle}</div>}
                    </div>
                  </SparkleTrail>
                ))}
              </div>

              {/* Performance Distribution */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
                <SparkleTrail className="lg:col-span-2">
                  <div className="bg-gray-900/80 backdrop-blur-xl rounded-xl p-5 border border-gray-700 hover:border-gray-600 transition-all duration-300">
                    <h3 className="text-sm font-semibold text-white mb-4">Performance Distribution</h3>
                    <div className="space-y-3">
                      {[
                        { label: 'Exceeds Expectations', count: performanceReviews.filter(r => r.performanceStatus === 'exceeds').length, color: 'emerald' },
                        { label: 'Meets Expectations', count: performanceReviews.filter(r => r.performanceStatus === 'meets').length, color: 'blue' },
                        { label: 'Needs Improvement', count: performanceReviews.filter(r => r.performanceStatus === 'needs_improvement').length, color: 'amber' },
                        { label: 'Below Expectations', count: performanceReviews.filter(r => r.performanceStatus === 'below').length, color: 'red' }
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`w-3 h-3 rounded-full ${
                              item.color === 'emerald' ? 'bg-emerald-500' :
                              item.color === 'blue' ? 'bg-blue-500' :
                              item.color === 'amber' ? 'bg-amber-500' :
                              'bg-red-500'
                            }`} style={{ boxShadow: `0 0 10px ${
                              item.color === 'emerald' ? '#10b981' :
                              item.color === 'blue' ? '#3b82f6' :
                              item.color === 'amber' ? '#f59e0b' :
                              '#ef4444'
                            }40` }} />
                            <span className="text-xs text-gray-300">{item.label}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                              <div 
                                className={`h-full transition-all duration-500 ${
                                  item.color === 'emerald' ? 'bg-emerald-500' :
                                  item.color === 'blue' ? 'bg-blue-500' :
                                  item.color === 'amber' ? 'bg-amber-500' :
                                  'bg-red-500'
                                }`}
                                style={{ 
                                  width: `${(item.count / employees.length) * 100}%`,
                                  boxShadow: `0 0 10px ${
                                    item.color === 'emerald' ? '#10b981' :
                                    item.color === 'blue' ? '#3b82f6' :
                                    item.color === 'amber' ? '#f59e0b' :
                                    '#ef4444'
                                  }40`
                                }}
                              />
                            </div>
                            <span className="text-xs font-medium text-white w-6">{item.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </SparkleTrail>
                
                <SparkleTrail>
                  <div className="bg-gradient-to-br from-blue-900/50 to-indigo-900/50 backdrop-blur-xl rounded-xl p-5 border border-blue-700/50">
                    <h3 className="text-sm font-semibold text-white mb-4">Department Leaders</h3>
                    <div className="space-y-3">
                      {departments.slice(0, 4).map((dept, index) => {
                        const deptEmployees = filteredEmployees.filter(emp => emp.departmentId === dept.id);
                        const avgRating = deptEmployees.length > 0 
                          ? (deptEmployees.reduce((sum, emp) => sum + parseFloat(emp.overallRating || 0), 0) / deptEmployees.length).toFixed(1)
                          : '0.0';
                        
                        return (
                          <div key={dept.id} className="flex items-center justify-between bg-white/10 backdrop-blur-sm rounded-lg p-3 hover:bg-white/20 transition-all duration-300">
                            <div>
                              <div className="text-xs font-medium text-white">{dept.name}</div>
                              <div className="text-xs text-gray-400">{deptEmployees.length} employees</div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-bold text-blue-300">{avgRating}</div>
                              <div className="flex items-center">
                                {[...Array(5)].map((_, i) => (
                                  <div
                                    key={i}
                                    className={`w-2 h-2 rounded-full mr-0.5 ${
                                      i < Math.floor(avgRating) ? 'bg-blue-400' : 'bg-gray-600'
                                    }`}
                                    style={i < Math.floor(avgRating) ? { boxShadow: '0 0 4px #3b82f6' } : {}}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </SparkleTrail>
              </div>
            </>
          )}

          {activeTab === 'individual' && (
            <>
              {/* Search and Filters */}
              <SparkleTrail>
                <div className="bg-gray-900/80 backdrop-blur-xl rounded-xl p-4 border border-gray-700 mb-6">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="flex-1">
                      <input
                        type="text"
                        placeholder="Search employees..."
                        className="w-full px-3 py-2 text-xs bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-white placeholder-gray-400 transition-all duration-300"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    <select
                      className="px-3 py-2 text-xs bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all duration-300"
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                    >
                      <option value="all">All Departments</option>
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>{dept.name}</option>
                      ))}
                    </select>
                    <select
                      className="px-3 py-2 text-xs bg-gray-800/50 backdrop-blur-sm border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white transition-all duration-300"
                      value={selectedStatus}
                      onChange={(e) => setSelectedStatus(e.target.value)}
                    >
                      <option value="all">All Status</option>
                      <option value="exceeds">Exceeds</option>
                      <option value="meets">Meets</option>
                      <option value="needs_improvement">Needs Work</option>
                      <option value="below">Below</option>
                    </select>
                  </div>
                </div>
              </SparkleTrail>

              {/* Employee Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredEmployees.map((employee) => (
                  <SparkleTrail key={employee.id}>
                    <div className="bg-gray-900/80 backdrop-blur-xl rounded-xl border border-gray-700 overflow-hidden hover:border-gray-600 hover:shadow-lg hover:shadow-gray-500/20 transition-all duration-300 hover:transform hover:translateY(-2px)">
                      {/* Header */}
                      <div className="p-4 bg-gradient-to-r from-blue-900/50 to-indigo-900/50 border-b border-gray-700">
                        <div className="flex items-center space-x-3">
                          <img 
                            className="w-10 h-10 rounded-full border-2 border-blue-400 shadow-lg" 
                            src={`https://ui-avatars.com/api/?name=${employee.firstName}+${employee.lastName}&background=random`} 
                            alt={`${employee.firstName} ${employee.lastName}`} 
                            style={{ boxShadow: '0 0 15px rgba(59, 130, 246, 0.3)' }}
                          />
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-semibold text-white truncate">
                              {employee.firstName} {employee.lastName}
                            </h3>
                            <p className="text-xs text-gray-400">{employee.employeeId}</p>
                          </div>
                          <StatusIndicator status={employee.performanceStatus} />
                        </div>
                      </div>

                      {/* Performance Metrics */}
                      <div className="p-4">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-xs text-gray-400">Overall Rating</span>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg font-bold text-white">{employee.overallRating}</span>
                            <div className="flex space-x-0.5">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-2 h-2 rounded-full ${
                                    i < Math.floor(employee.overallRating) ? 'bg-blue-400' : 'bg-gray-600'
                                  }`}
                                  style={i < Math.floor(employee.overallRating) ? { boxShadow: '0 0 4px #3b82f6' } : {}}
                                />
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Performance Areas */}
                        <div className="space-y-2 mb-4">
                          {[
                            { label: 'Productivity', value: employee.productivity, color: 'blue' },
                            { label: 'Teamwork', value: employee.teamwork, color: 'emerald' },
                            { label: 'Communication', value: employee.communication, color: 'purple' }
                          ].map((metric, index) => (
                            <div key={index} className="flex items-center justify-between">
                              <span className="text-xs text-gray-300">{metric.label}</span>
                              <div className="flex items-center space-x-2">
                                <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                  <div 
                                    className={`h-full transition-all duration-300 ${
                                      metric.color === 'blue' ? 'bg-blue-500' :
                                      metric.color === 'emerald' ? 'bg-emerald-500' :
                                      'bg-purple-500'
                                    }`}
                                    style={{ 
                                      width: `${metric.value}%`,
                                      boxShadow: `0 0 10px ${
                                        metric.color === 'blue' ? '#3b82f6' :
                                        metric.color === 'emerald' ? '#10b981' :
                                        '#8b5cf6'
                                      }40`
                                    }}
                                  />
                                </div>
                                <span className="text-xs font-medium text-gray-300 w-8">{metric.value}%</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Goals Progress */}
                        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-3 mb-3">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-gray-300">Goals Progress</span>
                            <span className="text-xs text-gray-400">
                              {employee.goals?.filter(g => g.status === 'completed').length || 0}/{employee.goals?.length || 0}
                            </span>
                          </div>
                          <div className="space-y-1">
                            {employee.goals?.slice(0, 2).map((goal, index) => (
                              <div key={goal.id} className="flex items-center space-x-2">
                                <div className={`w-2 h-2 rounded-full ${goal.status === 'completed' ? 'bg-emerald-500' : 'bg-amber-500'}`} 
                                     style={{ boxShadow: `0 0 6px ${goal.status === 'completed' ? '#10b981' : '#f59e0b'}60` }} />
                                <span className="text-xs text-gray-300 truncate flex-1">{goal.name}</span>
                                <span className="text-xs text-gray-400">{goal.progress || 0}%</span>
                              </div>
                            )) || <span className="text-xs text-gray-500">No goals set</span>}
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-2">
                          <SparkleTrail className="flex-1">
                            <button 
                              className="w-full px-3 py-2 text-xs font-medium text-gray-300 bg-gray-800/50 backdrop-blur-sm rounded-lg hover:bg-gray-700/50 hover:text-white transition-all duration-300"
                              onClick={() => toggleEmployeeDetails(employee.id)}
                            >
                              View Details
                            </button>
                          </SparkleTrail>
                          <SparkleTrail>
                            <button className="px-3 py-2 text-xs font-medium text-blue-300 bg-blue-600/20 rounded-lg hover:bg-blue-600/30 hover:text-blue-200 transition-all duration-300">
                              Review
                            </button>
                          </SparkleTrail>
                        </div>
                      </div>

                      {/* Expanded Details */}
                      {expandedEmployee === employee.id && (
                        <div className="border-t border-gray-700 bg-gray-800/30 backdrop-blur-sm">
                          <div className="p-4">
                            {/* Performance Chart */}
                            <div className="mb-4">
                              <PerformanceChart 
                                data={employee.monthlyPerformance || []} 
                                title="6-Month Performance Trend"
                              />
                            </div>

                            {/* Skills */}
                            <div className="mb-4">
                              <h4 className="text-xs font-medium text-gray-300 mb-2">Skills Assessment</h4>
                              <div className="grid grid-cols-2 gap-2">
                                {employee.skills?.slice(0, 4).map((skill, index) => (
                                  <div key={skill.id} className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-2">
                                    <div className="flex items-center justify-between mb-1">
                                      <span className="text-xs text-gray-300">{skill.name}</span>
                                      <CircularProgress percentage={(skill.rating / 5) * 100} size={24} />
                                    </div>
                                  </div>
                                )) || <span className="text-xs text-gray-500">No skills assessed</span>}
                              </div>
                            </div>

                            {/* Recent Feedback */}
                            <div>
                              <h4 className="text-xs font-medium text-gray-300 mb-2">Recent Feedback</h4>
                              <div className="space-y-2">
                                {employee.feedback?.slice(0, 2).map((feedback, index) => (
                                  <div key={feedback.id} className={`p-2 rounded-lg border-l-2 backdrop-blur-sm ${
                                    feedback.type === 'positive' 
                                      ? 'bg-emerald-500/10 border-emerald-500' 
                                      : 'bg-amber-500/10 border-amber-500'
                                  }`}>
                                    <p className="text-xs text-gray-300 mb-1">"{feedback.comment}"</p>
                                    <p className="text-xs text-gray-400">— {feedback.from}</p>
                                  </div>
                                )) || <span className="text-xs text-gray-500">No recent feedback</span>}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </SparkleTrail>
                ))}
              </div>
            </>
          )}

          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Trends */}
              {/* <SparkleTrail> */}
                <div className="bg-gray-900/80 backdrop-blur-xl rounded-xl p-5 border border-gray-700 hover:border-gray-600 transition-all duration-300">
                  <h3 className="text-sm font-semibold text-white mb-4">Department Performance Comparison</h3>
                  <div className="space-y-4">
                    {departments.map((dept) => {
                      const deptEmployees = filteredEmployees.filter(emp => emp.departmentId === dept.id);
                      const avgRating = deptEmployees.length > 0 
                        ? (deptEmployees.reduce((sum, emp) => sum + parseFloat(emp.overallRating || 0), 0) / deptEmployees.length)
                        : 0;
                      
                      return (
                        <div key={dept.id} className="flex items-center space-x-4">
                          <div className="w-20 text-xs text-gray-300 truncate">{dept.name}</div>
                          <div className="flex-1 bg-gray-700 rounded-full h-2">
                            <div 
                              className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-500"
                              style={{ 
                                width: `${(avgRating / 5) * 100}%`,
                                boxShadow: '0 0 10px rgba(59, 130, 246, 0.4)'
                              }}
                            />
                          </div>
                          <div className="text-xs font-medium text-white w-8">{avgRating.toFixed(1)}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              {/* </SparkleTrail> */}

              {/* Goal Completion Rates */}
              {/* <SparkleTrail> */}
                <div className="bg-gray-900/80 backdrop-blur-xl rounded-xl p-5 border border-gray-700 hover:border-gray-600 transition-all duration-300">
                  <h3 className="text-sm font-semibold text-white mb-4">Goal Completion Rates</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {departments.slice(0, 4).map((dept) => {
                      const deptEmployees = filteredEmployees.filter(emp => emp.departmentId === dept.id);
                      const totalGoals = deptEmployees.reduce((sum, emp) => sum + (emp.goals?.length || 0), 0);
                      const completedGoals = deptEmployees.reduce((sum, emp) => sum + (emp.goals?.filter(g => g.status === 'completed').length || 0), 0);
                      const completionRate = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

                      return (
                        <div key={dept.id} className="text-center">
                          <CircularProgress percentage={completionRate} size={60} />
                          <div className="mt-2">
                            <div className="text-xs font-medium text-white">{dept.name}</div>
                            <div className="text-xs text-gray-400">{completedGoals}/{totalGoals} goals</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              {/* </SparkleTrail> */}

              {/* Performance Metrics Overview */}
              <div className="lg:col-span-2">
                {/* <SparkleTrail> */}
                  <div className="bg-gray-900/80 backdrop-blur-xl rounded-xl p-5 border border-gray-700 hover:border-gray-600 transition-all duration-300">
                    <h3 className="text-sm font-semibold text-white mb-4">Performance Metrics Overview</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                      {[
                        { 
                          label: 'Avg Productivity', 
                          value: Math.round(filteredEmployees.reduce((sum, emp) => sum + (emp.productivity || 0), 0) / filteredEmployees.length), 
                          color: 'blue',
                          bg: 'from-blue-900/50 to-blue-800/50',
                          border: 'border-blue-700/50'
                        },
                        { 
                          label: 'Avg Teamwork', 
                          value: Math.round(filteredEmployees.reduce((sum, emp) => sum + (emp.teamwork || 0), 0) / filteredEmployees.length), 
                          color: 'emerald',
                          bg: 'from-emerald-900/50 to-emerald-800/50',
                          border: 'border-emerald-700/50'
                        },
                        { 
                          label: 'Avg Communication', 
                          value: Math.round(filteredEmployees.reduce((sum, emp) => sum + (emp.communication || 0), 0) / filteredEmployees.length), 
                          color: 'purple',
                          bg: 'from-purple-900/50 to-purple-800/50',
                          border: 'border-purple-700/50'
                        },
                        { 
                          label: 'Avg Attendance', 
                          value: Math.round(filteredEmployees.reduce((sum, emp) => sum + (emp.attendance || 0), 0) / filteredEmployees.length), 
                          color: 'amber',
                          bg: 'from-amber-900/50 to-amber-800/50',
                          border: 'border-amber-700/50'
                        }
                      ].map((metric, index) => (
                        <div key={index} className={`bg-gradient-to-br ${metric.bg} backdrop-blur-xl rounded-xl p-4 border ${metric.border} hover:scale-105 transition-all duration-300`}>
                          <div className="text-center">
                            <CircularProgress percentage={metric.value} size={50} color={metric.color} />
                            <div className="mt-2">
                              <div className="text-xs font-medium text-white">{metric.label}</div>
                              <div className="text-xs text-gray-400">{metric.value}% average</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                {/* </SparkleTrail> */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeePerformance;
