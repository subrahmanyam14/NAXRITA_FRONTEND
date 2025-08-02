import React, { useState } from 'react';
import { 
  DollarSign,
  TrendingUp,
  Users,
  Calendar,
  BarChart3,
  Award,
  Target,
  Settings,
  Search,
  Filter,
  Plus,
  Download,
  Edit3,
  Eye,
  MoreVertical,
  AlertTriangle,
  CheckCircle,
  Clock,
  Building2,
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  Shield,
  Star,
  Calculator,
  FileText,
  Send,
  X,
  Info,
  Activity,
  Percent,
  Globe,
  ChevronRight,
  LineChart,
  RefreshCw
} from 'lucide-react';

const AdminCompensationPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSalaryForm, setShowSalaryForm] = useState(false);

  // Mock compensation data
  const compensationStats = {
    totalPayroll: 2450000,
    avgSalary: 85000,
    salaryBudget: 3000000,
    budgetUtilization: 81.7,
    pendingReviews: 12,
    upcomingAdjustments: 8,
    bonusPayout: 245000,
    benefitsCost: 420000
  };

  const salaryRanges = [
    { level: 'Entry Level', min: 45000, max: 65000, employees: 45, avg: 55000 },
    { level: 'Mid Level', min: 65000, max: 95000, employees: 67, avg: 78000 },
    { level: 'Senior Level', min: 95000, max: 135000, employees: 34, avg: 115000 },
    { level: 'Lead Level', min: 135000, max: 175000, employees: 18, avg: 155000 },
    { level: 'Executive', min: 175000, max: 250000, employees: 8, avg: 210000 }
  ];

  const departments = [
    { name: 'Engineering', employees: 45, avgSalary: 98000, budget: 850000, utilized: 78, trend: 5.2 },
    { name: 'Sales', employees: 32, avgSalary: 75000, budget: 620000, utilized: 83, trend: 3.8 },
    { name: 'Marketing', employees: 18, avgSalary: 72000, budget: 380000, utilized: 76, trend: 4.1 },
    { name: 'Product', employees: 24, avgSalary: 89000, budget: 520000, utilized: 81, trend: 6.3 },
    { name: 'HR', employees: 12, avgSalary: 68000, budget: 210000, utilized: 74, trend: 2.9 },
    { name: 'Finance', employees: 15, avgSalary: 79000, budget: 290000, utilized: 79, trend: 3.5 }
  ];

  const compensationReviews = [
    {
      id: 1,
      employee: 'Sarah Johnson',
      position: 'Senior Developer',
      department: 'Engineering',
      currentSalary: 95000,
      proposedSalary: 102000,
      increase: 7.4,
      effectiveDate: '2024-09-01',
      status: 'Pending',
      reviewer: 'John Smith'
    },
    {
      id: 2,
      employee: 'Michael Chen',
      position: 'Product Manager',
      department: 'Product',
      currentSalary: 88000,
      proposedSalary: 95000,
      increase: 8.0,
      effectiveDate: '2024-09-15',
      status: 'Approved',
      reviewer: 'Lisa Brown'
    },
    {
      id: 3,
      employee: 'Emily Davis',
      position: 'Sales Manager',
      department: 'Sales',
      currentSalary: 78000,
      proposedSalary: 82000,
      increase: 5.1,
      effectiveDate: '2024-10-01',
      status: 'Under Review',
      reviewer: 'Mark Wilson'
    }
  ];

  const benefitsPackages = [
    { name: 'Health Insurance', cost: 890, coverage: '100%', employees: 172, type: 'Medical' },
    { name: 'Dental & Vision', cost: 145, coverage: '95%', employees: 165, type: 'Medical' },
    { name: '401(k) Match', cost: 425, coverage: '6%', employees: 158, type: 'Retirement' },
    { name: 'Life Insurance', cost: 85, coverage: '2x Salary', employees: 172, type: 'Insurance' },
    { name: 'PTO Package', cost: 0, coverage: '25 days', employees: 172, type: 'Time Off' },
    { name: 'Professional Development', cost: 1200, coverage: '$2,000/year', employees: 145, type: 'Development' }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-emerald-100 text-emerald-700';
      case 'Pending': return 'bg-amber-100 text-amber-700';
      case 'Under Review': return 'bg-blue-100 text-blue-700';
      case 'Rejected': return 'bg-red-100 text-red-700';
      default: return 'bg-slate-100 text-slate-700';
    }
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color, trend, prefix = '' }) => (
    <div className="bg-white rounded-xl p-4 border border-slate-200 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div className={`p-2 rounded-lg bg-${color}-100`}>
          <Icon className={`h-4 w-4 text-${color}-600`} />
        </div>
        {trend && (
          <div className={`flex items-center text-xs ${trend > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            {trend > 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div>
        <p className="text-xs text-slate-600 mb-1">{title}</p>
        <p className="text-2xl font-bold text-slate-900">{prefix}{typeof value === 'number' ? value.toLocaleString() : value}</p>
        {subtitle && <p className="text-xs text-slate-500 mt-1">{subtitle}</p>}
      </div>
    </div>
  );

  const CircularProgress = ({ percentage, size = 40, color = 'blue' }) => {
    const radius = (size - 4) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="2"
            fill="transparent"
            className="text-slate-200"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="2"
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className={`text-${color}-500 transition-all duration-300`}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-medium text-slate-700">{percentage}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">Compensation Management</h1>
              <p className="text-sm text-slate-600 mt-1">Manage salaries, benefits, budgets, and compensation strategies</p>
            </div>
            <div className="flex space-x-3">
              <button 
                onClick={() => setShowSalaryForm(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <Plus className="h-4 w-4" />
                <span>Salary Review</span>
              </button>
              <button className="flex items-center space-x-2 px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors text-sm font-medium">
                <Download className="h-4 w-4" />
                <span>Export Report</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Navigation Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-1 bg-white p-1 rounded-xl border border-slate-200">
            {['overview', 'salaries', 'reviews', 'benefits', 'budgets'].map((tab) => (
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
                icon={DollarSign}
                title="Total Payroll"
                value={compensationStats.totalPayroll}
                subtitle="Monthly"
                color="blue"
                prefix="$"
                trend={2.4}
              />
              <StatCard
                icon={Users}
                title="Average Salary"
                value={compensationStats.avgSalary}
                subtitle="Company wide"
                color="emerald"
                prefix="$"
                trend={3.8}
              />
              <StatCard
                icon={Target}
                title="Budget Utilization"
                value={`${compensationStats.budgetUtilization}%`}
                subtitle={`$${compensationStats.salaryBudget.toLocaleString()} budget`}
                color="purple"
                trend={-1.2}
              />
              <StatCard
                icon={Award}
                title="Bonus Payout"
                value={compensationStats.bonusPayout}
                subtitle="This quarter"
                color="amber"
                prefix="$"
                trend={15.6}
              />
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              {/* Salary Distribution */}
              <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-slate-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-slate-900">Salary Range Distribution</h3>
                  <BarChart3 className="h-5 w-5 text-slate-400" />
                </div>
                <div className="space-y-4">
                  {salaryRanges.map((range, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-slate-900">{range.level}</span>
                          <span className="text-xs text-slate-500">{range.employees} employees</span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-slate-600 mb-2">
                          <span>${range.min.toLocaleString()} - ${range.max.toLocaleString()}</span>
                          <span>Avg: ${range.avg.toLocaleString()}</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${(range.employees / 172) * 100}%` }}
                          />
                        </div>
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
                      <Calculator className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-slate-900">Salary Calculator</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </button>
                  
                  <button className="w-full flex items-center justify-between p-3 bg-white/80 hover:bg-white rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <FileText className="h-4 w-4 text-purple-600" />
                      <span className="text-sm font-medium text-slate-900">Generate Reports</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </button>
                  
                  <button className="w-full flex items-center justify-between p-3 bg-white/80 hover:bg-white rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <TrendingUp className="h-4 w-4 text-emerald-600" />
                      <span className="text-sm font-medium text-slate-900">Market Analysis</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </button>
                  
                  <button className="w-full flex items-center justify-between p-3 bg-white/80 hover:bg-white rounded-lg transition-colors">
                    <div className="flex items-center space-x-3">
                      <Settings className="h-4 w-4 text-amber-600" />
                      <span className="text-sm font-medium text-slate-900">Pay Policies</span>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </button>
                </div>
              </div>
            </div>

            {/* Department Overview */}
            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Department Compensation Overview</h3>
                <div className="flex items-center space-x-2">
                  <select className="text-xs border border-slate-200 rounded-lg px-2 py-1">
                    <option>Last 12 months</option>
                    <option>Last 6 months</option>
                    <option>Last 3 months</option>
                  </select>
                  <RefreshCw className="h-4 w-4 text-slate-400 cursor-pointer hover:text-slate-600" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {departments.map((dept, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Building2 className="h-4 w-4 text-slate-500" />
                        <span className="text-sm font-medium text-slate-900">{dept.name}</span>
                      </div>
                      <div className={`flex items-center text-xs ${dept.trend > 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {dept.trend > 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                        {dept.trend}%
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-600">Employees</span>
                        <span className="font-medium text-slate-900">{dept.employees}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-600">Avg Salary</span>
                        <span className="font-medium text-slate-900">${dept.avgSalary.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-600">Budget Used</span>
                        <span className="font-medium text-slate-900">{dept.utilized}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                        <div 
                          className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
                          style={{ width: `${dept.utilized}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'salaries' && (
          <>
            {/* Salary Management Header */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 mb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search employees..."
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
                  <span>Filters</span>
                </button>
              </div>
            </div>

            {/* Salary Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="text-center">
                  <LineChart className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-slate-900">$95,500</div>
                  <div className="text-xs text-slate-600">Median Salary</div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="text-center">
                  <TrendingUp className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-slate-900">4.2%</div>
                  <div className="text-xs text-slate-600">Annual Increase</div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="text-center">
                  <Percent className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-slate-900">15.3%</div>
                  <div className="text-xs text-slate-600">Bonus Rate</div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="text-center">
                  <Globe className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-slate-900">92%</div>
                  <div className="text-xs text-slate-600">Market Rate</div>
                </div>
              </div>
            </div>

            {/* Salary Ranges Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900">Salary Structure by Level</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Level</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Min Salary</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Max Salary</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Average</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Employees</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Market Rate</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {salaryRanges.map((range, index) => (
                      <tr key={index} className="hover:bg-slate-50">
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">{range.level}</td>
                        <td className="px-6 py-4 text-sm text-slate-700">${range.min.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-slate-700">${range.max.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">${range.avg.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-slate-700">{range.employees}</td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                            95% competitive
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <Edit3 className="h-4 w-4 text-slate-500 cursor-pointer hover:text-slate-700" />
                            <Eye className="h-4 w-4 text-slate-500 cursor-pointer hover:text-slate-700" />
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

        {activeTab === 'reviews' && (
          <>
            {/* Review Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="flex items-center space-x-3">
                  <Clock className="h-8 w-8 text-amber-500" />
                  <div>
                    <div className="text-2xl font-bold text-slate-900">{compensationStats.pendingReviews}</div>
                    <div className="text-xs text-slate-600">Pending Reviews</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="h-8 w-8 text-emerald-500" />
                  <div>
                    <div className="text-2xl font-bold text-slate-900">28</div>
                    <div className="text-xs text-slate-600">Approved This Month</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-8 w-8 text-blue-500" />
                  <div>
                    <div className="text-2xl font-bold text-slate-900">{compensationStats.upcomingAdjustments}</div>
                    <div className="text-xs text-slate-600">Upcoming Adjustments</div>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="h-8 w-8 text-purple-500" />
                  <div>
                    <div className="text-2xl font-bold text-slate-900">6.8%</div>
                    <div className="text-xs text-slate-600">Avg Increase Rate</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Reviews Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
              <div className="p-4 border-b border-slate-200">
                <h3 className="text-lg font-semibold text-slate-900">Compensation Reviews</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-slate-200">
                  <thead className="bg-slate-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Employee</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Current Salary</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Proposed Salary</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Increase %</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Effective Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-slate-200">
                    {compensationReviews.map((review) => (
                      <tr key={review.id} className="hover:bg-slate-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-slate-900">{review.employee}</div>
                            <div className="text-xs text-slate-500">{review.position} • {review.department}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">${review.currentSalary.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm font-medium text-slate-900">${review.proposedSalary.toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <span className="text-sm font-medium text-emerald-600">+{review.increase}%</span>
                        </td>
                        <td className="px-6 py-4 text-sm text-slate-700">{review.effectiveDate}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(review.status)}`}>
                            {review.status}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <CheckCircle className="h-4 w-4 text-emerald-500 cursor-pointer hover:text-emerald-700" />
                            <AlertTriangle className="h-4 w-4 text-amber-500 cursor-pointer hover:text-amber-700" />
                            <MoreVertical className="h-4 w-4 text-slate-500 cursor-pointer hover:text-slate-700" />
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

        {activeTab === 'benefits' && (
          <>
            {/* Benefits Overview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <Shield className="h-8 w-8 text-blue-500" />
                  <CircularProgress percentage={96} size={40} color="blue" />
                </div>
                <div className="text-2xl font-bold text-slate-900">${compensationStats.benefitsCost.toLocaleString()}</div>
                <div className="text-xs text-slate-600">Monthly Benefits Cost</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <Users className="h-8 w-8 text-emerald-500" />
                  <CircularProgress percentage={89} size={40} color="emerald" />
                </div>
                <div className="text-2xl font-bold text-slate-900">89%</div>
                <div className="text-xs text-slate-600">Enrollment Rate</div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <Star className="h-8 w-8 text-amber-500" />
                  <CircularProgress percentage={92} size={40} color="amber" />
                </div>
                <div className="text-2xl font-bold text-slate-900">4.6/5</div>
                <div className="text-xs text-slate-600">Satisfaction Score</div>
              </div>
            </div>

            {/* Benefits Packages */}
            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-900">Benefits Packages</h3>
                <button className="flex items-center space-x-2 px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 text-sm font-medium">
                  <Plus className="h-4 w-4" />
                  <span>Add Benefit</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {benefitsPackages.map((benefit, index) => (
                  <div key={index} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-slate-900">{benefit.name}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        benefit.type === 'Medical' ? 'bg-red-100 text-red-700' :
                        benefit.type === 'Retirement' ? 'bg-blue-100 text-blue-700' :
                        benefit.type === 'Insurance' ? 'bg-purple-100 text-purple-700' :
                        benefit.type === 'Time Off' ? 'bg-emerald-100 text-emerald-700' :
                        'bg-amber-100 text-amber-700'
                      }`}>
                        {benefit.type}
                      </span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-600">Monthly Cost</span>
                        <span className="font-medium text-slate-900">${benefit.cost}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-600">Coverage</span>
                        <span className="font-medium text-slate-900">{benefit.coverage}</span>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-600">Enrolled</span>
                        <span className="font-medium text-slate-900">{benefit.employees}</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 mt-2">
                        <div 
                          className="bg-blue-500 h-1.5 rounded-full"
                          style={{ width: `${(benefit.employees / 172) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'budgets' && (
          <>
            {/* Budget Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="text-center">
                  <PieChart className="h-8 w-8 text-blue-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-slate-900">${compensationStats.salaryBudget.toLocaleString()}</div>
                  <div className="text-xs text-slate-600">Annual Budget</div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="text-center">
                  <Target className="h-8 w-8 text-emerald-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-slate-900">{compensationStats.budgetUtilization}%</div>
                  <div className="text-xs text-slate-600">Budget Used</div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="text-center">
                  <DollarSign className="h-8 w-8 text-purple-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-slate-900">${(compensationStats.salaryBudget * (1 - compensationStats.budgetUtilization/100)).toLocaleString()}</div>
                  <div className="text-xs text-slate-600">Remaining</div>
                </div>
              </div>
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="text-center">
                  <Activity className="h-8 w-8 text-amber-500 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-slate-900">Q3</div>
                  <div className="text-xs text-slate-600">Current Period</div>
                </div>
              </div>
            </div>

            {/* Budget by Department */}
            <div className="bg-white rounded-xl p-5 border border-slate-200 mb-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Budget Allocation by Department</h3>
              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Building2 className="h-5 w-5 text-slate-500" />
                      <div>
                        <div className="text-sm font-medium text-slate-900">{dept.name}</div>
                        <div className="text-xs text-slate-500">{dept.employees} employees</div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <div className="text-sm font-medium text-slate-900">${dept.budget.toLocaleString()}</div>
                        <div className="text-xs text-slate-500">{dept.utilized}% used</div>
                      </div>
                      <div className="w-24">
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${
                              dept.utilized > 90 ? 'bg-red-500' : 
                              dept.utilized > 80 ? 'bg-amber-500' : 'bg-emerald-500'
                            }`}
                            style={{ width: `${dept.utilized}%` }}
                          />
                        </div>
                      </div>
                      <CircularProgress percentage={dept.utilized} size={32} color={
                        dept.utilized > 90 ? 'red' : 
                        dept.utilized > 80 ? 'amber' : 'emerald'
                      } />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Budget Forecast */}
            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">Budget Forecast</h3>
              <div className="h-48 bg-slate-50 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <LineChart className="h-12 w-12 text-slate-400 mx-auto mb-2" />
                  <p className="text-sm text-slate-500">Budget trend analysis</p>
                  <p className="text-xs text-slate-400">Chart integration needed</p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Salary Review Modal */}
      {showSalaryForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-slate-900">Create Salary Review</h3>
              <button
                onClick={() => setShowSalaryForm(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Employee</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                    <option>Select Employee</option>
                    <option>Sarah Johnson</option>
                    <option>Michael Chen</option>
                    <option>Emily Davis</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Review Type</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                    <option>Annual Review</option>
                    <option>Promotion</option>
                    <option>Merit Increase</option>
                    <option>Market Adjustment</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Current Salary</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="85000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Proposed Salary</label>
                  <input
                    type="number"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                    placeholder="92000"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Justification</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  placeholder="Reason for salary adjustment..."
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Effective Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Reviewer</label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
                    <option>Select Reviewer</option>
                    <option>John Smith</option>
                    <option>Lisa Brown</option>
                    <option>Mark Wilson</option>
                  </select>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowSalaryForm(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium"
                >
                  <Send className="h-4 w-4" />
                  <span>Submit Review</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCompensationPage;
