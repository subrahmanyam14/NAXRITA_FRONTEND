import { Fragment, useState } from 'react';
import { 
  Clock, 
  CheckCircle,
  FileText,
  Calendar,
  Bell,
  TrendingUp,
  TrendingDown,
  User,
  DollarSign,
  Eye,
  Settings,
  Activity,
  MapPin,
  ChevronRight,
  Plus,
  Zap,
  Target,
  Award,
  Coffee,
  Users
} from 'lucide-react';

const quickActions = [
  { 
    name: 'Time Off', 
    description: 'Request leave',
    icon: Clock,
    href: '#',
    gradient: 'from-blue-500 to-blue-600',
    count: '2 pending'
  },
  { 
    name: 'Expenses', 
    description: 'Submit report',
    icon: DollarSign,
    href: '#',
    gradient: 'from-emerald-500 to-emerald-600',
    count: '$1,240'
  },
  { 
    name: 'Payslips', 
    description: 'View history',
    icon: Eye,
    href: '#',
    gradient: 'from-purple-500 to-purple-600',
    count: 'Recent'
  },
  { 
    name: 'Profile', 
    description: 'Update info',
    icon: User,
    href: '/employee/profile',
    gradient: 'from-amber-500 to-amber-600',
    count: '85% complete'
  },
];

const upcomingTimeOff = [
  {
    id: 1,
    type: 'Vacation',
    startDate: '2023-06-15',
    endDate: '2023-06-22',
    status: 'Approved',
    days: 6,
    icon: Coffee
  },
  {
    id: 2,
    type: 'Sick Leave',
    startDate: '2023-07-01',
    endDate: '2023-07-01',
    status: 'Pending',
    days: 1,
    icon: Activity
  },
];

const recentActivity = [
  {
    id: 1,
    type: 'Time Off Request',
    date: '2023-05-10T10:30:00',
    status: 'Approved',
    details: 'Vacation from Jun 15-22, 2023',
    icon: CheckCircle,
    color: 'text-green-500'
  },
  {
    id: 2,
    type: 'Document Uploaded',
    date: '2023-05-08T14:15:00',
    status: 'Completed',
    details: 'Updated Resume.pdf',
    icon: FileText,
    color: 'text-blue-500'
  },
  {
    id: 3,
    type: 'Training Completed',
    date: '2023-05-05T16:20:00',
    status: 'Completed',
    details: 'Cybersecurity Awareness Training',
    icon: Award,
    color: 'text-purple-500'
  },
];

const upcomingEvents = [
  {
    id: 1,
    name: 'Team Meeting',
    date: '2023-05-12T10:00:00',
    duration: '1h',
    location: 'Conference Room A',
    type: 'meeting',
    attendees: 8
  },
  {
    id: 2,
    name: 'Project Deadline',
    date: '2023-05-15T17:00:00',
    duration: 'All day',
    location: 'Office',
    type: 'deadline',
    priority: 'high'
  },
  {
    id: 3,
    name: 'Performance Review',
    date: '2023-05-20T14:30:00',
    duration: '1h',
    location: 'HR Office',
    type: 'review',
    importance: 'critical'
  },
];

const stats = [
  { name: 'Available PTO', value: '18', unit: 'days', change: '+2', icon: Clock, color: 'text-blue-600' },
  { name: 'This Month', value: '42', unit: 'hours', change: '+5%', icon: TrendingUp, color: 'text-green-600' },
  { name: 'Tasks Done', value: '23', unit: 'of 28', change: '82%', icon: Target, color: 'text-purple-600' },
  { name: 'Team Rank', value: '#3', unit: 'of 12', change: '+1', icon: Award, color: 'text-amber-600' },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const EmployeeDashboard = () => {
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 p-3 space-y-4">
      {/* Welcome Header - Compact */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-xl shadow-xl">
        <div className="px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-light text-white">Good morning, John</h1>
              <p className="text-xs text-slate-300 font-thin">Ready to make today productive?</p>
            </div>
            <div className="flex items-center space-x-3">
              <div className="text-right">
                <p className="text-xs font-thin text-slate-400">Last active</p>
                <p className="text-xs text-white">9:42 AM</p>
              </div>
              <div className="h-8 w-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid - Compact */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white rounded-lg shadow-sm border border-gray-100 p-3">
            <div className="flex items-center justify-between">
              <stat.icon className={classNames('h-4 w-4', stat.color)} />
              <span className="text-xs font-thin text-gray-500">{stat.change}</span>
            </div>
            <div className="mt-2">
              <p className="text-lg font-light text-gray-900">{stat.value}</p>
              <div className="flex items-center space-x-1">
                <p className="text-xs font-thin text-gray-600">{stat.unit}</p>
              </div>
              <p className="text-xs font-thin text-gray-500 mt-1">{stat.name}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Announcement - Compact */}
      {!announcementDismissed && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3">
          <div className="flex items-start">
            <Bell className="h-4 w-4 text-blue-500 mt-0.5 flex-shrink-0" />
            <div className="ml-2 flex-1">
              <p className="text-xs font-light text-blue-800">
                Memorial Day office closure - Monday, May 29th
              </p>
            </div>
            <button
              onClick={() => setAnnouncementDismissed(true)}
              className="text-blue-600 hover:text-blue-800 ml-2"
            >
              <span className="text-xs">×</span>
            </button>
          </div>
        </div>
      )}

      {/* Quick Actions - Modern Cards */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-light text-gray-900">Quick Actions</h3>
            <Zap className="h-4 w-4 text-yellow-500" />
          </div>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            {quickActions.map((action) => (
              <div
                key={action.name}
                className="group relative bg-gradient-to-br border border-gray-100 rounded-lg p-3 hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden"
              >
                <div className={classNames(
                  'absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-5 transition-opacity',
                  action.gradient
                )} />
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <div className={classNames(
                      'h-8 w-8 rounded-lg bg-gradient-to-br flex items-center justify-center',
                      action.gradient
                    )}>
                      <action.icon className="h-4 w-4 text-white" />
                    </div>
                    <ChevronRight className="h-3 w-3 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </div>
                  <h4 className="text-sm font-light text-gray-900">{action.name}</h4>
                  <p className="text-xs font-thin text-gray-500 mb-1">{action.description}</p>
                  <span className="text-xs font-thin text-gray-400">{action.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Upcoming Time Off - Compact */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="px-4 py-3 border-b border-gray-100">
            <h3 className="text-sm font-light text-gray-900">Time Off</h3>
          </div>
          <div className="p-4 space-y-3">
            {upcomingTimeOff.length > 0 ? (
              upcomingTimeOff.map((timeOff) => (
                <div key={timeOff.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="h-8 w-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                    <timeOff.icon className="h-4 w-4 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-light text-gray-900 truncate">{timeOff.type}</p>
                      <span className={classNames(
                        'px-2 py-0.5 rounded-full text-xs font-thin',
                        timeOff.status === 'Approved' 
                          ? 'bg-green-50 text-green-700 border border-green-200' 
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      )}>
                        {timeOff.status}
                      </span>
                    </div>
                    <p className="text-xs font-thin text-gray-500">
                      {new Date(timeOff.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {timeOff.days}d
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-4">
                <Clock className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                <p className="text-xs font-thin text-gray-500 mb-2">No upcoming time off</p>
                <button className="text-xs font-light text-blue-600 hover:text-blue-800">
                  Request Time Off
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity - Enhanced */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
          <div className="px-4 py-3 border-b border-gray-100">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-light text-gray-900">Recent Activity</h3>
              <Activity className="h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className={classNames('mt-0.5', activity.color)}>
                    <activity.icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-light text-gray-900">{activity.type}</p>
                      <div className="flex items-center space-x-2">
                        <span className="text-xs font-thin text-gray-500">
                          {new Date(activity.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </span>
                        <span className={classNames(
                          'px-2 py-0.5 rounded-full text-xs font-thin border',
                          activity.status === 'Completed' 
                            ? 'bg-green-50 text-green-700 border-green-200' 
                            : 'bg-blue-50 text-blue-700 border-blue-200'
                        )}>
                          {activity.status}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs font-thin text-gray-500 mt-1">{activity.details}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100">
              <button className="w-full text-xs font-light text-blue-600 hover:text-blue-800 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                View All Activity →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Events - Modern Timeline */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="px-4 py-3 border-b border-gray-100">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-light text-gray-900">Upcoming Events</h3>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-gray-400" />
              <button className="text-xs font-light text-blue-600 hover:text-blue-800">
                View Calendar
              </button>
            </div>
          </div>
        </div>
        <div className="p-4">
          <div className="space-y-3">
            {upcomingEvents.map((event, index) => (
              <div key={event.id} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                <div className="flex-shrink-0">
                  <div className={classNames(
                    'h-10 w-10 rounded-lg flex items-center justify-center',
                    event.type === 'meeting' ? 'bg-blue-100' : 
                    event.type === 'deadline' ? 'bg-red-100' : 'bg-purple-100'
                  )}>
                    <Calendar className={classNames(
                      'h-4 w-4',
                      event.type === 'meeting' ? 'text-blue-600' : 
                      event.type === 'deadline' ? 'text-red-600' : 'text-purple-600'
                    )} />
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-light text-gray-900 group-hover:text-gray-700">{event.name}</h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs font-thin text-gray-500">
                        {new Date(event.date).toLocaleTimeString('en-US', { 
                          hour: 'numeric', 
                          minute: '2-digit',
                          hour12: true 
                        })}
                      </span>
                      {event.attendees && (
                        <div className="flex items-center space-x-1">
                          <Users className="h-3 w-3 text-gray-400" />
                          <span className="text-xs font-thin text-gray-500">{event.attendees}</span>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className="text-xs font-thin text-gray-600">{event.duration}</span>
                    <span className="text-gray-300">•</span>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-3 w-3 text-gray-400" />
                      <span className="text-xs font-thin text-gray-500">{event.location}</span>
                    </div>
                  </div>
                </div>
                <ChevronRight className="h-4 w-4 text-gray-300 group-hover:text-gray-500 transition-colors" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDashboard;