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
  ExternalLink
} from 'lucide-react';

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
      address: 'support@company.com',
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
    { name: 'Sales', email: 'sales@company.com', phone: '+1 (555) 123-4567', manager: 'John Smith', inquiries: 45 },
    { name: 'Support', email: 'support@company.com', phone: '+1 (555) 123-4568', manager: 'Jane Doe', inquiries: 67 },
    { name: 'HR', email: 'hr@company.com', phone: '+1 (555) 123-4569', manager: 'Mike Wilson', inquiries: 23 },
    { name: 'Business', email: 'business@company.com', phone: '+1 (555) 123-4570', manager: 'Lisa Brown', inquiries: 34 }
  ];

  const businessHours = [
    { day: 'Monday - Friday', hours: '9:00 AM - 6:00 PM EST' },
    { day: 'Saturday', hours: '10:00 AM - 4:00 PM EST' },
    { day: 'Sunday', hours: 'Closed' }
  ];

  const socialChannels = [
    { name: 'LinkedIn', handle: '@company', followers: '12.5k', color: 'blue' },
    { name: 'Twitter', handle: '@company_inc', followers: '8.3k', color: 'sky' },
    { name: 'Facebook', handle: 'Company Inc', followers: '15.2k', color: 'indigo' },
    { name: 'Instagram', handle: '@company_official', followers: '6.8k', color: 'pink' }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending': return 'bg-amber-100 text-amber-700';
      case 'In Progress': return 'bg-blue-100 text-blue-700';
      case 'Resolved': return 'bg-emerald-100 text-emerald-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color, trend }) => (
    <div className="bg-white rounded-xl p-4 border border-slate-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div className={`p-2 rounded-lg bg-${color}-100`}>
          <Icon className={`h-4 w-4 text-${color}-600`} />
        </div>
        {trend && (
          <div className={`flex items-center text-xs ${trend > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            <TrendingUp className={`h-3 w-3 mr-1 ${trend < 0 ? 'rotate-180' : ''}`} />
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div>
        <p className="text-xs text-slate-600 mb-1">{title}</p>
        <p className="text-2xl font-bold text-slate-900">{value}</p>
        {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Contact Management</h1>
              <p className="text-sm text-slate-600 mt-1">Manage customer inquiries, contact channels, and communication</p>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowMessageForm(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <Plus className="h-4 w-4" />
                <span>Send Message</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
                <Download className="h-4 w-4" />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-1 bg-white p-1 rounded-xl border border-slate-200">
            {['overview', 'inquiries', 'channels', 'directory'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors capitalize ${
                  activeTab === tab
                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50'
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
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Contact Channels */}
              <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">Contact Channels Performance</h3>
                  <Eye className="h-5 w-5 text-slate-400" />
                </div>
                <div className="space-y-4">
                  {contactChannels.map((channel) => (
                    <div key={channel.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`p-2 rounded-lg bg-${channel.color}-100`}>
                          <channel.icon className={`h-4 w-4 text-${channel.color}-600`} />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-slate-900">{channel.type}</div>
                          <div className="text-xs text-slate-500">{channel.address}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-bold text-slate-900">{channel.responses}</div>
                        <div className="text-xs text-slate-500">Avg: {channel.avgTime}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-5 border border-blue-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-between p-3 bg-white/80 hover:bg-white rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <MessageSquare className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-slate-900">Broadcast Message</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  </button>
                  
                  <button className="w-full flex items-center justify-between p-3 bg-white/80 hover:bg-white rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <Settings className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium text-slate-900">Update Hours</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  </button>
                  
                  <button className="w-full flex items-center justify-between p-3 bg-white/80 hover:bg-white rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <Bell className="h-4 w-4 text-amber-600" />
                      <span className="text-sm font-medium text-slate-900">Set Auto-Reply</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  </button>
                  
                  <button className="w-full flex items-center justify-between p-3 bg-white/80 hover:bg-white rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <HelpCircle className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm font-medium text-slate-900">FAQ Management</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Business Hours & Social Media */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-5 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">Business Hours</h3>
                  <Edit3 className="h-4 w-4 text-slate-400 cursor-pointer hover:text-slate-600" />
                </div>
                <div className="space-y-3">
                  {businessHours.map((schedule, index) => (
                    <div key={index} className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50">
                      <span className="text-sm text-slate-700">{schedule.day}</span>
                      <span className="text-sm font-medium text-slate-900">{schedule.hours}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">Social Media Presence</h3>
                  <ExternalLink className="h-4 w-4 text-slate-400 cursor-pointer hover:text-slate-600" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {socialChannels.map((social, index) => (
                    <div key={index} className={`p-3 rounded-lg bg-${social.color}-50 border border-${social.color}-200`}>
                      <div className="text-sm font-medium text-slate-900">{social.name}</div>
                      <div className="text-xs text-slate-600">{social.handle}</div>
                      <div className="text-xs text-slate-500 mt-1">{social.followers} followers</div>
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
            <div className="bg-white rounded-xl p-4 border border-slate-200 mb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search inquiries..."
                    className="w-full pl-10 pr-4 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="all">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept.name} value={dept.name}>{dept.name}</option>
                  ))}
                </select>
                <button className="flex items-center space-x-2 px-3 py-2 border border-slate-200 rounded-lg hover:bg-slate-50 text-sm">
                  <Filter className="h-4 w-4" />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            {/* Inquiries List */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Contact</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Subject</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Priority</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Received</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {recentInquiries.map((inquiry) => (
                      <tr key={inquiry.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-slate-900">{inquiry.name}</div>
                            <div className="text-xs text-slate-500">{inquiry.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-slate-900">{inquiry.subject}</div>
                          <div className="text-xs text-slate-500">via {inquiry.channel}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-900">{inquiry.department}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getPriorityColor(inquiry.priority)}`}>
                            {inquiry.priority}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(inquiry.status)}`}>
                            {inquiry.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-500">{inquiry.received}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button className="text-blue-600 hover:text-blue-900">
                              <Eye className="h-4 w-4" />
                            </button>
                            <button className="text-slate-600 hover:text-slate-900">
                              <MessageSquare className="h-4 w-4" />
                            </button>
                            <button className="text-slate-600 hover:text-slate-900">
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {contactChannels.map((channel) => (
                <div key={channel.id} className="bg-white rounded-xl p-5 border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className={`p-3 rounded-lg bg-${channel.color}-100`}>
                        <channel.icon className={`h-5 w-5 text-${channel.color}-600`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{channel.type}</h3>
                        <p className="text-sm text-slate-600">{channel.address}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${channel.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                        {channel.status}
                      </span>
                      <Settings className="h-4 w-4 text-slate-400 cursor-pointer hover:text-slate-600" />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-slate-900">{channel.responses}</div>
                      <div className="text-xs text-slate-600">Total Responses</div>
                    </div>
                    <div className="text-center p-3 bg-slate-50 rounded-lg">
                      <div className="text-2xl font-bold text-slate-900">{channel.avgTime}</div>
                      <div className="text-xs text-slate-600">Avg Response Time</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <button className="flex-1 px-3 py-2 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
                      View Details
                    </button>
                    <button className="flex-1 px-3 py-2 text-xs font-medium text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
                      Configure
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Auto-Response Settings */}
            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Auto-Response Templates</h3>
              <div className="space-y-3">
                {[
                  { title: 'Welcome Message', status: 'Active', usage: '234 sent' },
                  { title: 'Out of Office', status: 'Inactive', usage: '12 sent' },
                  { title: 'Thank You Response', status: 'Active', usage: '156 sent' },
                  { title: 'Escalation Notice', status: 'Active', usage: '8 sent' }
                ].map((template, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div>
                      <div className="text-sm font-medium text-slate-900">{template.title}</div>
                      <div className="text-xs text-slate-500">{template.usage}</div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        template.status === 'Active' ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {template.status}
                      </span>
                      <Edit3 className="h-4 w-4 text-slate-400 cursor-pointer hover:text-slate-600" />
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {departments.map((dept, index) => (
                <div key={index} className="bg-white rounded-xl p-5 border border-slate-200">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="p-3 rounded-lg bg-blue-100">
                        <Building2 className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900">{dept.name}</h3>
                        <p className="text-sm text-slate-600">Manager: {dept.manager}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-bold text-blue-600">{dept.inquiries}</div>
                      <div className="text-xs text-slate-500">This month</div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-700">{dept.email}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-700">{dept.phone}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 flex space-x-2">
                    <button className="flex-1 px-3 py-2 text-xs font-medium text-slate-600 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors">
                      View Team
                    </button>
                    <button className="flex-1 px-3 py-2 text-xs font-medium text-blue-600 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors">
                      Contact
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Company Address & Location */}
            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Office Locations</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-slate-900 mb-2">Main Office</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-700">123 Business Street, Suite 100</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-700 ml-6">New York, NY 10001</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-700">+1 (555) 123-4567</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-slate-900 mb-2">Branch Office</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <MapPin className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-700">456 Innovation Drive</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-slate-700 ml-6">San Francisco, CA 94105</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-slate-400" />
                      <span className="text-sm text-slate-700">+1 (555) 987-6543</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 aspect-video bg-slate-200 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">Interactive map integration</p>
                  <p className="text-xs text-slate-400">Google Maps or similar service</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Message Form Modal */}
      {showMessageForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-lg">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Send Message</h3>
              <button
                onClick={() => setShowMessageForm(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">To</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="recipient@email.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Subject</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Message subject"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Type your message..."
                />
              </div>
              
              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowMessageForm(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                >
                  <Send className="h-4 w-4" />
                  <span>Send</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminContactPage;
