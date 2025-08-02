import React, { useState, useEffect } from 'react';
import { 
  User, MapPin, Phone, Mail, Briefcase, Calendar, 
  Edit3, Upload, Download, Trash2, Eye, Plus,
  Home, Settings, LogOut, FileText, Star, TrendingUp,
  Award, Target, Clock, Users, Activity, Building2,
  BarChart3, PieChart, LineChart, Zap, CheckCircle
} from 'lucide-react';

const EmployeeProfile = () => {
  const [activeTab, setActiveTab] = useState('summary');
  const [profileData, setProfileData] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editMode, setEditMode] = useState(false);

  // Dummy data fallback
  const dummyProfileData = {
    id: 'EMP001',
    name: 'John Anderson',
    email: 'john.anderson@company.com',
    phone: '+91 96524 26808',
    address: '123 Business Street, Tech City, TC 12345',
    location: 'Hyderabad, HDC2A',
    profilePic: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
    joinDate: '2022-03-15',
    role: 'Packaged App Development Team Lead',
    department: 'Engineering',
    manager: 'Jyoti Ranjan Panda',
    peoplelead: 'Anurag Pramod Joshi',
    skills: ['Agile Project Delivery', 'Application Architecture', 'ALM', 'AJAX', 'Configuration Management', 'Release Management'],
    jobDescription: 'Responsible for developing and maintaining web applications using modern technologies.',
    contractType: 'Full-time Permanent',
    salary: '$85,000',
    workingUnder: 'Development Team Alpha',
    projects: ['E-commerce Platform', 'Mobile App Backend', 'Analytics Dashboard'],
    birthday: 'Monday, 11 August',
    supervisoryOrg: 'Accenture (Julie Sweet) >> CRTS-EMEAICEGPRDS101 (Jyoti Ranjan Panda)',
    businessTitle: 'Packaged App Development Team Lead',
    jobProfile: 'Packaged App Development Team Lead',
    jobFamily: 'Software Engineering > Packaged Application Development',
    managementLevel: '9-Team Lead/Consultant',
    timeType: 'Full time',
    performance: {
      overall: 94,
      technical: 96,
      leadership: 92,
      communication: 90
    },
    goals: {
      completed: 8,
      total: 10,
      progress: 80
    },
    productivity: {
      efficiency: 94,
      weeklyHours: 42,
      projectsDelivered: 15
    }
  };

  useEffect(() => {
    fetchProfileData();
    fetchDocuments();
  }, []);

  const fetchProfileData = async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProfileData(dummyProfileData);
    } catch (error) {
      setProfileData(dummyProfileData);
    } finally {
      setLoading(false);
    }
  };

  const fetchDocuments = async () => {
    try {
      // Simulate API call
    } catch (error) {
      // Handle error
    }
  };

  // Progress Bar Component
  const ProgressBar = ({ value, max = 100, color = "blue", size = "md" }) => {
    const percentage = (value / max) * 100;
    const sizeClasses = {
      sm: "h-1.5",
      md: "h-2",
      lg: "h-3"
    };
    
    return (
      <div className="w-full">
        <div className={`w-full bg-gray-200 rounded-full ${sizeClasses[size]}`}>
          <div 
            className={`bg-${color}-500 ${sizeClasses[size]} rounded-full transition-all duration-500 ease-out`}
            style={{ width: `${percentage}%` }}
          ></div>
        </div>
      </div>
    );
  };

  // Circular Progress Component
  const CircularProgress = ({ value, max = 100, size = 60, strokeWidth = 4, color = "#3b82f6" }) => {
    const percentage = (value / max) * 100;
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const offset = circumference - (percentage / 100) * circumference;

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
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-xs font-normal text-gray-700">{value}%</span>
        </div>
      </div>
    );
  };

  // Rating Stars Component
  const StarRating = ({ rating, maxRating = 5 }) => {
    return (
      <div className="flex items-center space-x-0.5">
        {[...Array(maxRating)].map((_, index) => (
          <Star
            key={index}
            className={`h-3 w-3 ${
              index < rating 
                ? 'text-yellow-400 fill-current' 
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const SummaryPage = () => (
    <div className="bg-gray-50 min-h-screen p-6">
      <div className="max-w-8xl mx-auto">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 rounded-2xl p-8 mb-8 shadow-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="h-16 w-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-md">
                <User className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-light text-white mb-1">{profileData.name}</h1>
                <p className="text-xs text-slate-300 font-normal">{profileData.role}</p>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-right">
                <p className="text-xs text-slate-400 mb-1">Employee ID</p>
                <p className="text-xs text-white font-normal">{profileData.id}</p>
              </div>
              <button className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-200">
                <Edit3 className="h-5 w-5 text-white" />
              </button>
            </div>
          </div>
        </div>

        {/* Performance Dashboard Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <TrendingUp className="h-5 w-5 text-green-500" />
              <span className="text-xs text-gray-500">Overall</span>
            </div>
            <div className="flex items-center justify-center mb-2">
              <CircularProgress value={profileData.performance.overall} color="#10b981" size={50} />
            </div>
            <p className="text-xs text-center text-gray-600 font-normal">Performance</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <Target className="h-5 w-5 text-blue-500" />
              <span className="text-xs text-gray-500">Goals</span>
            </div>
            <div className="text-center mb-2">
              <p className="text-lg font-normal text-blue-600">{profileData.goals.completed}/{profileData.goals.total}</p>
              <ProgressBar value={profileData.goals.progress} color="blue" size="sm" />
            </div>
            <p className="text-xs text-center text-gray-600 font-normal">Completed</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <Zap className="h-5 w-5 text-purple-500" />
              <span className="text-xs text-gray-500">Efficiency</span>
            </div>
            <div className="text-center mb-2">
              <p className="text-lg font-normal text-purple-600">{profileData.productivity.efficiency}%</p>
              <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                <div className="bg-purple-500 h-1.5 rounded-full" style={{width: `${profileData.productivity.efficiency}%`}}></div>
              </div>
            </div>
            <p className="text-xs text-center text-gray-600 font-normal">Productivity</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <Users className="h-5 w-5 text-amber-500" />
              <span className="text-xs text-gray-500">Team</span>
            </div>
            <div className="text-center mb-2">
              <p className="text-lg font-normal text-amber-600">12</p>
              <div className="flex justify-center mt-2">
                <StarRating rating={5} />
              </div>
            </div>
            <p className="text-xs text-center text-gray-600 font-normal">Members</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <CheckCircle className="h-5 w-5 text-green-500" />
              <span className="text-xs text-gray-500">Projects</span>
            </div>
            <div className="text-center mb-2">
              <p className="text-lg font-normal text-green-600">{profileData.productivity.projectsDelivered}</p>
              <div className="flex justify-center items-center mt-2">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <div key={i} className="w-1.5 h-4 bg-green-500 rounded-sm"></div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs text-center text-gray-600 font-normal">Delivered</p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-8">
          {/* Left Column - Personal & Skills */}
          <div className="space-y-6">
            {/* Personal Details */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-sm font-normal text-gray-900 mb-4 flex items-center">
                <User className="h-4 w-4 mr-2 text-blue-500" />
                Personal Details
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Birthday</span>
                  <span className="text-xs text-gray-900 font-normal">{profileData.birthday}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Phone</span>
                  <span className="text-xs text-blue-600 cursor-pointer hover:text-blue-700 font-normal">{profileData.phone}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Location</span>
                  <span className="text-xs text-blue-600 cursor-pointer hover:text-blue-700 font-normal">{profileData.location}</span>
                </div>
              </div>
            </div>

            {/* Skills with Visual Progress */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-sm font-normal text-gray-900 mb-4 flex items-center">
                <Target className="h-4 w-4 mr-2 text-green-500" />
                Skills & Expertise
              </h3>
              <div className="space-y-3">
                {profileData.skills.slice(0, 4).map((skill, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-700 font-normal">{skill}</span>
                      <span className="text-xs text-gray-500">{85 + (idx * 3)}%</span>
                    </div>
                    <ProgressBar value={85 + (idx * 3)} color="green" size="sm" />
                  </div>
                ))}
              </div>
              <button className="text-xs text-blue-600 mt-4 hover:text-blue-700 font-normal">View All Skills →</button>
            </div>

            {/* Performance Breakdown */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-sm font-normal text-gray-900 mb-4 flex items-center">
                <BarChart3 className="h-4 w-4 mr-2 text-purple-500" />
                Performance Metrics
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Technical Skills</span>
                  <div className="flex items-center space-x-2">
                    <CircularProgress value={profileData.performance.technical} size={30} strokeWidth={3} color="#8b5cf6" />
                    <span className="text-xs text-gray-900 font-normal">{profileData.performance.technical}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Leadership</span>
                  <div className="flex items-center space-x-2">
                    <CircularProgress value={profileData.performance.leadership} size={30} strokeWidth={3} color="#f59e0b" />
                    <span className="text-xs text-gray-900 font-normal">{profileData.performance.leadership}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Communication</span>
                  <div className="flex items-center space-x-2">
                    <CircularProgress value={profileData.performance.communication} size={30} strokeWidth={3} color="#10b981" />
                    <span className="text-xs text-gray-900 font-normal">{profileData.performance.communication}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center Columns - Job Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Information */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-sm font-normal text-gray-900 mb-4 flex items-center">
                <Briefcase className="h-4 w-4 mr-2 text-blue-500" />
                Job Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Position</span>
                    <span className="text-xs text-gray-900 font-normal">{profileData.role}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Department</span>
                    <span className="text-xs text-gray-900 font-normal">{profileData.department}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Level</span>
                    <span className="text-xs text-blue-600 cursor-pointer hover:text-blue-700 font-normal">Team Lead</span>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Type</span>
                    <span className="text-xs text-gray-900 font-normal">{profileData.timeType}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Join Date</span>
                    <span className="text-xs text-gray-900 font-normal">March 2022</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">Experience</span>
                    <span className="text-xs text-green-600 font-normal">2y 5m</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Organizational Structure */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-sm font-normal text-gray-900 mb-4 flex items-center">
                <Building2 className="h-4 w-4 mr-2 text-purple-500" />
                Organizational Structure
              </h3>
              <div className="space-y-4">
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                  <div className="text-xs text-blue-900 font-normal mb-1">Accenture (Julie Sweet)</div>
                  <div className="text-xs text-blue-700">└─ CRTS-EMEAICEGPRDS101</div>
                </div>
                <div className="ml-4 space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="h-8 w-8 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
                      <span className="text-purple-700 text-xs font-normal">JP</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-900 font-normal">{profileData.manager}</p>
                      <p className="text-xs text-gray-600">Direct Manager</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3 ml-2">
                    <div className="h-8 w-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                      <span className="text-blue-700 text-xs font-normal">AJ</span>
                    </div>
                    <div>
                      <p className="text-xs text-gray-900 font-normal">{profileData.peoplelead}</p>
                      <p className="text-xs text-gray-600">People Lead</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Work Analytics with Charts */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-sm font-normal text-gray-900 mb-4 flex items-center">
                <LineChart className="h-4 w-4 mr-2 text-indigo-500" />
                Work Analytics
              </h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <CircularProgress value={profileData.productivity.efficiency} size={40} strokeWidth={3} color="#6366f1" />
                  </div>
                  <p className="text-xs text-gray-600">Efficiency</p>
                  <p className="text-xs text-indigo-600 font-normal">{profileData.productivity.efficiency}%</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="relative">
                      <Clock className="h-10 w-10 text-amber-500" />
                      <span className="absolute -bottom-1 -right-1 bg-amber-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-normal">
                        {profileData.productivity.weeklyHours}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">Avg Hours</p>
                  <p className="text-xs text-amber-600 font-normal">{profileData.productivity.weeklyHours}h/week</p>
                </div>
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <div className="relative">
                      <CheckCircle className="h-10 w-10 text-green-500" />
                      <span className="absolute -bottom-1 -right-1 bg-green-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center font-normal">
                        {profileData.productivity.projectsDelivered}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">Projects</p>
                  <p className="text-xs text-green-600 font-normal">{profileData.productivity.projectsDelivered} delivered</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Activities & Team */}
          <div className="space-y-6">
            {/* Team Information with Visual Elements */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-sm font-normal text-gray-900 mb-4 flex items-center">
                <Users className="h-4 w-4 mr-2 text-green-500" />
                Team Overview
              </h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Team Size</span>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {[...Array(12)].map((_, i) => (
                        <div key={i} className="w-1 h-4 bg-green-500 rounded-sm"></div>
                      ))}
                    </div>
                    <span className="text-xs text-gray-900 font-normal">12</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Direct Reports</span>
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      {[...Array(4)].map((_, i) => (
                        <div key={i} className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      ))}
                    </div>
                    <span className="text-xs text-gray-900 font-normal">4</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-600">Active Projects</span>
                  <div className="flex items-center space-x-2">
                    <ProgressBar value={75} color="blue" size="sm" />
                    <span className="text-xs text-blue-600 font-normal">3</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Learning Progress */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-sm font-normal text-gray-900 mb-4 flex items-center">
                <Award className="h-4 w-4 mr-2 text-amber-500" />
                Learning Progress
              </h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <CircularProgress value={85} size={50} strokeWidth={4} color="#f59e0b" />
                  </div>
                  <p className="text-xs text-gray-600">Training Completion</p>
                  <p className="text-xs text-amber-600 font-normal">42 hours YTD</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">AWS Certification</span>
                    <StarRating rating={5} />
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-600">React Training</span>
                    <span className="text-xs text-green-600 font-normal">✓ Complete</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-sm font-normal text-gray-900 mb-4 flex items-center">
                <Activity className="h-4 w-4 mr-2 text-red-500" />
                Recent Activities
              </h3>
              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-blue-50 rounded-lg">
                  <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-900 font-normal mb-1">React Training Completed</p>
                    <p className="text-xs text-gray-600">2 days ago</p>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-3 w-3 text-green-500" />
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-900 font-normal mb-1">Project v2.0 Delivered</p>
                    <p className="text-xs text-gray-600">1 week ago</p>
                  </div>
                  <div className="flex items-center">
                    <TrendingUp className="h-3 w-3 text-green-500" />
                  </div>
                </div>
                <div className="flex items-start space-x-3 p-3 bg-purple-50 rounded-lg">
                  <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-1.5 flex-shrink-0"></div>
                  <div className="flex-1">
                    <p className="text-xs text-gray-900 font-normal mb-1">Leadership Workshop</p>
                    <p className="text-xs text-gray-600">2 weeks ago</p>
                  </div>
                  <div className="flex items-center">
                    <Award className="h-3 w-3 text-purple-500" />
                  </div>
                </div>
              </div>
              <button className="text-xs text-blue-600 mt-3 hover:text-blue-700 font-normal">View All Activities →</button>
            </div>

            {/* Goal Progress Visualization */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-sm font-normal text-gray-900 mb-4 flex items-center">
                <Target className="h-4 w-4 mr-2 text-blue-500" />
                Goal Progress
              </h3>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    <CircularProgress value={profileData.goals.progress} size={60} strokeWidth={5} color="#3b82f6" />
                  </div>
                  <p className="text-xs text-gray-600">Annual Goals</p>
                  <p className="text-xs text-blue-600 font-normal">{profileData.goals.completed} of {profileData.goals.total} completed</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Q4 Objectives</span>
                    <div className="flex items-center space-x-1">
                      <ProgressBar value={90} color="green" size="sm" />
                      <span className="text-xs text-green-600 font-normal">90%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Development Goals</span>
                    <div className="flex items-center space-x-1">
                      <ProgressBar value={75} color="blue" size="sm" />
                      <span className="text-xs text-blue-600 font-normal">75%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-600">Leadership Tasks</span>
                    <div className="flex items-center space-x-1">
                      <ProgressBar value={85} color="purple" size="sm" />
                      <span className="text-xs text-purple-600 font-normal">85%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section - Additional Analytics */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Performance Trends */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-normal text-gray-900 mb-4 flex items-center">
              <LineChart className="h-4 w-4 mr-2 text-green-500" />
              Performance Trends
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-4 gap-3">
                <div className="text-center">
                  <div className="h-12 bg-gradient-to-t from-blue-500 to-blue-300 rounded-sm mb-1" style={{height: '48px'}}></div>
                  <p className="text-xs text-gray-600">Q1</p>
                  <p className="text-xs text-blue-600 font-normal">92%</p>
                </div>
                <div className="text-center">
                  <div className="h-16 bg-gradient-to-t from-green-500 to-green-300 rounded-sm mb-1"></div>
                  <p className="text-xs text-gray-600">Q2</p>
                  <p className="text-xs text-green-600 font-normal">96%</p>
                </div>
                <div className="text-center">
                  <div className="h-14 bg-gradient-to-t from-purple-500 to-purple-300 rounded-sm mb-1" style={{height: '56px'}}></div>
                  <p className="text-xs text-gray-600">Q3</p>
                  <p className="text-xs text-purple-600 font-normal">94%</p>
                </div>
                <div className="text-center">
                  <div className="h-12 bg-gradient-to-t from-amber-500 to-amber-300 rounded-sm mb-1" style={{height: '48px'}}></div>
                  <p className="text-xs text-gray-600">Q4</p>
                  <p className="text-xs text-amber-600 font-normal">92%</p>
                </div>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                <span className="text-xs text-gray-600">Average Performance</span>
                <div className="flex items-center space-x-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                  <span className="text-xs text-gray-900 font-normal">Exceeds Expectations</span>
                </div>
              </div>
            </div>
          </div>

          {/* Project Status Dashboard */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h3 className="text-sm font-normal text-gray-900 mb-4 flex items-center">
              <PieChart className="h-4 w-4 mr-2 text-purple-500" />
              Project Status Overview
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="space-y-2">
                  <div className="flex justify-center">
                    <CircularProgress value={100} size={40} strokeWidth={4} color="#10b981" />
                  </div>
                  <p className="text-xs text-gray-600">Completed</p>
                  <p className="text-xs text-green-600 font-normal">12 projects</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-center">
                    <CircularProgress value={75} size={40} strokeWidth={4} color="#3b82f6" />
                  </div>
                  <p className="text-xs text-gray-600">In Progress</p>
                  <p className="text-xs text-blue-600 font-normal">3 projects</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-center">
                    <CircularProgress value={25} size={40} strokeWidth={4} color="#f59e0b" />
                  </div>
                  <p className="text-xs text-gray-600">Planning</p>
                  <p className="text-xs text-amber-600 font-normal">2 projects</p>
                </div>
              </div>
              <div className="space-y-2 pt-2 border-t border-gray-100">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">Success Rate</span>
                  <div className="flex items-center space-x-2">
                    <ProgressBar value={96} color="green" size="sm" />
                    <span className="text-xs text-green-600 font-normal">96%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-600">On-Time Delivery</span>
                  <div className="flex items-center space-x-2">
                    <ProgressBar value={88} color="blue" size="sm" />
                    <span className="text-xs text-blue-600 font-normal">88%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return <SummaryPage />;
};

export default EmployeeProfile;