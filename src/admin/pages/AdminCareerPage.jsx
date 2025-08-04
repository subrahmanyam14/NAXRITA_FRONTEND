import React, { useState, useEffect } from 'react';
import { 
  Users, 
  Star, 
  MapPin, 
  Clock, 
  TrendingUp, 
  Award, 
  Building2, 
  Calendar, 
  Search,
  Filter,
  Eye,
  Edit3,
  UserPlus,
  BarChart3,
  Globe,
  Play,
  Download,
  Heart,
  MessageSquare,
  Share2,
  ChevronRight,
  Target,
  Zap,
  Shield,
  Coffee,
  Car,
  GraduationCap,
  Phone,
  Mail,
  Plus,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Cosmic Background Component
const CosmicBackground = ({ intensity = 'full' }) => {
  const [particles, setParticles] = useState([]);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  
  useEffect(() => {
    if (reduceMotion) return;

    const getParticleCount = () => {
      switch (intensity) {
        case 'subtle': return { stars: 80, sparkles: 15, dots: 40 };
        case 'moderate': return { stars: 120, sparkles: 20, dots: 60 };
        case 'full': return { stars: 150, sparkles: 25, dots: 80 };
        default: return { stars: 150, sparkles: 25, dots: 80 };
      }
    };

    const counts = getParticleCount();
    
    const newParticles = [
      ...Array.from({ length: counts.stars }, (_, i) => ({
        id: `star-${i}`,
        type: 'star',
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 3,
        duration: Math.random() * 2 + 2,
      })),
      ...Array.from({ length: counts.sparkles }, (_, i) => ({
        id: `sparkle-${i}`,
        type: 'sparkle',
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 6 + 2,
        delay: Math.random() * 8,
        duration: Math.random() * 4 + 6,
      })),
      ...Array.from({ length: counts.dots }, (_, i) => ({
        id: `dot-${i}`,
        type: 'dot',
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 3 + 1,
        delay: Math.random() * 4,
        duration: Math.random() * 3 + 3,
      })),
    ];

    setParticles(newParticles);
  }, [intensity, reduceMotion]);

  if (reduceMotion) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Starfield */}
      {particles.filter(p => p.type === 'star').map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-white opacity-20 animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}

      {/* Floating Sparkles */}
      {particles.filter(p => p.type === 'sparkle').map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-blue-500 opacity-30 animate-bounce"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}

      {/* Animated Dots */}
      {particles.filter(p => p.type === 'dot').map((particle) => (
        <div
          key={particle.id}
          className="absolute rounded-full bg-blue-400 opacity-10 animate-pulse"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${particle.duration}s`,
          }}
        />
      ))}

      {/* Nebula Clouds */}
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={`nebula-${i}`}
          className="absolute rounded-full blur-3xl opacity-5 animate-pulse"
          style={{
            left: `${Math.random() * 80}%`,
            top: `${Math.random() * 80}%`,
            width: `${Math.random() * 200 + 100}px`,
            height: `${Math.random() * 200 + 100}px`,
            background: i % 2 === 0 ? '#2563eb' : '#6b7280',
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${Math.random() * 10 + 20}s`,
          }}
        />
      ))}
    </div>
  );
};

const AdminCareerPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedJobLevel, setSelectedJobLevel] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [showJobForm, setShowJobForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const careerStats = {
    totalJobs: 24,
    activeApplications: 156,
    newApplicationsToday: 12,
    averageRating: 4.8,
    pageViews: 3420,
    applicationRate: 18.5,
    hires: 8,
    averageTimeToHire: 14
  };

  const jobOpenings = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      level: 'Senior',
      applicants: 23,
      posted: '2 days ago',
      status: 'Active',
      salary: '$120k - $160k',
      urgency: 'High'
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      location: 'New York',
      type: 'Full-time',
      level: 'Mid',
      applicants: 45,
      posted: '5 days ago',
      status: 'Active',
      salary: '$100k - $130k',
      urgency: 'Medium'
    },
    {
      id: 3,
      title: 'UX Designer',
      department: 'Design',
      location: 'San Francisco',
      type: 'Full-time',
      level: 'Mid',
      applicants: 31,
      posted: '1 week ago',
      status: 'Active',
      salary: '$90k - $120k',
      urgency: 'Low'
    }
  ];

  const companyHighlights = [
    { icon: Coffee, label: 'Free meals & snacks', color: 'amber' },
    { icon: Car, label: 'Transportation allowance', color: 'blue' },
    { icon: GraduationCap, label: 'Learning & development', color: 'purple' },
    { icon: Shield, label: 'Health & wellness', color: 'emerald' },
    { icon: Globe, label: 'Remote work options', color: 'indigo' },
    { icon: Target, label: 'Performance bonuses', color: 'rose' }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Senior Developer',
      image: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=2563eb&color=ffffff',
      quote: 'The growth opportunities here are incredible. I joined as a junior and now lead my own team.',
      rating: 5,
      department: 'Engineering'
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'Product Manager',
      image: 'https://ui-avatars.com/api/?name=Michael+Rodriguez&background=2563eb&color=ffffff',
      quote: 'Amazing work culture and supportive colleagues. Best decision I made for my career.',
      rating: 5,
      department: 'Product'
    }
  ];

  const departments = ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'HR'];
  const jobLevels = ['Entry', 'Mid', 'Senior', 'Lead', 'Executive'];

  const filteredJobs = jobOpenings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
    const matchesLevel = selectedJobLevel === 'all' || job.level === selectedJobLevel;
    return matchesSearch && matchesDepartment && matchesLevel;
  });

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'High': return 'bg-red-500/20 text-red-400 border-red-500/30';
      case 'Medium': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Low': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color }) => (
    <div 
      className="group relative rounded-xl p-6 border transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl"
      style={{
        background: 'rgba(30, 30, 30, 0.8)',
        backdropFilter: 'blur(20px)',
        border: '1px solid #2a2a2a',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.8)',
      }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p 
            className="text-sm font-medium text-gray-400 mb-2 tracking-wide"
            style={{ fontFamily: 'Plus Jakarta Sans, Inter, system-ui, sans-serif' }}
          >
            {title}
          </p>
          <p 
            className="text-3xl font-bold text-white mb-1"
            style={{ fontFamily: 'Plus Jakarta Sans, Inter, system-ui, sans-serif' }}
          >
            {value}
          </p>
          {subtitle && (
            <p className="text-sm text-gray-500 font-medium">{subtitle}</p>
          )}
        </div>
        <div 
          className={`p-4 rounded-xl bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30 group-hover:shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300`}
        >
          <Icon className="h-6 w-6 text-blue-400" />
        </div>
      </div>
      <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
  );

  return (
    <div 
      className="min-h-screen relative overflow-x-hidden"
      style={{
        background: 'linear-gradient(135deg, #0a0a0a 0%, #161616 50%, #0a0a0a 100%)',
        fontFamily: 'Plus Jakarta Sans, Inter, system-ui, sans-serif'
      }}
    >
      {/* Cosmic Background */}
      {/* <CosmicBackground intensity="full" /> */}

      {/* Header */}
      <div 
        className="relative z-10 border-b"
        style={{
          background: 'rgba(26, 26, 26, 0.9)',
          backdropFilter: 'blur(20px)',
          borderColor: '#2a2a2a',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 
                className="text-3xl font-bold text-white mb-2 tracking-tight"
                style={{ 
                  fontFamily: 'Plus Jakarta Sans, Inter, system-ui, sans-serif',
                  textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
                }}
              >
                Career Page Management
              </h1>
              <p className="text-base text-gray-300 font-medium">
                Manage job postings, applications, and company branding
              </p>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={() => setShowJobForm(true)}
                className="group relative flex items-center space-x-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl  transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-blue-500/25 hover:shadow-2xl transform "
                // style={{ backdropFilter: 'blur(10px)' }}
              >
                <Plus className="h-5 w-5" />
                <span>Post New Job</span>
                {/* <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div> */}
              </button>
              <button 
                className="group relative flex items-center space-x-3 px-6 py-3 border text-gray-300 rounded-xl hover:text-white hover:border-blue-500 transition-all duration-300 text-sm font-semibold"
                style={{
                  background: 'rgba(30, 30, 30, 0.8)',
                  backdropFilter: 'blur(10px)',
                  borderColor: '#404040',
                }}
              >
                <Download className="h-5 w-5" />
                <span>Export Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8 relative z-10">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav 
            className="flex space-x-2 p-2 rounded-2xl border"
            style={{
              background: 'rgba(30, 30, 30, 0.8)',
              backdropFilter: 'blur(20px)',
              borderColor: '#2a2a2a',
            }}
          >
            {['overview', 'jobs', 'content', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-semibold rounded-xl transition-all duration-300 capitalize relative ${
                  activeTab === tab
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/25'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
              >
                
                {activeTab === tab && (
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 opacity-80"></div>
                )}
                <span className="relative z-10">{tab}</span>
              </button>
            ))}
          </nav>
        </div>

        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                icon={Users}
                title="Active Jobs"
                value={careerStats.totalJobs}
                subtitle="+3 this week"
                color="blue"
              />
              <StatCard
                icon={UserPlus}
                title="Applications"
                value={careerStats.activeApplications}
                subtitle="+12 today"
                color="emerald"
              />
              <StatCard
                icon={Star}
                title="Company Rating"
                value={careerStats.averageRating}
                subtitle="Based on reviews"
                color="amber"
              />
              <StatCard
                icon={Eye}
                title="Page Views"
                value={`${(careerStats.pageViews / 1000).toFixed(1)}k`}
                subtitle="This month"
                color="purple"
              />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Recent Jobs */}
              <div 
                className="lg:col-span-2 rounded-2xl p-6 border transition-all duration-300 hover:shadow-2xl"
                style={{
                  background: 'rgba(30, 30, 30, 0.8)',
                  backdropFilter: 'blur(20px)',
                  borderColor: '#2a2a2a',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.8)',
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Recent Job Postings</h3>
                  <ChevronRight className="h-6 w-6 text-gray-400" />
                </div>
                <div className="space-y-4">
                  {jobOpenings.slice(0, 3).map((job) => (
                    <div 
                      key={job.id} 
                      className="group flex items-center justify-between p-4 rounded-xl border transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
                      style={{
                        background: 'rgba(40, 40, 40, 0.5)',
                        borderColor: '#404040',
                      }}
                    >
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          <div>
                            <h4 className="text-base font-semibold text-white mb-1">{job.title}</h4>
                            <div className="flex items-center space-x-3 text-sm text-gray-400">
                              <MapPin className="h-4 w-4" />
                              <span>{job.location}</span>
                              <span>•</span>
                              <span>{job.applicants} applicants</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className={`px-3 py-1.5 rounded-full text-sm font-medium border ${getUrgencyColor(job.urgency)}`}>
                          {job.urgency}
                        </span>
                        <button className="p-2 hover:bg-gray-700 rounded-lg transition-colors">
                          <Edit3 className="h-5 w-5 text-gray-400 hover:text-blue-400" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              <div 
                className="rounded-2xl p-6 border"
                style={{
                  background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)',
                  backdropFilter: 'blur(20px)',
                  borderColor: '#2563eb40',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(37, 99, 235, 0.1)',
                }}
              >
                <h3 className="text-xl font-bold text-white mb-6">Performance Metrics</h3>
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300 font-medium">Application Rate</span>
                    <span className="text-2xl font-bold text-blue-400">{careerStats.applicationRate}%</span>
                  </div>
                  <div className="w-full bg-blue-900/30 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-700 shadow-lg shadow-blue-500/25" 
                      style={{ width: `${careerStats.applicationRate}%` }} 
                    />
                  </div>
                  
                  <div className="flex items-center justify-between mt-6">
                    <span className="text-sm text-gray-300 font-medium">Time to Hire</span>
                    <span className="text-2xl font-bold text-emerald-400">{careerStats.averageTimeToHire} days</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-300 font-medium">Successful Hires</span>
                    <span className="text-2xl font-bold text-purple-400">{careerStats.hires}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Department Overview */}
            <div 
              className="rounded-2xl p-6 border"
              style={{
                background: 'rgba(30, 30, 30, 0.8)',
                backdropFilter: 'blur(20px)',
                borderColor: '#2a2a2a',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.8)',
              }}
            >
              <h3 className="text-xl font-bold text-white mb-6">Department Hiring Status</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {departments.map((dept, index) => {
                  const deptJobs = jobOpenings.filter(job => job.department === dept);
                  const totalApplicants = deptJobs.reduce((sum, job) => sum + job.applicants, 0);
                  
                  return (
                    <div 
                      key={dept} 
                      className="group p-5 rounded-xl border transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10 hover:scale-[1.02]"
                      style={{
                        background: 'rgba(40, 40, 40, 0.5)',
                        borderColor: '#404040',
                      }}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="text-base font-semibold text-white">{dept}</h4>
                        <Building2 className="h-5 w-5 text-blue-400 group-hover:text-blue-300 transition-colors" />
                      </div>
                      <div className="text-sm text-gray-400 space-y-1">
                        <div className="font-medium">{deptJobs.length} open positions</div>
                        <div>{totalApplicants} total applicants</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {activeTab === 'jobs' && (
          <>
            {/* Job Management Header */}
            <div 
              className="rounded-2xl p-6 border mb-8"
              style={{
                background: 'rgba(30, 30, 30, 0.8)',
                backdropFilter: 'blur(20px)',
                borderColor: '#2a2a2a',
              }}
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Search jobs..."
                    className="w-full pl-12 pr-4 py-3 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-white placeholder-gray-400"
                    style={{
                      background: 'rgba(40, 40, 40, 0.8)',
                      borderColor: '#404040',
                    }}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="px-4 py-3 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  style={{
                    background: 'rgba(40, 40, 40, 0.8)',
                    borderColor: '#404040',
                  }}
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="all">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                <select
                  className="px-4 py-3 text-sm border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                  style={{
                    background: 'rgba(40, 40, 40, 0.8)',
                    borderColor: '#404040',
                  }}
                  value={selectedJobLevel}
                  onChange={(e) => setSelectedJobLevel(e.target.value)}
                >
                  <option value="all">All Levels</option>
                  {jobLevels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Jobs List */}
            <div 
              className="rounded-2xl border overflow-hidden"
              style={{
                background: 'rgba(30, 30, 30, 0.8)',
                backdropFilter: 'blur(20px)',
                borderColor: '#2a2a2a',
              }}
            >
              <div className="overflow-x-auto custom-scrollbar">
                <table className="min-w-full divide-y divide-gray-700">
                  <thead style={{ background: 'rgba(40, 40, 40, 0.8)' }}>
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Job Title</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Applications</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {filteredJobs.map((job) => (
                      <tr key={job.id} className="hover:bg-gray-800/30 transition-colors duration-200">
                        <td className="px-6 py-5">
                          <div>
                            <div className="text-base font-semibold text-white">{job.title}</div>
                            <div className="text-sm text-gray-400 font-medium">{job.salary}</div>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-base text-gray-300">{job.department}</td>
                        <td className="px-6 py-5 text-base text-gray-300">{job.location}</td>
                        <td className="px-6 py-5">
                          <div className="flex items-center space-x-3">
                            <span className="text-base font-semibold text-white">{job.applicants}</span>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getUrgencyColor(job.urgency)}`}>
                              {job.urgency}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <span className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                            {job.status}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-sm font-medium space-x-3">
                          <button className="text-blue-400 hover:text-blue-300 transition-colors">
                            <Edit3 className="h-5 w-5" />
                          </button>
                          <button className="text-gray-400 hover:text-gray-300 transition-colors">
                            <Eye className="h-5 w-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'content' && (
          <>
            {/* Content Management */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Company Benefits */}
              <div 
                className="rounded-2xl p-6 border"
                style={{
                  background: 'rgba(30, 30, 30, 0.8)',
                  backdropFilter: 'blur(20px)',
                  borderColor: '#2a2a2a',
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Company Benefits</h3>
                  <button className="text-blue-400 hover:text-blue-300 transition-colors">
                    <Edit3 className="h-5 w-5" />
                  </button>
                </div>
                <div className="grid grid-cols-1 gap-4">
                  {companyHighlights.map((highlight, index) => (
                    <div 
                      key={index} 
                      className="group p-4 rounded-xl border transition-all duration-300 hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-500/10"
                      style={{
                        background: 'rgba(40, 40, 40, 0.5)',
                        borderColor: '#404040',
                      }}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="p-2 rounded-lg bg-blue-500/20 border border-blue-500/30">
                          <highlight.icon className="h-5 w-5 text-blue-400" />
                        </div>
                        <span className="text-sm font-semibold text-white">{highlight.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Employee Testimonials */}
              <div 
                className="rounded-2xl p-6 border"
                style={{
                  background: 'rgba(30, 30, 30, 0.8)',
                  backdropFilter: 'blur(20px)',
                  borderColor: '#2a2a2a',
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Employee Testimonials</h3>
                  <button className="text-blue-400 hover:text-blue-300 transition-colors">
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  {testimonials.map((testimonial) => (
                    <div 
                      key={testimonial.id} 
                      className="p-4 rounded-xl border"
                      style={{
                        background: 'rgba(40, 40, 40, 0.5)',
                        borderColor: '#404040',
                      }}
                    >
                      <div className="flex items-start space-x-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="h-12 w-12 rounded-full border-2 border-blue-500/30"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <div className="text-base font-semibold text-white">{testimonial.name}</div>
                              <div className="text-sm text-gray-400">{testimonial.role}</div>
                            </div>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-sm text-gray-300 leading-relaxed">"{testimonial.quote}"</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Company Culture */}
              <div 
                className="lg:col-span-2 rounded-2xl p-6 border"
                style={{
                  background: 'rgba(30, 30, 30, 0.8)',
                  backdropFilter: 'blur(20px)',
                  borderColor: '#2a2a2a',
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-white">Company Culture Content</h3>
                  <button className="text-blue-400 hover:text-blue-300 transition-colors">
                    <Edit3 className="h-5 w-5" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="text-base font-semibold text-white mb-3">Mission Statement</h4>
                    <div 
                      className="p-4 rounded-xl border"
                      style={{
                        background: 'rgba(40, 40, 40, 0.5)',
                        borderColor: '#404040',
                      }}
                    >
                      <p className="text-sm text-gray-300 leading-relaxed">
                        "We're building the future of work by empowering teams to collaborate seamlessly, 
                        innovate fearlessly, and create meaningful impact for our customers and communities."
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-base font-semibold text-white mb-3">Core Values</h4>
                    <div className="space-y-3">
                      {['Innovation', 'Collaboration', 'Integrity', 'Growth'].map((value, index) => (
                        <div 
                          key={index} 
                          className="flex items-center space-x-3 p-3 rounded-xl border"
                          style={{
                            background: 'rgba(40, 40, 40, 0.5)',
                            borderColor: '#404040',
                          }}
                        >
                          <CheckCircle className="h-5 w-5 text-emerald-400" />
                          <span className="text-sm font-medium text-white">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <h4 className="text-base font-semibold text-white mb-4">Media Content</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Array.from({ length: 3 }).map((_, index) => (
                      <div 
                        key={index}
                        className="aspect-video rounded-xl flex items-center justify-center border transition-all duration-300 hover:border-blue-500/50"
                        style={{
                          background: 'rgba(40, 40, 40, 0.8)',
                          borderColor: '#404040',
                        }}
                      >
                        <Play className="h-8 w-8 text-gray-400" />
                      </div>
                    ))}
                    <div 
                      className="aspect-video rounded-xl flex items-center justify-center border-2 border-dashed border-gray-600 hover:border-blue-500/50 transition-all duration-300 cursor-pointer group"
                      style={{ background: 'rgba(40, 40, 40, 0.3)' }}
                    >
                      <Plus className="h-8 w-8 text-gray-400 group-hover:text-blue-400 transition-colors" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'analytics' && (
          <>
            {/* Analytics Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              <div 
                className="rounded-2xl p-6 border"
                style={{
                  background: 'rgba(30, 30, 30, 0.8)',
                  backdropFilter: 'blur(20px)',
                  borderColor: '#2a2a2a',
                }}
              >
                <h3 className="text-base font-semibold text-white mb-4">Application Sources</h3>
                <div className="space-y-4">
                  {[
                    { source: 'Direct Website', count: 45, percentage: 35 },
                    { source: 'LinkedIn', count: 38, percentage: 30 },
                    { source: 'Job Boards', count: 25, percentage: 20 },
                    { source: 'Referrals', count: 19, percentage: 15 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-300 font-medium">{item.source}</span>
                      <div className="flex items-center space-x-3">
                        <div className="w-20 bg-gray-700 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-bold text-white w-8 text-right">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div 
                className="rounded-2xl p-6 border"
                style={{
                  background: 'rgba(30, 30, 30, 0.8)',
                  backdropFilter: 'blur(20px)',
                  borderColor: '#2a2a2a',
                }}
              >
                <h3 className="text-base font-semibold text-white mb-4">Top Performing Jobs</h3>
                <div className="space-y-3">
                  {jobOpenings.map((job, index) => (
                    <div 
                      key={job.id} 
                      className="flex items-center justify-between p-3 rounded-xl border"
                      style={{
                        background: 'rgba(40, 40, 40, 0.5)',
                        borderColor: '#404040',
                      }}
                    >
                      <div>
                        <div className="text-sm font-semibold text-white">{job.title}</div>
                        <div className="text-xs text-gray-400">{job.department}</div>
                      </div>
                      <div className="text-sm font-bold text-blue-400">{job.applicants}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div 
                className="rounded-2xl p-6 border"
                style={{
                  background: 'linear-gradient(135deg, rgba(34, 197, 94, 0.1) 0%, rgba(16, 185, 129, 0.05) 100%)',
                  backdropFilter: 'blur(20px)',
                  borderColor: '#22c55e40',
                }}
              >
                <h3 className="text-base font-semibold text-white mb-4">Hiring Funnel</h3>
                <div className="space-y-4">
                  {[
                    { stage: 'Applications', count: 156, color: 'bg-emerald-500' },
                    { stage: 'Screening', count: 89, color: 'bg-emerald-400' },
                    { stage: 'Interviews', count: 34, color: 'bg-emerald-300' },
                    { stage: 'Offers', count: 12, color: 'bg-emerald-200' },
                    { stage: 'Hires', count: 8, color: 'bg-emerald-100' }
                  ].map((stage, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-300 font-medium">{stage.stage}</span>
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full ${stage.color} shadow-lg`} />
                        <span className="text-sm font-bold text-white w-8 text-right">{stage.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Detailed Analytics */}
            <div 
              className="rounded-2xl p-8 border"
              style={{
                background: 'rgba(30, 30, 30, 0.8)',
                backdropFilter: 'blur(20px)',
                borderColor: '#2a2a2a',
              }}
            >
              <h3 className="text-xl font-bold text-white mb-6">Monthly Performance Trends</h3>
              <div 
                className="h-64 rounded-2xl flex items-center justify-center border"
                style={{
                  background: 'rgba(40, 40, 40, 0.5)',
                  borderColor: '#404040',
                }}
              >
                <div className="text-center">
                  <BarChart3 className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                  <p className="text-base text-gray-300 font-medium">Analytics chart would be rendered here</p>
                  <p className="text-sm text-gray-500 mt-2">Integration with chart library needed</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Job Posting Modal */}
      {showJobForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div 
            className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl p-8 border custom-scrollbar"
            style={{
              background: 'rgba(26, 26, 26, 0.95)',
              backdropFilter: 'blur(20px)',
              borderColor: '#2a2a2a',
            }}
          >
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold text-white">Create New Job Posting</h3>
              <button
                onClick={() => setShowJobForm(false)}
                className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Job Title</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-300 text-white placeholder-gray-400"
                    style={{
                      background: 'rgba(40, 40, 40, 0.8)',
                      borderColor: '#404040',
                    }}
                    placeholder="e.g. Senior Software Engineer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Department</label>
                  <select 
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    style={{
                      background: 'rgba(40, 40, 40, 0.8)',
                      borderColor: '#404040',
                    }}
                  >
                    <option>Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Location</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                    style={{
                      background: 'rgba(40, 40, 40, 0.8)',
                      borderColor: '#404040',
                    }}
                    placeholder="e.g. Remote, New York"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Job Type</label>
                  <select 
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    style={{
                      background: 'rgba(40, 40, 40, 0.8)',
                      borderColor: '#404040',
                    }}
                  >
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-300 mb-2">Job Description</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400 resize-none"
                  style={{
                    background: 'rgba(40, 40, 40, 0.8)',
                    borderColor: '#404040',
                  }}
                  placeholder="Describe the role, responsibilities, and requirements..."
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Salary Range</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
                    style={{
                      background: 'rgba(40, 40, 40, 0.8)',
                      borderColor: '#404040',
                    }}
                    placeholder="e.g. $80k - $120k"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-300 mb-2">Priority Level</label>
                  <select 
                    className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                    style={{
                      background: 'rgba(40, 40, 40, 0.8)',
                      borderColor: '#404040',
                    }}
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-4 pt-6">
                <button
                  type="button"
                  onClick={() => setShowJobForm(false)}
                  className="px-6 py-3 border text-gray-300 rounded-xl hover:text-white hover:border-gray-600 transition-all duration-300 text-sm font-semibold"
                  style={{
                    background: 'rgba(40, 40, 40, 0.8)',
                    borderColor: '#404040',
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 text-sm font-semibold shadow-lg hover:shadow-blue-500/25"
                >
                  Publish Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Custom Scrollbar Styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(40, 40, 40, 0.3);
          border-radius: 10px;
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(135deg, #2563eb, #1d4ed8);
          border-radius: 10px;
          border: 2px solid rgba(40, 40, 40, 0.3);
        }
        
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(135deg, #1d4ed8, #1e40af);
        }
        
        .custom-scrollbar::-webkit-scrollbar-corner {
          background: rgba(40, 40, 40, 0.3);
        }
        
        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #2563eb rgba(40, 40, 40, 0.3);
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes drift {
          0% { transform: translateX(0px); }
          100% { transform: translateX(50px); }
        }
        
        @media (prefers-reduced-motion: reduce) {
          * {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminCareerPage;
