import React, { useEffect, useState } from 'react';
import { 
  Users, 
  Briefcase, 
  Clock, 
  Calendar, 
  BarChart3, 
  FileText, 
  Building2, 
  TrendingUp, 
  TrendingDown,
  UserPlus,
  UserMinus,
  DollarSign,
  Award,
  AlertTriangle,
  CheckCircle,
  Bell,
  Mail,
  Phone,
  MapPin,
  Star,
  Target,
  Activity,
  PieChart,
  Settings,
  Filter,
  Download,
  RefreshCw,
  Search,
  MoreVertical,
  ChevronRight,
  Users2,
  CalendarDays,
  ClipboardList,
  Globe,
  Shield,
  Zap,
  Eye,
  BookOpen,
  Cpu,
  Layers,
  Wifi,
  Database
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell, AreaChart, Area , Pie} from 'recharts';

// Enhanced mock data with charts data
const mockAdminData = {
  overview: {
    totalEmployees: 347,
    activeEmployees: 324,
    onLeave: 15,
    newHires: 8,
    totalDepartments: 12,
    openPositions: 23,
    pendingApprovals: 17,
    completedTasks: 156
  },
  metrics: [
    { 
      name: 'Total Employees', 
      value: '347', 
      change: '+12', 
      changePercent: '+3.6%',
      changeType: 'increase',
      icon: Users,
      color: 'blue',
      description: 'Active workforce',
      progress: 85
    },
    { 
      name: 'Open Positions', 
      value: '23', 
      change: '+5', 
      changePercent: '+27.8%',
      changeType: 'increase',
      icon: Briefcase,
      color: 'green',
      description: 'Hiring in progress',
      progress: 65
    },
    { 
      name: 'On Leave Today', 
      value: '15', 
      change: '-3', 
      changePercent: '-16.7%',
      changeType: 'decrease',
      icon: Clock,
      color: 'yellow',
      description: 'Absent employees',
      progress: 30
    },
    { 
      name: 'Pending Approvals', 
      value: '17', 
      change: '+2', 
      changePercent: '+13.3%',
      changeType: 'increase',
      icon: AlertTriangle,
      color: 'red',
      description: 'Require attention',
      progress: 45
    }
  ],
  departmentStats: [
    { name: 'Engineering', employees: 89, openPositions: 8, performance: 94, trend: 'up', budget: 2.4, satisfaction: 4.8 },
    { name: 'Sales', employees: 56, openPositions: 5, performance: 87, trend: 'up', budget: 1.8, satisfaction: 4.3 },
    { name: 'Marketing', employees: 34, openPositions: 3, performance: 91, trend: 'down', budget: 1.2, satisfaction: 4.5 },
    { name: 'HR', employees: 23, openPositions: 2, performance: 96, trend: 'up', budget: 0.8, satisfaction: 4.9 },
    { name: 'Finance', employees: 28, openPositions: 1, performance: 89, trend: 'stable', budget: 1.1, satisfaction: 4.4 },
    { name: 'Operations', employees: 45, openPositions: 4, performance: 92, trend: 'up', budget: 1.6, satisfaction: 4.6 }
  ],
  chartData: {
    employeeGrowth: [
      { month: 'Jan', employees: 298, hires: 8, leaves: 3 },
      { month: 'Feb', employees: 312, hires: 12, leaves: 2 },
      { month: 'Mar', employees: 325, hires: 15, leaves: 4 },
      { month: 'Apr', employees: 334, hires: 11, leaves: 2 },
      { month: 'May', employees: 341, hires: 9, leaves: 2 },
      { month: 'Jun', employees: 347, hires: 8, leaves: 2 }
    ],
    departmentDistribution: [
      { name: 'Engineering', value: 89, color: '#3b82f6' },
      { name: 'Sales', value: 56, color: '#10b981' },
      { name: 'Marketing', value: 34, color: '#f59e0b' },
      { name: 'HR', value: 23, color: '#ef4444' },
      { name: 'Finance', value: 28, color: '#8b5cf6' },
      { name: 'Operations', value: 45, color: '#06b6d4' }
    ],
    performanceData: [
      { department: 'Eng', performance: 94, target: 90 },
      { department: 'Sales', performance: 87, target: 85 },
      { department: 'Mkt', performance: 91, target: 88 },
      { department: 'HR', performance: 96, target: 92 },
      { department: 'Fin', performance: 89, target: 87 },
      { department: 'Ops', performance: 92, target: 90 }
    ]
  },
  recentActivities: [
    { 
      id: 1, 
      user: 'Sarah Johnson', 
      action: 'approved leave request for Mike Chen', 
      time: '2 minutes ago', 
      type: 'approval',
      avatar: '👩‍💼',
      priority: 'high'
    },
    { 
      id: 2, 
      user: 'David Wilson', 
      action: 'completed onboarding for 3 new employees', 
      time: '15 minutes ago', 
      type: 'onboarding',
      avatar: '👨‍💻',
      priority: 'medium'
    },
    { 
      id: 3, 
      user: 'Emma Davis', 
      action: 'updated company policy document', 
      time: '1 hour ago', 
      type: 'policy',
      avatar: '👩‍🏫',
      priority: 'low'
    },
    { 
      id: 4, 
      user: 'Alex Turner', 
      action: 'published quarterly performance report', 
      time: '2 hours ago', 
      type: 'report',
      avatar: '👨‍📊',
      priority: 'high'
    },
    { 
      id: 5, 
      user: 'Lisa Park', 
      action: 'scheduled team building event', 
      time: '3 hours ago', 
      type: 'event',
      avatar: '👩‍🎯',
      priority: 'medium'
    }
  ],
  upcomingEvents: [
    { 
      id: 1, 
      name: 'Board Meeting', 
      date: 'Today', 
      time: '2:00 PM', 
      type: 'meeting',
      attendees: 8,
      location: 'Conference Room A',
      importance: 'high'
    },
    { 
      id: 2, 
      name: 'New Employee Orientation', 
      date: 'Tomorrow', 
      time: '9:00 AM', 
      type: 'orientation',
      attendees: 12,
      location: 'Training Room',
      importance: 'medium'
    },
    { 
      id: 3, 
      name: 'Monthly All-Hands', 
      date: 'Aug 5', 
      time: '10:00 AM', 
      type: 'company',
      attendees: 347,
      location: 'Main Auditorium',
      importance: 'high'
    },
    { 
      id: 4, 
      name: 'Performance Reviews', 
      date: 'Aug 8', 
      time: '9:00 AM', 
      type: 'review',
      attendees: 45,
      location: 'Various Rooms',
      importance: 'high'
    }
  ],
  quickStats: [
    { name: 'Employee Satisfaction', value: '4.6/5', change: '+0.2', changeType: 'increase', icon: Star, progress: 92 },
    { name: 'Avg. Tenure', value: '3.2 years', change: '+0.3', changeType: 'increase', icon: Award, progress: 78 },
    { name: 'Turnover Rate', value: '8.5%', change: '-1.2%', changeType: 'decrease', icon: TrendingDown, progress: 15 },
    { name: 'Training Completion', value: '89%', change: '+5%', changeType: 'increase', icon: Target, progress: 89 }
  ],
  systemStats: [
    { name: 'Server Uptime', value: '99.8%', icon: Wifi, color: 'green' },
    { name: 'Database Load', value: '34%', icon: Database, color: 'blue' },
    { name: 'CPU Usage', value: '42%', icon: Cpu, color: 'yellow' },
    { name: 'Active Sessions', value: '247', icon: Eye, color: 'purple' }
  ]
};

const AdminSummary = () => {
  const [adminData, setAdminData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeChart, setActiveChart] = useState('growth');

  useEffect(() => {
    const fetchData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 1200));
        setAdminData(mockAdminData);
      } catch (error) {
        console.error('Error fetching admin data:', error);
        setAdminData(mockAdminData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getColorClasses = (color) => {
    const colors = {
      blue: 'from-blue-500 to-blue-600',
      green: 'from-green-500 to-green-600',
      yellow: 'from-yellow-500 to-yellow-600',
      red: 'from-red-500 to-red-600',
      purple: 'from-purple-500 to-purple-600',
      indigo: 'from-indigo-500 to-indigo-600'
    };
    return colors[color] || colors.blue;
  };

  const ProgressBar = ({ value, color = 'blue' }) => (
    <div className="w-full bg-gray-200 rounded-full h-1.5 overflow-hidden">
      <div 
        className={`h-full bg-gradient-to-r ${getColorClasses(color)} transition-all duration-1000 ease-out`}
        style={{ width: `${value}%` }}
      />
    </div>
  );

  const CircularProgress = ({ value, size = 'sm' }) => {
    const radius = size === 'sm' ? 18 : 28;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    return (
      <div className={`relative ${size === 'sm' ? 'w-10 h-10' : 'w-16 h-16'}`}>
        <svg className="transform -rotate-90 w-full h-full">
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            className="text-gray-200"
          />
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="currentColor"
            strokeWidth="3"
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className="text-blue-500 transition-all duration-1000 ease-out"
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`${size === 'sm' ? 'text-xs' : 'text-sm'} font-semibold text-gray-700`}>
            {value}%
          </span>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto p-3 lg:p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 rounded w-1/3 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl p-5 shadow-sm">
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-sm">
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <div className="max-w-7xl mx-auto p-3 lg:p-6">
        {/* Enhanced Header */}
        <div className="mb-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-5">
            <div>
              <h1 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-1">
                Admin Dashboard
              </h1>
              <p className="text-gray-600 text-sm lg:text-base">
                Real-time insights and organizational overview
              </p>
            </div>
            <div className="flex items-center space-x-2 mt-3 lg:mt-0">
              <button className="flex items-center px-3 py-1.5 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg hover:bg-white transition-all text-sm">
                <Filter className="w-3.5 h-3.5 mr-1.5" />
                Filter
              </button>
              <button className="flex items-center px-3 py-1.5 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg hover:bg-white transition-all text-sm">
                <Download className="w-3.5 h-3.5 mr-1.5" />
                Export
              </button>
              <button className="flex items-center px-3 py-1.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all text-sm shadow-lg shadow-blue-200">
                <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                Refresh
              </button>
            </div>
          </div>

          {/* System Stats Bar */}
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-4 shadow-sm border border-white/50 mb-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {adminData.systemStats.map((stat, index) => {
                const IconComponent = stat.icon;
                return (
                  <div key={index} className="flex items-center space-x-2">
                    <div className={`p-1.5 rounded-lg ${
                      stat.color === 'green' ? 'bg-green-100 text-green-600' :
                      stat.color === 'blue' ? 'bg-blue-100 text-blue-600' :
                      stat.color === 'yellow' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-purple-100 text-purple-600'
                    }`}>
                      <IconComponent className="w-3.5 h-3.5" />
                    </div>
                    <div>
                      <div className="text-xs font-medium text-gray-500">{stat.name}</div>
                      <div className="text-sm font-bold text-gray-900">{stat.value}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Enhanced Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {adminData.metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div key={index} className="bg-white/70 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-white/50 hover:shadow-lg hover:bg-white/90 transition-all duration-300 group relative overflow-hidden">
                <div className={`absolute top-0 right-0 w-20 h-20 bg-gradient-to-br ${getColorClasses(metric.color)} opacity-10 rounded-full transform translate-x-8 -translate-y-8`}></div>
                
                <div className="flex items-center justify-between mb-4 relative z-10">
                  <div className={`p-2.5 rounded-lg bg-gradient-to-br ${getColorClasses(metric.color)} text-white shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-4 h-4" />
                  </div>
                  <div className={`text-xs font-semibold px-2 py-1 rounded-full ${
                    metric.changeType === 'increase' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {metric.changePercent}
                  </div>
                </div>
                
                <div className="relative z-10">
                  <div className="text-2xl font-bold text-gray-900 mb-1">
                    {metric.value}
                  </div>
                  <div className="text-xs font-medium text-gray-600 mb-3">
                    {metric.name}
                  </div>
                  
                  <ProgressBar value={metric.progress} color={metric.color} />
                  
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center text-xs">
                      {metric.changeType === 'increase' ? (
                        <TrendingUp className="w-3 h-3 text-green-500 mr-1" />
                      ) : (
                        <TrendingDown className="w-3 h-3 text-red-500 mr-1" />
                      )}
                      <span className={metric.changeType === 'increase' ? 'text-green-600' : 'text-red-600'}>
                        {metric.change}
                      </span>
                    </div>
                    <div className="text-xs text-gray-400">
                      {metric.progress}%
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
          {/* Left Column - Charts and Analytics */}
          <div className="lg:col-span-2 space-y-4">
            {/* Employee Growth Chart */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-white/50">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-gray-900">Employee Growth Trends</h3>
                <div className="flex items-center space-x-2">
                  <button 
                    onClick={() => setActiveChart('growth')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      activeChart === 'growth' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Growth
                  </button>
                  <button 
                    onClick={() => setActiveChart('performance')}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      activeChart === 'performance' ? 'bg-blue-100 text-blue-700' : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Performance
                  </button>
                </div>
              </div>
              
              <div className="h-64">
                {activeChart === 'growth' ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={adminData.chartData.employeeGrowth}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                          border: 'none', 
                          borderRadius: '8px', 
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                        }} 
                      />
                      <Area type="monotone" dataKey="employees" stroke="#3b82f6" fill="url(#colorGradient)" strokeWidth={2} />
                      <defs>
                        <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05}/>
                        </linearGradient>
                      </defs>
                    </AreaChart>
                  </ResponsiveContainer>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={adminData.chartData.performanceData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="department" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                          border: 'none', 
                          borderRadius: '8px', 
                          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                        }} 
                      />
                      <Bar dataKey="performance" fill="#10b981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="target" fill="#e5e7eb" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Department Overview */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-white/50">
              <div className="flex items-center justify-between mb-5">
                <h3 className="text-lg font-semibold text-gray-900">Department Analytics</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
                  View Details <ChevronRight className="w-3.5 h-3.5 ml-1" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {adminData.departmentStats.map((dept, index) => (
                  <div key={index} className="bg-gray-50/50 rounded-lg p-4 hover:bg-gray-100/50 transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                          <Building2 className="w-4 h-4 text-white" />
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">{dept.name}</div>
                          <div className="text-xs text-gray-500">{dept.employees} employees</div>
                        </div>
                      </div>
                      <CircularProgress value={dept.performance} />
                    </div>
                    
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-white/60 rounded-lg p-2">
                        <div className="text-sm font-bold text-gray-900">{dept.openPositions}</div>
                        <div className="text-xs text-gray-500">Open</div>
                      </div>
                      <div className="bg-white/60 rounded-lg p-2">
                        <div className="text-sm font-bold text-gray-900">${dept.budget}M</div>
                        <div className="text-xs text-gray-500">Budget</div>
                      </div>
                      <div className="bg-white/60 rounded-lg p-2">
                        <div className="text-sm font-bold text-gray-900">{dept.satisfaction}</div>
                        <div className="text-xs text-gray-500">Rating</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-white/50">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {[
                  { icon: UserPlus, label: 'Add Employee', color: 'from-blue-500 to-blue-600' },
                  { icon: FileText, label: 'Generate Report', color: 'from-green-500 to-green-600' },
                  { icon: BarChart3, label: 'View Analytics', color: 'from-purple-500 to-purple-600' },
                  { icon: CalendarDays, label: 'Schedule Meeting', color: 'from-orange-500 to-orange-600' },
                  { icon: Settings, label: 'Settings', color: 'from-gray-500 to-gray-600' },
                  { icon: Shield, label: 'Security', color: 'from-red-500 to-red-600' }
                ].map((action, index) => {
                  const IconComponent = action.icon;
                  return (
                    <button key={index} className={`bg-gradient-to-br ${action.color} text-white p-3 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg group`}>
                      <div className="flex flex-col items-center text-center">
                        <IconComponent className="w-4 h-4 mb-1.5 group-hover:scale-110 transition-transform duration-200" />
                        <span className="text-xs font-medium">{action.label}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="space-y-4">
            {/* Department Distribution Chart */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-white/50">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Team Distribution</h3>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsPieChart>
                    <Pie
                      data={adminData.chartData.departmentDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={70}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {adminData.chartData.departmentDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'rgba(255, 255, 255, 0.95)', 
                        border: 'none', 
                        borderRadius: '8px', 
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' 
                      }} 
                    />
                  </RechartsPieChart>
                </ResponsiveContainer>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                {adminData.chartData.departmentDistribution.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-xs text-gray-600">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Events */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-white/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Upcoming Events</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {adminData.upcomingEvents.map((event) => (
                  <div key={event.id} className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 rounded-r-lg p-3 hover:from-blue-100 hover:to-indigo-100 transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold text-gray-900 text-sm">{event.name}</h4>
                      <div className={`text-xs px-2 py-1 rounded-full ${
                        event.importance === 'high' ? 'bg-red-100 text-red-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {event.importance}
                      </div>
                    </div>
                    <div className="text-xs text-gray-600 mb-2">
                      📅 {event.date} at {event.time}
                    </div>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center">
                        <Users className="w-3 h-3 mr-1" />
                        {event.attendees}
                      </div>
                      <div className="flex items-center">
                        <MapPin className="w-3 h-3 mr-1" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Metrics with Progress */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-white/50">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Performance Indicators</h3>
              <div className="space-y-4">
                {adminData.quickStats.map((stat, index) => {
                  const IconComponent = stat.icon;
                  return (
                    <div key={index} className="bg-gray-50/50 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="p-1.5 bg-blue-100 rounded-lg">
                            <IconComponent className="w-3.5 h-3.5 text-blue-600" />
                          </div>
                          <div className="text-sm font-medium text-gray-700">{stat.name}</div>
                        </div>
                        <div className="text-sm font-bold text-gray-900">{stat.value}</div>
                      </div>
                      
                      <div className="flex items-center justify-between mb-2">
                        <ProgressBar value={stat.progress} color="blue" />
                        <div className={`text-xs font-semibold ml-3 flex items-center ${
                          stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stat.changeType === 'increase' ? (
                            <TrendingUp className="w-3 h-3 mr-1" />
                          ) : (
                            <TrendingDown className="w-3 h-3 mr-1" />
                          )}
                          {stat.change}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-white/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {adminData.recentActivities.slice(0, 4).map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-3 p-3 hover:bg-gray-50/50 rounded-lg transition-all">
                    <div className="text-lg">{activity.avatar}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {activity.user}
                        </p>
                        <div className={`text-xs px-2 py-0.5 rounded-full ${
                          activity.priority === 'high' ? 'bg-red-100 text-red-700' :
                          activity.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }`}>
                          {activity.priority}
                        </div>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">
                        {activity.action}
                      </p>
                      <p className="text-xs text-gray-400 flex items-center">
                        <Clock className="w-3 h-3 mr-1" />
                        {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* System Health Monitor */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-white/50">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">System Health</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-gray-600">All Systems Operational</span>
                  </div>
                  <CheckCircle className="w-4 h-4 text-green-500" />
                </div>
                
                <div className="bg-gray-50/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-600">Server Response Time</span>
                    <span className="text-xs font-bold text-green-600">125ms</span>
                  </div>
                  <ProgressBar value={85} color="green" />
                </div>
                
                <div className="bg-gray-50/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-600">Data Sync Status</span>
                    <span className="text-xs font-bold text-blue-600">98.7%</span>
                  </div>
                  <ProgressBar value={98.7} color="blue" />
                </div>
                
                <div className="bg-gray-50/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-medium text-gray-600">Security Score</span>
                    <span className="text-xs font-bold text-purple-600">94/100</span>
                  </div>
                  <ProgressBar value={94} color="purple" />
                </div>
              </div>
            </div>

            {/* Notifications Panel */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-5 shadow-sm border border-white/50">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Notifications</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                  <span className="text-xs text-gray-500">3 unread</span>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { id: 1, title: 'New Policy Update', message: 'Remote work guidelines updated', time: '10 min ago', type: 'info', unread: true },
                  { id: 2, title: 'Budget Approval', message: '5 expense reports pending', time: '30 min ago', type: 'warning', unread: true },
                  { id: 3, title: 'System Maintenance', message: 'Scheduled for tomorrow 2-4 AM', time: '1 hour ago', type: 'alert', unread: false },
                  { id: 4, title: 'Performance Report', message: 'Q2 analytics ready for review', time: '2 hours ago', type: 'info', unread: true }
                ].map((notification) => (
                  <div key={notification.id} className={`flex items-start space-x-3 p-3 rounded-lg transition-all ${
                    notification.unread ? 'bg-blue-50/50 border border-blue-200/50' : 'hover:bg-gray-50/50'
                  }`}>
                    <div className={`p-1 rounded-full mt-0.5 ${
                      notification.type === 'info' ? 'bg-blue-100' :
                      notification.type === 'warning' ? 'bg-yellow-100' :
                      'bg-red-100'
                    }`}>
                      <Bell className={`w-3 h-3 ${
                        notification.type === 'info' ? 'text-blue-600' :
                        notification.type === 'warning' ? 'text-yellow-600' :
                        'text-red-600'
                      }`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className={`text-sm font-medium ${notification.unread ? 'text-gray-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </p>
                        {notification.unread && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                      </div>
                      <p className="text-xs text-gray-600 mb-1">
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-400">
                        {notification.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-3 py-2 text-sm text-blue-600 hover:text-blue-800 font-medium transition-colors">
                Mark All as Read
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSummary;