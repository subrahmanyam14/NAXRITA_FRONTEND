import React, { useState, useEffect } from 'react';
import { 
  Book, 
  User, 
  MapPin, 
  Bell, 
  ArrowLeft, 
  ArrowRight,
  CheckSquare,
  GraduationCap,
  TrendingUp,
  Palmtree,
  MessageCircle,
  Route,
  Clock,
  ExternalLink,
  Lightbulb,
  Trophy,
  Calendar,
  FileText,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { FaArrowLeft, FaArrowRight, FaExternalLinkAlt, FaTasks, FaGraduationCap, FaChartLine, FaUmbrellaBeach } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const HomeEmployee = () => {
  const { user } = useAuth();
  const [currentAnnouncementIndex, setCurrentAnnouncementIndex] = useState(0);
  const [currentSuggestionSlide, setCurrentSuggestionSlide] = useState(0);

  // Auto-scroll for carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentAnnouncementIndex((prev) => 
        prev === announcements.length - 1 ? 0 : prev + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Auto-scroll for suggestions carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSuggestionSlide((prev) => 
        prev === Math.ceil(timelySuggestions.length / 3) - 1 ? 0 : prev + 1
      );
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const quickActions = [
    'Required Learning',
    'Feedback HUB', 
    'Priorities Homepage',
    'Create Digital CV/Resume',
    'Skills Engine',
    'Performance Review'
  ];

  const awaitingActions = [
    {
      icon: MessageCircle,
      iconBg: 'bg-blue-600/20',
      iconColor: 'text-blue-400',
      title: 'Give Feedback: KASTURI VIKRAM',
      subtitle: 'My Tasks - 4 month(s) ago',
      priority: 'normal'
    },
    {
      icon: User,
      iconBg: 'bg-green-600/20',
      iconColor: 'text-green-400',
      title: 'Clean Hands Conversation with New Joiner',
      subtitle: 'Packaged App Development Senior Analyst - 5 month(s) ago',
      priority: 'normal'
    },
    {
      icon: Route,
      iconBg: 'bg-purple-600/20',
      iconColor: 'text-purple-400',
      title: 'You Have 2 Assigned Journeys',
      subtitle: 'Priorities & Reflections Journey, FY25 Prepare For Year-End',
      priority: 'high'
    },
    {
      icon: Book,
      iconBg: 'bg-red-600/20',
      iconColor: 'text-red-400',
      title: 'Required Learning Due',
      subtitle: 'DUE 23/12/2024',
      priority: 'urgent'
    }
  ];

  const announcements = [
    {
      image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop&crop=center',
      title: 'Jobs Gateway is now integrated with Workday',
      description: 'Are you looking to tailor your resume to the roles that matter?'
    },
    {
      image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop&crop=center',
      title: 'New Learning Platform Launch',
      description: 'Discover enhanced learning experiences with our updated platform.'
    },
    {
      image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=100&h=100&fit=crop&crop=center',
      title: 'Q4 Performance Reviews Starting',
      description: 'Prepare your achievements and goals for the upcoming review cycle.'
    }
  ];

  const timelySuggestions = [
    {
      icon: Lightbulb,
      iconBg: 'bg-yellow-600/20',
      iconColor: 'text-yellow-400',
      title: 'Complete Your Skills Assessment',
      description: 'Update your skill profile to get personalized learning recommendations',
      action: 'Start Assessment'
    },
    {
      icon: Trophy,
      iconBg: 'bg-orange-600/20',
      iconColor: 'text-orange-400',
      title: 'Career Development Workshop',
      description: 'Join the upcoming session on leadership skills - Register by Friday',
      action: 'Register Now'
    },
    {
      icon: Calendar,
      iconBg: 'bg-indigo-600/20',
      iconColor: 'text-indigo-400',
      title: 'Q4 Performance Review Prep',
      description: 'Start gathering your achievements and feedback for year-end review',
      action: 'View Guide'
    },
    {
      icon: FileText,
      iconBg: 'bg-purple-600/20',
      iconColor: 'text-purple-400',
      title: 'Update Your Profile',
      description: 'Keep your professional information current for better opportunities',
      action: 'Update Now'
    },
    {
      icon: Book,
      iconBg: 'bg-blue-600/20',
      iconColor: 'text-blue-400',
      title: 'New Compliance Training',
      description: 'Complete mandatory security and compliance modules by month end',
      action: 'Start Training'
    },
    {
      icon: TrendingUp,
      iconBg: 'bg-green-600/20',
      iconColor: 'text-green-400',
      title: 'Goal Setting Session',
      description: 'Set your Q1 objectives and key results with your manager',
      action: 'Schedule Meeting'
    }
  ];

  // Cosmic background styles
  const cosmicStyles = {
    background: `
      radial-gradient(circle at 20% 50%, rgba(37, 99, 235, 0.05) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(107, 114, 128, 0.03) 0%, transparent 50%),
      radial-gradient(circle at 40% 80%, rgba(37, 99, 235, 0.02) 0%, transparent 50%),
      #0a0a0a
    `
  };

  return (
    <div 
      className="min-h-screen text-white font-jakarta"
      style={cosmicStyles}
    >
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {/* Starfield */}
        {/* {Array.from({ length: 150 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              backgroundColor: ['#ffffff', '#2563eb', '#a3a3a3', '#6b7280'][Math.floor(Math.random() * 4)],
              animation: `twinkle ${3 + Math.random() * 2}s ease-in-out infinite alternate`,
            }}
          />
        ))} */}
        
        {/* Floating Sparkles */}
        {/* {Array.from({ length: 25 }).map((_, i) => (
          <div
            key={`sparkle-${i}`}
            className="absolute rounded-full opacity-40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              backgroundColor: ['#2563eb', '#22c55e', '#f59e0b', '#ffffff'][Math.floor(Math.random() * 4)],
              animation: `float ${8 + Math.random() * 4}s linear infinite`,
              animationDelay: `${Math.random() * 8}s`,
            }}
          />
        ))} */}
      </div>

      {/* Hero Section - Dark Theme */}
      <div className="relative bg-gradient-to-br from-black via-gray-900 to-black overflow-hidden">
        <div className="max-w-full mx-auto">
          <div className="relative z-10 pb-0 bg-gradient-to-r from-black/80 via-gray-900/60 to-transparent sm:pb-8 md:pb-12 lg:max-w-2xl lg:w-full lg:pb-16 xl:pb-20">
            <main className="mt-6 mx-auto max-w-7xl px-8 sm:mt-8 sm:px-6 md:mt-10 lg:mt-12 lg:px-8 xl:mt-16">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-bold font-jakarta text-white sm:text-5xl md:text-6xl">
                  <span className="block text-white">Hello,</span>
                  <span className="block text-blue-400 font-jakarta bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                    {user?.name || 'Team Member'}
                  </span>
                </h1>
                <p className="mt-3 text-lg text-gray-300 font-jakarta sm:mt-5 sm:text-xl sm:max-w-xl sm:mx-auto md:mt-5 md:text-2xl lg:mx-0">
                  Welcome to your HR Portal. Access your tasks, learning, and performance in one cosmic workspace.
                </p>
                <div className="mt-8 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-4">
                  <button className="group relative flex items-center justify-center px-8 py-4 border border-transparent font-jakarta text-lg font-medium rounded-full text-white bg-indigo-600 hover:bg-indigo-700 shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 hover:shadow-2xl backdrop-blur-sm">
                    <span className="relative z-10">Go to Dashboard</span>
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </button>
                  <button className="group flex items-center justify-center px-8 py-4 border border-gray-600 text-lg font-medium rounded-full text-gray-300 bg-gray-800/50 hover:bg-gray-700/50 hover:text-white transition-all duration-300 hover:scale-105 backdrop-blur-sm border-opacity-50 hover:border-gray-500">
                    View Policies
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <div className="relative h-64 w-full sm:h-72 md:h-96 lg:w-full lg:h-full">
            <img
              className="h-full w-full object-cover opacity-70"
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
              alt="Employee workspace"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/20 to-black/80"></div>
          </div>
        </div>
      </div>

      {/* Let's Focus on You Section - Dark Theme with Enhanced Styling */}
      <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column: Awaiting Your Action */}
          <div className="lg:w-2/3 bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800 overflow-hidden hover:shadow-blue-500/10 transition-all duration-500">
            <div className="p-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-semibold text-white font-jakarta">Let's Focus on You</h2>
                <p className="text-sm text-gray-400 bg-gray-800/60 px-4 py-2 rounded-full backdrop-blur-sm">
                  Tuesday, 29 July, 2025
                </p>
              </div>
              
              {/* Quick Action Buttons - Dark Theme */}
              <div className="flex flex-wrap gap-3 mb-8">
                {quickActions.map((action, index) => (
                  <button 
                    key={index}
                    className="group bg-gray-800/60 hover:bg-gray-700/80 text-gray-300 hover:text-white text-sm font-medium py-3 px-5 border border-gray-700 rounded-xl shadow-lg transition-all duration-300 hover:shadow-blue-500/20 hover:scale-105 backdrop-blur-sm hover:border-blue-500/50"
                  >
                    <span className="flex items-center">
                      {action}
                      {index < 4 && <ExternalLink className="inline ml-2 text-gray-500 group-hover:text-blue-400 transition-colors" size={14} />}
                    </span>
                  </button>
                ))}
                <button className="bg-gray-800/60 hover:bg-gray-700/80 text-gray-500 text-sm font-medium py-3 px-5 border border-gray-700 rounded-xl backdrop-blur-sm transition-all duration-300">
                  <span>...</span>
                </button>
              </div>

              {/* Awaiting Your Action */}
              <div>
                <h3 className="text-2xl font-semibold mb-6 text-gray-200">Awaiting Your Action</h3>
                <div className="space-y-4">
                  {awaitingActions.map((item, index) => (
                    <div key={index} className="group flex items-start p-4 bg-gray-800/40 rounded-2xl hover:bg-gray-700/60 transition-all duration-300 cursor-pointer backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10">
                      <div className={`${item.iconBg} rounded-xl p-3 mr-4 flex-shrink-0 backdrop-blur-sm border border-gray-600/30`}>
                        <item.icon className={`${item.iconColor} text-lg`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-base font-medium text-white mb-2 group-hover:text-blue-300 transition-colors">{item.title}</p>
                        <p className="text-sm text-gray-400">{item.subtitle}</p>
                      </div>
                      {item.priority === 'urgent' && (
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-900/50 text-red-300 border border-red-800/50 backdrop-blur-sm">
                          <Clock className="mr-1" size={12} />
                          Urgent
                        </span>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-6 pt-4 border-t border-gray-700">
                  <button className="text-base text-blue-400 hover:text-blue-300 font-medium flex items-center group transition-all duration-300">
                    <CheckSquare className="mr-2 group-hover:scale-110 transition-transform" size={20} />
                    Go to My Tasks (4)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Announcements Carousel */}
          <div className="lg:w-1/3 h-fit bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800 overflow-hidden">
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-6 text-white">Announcements</h3>
              
              {/* Carousel Container */}
              <div className="relative">
                <div className="overflow-hidden rounded-xl">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentAnnouncementIndex * 100}%)` }}
                  >
                    {announcements.map((announcement, index) => (
                      <div key={index} className="w-full flex-shrink-0">
                        <div className="flex items-start space-x-4 p-4 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700/50">
                          <img
                            src={announcement.image}
                            alt="Announcement"
                            className="w-16 h-16 object-cover rounded-xl flex-shrink-0 border border-gray-600"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-base font-medium text-white mb-2 line-clamp-2">{announcement.title}</p>
                            <p className="text-sm text-gray-400 line-clamp-3">{announcement.description}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Carousel Controls */}
                <div className="flex items-center justify-between mt-6">
                  <span className="text-sm text-gray-400">
                    {currentAnnouncementIndex + 1} of {announcements.length}
                  </span>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => setCurrentAnnouncementIndex(prev => 
                        prev === 0 ? announcements.length - 1 : prev - 1
                      )}
                      className="text-gray-400 hover:text-white p-2 bg-gray-800/60 rounded-lg hover:bg-gray-700/80 transition-all duration-300 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <button 
                      onClick={() => setCurrentAnnouncementIndex(prev => 
                        prev === announcements.length - 1 ? 0 : prev + 1
                      )}
                      className="text-gray-400 hover:text-white p-2 bg-gray-800/60 rounded-lg hover:bg-gray-700/80 transition-all duration-300 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>

                {/* Carousel Indicators */}
                <div className="flex justify-center space-x-2 mt-4">
                  {announcements.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentAnnouncementIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 ${
                        index === currentAnnouncementIndex 
                          ? 'bg-blue-500 w-8 shadow-blue-500/50 shadow-md' 
                          : 'bg-gray-600 hover:bg-gray-500'
                      }`}
                    />
                  ))}
                </div>
                
                <div className="pt-6 border-t border-gray-700 mt-6">
                  <Link to="#" className="text-base text-blue-400 hover:text-blue-300 font-medium flex items-center group">
                    <FaExternalLinkAlt className="mr-2 group-hover:scale-110 transition-transform" size={14} />
                    View All Apps
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timely Suggestions Carousel */}
      <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8 py-8">
        <div className="bg-gray-900/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-gray-800 overflow-hidden">
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h3 className="text-3xl font-semibold text-white">Timely Suggestions</h3>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setCurrentSuggestionSlide(prev => 
                    prev === 0 ? Math.ceil(timelySuggestions.length / 3) - 1 : prev - 1
                  )}
                  className="text-gray-400 hover:text-white p-3 bg-gray-800/60 rounded-xl hover:bg-gray-700/80 transition-all duration-300 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50"
                >
                  <ChevronLeft size={20} />
                </button>
                <button 
                  onClick={() => setCurrentSuggestionSlide(prev => 
                    prev === Math.ceil(timelySuggestions.length / 3) - 1 ? 0 : prev + 1
                  )}
                  className="text-gray-400 hover:text-white p-3 bg-gray-800/60 rounded-xl hover:bg-gray-700/80 transition-all duration-300 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
            
            <div className="overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSuggestionSlide * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(timelySuggestions.length / 3) }).map((_, slideIndex) => (
                  <div key={slideIndex} className="w-full flex-shrink-0">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      {timelySuggestions.slice(slideIndex * 3, (slideIndex + 1) * 3).map((suggestion, index) => (
                        <div key={index} className="group p-6 bg-gray-800/50 rounded-2xl hover:bg-gray-700/60 transition-all duration-300 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/30 hover:shadow-lg hover:shadow-blue-500/10 hover:scale-105">
                          <div className="flex items-start mb-4">
                            <div className={`${suggestion.iconBg} rounded-xl p-3 mr-4 flex-shrink-0 backdrop-blur-sm border border-gray-600/30`}>
                              <suggestion.icon className={`${suggestion.iconColor} text-xl`} />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-lg font-medium text-white mb-2 group-hover:text-blue-300 transition-colors">{suggestion.title}</h4>
                            </div>
                          </div>
                          <p className="text-sm text-gray-400 mb-4 leading-relaxed">{suggestion.description}</p>
                          <button className="text-sm text-blue-400 hover:text-blue-300 font-medium group-hover:translate-x-1 transition-all duration-300">
                            {suggestion.action} →
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggestion Carousel Indicators */}
            <div className="flex justify-center space-x-2 mt-8">
              {Array.from({ length: Math.ceil(timelySuggestions.length / 3) }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSuggestionSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentSuggestionSlide 
                      ? 'bg-blue-500 w-10 shadow-blue-500/50 shadow-md' 
                      : 'bg-gray-600 hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features Section - Dark Theme */}
      <div className="py-16 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-16">
            <h2 className="text-lg text-green-400 font-semibold tracking-wide uppercase font-jakarta">Your Cosmic Tools</h2>
            <p className="mt-4 text-4xl leading-10 font-bold tracking-tight text-white sm:text-5xl font-jakarta">
              Everything you need to succeed
            </p>
            <p className="mt-4 text-xl text-gray-300 max-w-3xl mx-auto">
              Navigate your professional journey with our comprehensive suite of tools
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: 'My Tasks',
                description: 'Stay on top of your assignments and deadlines with intelligent prioritization.',
                icon: FaTasks,
                color: 'bg-blue-600',
                glow: 'shadow-blue-500/30',
              },
              {
                name: 'Learning & Development',
                description: 'Access personalized training paths and grow your skills exponentially.',
                icon: FaGraduationCap,
                color: 'bg-green-600',
                glow: 'shadow-green-500/30',
              },
              {
                name: 'Performance Goals',
                description: 'Track your progress and celebrate achievements in real-time.',
                icon: FaChartLine,
                color: 'bg-purple-600',
                glow: 'shadow-purple-500/30',
              },
              {
                name: 'Time Off',
                description: 'Seamlessly request and manage your well-deserved breaks.',
                icon: FaUmbrellaBeach,
                color: 'bg-orange-600',
                glow: 'shadow-orange-500/30',
              },
            ].map((feature) => (
              <div key={feature.name} className="group text-center p-6 bg-gray-900/60 backdrop-blur-xl rounded-2xl border border-gray-800 hover:border-gray-600 transition-all duration-500 hover:scale-105">
                <div className={`${feature.color} inline-flex items-center justify-center h-20 w-20 rounded-2xl text-white mb-6 shadow-2xl ${feature.glow} group-hover:scale-110 transition-all duration-300`}>
                  <feature.icon className="text-3xl" />
                </div>
                <h3 className="text-xl leading-6 font-semibold text-white mb-4 font-jakarta group-hover:text-blue-300 transition-colors">{feature.name}</h3>
                <p className="text-base text-gray-400 group-hover:text-gray-300 transition-colors">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section - Enhanced Dark Theme */}
      <div className="bg-gradient-to-r from-blue-900/80 via-indigo-900/80 to-blue-900/80 backdrop-blur-xl border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center py-20 px-8 sm:py-24 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-white sm:text-5xl font-jakarta mb-6">
            <span className="block">Keep growing in the</span>
            <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">cosmic workspace</span>
          </h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Your journey matters. Every step forward illuminates new possibilities in your professional constellation.
          </p>
          <Link
            to="/employee/learning"
            className="group inline-flex items-center justify-center px-10 py-5 border border-transparent text-xl font-medium rounded-2xl text-blue-900 bg-white hover:bg-gray-100 transition-all duration-300 shadow-2xl hover:shadow-white/20 hover:scale-105 backdrop-blur-sm"
          >
            <FaGraduationCap className="mr-3 group-hover:scale-110 transition-transform" />
            <span>Start Learning Journey</span>
          </Link>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes twinkle {
          0% { opacity: 0.2; }
          100% { opacity: 0.8; }
        }
        
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default HomeEmployee;
