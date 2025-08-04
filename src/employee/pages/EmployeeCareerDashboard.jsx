import {
  AlertCircle,
  Building2,
  Calendar,
  GraduationCap,
  MapPin,
  Plus,
  Search,
  Star,
  Target,
  TrendingUp,
  User,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';

const EmployeeCareerDashboard = () => {
const [activeTab, setActiveTab] = useState('opportunities');
const [searchTerm, setSearchTerm] = useState('');
const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
const [isPaused, setIsPaused] = useState(false);
const canvasRef = useRef(null);
const sparkleCanvasRef = useRef(null);

// Cosmic background animation
useEffect(() => {
  const canvas = canvasRef.current;
  const sparkleCanvas = sparkleCanvasRef.current;
  if (!canvas || !sparkleCanvas) return;

  const ctx = canvas.getContext('2d');
  const sparkleCtx = sparkleCanvas.getContext('2d');
  
  // Set canvas size
  const resizeCanvas = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    sparkleCanvas.width = window.innerWidth;
    sparkleCanvas.height = window.innerHeight;
  };
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  // Stars animation
  const stars = Array.from({ length: 150 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 3 + 1,
    opacity: Math.random() * 0.6 + 0.2,
    twinkleSpeed: Math.random() * 0.02 + 0.01,
    color: ['#ffffff', '#2563eb', '#a3a3a3', '#6b7280'][Math.floor(Math.random() * 4)]
  }));

  // Sparkles animation
  const sparkles = Array.from({ length: 25 }, () => ({
    x: Math.random() * sparkleCanvas.width,
    y: Math.random() * sparkleCanvas.height,
    size: Math.random() * 4 + 2,
    opacity: Math.random(),
    speed: Math.random() * 2 + 1,
    color: ['#2563eb', '#22c55e', '#f59e0b', '#ffffff'][Math.floor(Math.random() * 4)]
  }));

  let animationId;
  const animate = () => {
    // Clear canvases
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    sparkleCtx.clearRect(0, 0, sparkleCanvas.width, sparkleCanvas.height);

    // Draw stars
    stars.forEach(star => {
      ctx.save();
      ctx.globalAlpha = star.opacity;
      ctx.fillStyle = star.color;
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Twinkle effect
      star.opacity += star.twinkleSpeed;
      if (star.opacity > 0.8 || star.opacity < 0.2) {
        star.twinkleSpeed *= -1;
      }
    });

    // Draw sparkles
    sparkles.forEach(sparkle => {
      sparkleCtx.save();
      sparkleCtx.globalAlpha = sparkle.opacity;
      sparkleCtx.fillStyle = sparkle.color;
      sparkleCtx.beginPath();
      sparkleCtx.arc(sparkle.x, sparkle.y, sparkle.size, 0, Math.PI * 2);
      sparkleCtx.fill();
      sparkleCtx.restore();

      // Float upward
      sparkle.y -= sparkle.speed;
      sparkle.opacity *= 0.998;

      // Reset sparkle when it reaches top
      if (sparkle.y < 0 || sparkle.opacity < 0.1) {
        sparkle.x = Math.random() * sparkleCanvas.width;
        sparkle.y = sparkleCanvas.height;
        sparkle.opacity = Math.random();
      }
    });

    animationId = requestAnimationFrame(animate);
  };

  animate();

  return () => {
    window.removeEventListener('resize', resizeCanvas);
    cancelAnimationFrame(animationId);
  };
}, []);

// Auto-carousel for announcements
const announcements = [
  {
    title: "New Leadership Program Opening",
    description: "Applications now open for Q4 leadership development program",
    type: "Training",
    deadline: "Aug 15, 2025"
  },
  {
    title: "Q3 Performance Reviews",
    description: "Schedule your performance review meetings by August 20th",
    type: "Important",
    deadline: "Aug 20, 2025"
  },
  {
    title: "Company All-Hands Meeting",
    description: "Join us for the quarterly company update on August 25th",
    type: "Event",
    deadline: "Aug 25, 2025"
  }
];

useEffect(() => {
  if (!isPaused) {
    const interval = setInterval(() => {
      setCurrentAnnouncementIndex((prev) => 
        (prev + 1) % announcements.length
      );
    }, 5000);
    return () => clearInterval(interval);
  }
}, [isPaused, announcements.length]);

// Employee profile data
const employeeProfile = {
  name: 'Sarah Johnson',
  currentRole: 'Senior Marketing Specialist',
  department: 'Marketing',
  employeeId: 'EMP-2024-1547',
  joinDate: 'March 2022',
  location: 'New York, NY',
  manager: 'David Chen'
};

// Career progress data
const careerProgress = {
  currentLevel: 'Level 4',
  nextLevel: 'Level 5 - Marketing Manager',
  progressPercentage: 65,
  skillsCompleted: 8,
  skillsRequired: 12,
  performanceRating: 4.2
};

// Internal job opportunities
const internalOpportunities = [
  {
    id: 1,
    title: 'Marketing Manager',
    department: 'Marketing',
    location: 'New York, NY',
    level: 'Level 5',
    type: 'Promotion',
    match: 85,
    requirements: ['3+ years marketing experience', 'Team leadership', 'Campaign management'],
    openings: 1,
    deadline: '2025-08-15',
    status: 'Open',
    hiringManager: 'Jennifer Walsh'
  },
  {
    id: 2,
    title: 'Product Marketing Lead',
    department: 'Product',
    location: 'San Francisco, CA',
    level: 'Level 5',
    type: 'Lateral Move',
    match: 72,
    requirements: ['Product marketing experience', 'Go-to-market strategy', 'Analytics'],
    openings: 2,
    deadline: '2025-08-20',
    status: 'Open',
    hiringManager: 'Michael Torres'
  },
  {
    id: 3,
    title: 'Digital Marketing Specialist',
    department: 'Marketing',
    location: 'Remote',
    level: 'Level 4',
    type: 'Lateral Move',
    match: 90,
    requirements: ['Digital marketing', 'SEO/SEM', 'Social media'],
    openings: 1,
    deadline: '2025-08-10',
    status: 'Closing Soon',
    hiringManager: 'Lisa Park'
  },
  {
    id: 4,
    title: 'Brand Strategy Manager',
    department: 'Marketing',
    location: 'Chicago, IL',
    level: 'Level 5',
    type: 'Promotion',
    match: 78,
    requirements: ['Brand management', 'Strategic thinking', 'Creative direction'],
    openings: 1,
    deadline: '2025-08-25',
    status: 'Open',
    hiringManager: 'Robert Kim'
  }
];

// Learning and development opportunities
const learningOpportunities = [
  {
    id: 1,
    title: 'Leadership Essentials Program',
    type: 'Internal Training',
    duration: '6 weeks',
    format: 'Virtual',
    nextStart: '2025-08-15',
    spots: 12,
    enrolled: 8,
    category: 'Leadership'
  },
  {
    id: 2,
    title: 'Advanced Analytics Certification',
    type: 'External Course',
    duration: '3 months',
    format: 'Online',
    nextStart: '2025-08-10',
    spots: 'Unlimited',
    cost: '$599 (Company Sponsored)',
    category: 'Technical'
  },
  {
    id: 3,
    title: 'Cross-Functional Project Management',
    type: 'Workshop',
    duration: '2 days',
    format: 'In-Person',
    nextStart: '2025-08-12',
    spots: 20,
    enrolled: 15,
    category: 'Project Management'
  },
  {
    id: 4,
    title: 'Executive MBA Program',
    type: 'Degree Program',
    duration: '18 months',
    format: 'Hybrid',
    nextStart: '2025-09-01',
    cost: '$85,000 (50% Company Sponsored)',
    category: 'Education'
  }
];

// Career goals and milestones
const careerGoals = [
  {
    id: 1,
    goal: 'Complete Leadership Training',
    deadline: '2025-09-30',
    progress: 40,
    status: 'In Progress',
    priority: 'High'
  },
  {
    id: 2,
    goal: 'Obtain Marketing Analytics Certification',
    deadline: '2025-10-15',
    progress: 75,
    status: 'On Track',
    priority: 'Medium'
  },
  {
    id: 3,
    goal: 'Lead Cross-Department Project',
    deadline: '2025-12-01',
    progress: 20,
    status: 'Planning',
    priority: 'High'
  },
  {
    id: 4,
    goal: 'Mentor Junior Team Member',
    deadline: '2025-11-30',
    progress: 60,
    status: 'In Progress',
    priority: 'Medium'
  }
];

const getStatusColor = (status) => {
  switch (status) {
    case 'Open': return 'bg-green-600/20 text-green-400 border-green-600/30';
    case 'Closing Soon': return 'bg-red-600/20 text-red-400 border-red-600/30';
    case 'In Progress': return 'bg-blue-600/20 text-blue-400 border-blue-600/30';
    case 'On Track': return 'bg-green-600/20 text-green-400 border-green-600/30';
    case 'Planning': return 'bg-yellow-600/20 text-yellow-400 border-yellow-600/30';
    default: return 'bg-gray-600/20 text-gray-400 border-gray-600/30';
  }
};

const getPriorityColor = (priority) => {
  switch (priority) {
    case 'High': return 'text-red-400';
    case 'Medium': return 'text-yellow-400';
    case 'Low': return 'text-green-400';
    default: return 'text-gray-400';
  }
};

return (
  <div className="min-h-screen relative overflow-hidden" style={{ 
    background: 'linear-gradient(180deg, #0a0a0a 0%, #161616 100%)',
    fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif'
  }}>
    {/* Animated Background Canvases */}
    {/* <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    />
    <canvas
      ref={sparkleCanvasRef}
      className="fixed inset-0 z-0"
      style={{ pointerEvents: 'none' }}
    /> */}

    {/* Cosmic Elements Overlay */}
    {/* <div className="fixed inset-0 z-0">
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600/5 rounded-full blur-[100px] animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-80 h-80 bg-gray-600/3 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-blue-600/3 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '4s' }}></div>
    </div> */}

    {/* Content */}
    <div className="relative z-10">
      {/* Header */}
      <div className="border-b border-gray-700/50 backdrop-blur-xl" style={{ background: 'rgba(10, 10, 10, 0.9)' }}>
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2" style={{ fontSize: '36px', lineHeight: '1.25' }}>
                Career Dashboard
              </h1>
              <p className="text-gray-400" style={{ fontSize: '16px' }}>
                Track your career progress and explore opportunities
              </p>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="font-semibold text-white" style={{ fontSize: '16px' }}>
                  {employeeProfile.name}
                </p>
                <p className="text-gray-400" style={{ fontSize: '14px' }}>
                  {employeeProfile.currentRole}
                </p>
              </div>
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg shadow-blue-600/30">
                <User className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Auto Carousel for Announcements */}
      <div className="max-w-7xl mx-auto px-8 py-6">
        <div 
          className="relative rounded-xl p-6 backdrop-blur-xl border border-gray-700/30 mb-8 overflow-hidden group"
          style={{ background: 'rgba(30, 30, 30, 0.8)' }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Carousel Background Glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-transparent to-blue-600/10 opacity-50"></div>
          
          <div className="relative flex items-center justify-between">
            <button 
              onClick={() => setCurrentAnnouncementIndex((prev) => 
                prev === 0 ? announcements.length - 1 : prev - 1
              )}
              className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/40 hover:scale-105"
            >
              <ChevronLeft className="w-5 h-5 text-white" />
            </button>
            
            <div className="flex-1 mx-6 text-center">
              <h3 className="text-xl font-semibold text-white mb-2">
                {announcements[currentAnnouncementIndex].title}
              </h3>
              <p className="text-gray-300 mb-2" style={{ fontSize: '16px' }}>
                {announcements[currentAnnouncementIndex].description}
              </p>
              <div className="flex items-center justify-center space-x-4">
                <span className={`px-3 py-1 rounded-full text-sm border ${
                  announcements[currentAnnouncementIndex].type === 'Important' 
                    ? 'bg-red-600/20 text-red-400 border-red-600/30' 
                    : announcements[currentAnnouncementIndex].type === 'Training'
                    ? 'bg-blue-600/20 text-blue-400 border-blue-600/30'
                    : 'bg-green-600/20 text-green-400 border-green-600/30'
                }`}>
                  {announcements[currentAnnouncementIndex].type}
                </span>
                <span className="text-gray-400 text-sm">
                  Due: {announcements[currentAnnouncementIndex].deadline}
                </span>
              </div>
            </div>
            
            <button 
              onClick={() => setCurrentAnnouncementIndex((prev) => 
                (prev + 1) % announcements.length
              )}
              className="w-10 h-10 rounded-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center transition-all duration-300 hover:shadow-lg hover:shadow-blue-600/40 hover:scale-105"
            >
              <ChevronRight className="w-5 h-5 text-white" />
            </button>
          </div>
          
          {/* Carousel Indicators */}
          <div className="flex justify-center mt-4 space-x-2">
            {announcements.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentAnnouncementIndex(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentAnnouncementIndex 
                    ? 'bg-blue-600 shadow-lg shadow-blue-600/50' 
                    : 'bg-gray-600 hover:bg-gray-500'
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Career Progress Overview */}
      <div className="max-w-7xl mx-auto px-8 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-3">
            <div 
              className="rounded-xl p-8 backdrop-blur-xl border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/20 hover:-translate-y-1 group"
              style={{ background: 'rgba(30, 30, 30, 0.8)' }}
            >
              <h2 className="text-2xl font-semibold text-white mb-6" style={{ fontSize: '24px' }}>
                Career Progress
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-400" style={{ fontSize: '14px' }}>Current Level</span>
                    <span className="font-semibold text-white" style={{ fontSize: '14px' }}>
                      {careerProgress.currentLevel}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-600 to-blue-500 h-3 rounded-full transition-all duration-1000 shadow-lg shadow-blue-600/30" 
                      style={{ width: `${careerProgress.progressPercentage}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-400 mt-2" style={{ fontSize: '12px' }}>
                    Progress to {careerProgress.nextLevel}
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-400" style={{ fontSize: '14px' }}>Skills Development</span>
                    <span className="font-semibold text-white" style={{ fontSize: '14px' }}>
                      {careerProgress.skillsCompleted}/{careerProgress.skillsRequired}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-green-600 to-green-500 h-3 rounded-full transition-all duration-1000 shadow-lg shadow-green-600/30" 
                      style={{ width: `${(careerProgress.skillsCompleted / careerProgress.skillsRequired) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-400 mt-2" style={{ fontSize: '12px' }}>
                    Skills completed this year
                  </p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-400" style={{ fontSize: '14px' }}>Performance Rating</span>
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-500 mr-1" />
                      <span className="font-semibold text-white" style={{ fontSize: '14px' }}>
                        {careerProgress.performanceRating}/5.0
                      </span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-yellow-600 to-yellow-500 h-3 rounded-full transition-all duration-1000 shadow-lg shadow-yellow-600/30" 
                      style={{ width: `${(careerProgress.performanceRating / 5) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-gray-400 mt-2" style={{ fontSize: '12px' }}>
                    Latest annual review
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          <div 
            className="rounded-xl p-8 backdrop-blur-xl border border-gray-700/30 hover:border-gray-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/20 hover:-translate-y-1"
            style={{ background: 'rgba(30, 30, 30, 0.8)' }}
          >
            <h3 className="text-lg font-semibold text-white mb-6" style={{ fontSize: '18px' }}>
              Quick Stats
            </h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <span className="text-gray-400" style={{ fontSize: '14px' }}>Time in Role</span>
                <span className="font-medium text-white" style={{ fontSize: '14px' }}>2.5 years</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400" style={{ fontSize: '14px' }}>Applications</span>
                <span className="font-medium text-white" style={{ fontSize: '14px' }}>3 Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400" style={{ fontSize: '14px' }}>Courses</span>
                <span className="font-medium text-white" style={{ fontSize: '14px' }}>2 Enrolled</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-400" style={{ fontSize: '14px' }}>Goals</span>
                <span className="font-medium text-white" style={{ fontSize: '14px' }}>4 Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div 
          className="rounded-xl backdrop-blur-xl border border-gray-700/30 mb-8 overflow-hidden"
          style={{ background: 'rgba(30, 30, 30, 0.8)' }}
        >
          <div className="border-b border-gray-700/50">
            <nav className="flex space-x-8 px-8">
              {[
                { id: 'opportunities', label: 'Internal Opportunities', icon: <TrendingUp className="w-5 h-5" /> },
                { id: 'learning', label: 'Learning & Development', icon: <GraduationCap className="w-5 h-5" /> },
                { id: 'goals', label: 'Career Goals', icon: <Target className="w-5 h-5" /> }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-6 px-2 border-b-2 font-medium transition-all duration-300 ${
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-400 shadow-lg shadow-blue-600/20'
                      : 'border-transparent text-gray-400 hover:text-white hover:border-gray-600'
                  }`}
                  style={{ fontSize: '16px' }}
                >
                  {tab.icon}
                  <span className="ml-3">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'opportunities' && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-semibold text-white" style={{ fontSize: '24px' }}>
                    Internal Job Opportunities
                  </h3>
                  <div className="flex items-center space-x-6">
                    <div className="relative">
                      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                      <input
                        type="text"
                        placeholder="Search opportunities..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-12 pr-6 py-3 bg-gray-800/50 border border-gray-600/50 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent text-white placeholder-gray-400 backdrop-blur-xl transition-all duration-300"
                        style={{ fontSize: '14px', width: '300px' }}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {internalOpportunities.map(job => (
                    <div 
                      key={job.id} 
                      className="border border-gray-700/30 rounded-xl p-8 hover:shadow-xl hover:shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:border-gray-600/50 group backdrop-blur-xl"
                      style={{ background: 'rgba(30, 30, 30, 0.8)' }}
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-2" style={{ fontSize: '18px' }}>
                            {job.title}
                          </h4>
                          <div className="flex items-center text-gray-400 mb-3" style={{ fontSize: '14px' }}>
                            <Building2 className="w-4 h-4 mr-2" />
                            <span className="mr-6">{job.department}</span>
                            <MapPin className="w-4 h-4 mr-2" />
                            <span>{job.location}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(job.status)}`}>
                            {job.status}
                          </span>
                          <div className="text-blue-400 font-semibold mt-2" style={{ fontSize: '14px' }}>
                            {job.match}% match
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div style={{ fontSize: '14px' }}>
                          <span className="text-gray-400">Level: </span>
                          <span className="font-medium text-white">{job.level}</span>
                        </div>
                        <div style={{ fontSize: '14px' }}>
                          <span className="text-gray-400">Type: </span>
                          <span className="font-medium text-white">{job.type}</span>
                        </div>
                        <div style={{ fontSize: '14px' }}>
                          <span className="text-gray-400">Openings: </span>
                          <span className="font-medium text-white">{job.openings}</span>
                        </div>
                        <div style={{ fontSize: '14px' }}>
                          <span className="text-gray-400">Deadline: </span>
                          <span className="font-medium text-white">
                            {new Date(job.deadline).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      <div className="mb-6">
                        <p className="text-gray-400 mb-3" style={{ fontSize: '14px' }}>
                          Key Requirements:
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {job.requirements.map((req, index) => (
                            <span 
                              key={index} 
                              className="bg-gray-800/50 text-gray-300 px-3 py-1 rounded-full border border-gray-700/50"
                              style={{ fontSize: '12px' }}
                            >
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-gray-400" style={{ fontSize: '14px' }}>
                          Hiring Manager: <span className="text-white">{job.hiringManager}</span>
                        </span>
                        <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 font-medium shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 hover:scale-105">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'learning' && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-semibold text-white" style={{ fontSize: '24px' }}>
                    Learning & Development
                  </h3>
                  <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 hover:scale-105">
                    <Plus className="w-4 h-4 mr-2" />
                    Request Training
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {learningOpportunities.map(course => (
                    <div 
                      key={course.id} 
                      className="border border-gray-700/30 rounded-xl p-8 backdrop-blur-xl hover:shadow-xl hover:shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:border-gray-600/50"
                      style={{ background: 'rgba(30, 30, 30, 0.8)' }}
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div>
                          <h4 className="text-lg font-semibold text-white mb-3" style={{ fontSize: '18px' }}>
                            {course.title}
                          </h4>
                          <span className="px-3 py-1 rounded-full border bg-blue-600/20 text-blue-400 border-blue-600/30 text-sm font-medium">
                            {course.category}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6 mb-6">
                        <div style={{ fontSize: '14px' }}>
                          <span className="text-gray-400">Type: </span>
                          <span className="font-medium text-white">{course.type}</span>
                        </div>
                        <div style={{ fontSize: '14px' }}>
                          <span className="text-gray-400">Duration: </span>
                          <span className="font-medium text-white">{course.duration}</span>
                        </div>
                        <div style={{ fontSize: '14px' }}>
                          <span className="text-gray-400">Format: </span>
                          <span className="font-medium text-white">{course.format}</span>
                        </div>
                        <div style={{ fontSize: '14px' }}>
                          <span className="text-gray-400">Next Start: </span>
                          <span className="font-medium text-white">
                            {new Date(course.nextStart).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {course.enrolled && (
                        <div className="mb-6">
                          <div className="flex justify-between mb-2" style={{ fontSize: '14px' }}>
                            <span className="text-gray-400">Enrollment</span>
                            <span className="font-medium text-white">{course.enrolled}/{course.spots}</span>
                          </div>
                          <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                            <div 
                              className="bg-gradient-to-r from-green-600 to-green-500 h-3 rounded-full transition-all duration-1000 shadow-lg shadow-green-600/30" 
                              style={{ width: `${(course.enrolled / course.spots) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {course.cost && (
                        <p className="text-gray-400 mb-6" style={{ fontSize: '14px' }}>
                          Cost: <span className="text-white font-medium">{course.cost}</span>
                        </p>
                      )}

                      <button className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-3 px-6 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 font-medium shadow-lg shadow-green-600/30 hover:shadow-green-600/40 hover:scale-105">
                        Enroll Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'goals' && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-2xl font-semibold text-white" style={{ fontSize: '24px' }}>
                    Career Goals & Milestones
                  </h3>
                  <button className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg font-medium flex items-center hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg shadow-blue-600/30 hover:shadow-blue-600/40 hover:scale-105">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Goal
                  </button>
                </div>

                <div className="space-y-8">
                  {careerGoals.map(goal => (
                    <div 
                      key={goal.id} 
                      className="border border-gray-700/30 rounded-xl p-8 backdrop-blur-xl hover:shadow-xl hover:shadow-blue-600/20 transition-all duration-300 hover:-translate-y-1 hover:border-gray-600/50"
                      style={{ background: 'rgba(30, 30, 30, 0.8)' }}
                    >
                      <div className="flex justify-between items-start mb-6">
                        <div className="flex-1">
                          <h4 className="text-lg font-semibold text-white mb-3" style={{ fontSize: '18px' }}>
                            {goal.goal}
                          </h4>
                          <div className="flex items-center space-x-6">
                            <div className="flex items-center text-gray-400" style={{ fontSize: '14px' }}>
                              <Calendar className="w-4 h-4 mr-2" />
                              Due: <span className="text-white ml-1">{new Date(goal.deadline).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center" style={{ fontSize: '14px' }}>
                              <AlertCircle className={`w-4 h-4 mr-2 ${getPriorityColor(goal.priority)}`} />
                              <span className={getPriorityColor(goal.priority)}>{goal.priority} Priority</span>
                            </div>
                          </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full border text-sm font-medium ${getStatusColor(goal.status)}`}>
                          {goal.status}
                        </span>
                      </div>

                      <div className="mb-6">
                        <div className="flex justify-between mb-2" style={{ fontSize: '14px' }}>
                          <span className="text-gray-400">Progress</span>
                          <span className="font-medium text-white">{goal.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-700/50 rounded-full h-3 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-blue-600 to-blue-500 h-3 rounded-full transition-all duration-1000 shadow-lg shadow-blue-600/30" 
                            style={{ width: `${goal.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <button className="text-blue-400 hover:text-blue-300 transition-colors" style={{ fontSize: '14px' }}>
                          View Details
                        </button>
                        <button className="bg-gray-800/50 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-700/50 transition-colors border border-gray-700/50 hover:border-gray-600/50" style={{ fontSize: '14px' }}>
                          Update Progress
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  </div>
);
};

export default EmployeeCareerDashboard;
