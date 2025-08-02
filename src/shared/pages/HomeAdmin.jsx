import React from 'react';
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
  User
} from 'lucide-react';

const AdminHomepage = () => {
  const user = { name: "Sarah Johnson" }; // Mock admin user data

  const quickActions = [
    'Employee Management',
    'Compliance Reports', 
    'Analytics Dashboard',
    'Policy Updates',
    'Training Modules',
    'Performance Reviews'
  ];

  const awaitingActions = [
    {
      icon: Users,
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      title: 'Approve New Employee Onboarding: John Doe',
      subtitle: 'Submitted - 3 day(s) ago',
      priority: 'high'
    },
    {
      icon: FileText,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      title: 'Review Monthly Compliance Report',
      subtitle: 'Due - 5 day(s) from now',
      priority: 'normal'
    },
    {
      icon: Calendar,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      title: 'Schedule Annual Performance Reviews',
      subtitle: 'FY25 Performance Review Season',
      priority: 'high'
    },
    {
      icon: Book,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      title: 'Update Training Modules',
      subtitle: 'DUE 15/08/2025',
      priority: 'urgent'
    }
  ];

  const announcements = [
    {
      image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?w=200&h=120&fit=crop&crop=center',
      title: 'New HR Policies Effective September 1, 2025',
      description: 'Review and approve updates to company policies for compliance.'
    },
    {
      image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=200&h=120&fit=crop&crop=center',
      title: 'Q3 Performance Analytics Available',
      description: 'Access detailed performance metrics and team insights.'
    }
  ];

  const timelySuggestions = [
    {
      icon: Shield,
      iconBg: 'bg-emerald-100',
      iconColor: 'text-emerald-600',
      title: 'Compliance Audit Preparation',
      description: 'Review audit checklist and ensure all documentation is ready',
      action: 'Start Preparation'
    },
    {
      icon: TrendingUp,
      iconBg: 'bg-violet-100',
      iconColor: 'text-violet-600',
      title: 'Team Performance Analytics',
      description: 'New insights available for Q3 performance trends and metrics',
      action: 'View Analytics'
    },
    {
      icon: Award,
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      title: 'Employee Recognition Program',
      description: 'Launch the monthly recognition program for outstanding performers',
      action: 'Launch Program'
    }
  ];

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Compliance Banner - Compact */}
      <div className="bg-gradient-to-r from-purple-800 to-indigo-800 text-white px-4 py-3">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <div className="flex-1">
            <p className="text-sm font-semibold inline">🚨 Upcoming Compliance Audit:</p>
            <span className="text-xs ml-2 opacity-90">Prepare Your Reports by August 15</span>
          </div>
          <div className="bg-white/10 rounded-lg p-2">
            <div className="w-8 h-8 bg-white/20 rounded flex items-center justify-center">
              <span className="text-xs">QR</span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section - More Compact */}
      <div className="relative bg-white overflow-hidden border-b border-gray-100">
        <div className="max-w-full mx-auto">
          <div className="relative z-10 pb-6 bg-white sm:pb-8 md:pb-12 lg:max-w-2xl lg:w-full lg:pb-16 xl:pb-20">
            <main className="mt-6 mx-auto max-w-7xl px-4 sm:mt-8 sm:px-6 md:mt-10 lg:mt-12 lg:px-8 xl:mt-16">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-3xl tracking-tight font-extrabold text-gray-900 sm:text-4xl md:text-5xl">
                  <span className="block text-sm font-medium text-gray-500 mb-1">Hello,</span>
                  <span className="block text-indigo-600">{user?.name || 'Admin'}</span>
                  <span className="inline-block text-xs bg-indigo-100 text-indigo-700 px-2 py-1 rounded-full ml-2 font-medium">Admin</span>
                </h1>
                <p className="mt-2 text-sm text-gray-500 sm:mt-3 sm:text-base sm:max-w-xl sm:mx-auto md:mt-4 md:text-lg lg:mx-0">
                  Manage your team's performance, access insights, and ensure compliance in one place.
                </p>
                <div className="mt-4 sm:mt-6 sm:flex sm:justify-center lg:justify-start gap-3">
                  <button className="flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-sm transition-all duration-200">
                    Go to Dashboard
                  </button>
                  <button className="flex items-center justify-center px-6 py-2.5 border border-transparent text-sm font-medium rounded-lg text-indigo-700 bg-indigo-100 hover:bg-indigo-200 transition-all duration-200">
                    View Reports
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
        <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
          <img
            className="h-48 w-full object-cover sm:h-56 md:h-72 lg:w-full lg:h-full"
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=2850&q=80"
            alt="Admin workspace"
          />
        </div>
      </div>

      {/* Company Image - Compact */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-slate-700/50 rounded-xl p-8 text-center">
            <h3 className="text-white text-lg font-semibold mb-2">TechCorp Solutions</h3>
            <p className="text-slate-300 text-sm">Leading Innovation • Empowering Teams • Driving Success</p>
          </div>
        </div>
      </div>

      {/* Admin Focus Section - Compact Design */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Column: Admin Actions */}
          <div className="lg:w-2/3 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-bold text-gray-900 inline">Let's Focus on Administration</h2>
                <p className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full inline">Tuesday, 29 July, 2025</p>
              </div>
              
              {/* Quick Action Buttons - Inline and Compact */}
              <div className="flex flex-wrap gap-2 mb-6">
                {quickActions.map((action, index) => (
                  <button 
                    key={index}
                    className="bg-gradient-to-r from-slate-50 to-gray-50 hover:from-indigo-50 hover:to-purple-50 text-gray-700 hover:text-indigo-700 text-xs font-medium py-2 px-3 border border-gray-200 hover:border-indigo-200 rounded-lg shadow-sm transition-all duration-200 hover:shadow-md inline-flex items-center"
                  >
                    <span className="inline">{action}</span>
                    {index < 4 && <ExternalLink className="inline ml-1 text-gray-400" size={10} />}
                  </button>
                ))}
                <button className="bg-gray-50 hover:bg-gray-100 text-gray-500 text-xs font-medium py-2 px-3 border border-gray-200 rounded-lg inline">
                  <span>...</span>
                </button>
              </div>

              {/* Awaiting Your Action - Compact Cards */}
              <div>
                <h3 className="text-lg font-semibold mb-4 text-gray-800 inline">Awaiting Your Action</h3>
                <div className="space-y-3">
                  {awaitingActions.map((item, index) => (
                    <div key={index} className="flex items-start p-3 bg-gradient-to-r from-gray-50 to-slate-50 rounded-lg hover:from-indigo-50 hover:to-purple-50 transition-all duration-200 cursor-pointer border border-gray-100 hover:border-indigo-200">
                      <div className={`${item.iconBg} rounded-lg p-2 mr-3 flex-shrink-0`}>
                        <item.icon className={`${item.iconColor} text-sm`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 mb-1 inline">{item.title}</p>
                        <p className="text-xs text-gray-500 inline ml-2">{item.subtitle}</p>
                        {item.priority === 'urgent' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 ml-2">
                            <Clock className="mr-1" size={8} />
                            <span className="inline">Urgent</span>
                          </span>
                        )}
                        {item.priority === 'high' && (
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-orange-100 text-orange-800 ml-2">
                            <AlertCircle className="mr-1" size={8} />
                            <span className="inline">High</span>
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                    <CheckSquare className="mr-1" size={12} />
                    <span className="inline">Go to My Tasks (4)</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Announcements - More Compact */}
          <div className="lg:w-1/3 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="p-5">
              <h3 className="text-lg font-semibold mb-4 text-gray-800 inline">Announcements</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <img
                    src={announcements[0].image}
                    alt="Announcement"
                    className="w-16 h-12 object-cover rounded-lg flex-shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-800 mb-1 inline leading-tight">{announcements[0].title}</p>
                    <p className="text-xs text-gray-500 line-clamp-2 inline">{announcements[0].description}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                  <span className="text-xs text-gray-500 inline">1 of {announcements.length}</span>
                  <div className="flex space-x-1">
                    <button className="text-gray-400 hover:text-indigo-600 p-1 rounded">
                      <ArrowLeft size={12} />
                    </button>
                    <button className="text-gray-400 hover:text-indigo-600 p-1 rounded">
                      <ArrowRight size={12} />
                    </button>
                  </div>
                </div>
                
                <div className="pt-2">
                  <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium flex items-center">
                    <ExternalLink className="mr-1" size={10} />
                    <span className="inline text-xs">View All Announcements</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Timely Suggestions - Enhanced with Admin Data */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="p-5">
            <h3 className="text-lg font-semibold mb-4 text-gray-800 inline">Timely Suggestions</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {timelySuggestions.map((suggestion, index) => (
                <div key={index} className="p-4 bg-gradient-to-br from-gray-50 to-slate-50 rounded-lg hover:from-indigo-50 hover:to-purple-50 transition-all duration-200 border border-gray-100 hover:border-indigo-200">
                  <div className="flex items-start mb-3">
                    <div className={`${suggestion.iconBg} rounded-lg p-2 mr-3 flex-shrink-0`}>
                      <suggestion.icon className={`${suggestion.iconColor} text-sm`} />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-800 mb-1 inline leading-tight">{suggestion.title}</h4>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mb-3 leading-relaxed inline">{suggestion.description}</p>
                  <button className="text-xs text-indigo-600 hover:text-indigo-800 font-medium inline">
                    {suggestion.action} →
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Features - Updated with Admin Icons */}
      <div className="py-12 bg-gradient-to-br from-slate-900 to-indigo-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center mb-10">
            <h2 className="text-base text-indigo-300 font-semibold tracking-wide uppercase inline">Your Admin Tools</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl inline block">
              Everything you need to manage your team
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: 'Employee Management',
                description: 'Onboard, manage, and track employee details.',
                icon: Users,
                color: 'bg-gradient-to-br from-indigo-500 to-purple-600',
              },
              {
                name: 'Compliance Reports',
                description: 'Generate and review compliance reports.',
                icon: FileText,
                color: 'bg-gradient-to-br from-purple-500 to-pink-600',
              },
              {
                name: 'Analytics Dashboard',
                description: 'Access real-time insights and analytics.',
                icon: BarChart3,
                color: 'bg-gradient-to-br from-blue-500 to-indigo-600',
              },
              {
                name: 'Policy Updates',
                description: 'Manage and update company policies.',
                icon: Book,
                color: 'bg-gradient-to-br from-emerald-500 to-teal-600',
              },
            ].map((feature) => (
              <div key={feature.name} className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-200 border border-white/10">
                <div className={`${feature.color} inline-flex items-center justify-center h-16 w-16 rounded-xl text-white mb-4 shadow-lg`}>
                  <feature.icon className="text-2xl" />
                </div>
                <h3 className="text-lg leading-6 font-medium text-white mb-2 inline block">{feature.name}</h3>
                <p className="text-sm text-indigo-100 inline">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA - More Compact with Gradient */}
      <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-indigo-800">
        <div className="max-w-2xl mx-auto text-center py-12 px-4 sm:py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-extrabold text-white sm:text-3xl inline block">
            <span className="block">Drive Success</span>
            <span className="block text-indigo-200 text-lg inline">Empower your team, lead with data.</span>
          </h2>
          <button className="mt-6 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg text-indigo-600 bg-white hover:bg-indigo-50 transition-all duration-200 shadow-lg">
            <BarChart3 className="mr-2" size={18} />
            <span className="inline">Access Analytics</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminHomepage;