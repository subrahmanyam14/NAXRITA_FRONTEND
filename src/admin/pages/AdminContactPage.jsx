import React, { useState } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  MessageSquare, 
  Users, 
  Building2, 
  Globe,
  Send,
  User,
  Calendar,
  Star,
  Shield,
  Headphones,
  Zap,
  CheckCircle,
  AlertTriangle,
  Info,
  Plus,
  Search,
  Filter,
  Download,
  Edit3,
  Eye,
  MoreVertical,
  ArrowRight,
  TrendingUp,
  Activity,
  Bell,
  Settings,
  HelpCircle,
  ExternalLink,
  X
} from 'lucide-react';

// Animated Background Components
const StarField = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(150)].map((_, i) => (
      <div
        key={i}
        className="absolute animate-twinkle"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 2 + 1}px`,
          height: `${Math.random() * 2 + 1}px`,
          backgroundColor: ['#ffffff', '#2563eb', '#a3a3a3', '#6b7280'][Math.floor(Math.random() * 4)],
          borderRadius: '50%',
          animationDelay: `${Math.random() * 3}s`,
          opacity: Math.random() * 0.6 + 0.2
        }}
      />
    ))}
  </div>
);

const Sparkles = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(25)].map((_, i) => (
      <div
        key={i}
        className="absolute animate-float"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 8}s`,
          animationDuration: '8s'
        }}
      >
        <div
          className="sparkle"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            backgroundColor: ['#2563eb', '#22c55e', '#f59e0b', '#ffffff'][Math.floor(Math.random() * 4)],
            borderRadius: '50%'
          }}
        />
      </div>
    ))}
  </div>
);

const AnimatedDots = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {[...Array(80)].map((_, i) => (
      <div
        key={i}
        className="absolute animate-pulse-slow"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          width: `${Math.random() * 2 + 1}px`,
          height: `${Math.random() * 2 + 1}px`,
          backgroundColor: ['rgba(37, 99, 235, 0.3)', 'rgba(163, 163, 163, 0.2)', 'rgba(107, 114, 128, 0.1)'][Math.floor(Math.random() * 3)],
          borderRadius: '50%',
          animationDelay: `${Math.random() * 4}s`,
          animationDuration: '4s'
        }}
      />
    ))}
  </div>
);

const CosmicBackground = () => (
  <div className="fixed inset-0 pointer-events-none z-0">
    <StarField />
    <Sparkles />
    <AnimatedDots />
    
    {/* Nebula Clouds */}
    <div className="absolute inset-0">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-drift"
          style={{
            left: `${Math.random() * 70}%`,
            top: `${Math.random() * 70}%`,
            width: `${Math.random() * 300 + 200}px`,
            height: `${Math.random() * 300 + 200}px`,
            background: i % 2 === 0 ? 'rgba(37, 99, 235, 0.05)' : 'rgba(107, 114, 128, 0.03)',
            filter: 'blur(100px)',
            animationDelay: `${i * 10}s`,
            animationDuration: '30s'
          }}
        />
      ))}
    </div>
  </div>
);

const AdminContactPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [showMessageForm, setShowMessageForm] = useState(false);

  // Mock contact data
  const contactStats = {
    totalInquiries: 234,
    pendingResponses: 18,
    avgResponseTime: '2.4 hrs',
    satisfactionRate: 94.5,
    activeChats: 7,
    resolvedToday: 23
  };

  const contactChannels = [
    {
      id: 1,
      type: 'Email',
      address: 'support@naxrita.com',
      icon: Mail,
      status: 'Active',
      responses: 45,
      avgTime: '3.2 hrs',
      color: 'blue'
    },
    {
      id: 2,
      type: 'Phone',
      address: '+1 (555) 123-4567',
      icon: Phone,
      status: 'Active',
      responses: 28,
      avgTime: '1.8 hrs',
      color: 'emerald'
    },
    {
      id: 3,
      type: 'Live Chat',
      address: 'Website Widget',
      icon: MessageSquare,
      status: 'Active',
      responses: 67,
      avgTime: '0.5 hrs',
      color: 'purple'
    },
    {
      id: 4,
      type: 'Address',
      address: '123 Business St, City, State 12345',
      icon: MapPin,
      status: 'Active',
      responses: 12,
      avgTime: 'N/A',
      color: 'amber'
    }
  ];

  const recentInquiries = [
    {
      id: 1,
      name: 'Sarah Johnson',
      email: 'sarah.j@email.com',
      subject: 'Product Demo Request',
      department: 'Sales',
      priority: 'High',
      status: 'Pending',
      received: '2 hours ago',
      channel: 'Email'
    },
    {
      id: 2,
      name: 'Michael Chen',
      email: 'michael.c@company.com',
      subject: 'Technical Support',
      department: 'Support',
      priority: 'Medium',
      status: 'In Progress',
      received: '4 hours ago',
      channel: 'Chat'
    },
    {
      id: 3,
      name: 'Emily Davis',
      email: 'emily.d@business.com',
      subject: 'Partnership Inquiry',
      department: 'Business',
      priority: 'High',
      status: 'Resolved',
      received: '1 day ago',
      channel: 'Phone'
    }
  ];

  const departments = [
    { name: 'Sales', email: 'sales@naxrita.com', phone: '+1 (555) 123-4567', manager: 'John Smith', inquiries: 45 },
    { name: 'Support', email: 'support@naxrita.com', phone: '+1 (555) 123-4568', manager: 'Jane Doe', inquiries: 67 },
    { name: 'HR', email: 'hr@naxrita.com', phone: '+1 (555) 123-4569', manager: 'Mike Wilson', inquiries: 23 },
    { name: 'Business', email: 'business@naxrita.com', phone: '+1 (555) 123-4570', manager: 'Lisa Brown', inquiries: 34 }
  ];

  const businessHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM EST' },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM EST' },
    { day: 'Sunday', hours: 'Closed' }
  ];

  const socialChannels = [
    { name: 'LinkedIn', handle: '@naxrita', followers: '12.5k', color: 'blue' },
    { name: 'Twitter', handle: '@naxrita_inc', followers: '8.3k', color: 'sky' },
    { name: 'Facebook', handle: 'naxrita Inc', followers: '15.2k', color: 'indigo' },
    { name: 'Instagram', handle: '@naxrita_official', followers: '6.8k', color: 'pink' }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-900/30 text-red-300 border-red-700/50';
      case 'Medium': return 'bg-amber-900/30 text-amber-300 border-amber-700/50';
      case 'Low': return 'bg-green-900/30 text-green-300 border-green-700/50';
      default: return 'bg-slate-800/50 text-slate-300 border-slate-600/50';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-amber-900/30 text-amber-300';
      case 'In Progress': return 'bg-blue-900/30 text-blue-300';
      case 'Resolved': return 'bg-emerald-900/30 text-emerald-300';
      default: return 'bg-slate-800/50 text-slate-300';
    }
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color, trend }) => (
    <div className="group relative bg-[#1e1e1e]/80 backdrop-blur-[10px] rounded-xl p-4 border border-[#2a2a2a] hover:border-[#404040] hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Card background sparkles */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: '2px',
              height: '2px',
              backgroundColor: '#2563eb',
              borderRadius: '50%',
              animationDelay: `${i * 0.5}s`
            }}
          />
        ))}
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div className={`p-2 rounded-lg bg-${color}-900/30 border border-${color}-700/50`}>
            <Icon className={`h-4 w-4 text-${color}-400`} />
          </div>
          {trend && (
            <div className={`flex items-center text-xs ${trend > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              <TrendingUp className={`h-3 w-3 mr-1 ${trend < 0 ? 'rotate-180' : ''}`} />
              {Math.abs(trend)}%
            </div>
          )}
        </div>
        <div>
          <p className="text-xs text-[#a3a3a3] mb-1">{title}</p>
          <p className="text-2xl font-bold text-[#ffffff]">{value}</p>
          {subtitle && <p className="text-xs text-[#6b7280] mt-1">{subtitle}</p>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ffffff] relative">
      <CosmicBackground />
      
      {/* Header */}
      <div className="relative z-10 bg-[#0a0a0a]/90 backdrop-blur-[10px] border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-[#ffffff] mb-2">Contact Management</h1>
              <p className="text-[#a3a3a3]">Manage customer inquiries, contact channels, and communication</p>
            </div>
            <div className="flex space-x-4">
              <button 
                onClick={() => setShowMessageForm(true)}
                className="group flex items-center space-x-2 px-6 py-3 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:-translate-y-1 transition-all duration-300 font-medium"
              >
                <Plus className="h-4 w-4 group-hover:rotate-90 transition-transform duration-300" />
                <span>Send Message</span>
              </button>
              <button className="flex items-center space-x-2 px-6 py-3 bg-[#161616] border border-[#404040] text-[#a3a3a3] rounded-lg hover:border-[#ffffff] hover:text-[#ffffff] hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] transition-all duration-300 font-medium">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-8 py-8">
        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-2 bg-[#111111]/80 backdrop-blur-[8px] p-2 rounded-xl border border-[#2a2a2a]">
            {['overview', 'inquiries', 'channels', 'directory'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 capitalize ${
                  activeTab === tab
                    ? 'bg-[#2563eb] text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]'
                    : 'text-[#a3a3a3] hover:bg-[#1e1e1e] hover:text-[#ffffff]'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        {activeTab === 'overview' && (
          <>
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
              <StatCard
                icon={MessageSquare}
                title="Total Inquiries"
                value={contactStats.totalInquiries}
                subtitle="This month"
                color="blue"
                trend={12}
              />
              <StatCard
                icon={Clock}
                title="Pending"
                value={contactStats.pendingResponses}
                subtitle="Need response"
                color="amber"
                trend={-5}
              />
              <StatCard
                icon={Zap}
                title="Avg Response"
                value={contactStats.avgResponseTime}
                subtitle="Target: 2hrs"
                color="purple"
                trend={8}
              />
              <StatCard
                icon={Star}
                title="Satisfaction"
                value={`${contactStats.satisfactionRate}%`}
                subtitle="Customer rating"
                color="emerald"
                trend={3}
              />
              <StatCard
                icon={Activity}
                title="Active Chats"
                value={contactStats.activeChats}
                subtitle="Live now"
                color="rose"
              />
              <StatCard
                icon={CheckCircle}
                title="Resolved Today"
                value={contactStats.resolvedToday}
                subtitle="Target: 25"
                color="indigo"
                trend={15}
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Contact Channels */}
              <div className="lg:col-span-2 bg-[#1e1e1e]/80 backdrop-blur-[10px] rounded-xl p-6 border border-[#2a2a2a] hover:border-[#404040] transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-[#ffffff]">Contact Channels Performance</h3>
                  <Eye className="h-5 w-5 text-[#6b7280] hover:text-[#ffffff] cursor-pointer transition-colors duration-300" />
                </div>
                <div className="space-y-4">
                  {contactChannels.map((channel) => (
                    <div key={channel.id} className="group flex items-center justify-between p-4 bg-[#161616]/50 backdrop-blur-[5px] rounded-lg border border-[#2a2a2a] hover:border-[#2563eb]/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <div className={`p-3 rounded-lg bg-${channel.color}-900/30 border border-${channel.color}-700/50 group-hover:bg-${channel.color}-900/50 transition-colors duration-300`}>
                          <channel.icon className={`h-5 w-5 text-${channel.color}-400`} />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-[#ffffff]">{channel.type}</div>
                          <div className="text-xs text-[#a3a3a3]">{channel.address}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-[#ffffff]">{channel.responses}</div>
                        <div className="text-xs text-[#6b7280]">Avg: {channel.avgTime}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="relative bg-gradient-to-br from-[#2563eb]/10 to-[#6366f1]/10 backdrop-blur-[10px] rounded-xl p-6 border border-[#2563eb]/30 overflow-hidden">
                {/* Background sparkles for this card */}
                <div className="absolute inset-0">
                  {[...Array(5)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute animate-pulse"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        width: '1px',
                        height: '1px',
                        backgroundColor: '#2563eb',
                        borderRadius: '50%',
                        animationDelay: `${i * 0.8}s`,
                        opacity: 0.6
                      }}
                    />
                  ))}
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-xl font-semibold text-[#ffffff] mb-6">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full group flex items-center justify-between p-4 bg-[#1e1e1e]/80 backdrop-blur-[8px] hover:bg-[#2a2a2a]/80 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(59,130,246,0.2)]">
                      <div className="flex items-center space-x-3">
                        <MessageSquare className="h-4 w-4 text-blue-400" />
                        <span className="text-sm font-medium text-[#ffffff]">Broadcast Message</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-[#6b7280] group-hover:text-[#ffffff] group-hover:translate-x-1 transition-all duration-300" />
                    </button>
                    
                    <button className="w-full group flex items-center justify-between p-4 bg-[#1e1e1e]/80 backdrop-blur-[8px] hover:bg-[#2a2a2a]/80 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                      <div className="flex items-center space-x-3">
                        <Settings className="h-4 w-4 text-purple-400" />
                        <span className="text-sm font-medium text-[#ffffff]">Update Hours</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-[#6b7280] group-hover:text-[#ffffff] group-hover:translate-x-1 transition-all duration-300" />
                    </button>
                    
                    <button className="w-full group flex items-center justify-between p-4 bg-[#1e1e1e]/80 backdrop-blur-[8px] hover:bg-[#2a2a2a]/80 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                      <div className="flex items-center space-x-3">
                        <Bell className="h-4 w-4 text-amber-400" />
                        <span className="text-sm font-medium text-[#ffffff]">Set Auto-Reply</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-[#6b7280] group-hover:text-[#ffffff] group-hover:translate-x-1 transition-all duration-300" />
                    </button>
                    
                    <button className="w-full group flex items-center justify-between p-4 bg-[#1e1e1e]/80 backdrop-blur-[8px] hover:bg-[#2a2a2a]/80 rounded-lg transition-all duration-300 hover:shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                      <div className="flex items-center space-x-3">
                        <HelpCircle className="h-4 w-4 text-emerald-400" />
                        <span className="text-sm font-medium text-[#ffffff]">FAQ Management</span>
                      </div>
                      <ArrowRight className="h-4 w-4 text-[#6b7280] group-hover:text-[#ffffff] group-hover:translate-x-1 transition-all duration-300" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Hours & Social Media */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-[#1e1e1e]/80 backdrop-blur-[10px] rounded-xl p-6 border border-[#2a2a2a] hover:border-[#404040] transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-[#ffffff]">Business Hours</h3>
                  <Edit3 className="h-4 w-4 text-[#6b7280] cursor-pointer hover:text-[#ffffff] transition-colors duration-300" />
                </div>
                <div className="space-y-3">
                  {businessHours.map((schedule, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#161616]/50 transition-colors duration-300">
                      <span className="text-sm text-[#a3a3a3]">{schedule.day}</span>
                      <span className="text-sm font-medium text-[#ffffff]">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-[#1e1e1e]/80 backdrop-blur-[10px] rounded-xl p-6 border border-[#2a2a2a] hover:border-[#404040] transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-[#ffffff]">Social Media Presence</h3>
                  <ExternalLink className="h-4 w-4 text-[#6b7280] cursor-pointer hover:text-[#ffffff] transition-colors duration-300" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  {socialChannels.map((social, index) => (
                    <div key={index} className={`group p-4 rounded-lg bg-${social.color}-900/20 border border-${social.color}-700/30 hover:border-${social.color}-500/50 hover:shadow-[0_0_15px_rgba(59,130,246,0.15)] transition-all duration-300`}>
                      <div className="text-sm font-medium text-[#ffffff]">{social.name}</div>
                      <div className="text-xs text-[#a3a3a3]">{social.handle}</div>
                      <div className="text-xs text-[#6b7280] mt-2">{social.followers} followers</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'inquiries' && (
          <>
            {/* Inquiry Management Header */}
            <div className="bg-[#1e1e1e]/80 backdrop-blur-[10px] rounded-xl p-6 border border-[#2a2a2a] mb-8">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#6b7280]" />
                  <input
                    type="text"
                    placeholder="Search inquiries..."
                    className="w-full pl-12 pr-4 py-3 text-sm bg-[#161616] border border-[#404040] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-[#ffffff] placeholder-[#6b7280] transition-all duration-300"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="px-4 py-3 text-sm bg-[#161616] border border-[#404040] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] text-[#ffffff] transition-all duration-300"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="all">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept.name} value={dept.name}>{dept.name}</option>
                  ))}
                </select>
                <button className="flex items-center space-x-2 px-4 py-3 border border-[#404040] rounded-lg hover:border-[#ffffff] hover:shadow-[0_0_10px_rgba(255,255,255,0.1)] text-sm text-[#a3a3a3] hover:text-[#ffffff] transition-all duration-300">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            {/* Inquiries List */}
            <div className="bg-[#1e1e1e]/80 backdrop-blur-[10px] rounded-xl border border-[#2a2a2a] overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-[#2a2a2a]">
                  <thead className="bg-[#111111]/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-[#a3a3a3] uppercase tracking-wider">Contact</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-[#a3a3a3] uppercase tracking-wider">Subject</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-[#a3a3a3] uppercase tracking-wider">Department</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-[#a3a3a3] uppercase tracking-wider">Priority</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-[#a3a3a3] uppercase tracking-wider">Status</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-[#a3a3a3] uppercase tracking-wider">Received</th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-[#a3a3a3] uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-[#1e1e1e]/40 divide-y divide-[#2a2a2a]">
                    {recentInquiries.map((inquiry) => (
                      <tr key={inquiry.id} className="hover:bg-[#161616]/50 transition-colors duration-300">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-[#ffffff]">{inquiry.name}</div>
                            <div className="text-xs text-[#a3a3a3]">{inquiry.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-[#ffffff]">{inquiry.subject}</div>
                          <div className="text-xs text-[#6b7280]">via {inquiry.channel}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#ffffff]">{inquiry.department}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getPriorityColor(inquiry.priority)}`}>
                            {inquiry.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(inquiry.status)}`}>
                            {inquiry.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-[#a3a3a3]">{inquiry.received}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-3">
                            <button className="text-blue-400 hover:text-blue-300 transition-colors duration-300">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-[#a3a3a3] hover:text-[#ffffff] transition-colors duration-300">
                              <MessageSquare className="h-4 w-4" />
                            </button>
                            <button className="text-[#a3a3a3] hover:text-[#ffffff] transition-colors duration-300">
                              <MoreVertical className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'channels' && (
          <>
            {/* Channel Management */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {contactChannels.map((channel) => (
                <div key={channel.id} className="group bg-[#1e1e1e]/80 backdrop-blur-[10px] rounded-xl p-6 border border-[#2a2a2a] hover:border-[#404040] hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg bg-${channel.color}-900/30 border border-${channel.color}-700/50 group-hover:bg-${channel.color}-900/50 transition-colors duration-300`}>
                        <channel.icon className={`h-6 w-6 text-${channel.color}-400`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[#ffffff]">{channel.type}</h3>
                        <p className="text-sm text-[#a3a3a3]">{channel.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        channel.status === 'Active' 
                          ? 'bg-emerald-900/30 text-emerald-300 border border-emerald-700/50' 
                          : 'bg-red-900/30 text-red-300 border border-red-700/50'
                      }`}>
                        {channel.status}
                      </span>
                      <Settings className="h-4 w-4 text-[#6b7280] cursor-pointer hover:text-[#ffffff] transition-colors duration-300" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-4 bg-[#161616]/50 backdrop-blur-[5px] rounded-lg border border-[#2a2a2a]">
                      <div className="text-2xl font-bold text-[#ffffff] mb-1">{channel.responses}</div>
                      <div className="text-xs text-[#a3a3a3]">Total Responses</div>
                    </div>
                    <div className="text-center p-4 bg-[#161616]/50 backdrop-blur-[5px] rounded-lg border border-[#2a2a2a]">
                      <div className="text-2xl font-bold text-[#ffffff] mb-1">{channel.avgTime}</div>
                      <div className="text-xs text-[#a3a3a3]">Avg Response Time</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="flex-1 px-4 py-2 text-xs font-medium text-[#a3a3a3] bg-[#161616] border border-[#404040] rounded-lg hover:border-[#ffffff] hover:text-[#ffffff] transition-all duration-300">
                      View Details
                    </button>
                    <button className="flex-1 px-4 py-2 text-xs font-medium text-white bg-[#2563eb] rounded-lg hover:bg-[#1d4ed8] hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all duration-300">
                      Configure
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Auto-Response Settings */}
            <div className="bg-[#1e1e1e]/80 backdrop-blur-[10px] rounded-xl p-6 border border-[#2a2a2a]">
              <h3 className="text-xl font-semibold text-[#ffffff] mb-6">Auto-Response Templates</h3>
              <div className="space-y-4">
                {[
                  { title: 'Welcome Message', status: 'Active', usage: '234 sent' },
                  { title: 'Out of Office', status: 'Inactive', usage: '12 sent' },
                  { title: 'Thank You Response', status: 'Active', usage: '156 sent' },
                  { title: 'Escalation Notice', status: 'Active', usage: '8 sent' }
                ].map((template, index) => (
                  <div key={index} className="group flex items-center justify-between p-4 bg-[#161616]/50 backdrop-blur-[5px] rounded-lg border border-[#2a2a2a] hover:border-[#404040] transition-all duration-300">
                    <div>
                      <div className="text-sm font-medium text-[#ffffff]">{template.title}</div>
                      <div className="text-xs text-[#a3a3a3]">{template.usage}</div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        template.status === 'Active' 
                          ? 'bg-emerald-900/30 text-emerald-300' 
                          : 'bg-slate-800/50 text-slate-300'
                      }`}>
                        {template.status}
                      </span>
                      <Edit3 className="h-4 w-4 text-[#6b7280] cursor-pointer hover:text-[#ffffff] transition-colors duration-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'directory' && (
          <>
            {/* Department Directory */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              {departments.map((dept, index) => (
                <div key={index} className="group bg-[#1e1e1e]/80 backdrop-blur-[10px] rounded-xl p-6 border border-[#2a2a2a] hover:border-[#404040] hover:shadow-[0_0_20px_rgba(59,130,246,0.2)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 rounded-lg bg-blue-900/30 border border-blue-700/50 group-hover:bg-blue-900/50 transition-colors duration-300">
                        <Building2 className="h-6 w-6 text-blue-400" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-[#ffffff]">{dept.name}</h3>
                        <p className="text-sm text-[#a3a3a3]">Manager: {dept.manager}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-blue-400">{dept.inquiries}</div>
                      <div className="text-xs text-[#6b7280]">This month</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3">
                      <Mail className="h-4 w-4 text-[#6b7280]" />
                      <span className="text-sm text-[#a3a3a3]">{dept.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-[#6b7280]" />
                      <span className="text-sm text-[#a3a3a3]">{dept.phone}</span>
                    </div>
                  </div>
                  
                  <div className="flex space-x-3">
                    <button className="flex-1 px-4 py-2 text-xs font-medium text-[#a3a3a3] bg-[#161616] border border-[#404040] rounded-lg hover:border-[#ffffff] hover:text-[#ffffff] transition-all duration-300">
                      View Team
                    </button>
                    <button className="flex-1 px-4 py-2 text-xs font-medium text-white bg-[#2563eb] rounded-lg hover:bg-[#1d4ed8] hover:shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all duration-300">
                      Contact
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Company Address & Location */}
            <div className="bg-[#1e1e1e]/80 backdrop-blur-[10px] rounded-xl p-6 border border-[#2a2a2a]">
              <h3 className="text-xl font-semibold text-[#ffffff] mb-6">Office Locations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <h4 className="text-sm font-medium text-[#ffffff] mb-4">Main Office</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-[#6b7280]" />
                      <span className="text-sm text-[#a3a3a3]">123 Business Street, Suite 100</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-[#a3a3a3] ml-7">New York, NY 10001</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-[#6b7280]" />
                      <span className="text-sm text-[#a3a3a3]">+1 (555) 123-4567</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-[#ffffff] mb-4">Branch Office</h4>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-4 w-4 text-[#6b7280]" />
                      <span className="text-sm text-[#a3a3a3]">456 Innovation Drive</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-[#a3a3a3] ml-7">San Francisco, CA 94105</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="h-4 w-4 text-[#6b7280]" />
                      <span className="text-sm text-[#a3a3a3]">+1 (555) 987-6543</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="aspect-video bg-[#161616]/50 backdrop-blur-[5px] border border-[#2a2a2a] rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-[#6b7280] mx-auto mb-3" />
                  <p className="text-sm text-[#a3a3a3] mb-1">Interactive map integration</p>
                  <p className="text-xs text-[#6b7280]">Google Maps or similar service</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Message Form Modal */}
      {showMessageForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="relative bg-[#1e1e1e]/90 backdrop-blur-[20px] rounded-xl p-8 w-full max-w-lg border border-[#2a2a2a] shadow-[0_20px_40px_rgba(0,0,0,0.9)]">
            {/* Modal sparkles */}
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="absolute animate-ping"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    width: '2px',
                    height: '2px',
                    backgroundColor: '#2563eb',
                    borderRadius: '50%',
                    animationDelay: `${i * 0.7}s`,
                    opacity: 0.6
                  }}
                />
              ))}
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-[#ffffff]">Send Message</h3>
                <button
                  onClick={() => setShowMessageForm(false)}
                  className="text-[#6b7280] hover:text-[#ffffff] transition-colors duration-300"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              
              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#a3a3a3] mb-2">To</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-[#ffffff] placeholder-[#6b7280] transition-all duration-300"
                    placeholder="recipient@email.com"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#a3a3a3] mb-2">Subject</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-[#ffffff] placeholder-[#6b7280] transition-all duration-300"
                    placeholder="Message subject"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-[#a3a3a3] mb-2">Message</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-[#ffffff] placeholder-[#6b7280] transition-all duration-300 resize-none"
                    placeholder="Type your message..."
                  />
                </div>
                
                <div className="flex justify-end space-x-4">
                  <button
                    type="button"
                    onClick={() => setShowMessageForm(false)}
                    className="px-6 py-3 border border-[#404040] text-[#a3a3a3] rounded-lg hover:border-[#ffffff] hover:text-[#ffffff] font-medium transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center space-x-2 px-6 py-3 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] font-medium transition-all duration-300"
                  >
                    <Send className="h-4 w-4" />
                    <span>Send</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        
        @keyframes float {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
        
        @keyframes pulse-slow {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.5); opacity: 0.8; }
        }
        
        @keyframes drift {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        .animate-twinkle {
          animation: twinkle 3s ease-in-out infinite alternate;
        }
        
        .animate-float {
          animation: float 8s linear infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-drift {
          animation: drift 30s ease-in-out infinite;
        }
        
        /* Scrollbar styling for dark theme */
        ::-webkit-scrollbar {
          width: 8px;
          height: 8px;
        }
        
        ::-webkit-scrollbar-track {
          background: #1a1a1a;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb {
          background: #404040;
          border-radius: 4px;
        }
        
        ::-webkit-scrollbar-thumb:hover {
          background: #6b7280;
        }
      `}</style>
    </div>
  );
};

export default AdminContactPage;
