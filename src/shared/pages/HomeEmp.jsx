
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
  FileText
} from 'lucide-react';
import { FaArrowLeft, FaArrowRight , FaExternalLinkAlt , FaTasks , FaGraduationCap , FaChartLine , FaUmbrellaBeach ,} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
const HomeEmployee = () => {
   const { user } = useAuth(); // Mock user data

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
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      title: 'Give Feedback: KASTURI VIKRAM',
      subtitle: 'My Tasks - 4 month(s) ago',
      priority: 'normal'
    },
    {
      icon: User,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      title: 'Clean Hands Conversation with New Joiner',
      subtitle: 'Packaged App Development Senior Analyst - 5 month(s) ago',
      priority: 'normal'
    },
    {
      icon: Route,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      title: 'You Have 2 Assigned Journeys',
      subtitle: 'Priorities & Reflections Journey, FY25 Prepare For Year-End',
      priority: 'high'
    },
    {
      icon: Book,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
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
    }
  ];

  const timelySuggestions = [
    {
      icon: Lightbulb,
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      title: 'Complete Your Skills Assessment',
      description: 'Update your skill profile to get personalized learning recommendations',
      action: 'Start Assessment'
    },
    {
      icon: Trophy,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      title: 'Career Development Workshop',
      description: 'Join the upcoming session on leadership skills - Register by Friday',
      action: 'Register Now'
    },
    {
      icon: Calendar,
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      title: 'Q4 Performance Review Prep',
      description: 'Start gathering your achievements and feedback for year-end review',
      action: 'View Guide'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section - More Compact */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-full mx-auto">
          <div className="relative z-10 pb-6 bg-white sm:pb-8 md:pb-12 lg:max-w-2xl lg:w-full lg:pb-16 xl:pb-20">
            <main className="mt-6 mx-auto max-w-7xl px-4 sm:mt-8 sm:px-6 md:mt-10 lg:mt-12 lg:px-8 xl:mt-16">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
                  <span className="block">Hello,</span>{' '}
                  <span className="block text-indigo-600">{user?.name || 'Team Member'}</span>
                </h1>
                <p className="mt-2 text-sm text-gray-500 sm:mt-3 sm:text-base sm:max-w-xl sm:mx-auto md:mt-4 md:text-lg lg:mx-0">
                  Welcome to your HR Portal. Access your tasks, learning, and performance in one place.
                </p>
                <div className="mt-4 sm:mt-6 sm:flex sm:justify-center lg:justify-start gap-3">
                  <button className="flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full text-white bg-blue-600 hover:bg-blue-700 shadow-sm transition-all duration-200">
                    Go to Dashboard
                  </button>
                  <button className="flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-full text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition-all duration-200">
                    View Policies
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-48 w-full object-cover sm:h-56 md:h-72 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
            alt="Employee workspace"
          />
        </div>
      </div>

      {/* Let's Focus on You Section - Compact Design */}
      <div className="max-w-5xl mx-auto px-6 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column: Awaiting Your Action */}
          <div className="lg:w-2/3 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-normal  text-gray-900">Let's Focus on You</h2>
                <p className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">Tuesday, 29 July, 2025</p>
              </div>
              
              {/* Quick Action Buttons - More Compact */}
              <div className="flex flex-wrap gap-2 mb-6">
                {quickActions.map((action, index) => (
                  <button 
                    key={index}
                    className="bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-normal py-2 px-3 border border-gray-200 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md"
                  >
                    {action}
                    {index < 4 && <ExternalLink className="inline ml-1 text-gray-500" size={12} />}
                  </button>
                ))}
                <button className="bg-gray-50 hover:bg-gray-100 text-gray-500 text-xs font-medium py-2 px-3 border border-gray-200 rounded-lg">
                  <span>...</span>
                </button>
              </div>

              {/* Awaiting Your Action */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-600">Awaiting Your Action</h3>
                <div className="space-y-2">
                  {awaitingActions.map((item, index) => (
                    <div key={index} className="flex items-start p-2 bg-gray-50 rounded-3xl hover:bg-gray-100 transition-all duration-200 cursor-pointer">
                      <div className={`${item.iconBg} rounded-lg p-2 mr-3 flex-shrink-0`}>
                        <item.icon className={`${item.iconColor} text-xs font-light`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-medium text-gray-900 mb-1">{item.title}</p>
                        <p className="text-xs font-normal text-gray-500">{item.subtitle}</p>
                       
                      </div>
                       {item.priority === 'urgent' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 mt-1">
                            <Clock className="mr-1" size={8} />
                            Urgent
                          </span>
                        )}
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <button className="text-xs text-blue-600 hover:text-blue-800 font-medium flex items-center">
                    <CheckSquare className="mr-1" size={18} />
                    Go to My Tasks (4)
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Announcements - More Compact */}
          <div className="lg:w-1/3 h-min bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-4 text-gray-800">Announcements</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <img
                    src={announcements[0].image}
                    alt="Announcement"
                    className="w-12 h-12 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 mb-1">{announcements[0].title}</p>
                    <p className="text-xs text-gray-500 line-clamp-2">{announcements[0].description}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-500">1 of {announcements.length}</span>
                  <div className="flex space-x-1">
                    <button className="text-gray-400 hover:text-gray-600 p-1">
                      <FaArrowLeft size={12} />
                    </button>
                    <button className="text-gray-400 hover:text-gray-600 p-1">
                      <FaArrowRight size={12} />
                    </button>
                  </div>
                </div>
                
                <div className="pt-2">
                  <Link to="#" className="text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center">
                    <FaExternalLinkAlt className="mr-1" size={10} />
                    View All Apps
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timely Suggestions - Enhanced with Dummy Data */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5">
            <h3 className="text-lg font-semibold mb-4 text-gray-800">Timely Suggestions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {timelySuggestions.map((suggestion, index) => (
                <div key={index} className="p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-all duration-200">
                  <div className="flex items-start mb-3">
                    <div className={`${suggestion.iconBg} rounded-lg p-2 mr-3 flex-shrink-0`}>
                      <suggestion.icon className={`${suggestion.iconColor} text-sm`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-800 mb-1">{suggestion.title}</h4>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-3 leading-relaxed">{suggestion.description}</p>
                  <button className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                    {suggestion.action} →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features - Updated with Real Icons */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-10">
            <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">Your Tools</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to succeed
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: 'My Tasks',
                description: 'Stay on top of your assignments and deadlines.',
                icon: FaTasks,
                color: 'bg-blue-500',
              },
              {
                name: 'Learning & Development',
                description: 'Access training and grow your skills.',
                icon: FaGraduationCap,
                color: 'bg-green-500',
              },
              {
                name: 'Performance Goals',
                description: 'Track your progress and achievements.',
                icon: FaChartLine,
                color: 'bg-purple-500',
              },
              {
                name: 'Time Off',
                description: 'Request and manage your leave.',
                icon: FaUmbrellaBeach,
                color: 'bg-orange-500',
              },
            ].map((feature) => (
              <div key={feature.name} className="text-center">
                <div className={`${feature.color} inline-flex items-center justify-center h-16 w-16 rounded-xl text-white mb-4 shadow-lg`}>
                  <feature.icon className="text-2xl" />
                </div>
                <h3 className="text-lg leading-6 font-medium text-gray-900 mb-2">{feature.name}</h3>
                <p className="text-sm text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA - More Compact */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700">
        <div className="max-w-2xl mx-auto text-center py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
            <span className="block">Keep growing</span>
            <span className="block">Your journey matters.</span>
          </h2>
          <Link
            to="/employee/learning"
            className="mt-6 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-indigo-600 bg-white hover:bg-gray-50 transition-all duration-200 shadow-lg"
          >
            <FaGraduationCap className="mr-2" />
            Start Learning
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomeEmployee;