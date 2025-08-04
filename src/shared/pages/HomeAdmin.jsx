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
  Pause
} from 'lucide-react';

const AdminHomepage = () => {
  const user = { name: "Sarah Johnson", role: "Admin" };
  
  // Carousel states
  const [announcementIndex, setAnnouncementIndex] = useState(0);
  const [suggestionIndex, setSuggestionIndex] = useState(0);
  const [quickActionIndex, setQuickActionIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

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
      iconBg: 'from-indigo-500 to-purple-600',
      title: 'Approve New Employee Onboarding: John Doe',
      subtitle: 'Submitted - 3 day(s) ago',
      priority: 'high'
    },
    {
      icon: FileText,
      iconBg: 'from-purple-500 to-pink-600',
      title: 'Review Monthly Compliance Report',
      subtitle: 'Due - 5 day(s) from now',
      priority: 'normal'
    },
    {
      icon: Calendar,
      iconBg: 'from-blue-500 to-indigo-600',
      title: 'Schedule Annual Performance Reviews',
      subtitle: 'FY25 Performance Review Season',
      priority: 'high'
    },
    {
      icon: Book,
      iconBg: 'from-red-500 to-orange-600',
      title: 'Update Training Modules',
      subtitle: 'DUE 15/08/2025',
      priority: 'urgent'
    },
    {
      icon: Shield,
      iconBg: 'from-emerald-500 to-teal-600',
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
      iconBg: 'from-emerald-500 to-teal-600',
      title: 'Compliance Audit Preparation',
      description: 'Review audit checklist and ensure all documentation is ready',
      action: 'Start Preparation',
      progress: 75
    },
    {
      icon: TrendingUp,
      iconBg: 'from-violet-500 to-purple-600',
      title: 'Team Performance Analytics',
      description: 'New insights available for Q3 performance trends and metrics',
      action: 'View Analytics',
      progress: 90
    },
    {
      icon: Award,
      iconBg: 'from-amber-500 to-orange-600',
      title: 'Employee Recognition Program',
      description: 'Launch the monthly recognition program for outstanding performers',
      action: 'Launch Program',
      progress: 60
    },
    {
      icon: Calendar,
      iconBg: 'from-blue-500 to-indigo-600',
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
      setSuggestionIndex(prev => (prev + 1) % timelySuggestions.length);
      setQuickActionIndex(prev => (prev + 3) % quickActions.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, announcements.length, timelySuggestions.length, quickActions.length]);

  return (
    <div className="bg-[#0a0a0a] min-h-screen font-jakarta relative overflow-hidden">
      {/* Cosmic Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Starfield */}
        <div className="absolute inset-0">
          {[...Array(150)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                backgroundColor: ['#ffffff', '#2563eb', '#a3a3a3', '#6b7280'][Math.floor(Math.random() * 4)],
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Floating Sparkles */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${6 + Math.random() * 4}s`
              }}
            >
              <div
                className="rounded-full opacity-60"
                style={{
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  backgroundColor: ['#2563eb', '#22c55e', '#f59e0b', '#ffffff'][Math.floor(Math.random() * 4)],
                  boxShadow: `0 0 10px currentColor`
                }}
              />
            </div>
          ))}
        </div>

        {/* Animated Dots */}
        <div className="absolute inset-0">
          {[...Array(80)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                backgroundColor: ['rgba(37, 99, 235, 0.3)', 'rgba(163, 163, 163, 0.2)', 'rgba(107, 114, 128, 0.1)'][Math.floor(Math.random() * 3)],
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${4 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Compliance Banner */}
      <div className="relative z-10 bg-gradient-to-r bg-white position-sticky top-0 text-black px-2 py-1 border-b border-[#2a2a2a]">
        <div className="flex justify-between items-center max-w-full mx-auto">
          <div className="flex-1 align-center justify-center ">
            <p className="text-sm font-semibold">🚨 Upcoming Compliance Audit:</p>
            <span className="text-xs ml-2 text-gray-600">Prepare Your Reports by August 15</span>
          </div>
          
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 bg-gradient-to-br from-[#111111] to-[#161616] backdrop-blur-sm border-b border-[#2a2a2a]">
        <div className="max-w-full mx-auto px-2 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="mb-2">
                <span className="text-sm font-medium text-[#a3a3a3] block mb-1">Hello,</span>
                <h1 className="text-4xl font-bold text-white tracking-tight">
                  {user?.name || 'Admin'}
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white ml-3 shadow-lg shadow-blue-500/20">
                    {user?.role || 'Admin'}
                  </span>
                </h1>
              </div>
              <p className="text-lg text-[#a3a3a3] mb-6 leading-relaxed">
                Manage your team's performance, access insights, and ensure compliance in one cosmic workspace.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-6 py-3 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white font-medium rounded-xl hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 border border-[#2563eb] backdrop-blur-sm">
                  Go to Dashboard
                </button>
                <button className="px-6 py-3 bg-[#161616]/80 text-[#a3a3a3] font-medium rounded-xl hover:text-white hover:bg-[#1e1e1e] transition-all duration-300 border border-[#404040] hover:border-[#2563eb] backdrop-blur-sm">
                  View Reports
                </button>
              </div>
            </div>
            <div className="relative">
              <img
                className="h-80 w-full object-cover rounded-2xl border border-[#2a2a2a] shadow-2xl shadow-black/50"
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
                alt="Admin workspace"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/60 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Branding Section */}
      <div className="relative z-10 bg-gradient-to-r from-[#111111] to-[#1a1a1a] py-8 border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="bg-[#1e1e1e]/80 backdrop-blur-sm rounded-2xl p-8 text-center border border-[#2a2a2a] shadow-xl shadow-black/20">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <img 
                src="https://naxrita.com/wp-content/uploads/2024/10/logo-t.png" 
                alt="Nexrita Logo"
                className="h-12 w-auto"
                onError={(e) => {e.target.style.display = 'none';}}
              />
              <h3 className="text-white text-2xl font-bold tracking-tight">Nexrita</h3>
            </div>
            <p className="text-[#a3a3a3] text-lg">Leading Innovation • Empowering Teams • Driving Success</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column: Admin Actions */}
          <div className="lg:col-span-2">
            <div className="bg-[#1e1e1e]/80 backdrop-blur-sm rounded-2xl border border-[#2a2a2a] shadow-xl shadow-black/20 overflow-hidden">
              <div className="p-8">
                {/* Header with Auto-play Control */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Let's Focus on Administration</h2>
                  <div className="flex items-center space-x-4">
                    <button 
                      onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                      className="p-2 rounded-lg bg-[#161616] border border-[#404040] text-[#a3a3a3] hover:text-white hover:border-[#2563eb] transition-all duration-300"
                    >
                      {isAutoPlaying ? <Pause size={16} /> : <Play size={16} />}
                    </button>
                    <span className="text-sm text-[#6b7280] bg-[#161616] px-3 py-1 rounded-full border border-[#2a2a2a]">
                      Tuesday, 29 July, 2025
                    </span>
                  </div>
                </div>
                
                {/* Quick Actions Carousel */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-4">Quick Actions</h3>
                  <div className="relative overflow-hidden">
                    <div 
                      className="flex transition-transform duration-500 ease-in-out gap-3"
                      style={{ transform: `translateX(-${quickActionIndex * (100/3)}%)` }}
                    >
                      {quickActions.map((action, index) => (
                        <button 
                          key={index}
                          className="bg-[#161616]/80 backdrop-blur-sm hover:bg-[#2563eb] text-[#a3a3a3] hover:text-white text-sm font-medium py-3 px-4 border border-[#404040] hover:border-[#2563eb] rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20 flex-shrink-0 min-w-[200px]"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Awaiting Actions */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-6">Awaiting Your Action</h3>
                  <div className="space-y-4">
                    {awaitingActions.slice(0, 4).map((item, index) => (
                      <div key={index} className="group flex items-start p-4 bg-[#161616]/50 backdrop-blur-sm rounded-xl hover:bg-[#1e1e1e] transition-all duration-300 cursor-pointer border border-[#2a2a2a] hover:border-[#404040] hover:shadow-lg hover:shadow-black/20">
                        <div className={`bg-gradient-to-br ${item.iconBg} rounded-xl p-3 mr-4 flex-shrink-0 shadow-lg`}>
                          <item.icon className="text-white" size={20} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white mb-1 group-hover:text-blue-200 transition-colors">{item.title}</p>
                          <p className="text-xs text-[#6b7280] mb-2">{item.subtitle}</p>
                          <div className="flex items-center space-x-2">
                            {item.priority === 'urgent' && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#ef4444]/20 text-[#ef4444] border border-[#ef4444]/30">
                                <Clock className="mr-1" size={10} />
                                Urgent
                              </span>
                            )}
                            {item.priority === 'high' && (
                              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#f59e0b]/20 text-[#f59e0b] border border-[#f59e0b]/30">
                                <AlertCircle className="mr-1" size={10} />
                                High
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 pt-4 border-t border-[#2a2a2a]">
                    <button className="text-sm text-[#2563eb] hover:text-[#1d4ed8] font-medium flex items-center transition-colors duration-300">
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
            <div className="bg-[#1e1e1e]/80 backdrop-blur-sm rounded-2xl border border-[#2a2a2a] shadow-xl shadow-black/20 overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white">Announcements</h3>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setAnnouncementIndex(prev => prev === 0 ? announcements.length - 1 : prev - 1)}
                      className="p-2 rounded-lg bg-[#161616] border border-[#404040] text-[#a3a3a3] hover:text-white hover:border-[#2563eb] transition-all duration-300"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button 
                      onClick={() => setAnnouncementIndex(prev => (prev + 1) % announcements.length)}
                      className="p-2 rounded-lg bg-[#161616] border border-[#404040] text-[#a3a3a3] hover:text-white hover:border-[#2563eb] transition-all duration-300"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
                
                <div className="relative overflow-hidden rounded-xl">
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
                            className="w-full h-32 object-cover rounded-lg border border-[#2a2a2a]"
                          />
                          <span className="absolute top-2 left-2 px-2 py-1 bg-[#2563eb] text-white text-xs font-medium rounded-full">
                            {announcement.badge}
                          </span>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-white mb-2 leading-tight">{announcement.title}</h4>
                          <p className="text-xs text-[#6b7280] leading-relaxed">{announcement.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-[#2a2a2a]">
                  <span className="text-xs text-[#6b7280]">{announcementIndex + 1} of {announcements.length}</span>
                  <div className="flex space-x-1">
                    {announcements.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => setAnnouncementIndex(index)}
                        className={`w-2 h-2 rounded-full transition-all duration-300 ${
                          index === announcementIndex ? 'bg-[#2563eb]' : 'bg-[#404040]'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Timely Suggestions Carousel */}
            <div className="bg-[#1e1e1e]/80 backdrop-blur-sm rounded-2xl border border-[#2a2a2a] shadow-xl shadow-black/20 overflow-hidden">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-white mb-6">Timely Suggestions</h3>
                
                <div className="relative overflow-hidden">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${suggestionIndex * 100}%)` }}
                  >
                    {timelySuggestions.map((suggestion, index) => (
                      <div key={index} className="w-full flex-shrink-0 p-4 bg-[#161616]/50 rounded-xl border border-[#2a2a2a]">
                        <div className="flex items-start mb-4">
                          <div className={`bg-gradient-to-br ${suggestion.iconBg} rounded-lg p-3 mr-3 flex-shrink-0 shadow-lg`}>
                            <suggestion.icon className="text-white" size={20} />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium text-white mb-2">{suggestion.title}</h4>
                            <p className="text-xs text-[#6b7280] leading-relaxed mb-3">{suggestion.description}</p>
                            
                            {/* Progress Bar */}
                            <div className="mb-3">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-xs text-[#a3a3a3]">Progress</span>
                                <span className="text-xs text-[#a3a3a3]">{suggestion.progress}%</span>
                              </div>
                              <div className="w-full bg-[#2a2a2a] rounded-full h-1.5">
                                <div 
                                  className="bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] h-1.5 rounded-full transition-all duration-500"
                                  style={{ width: `${suggestion.progress}%` }}
                                ></div>
                              </div>
                            </div>
                            
                            <button className="text-xs text-[#2563eb] hover:text-[#1d4ed8] font-medium transition-colors duration-300">
                              {suggestion.action} →
                            </button>
                          </div>
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

      {/* Features Section */}
      <div className="relative z-10 py-16 bg-gradient-to-br from-[#111111] to-[#161616] border-t border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-sm text-[#2563eb] font-semibold tracking-wide uppercase mb-2">Your Admin Tools</h2>
            <p className="text-3xl font-extrabold text-white sm:text-4xl">
              Everything you need to manage your team
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: 'Employee Management',
                description: 'Onboard, manage, and track employee details.',
                icon: Users,
                color: 'from-indigo-500 to-purple-600',
              },
              {
                name: 'Compliance Reports',
                description: 'Generate and review compliance reports.',
                icon: FileText,
                color: 'from-purple-500 to-pink-600',
              },
              {
                name: 'Analytics Dashboard',
                description: 'Access real-time insights and analytics.',
                icon: BarChart3,
                color: 'from-blue-500 to-indigo-600',
              },
              {
                name: 'Policy Updates',
                description: 'Manage and update company policies.',
                icon: Book,
                color: 'from-emerald-500 to-teal-600',
              },
            ].map((feature) => (
              <div key={feature.name} className="text-center bg-[#1e1e1e]/80 backdrop-blur-sm rounded-2xl p-8 hover:bg-[#1e1e1e] transition-all duration-300 border border-[#2a2a2a] hover:border-[#404040] hover:shadow-xl hover:shadow-black/20 group">
                <div className={`bg-gradient-to-br ${feature.color} inline-flex items-center justify-center h-16 w-16 rounded-xl text-white mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon size={24} />
                </div>
                <h3 className="text-lg font-medium text-white mb-3">{feature.name}</h3>
                <p className="text-sm text-[#a3a3a3]">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] border-t border-[#2a2a2a]">
        <div className="max-w-4xl mx-auto text-center py-16 px-6">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl mb-4">
            Drive Success
          </h2>
          <p className="text-xl text-blue-100 mb-8">Empower your team, lead with data.</p>
          <button className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-[#2563eb] bg-white hover:bg-blue-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1">
            <BarChart3 className="mr-3" size={20} />
            Access Analytics
          </button>
        </div>
      </div>

      {/* Global Styles for Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.8; }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-cosmic-pulse {
          animation: pulse 3s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AdminHomepage;
