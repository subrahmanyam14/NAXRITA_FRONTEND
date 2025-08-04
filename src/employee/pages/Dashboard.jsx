import { Fragment, useState, useEffect } from 'react';
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
  ChevronLeft,
  Plus,
  Zap,
  Target,
  Award,
  Coffee,
  Users,
  Star,
  Sparkles
} from 'lucide-react';

// Animated background components
const StarfieldBackground = () => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    const starArray = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      color: ['#ffffff', '#2563eb', '#a3a3a3', '#6b7280'][Math.floor(Math.random() * 4)],
      animationDelay: Math.random() * 3
    }));
    setStars(starArray);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: star.color,
            opacity: star.opacity,
            borderRadius: '50%',
            animationDelay: `${star.animationDelay}s`,
            animationDuration: '3s'
          }}
        />
      ))}
    </div>
  );
};

const SparkleOverlay = () => {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const sparkleArray = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      color: ['#2563eb', '#22c55e', '#f59e0b', '#ffffff'][Math.floor(Math.random() * 4)],
      animationDelay: Math.random() * 8
    }));
    setSparkles(sparkleArray);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-10">
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute animate-bounce"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            animationDelay: `${sparkle.animationDelay}s`,
            animationDuration: '8s'
          }}
        >
          <Sparkles 
            size={sparkle.size} 
            color={sparkle.color}
            className="opacity-60"
          />
        </div>
      ))}
    </div>
  );
};

const AnimatedDots = () => {
  const [dots, setDots] = useState([]);

  useEffect(() => {
    const dotArray = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 1,
      color: ['rgba(37, 99, 235, 0.3)', 'rgba(163, 163, 163, 0.2)', 'rgba(107, 114, 128, 0.1)'][Math.floor(Math.random() * 3)],
      animationDelay: Math.random() * 4
    }));
    setDots(dotArray);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-5">
      {dots.map(dot => (
        <div
          key={dot.id}
          className="absolute animate-pulse"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            backgroundColor: dot.color,
            borderRadius: '50%',
            animationDelay: `${dot.animationDelay}s`,
            animationDuration: '4s'
          }}
        />
      ))}
    </div>
  );
};

// Auto-scrolling carousel component
const AutoCarousel = ({ items, title, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (!isHovered && items.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % items.length);
      }, interval);
      return () => clearInterval(timer);
    }
  }, [items.length, interval, isHovered]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  return (
    <div 
      className="relative bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] backdrop-blur-[10px] overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.8)',
        backgroundColor: 'rgba(30, 30, 30, 0.8)'
      }}
    >
      <div className="px-6 py-4 border-b border-[#2a2a2a]">
        <h3 className="text-lg font-medium text-[#ffffff]">{title}</h3>
      </div>
      
      <div className="relative h-48 overflow-hidden">
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={index} className="w-full flex-shrink-0 p-6 flex items-center justify-center">
              <div className="text-center">
                <div className="mx-auto mb-4 w-16 h-16 bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] rounded-full flex items-center justify-center">
                  {item.icon && <item.icon className="w-8 h-8 text-white" />}
                </div>
                <h4 className="text-xl font-medium text-[#ffffff] mb-2">{item.title}</h4>
                <p className="text-[#a3a3a3] text-sm">{item.description}</p>
                {item.value && (
                  <p className="text-[#2563eb] text-lg font-semibold mt-2">{item.value}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-[#2563eb] hover:bg-[#1d4ed8] rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-[#2563eb] hover:bg-[#1d4ed8] rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.4)]"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-[#2563eb] shadow-[0_0_10px_rgba(59,130,246,0.6)]' 
                : 'bg-[#404040] hover:bg-[#6b7280]'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

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
    color: 'text-[#22c55e]'
  },
  {
    id: 2,
    type: 'Document Uploaded',
    date: '2023-05-08T14:15:00',
    status: 'Completed',
    details: 'Updated Resume.pdf',
    icon: FileText,
    color: 'text-[#2563eb]'
  },
  {
    id: 3,
    type: 'Training Completed',
    date: '2023-05-05T16:20:00',
    status: 'Completed',
    details: 'Cybersecurity Awareness Training',
    icon: Award,
    color: 'text-[#a855f7]'
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
  { name: 'Available PTO', value: '18', unit: 'days', change: '+2', icon: Clock, color: 'text-[#2563eb]' },
  { name: 'This Month', value: '42', unit: 'hours', change: '+5%', icon: TrendingUp, color: 'text-[#22c55e]' },
  { name: 'Tasks Done', value: '23', unit: 'of 28', change: '82%', icon: Target, color: 'text-[#a855f7]' },
  { name: 'Team Rank', value: '#3', unit: 'of 12', change: '+1', icon: Award, color: 'text-[#f59e0b]' },
];

// Carousel data
const announcementItems = [
  {
    title: 'Memorial Day Closure',
    description: 'Office will be closed on Monday, May 29th',
    icon: Bell,
    value: 'May 29'
  },
  {
    title: 'New Benefits Package',
    description: 'Enhanced healthcare and wellness benefits available',
    icon: Award,
    value: 'Effective June 1'
  },
  {
    title: 'Team Building Event', 
    description: 'Annual company picnic scheduled for next month',
    icon: Users,
    value: 'June 15'
  }
];

const performanceItems = [
  {
    title: 'Monthly Performance',
    description: 'You\'re performing above average this month',
    icon: TrendingUp,
    value: '115%'
  },
  {
    title: 'Goal Progress',
    description: 'Q2 objectives are on track',
    icon: Target,
    value: '82%'
  },
  {
    title: 'Team Contribution',
    description: 'Your contributions are making a difference',
    icon: Star,
    value: 'Excellent'
  }
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const EmployeeDashboard = () => {
  const [announcementDismissed, setAnnouncementDismissed] = useState(false);

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      {/* Animated Background Elements */}
      {/* <StarfieldBackground />
      <AnimatedDots />
      <SparkleOverlay /> */}
      
      {/* Main Content */}
      <div className="relative z-20 p-8 space-y-8 max-w-full mx-auto">
        {/* Welcome Header */}
        <div 
          className="bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] backdrop-blur-[10px] relative overflow-hidden group hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-500"
          style={{
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.8)',
            backgroundColor: 'rgba(30, 30, 30, 0.8)'
          }}
        >
          <div className="px-8 py-6">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-light text-[#ffffff] mb-2">Good morning, John</h1>
                <p className="text-lg text-[#a3a3a3] font-light">Ready to make today productive?</p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-sm text-[#6b7280]">Last active</p>
                  <p className="text-lg text-[#ffffff] font-medium">9:42 AM</p>
                </div>
                <div className="h-16 w-16 bg-gradient-to-r from-[#2563eb] to-[#a855f7] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(59,130,246,0.3)]">
                  <User className="h-8 w-8 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={stat.name} 
              className="bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] p-6 backdrop-blur-[10px] group hover:border-[#404040] hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:-translate-y-1 transition-all duration-300"
              style={{
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.8)',
                backgroundColor: 'rgba(30, 30, 30, 0.8)',
                animationDelay: `${index * 0.1}s`
              }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-[#2563eb] to-[#1d4ed8]">
                  <stat.icon className={classNames('h-6 w-6 text-white')} />
                </div>
                <span className="text-sm text-[#22c55e] font-medium">{stat.change}</span>
              </div>
              <div>
                <p className="text-3xl font-light text-[#ffffff] mb-1">{stat.value}</p>
                <p className="text-sm text-[#a3a3a3] mb-1">{stat.unit}</p>
                <p className="text-sm text-[#6b7280]">{stat.name}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Auto-scrolling Carousels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AutoCarousel 
            items={announcementItems}
            title="Company Announcements"
            interval={5000}
          />
          <AutoCarousel 
            items={performanceItems}
            title="Performance Insights"
            interval={7000}
          />
        </div>

        {/* Quick Actions */}
        <div 
          className="bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] backdrop-blur-[10px]"
          style={{
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.8)',
            backgroundColor: 'rgba(30, 30, 30, 0.8)'
          }}
        >
          <div className="px-8 py-6 border-b border-[#2a2a2a]">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium text-[#ffffff]">Quick Actions</h3>
              <Zap className="h-6 w-6 text-[#f59e0b]" />
            </div>
          </div>
          <div className="p-8">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {quickActions.map((action, index) => (
                <div
                  key={action.name}
                  className="group relative bg-[#161616] border border-[#2a2a2a] rounded-xl p-6 hover:border-[#404040] hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:-translate-y-2 transition-all duration-300 cursor-pointer overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className={classNames(
                        'h-12 w-12 rounded-xl bg-gradient-to-br flex items-center justify-center shadow-lg',
                        action.gradient
                      )}>
                        <action.icon className="h-6 w-6 text-white" />
                      </div>
                      <ChevronRight className="h-5 w-5 text-[#6b7280] group-hover:text-[#ffffff] transition-colors" />
                    </div>
                    <h4 className="text-lg font-medium text-[#ffffff] mb-2">{action.name}</h4>
                    <p className="text-sm text-[#a3a3a3] mb-2">{action.description}</p>
                    <span className="text-sm text-[#6b7280]">{action.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upcoming Time Off */}
          <div 
            className="bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] backdrop-blur-[10px]"
            style={{
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.8)',
              backgroundColor: 'rgba(30, 30, 30, 0.8)'
            }}
          >
            <div className="px-6 py-4 border-b border-[#2a2a2a]">
              <h3 className="text-lg font-medium text-[#ffffff]">Time Off</h3>
            </div>
            <div className="p-6 space-y-4">
              {upcomingTimeOff.length > 0 ? (
                upcomingTimeOff.map((timeOff) => (
                  <div key={timeOff.id} className="flex items-center space-x-4 p-4 rounded-lg bg-[#161616] border border-[#2a2a2a] hover:border-[#404040] transition-all duration-300">
                    <div className="h-12 w-12 bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] rounded-xl flex items-center justify-center">
                      <timeOff.icon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-[#ffffff] truncate">{timeOff.type}</p>
                        <span className={classNames(
                          'px-3 py-1 rounded-full text-xs font-medium border',
                          timeOff.status === 'Approved' 
                            ? 'bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/30' 
                            : 'bg-[#f59e0b]/10 text-[#f59e0b] border-[#f59e0b]/30'
                        )}>
                          {timeOff.status}
                        </span>
                      </div>
                      <p className="text-sm text-[#a3a3a3] mt-1">
                        {new Date(timeOff.startDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - {timeOff.days}d
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Clock className="h-12 w-12 text-[#6b7280] mx-auto mb-4" />
                  <p className="text-sm text-[#a3a3a3] mb-4">No upcoming time off</p>
                  <button className="px-4 py-2 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] transition-colors">
                    Request Time Off
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Recent Activity */}
          <div 
            className="bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] backdrop-blur-[10px] lg:col-span-2"
            style={{
              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.8)',
              backgroundColor: 'rgba(30, 30, 30, 0.8)'
            }}
          >
            <div className="px-6 py-4 border-b border-[#2a2a2a]">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-[#ffffff]">Recent Activity</h3>
                <Activity className="h-6 w-6 text-[#6b7280]" />
              </div>
            </div>
            <div className="p-6">
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-start space-x-4 p-4 rounded-lg bg-[#161616] border border-[#2a2a2a] hover:border-[#404040] transition-all duration-300">
                    <div className={classNames('mt-1', activity.color)}>
                      <activity.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-[#ffffff]">{activity.type}</p>
                        <div className="flex items-center space-x-3">
                          <span className="text-xs text-[#a3a3a3]">
                            {new Date(activity.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                          <span className={classNames(
                            'px-3 py-1 rounded-full text-xs font-medium border',
                            activity.status === 'Completed' 
                              ? 'bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/30' 
                              : 'bg-[#2563eb]/10 text-[#2563eb] border-[#2563eb]/30'
                          )}>
                            {activity.status}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-[#a3a3a3] mt-2">{activity.details}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-[#2a2a2a]">
                <button className="w-full text-sm font-medium text-[#2563eb] hover:text-[#1d4ed8] py-3 rounded-lg hover:bg-[#2563eb]/5 transition-all duration-300">
                  View All Activity →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Events */}
        <div 
          className="bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] backdrop-blur-[10px]"
          style={{
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.8)',
            backgroundColor: 'rgba(30, 30, 30, 0.8)'
          }}
        >
          <div className="px-8 py-6 border-b border-[#2a2a2a]">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium text-[#ffffff]">Upcoming Events</h3>
              <div className="flex items-center space-x-3">
                <Calendar className="h-6 w-6 text-[#6b7280]" />
                <button className="text-sm font-medium text-[#2563eb] hover:text-[#1d4ed8] transition-colors">
                  View Calendar
                </button>
              </div>
            </div>
          </div>
          <div className="p-8">
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div key={event.id} className="flex items-center space-x-4 p-6 rounded-xl bg-[#161616] border border-[#2a2a2a] hover:border-[#404040] hover:shadow-[0_0_20px_rgba(59,130,246,0.1)] transition-all duration-300 group">
                  <div className="flex-shrink-0">
                    <div className={classNames(
                      'h-14 w-14 rounded-xl flex items-center justify-center',
                      event.type === 'meeting' ? 'bg-gradient-to-br from-[#2563eb] to-[#1d4ed8]' : 
                      event.type === 'deadline' ? 'bg-gradient-to-br from-[#ef4444] to-[#dc2626]' : 'bg-gradient-to-br from-[#a855f7] to-[#9333ea]'
                    )}>
                      <Calendar className="h-7 w-7 text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-medium text-[#ffffff] group-hover:text-[#2563eb] transition-colors">{event.name}</h4>
                      <div className="flex items-center space-x-3">
                        <span className="text-sm text-[#a3a3a3]">
                          {new Date(event.date).toLocaleTimeString('en-US', { 
                            hour: 'numeric', 
                            minute: '2-digit',
                            hour12: true 
                          })}
                        </span>
                        {event.attendees && (
                          <div className="flex items-center space-x-2">
                            <Users className="h-4 w-4 text-[#6b7280]" />
                            <span className="text-sm text-[#a3a3a3]">{event.attendees}</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center space-x-3 mt-2">
                      <span className="text-sm text-[#a3a3a3]">{event.duration}</span>
                      <span className="text-[#6b7280]">•</span>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-[#6b7280]" />
                        <span className="text-sm text-[#a3a3a3]">{event.location}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="h-6 w-6 text-[#6b7280] group-hover:text-[#ffffff] transition-colors" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CSS for additional animations */}
      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); }
          100% { transform: translateY(-100vh) rotate(360deg); }
        }
        
        @keyframes drift {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, -50px); }
        }
        
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite alternate;
        }
        
        .animate-float {
          animation: float 8s linear infinite;
        }
        
        .animate-drift {
          animation: drift 15s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default EmployeeDashboard;
