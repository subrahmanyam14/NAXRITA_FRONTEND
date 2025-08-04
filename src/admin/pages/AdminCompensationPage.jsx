import React, { useState, useEffect } from 'react';
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
  RefreshCw,
  Menu,
  ChevronLeft,
  Home,
  UserCircle,
  Bell,
  LogOut
} from 'lucide-react';
import MainSidebar from '../../shared/components/MainSidebar';
// Animated Background Component
const CosmicBackground = () => {
  const [stars, setStars] = useState([]);
  const [sparkles, setSparkles] = useState([]);
  const [dots, setDots] = useState([]);

  useEffect(() => {
    // Generate stars
    const starArray = Array.from({ length: 150 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.6 + 0.2,
      twinkleDelay: Math.random() * 3,
    }));

    // Generate sparkles
    const sparkleArray = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 6 + 2,
      animationDelay: Math.random() * 8,
    }));

    // Generate dots
    const dotArray = Array.from({ length: 80 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      animationDelay: Math.random() * 4,
    }));

    setStars(starArray);
    setSparkles(sparkleArray);
    setDots(dotArray);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {/* Starfield */}
      {stars.map(star => (
        <div
          key={star.id}
          className="absolute bg-white rounded-full animate-pulse"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            opacity: star.opacity,
            animationDelay: `${star.twinkleDelay}s`,
          }}
        />
      ))}

      {/* Sparkles */}
      {sparkles.map(sparkle => (
        <div
          key={sparkle.id}
          className="absolute bg-blue-400 rounded-full animate-bounce"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            animationDelay: `${sparkle.animationDelay}s`,
            animationDuration: '8s',
          }}
        />
      ))}

      {/* Animated Dots */}
      {dots.map(dot => (
        <div
          key={dot.id}
          className="absolute bg-blue-500/30 rounded-full animate-pulse"
          style={{
            left: `${dot.x}%`,
            top: `${dot.y}%`,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
            animationDelay: `${dot.animationDelay}s`,
          }}
        />
      ))}

      {/* Nebula Clouds */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>
    </div>
  );
};

// Auto Carousel Component
const AutoCarousel = ({ items, interval = 5000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    
    const timer = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % items.length);
    }, interval);

    return () => clearInterval(timer);
  }, [items.length, interval, isPlaying]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setCurrentIndex(prev => (prev + 1) % items.length);
  };

  const prevSlide = () => {
    setCurrentIndex(prev => (prev - 1 + items.length) % items.length);
  };

  return (
    <div 
      className="relative bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-600/40 shadow-lg hover:shadow-blue-500/20 transition-all duration-300"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      <div className="overflow-hidden rounded-lg">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={index} className="w-full flex-shrink-0">
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-blue-500/50 shadow-lg"
      >
        <ChevronLeft className="h-5 w-5 text-white" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-blue-600 hover:bg-blue-500 rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-blue-500/50 shadow-lg"
      >
        <ChevronRight className="h-5 w-5 text-white" />
      </button>

      {/* Indicators */}
      <div className="flex justify-center space-x-2 mt-4">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-blue-500 w-8 shadow-blue-500/50 shadow-md' 
                : 'bg-gray-600 hover:bg-gray-500'
            }`}
          />
        ))}
      </div>
    </div>
  );
};


const AdminCompensationPage = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [searchTerm, setSearchTerm] = useState('');
  const [showSalaryForm, setShowSalaryForm] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

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

  // Carousel items for announcements
  const carouselItems = [
    (
      <div className="text-center p-8">
        <Award className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">Q3 Performance Bonuses</h3>
        <p className="text-gray-300 text-sm">Exceptional performers will receive up to 15% salary bonus this quarter</p>
      </div>
    ),
    (
      <div className="text-center p-8">
        <TrendingUp className="h-12 w-12 text-green-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">Market Rate Analysis</h3>
        <p className="text-gray-300 text-sm">Our compensation packages are 5% above market average across all departments</p>
      </div>
    ),
    (
      <div className="text-center p-8">
        <Shield className="h-12 w-12 text-blue-400 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-white mb-2">New Benefits Package</h3>
        <p className="text-gray-300 text-sm">Enhanced health coverage and mental wellness programs starting next month</p>
      </div>
    )
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'Pending': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'Under Review': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'Rejected': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const StatCard = ({ icon: Icon, title, value, subtitle, color, trend, prefix = '' }) => (
    <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-600/40 hover:border-blue-500/40 transition-all duration-300 group hover:shadow-lg hover:shadow-blue-500/20 hover:-translate-y-1">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg bg-${color}-500/20 group-hover:bg-${color}-500/30 transition-colors duration-300`}>
          <Icon className={`h-5 w-5 text-${color}-400`} />
        </div>
        {trend && (
          <div className={`flex items-center text-xs ${trend > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {trend > 0 ? <ArrowUpRight className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
            {Math.abs(trend)}%
          </div>
        )}
      </div>
      <div>
        <p className="text-xs text-gray-400 mb-2 font-['Plus_Jakarta_Sans']">{title}</p>
        <p className="text-2xl font-bold text-white font-['Plus_Jakarta_Sans']">{prefix}{typeof value === 'number' ? value.toLocaleString() : value}</p>
        {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
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
            className="text-gray-600"
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
          <span className="text-xs font-medium text-white font-['Plus_Jakarta_Sans']">{percentage}%</span>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* <CosmicBackground /> */}
      
      <MainSidebar isCollapsed={sidebarCollapsed} setIsCollapsed={setSidebarCollapsed} />
      
      <div className={`transition-all duration-300 `}>
        {/* Header */}
        <div className="bg-black/80 backdrop-blur-xl border-b border-gray-600/40 relative z-10">
          <div className="max-w-full mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
                  className="p-2 rounded-lg bg-gray-800/60 hover:bg-gray-700/60 text-gray-400 hover:text-white transition-all duration-300"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <div>
                  <h1 className="text-2xl font-bold text-white font-['Plus_Jakarta_Sans']">Compensation Management</h1>
                  <p className="text-sm text-gray-400 mt-1">Manage salaries, benefits, budgets, and compensation strategies</p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Bell className="h-5 w-5 text-gray-400 hover:text-white cursor-pointer" />
                <div className="flex space-x-3">
                  <button 
                    onClick={() => setShowSalaryForm(true)}
                    className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition-all duration-300 text-sm font-medium shadow-lg hover:shadow-blue-500/25 font-['Plus_Jakarta_Sans']"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Salary Review</span>
                  </button>
                  <button className="flex items-center space-x-2 px-4 py-2 border border-gray-600/40 text-gray-300 hover:text-white rounded-lg hover:bg-gray-800/60 transition-all duration-300 text-sm font-medium font-['Plus_Jakarta_Sans']">
                    <Download className="h-4 w-4" />
                    <span>Export Report</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-full mx-auto px-6 py-6 relative z-10">
          {/* Navigation Tabs */}
          <div className="mb-6">
            <nav className="flex space-x-1 bg-gray-800/60 backdrop-blur-lg p-1 rounded-xl border border-gray-600/40">
              {['overview', 'salaries', 'reviews', 'benefits', 'budgets'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-3 text-sm font-medium rounded-lg transition-all duration-300 capitalize font-['Plus_Jakarta_Sans'] ${
                    activeTab === tab
                      ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                      : 'text-gray-400 hover:bg-gray-700/60 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          {activeTab === 'overview' && (
            <>
              {/* Carousel for Announcements */}
              <div className="mb-6">
                <AutoCarousel items={carouselItems} />
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
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
                <div className="lg:col-span-2 bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-600/40 hover:border-blue-500/40 transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-white font-['Plus_Jakarta_Sans']">Salary Range Distribution</h3>
                    <BarChart3 className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="space-y-6">
                    {salaryRanges.map((range, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium text-white font-['Plus_Jakarta_Sans']">{range.level}</span>
                            <span className="text-xs text-gray-400">{range.employees} employees</span>
                          </div>
                          <div className="flex items-center justify-between text-xs text-gray-400 mb-3">
                            <span>${range.min.toLocaleString()} - ${range.max.toLocaleString()}</span>
                            <span>Avg: ${range.avg.toLocaleString()}</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-blue-500 h-2 rounded-full transition-all duration-500 shadow-blue-500/50 shadow-sm"
                              style={{ width: `${(range.employees / 172) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="bg-gradient-to-br from-blue-900/40 to-indigo-900/40 backdrop-blur-lg rounded-xl p-6 border border-blue-500/30">
                  <h3 className="text-lg font-semibold text-white mb-6 font-['Plus_Jakarta_Sans']">Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full flex items-center justify-between p-4 bg-gray-800/60 hover:bg-gray-700/60 rounded-lg transition-all duration-300 group">
                      <div className="flex items-center space-x-3">
                        <Calculator className="h-4 w-4 text-blue-400 group-hover:text-blue-300" />
                        <span className="text-sm font-medium text-white font-['Plus_Jakarta_Sans']">Salary Calculator</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                    </button>
                    
                    <button className="w-full flex items-center justify-between p-4 bg-gray-800/60 hover:bg-gray-700/60 rounded-lg transition-all duration-300 group">
                      <div className="flex items-center space-x-3">
                        <FileText className="h-4 w-4 text-purple-400 group-hover:text-purple-300" />
                        <span className="text-sm font-medium text-white font-['Plus_Jakarta_Sans']">Generate Reports</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                    </button>
                    
                    <button className="w-full flex items-center justify-between p-4 bg-gray-800/60 hover:bg-gray-700/60 rounded-lg transition-all duration-300 group">
                      <div className="flex items-center space-x-3">
                        <TrendingUp className="h-4 w-4 text-emerald-400 group-hover:text-emerald-300" />
                        <span className="text-sm font-medium text-white font-['Plus_Jakarta_Sans']">Market Analysis</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                    </button>
                    
                    <button className="w-full flex items-center justify-between p-4 bg-gray-800/60 hover:bg-gray-700/60 rounded-lg transition-all duration-300 group">
                      <div className="flex items-center space-x-3">
                        <Settings className="h-4 w-4 text-amber-400 group-hover:text-amber-300" />
                        <span className="text-sm font-medium text-white font-['Plus_Jakarta_Sans']">Pay Policies</span>
                      </div>
                      <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-white transition-colors" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Department Overview */}
              <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-600/40">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white font-['Plus_Jakarta_Sans']">Department Compensation Overview</h3>
                  <div className="flex items-center space-x-2">
                    <select className="text-xs border border-gray-600/40 bg-gray-800/60 text-white rounded-lg px-3 py-2 focus:border-blue-500 focus:outline-none">
                      <option>Last 12 months</option>
                      <option>Last 6 months</option>
                      <option>Last 3 months</option>
                    </select>
                    <RefreshCw className="h-4 w-4 text-gray-400 cursor-pointer hover:text-white transition-colors" />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {departments.map((dept, index) => (
                    <div key={index} className="p-5 bg-gray-900/60 backdrop-blur-lg rounded-lg border border-gray-600/30 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <Building2 className="h-4 w-4 text-gray-400" />
                          <span className="text-sm font-medium text-white font-['Plus_Jakarta_Sans']">{dept.name}</span>
                        </div>
                        <div className={`flex items-center text-xs ${dept.trend > 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                          {dept.trend > 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                          {dept.trend}%
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Employees</span>
                          <span className="font-medium text-white">{dept.employees}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Avg Salary</span>
                          <span className="font-medium text-white">${dept.avgSalary.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Budget Used</span>
                          <span className="font-medium text-white">{dept.utilized}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                          <div 
                            className="bg-blue-500 h-2 rounded-full transition-all duration-500 shadow-blue-500/50 shadow-sm"
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
              <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl p-4 border border-gray-600/40 mb-6">
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search employees..."
                      className="w-full pl-10 pr-4 py-3 text-sm bg-gray-900/60 border border-gray-600/40 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-['Plus_Jakarta_Sans']"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <select
                    className="px-4 py-3 text-sm bg-gray-900/60 border border-gray-600/40 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 font-['Plus_Jakarta_Sans']"
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                  >
                    <option value="all">All Departments</option>
                    {departments.map((dept) => (
                      <option key={dept.name} value={dept.name}>{dept.name}</option>
                    ))}
                  </select>
                  <button className="flex items-center space-x-2 px-4 py-3 border border-gray-600/40 text-gray-300 hover:text-white rounded-lg hover:bg-gray-700/60 text-sm transition-all duration-300 font-['Plus_Jakarta_Sans']">
                    <Filter className="h-4 w-4" />
                    <span>Filters</span>
                  </button>
                </div>
              </div>

              {/* Salary Statistics */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-600/40 hover:border-blue-500/40 transition-all duration-300">
                  <div className="text-center">
                    <LineChart className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white font-['Plus_Jakarta_Sans']">$95,500</div>
                    <div className="text-xs text-gray-400">Median Salary</div>
                  </div>
                </div>
                <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-600/40 hover:border-emerald-500/40 transition-all duration-300">
                  <div className="text-center">
                    <TrendingUp className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white font-['Plus_Jakarta_Sans']">4.2%</div>
                    <div className="text-xs text-gray-400">Annual Increase</div>
                  </div>
                </div>
                <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-600/40 hover:border-purple-500/40 transition-all duration-300">
                  <div className="text-center">
                    <Percent className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white font-['Plus_Jakarta_Sans']">15.3%</div>
                    <div className="text-xs text-gray-400">Bonus Rate</div>
                  </div>
                </div>
                <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-600/40 hover:border-amber-500/40 transition-all duration-300">
                  <div className="text-center">
                    <Globe className="h-8 w-8 text-amber-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white font-['Plus_Jakarta_Sans']">92%</div>
                    <div className="text-xs text-gray-400">Market Rate</div>
                  </div>
                </div>
              </div>

              {/* Salary Ranges Table */}
              <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl border border-gray-600/40 overflow-hidden">
                <div className="p-6 border-b border-gray-600/40">
                  <h3 className="text-lg font-semibold text-white font-['Plus_Jakarta_Sans']">Salary Structure by Level</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-600/40">
                    <thead className="bg-gray-900/60">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider font-['Plus_Jakarta_Sans']">Level</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider font-['Plus_Jakarta_Sans']">Min Salary</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider font-['Plus_Jakarta_Sans']">Max Salary</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider font-['Plus_Jakarta_Sans']">Average</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider font-['Plus_Jakarta_Sans']">Employees</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider font-['Plus_Jakarta_Sans']">Market Rate</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider font-['Plus_Jakarta_Sans']">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800/60 divide-y divide-gray-600/40">
                      {salaryRanges.map((range, index) => (
                        <tr key={index} className="hover:bg-gray-700/40 transition-colors duration-200">
                          <td className="px-6 py-4 text-sm font-medium text-white font-['Plus_Jakarta_Sans']">{range.level}</td>
                          <td className="px-6 py-4 text-sm text-gray-300">${range.min.toLocaleString()}</td>
                          <td className="px-6 py-4 text-sm text-gray-300">${range.max.toLocaleString()}</td>
                          <td className="px-6 py-4 text-sm font-medium text-white">${range.avg.toLocaleString()}</td>
                          <td className="px-6 py-4 text-sm text-gray-300">{range.employees}</td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                              95% competitive
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <Edit3 className="h-4 w-4 text-gray-400 cursor-pointer hover:text-white transition-colors" />
                              <Eye className="h-4 w-4 text-gray-400 cursor-pointer hover:text-white transition-colors" />
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-600/40 hover:border-amber-500/40 transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-8 w-8 text-amber-400" />
                    <div>
                      <div className="text-2xl font-bold text-white font-['Plus_Jakarta_Sans']">{compensationStats.pendingReviews}</div>
                      <div className="text-xs text-gray-400">Pending Reviews</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-600/40 hover:border-emerald-500/40 transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="h-8 w-8 text-emerald-400" />
                    <div>
                      <div className="text-2xl font-bold text-white font-['Plus_Jakarta_Sans']">28</div>
                      <div className="text-xs text-gray-400">Approved This Month</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-600/40 hover:border-blue-500/40 transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-8 w-8 text-blue-400" />
                    <div>
                      <div className="text-2xl font-bold text-white font-['Plus_Jakarta_Sans']">{compensationStats.upcomingAdjustments}</div>
                      <div className="text-xs text-gray-400">Upcoming Adjustments</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-600/40 hover:border-purple-500/40 transition-all duration-300">
                  <div className="flex items-center space-x-3">
                    <TrendingUp className="h-8 w-8 text-purple-400" />
                    <div>
                      <div className="text-2xl font-bold text-white font-['Plus_Jakarta_Sans']">6.8%</div>
                      <div className="text-xs text-gray-400">Avg Increase Rate</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Reviews Table */}
              <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl border border-gray-600/40 overflow-hidden">
                <div className="p-6 border-b border-gray-600/40">
                  <h3 className="text-lg font-semibold text-white font-['Plus_Jakarta_Sans']">Compensation Reviews</h3>
                </div>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-600/40">
                    <thead className="bg-gray-900/60">
                      <tr>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider font-['Plus_Jakarta_Sans']">Employee</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider font-['Plus_Jakarta_Sans']">Current Salary</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider font-['Plus_Jakarta_Sans']">Proposed Salary</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider font-['Plus_Jakarta_Sans']">Increase %</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider font-['Plus_Jakarta_Sans']">Effective Date</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider font-['Plus_Jakarta_Sans']">Status</th>
                        <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider font-['Plus_Jakarta_Sans']">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-gray-800/60 divide-y divide-gray-600/40">
                      {compensationReviews.map((review) => (
                        <tr key={review.id} className="hover:bg-gray-700/40 transition-colors duration-200">
                          <td className="px-6 py-4">
                            <div>
                              <div className="text-sm font-medium text-white font-['Plus_Jakarta_Sans']">{review.employee}</div>
                              <div className="text-xs text-gray-400">{review.position} • {review.department}</div>
                            </div>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">${review.currentSalary.toLocaleString()}</td>
                          <td className="px-6 py-4 text-sm font-medium text-white">${review.proposedSalary.toLocaleString()}</td>
                          <td className="px-6 py-4">
                            <span className="text-sm font-medium text-emerald-400">+{review.increase}%</span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-300">{review.effectiveDate}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(review.status)}`}>
                              {review.status}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-emerald-400 cursor-pointer hover:text-emerald-300 transition-colors" />
                              <AlertTriangle className="h-4 w-4 text-amber-400 cursor-pointer hover:text-amber-300 transition-colors" />
                              <MoreVertical className="h-4 w-4 text-gray-400 cursor-pointer hover:text-white transition-colors" />
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-600/40 hover:border-blue-500/40 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <Shield className="h-8 w-8 text-blue-400" />
                    <CircularProgress percentage={96} size={40} color="blue" />
                  </div>
                  <div className="text-2xl font-bold text-white font-['Plus_Jakarta_Sans']">${compensationStats.benefitsCost.toLocaleString()}</div>
                  <div className="text-xs text-gray-400">Monthly Benefits Cost</div>
                </div>
                <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-600/40 hover:border-emerald-500/40 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <Users className="h-8 w-8 text-emerald-400" />
                    <CircularProgress percentage={89} size={40} color="emerald" />
                  </div>
                  <div className="text-2xl font-bold text-white font-['Plus_Jakarta_Sans']">89%</div>
                  <div className="text-xs text-gray-400">Enrollment Rate</div>
                </div>
                <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-600/40 hover:border-amber-500/40 transition-all duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <Star className="h-8 w-8 text-amber-400" />
                    <CircularProgress percentage={92} size={40} color="amber" />
                  </div>
                  <div className="text-2xl font-bold text-white font-['Plus_Jakarta_Sans']">4.6/5</div>
                  <div className="text-xs text-gray-400">Satisfaction Score</div>
                </div>
              </div>

              {/* Benefits Packages */}
              <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-600/40">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-white font-['Plus_Jakarta_Sans']">Benefits Packages</h3>
                  <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-lg hover:bg-blue-600/30 text-sm font-medium transition-all duration-300 font-['Plus_Jakarta_Sans']">
                    <Plus className="h-4 w-4" />
                    <span>Add Benefit</span>
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {benefitsPackages.map((benefit, index) => (
                    <div key={index} className="p-5 bg-gray-900/60 backdrop-blur-lg rounded-lg border border-gray-600/30 hover:border-blue-500/30 transition-all duration-300">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="text-sm font-medium text-white font-['Plus_Jakarta_Sans']">{benefit.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium border ${
                          benefit.type === 'Medical' ? 'bg-red-500/20 text-red-400 border-red-500/30' :
                          benefit.type === 'Retirement' ? 'bg-blue-500/20 text-blue-400 border-blue-500/30' :
                          benefit.type === 'Insurance' ? 'bg-purple-500/20 text-purple-400 border-purple-500/30' :
                          benefit.type === 'Time Off' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                          'bg-amber-500/20 text-amber-400 border-amber-500/30'
                        }`}>
                          {benefit.type}
                        </span>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Monthly Cost</span>
                          <span className="font-medium text-white">${benefit.cost}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Coverage</span>
                          <span className="font-medium text-white">{benefit.coverage}</span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Enrolled</span>
                          <span className="font-medium text-white">{benefit.employees}</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2 mt-3">
                          <div 
                            className="bg-blue-500 h-2 rounded-full shadow-blue-500/50 shadow-sm"
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
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-600/40 hover:border-blue-500/40 transition-all duration-300">
                  <div className="text-center">
                    <PieChart className="h-8 w-8 text-blue-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white font-['Plus_Jakarta_Sans']">${compensationStats.salaryBudget.toLocaleString()}</div>
                    <div className="text-xs text-gray-400">Annual Budget</div>
                  </div>
                </div>
                <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-600/40 hover:border-emerald-500/40 transition-all duration-300">
                  <div className="text-center">
                    <Target className="h-8 w-8 text-emerald-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white font-['Plus_Jakarta_Sans']">{compensationStats.budgetUtilization}%</div>
                    <div className="text-xs text-gray-400">Budget Used</div>
                  </div>
                </div>
                <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-600/40 hover:border-purple-500/40 transition-all duration-300">
                  <div className="text-center">
                    <DollarSign className="h-8 w-8 text-purple-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white font-['Plus_Jakarta_Sans']">${(compensationStats.salaryBudget * (1 - compensationStats.budgetUtilization/100)).toLocaleString()}</div>
                    <div className="text-xs text-gray-400">Remaining</div>
                  </div>
                </div>
                <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-600/40 hover:border-amber-500/40 transition-all duration-300">
                  <div className="text-center">
                    <Activity className="h-8 w-8 text-amber-400 mx-auto mb-3" />
                    <div className="text-2xl font-bold text-white font-['Plus_Jakarta_Sans']">Q3</div>
                    <div className="text-xs text-gray-400">Current Period</div>
                  </div>
                </div>
              </div>

              {/* Budget by Department */}
              <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-600/40 mb-6">
                <h3 className="text-lg font-semibold text-white mb-6 font-['Plus_Jakarta_Sans']">Budget Allocation by Department</h3>
                <div className="space-y-4">
                  {departments.map((dept, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-gray-900/60 backdrop-blur-lg rounded-lg border border-gray-600/30 hover:border-blue-500/30 transition-all duration-300">
                      <div className="flex items-center space-x-3">
                        <Building2 className="h-5 w-5 text-gray-400" />
                        <div>
                          <div className="text-sm font-medium text-white font-['Plus_Jakarta_Sans']">{dept.name}</div>
                          <div className="text-xs text-gray-400">{dept.employees} employees</div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-sm font-medium text-white font-['Plus_Jakarta_Sans']">${dept.budget.toLocaleString()}</div>
                          <div className="text-xs text-gray-400">{dept.utilized}% used</div>
                        </div>
                        <div className="w-24">
                          <div className="w-full bg-gray-700 rounded-full h-2">
                            <div 
                              className={`h-2 rounded-full transition-all duration-300 shadow-sm ${
                                dept.utilized > 90 ? 'bg-red-500 shadow-red-500/50' : 
                                dept.utilized > 80 ? 'bg-amber-500 shadow-amber-500/50' : 'bg-emerald-500 shadow-emerald-500/50'
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
              <div className="bg-gray-800/80 backdrop-blur-lg rounded-xl p-6 border border-gray-600/40">
                <h3 className="text-lg font-semibold text-white mb-6 font-['Plus_Jakarta_Sans']">Budget Forecast</h3>
                <div className="h-48 bg-gray-900/60 rounded-lg flex items-center justify-center border border-gray-600/30">
                  <div className="text-center">
                    <LineChart className="h-12 w-12 text-gray-500 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Budget trend analysis</p>
                    <p className="text-xs text-gray-500">Chart integration needed</p>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Salary Review Modal */}
      {showSalaryForm && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800/95 backdrop-blur-lg rounded-xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-gray-600/40 relative">
            <CosmicBackground />
            <div className="relative z-10">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-white font-['Plus_Jakarta_Sans']">Create Salary Review</h3>
                <button
                  onClick={() => setShowSalaryForm(false)}
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <form className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 font-['Plus_Jakarta_Sans']">Employee</label>
                    <select className="w-full px-4 py-3 bg-gray-900/60 border border-gray-600/40 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-['Plus_Jakarta_Sans']">
                      <option>Select Employee</option>
                      <option>Sarah Johnson</option>
                      <option>Michael Chen</option>
                      <option>Emily Davis</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 font-['Plus_Jakarta_Sans']">Review Type</label>
                    <select className="w-full px-4 py-3 bg-gray-900/60 border border-gray-600/40 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-['Plus_Jakarta_Sans']">
                      <option>Annual Review</option>
                      <option>Promotion</option>
                      <option>Merit Increase</option>
                      <option>Market Adjustment</option>
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 font-['Plus_Jakarta_Sans']">Current Salary</label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 bg-gray-900/60 border border-gray-600/40 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-['Plus_Jakarta_Sans']"
                      placeholder="85000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 font-['Plus_Jakarta_Sans']">Proposed Salary</label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 bg-gray-900/60 border border-gray-600/40 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-['Plus_Jakarta_Sans']"
                      placeholder="92000"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2 font-['Plus_Jakarta_Sans']">Justification</label>
                  <textarea
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-900/60 border border-gray-600/40 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-['Plus_Jakarta_Sans']"
                    placeholder="Reason for salary adjustment..."
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 font-['Plus_Jakarta_Sans']">Effective Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 bg-gray-900/60 border border-gray-600/40 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-['Plus_Jakarta_Sans']"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2 font-['Plus_Jakarta_Sans']">Reviewer</label>
                    <select className="w-full px-4 py-3 bg-gray-900/60 border border-gray-600/40 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-['Plus_Jakarta_Sans']">
                      <option>Select Reviewer</option>
                      <option>John Smith</option>
                      <option>Lisa Brown</option>
                      <option>Mark Wilson</option>
                    </select>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-4 pt-6">
                  <button
                    type="button"
                    onClick={() => setShowSalaryForm(false)}
                    className="px-6 py-3 border border-gray-600/40 text-gray-300 rounded-lg hover:bg-gray-700/60 text-sm font-medium transition-all duration-300 font-['Plus_Jakarta_Sans']"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex items-center space-x-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium shadow-lg hover:shadow-blue-500/25 transition-all duration-300 font-['Plus_Jakarta_Sans']"
                  >
                    <Send className="h-4 w-4" />
                    <span>Submit Review</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCompensationPage;
