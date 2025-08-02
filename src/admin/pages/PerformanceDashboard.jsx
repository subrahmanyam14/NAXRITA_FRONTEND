import { Fragment, useState } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle,
  ArrowUp,
  ArrowDown,
  Calendar,
  Award,
  Target,
  Activity,
  DollarSign,
  Briefcase,
  AlertTriangle,
  Star,
  FileText,
  MessageSquare,
  Menu,
  X,
  Home,
  BarChart3,
  Settings,
  UserCheck,
  Building2,
  Bell
} from 'lucide-react';
import Sidebar from '../../shared/components/MainSidebar';
// CSS for cosmic background effects
const cosmicStyles = `
  @keyframes twinkle {
    0%, 100% { opacity: 0.2; }
    50% { opacity: 0.8; }
  }
  
  @keyframes float {
    0% { transform: translateY(0) rotate(0deg); }
    100% { transform: translateY(-100vh) rotate(360deg); }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); opacity: 0.3; }
    50% { transform: scale(1.5); opacity: 0.8; }
  }
  
  @keyframes drift {
    0% { transform: translate(0, 0); }
    100% { transform: translate(50px, -50px); }
  }
  
  .cosmic-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
    background: linear-gradient(135deg, #0a0a0a 0%, #161616 100%);
  }
  
  .starfield {
    position: absolute;
    width: 100%;
    height: 100%;
  }
  
  .star {
    position: absolute;
    background: white;
    border-radius: 50%;
    animation: twinkle 3s ease-in-out infinite alternate;
  }
  
  .sparkle {
    position: absolute;
    background: #2563eb;
    border-radius: 50%;
    animation: float 8s linear infinite, twinkle 2s ease-in-out infinite;
  }
  
  .animated-dot {
    position: absolute;
    background: rgba(37, 99, 235, 0.3);
    border-radius: 50%;
    animation: pulse 4s ease-in-out infinite, drift 15s linear infinite;
  }
  
  .cosmic-card {
    background: rgba(30, 30, 30, 0.8);
    backdrop-filter: blur(10px);
    border: 1px solid #2a2a2a;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  .cosmic-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.9), 0 0 20px rgba(59, 130, 246, 0.2);
    border-color: #404040;
  }
  
  .glow-effect {
    box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
  }
  
  .content-wrapper {
    position: relative;
    z-index: 2;
  }
`;

// Cosmic Background Component
const CosmicBackground = () => {
  const stars = Array.from({ length: 150 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${Math.random() * 2 + 1}px`,
    delay: `${Math.random() * 3}s`
  }));
  
  const sparkles = Array.from({ length: 25 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `100%`,
    size: `${Math.random() * 4 + 2}px`,
    delay: `${Math.random() * 8}s`,
    color: ['#2563eb', '#22c55e', '#f59e0b', '#ffffff'][Math.floor(Math.random() * 4)]
  }));
  
  const dots = Array.from({ length: 80 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: `${Math.random() * 2 + 1}px`,
    delay: `${Math.random() * 4}s`
  }));

  return (
    <div className="cosmic-background">
      <div className="starfield">
        {stars.map(star => (
          <div
            key={star.id}
            className="star"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              animationDelay: star.delay
            }}
          />
        ))}
        {sparkles.map(sparkle => (
          <div
            key={sparkle.id}
            className="sparkle"
            style={{
              left: sparkle.left,
              top: sparkle.top,
              width: sparkle.size,
              height: sparkle.size,
              backgroundColor: sparkle.color,
              animationDelay: sparkle.delay
            }}
          />
        ))}
        {dots.map(dot => (
          <div
            key={dot.id}
            className="animated-dot"
            style={{
              left: dot.left,
              top: dot.top,
              width: dot.size,
              height: dot.size,
              animationDelay: dot.delay
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Sidebar Component


// Performance Statistics Data (same as original)
const performanceStats = [
  { 
    name: 'Total Employees', 
    stat: '142', 
    change: '12%', 
    changeType: 'increase',
    icon: Users,
    color: 'blue',
    description: 'Active workforce'
  },
  { 
    name: 'Avg Performance Score', 
    stat: '8.7/10', 
    change: '5.4%', 
    changeType: 'increase',
    icon: Star,
    color: 'green',
    description: 'Team average rating'
  },
  { 
    name: 'Goals Achieved', 
    stat: '87%', 
    change: '3.2%', 
    changeType: 'increase',
    icon: Target,
    color: 'purple',
    description: 'Monthly targets met'
  },
  { 
    name: 'Training Hours', 
    stat: '324h', 
    change: '15.6%', 
    changeType: 'increase',
    icon: Award,
    color: 'orange',
    description: 'This month'
  },
  { 
    name: 'Revenue Impact', 
    stat: '$2.4M', 
    change: '8.2%', 
    changeType: 'increase',
    icon: DollarSign,
    color: 'emerald',
    description: 'Employee contribution'
  },
  { 
    name: 'Pending Reviews', 
    stat: '24', 
    change: '12%', 
    changeType: 'decrease',
    icon: Clock,
    color: 'yellow',
    description: 'Awaiting completion'
  },
];

// Performance Trends Data (same as original)
const performanceTrends = [
  { month: 'Jan', performance: 8.2, goals: 75, satisfaction: 8.1 },
  { month: 'Feb', performance: 8.4, goals: 78, satisfaction: 8.3 },
  { month: 'Mar', performance: 8.1, goals: 82, satisfaction: 8.0 },
  { month: 'Apr', performance: 8.6, goals: 85, satisfaction: 8.4 },
  { month: 'May', performance: 8.7, goals: 87, satisfaction: 8.6 },
  { month: 'Jun', performance: 8.8, goals: 89, satisfaction: 8.7 },
];

// Department Performance (same as original)
const departmentData = [
  { name: 'Engineering', performance: 9.2, employees: 45, projects: 12 },
  { name: 'Sales', performance: 8.8, employees: 32, projects: 8 },
  { name: 'Marketing', performance: 8.5, employees: 18, projects: 6 },
  { name: 'HR', performance: 8.9, employees: 12, projects: 4 },
  { name: 'Operations', performance: 8.3, employees: 25, projects: 7 },
  { name: 'Finance', performance: 8.7, employees: 10, projects: 3 },
];

// Performance Distribution (same as original)
const performanceDistribution = [
  { name: 'Exceptional (9-10)', value: 28, color: '#10B981' },
  { name: 'Good (7-8.9)', value: 85, color: '#3B82F6' },
  { name: 'Average (5-6.9)', value: 24, color: '#F59E0B' },
  { name: 'Needs Improvement (<5)', value: 5, color: '#EF4444' },
];

// Top Performers (same as original)
const topPerformers = [
  {
    id: 1,
    name: 'Sarah Chen',
    role: 'Senior Developer',
    department: 'Engineering',
    score: 9.8,
    goals: 95,
    improvement: 12,
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    name: 'Marcus Johnson',
    role: 'Sales Director',
    department: 'Sales',
    score: 9.6,
    goals: 92,
    improvement: 8,
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Marketing Manager',
    department: 'Marketing',
    score: 9.4,
    goals: 88,
    improvement: 15,
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 4,
    name: 'David Kim',
    role: 'Operations Lead',
    department: 'Operations',
    score: 9.2,
    goals: 90,
    improvement: 6,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

// Recent Activities (same as original)
const recentActivities = [
  {
    id: 1,
    user: 'Alex Thompson',
    action: 'completed',
    target: 'Q2 Performance Review',
    date: '2h ago',
    type: 'review',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    user: 'Lisa Wang',
    action: 'achieved',
    target: 'Sales Target (125%)',
    date: '4h ago',
    type: 'goal',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 3,
    user: 'Michael Brown',
    action: 'submitted',
    target: 'Development Plan',
    date: '6h ago',
    type: 'plan',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 4,
    user: 'Jennifer Davis',
    action: 'completed',
    target: 'Leadership Training',
    date: '1d ago',
    type: 'training',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 5,
    user: 'Robert Wilson',
    action: 'received',
    target: 'Performance Feedback',
    date: '1d ago',
    type: 'feedback',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

// Upcoming Reviews (same as original)
const upcomingReviews = [
  {
    id: 1,
    employee: 'Jessica Martinez',
    role: 'Product Manager',
    date: '2024-08-05',
    type: 'Quarterly Review',
    priority: 'high',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 2,
    employee: 'Tom Anderson',
    role: 'Senior Analyst',
    date: '2024-08-07',
    type: 'Mid-year Review',
    priority: 'medium',
    avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    id: 3,
    employee: 'Rachel Green',
    role: 'UX Designer',
    date: '2024-08-10',
    type: 'Annual Review',
    priority: 'high',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
];

const colorMap = {
  blue: 'bg-[#2563eb]',
  green: 'bg-[#22c55e]',
  purple: 'bg-[#8b5cf6]',
  orange: 'bg-[#f59e0b]',
  emerald: 'bg-[#10b981]',
  yellow: 'bg-[#eab308]',
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const PerformanceDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const getActivityIcon = (type) => {
    switch (type) {
      case 'review': return <FileText className="h-4 w-4" />;
      case 'goal': return <Target className="h-4 w-4" />;
      case 'plan': return <Briefcase className="h-4 w-4" />;
      case 'training': return <Award className="h-4 w-4" />;
      case 'feedback': return <MessageSquare className="h-4 w-4" />;
      default: return <Activity className="h-4 w-4" />;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-500/20 text-red-400 border border-red-500/30';
      case 'medium': return 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30';
      case 'low': return 'bg-green-500/20 text-green-400 border border-green-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border border-gray-500/30';
    }
  };

  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: cosmicStyles }} />
      <div className=" bg-[#0a0a0a] text-white">
        {/* Cosmic Background */}
        <CosmicBackground />
        
        {/* Sidebar */}
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        
        {/* Main Content */}
        <div className="content-wrapper ">
          {/* Header */}
          <header className="h-18 bg-[#0a0a0a] border-b border-[#2a2a2a] backdrop-filter backdrop-blur-md relative z-10">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center">
                <button
                  className="lg:hidden mr-4 text-[#a3a3a3] hover:text-white"
                  onClick={() => setSidebarOpen(true)}
                >
                  <Menu className="h-6 w-6" />
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-white">Performance Dashboard</h1>
                  <p className="mt-1 text-sm text-[#a3a3a3]">
                    Monitor and analyze employee performance metrics across your organization
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <button className="p-2 text-[#a3a3a3] hover:text-white hover:bg-[#1e1e1e] rounded-lg transition-colors">
                  <Bell className="h-5 w-5" />
                </button>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-[#404040] text-sm font-medium rounded-lg text-[#a3a3a3] bg-[#161616] hover:bg-[#1e1e1e] hover:text-white hover:border-white transition-all duration-200 backdrop-filter backdrop-blur-md"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Review
                </button>
                <button
                  type="button"
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-[#2563eb] hover:bg-[#1d4ed8] transition-all duration-200 glow-effect hover:shadow-lg hover:shadow-blue-500/25"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Generate Report
                </button>
              </div>
            </div>
          </header>

          {/* Main Dashboard Content */}
          <main className="p-6 space-y-6">
            {/* Performance Stats Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
              {performanceStats.map((item) => (
                <div key={item.name} className="cosmic-card rounded-xl p-6">
                  <div className="flex items-center justify-between">
                    <div className={`flex-shrink-0 p-3 rounded-lg ${colorMap[item.color]} shadow-lg`}>
                      <item.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className={classNames(
                      item.changeType === 'increase' ? 'text-[#22c55e]' : 'text-[#ef4444]',
                      'flex items-center text-sm font-medium'
                    )}>
                      {item.changeType === 'increase' ? (
                        <ArrowUp className="h-4 w-4 mr-1" />
                      ) : (
                        <ArrowDown className="h-4 w-4 mr-1" />
                      )}
                      {item.change}
                    </div>
                  </div>
                  <div className="mt-4">
                    <p className="text-2xl font-bold text-white">{item.stat}</p>
                    <p className="text-sm font-medium text-[#a3a3a3] mt-1">{item.name}</p>
                    <p className="text-xs text-[#6b7280] mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {/* Performance Trends */}
              <div className="cosmic-card rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Performance Trends</h3>
                  <TrendingUp className="h-5 w-5 text-[#6b7280]" />
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={performanceTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                    <XAxis dataKey="month" stroke="#a3a3a3" />
                    <YAxis stroke="#a3a3a3" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e1e1e', 
                        border: '1px solid #404040',
                        borderRadius: '8px',
                        color: '#ffffff'
                      }} 
                    />
                    <Line type="monotone" dataKey="performance" stroke="#3B82F6" strokeWidth={3} name="Performance Score" />
                    <Line type="monotone" dataKey="satisfaction" stroke="#10B981" strokeWidth={3} name="Satisfaction" />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Department Performance */}
              <div className="cosmic-card rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Department Performance</h3>
                  <Users className="h-5 w-5 text-[#6b7280]" />
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={departmentData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                    <XAxis dataKey="name" stroke="#a3a3a3" />
                    <YAxis stroke="#a3a3a3" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e1e1e', 
                        border: '1px solid #404040',
                        borderRadius: '8px',
                        color: '#ffffff'
                      }} 
                    />
                    <Bar dataKey="performance" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Performance Distribution */}
              <div className="cosmic-card rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Performance Distribution</h3>
                  <Star className="h-5 w-5 text-[#6b7280]" />
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={performanceDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`}
                    >
                      {performanceDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e1e1e', 
                        border: '1px solid #404040',
                        borderRadius: '8px',
                        color: '#ffffff'
                      }} 
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>

              {/* Goals Achievement */}
              <div className="cosmic-card rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-white">Goals Achievement</h3>
                  <Target className="h-5 w-5 text-[#6b7280]" />
                </div>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={performanceTrends}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#404040" />
                    <XAxis dataKey="month" stroke="#a3a3a3" />
                    <YAxis stroke="#a3a3a3" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1e1e1e', 
                        border: '1px solid #404040',
                        borderRadius: '8px',
                        color: '#ffffff'
                      }} 
                    />
                    <Area type="monotone" dataKey="goals" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.3} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="grid grid-cols-1 gap-6">
              {/* Top Performers */}
              <div className="cosmic-card rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-[#2a2a2a]">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">Top Performers</h3>
                    <Award className="h-5 w-5 text-[#6b7280]" />
                  </div>
                </div>
                <div className="divide-y divide-[#2a2a2a]">
                  {topPerformers.map((performer, index) => (
                    <div key={performer.id} className="px-6 py-4 hover:bg-[#161616] transition-colors duration-200">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 relative">
                          <img className="h-10 w-10 rounded-full ring-2 ring-[#2a2a2a]" src={performer.avatar} alt="" />
                          <span className={`absolute -top-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                            index === 0 ? 'bg-[#eab308]' : index === 1 ? 'bg-[#6b7280]' : index === 2 ? 'bg-[#ea580c]' : 'bg-[#2563eb]'
                          }`}>
                            {index + 1}
                          </span>
                        </div>
                        <div className="ml-4 flex-1">
                          <p className="text-sm font-medium text-white">{performer.name}</p>
                          <p className="text-xs text-[#a3a3a3]">{performer.role} • {performer.department}</p>
                          <div className="mt-1 flex items-center space-x-4 text-xs text-[#6b7280]">
                            <span>Score: <span className="text-[#22c55e] font-medium">{performer.score}/10</span></span>
                            <span>Goals: <span className="text-[#3b82f6] font-medium">{performer.goals}%</span></span>
                          </div>
                        </div>
                        <div className="flex items-center text-[#22c55e]">
                          <ArrowUp className="h-4 w-4" />
                          <span className="text-xs font-medium">{performer.improvement}%</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Activities */}
              <div className="cosmic-card rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-[#2a2a2a]">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">Recent Activities</h3>
                    <Activity className="h-5 w-5 text-[#6b7280]" />
                  </div>
                </div>
                <div className="divide-y divide-[#2a2a2a]">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="px-6 py-4 hover:bg-[#161616] transition-colors duration-200">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <img className="h-8 w-8 rounded-full ring-2 ring-[#2a2a2a]" src={activity.avatar} alt="" />
                        </div>
                        <div className="ml-3 flex-1">
                          <p className="text-sm text-white">
                            <span className="font-medium">{activity.user}</span>
                            <span className="text-[#a3a3a3]"> {activity.action} </span>
                            <span className="font-medium">{activity.target}</span>
                          </p>
                          <div className="mt-1 flex items-center">
                            <div className="flex items-center text-[#6b7280]">
                              {getActivityIcon(activity.type)}
                            </div>
                            <span className="ml-2 text-xs text-[#6b7280]">{activity.date}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Reviews */}
              <div className="cosmic-card rounded-xl overflow-hidden">
                <div className="px-6 py-4 border-b border-[#2a2a2a]">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">Upcoming Reviews</h3>
                    <Calendar className="h-5 w-5 text-[#6b7280]" />
                  </div>
                </div>
                <div className="divide-y divide-[#2a2a2a]">
                  {upcomingReviews.map((review) => (
                    <div key={review.id} className="px-6 py-4 hover:bg-[#161616] transition-colors duration-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <img className="h-8 w-8 rounded-full ring-2 ring-[#2a2a2a]" src={review.avatar} alt="" />
                          <div className="ml-3">
                            <p className="text-sm font-medium text-white">{review.employee}</p>
                            <p className="text-xs text-[#a3a3a3]">{review.role}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(review.priority)}`}>
                            {review.priority}
                          </span>
                          <p className="text-xs text-[#6b7280] mt-1">
                            {new Date(review.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-[#a3a3a3] ml-11">{review.type}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-[#111111] px-6 py-3 border-t border-[#2a2a2a]">
                  <button className="text-sm font-medium text-[#2563eb] hover:text-[#1d4ed8] transition-colors">
                    View all reviews →
                  </button>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default PerformanceDashboard;
