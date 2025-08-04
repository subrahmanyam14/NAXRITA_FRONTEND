import React, { useState, useEffect, useRef } from 'react';
import { 
  User, MapPin, Phone, Mail, Briefcase, Calendar, 
  Edit3, Upload, Download, Trash2, Eye, Plus,
  Home, Settings, LogOut, FileText, Star, TrendingUp,
  Award, Target, Clock, Users, Activity, Building2,
  BarChart3, PieChart, LineChart, Zap, CheckCircle,
  ChevronLeft, ChevronRight, Menu, X
} from 'lucide-react';

const EmployeeProfile = () => {
  const [activeTab, setActiveTab] = useState('summary');
  const [profileData, setProfileData] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselRef = useRef(null);

  // Animated Background Component
  const CosmicBackground = () => (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Starfield */}
      <div className="absolute inset-0">
        {[...Array(150)].map((_, i) => (
          <div
            key={`star-${i}`}
            className="absolute animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              backgroundColor: ['#ffffff', '#2563eb', '#a3a3a3', '#6b7280'][Math.floor(Math.random() * 4)],
              opacity: Math.random() * 0.6 + 0.2,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>
      
      {/* Sparkles */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              backgroundColor: ['#2563eb', '#22c55e', '#f59e0b', '#ffffff'][Math.floor(Math.random() * 4)],
              borderRadius: '50%',
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: '8s'
            }}
          />
        ))}
      </div>

      {/* Animated Dots */}
      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => (
          <div
            key={`dot-${i}`}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              backgroundColor: ['rgba(37, 99, 235, 0.3)', 'rgba(163, 163, 163, 0.2)', 'rgba(107, 114, 128, 0.1)'][Math.floor(Math.random() * 3)],
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: '4s'
            }}
          />
        ))}
      </div>
    </div>
  );

  // Sidebar Component
  const Sidebar = () => (
    <div 
      className={`fixed left-0 top-0 h-full bg-gray-900 border-r border-gray-800 transition-all duration-300 z-50 ${
        sidebarCollapsed ? 'w-20' : 'w-70'
      }`}
      style={{
        background: '#111111',
        backdropFilter: 'blur(10px)'
      }}
    >
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div className={`flex items-center space-x-3 ${sidebarCollapsed ? 'hidden' : ''}`}>
            <img 
              src="https://naxrita.com/wp-content/uploads/2024/10/logo-t.png" 
              alt="naxrita" 
              className="h-8 w-auto"
            />
            <span className="text-white text-lg font-medium" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
              naxrita
            </span>
          </div>
          <button 
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Menu className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <nav className="space-y-2">
          {[
            { icon: Home, label: 'Dashboard', active: false },
            { icon: User, label: 'Profile', active: true },
            { icon: Users, label: 'Team', active: false },
            { icon: BarChart3, label: 'Analytics', active: false },
            { icon: FileText, label: 'Documents', active: false },
            { icon: Settings, label: 'Settings', active: false }
          ].map((item, index) => (
            <div
              key={index}
              className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                item.active 
                  ? 'bg-blue-600 text-white shadow-lg' 
                  : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
              style={{
                backdropFilter: 'blur(8px)',
                boxShadow: item.active ? '0 0 20px rgba(59, 130, 246, 0.3)' : 'none'
              }}
            >
              <item.icon className="h-5 w-5" />
              {!sidebarCollapsed && (
                <span style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '14px' }}>
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </nav>
      </div>
    </div>
  );

  // Header Component
  const Header = () => (
    <div 
      className="fixed top-0 right-0 h-18 border-b border-gray-800 z-40"
      style={{
        left: sidebarCollapsed ? '80px' : '280px',
        background: '#0a0a0a',
        backdropFilter: 'blur(10px)'
      }}
    >
      <div className="flex items-center justify-between h-full px-8">
        <div>
          <h1 className="text-white text-xl font-medium" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}>
            Employee Profile
          </h1>
          <p className="text-gray-400 text-sm">Manage employee information and analytics</p>
        </div>
        <div className="flex items-center space-x-4">
          <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
            <Settings className="h-5 w-5 text-gray-400" />
          </button>
          <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
            <LogOut className="h-5 w-5 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );

  // Auto Carousel Component
  const AutoCarousel = ({ items, title }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }, 5000);
      return () => clearInterval(interval);
    }, [items.length]);

    const nextSlide = () => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    };

    const prevSlide = () => {
      setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
    };

    return (
      <div 
        className="relative rounded-xl p-6 border border-gray-700"
        style={{
          background: '#1e1e1e',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.8)'
        }}
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-medium" style={{ fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: '16px' }}>
            {title}
          </h3>
          <div className="flex space-x-2">
            <button 
              onClick={prevSlide}
              className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
              style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' }}
            >
              <ChevronLeft className="h-4 w-4 text-white" />
            </button>
            <button 
              onClick={nextSlide}
              className="p-2 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors"
              style={{ boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' }}
            >
              <ChevronRight className="h-4 w-4 text-white" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {items.map((item, index) => (
              <div key={index} className="w-full flex-shrink-0">
                <div className="p-4 rounded-lg bg-gray-800 border border-gray-700">
                  <h4 className="text-white font-medium mb-2" style={{ fontSize: '14px' }}>
                    {item.title}
                  </h4>
                  <p className="text-gray-400 text-sm mb-3">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-blue-400 text-xs">{item.date}</span>
                    <div className="flex space-x-1">
                      {items.map((_, i) => (
                        <div 
                          key={i}
                          className={`w-2 h-2 rounded-full transition-colors ${
                            i === currentIndex ? 'bg-blue-600' : 'bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  // Dummy data with carousel items
  const dummyProfileData = {
    id: 'EMP001',
    name: 'John Anderson',
    email: 'john.anderson@company.com',
    phone: '+91 96524 26808',
    address: '123 Business Street, Tech City, TC 12345',
    location: 'Hyderabad, HDC2A',
    profilePic: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    joinDate: '2022-03-15',
    role: 'Packaged App Development Team Lead',
    department: 'Engineering',
    manager: 'Jyoti Ranjan Panda',
    peoplelead: 'Anurag Pramod Joshi',
    skills: ['Agile Project Delivery', 'Application Architecture', 'ALM', 'AJAX', 'Configuration Management', 'Release Management'],
    jobDescription: 'Responsible for developing and maintaining web applications using modern technologies.',
    contractType: 'Full-time Permanent',
    salary: '$85,000',
    workingUnder: 'Development Team Alpha',
    projects: ['E-commerce Platform', 'Mobile App Backend', 'Analytics Dashboard'],
    birthday: 'Monday, 11 August',
    supervisoryOrg: 'Accenture (Julie Sweet) >> CRTS-EMEAICEGPRDS101 (Jyoti Ranjan Panda)',
    businessTitle: 'Packaged App Development Team Lead',
    jobProfile: 'Packaged App Development Team Lead',
    jobFamily: 'Software Engineering > Packaged Application Development',
    managementLevel: '9-Team Lead/Consultant',
    timeType: 'Full time',
    performance: {
      overall: 94,
      technical: 96,
      leadership: 92,
      communication: 90
    },
    goals: {
      completed: 8,
      total: 10,
      progress: 80
    },
    productivity: {
      efficiency: 94,
      weeklyHours: 42,
      projectsDelivered: 15
    },
    announcements: [
      {
        title: "Q4 Performance Review Complete",
        description: "Exceeded expectations in technical leadership and project delivery.",
        date: "2 days ago"
      },
      {
        title: "AWS Certification Achieved",
        description: "Successfully completed AWS Solutions Architect certification.",
        date: "1 week ago"
      },
      {
        title: "Team Lead Promotion",
        description: "Promoted to Packaged App Development Team Lead position.",
        date: "2 weeks ago"
      }
    ]
  };

  useEffect(() => {
    fetchProfileData();
    fetchDocuments();
  }, []);

  const fetchProfileData = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProfileData(dummyProfileData);
    } catch (error) {
      setProfileData(dummyProfileData);
    } finally {
      setLoading(false);
    }
  };

  const fetchDocuments = async () => {
    try {
      // Simulate API call
    } catch (error) {
      // Handle error
    }
  };

  // Progress Bar Component
  const ProgressBar = ({ value, max = 100, color = "blue", size = "md" }) => {
    const percentage = (value / max) * 100;
    const sizeClasses = {
      sm: "h-1.5",
      md: "h-2", 
      lg: "h-3"
    };
    
    const colorClasses = {
      blue: "bg-blue-500",
      green: "bg-green-500",
      purple: "bg-purple-500",
      amber: "bg-amber-500"
    };
    
    return (
      <div className="w-full">
        <div className={`w-full bg-gray-700 rounded-full ${sizeClasses[size]}`}>
          <div 
            className={`${colorClasses[color]} ${sizeClasses[size]} rounded-full transition-all duration-500 ease-out`}
            style={{ 
              width: `${percentage}%`,
              boxShadow: `0 0 10px ${color === 'blue' ? 'rgba(59, 130, 246, 0.3)' : 
                         color === 'green' ? 'rgba(34, 197, 94, 0.3)' : 
                         color === 'purple' ? 'rgba(147, 51, 234, 0.3)' : 
                         'rgba(245, 158, 11, 0.3)'}`
            }}
          ></div>
        </div>
      </div>
    );
  };

  // Circular Progress Component
  const CircularProgress = ({ value, max = 100, size = 60, strokeWidth = 4, color = "#3b82f6" }) => {
    const percentage = (value / max) * 100;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#374151"
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
            className="transition-all duration-700 ease-out"
            style={{
              filter: `drop-shadow(0 0 6px ${color}40)`
            }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span 
            className="font-normal text-white" 
            style={{ fontSize: '12px', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            {value}%
          </span>
        </div>
      </div>
    );
  };

  // Rating Stars Component
  const StarRating = ({ rating, maxRating = 5 }) => {
    return (
      <div className="flex items-center space-x-0.5">
        {[...Array(maxRating)].map((_, index) => (
          <Star
            key={index}
            className={`h-3 w-3 ${
              index < rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-600'
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div 
        className="flex items-center justify-center min-h-screen"
        style={{ background: '#0a0a0a' }}
      >
        <CosmicBackground />
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const SummaryPage = () => (
    <div 
      className="min-h-screen"
      style={{ background: '#0a0a0a', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
    >
      <CosmicBackground />
      {/* <Sidebar /> */}
      <Header />
      
      <div 
        className="transition-all duration-300 pt-18"
        // style={{
        //   marginLeft: sidebarCollapsed ? '80px' : '280px',
        //   paddingTop: '90px'
        // }}
      >
        <div className="max-w-8xl mx-auto p-8">
          {/* Header Section with Enhanced Styling */}
          <div 
            className="rounded-xl p-8 mb-8 border border-gray-800 relative overflow-hidden"
            style={{
              background: '#1a1a1a',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.8)'
            }}
          >
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center space-x-6">
                <div 
                  className="h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-md"
                  style={{
                    background: 'rgb(0, 73, 184)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.6)'
                  }}
                 
                >
                  <User className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1 
                    className="text-white mb-1" 
                    style={{ fontSize: '30px', fontWeight: '300', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    {profileData.name}
                  </h1>
                  <p 
                    className="text-gray-400 font-normal"
                    style={{ fontSize: '14px' }}
                  >
                    {profileData.role}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-6">
                <div className="text-right">
                  <p className="text-gray-400 mb-1" style={{ fontSize: '12px' }}>Employee ID</p>
                  <p className="text-white font-normal" style={{ fontSize: '14px' }}>{profileData.id}</p>
                </div>
                {/* <button 
                  className="p-3 rounded-xl transition-all duration-200 hover:scale-105"
                  style={{
                    background: 'rgba(255, 255, 255, 0.1)',
                    backdropFilter: 'blur(10px)',
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.2)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.2)';
                    e.target.style.boxShadow = '0 0 30px rgba(59, 130, 246, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255, 255, 255, 0.1)';
                    e.target.style.boxShadow = '0 0 20px rgba(59, 130, 246, 0.2)';
                  }}
                >
                  <Edit3 className="h-5 w-5 text-white" />
                </button> */}
              </div>
            </div>
          </div>

          {/* Auto Carousel for Announcements */}
          <div className="mb-8">
            <AutoCarousel 
              items={profileData.announcements}
              title="Recent Announcements"
            />
          </div>

          {/* Performance Dashboard Cards */}
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            {[
              {
                icon: TrendingUp,
                title: "Overall",
                value: profileData.performance.overall,
                label: "Performance",
                color: "#10b981",
                iconColor: "text-green-500"
              },
              {
                icon: Target,
                title: "Goals",
                value: `${profileData.goals.completed}/${profileData.goals.total}`,
                label: "Completed",
                progress: profileData.goals.progress,
                color: "#3b82f6",
                iconColor: "text-blue-500"
              },
              {
                icon: Zap,
                title: "Efficiency",
                value: `${profileData.productivity.efficiency}%`,
                label: "Productivity",
                progress: profileData.productivity.efficiency,
                color: "#8b5cf6",
                iconColor: "text-purple-500"
              },
              {
                icon: Users,
                title: "Team",
                value: "12",
                label: "Members",
                rating: 5,
                color: "#f59e0b",
                iconColor: "text-amber-500"
              },
              {
                icon: CheckCircle,
                title: "Projects",
                value: profileData.productivity.projectsDelivered,
                label: "Delivered",
                color: "#22c55e",
                iconColor: "text-green-500"
              }
            ].map((item, index) => (
              <div 
                key={index}
                className="rounded-xl p-6 border border-gray-700 hover:border-gray-600 transition-all duration-300 hover:scale-105 cursor-pointer group"
                style={{
                  background: '#1e1e1e',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.8)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.9), 0 0 20px rgba(59, 130, 246, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.8)';
                }}
              >
                <div className="flex items-center justify-between mb-4">
                  <item.icon className={`h-5 w-5 ${item.iconColor}`} />
                  <span className="text-gray-400" style={{ fontSize: '12px' }}>{item.title}</span>
                </div>
                <div className="flex items-center justify-center mb-2">
                  {typeof item.value === 'number' ? (
                    <CircularProgress value={item.value} color={item.color} size={50} />
                  ) : item.progress ? (
                    <div className="text-center">
                      <p className="text-lg font-normal mb-2" style={{ color: item.color }}>
                        {item.value}
                      </p>
                      <ProgressBar value={item.progress} color={item.color.includes('blue') ? 'blue' : item.color.includes('purple') ? 'purple' : 'green'} size="sm" />
                    </div>
                  ) : item.rating ? (
                    <div className="text-center">
                      <p className="text-lg font-normal mb-2" style={{ color: item.color }}>
                        {item.value}
                      </p>
                      <StarRating rating={item.rating} />
                    </div>
                  ) : (
                    <p className="text-lg font-normal" style={{ color: item.color }}>
                      {item.value}
                    </p>
                  )}
                </div>
                <p className="text-center text-gray-400 font-normal" style={{ fontSize: '12px' }}>
                  {item.label}
                </p>
              </div>
            ))}
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Personal Details Column */}
            <div className="space-y-6">
              <div 
                className="rounded-xl p-6 border border-gray-700"
                style={{
                  background: '#1e1e1e',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.8)'
                }}
              >
                <h3 className="text-white font-normal mb-4 flex items-center" style={{ fontSize: '16px' }}>
                  <User className="h-4 w-4 mr-2 text-blue-500" />
                  Personal Details
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Birthday", value: profileData.birthday },
                    { label: "Phone", value: profileData.phone, clickable: true },
                    { label: "Location", value: profileData.location, clickable: true }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-400" style={{ fontSize: '12px' }}>{item.label}</span>
                      <span 
                        className={`font-normal cursor-pointer ${item.clickable ? 'text-blue-400 hover:text-blue-300' : 'text-white'}`}
                        style={{ fontSize: '12px' }}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Section */}
              <div 
                className="rounded-xl p-6 border border-gray-700"
                style={{
                  background: '#1e1e1e',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.8)'
                }}
              >
                <h3 className="text-white font-normal mb-4 flex items-center" style={{ fontSize: '16px' }}>
                  <Target className="h-4 w-4 mr-2 text-green-500" />
                  Skills & Expertise
                </h3>
                <div className="space-y-3">
                  {profileData.skills.slice(0, 4).map((skill, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-300 font-normal" style={{ fontSize: '12px' }}>{skill}</span>
                        <span className="text-gray-400" style={{ fontSize: '12px' }}>{85 + (idx * 3)}%</span>
                      </div>
                      <ProgressBar value={85 + (idx * 3)} color="green" size="sm" />
                    </div>
                  ))}
                </div>
                <button className="text-blue-400 mt-4 hover:text-blue-300 font-normal transition-colors" style={{ fontSize: '12px' }}>
                  View All Skills →
                </button>
              </div>
            </div>

            {/* Center Column - Job Information */}
            <div className="space-y-6">
              <div 
                className="rounded-xl p-6 border border-gray-700"
                style={{
                  background: '#1e1e1e',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.8)'
                }}
              >
                <h3 className="text-white font-normal mb-4 flex items-center" style={{ fontSize: '16px' }}>
                  <Briefcase className="h-4 w-4 mr-2 text-blue-500" />
                  Job Information
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Position", value: profileData.role },
                    { label: "Department", value: profileData.department },
                    { label: "Level", value: "Team Lead", clickable: true },
                    { label: "Type", value: profileData.timeType },
                    { label: "Join Date", value: "March 2022" },
                    { label: "Experience", value: "2y 5m", highlight: true }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-400" style={{ fontSize: '12px' }}>{item.label}</span>
                      <span 
                        className={`font-normal ${
                          item.clickable ? 'text-blue-400 hover:text-blue-300 cursor-pointer' : 
                          item.highlight ? 'text-green-400' : 'text-white'
                        }`}
                        style={{ fontSize: '12px' }}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              <div 
                className="rounded-xl p-6 border border-gray-700"
                style={{
                  background: '#1e1e1e',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.8)'
                }}
              >
                <h3 className="text-white font-normal mb-4 flex items-center" style={{ fontSize: '16px' }}>
                  <BarChart3 className="h-4 w-4 mr-2 text-purple-500" />
                  Performance Metrics
                </h3>
                <div className="space-y-4">
                  {[
                    { label: "Technical Skills", value: profileData.performance.technical, color: "#8b5cf6" },
                    { label: "Leadership", value: profileData.performance.leadership, color: "#f59e0b" },
                    { label: "Communication", value: profileData.performance.communication, color: "#10b981" }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-400" style={{ fontSize: '12px' }}>{item.label}</span>
                      <div className="flex items-center space-x-2">
                        <CircularProgress value={item.value} size={30} strokeWidth={3} color={item.color} />
                        <span className="text-white font-normal" style={{ fontSize: '12px' }}>{item.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Analytics & Activities */}
            <div className="space-y-6">
              <div 
                className="rounded-xl p-6 border border-gray-700"
                style={{
                  background: '#1e1e1e',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.8)'
                }}
              >
                <h3 className="text-white font-normal mb-4 flex items-center" style={{ fontSize: '16px' }}>
                  <Activity className="h-4 w-4 mr-2 text-red-500" />
                  Recent Activities
                </h3>
                <div className="space-y-3">
                  {[
                    { title: "React Training Completed", time: "2 days ago", color: "blue", icon: CheckCircle },
                    { title: "Project v2.0 Delivered", time: "1 week ago", color: "green", icon: TrendingUp },
                    { title: "Leadership Workshop", time: "2 weeks ago", color: "purple", icon: Award }
                  ].map((activity, index) => (
                    <div 
                      key={index}
                      className="flex items-start space-x-3 p-3 rounded-lg border border-gray-700"
                      style={{ background: `rgba(${activity.color === 'blue' ? '59, 130, 246' : activity.color === 'green' ? '34, 197, 94' : '147, 51, 234'}, 0.1)` }}
                    >
                      <div 
                        className="w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0"
                        style={{ backgroundColor: activity.color === 'blue' ? '#3b82f6' : activity.color === 'green' ? '#22c55e' : '#9333ea' }}
                      ></div>
                      <div className="flex-1">
                        <p className="text-white font-normal mb-1" style={{ fontSize: '12px' }}>{activity.title}</p>
                        <p className="text-gray-400" style={{ fontSize: '10px' }}>{activity.time}</p>
                      </div>
                      <activity.icon className={`h-3 w-3 ${activity.color === 'blue' ? 'text-blue-500' : activity.color === 'green' ? 'text-green-500' : 'text-purple-500'}`} />
                    </div>
                  ))}
                </div>
                <button className="text-blue-400 mt-3 hover:text-blue-300 font-normal transition-colors" style={{ fontSize: '12px' }}>
                  View All Activities →
                </button>
              </div>

              {/* Goal Progress */}
              <div 
                className="rounded-xl p-6 border border-gray-700"
                style={{
                  background: '#1e1e1e',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.8)'
                }}
              >
                <h3 className="text-white font-normal mb-4 flex items-center" style={{ fontSize: '16px' }}>
                  <Target className="h-4 w-4 mr-2 text-blue-500" />
                  Goal Progress
                </h3>
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="flex justify-center mb-2">
                      <CircularProgress value={profileData.goals.progress} size={60} strokeWidth={5} color="#3b82f6" />
                    </div>
                    <p className="text-gray-400" style={{ fontSize: '12px' }}>Annual Goals</p>
                    <p className="text-blue-400 font-normal" style={{ fontSize: '12px' }}>
                      {profileData.goals.completed} of {profileData.goals.total} completed
                    </p>
                  </div>
                  {[
                    { label: "Q4 Objectives", progress: 90, color: "green" },
                    { label: "Development Goals", progress: 75, color: "blue" },
                    { label: "Leadership Tasks", progress: 85, color: "purple" }
                  ].map((goal, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-gray-400" style={{ fontSize: '12px' }}>{goal.label}</span>
                      <div className="flex items-center space-x-1">
                        <div className="w-16">
                          <ProgressBar value={goal.progress} color={goal.color} size="sm" />
                        </div>
                        <span 
                          className={`font-normal ${goal.color === 'green' ? 'text-green-400' : goal.color === 'blue' ? 'text-blue-400' : 'text-purple-400'}`}
                          style={{ fontSize: '12px' }}
                        >
                          {goal.progress}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return <SummaryPage />;
};

export default EmployeeProfile;
