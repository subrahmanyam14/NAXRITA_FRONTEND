import {
    AlertCircle,
    Building2,
    Calendar,
    GraduationCap,
    MapPin,
    Plus,
    Search,
    Star,
    Target,
    TrendingUp,
    User
} from 'lucide-react';
import { useState } from 'react';

const EmployeeCareerDashboard = () => {
  const [activeTab, setActiveTab] = useState('opportunities');
  const [searchTerm, setSearchTerm] = useState('');

  // Employee profile data
  const employeeProfile = {
    name: 'Sarah Johnson',
    currentRole: 'Senior Marketing Specialist',
    department: 'Marketing',
    employeeId: 'EMP-2024-1547',
    joinDate: 'March 2022',
    location: 'New York, NY',
    manager: 'David Chen'
  };

  // Career progress data
  const careerProgress = {
    currentLevel: 'Level 4',
    nextLevel: 'Level 5 - Marketing Manager',
    progressPercentage: 65,
    skillsCompleted: 8,
    skillsRequired: 12,
    performanceRating: 4.2
  };

  // Internal job opportunities
  const internalOpportunities = [
    {
      id: 1,
      title: 'Marketing Manager',
      department: 'Marketing',
      location: 'New York, NY',
      level: 'Level 5',
      type: 'Promotion',
      match: 85,
      requirements: ['3+ years marketing experience', 'Team leadership', 'Campaign management'],
      openings: 1,
      deadline: '2025-08-15',
      status: 'Open',
      hiringManager: 'Jennifer Walsh'
    },
    {
      id: 2,
      title: 'Product Marketing Lead',
      department: 'Product',
      location: 'San Francisco, CA',
      level: 'Level 5',
      type: 'Lateral Move',
      match: 72,
      requirements: ['Product marketing experience', 'Go-to-market strategy', 'Analytics'],
      openings: 2,
      deadline: '2025-08-20',
      status: 'Open',
      hiringManager: 'Michael Torres'
    },
    {
      id: 3,
      title: 'Digital Marketing Specialist',
      department: 'Marketing',
      location: 'Remote',
      level: 'Level 4',
      type: 'Lateral Move',
      match: 90,
      requirements: ['Digital marketing', 'SEO/SEM', 'Social media'],
      openings: 1,
      deadline: '2025-08-10',
      status: 'Closing Soon',
      hiringManager: 'Lisa Park'
    },
    {
      id: 4,
      title: 'Brand Strategy Manager',
      department: 'Marketing',
      location: 'Chicago, IL',
      level: 'Level 5',
      type: 'Promotion',
      match: 78,
      requirements: ['Brand management', 'Strategic thinking', 'Creative direction'],
      openings: 1,
      deadline: '2025-08-25',
      status: 'Open',
      hiringManager: 'Robert Kim'
    }
  ];

  // Learning and development opportunities
  const learningOpportunities = [
    {
      id: 1,
      title: 'Leadership Essentials Program',
      type: 'Internal Training',
      duration: '6 weeks',
      format: 'Virtual',
      nextStart: '2025-08-15',
      spots: 12,
      enrolled: 8,
      category: 'Leadership'
    },
    {
      id: 2,
      title: 'Advanced Analytics Certification',
      type: 'External Course',
      duration: '3 months',
      format: 'Online',
      nextStart: '2025-08-10',
      spots: 'Unlimited',
      cost: '$599 (Company Sponsored)',
      category: 'Technical'
    },
    {
      id: 3,
      title: 'Cross-Functional Project Management',
      type: 'Workshop',
      duration: '2 days',
      format: 'In-Person',
      nextStart: '2025-08-12',
      spots: 20,
      enrolled: 15,
      category: 'Project Management'
    },
    {
      id: 4,
      title: 'Executive MBA Program',
      type: 'Degree Program',
      duration: '18 months',
      format: 'Hybrid',
      nextStart: '2025-09-01',
      cost: '$85,000 (50% Company Sponsored)',
      category: 'Education'
    }
  ];

  // Career goals and milestones
  const careerGoals = [
    {
      id: 1,
      goal: 'Complete Leadership Training',
      deadline: '2025-09-30',
      progress: 40,
      status: 'In Progress',
      priority: 'High'
    },
    {
      id: 2,
      goal: 'Obtain Marketing Analytics Certification',
      deadline: '2025-10-15',
      progress: 75,
      status: 'On Track',
      priority: 'Medium'
    },
    {
      id: 3,
      goal: 'Lead Cross-Department Project',
      deadline: '2025-12-01',
      progress: 20,
      status: 'Planning',
      priority: 'High'
    },
    {
      id: 4,
      goal: 'Mentor Junior Team Member',
      deadline: '2025-11-30',
      progress: 60,
      status: 'In Progress',
      priority: 'Medium'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Open': return 'bg-green-100 text-green-800';
      case 'Closing Soon': return 'bg-red-100 text-red-800';
      case 'In Progress': return 'bg-blue-100 text-blue-800';
      case 'On Track': return 'bg-green-100 text-green-800';
      case 'Planning': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600';
      case 'Medium': return 'text-yellow-600';
      case 'Low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Career Dashboard</h1>
              <p className="text-xs text-gray-600 mt-1">Track your career progress and explore opportunities</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-xs font-medium text-gray-900">{employeeProfile.name}</p>
                <p className="text-xs text-gray-600">{employeeProfile.currentRole}</p>
              </div>
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Career Progress Overview */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-8">
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Career Progress</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-600">Current Level</span>
                    <span className="text-xs font-medium text-gray-900">{careerProgress.currentLevel}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${careerProgress.progressPercentage}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Progress to {careerProgress.nextLevel}</p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-600">Skills Development</span>
                    <span className="text-xs font-medium text-gray-900">
                      {careerProgress.skillsCompleted}/{careerProgress.skillsRequired}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full" 
                      style={{ width: `${(careerProgress.skillsCompleted / careerProgress.skillsRequired) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Skills completed this year</p>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs text-gray-600">Performance Rating</span>
                    <div className="flex items-center">
                      <Star className="w-3 h-3 text-yellow-500 mr-1" />
                      <span className="text-xs font-medium text-gray-900">{careerProgress.performanceRating}/5.0</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-yellow-500 h-2 rounded-full" 
                      style={{ width: `${(careerProgress.performanceRating / 5) * 100}%` }}
                    ></div>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">Latest annual review</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h3 className="text-sm font-semibold text-gray-900 mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Time in Role</span>
                <span className="text-xs font-medium">2.5 years</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Applications</span>
                <span className="text-xs font-medium">3 Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Courses</span>
                <span className="text-xs font-medium">2 Enrolled</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-600">Goals</span>
                <span className="text-xs font-medium">4 Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white rounded-lg shadow-sm mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {[
                { id: 'opportunities', label: 'Internal Opportunities', icon: <TrendingUp className="w-4 h-4" /> },
                { id: 'learning', label: 'Learning & Development', icon: <GraduationCap className="w-4 h-4" /> },
                { id: 'goals', label: 'Career Goals', icon: <Target className="w-4 h-4" /> }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center py-4 px-1 border-b-2 text-xs font-medium ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.icon}
                  <span className="ml-2">{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'opportunities' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Internal Job Opportunities</h3>
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-3 h-3" />
                      <input
                        type="text"
                        placeholder="Search opportunities..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-xs"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {internalOpportunities.map(job => (
                    <div key={job.id} className="border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-1">{job.title}</h4>
                          <div className="flex items-center text-xs text-gray-600 mb-2">
                            <Building2 className="w-3 h-3 mr-1" />
                            <span className="mr-4">{job.department}</span>
                            <MapPin className="w-3 h-3 mr-1" />
                            <span>{job.location}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(job.status)}`}>
                            {job.status}
                          </span>
                          <div className="text-xs text-gray-600 mt-1">{job.match}% match</div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-xs">
                          <span className="text-gray-600">Level: </span>
                          <span className="font-medium">{job.level}</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-gray-600">Type: </span>
                          <span className="font-medium">{job.type}</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-gray-600">Openings: </span>
                          <span className="font-medium">{job.openings}</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-gray-600">Deadline: </span>
                          <span className="font-medium">{new Date(job.deadline).toLocaleDateString()}</span>
                        </div>
                      </div>

                      <div className="mb-4">
                        <p className="text-xs text-gray-600 mb-2">Key Requirements:</p>
                        <div className="flex flex-wrap gap-2">
                          {job.requirements.map((req, index) => (
                            <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                              {req}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-600">Hiring Manager: {job.hiringManager}</span>
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-xs font-medium">
                          Apply Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'learning' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Learning & Development</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-medium flex items-center">
                    <Plus className="w-3 h-3 mr-1" />
                    Request Training
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {learningOpportunities.map(course => (
                    <div key={course.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-sm font-semibold text-gray-900 mb-1">{course.title}</h4>
                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            {course.category}
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="text-xs">
                          <span className="text-gray-600">Type: </span>
                          <span className="font-medium">{course.type}</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-gray-600">Duration: </span>
                          <span className="font-medium">{course.duration}</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-gray-600">Format: </span>
                          <span className="font-medium">{course.format}</span>
                        </div>
                        <div className="text-xs">
                          <span className="text-gray-600">Next Start: </span>
                          <span className="font-medium">{new Date(course.nextStart).toLocaleDateString()}</span>
                        </div>
                      </div>

                      {course.enrolled && (
                        <div className="mb-4">
                          <div className="flex justify-between text-xs mb-1">
                            <span className="text-gray-600">Enrollment</span>
                            <span className="font-medium">{course.enrolled}/{course.spots}</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full" 
                              style={{ width: `${(course.enrolled / course.spots) * 100}%` }}
                            ></div>
                          </div>
                        </div>
                      )}

                      {course.cost && (
                        <p className="text-xs text-gray-600 mb-4">Cost: {course.cost}</p>
                      )}

                      <button className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors text-xs font-medium">
                        Enroll Now
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'goals' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-semibold text-gray-900">Career Goals & Milestones</h3>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-xs font-medium flex items-center">
                    <Plus className="w-3 h-3 mr-1" />
                    Add Goal
                  </button>
                </div>

                <div className="space-y-6">
                  {careerGoals.map(goal => (
                    <div key={goal.id} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex-1">
                          <h4 className="text-sm font-semibold text-gray-900 mb-2">{goal.goal}</h4>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center text-xs text-gray-600">
                              <Calendar className="w-3 h-3 mr-1" />
                              Due: {new Date(goal.deadline).toLocaleDateString()}
                            </div>
                            <div className="flex items-center text-xs">
                              <AlertCircle className={`w-3 h-3 mr-1 ${getPriorityColor(goal.priority)}`} />
                              <span className={getPriorityColor(goal.priority)}>{goal.priority} Priority</span>
                            </div>
                          </div>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(goal.status)}`}>
                          {goal.status}
                        </span>
                      </div>

                      <div className="mb-4">
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{goal.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${goal.progress}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center">
                        <button className="text-xs text-blue-600 hover:text-blue-800">
                          View Details
                        </button>
                        <button className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded hover:bg-gray-200">
                          Update Progress
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeCareerDashboard;