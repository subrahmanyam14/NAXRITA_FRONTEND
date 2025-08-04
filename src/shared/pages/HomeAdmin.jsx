import React, { useState, useEffect } from 'react';
import { 
  Users, 
  FileText, 
  BarChart3, 
  Book, 
  Bell, 
  Search, 
  MapPin, 
  ArrowLeft, 
  ArrowRight,
  CheckSquare,
  Shield,
  Calendar,
  Clock,
  ExternalLink,
  AlertCircle,
  TrendingUp,
  Settings,
  Award,
  Target,
  User,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Star,
  Sparkles
} from 'lucide-react';

const AdminHomepage = () => {
  const user = { name: "Sarah Johnson", role: "Admin" };
  
  // Carousel states
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [quickActionIndex, setQuickActionIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isAutoPlayingSuggestions, setIsAutoPlayingSuggestions] = useState(true);

  const quickActions = [
    'Employee Management',
    'Compliance Reports', 
    'Analytics Dashboard',
    'Policy Updates',
    'Training Modules',
    'Performance Reviews',
    'Team Analytics',
    'HR Tools',
    'System Settings',
    'Audit Logs'
  ];

  const awaitingActions = [
    {
      icon: Users,
      title: 'Approve New Employee Onboarding: John Doe',
      subtitle: 'Submitted - 3 day(s) ago',
      priority: 'high'
    },
    {
      icon: FileText,
      title: 'Review Monthly Compliance Report',
      subtitle: 'Due - 5 day(s) from now',
      priority: 'normal'
    },
    {
      icon: Calendar,
      title: 'Schedule Annual Performance Reviews',
      subtitle: 'FY25 Performance Review Season',
      priority: 'high'
    },
    {
      icon: Book,
      title: 'Update Training Modules',
      subtitle: 'DUE 15/08/2025',
      priority: 'urgent'
    },
    {
      icon: Shield,
      title: 'Security Audit Review',
      subtitle: 'Quarterly review pending',
      priority: 'high'
    }
  ];

  const announcements = [
    {
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=200&h=120&fit=crop&crop=center',
      title: 'New HR Policies Effective September 1, 2025',
      description: 'Review and approve updates to company policies for compliance.',
      badge: 'Policy Update'
    },
    {
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&h=120&fit=crop&crop=center',
      title: 'Q3 Performance Analytics Available',
      description: 'Access detailed performance metrics and team insights.',
      badge: 'Analytics'
    },
    {
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=120&fit=crop&crop=center',
      title: 'Company All-Hands Meeting',
      description: 'Join us for the quarterly company update and strategy session.',
      badge: 'Meeting'
    },
    {
      image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=200&h=120&fit=crop&crop=center',
      title: 'New Employee Benefits Package',
      description: 'Enhanced benefits package now available for all team members.',
      badge: 'Benefits'
    }
  ];

  const timelySuggestions = [
    {
      icon: Shield,
      title: 'Compliance Audit Preparation',
      description: 'Review audit checklist and ensure all documentation is ready',
      action: 'Start Preparation',
      progress: 75
    },
    {
      icon: TrendingUp,
      title: 'Team Performance Analytics',
      description: 'New insights available for Q3 performance trends and metrics',
      action: 'View Analytics',
      progress: 90
    },
    {
      icon: Award,
      title: 'Employee Recognition Program',
      description: 'Launch the monthly recognition program for outstanding performers',
      action: 'Launch Program',
      progress: 60
    },
    {
      icon: Calendar,
      title: 'Q4 Planning Session',
      description: 'Schedule strategic planning sessions for the upcoming quarter',
      action: 'Schedule Now',
      progress: 30
    }
  ];

  // Auto-scroll effects
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setAnnouncementIndex(prev => (prev + 1) % announcements.length);
      setQuickActionIndex(prev => (prev + 3) % quickActions.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, announcements.length, quickActions.length]);

  useEffect(() => {
    if (!isAutoPlayingSuggestions) return;
    
    const interval = setInterval(() => {
      setSuggestionIndex(prev => (prev + 1) % timelySuggestions.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlayingSuggestions, timelySuggestions.length]);

  // Generate stars for background
  const generateStars = (count) => {
    return Array.from({ length: count }, (_, i) => (
      <div
        key={i}
        className="absolute animate-twinkle"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 2}s`
        }}
      >
        <Star 
          size={Math.random() > 0.5 ? 2 : 1} 
          className="text-white opacity-30" 
        />
      </div>
    ));
  };

  return (
    <div className="bg-black min-h-screen font-jakarta relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        {/* Starfield */}
        <div className="absolute inset-0">
          {generateStars(150)}
        </div>
        
        {/* Floating Sparkles */}
        <div className="absolute inset-0">
          {Array.from({ length: 25 }, (_, i) => (
            <div
              key={i}
              className="absolute animate-float-up"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${6 + Math.random() * 4}s`
              }}
            >
              <Sparkles 
                size={Math.random() > 0.7 ? 6 : 4} 
                className="text-blue-400 opacity-20" 
              />
            </div>
          ))}
        </div>

        {/* Nebula Clouds */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600 opacity-5 rounded-full blur-3xl animate-drift"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gray-600 opacity-3 rounded-full blur-3xl animate-drift-reverse"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-400 opacity-4 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <div className="bg-black/80 backdrop-blur-sm border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mb-4">
                  <span className="text-base font-medium text-gray-400 block mb-2">Hello,</span>
                  <h1 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-white via-[#2563eb] to-white bg-clip-text text-transparent tracking-tight mb-4">
                    {user?.name || 'Admin'}
                  </h1>
                  <span className="inline-flex items-center px-4 py-2 rounded-lg text-lg font-bold bg-gradient-to-r from-[#ff6600] to-[#2563eb] bg-clip-text text-transparent text-glow-white shadow-glow">
                    {user?.role || 'Admin'}
                  </span>
                </div>
                <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                  Manage your team's performance, access insights, and ensure compliance in one professional workspace.
                </p>
                <div className="flex flex-wrap gap-4">
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-full hover:from-blue-700 hover:to-blue-900 transition-all duration-300 shadow-glow hover:shadow-blue-500 hover:-translate-y-1 border border-blue-500/30">
                    Go to Dashboard
                  </button>
                  <button className="px-6 py-3 bg-black/60 backdrop-blur-sm text-gray-300 font-medium rounded-full border border-gray-700 hover:text-white hover:border-white hover:shadow-glow transition-all duration-300">
                    View Reports
                  </button>
                </div>
              </div>
              <div className="relative">
                <img
                  className="h-80 w-full object-cover rounded-xl border border-gray-800 shadow-large"
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                  alt="Admin workspace"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"></div>
                <div className="absolute inset-0 border border-blue-500/20 rounded-xl animate-pulse-glow"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Company Branding Section */}
        <div className="bg-black/90 backdrop-blur-sm py-8 border-b border-gray-800">
          <div className="max-w-7xl mx-auto px-8">
            <div className="bg-black/80 backdrop-blur-sm rounded-xl p-8 text-center border border-gray-800 shadow-glow relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-transparent"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-center space-x-4 mb-4">
                  <img 
                    src="https://naxrita.com/wp-content/uploads/2024/10/logo-t.png" 
                    alt="naxrita Logo"
                    className="h-12 w-auto"
                    onError={(e) => {e.target.style.display = 'none';}}
                  />
                  {/* <h3 className="bg-gradient-to-r from-white to-blue-300 bg-clip-text text-transparent text-2xl font-bold tracking-tight">naxrita</h3> */}
                </div>
                <p className="text-gray-300 text-lg">Leading Innovation • Empowering Teams • Driving Success</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Admin Actions */}
            <div className="lg:col-span-2">
  <div className="bg-black/90 backdrop-blur-sm rounded-xl border border-gray-800 shadow-glow overflow-hidden relative">
    <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-gray-600/5"></div>
    <div className="relative z-10 p-8">
      {/* Header with Auto-play Control */}
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
          Let's Focus on Administration
        </h2>
        <div className="flex items-center space-x-4">
          <button 
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="p-3 rounded-lg bg-black/60 backdrop-blur-sm border border-gray-700 text-gray-400 hover:text-white hover:border-blue-500 hover:shadow-glow transition-all duration-300"
          >
            {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
          </button>
          {/* Manual Carousel Controls */}
          <button 
            onClick={() => setQuickActionIndex(prev => prev === 0 ? quickActions.length - 3 : prev - 3)}
            className="p-3 rounded-lg bg-black/60 backdrop-blur-sm border border-gray-700 text-gray-400 hover:text-white hover:border-blue-500 hover:shadow-glow transition-all duration-300"
          >
            <ChevronLeft size={16} />
          </button>
          <button 
            onClick={() => setQuickActionIndex(prev => (prev + 3) % quickActions.length)}
            className="p-3 rounded-lg bg-black/60 backdrop-blur-sm border border-gray-700 text-gray-400 hover:text-white hover:border-blue-500 hover:shadow-glow transition-all duration-300"
          >
            <ChevronRight size={16} />
          </button>
          <span className="text-sm text-gray-500 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-lg border border-gray-800">
            Tuesday, 29 July, 2025
          </span>
        </div>
      </div>
      
      {/* Quick Actions Carousel */}
      <div className="mb-10">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
          Quick Actions
        </h3>
        <div className="relative overflow-hidden">
          <div 
            className="flex transition-transform duration-500 ease-in-out gap-4"
            style={{ transform: `translateX(-${quickActionIndex * (100/3)}%)` }}
          >
            {quickActions.map((action, index) => (
              <button 
                key={index}
                className="bg-black/70 backdrop-blur-sm hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-800 text-gray-300 hover:text-white text-sm font-medium py-3 px-6 border border-gray-700 hover:border-blue-500 rounded-lg transition-all duration-300 hover:shadow-glow hover:shadow-blue-500/20 flex-shrink-0 min-w-[200px] group"
              >
                <span className="group-hover:animate-pulse">{action}</span>
              </button>
            ))}
          </div>
        </div>
        
        {/* Carousel Indicators */}
        <div className="flex justify-center mt-4 space-x-2">
          {Array.from({ length: Math.ceil(quickActions.length / 3) }, (_, index) => (
            <button
              key={index}
              onClick={() => setQuickActionIndex(index * 3)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                Math.floor(quickActionIndex / 3) === index 
                  ? 'bg-blue-500 shadow-glow shadow-blue-500/50' 
                  : 'bg-gray-700 hover:bg-gray-600'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Awaiting Actions */}
      <div>
        <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent mb-6">
          Awaiting Your Action
        </h3>
        <div className="space-y-4">
          {awaitingActions.slice(0, 4).map((item, index) => (
            <div key={index} className="group flex items-start p-5 bg-black/70 backdrop-blur-sm rounded-xl hover:bg-black/80 transition-all duration-300 cursor-pointer border border-gray-800 hover:border-gray-600 hover:shadow-glow hover:shadow-blue-500/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-3 mr-4 flex-shrink-0 shadow-glow relative z-10">
                <item.icon className="text-white" size={20} />
              </div>
              <div className="flex-1 min-w-0 relative z-10">
                <p className="text-sm font-medium text-white mb-2 group-hover:text-blue-200 transition-colors">{item.title}</p>
                <p className="text-xs text-gray-500 mb-3">{item.subtitle}</p>
                <div className="flex items-center space-x-2">
                  {item.priority === 'urgent' && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30 backdrop-blur-sm">
                      <Clock className="mr-1" size={10} />
                      Urgent
                    </span>
                  )}
                  {item.priority === 'high' && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 backdrop-blur-sm">
                      <AlertCircle className="mr-1" size={10} />
                      High
                    </span>
                  )}
                  {item.priority === 'normal' && (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30 backdrop-blur-sm">
                      Normal
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-4 border-t border-gray-800">
          <button className="text-sm text-blue-400 hover:text-blue-300 font-medium flex items-center transition-colors duration-300 hover:shadow-glow">
            <CheckSquare className="mr-2" size={16} />
            Go to My Tasks ({awaitingActions.length})
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

            {/* Right Column: Announcements & Suggestions */}
            <div className="space-y-8">
              {/* Announcements Carousel */}
              <div className="bg-black/90 backdrop-blur-sm rounded-xl border border-gray-800 shadow-glow overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-transparent"></div>
                <div className="relative z-10 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      Announcements
                    </h3>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => setAnnouncementIndex(prev => prev === 0 ? announcements.length - 1 : prev - 1)}
                        className="p-2 rounded-lg bg-black/60 backdrop-blur-sm border border-gray-700 text-gray-400 hover:text-white hover:border-blue-500 hover:shadow-glow transition-all duration-300"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button 
                        onClick={() => setAnnouncementIndex(prev => (prev + 1) % announcements.length)}
                        className="p-2 rounded-lg bg-black/60 backdrop-blur-sm border border-gray-700 text-gray-400 hover:text-white hover:border-blue-500 hover:shadow-glow transition-all duration-300"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="relative overflow-hidden rounded-lg">
                    <div 
                      className="flex transition-transform duration-500 ease-in-out"
                      style={{ transform: `translateX(-${announcementIndex * 100}%)` }}
                    >
                      {announcements.map((announcement, index) => (
                        <div key={index} className="w-full flex-shrink-0 space-y-4">
                          <div className="relative">
                            <img
                              src={announcement.image}
                              alt="Announcement"
                              className="w-full h-32 object-cover rounded-lg border border-gray-800"
                            />
                            <span className="absolute top-2 left-2 px-3 py-1 bg-gradient-to-r from-blue-600 to-blue-800 text-white text-xs font-medium rounded-full shadow-glow">
                              {announcement.badge}
                            </span>
                            <div className="absolute inset-0 border border-blue-500/20 rounded-lg animate-pulse-glow"></div>
                          </div>
                          <div>
                            <h4 className="text-sm font-medium text-white mb-2 leading-tight">{announcement.title}</h4>
                            <p className="text-xs text-gray-400 leading-relaxed">{announcement.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
                    <span className="text-xs text-gray-500">{announcementIndex + 1} of {announcements.length}</span>
                    <div className="flex space-x-1">
                      {announcements.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setAnnouncementIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === announcementIndex 
                              ? 'bg-blue-500 shadow-glow shadow-blue-500/50' 
                              : 'bg-gray-700 hover:bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Timely Suggestions Carousel */}
              <div className="bg-black/90 backdrop-blur-sm rounded-xl border border-gray-800 shadow-glow overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-600/5 to-transparent"></div>
                <div className="relative z-10 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                      Timely Suggestions
                    </h3>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => setIsAutoPlayingSuggestions(!isAutoPlayingSuggestions)}
                        className="p-2 rounded-lg bg-black/60 backdrop-blur-sm border border-gray-700 text-gray-400 hover:text-white hover:border-blue-500 hover:shadow-glow transition-all duration-300"
                      >
                        {isAutoPlayingSuggestions ? <Pause size={14} /> : <Play size={14} />}
                      </button>
                      <button 
                        onClick={() => setSuggestionIndex(prev => prev === 0 ? timelySuggestions.length - 1 : prev - 1)}
                        className="p-2 rounded-lg bg-black/60 backdrop-blur-sm border border-gray-700 text-gray-400 hover:text-white hover:border-blue-500 hover:shadow-glow transition-all duration-300"
                      >
                        <ChevronLeft size={14} />
                      </button>
                      <button 
                        onClick={() => setSuggestionIndex(prev => (prev + 1) % timelySuggestions.length)}
                        className="p-2 rounded-lg bg-black/60 backdrop-blur-sm border border-gray-700 text-gray-400 hover:text-white hover:border-blue-500 hover:shadow-glow transition-all duration-300"
                      >
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                  
                  <div className="relative overflow-hidden">
                    <div 
                      className="flex transition-transform duration-500 ease-in-out"
                      style={{ transform: `translateX(-${suggestionIndex * 100}%)` }}
                    >
                      {timelySuggestions.map((suggestion, index) => (
                        <div key={index} className="w-full flex-shrink-0 p-4 bg-black/70 backdrop-blur-sm rounded-lg border border-gray-800 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-transparent"></div>
                          <div className="relative z-10">
                            <div className="flex items-start mb-4">
                              <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-3 mr-3 flex-shrink-0 shadow-glow">
                                <suggestion.icon className="text-white" size={20} />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-sm font-medium text-white mb-2">{suggestion.title}</h4>
                                <p className="text-xs text-gray-400 leading-relaxed mb-3">{suggestion.description}</p>
                                
                                {/* Progress Bar */}
                                <div className="mb-3">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="text-xs text-gray-400">Progress</span>
                                    <span className="text-xs text-gray-400">{suggestion.progress}%</span>
                                  </div>
                                  <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                                    <div 
                                      className="bg-gradient-to-r from-blue-600 to-blue-400 h-2 rounded-full transition-all duration-500 shadow-glow shadow-blue-500/30"
                                      style={{ width: `${suggestion.progress}%` }}
                                    ></div>
                                  </div>
                                </div>
                                
                                <button className="text-xs text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300 hover:shadow-glow">
                                  {suggestion.action} →
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-800">
                    <span className="text-xs text-gray-500">{suggestionIndex + 1} of {timelySuggestions.length}</span>
                    <div className="flex space-x-1">
                      {timelySuggestions.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setSuggestionIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all duration-300 ${
                            index === suggestionIndex 
                              ? 'bg-blue-500 shadow-glow shadow-blue-500/50' 
                              : 'bg-gray-700 hover:bg-gray-600'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="py-16 bg-black/90 backdrop-blur-sm border-t border-gray-800">
          <div className="max-w-7xl mx-auto px-8">
            <div className="text-center mb-12">
              <h2 className="text-sm text-blue-400 font-semibold tracking-wide uppercase mb-2">Your Admin Tools</h2>
              <p className="text-3xl font-extrabold bg-gradient-to-r from-white via-gray-200 to-blue-300 bg-clip-text text-transparent sm:text-4xl">
                Everything you need to manage your team
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  name: 'Employee Management',
                  description: 'Onboard, manage, and track employee details.',
                  icon: Users,
                },
                {
                  name: 'Compliance Reports',
                  description: 'Generate and review compliance reports.',
                  icon: FileText,
                },
                {
                  name: 'Analytics Dashboard',
                  description: 'Access real-time insights and analytics.',
                  icon: BarChart3,
                },
                {
                  name: 'Policy Updates',
                  description: 'Manage and update company policies.',
                  icon: Book,
                },
              ].map((feature) => (
                <div key={feature.name} className="text-center bg-black/80 backdrop-blur-sm rounded-xl p-8 hover:bg-black/90 transition-all duration-300 border border-gray-800 hover:border-gray-600 hover:shadow-glow hover:shadow-blue-500/20 group relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="bg-gradient-to-r from-blue-600 to-blue-800 inline-flex items-center justify-center h-16 w-16 rounded-lg text-white mb-6 group-hover:scale-110 transition-transform duration-300 shadow-glow">
                      <feature.icon size={24} />
                    </div>
                    <h3 className="text-lg font-medium text-white mb-3 group-hover:text-blue-200 transition-colors">{feature.name}</h3>
                    <p className="text-sm text-gray-400">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 via-blue-700 to-blue-800 border-t border-gray-800 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative z-10 max-w-4xl mx-auto text-center py-16 px-8">
            <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-4">
              Drive Success
            </h2>
            <p className="text-xl text-blue-100 mb-8">Empower your team, lead with data.</p>
            <button className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-blue-600 bg-white hover:bg-blue-50 transition-all duration-300 shadow-glow hover:shadow-white/30 hover:-translate-y-1 group">
              <BarChart3 className="mr-3 group-hover:animate-pulse" size={20} />
              Access Analytics
            </button>
          </div>
        </div>
      </div>

      {/* Global Styles */}
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        
        .font-jakarta {
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
        }
        
        .shadow-glow {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
        }
        
        .shadow-large {
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.8);
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        
        @keyframes float-up {
          0% { 
            transform: translateY(100vh) rotate(0deg); 
            opacity: 0; 
          }
          10% { 
            opacity: 1; 
          }
          90% { 
            opacity: 1; 
          }
          100% { 
            transform: translateY(-100px) rotate(360deg); 
            opacity: 0; 
          }
        }
        
        @keyframes drift {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes drift-reverse {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 30px) scale(0.9); }
          66% { transform: translate(20px, -20px) scale(1.1); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 0 5px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.6); }
        }
        
        .animate-twinkle {
          animation: twinkle var(--duration, 3s) ease-in-out infinite;
        }
        
        .animate-float-up {
          animation: float-up var(--duration, 8s) linear infinite;
        }
        
        .animate-drift {
          animation: drift 30s ease-in-out infinite;
        }
        
        .animate-drift-reverse {
          animation: drift-reverse 25s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 20s ease-in-out infinite;
        }
        
        .animate-pulse-glow {
          animation: pulse-glow 4s ease-in-out infinite;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-twinkle,
          .animate-float-up,
          .animate-drift,
          .animate-drift-reverse,
          .animate-pulse-slow,
          .animate-pulse-glow {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminHomepage;
