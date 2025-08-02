import React, { useState, useEffect } from 'react';
import { 
  BookOpen, CheckCircle, AlertCircle, Clock, Users, Plus,
  Download, Search, Edit, Eye, TrendingUp, Target, Award,
  BarChart3, PieChart, LineChart, Activity, Zap, Calendar,
  Star, ArrowUp, ArrowDown, Minus, Brain, Trophy, Gauge
} from 'lucide-react';

const PerformanceDashboard = () => {
  const [view, setView] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [timeRange, setTimeRange] = useState('6months');

  // Mock performance data
  const performanceData = {
    overall: {
      score: 94,
      trend: 'up',
      change: 8
    },
    metrics: {
      productivity: 96,
      quality: 92,
      collaboration: 89,
      innovation: 91,
      leadership: 87,
      learning: 94
    },
    goals: {
      completed: 24,
      total: 28,
      progress: 86
    },
    projects: {
      completed: 15,
      inProgress: 4,
      delayed: 1,
      successRate: 94
    },
    skills: [
      { name: 'React Development', level: 95, growth: 5 },
      { name: 'Team Leadership', level: 88, growth: 12 },
      { name: 'Project Management', level: 82, growth: 8 },
      { name: 'Communication', level: 91, growth: 3 },
      { name: 'Problem Solving', level: 89, growth: 7 },
      { name: 'Data Analysis', level: 76, growth: 15 }
    ],
    monthlyTrends: [
      { month: 'Jan', score: 85, projects: 2, goals: 4 },
      { month: 'Feb', score: 88, projects: 3, goals: 5 },
      { month: 'Mar', score: 91, projects: 2, goals: 3 },
      { month: 'Apr', score: 93, projects: 4, goals: 6 },
      { month: 'May', score: 96, projects: 3, goals: 4 },
      { month: 'Jun', score: 94, projects: 1, goals: 6 }
    ],
    learning: [
      {
        id: 1,
        title: 'Advanced React Patterns',
        category: 'Technical',
        progress: 85,
        dueDate: '2025-04-15',
        status: 'in-progress',
        estimatedHours: 12,
        completedHours: 10
      },
      {
        id: 2,
        title: 'Leadership Excellence',
        category: 'Leadership',
        progress: 100,
        completedDate: '2025-03-20',
        status: 'completed',
        rating: 5
      },
      {
        id: 3,
        title: 'Data Analytics Fundamentals',
        category: 'Analytics',
        progress: 60,
        dueDate: '2025-05-01',
        status: 'in-progress',
        estimatedHours: 16,
        completedHours: 9
      }
    ]
  };

  // Progress components
  const CircularProgress = ({ value, size = 60, strokeWidth = 6, color = "#3b82f6", showLabel = true }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (value / 100) * circumference;

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#e5e7eb"
            strokeWidth={strokeWidth}
            fill="none"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={color}
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-700 ease-out"
          />
        </svg>
        {showLabel && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-normal text-gray-700">{value}%</span>
          </div>
        )}
      </div>
    );
  };

  const LinearProgress = ({ value, color = "blue", size = "md", label = "" }) => {
    const sizeClasses = {
      sm: "h-1.5",
      md: "h-2",
      lg: "h-3"
    };
    
    return (
      <div className="w-full">
        {label && (
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-600 font-normal">{label}</span>
            <span className="text-xs text-gray-500">{value}%</span>
          </div>
        )}
        <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]}`}>
          <div 
            className={`bg-${color}-500 ${sizeClasses[size]} rounded-full transition-all duration-500 ease-out`}
            style={{ width: `${value}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const MetricCard = ({ icon: Icon, title, value, unit, trend, change, color = "blue" }) => (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-2 bg-${color}-50 rounded-lg`}>
          <Icon className={`h-5 w-5 text-${color}-600`} />
        </div>
        <div className="flex items-center space-x-1">
          {trend === 'up' ? (
            <ArrowUp className="h-3 w-3 text-green-500" />
          ) : trend === 'down' ? (
            <ArrowDown className="h-3 w-3 text-red-500" />
          ) : (
            <Minus className="h-3 w-3 text-gray-400" />
          )}
          <span className={`text-xs font-normal ${
            trend === 'up' ? 'text-green-600' : trend === 'down' ? 'text-red-600' : 'text-gray-500'
          }`}>
            {change > 0 ? '+' : ''}{change}%
          </span>
        </div>
      </div>
      <div className="space-y-1">
        <p className="text-2xl font-light text-gray-900">{value}<span className="text-sm text-gray-500 font-normal">{unit}</span></p>
        <p className="text-xs text-gray-600 font-normal">{title}</p>
      </div>
    </div>
  );

  const SkillProgressCard = ({ skill }) => (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-normal text-gray-900">{skill.name}</h4>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-500">{skill.level}%</span>
          <div className={`flex items-center space-x-1 px-2 py-1 rounded-full ${
            skill.growth > 10 ? 'bg-green-50' : skill.growth > 5 ? 'bg-blue-50' : 'bg-gray-50'
          }`}>
            <ArrowUp className={`h-3 w-3 ${
              skill.growth > 10 ? 'text-green-600' : skill.growth > 5 ? 'text-blue-600' : 'text-gray-600'
            }`} />
            <span className={`text-xs font-normal ${
              skill.growth > 10 ? 'text-green-600' : skill.growth > 5 ? 'text-blue-600' : 'text-gray-600'
            }`}>
              +{skill.growth}%
            </span>
          </div>
        </div>
      </div>
      <LinearProgress value={skill.level} color={skill.growth > 10 ? "green" : skill.growth > 5 ? "blue" : "gray"} />
    </div>
  );

  const TrendChart = ({ data }) => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-normal text-gray-900">Performance Trends</h3>
        <select className="text-xs border border-gray-300 rounded px-2 py-1 font-normal">
          <option>Last 6 months</option>
          <option>Last year</option>
        </select>
      </div>
      <div className="grid grid-cols-6 gap-2 h-32">
        {data.map((item, index) => (
          <div key={index} className="flex flex-col items-center space-y-2">
            <div className="flex-1 flex flex-col justify-end w-full">
              <div 
                className="bg-gradient-to-t from-blue-500 to-blue-300 rounded-sm transition-all duration-700 ease-out"
                style={{ height: `${(item.score / 100) * 100}%` }}
              ></div>
            </div>
            <div className="text-center">
              <p className="text-xs text-gray-600 font-normal">{item.month}</p>
              <p className="text-xs text-blue-600 font-normal">{item.score}%</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
        
        {/* Header Section */}
        <div className="mb-8 lg:mb-12">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-2xl lg:text-3xl font-light text-gray-900">Performance Dashboard</h1>
              <p className="mt-2 text-sm lg:text-base text-gray-600 font-normal">
                Track your performance metrics, goals, and professional development.
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button className="inline-flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm text-sm font-normal text-gray-700 hover:bg-gray-50 transition-colors">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </button>
              <button className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm text-sm font-normal hover:bg-blue-700 transition-colors">
                <Target className="h-4 w-4 mr-2" />
                Set Goals
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8 lg:mb-12 border-b border-gray-200">
          <nav className="-mb-px flex space-x-6 lg:space-x-12">
            {['overview', 'skills', 'learning', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setView(tab)}
                className={`py-2 px-1 border-b-2 font-normal text-sm transition-colors ${
                  view === tab
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {view === 'overview' && (
          <div className="space-y-6 lg:space-y-10">
            
            {/* Overall Performance Section */}
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-4 lg:gap-8">
              <div className="lg:col-span-1">
                <div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-gray-100 text-center">
                  <div className="flex justify-center mb-4">
                    <CircularProgress 
                      value={performanceData.overall.score} 
                      size={80} 
                      strokeWidth={8}
                      color="#10b981"
                    />
                  </div>
                  <h3 className="text-lg font-light text-gray-900 mb-1">Overall Performance</h3>
                  <div className="flex items-center justify-center space-x-2">
                    <ArrowUp className="h-4 w-4 text-green-500" />
                    <span className="text-sm text-green-600 font-normal">+{performanceData.overall.change}% this quarter</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-3">
                <div className="grid grid-cols-2 lg:grid-cols-2 gap-4 lg:gap-6">
                  <MetricCard 
                    icon={Zap} 
                    title="Productivity" 
                    value={performanceData.metrics.productivity} 
                    unit="%" 
                    trend="up" 
                    change={4}
                    color="blue"
                  />
                  <MetricCard 
                    icon={Award} 
                    title="Quality Score" 
                    value={performanceData.metrics.quality} 
                    unit="%" 
                    trend="up" 
                    change={2}
                    color="purple"
                  />
                  <MetricCard 
                    icon={Users} 
                    title="Collaboration" 
                    value={performanceData.metrics.collaboration} 
                    unit="%" 
                    trend="down" 
                    change={-1}
                    color="green"
                  />
                  <MetricCard 
                    icon={Brain} 
                    title="Innovation" 
                    value={performanceData.metrics.innovation} 
                    unit="%" 
                    trend="up" 
                    change={6}
                    color="amber"
                  />
                  <MetricCard 
                    icon={Trophy} 
                    title="Leadership" 
                    value={performanceData.metrics.leadership} 
                    unit="%" 
                    trend="up" 
                    change={8}
                    color="red"
                  />
                  <MetricCard 
                    icon={BookOpen} 
                    title="Learning" 
                    value={performanceData.metrics.learning} 
                    unit="%" 
                    trend="up" 
                    change={3}
                    color="indigo"
                  />
                </div>
              </div>
            </div>

            {/* Goals and Projects Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
              
              {/* Goals Progress */}
              <div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-base lg:text-lg font-normal text-gray-900 flex items-center">
                    <Target className="h-5 w-5 mr-3 text-blue-500" />
                    Goal Progress
                  </h3>
                  <button className="text-xs text-blue-600 hover:text-blue-700 font-normal">View All</button>
                </div>
                
                <div className="text-center mb-6">
                  <CircularProgress 
                    value={performanceData.goals.progress} 
                    size={100} 
                    strokeWidth={10}
                    color="#3b82f6"
                  />
                  <div className="mt-4">
                    <p className="text-2xl font-light text-gray-900">
                      {performanceData.goals.completed}/{performanceData.goals.total}
                    </p>
                    <p className="text-xs text-gray-600 font-normal">Goals Completed</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600 font-normal">Quarterly Objectives</span>
                    <LinearProgress value={92} color="green" size="sm" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600 font-normal">Development Goals</span>
                    <LinearProgress value={78} color="blue" size="sm" />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600 font-normal">Learning Targets</span>
                    <LinearProgress value={88} color="purple" size="sm" />
                  </div>
                </div>
              </div>

              {/* Project Status */}
              <div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-gray-100">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-base lg:text-lg font-normal text-gray-900 flex items-center">
                    <BarChart3 className="h-5 w-5 mr-3 text-purple-500" />
                    Project Overview
                  </h3>
                  <button className="text-xs text-blue-600 hover:text-blue-700 font-normal">View Details</button>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                    <CircularProgress 
                      value={100} 
                      size={50} 
                      strokeWidth={5}
                      color="#10b981"
                    />
                    <p className="text-xs text-gray-600 font-normal mt-2">Completed</p>
                    <p className="text-sm text-green-600 font-normal">{performanceData.projects.completed}</p>
                  </div>
                  <div className="text-center">
                    <CircularProgress 
                      value={75} 
                      size={50} 
                      strokeWidth={5}
                      color="#3b82f6"
                    />
                    <p className="text-xs text-gray-600 font-normal mt-2">In Progress</p>
                    <p className="text-sm text-blue-600 font-normal">{performanceData.projects.inProgress}</p>
                  </div>
                  <div className="text-center">
                    <CircularProgress 
                      value={25} 
                      size={50} 
                      strokeWidth={5}
                      color="#f59e0b"
                    />
                    <p className="text-xs text-gray-600 font-normal mt-2">Delayed</p>
                    <p className="text-sm text-amber-600 font-normal">{performanceData.projects.delayed}</p>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600 font-normal">Success Rate</span>
                    <div className="flex items-center space-x-2">
                      <LinearProgress value={performanceData.projects.successRate} color="green" size="sm" />
                      <span className="text-xs text-green-600 font-normal">{performanceData.projects.successRate}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600 font-normal">On-Time Delivery</span>
                    <div className="flex items-center space-x-2">
                      <LinearProgress value={87} color="blue" size="sm" />
                      <span className="text-xs text-blue-600 font-normal">87%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Performance Trends */}
            <div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-gray-100">
              <TrendChart data={performanceData.monthlyTrends} />
            </div>
          </div>
        )}

        {view === 'skills' && (
          <div className="space-y-6 lg:space-y-10">
            
            {/* Skills Overview */}
            <div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base lg:text-lg font-normal text-gray-900 flex items-center">
                  <Gauge className="h-5 w-5 mr-3 text-green-500" />
                  Skills Development
                </h3>
                <button className="text-xs text-blue-600 hover:text-blue-700 font-normal">Add New Skill</button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-8">
                {performanceData.skills.map((skill, index) => (
                  <SkillProgressCard key={index} skill={skill} />
                ))}
              </div>
            </div>

            {/* Skill Categories */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h4 className="text-sm font-normal text-gray-900 mb-4 flex items-center">
                  <Brain className="h-4 w-4 mr-2 text-blue-500" />
                  Technical Skills
                </h4>
                <div className="space-y-3">
                  <LinearProgress value={95} label="React Development" color="blue" />
                  <LinearProgress value={87} label="JavaScript" color="blue" />
                  <LinearProgress value={76} label="Data Analysis" color="blue" />
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h4 className="text-sm font-normal text-gray-900 mb-4 flex items-center">
                  <Users className="h-4 w-4 mr-2 text-green-500" />
                  Soft Skills
                </h4>
                <div className="space-y-3">
                  <LinearProgress value={91} label="Communication" color="green" />
                  <LinearProgress value={88} label="Team Leadership" color="green" />
                  <LinearProgress value={89} label="Problem Solving" color="green" />
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h4 className="text-sm font-normal text-gray-900 mb-4 flex items-center">
                  <Trophy className="h-4 w-4 mr-2 text-purple-500" />
                  Management
                </h4>
                <div className="space-y-3">
                  <LinearProgress value={82} label="Project Management" color="purple" />
                  <LinearProgress value={78} label="Strategic Planning" color="purple" />
                  <LinearProgress value={85} label="Decision Making" color="purple" />
                </div>
              </div>
            </div>
          </div>
        )}

        {view === 'learning' && (
          <div className="space-y-6 lg:space-y-10">
            
            {/* Learning Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8">
              <MetricCard 
                icon={BookOpen} 
                title="Courses Completed" 
                value="12" 
                unit="" 
                trend="up" 
                change={20}
                color="blue"
              />
              <MetricCard 
                icon={Clock} 
                title="Learning Hours" 
                value="48" 
                unit="h" 
                trend="up" 
                change={15}
                color="green"
              />
              <MetricCard 
                icon={Award} 
                title="Certifications" 
                value="3" 
                unit="" 
                trend="up" 
                change={50}
                color="purple"
              />
              <MetricCard 
                icon={Star} 
                title="Avg Rating" 
                value="4.8" 
                unit="/5" 
                trend="up" 
                change={2}
                color="amber"
              />
            </div>

            {/* Learning Progress */}
            <div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base lg:text-lg font-normal text-gray-900 flex items-center">
                  <Activity className="h-5 w-5 mr-3 text-blue-500" />
                  Current Learning Path
                </h3>
                <button className="text-xs text-blue-600 hover:text-blue-700 font-normal">Browse Courses</button>
              </div>

              <div className="space-y-4 lg:space-y-6">
                {performanceData.learning.map((course) => (
                  <div key={course.id} className="border border-gray-200 rounded-xl p-4 lg:p-6 hover:shadow-md transition-shadow">
                    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-sm font-normal text-gray-900">{course.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-normal ${
                            course.status === 'completed' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            {course.status === 'completed' ? 'Completed' : 'In Progress'}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 font-normal mb-3">Category: {course.category}</p>
                        
                        <div className="space-y-2">
                          <LinearProgress 
                            value={course.progress} 
                            color={course.status === 'completed' ? 'green' : 'blue'} 
                            label={`Progress: ${course.progress}%`}
                          />
                          
                          {course.estimatedHours && (
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span>{course.completedHours || 0}/{course.estimatedHours} hours</span>
                              {course.dueDate && <span>Due: {course.dueDate}</span>}
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center space-x-3">
                        {course.status === 'completed' && course.rating && (
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < course.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                        )}
                        
                        <button className="inline-flex items-center px-3 py-1.5 border border-gray-300 shadow-sm text-xs font-normal rounded text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </button>
                        
                        {course.status !== 'completed' && (
                          <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-normal rounded shadow-sm text-white bg-blue-600 hover:bg-blue-700 transition-colors">
                            Continue
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {view === 'analytics' && (
          <div className="space-y-6 lg:space-y-10">
            
            {/* Analytics Overview */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
              <div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-gray-100">
                <h3 className="text-base font-normal text-gray-900 mb-6 flex items-center">
                  <LineChart className="h-5 w-5 mr-3 text-green-500" />
                  Performance Analytics
                </h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center">
                      <CircularProgress value={94} size={60} strokeWidth={6} color="#10b981" />
                      <p className="text-xs text-gray-600 font-normal mt-2">Overall Score</p>
                    </div>
                    <div className="text-center">
                      <CircularProgress value={88} size={60} strokeWidth={6} color="#3b82f6" />
                      <p className="text-xs text-gray-600 font-normal mt-2">Team Avg</p>
                    </div>
                    <div className="text-center">
                      <CircularProgress value={91} size={60} strokeWidth={6} color="#8b5cf6" />
                      <p className="text-xs text-gray-600 font-normal mt-2">Dept Avg</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600 font-normal">Performance Percentile</span>
                      <div className="flex items-center space-x-2">
                        <LinearProgress value={92} color="green" size="sm" />
                        <span className="text-xs text-green-600 font-normal">Top 8%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600 font-normal">Goal Achievement Rate</span>
                      <div className="flex items-center space-x-2">
                        <LinearProgress value={86} color="blue" size="sm" />
                        <span className="text-xs text-blue-600 font-normal">86%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-600 font-normal">Skill Growth Rate</span>
                      <div className="flex items-center space-x-2">
                        <LinearProgress value={78} color="purple" size="sm" />
                        <span className="text-xs text-purple-600 font-normal">+12%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-gray-100">
                <h3 className="text-base font-normal text-gray-900 mb-6 flex items-center">
                  <PieChart className="h-5 w-5 mr-3 text-purple-500" />
                  Time Distribution
                </h3>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="relative inline-flex items-center justify-center">
                        <CircularProgress value={65} size={80} strokeWidth={8} color="#3b82f6" showLabel={false} />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="text-center">
                            <p className="text-lg font-light text-blue-600">65%</p>
                            <p className="text-xs text-gray-600">Development</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3 text-xs">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-gray-600 font-normal">Development</span>
                        </div>
                        <span className="text-gray-900 font-normal">65%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                          <span className="text-gray-600 font-normal">Meetings</span>
                        </div>
                        <span className="text-gray-900 font-normal">20%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                          <span className="text-gray-600 font-normal">Learning</span>
                        </div>
                        <span className="text-gray-900 font-normal">10%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                          <span className="text-gray-600 font-normal">Other</span>
                        </div>
                        <span className="text-gray-900 font-normal">5%</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-gray-600 font-normal">Weekly Average</span>
                      <span className="text-gray-900 font-normal">42 hours</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Detailed Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              
              {/* Performance Breakdown */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h4 className="text-sm font-normal text-gray-900 mb-4 flex items-center">
                  <Gauge className="h-4 w-4 mr-2 text-blue-500" />
                  Performance Breakdown
                </h4>
                <div className="space-y-4">
                  {Object.entries(performanceData.metrics).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600 font-normal capitalize">{key}</span>
                        <span className="text-xs text-gray-900 font-normal">{value}%</span>
                      </div>
                      <LinearProgress value={value} color={value >= 90 ? "green" : value >= 80 ? "blue" : "amber"} size="sm" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Activity Heatmap */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h4 className="text-sm font-normal text-gray-900 mb-4 flex items-center">
                  <Activity className="h-4 w-4 mr-2 text-green-500" />
                  Activity Heatmap
                </h4>
                <div className="space-y-3">
                  <div className="grid grid-cols-7 gap-1">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                      <div key={day} className="text-center">
                        <p className="text-xs text-gray-600 font-normal mb-1">{day.slice(0, 1)}</p>
                        <div className="grid grid-rows-4 gap-1">
                          {[...Array(4)].map((_, i) => (
                            <div
                              key={i}
                              className={`h-2 rounded-sm ${
                                Math.random() > 0.3 
                                  ? Math.random() > 0.7 
                                    ? 'bg-green-500' 
                                    : 'bg-green-300'
                                  : 'bg-gray-200'
                              }`}
                            ></div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <span className="font-normal">Less active</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-gray-200 rounded-sm"></div>
                      <div className="w-2 h-2 bg-green-300 rounded-sm"></div>
                      <div className="w-2 h-2 bg-green-500 rounded-sm"></div>
                    </div>
                    <span className="font-normal">More active</span>
                  </div>
                </div>
              </div>

              {/* Achievement Stats */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                <h4 className="text-sm font-normal text-gray-900 mb-4 flex items-center">
                  <Trophy className="h-4 w-4 mr-2 text-amber-500" />
                  Achievements
                </h4>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 bg-amber-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <Trophy className="h-5 w-5 text-amber-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-normal text-amber-900">Top Performer</p>
                      <p className="text-xs text-amber-700">Q1 2025</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <Award className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-normal text-blue-900">Innovation Award</p>
                      <p className="text-xs text-blue-700">March 2025</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                    <div className="flex-shrink-0">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-normal text-green-900">Goal Crusher</p>
                      <p className="text-xs text-green-700">15 goals completed</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Monthly Performance Chart */}
            <div className="bg-white rounded-xl p-6 lg:p-8 shadow-sm border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-base font-normal text-gray-900 flex items-center">
                  <BarChart3 className="h-5 w-5 mr-3 text-purple-500" />
                  Monthly Performance Comparison
                </h3>
                <select className="text-xs border border-gray-300 rounded px-3 py-1 font-normal">
                  <option>Last 6 months</option>
                  <option>Last year</option>
                  <option>All time</option>
                </select>
              </div>
              
              <div className="grid grid-cols-6 gap-3 lg:gap-6 h-48">
                {performanceData.monthlyTrends.map((month, index) => (
                  <div key={index} className="flex flex-col items-center space-y-3">
                    <div className="flex-1 flex flex-col justify-end w-full space-y-1">
                      <div 
                        className="bg-gradient-to-t from-blue-500 to-blue-300 rounded-sm transition-all duration-700 ease-out"
                        style={{ height: `${(month.score / 100) * 80}%` }}
                        title={`Performance: ${month.score}%`}
                      ></div>
                      <div 
                        className="bg-gradient-to-t from-green-500 to-green-300 rounded-sm transition-all duration-700 ease-out"
                        style={{ height: `${(month.projects / 5) * 40}%` }}
                        title={`Projects: ${month.projects}`}
                      ></div>
                      <div 
                        className="bg-gradient-to-t from-purple-500 to-purple-300 rounded-sm transition-all duration-700 ease-out"
                        style={{ height: `${(month.goals / 8) * 30}%` }}
                        title={`Goals: ${month.goals}`}
                      ></div>
                    </div>
                    <div className="text-center">
                      <p className="text-xs text-gray-600 font-normal">{month.month}</p>
                      <p className="text-xs text-blue-600 font-normal">{month.score}%</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center justify-center space-x-6 mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-sm"></div>
                  <span className="text-xs text-gray-600 font-normal">Performance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-sm"></div>
                  <span className="text-xs text-gray-600 font-normal">Projects</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-purple-500 rounded-sm"></div>
                  <span className="text-xs text-gray-600 font-normal">Goals</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PerformanceDashboard;