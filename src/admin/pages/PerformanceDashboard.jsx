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
  MessageSquare
} from 'lucide-react';

// Performance Statistics
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

// Performance Trends Data
const performanceTrends = [
  { month: 'Jan', performance: 8.2, goals: 75, satisfaction: 8.1 },
  { month: 'Feb', performance: 8.4, goals: 78, satisfaction: 8.3 },
  { month: 'Mar', performance: 8.1, goals: 82, satisfaction: 8.0 },
  { month: 'Apr', performance: 8.6, goals: 85, satisfaction: 8.4 },
  { month: 'May', performance: 8.7, goals: 87, satisfaction: 8.6 },
  { month: 'Jun', performance: 8.8, goals: 89, satisfaction: 8.7 },
];

// Department Performance
const departmentData = [
  { name: 'Engineering', performance: 9.2, employees: 45, projects: 12 },
  { name: 'Sales', performance: 8.8, employees: 32, projects: 8 },
  { name: 'Marketing', performance: 8.5, employees: 18, projects: 6 },
  { name: 'HR', performance: 8.9, employees: 12, projects: 4 },
  { name: 'Operations', performance: 8.3, employees: 25, projects: 7 },
  { name: 'Finance', performance: 8.7, employees: 10, projects: 3 },
];

// Performance Distribution
const performanceDistribution = [
  { name: 'Exceptional (9-10)', value: 28, color: '#10B981' },
  { name: 'Good (7-8.9)', value: 85, color: '#3B82F6' },
  { name: 'Average (5-6.9)', value: 24, color: '#F59E0B' },
  { name: 'Needs Improvement (<5)', value: 5, color: '#EF4444' },
];

// Top Performers
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

// Recent Activities
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

// Upcoming Reviews
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
  blue: 'bg-blue-500',
  green: 'bg-green-500',
  purple: 'bg-purple-500',
  orange: 'bg-orange-500',
  emerald: 'bg-emerald-500',
  yellow: 'bg-yellow-500',
};

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const PerformanceDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

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
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6 p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Performance Dashboard</h1>
          <p className="mt-2 text-sm text-gray-600">
            Monitor and analyze employee performance metrics across your organization
          </p>
        </div>
        <div className="flex space-x-3">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Review
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <FileText className="h-4 w-4 mr-2" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Performance Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {performanceStats.map((item) => (
          <div key={item.name} className="bg-white overflow-hidden shadow-sm rounded-lg hover:shadow-md transition-shadow">
            <div className="p-5">
              <div className="flex items-center justify-between">
                <div className={`flex-shrink-0 p-3 rounded-lg ${colorMap[item.color]}`}>
                  <item.icon className="h-6 w-6 text-white" />
                </div>
                <div className={classNames(
                  item.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
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
                <p className="text-2xl font-bold text-gray-900">{item.stat}</p>
                <p className="text-sm font-medium text-gray-600 mt-1">{item.name}</p>
                <p className="text-xs text-gray-500 mt-1">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Performance Trends */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Performance Trends</h3>
            <TrendingUp className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="performance" stroke="#3B82F6" strokeWidth={2} name="Performance Score" />
              <Line type="monotone" dataKey="satisfaction" stroke="#10B981" strokeWidth={2} name="Satisfaction" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Department Performance */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Department Performance</h3>
            <Users className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={departmentData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="performance" fill="#8B5CF6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Performance Distribution */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Performance Distribution</h3>
            <Star className="h-5 w-5 text-gray-400" />
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
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {performanceDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Goals Achievement */}
        <div className="bg-white shadow-sm rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Goals Achievement</h3>
            <Target className="h-5 w-5 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={performanceTrends}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Area type="monotone" dataKey="goals" stroke="#F59E0B" fill="#F59E0B" fillOpacity={0.3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-1">
        {/* Top Performers */}
        <div className="bg-white shadow-sm rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Top Performers</h3>
              <Award className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {topPerformers.map((performer, index) => (
              <div key={performer.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center">
                  <div className="flex-shrink-0 relative">
                    <img className="h-10 w-10 rounded-full" src={performer.avatar} alt="" />
                    <span className={`absolute -top-1 -right-1 h-5 w-5 rounded-full flex items-center justify-center text-xs font-bold text-white ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : index === 2 ? 'bg-orange-600' : 'bg-blue-500'
                    }`}>
                      {index + 1}
                    </span>
                  </div>
                  <div className="ml-4 flex-1">
                    <p className="text-sm font-medium text-gray-900">{performer.name}</p>
                    <p className="text-xs text-gray-500">{performer.role} • {performer.department}</p>
                    <div className="mt-1 flex items-center space-x-4 text-xs text-gray-500">
                      <span>Score: {performer.score}/10</span>
                      <span>Goals: {performer.goals}%</span>
                    </div>
                  </div>
                  <div className="flex items-center text-green-600">
                    <ArrowUp className="h-4 w-4" />
                    <span className="text-xs font-medium">{performer.improvement}%</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white shadow-sm rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Recent Activities</h3>
              <Activity className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <img className="h-8 w-8 rounded-full" src={activity.avatar} alt="" />
                  </div>
                  <div className="ml-3 flex-1">
                    <p className="text-sm text-gray-900">
                      <span className="font-medium">{activity.user}</span>
                      <span className="text-gray-600"> {activity.action} </span>
                      <span className="font-medium">{activity.target}</span>
                    </p>
                    <div className="mt-1 flex items-center">
                      <div className="flex items-center text-gray-500">
                        {getActivityIcon(activity.type)}
                      </div>
                      <span className="ml-2 text-xs text-gray-500">{activity.date}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Reviews */}
        <div className="bg-white shadow-sm rounded-lg">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Upcoming Reviews</h3>
              <Calendar className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {upcomingReviews.map((review) => (
              <div key={review.id} className="px-6 py-4 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <img className="h-8 w-8 rounded-full" src={review.avatar} alt="" />
                    <div className="ml-3">
                      <p className="text-sm font-medium text-gray-900">{review.employee}</p>
                      <p className="text-xs text-gray-500">{review.role}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(review.priority)}`}>
                      {review.priority}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(review.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <p className="mt-2 text-xs text-gray-600">{review.type}</p>
              </div>
            ))}
          </div>
          <div className="bg-gray-50 px-6 py-3">
            <button className="text-sm font-medium text-blue-600 hover:text-blue-500">
              View all reviews →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;