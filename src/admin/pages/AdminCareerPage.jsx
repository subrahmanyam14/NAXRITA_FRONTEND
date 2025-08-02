import React, { useState } from 'react';
import { 
  Users, 
  Star, 
  MapPin, 
  Clock, 
  TrendingUp, 
  Award, 
  Building2, 
  Calendar, 
  Search,
  Filter,
  Eye,
  Edit3,
  UserPlus,
  BarChart3,
  Globe,
  Play,
  Download,
  Heart,
  MessageSquare,
  Share2,
  ChevronRight,
  Target,
  Zap,
  Shield,
  Coffee,
  Car,
  GraduationCap,
  Phone,
  Mail,
  Plus,
  X,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

const AdminCareerPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedJobLevel, setSelectedJobLevel] = useState('all');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [showJobForm, setShowJobForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data
  const careerStats = {
    totalJobs: 24,
    activeApplications: 156,
    newApplicationsToday: 12,
    averageRating: 4.8,
    pageViews: 3420,
    applicationRate: 18.5,
    hires: 8,
    averageTimeToHire: 14
  };

  const jobOpenings = [
    {
      id: 1,
      title: 'Senior Software Engineer',
      department: 'Engineering',
      location: 'Remote',
      type: 'Full-time',
      level: 'Senior',
      applicants: 23,
      posted: '2 days ago',
      status: 'Active',
      salary: '$120k - $160k',
      urgency: 'High'
    },
    {
      id: 2,
      title: 'Product Manager',
      department: 'Product',
      location: 'New York',
      type: 'Full-time',
      level: 'Mid',
      applicants: 45,
      posted: '5 days ago',
      status: 'Active',
      salary: '$100k - $130k',
      urgency: 'Medium'
    },
    {
      id: 3,
      title: 'UX Designer',
      department: 'Design',
      location: 'San Francisco',
      type: 'Full-time',
      level: 'Mid',
      applicants: 31,
      posted: '1 week ago',
      status: 'Active',
      salary: '$90k - $120k',
      urgency: 'Low'
    }
  ];

  const companyHighlights = [
    { icon: Coffee, label: 'Free meals & snacks', color: 'amber' },
    { icon: Car, label: 'Transportation allowance', color: 'blue' },
    { icon: GraduationCap, label: 'Learning & development', color: 'purple' },
    { icon: Shield, label: 'Health & wellness', color: 'emerald' },
    { icon: Globe, label: 'Remote work options', color: 'indigo' },
    { icon: Target, label: 'Performance bonuses', color: 'rose' }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Chen',
      role: 'Senior Developer',
      image: 'https://ui-avatars.com/api/?name=Sarah+Chen&background=random',
      quote: 'The growth opportunities here are incredible. I joined as a junior and now lead my own team.',
      rating: 5,
      department: 'Engineering'
    },
    {
      id: 2,
      name: 'Michael Rodriguez',
      role: 'Product Manager',
      image: 'https://ui-avatars.com/api/?name=Michael+Rodriguez&background=random',
      quote: 'Amazing work culture and supportive colleagues. Best decision I made for my career.',
      rating: 5,
      department: 'Product'
    }
  ];

  const departments = ['Engineering', 'Product', 'Design', 'Marketing', 'Sales', 'HR'];
  const jobLevels = ['Entry', 'Mid', 'Senior', 'Lead', 'Executive'];

  const filteredJobs = jobOpenings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || job.department === selectedDepartment;
    const matchesLevel = selectedJobLevel === 'all' || job.level === selectedJobLevel;
    return matchesSearch && matchesDepartment && matchesLevel;
  });

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'High': return 'bg-red-100 text-red-700 border-red-200';
      case 'Medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'Low': return 'bg-green-100 text-green-700 border-green-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color }) => (
    <div className="bg-white rounded-xl p-4 border border-slate-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-medium text-slate-600 mb-1">{title}</p>
          <p className="text-2xl font-bold text-slate-900">{value}</p>
          {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
        </div>
        <div className={`p-3 rounded-lg bg-${color}-100`}>
          <Icon className={`h-5 w-5 text-${color}-600`} />
        </div>
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
              <h1 className="text-2xl font-bold text-slate-900">Career Page Management</h1>
              <p className="text-sm text-slate-600 mt-1">Manage job postings, applications, and company branding</p>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowJobForm(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <Plus className="h-4 w-4" />
                <span>Post New Job</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
                <Download className="h-4 w-4" />
                <span>Export Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-1 bg-white p-1 rounded-xl border border-slate-200">
            {['overview', 'jobs', 'content', 'analytics'].map((tab) => (
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
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <StatCard
                icon={Users}
                title="Active Jobs"
                value={careerStats.totalJobs}
                subtitle="+3 this week"
                color="blue"
              />
              <StatCard
                icon={UserPlus}
                title="Applications"
                value={careerStats.activeApplications}
                subtitle="+12 today"
                color="emerald"
              />
              <StatCard
                icon={Star}
                title="Company Rating"
                value={careerStats.averageRating}
                subtitle="Based on reviews"
                color="amber"
              />
              <StatCard
                icon={Eye}
                title="Page Views"
                value={`${(careerStats.pageViews / 1000).toFixed(1)}k`}
                subtitle="This month"
                color="purple"
              />
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Recent Jobs */}
              <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">Recent Job Postings</h3>
                  <ChevronRight className="h-5 w-5 text-slate-400" />
                </div>
                <div className="space-y-3">
                  {jobOpenings.slice(0, 3).map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3">
                          <div>
                            <h4 className="text-sm font-medium text-slate-900">{job.title}</h4>
                            <div className="flex items-center space-x-2 text-xs text-slate-500 mt-1">
                              <MapPin className="h-3 w-3" />
                              <span>{job.location}</span>
                              <span>•</span>
                              <span>{job.applicants} applicants</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(job.urgency)}`}>
                          {job.urgency}
                        </span>
                        <button className="p-1 hover:bg-slate-200 rounded">
                          <Edit3 className="h-4 w-4 text-slate-500" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance Metrics */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-5 border border-blue-200">
                <h3 className="text-lg font-semibold text-slate-900 mb-4">Performance Metrics</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Application Rate</span>
                    <span className="text-lg font-bold text-blue-700">{careerStats.applicationRate}%</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2">
                    <div className="bg-blue-600 h-2 rounded-full transition-all duration-300" style={{ width: `${careerStats.applicationRate}%` }} />
                  </div>
                  
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-slate-600">Time to Hire</span>
                    <span className="text-lg font-bold text-emerald-700">{careerStats.averageTimeToHire} days</span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600">Successful Hires</span>
                    <span className="text-lg font-bold text-purple-700">{careerStats.hires}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Department Overview */}
            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Department Hiring Status</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {departments.map((dept, index) => {
                  const deptJobs = jobOpenings.filter(job => job.department === dept);
                  const totalApplicants = deptJobs.reduce((sum, job) => sum + job.applicants, 0);
                  
                  return (
                    <div key={dept} className="p-4 bg-slate-50 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium text-slate-900">{dept}</h4>
                        <Building2 className="h-4 w-4 text-slate-500" />
                      </div>
                      <div className="text-xs text-slate-600">
                        <div>{deptJobs.length} open positions</div>
                        <div>{totalApplicants} total applicants</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </>
        )}

        {activeTab === 'jobs' && (
          <>
            {/* Job Management Header */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 mb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search jobs..."
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
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
                <select
                  className="px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedJobLevel}
                  onChange={(e) => setSelectedJobLevel(e.target.value)}
                >
                  <option value="all">All Levels</option>
                  {jobLevels.map((level) => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Jobs List */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Job Title</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Department</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Location</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Applications</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {filteredJobs.map((job) => (
                      <tr key={job.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-slate-900">{job.title}</div>
                            <div className="text-sm text-slate-500">{job.salary}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-900">{job.department}</td>
                        <td className="px-6 py-4 text-sm text-slate-900">{job.location}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-slate-900">{job.applicants}</span>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getUrgencyColor(job.urgency)}`}>
                              {job.urgency}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {job.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm font-medium space-x-2">
                          <button className="text-blue-600 hover:text-blue-900">
                            <Edit3 className="h-4 w-4" />
                          </button>
                          <button className="text-slate-600 hover:text-slate-900">
                            <Eye className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </>
        )}

        {activeTab === 'content' && (
          <>
            {/* Content Management */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Company Benefits */}
              <div className="bg-white rounded-xl p-5 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">Company Benefits</h3>
                  <button className="text-blue-600 hover:text-blue-700">
                    <Edit3 className="h-4 w-4" />
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {companyHighlights.map((highlight, index) => (
                    <div key={index} className={`p-3 rounded-lg bg-${highlight.color}-50 border border-${highlight.color}-200`}>
                      <div className="flex items-center space-x-2">
                        <highlight.icon className={`h-4 w-4 text-${highlight.color}-600`} />
                        <span className="text-xs font-medium text-slate-700">{highlight.label}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Employee Testimonials */}
              <div className="bg-white rounded-xl p-5 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">Employee Testimonials</h3>
                  <button className="text-blue-600 hover:text-blue-700">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="p-3 bg-slate-50 rounded-lg">
                      <div className="flex items-start space-x-3">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="h-8 w-8 rounded-full"
                        />
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <div>
                              <div className="text-sm font-medium text-slate-900">{testimonial.name}</div>
                              <div className="text-xs text-slate-500">{testimonial.role}</div>
                            </div>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-3 w-3 ${i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-slate-300'}`}
                                />
                              ))}
                            </div>
                          </div>
                          <p className="text-xs text-slate-600">"{testimonial.quote}"</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Company Culture */}
              <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">Company Culture Content</h3>
                  <button className="text-blue-600 hover:text-blue-700">
                    <Edit3 className="h-4 w-4" />
                  </button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-medium text-slate-900 mb-2">Mission Statement</h4>
                    <div className="p-3 bg-slate-50 rounded-lg">
                      <p className="text-sm text-slate-600">
                        "We're building the future of work by empowering teams to collaborate seamlessly, 
                        innovate fearlessly, and create meaningful impact for our customers and communities."
                      </p>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium text-slate-900 mb-2">Core Values</h4>
                    <div className="space-y-2">
                      {['Innovation', 'Collaboration', 'Integrity', 'Growth'].map((value, index) => (
                        <div key={index} className="flex items-center space-x-2 p-2 bg-slate-50 rounded-lg">
                          <CheckCircle className="h-4 w-4 text-emerald-500" />
                          <span className="text-sm text-slate-700">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-sm font-medium text-slate-900 mb-2">Media Content</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="aspect-video bg-slate-200 rounded-lg flex items-center justify-center">
                      <Play className="h-8 w-8 text-slate-500" />
                    </div>
                    <div className="aspect-video bg-slate-200 rounded-lg flex items-center justify-center">
                      <Play className="h-8 w-8 text-slate-500" />
                    </div>
                    <div className="aspect-video bg-slate-200 rounded-lg flex items-center justify-center">
                      <Play className="h-8 w-8 text-slate-500" />
                    </div>
                    <div className="aspect-video bg-slate-200 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300">
                      <Plus className="h-8 w-8 text-slate-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'analytics' && (
          <>
            {/* Analytics Dashboard */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-xl p-5 border border-slate-200">
                <h3 className="text-sm font-medium text-slate-900 mb-3">Application Sources</h3>
                <div className="space-y-3">
                  {[
                    { source: 'Direct Website', count: 45, percentage: 35 },
                    { source: 'LinkedIn', count: 38, percentage: 30 },
                    { source: 'Job Boards', count: 25, percentage: 20 },
                    { source: 'Referrals', count: 19, percentage: 15 }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-xs text-slate-600">{item.source}</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-slate-200 rounded-full h-1.5">
                          <div 
                            className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                            style={{ width: `${item.percentage}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-slate-900">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl p-5 border border-slate-200">
                <h3 className="text-sm font-medium text-slate-900 mb-3">Top Performing Jobs</h3>
                <div className="space-y-3">
                  {jobOpenings.map((job, index) => (
                    <div key={job.id} className="flex items-center justify-between p-2 bg-slate-50 rounded-lg">
                      <div>
                        <div className="text-xs font-medium text-slate-900">{job.title}</div>
                        <div className="text-xs text-slate-500">{job.department}</div>
                      </div>
                      <div className="text-xs font-bold text-blue-600">{job.applicants}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-50 to-teal-100 rounded-xl p-5 border border-emerald-200">
                <h3 className="text-sm font-medium text-slate-900 mb-3">Hiring Funnel</h3>
                <div className="space-y-3">
                  {[
                    { stage: 'Applications', count: 156, color: 'bg-emerald-500' },
                    { stage: 'Screening', count: 89, color: 'bg-emerald-400' },
                    { stage: 'Interviews', count: 34, color: 'bg-emerald-300' },
                    { stage: 'Offers', count: 12, color: 'bg-emerald-200' },
                    { stage: 'Hires', count: 8, color: 'bg-emerald-100' }
                  ].map((stage, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-xs text-slate-700">{stage.stage}</span>
                      <div className="flex items-center space-x-2">
                        <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                        <span className="text-xs font-bold text-slate-900">{stage.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Detailed Analytics */}
            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Monthly Performance Trends</h3>
              <div className="h-48 bg-slate-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">Analytics chart would be rendered here</p>
                  <p className="text-xs text-slate-400">Integration with chart library needed</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Job Posting Modal */}
      {showJobForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Create New Job Posting</h3>
              <button
                onClick={() => setShowJobForm(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Job Title</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="e.g. Senior Software Engineer"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Department</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                    <option>Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Location</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="e.g. Remote, New York"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Job Type</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                    <option>Full-time</option>
                    <option>Part-time</option>
                    <option>Contract</option>
                    <option>Internship</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Job Description</label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Describe the role, responsibilities, and requirements..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Salary Range</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="e.g. $80k - $120k"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Priority Level</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowJobForm(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                >
                  Publish Job
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCareerPage;
