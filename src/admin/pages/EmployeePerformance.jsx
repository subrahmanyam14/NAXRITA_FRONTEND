import { useState, useEffect } from 'react';
import { employees, departments, designations, getDepartmentById } from '../../data/employees';

const EmployeePerformance = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [expandedEmployee, setExpandedEmployee] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: 'overallRating', direction: 'desc' });
  const [activeTab, setActiveTab] = useState('overview');
  
  // Mock performance reviews data
  const [performanceReviews, setPerformanceReviews] = useState(() => {
    return employees.map(emp => ({
      employeeId: emp.id,
      overallRating: (Math.random() * 4 + 1).toFixed(1),
      lastReviewDate: new Date(Date.now() - Math.floor(Math.random() * 1000 * 60 * 60 * 24 * 30 * 6)).toISOString().split('T')[0],
      performanceStatus: ['exceeds', 'meets', 'needs_improvement', 'below'][Math.floor(Math.random() * 4)],
      productivity: Math.floor(Math.random() * 40) + 60,
      attendance: Math.floor(Math.random() * 20) + 80,
      teamwork: Math.floor(Math.random() * 30) + 70,
      communication: Math.floor(Math.random() * 25) + 75,
      goals: [
        { id: 1, name: 'Complete project X', status: Math.random() > 0.5 ? 'completed' : 'in_progress', progress: Math.floor(Math.random() * 100) },
        { id: 2, name: 'Improve technical skills', status: Math.random() > 0.5 ? 'completed' : 'in_progress', progress: Math.floor(Math.random() * 100) },
        { id: 3, name: 'Enhance teamwork', status: Math.random() > 0.3 ? 'completed' : 'in_progress', progress: Math.floor(Math.random() * 100) },
      ],
      monthlyPerformance: [
        { month: 'Jan', score: Math.floor(Math.random() * 40) + 60 },
        { month: 'Feb', score: Math.floor(Math.random() * 40) + 60 },
        { month: 'Mar', score: Math.floor(Math.random() * 40) + 60 },
        { month: 'Apr', score: Math.floor(Math.random() * 40) + 60 },
        { month: 'May', score: Math.floor(Math.random() * 40) + 60 },
        { month: 'Jun', score: Math.floor(Math.random() * 40) + 60 },
      ],
      skills: emp.skills?.map(skillId => ({
        id: skillId,
        name: ['JavaScript', 'React', 'Python', 'Leadership', 'Communication'][Math.floor(Math.random() * 5)],
        rating: Math.floor(Math.random() * 5) + 1,
        target: 5
      })) || [],
      feedback: [
        { id: 1, from: 'John Manager', comment: 'Excellent leadership skills and project delivery', date: '2023-06-15', type: 'positive' },
        { id: 2, from: 'Jane Lead', comment: 'Could improve time management and communication', date: '2023-06-10', type: 'improvement' },
      ]
    }));
  });

  // Get employee data with performance
  const getEmployeesWithPerformance = () => {
    return employees.map(emp => {
      const performance = performanceReviews.find(p => p.employeeId === emp.id) || {};
      return { ...emp, ...performance };
    });
  };

  // Filter and sort employees
  const filteredEmployees = getEmployeesWithPerformance()
    .filter(emp => {
      const matchesSearch = 
        `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesDepartment = 
        selectedDepartment === 'all' || emp.departmentId === selectedDepartment;
      
      const matchesStatus = 
        selectedStatus === 'all' || emp.performanceStatus === selectedStatus;
      
      return matchesSearch && matchesDepartment && matchesStatus;
    });

  // Performance statistics
  const performanceStats = {
    totalEmployees: employees.length,
    avgRating: (performanceReviews.reduce((sum, review) => sum + parseFloat(review.overallRating), 0) / performanceReviews.length).toFixed(1),
    topPerformers: performanceReviews.filter(r => parseFloat(r.overallRating) >= 4.5).length,
    needsImprovement: performanceReviews.filter(r => r.performanceStatus === 'needs_improvement').length,
    completedGoals: performanceReviews.reduce((sum, emp) => sum + emp.goals.filter(g => g.status === 'completed').length, 0),
    totalGoals: performanceReviews.reduce((sum, emp) => sum + emp.goals.length, 0)
  };

  // Chart component for performance trends
  const PerformanceChart = ({ data, title }) => (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-4 border border-blue-100">
      <h4 className="text-xs font-medium text-slate-600 mb-3">{title}</h4>
      <div className="flex items-end space-x-1 h-24">
        {data.map((item, index) => (
          <div key={index} className="flex-1 flex flex-col items-center">
            <div 
              className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-sm transition-all duration-300 hover:from-blue-600 hover:to-blue-500"
              style={{ height: `${(item.score / 100) * 100}%` }}
            />
            <span className="text-xs text-slate-500 mt-1">{item.month}</span>
          </div>
        ))}
      </div>
    </div>
  );

  // Circular progress component
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

  // Status indicator
  const StatusIndicator = ({ status }) => {
    const statusConfig = {
      exceeds: { color: 'emerald', label: 'Exceeds', dot: '●' },
      meets: { color: 'blue', label: 'Meets', dot: '●' },
      needs_improvement: { color: 'amber', label: 'Needs Work', dot: '●' },
      below: { color: 'red', label: 'Below', dot: '●' }
    };
    
    const config = statusConfig[status] || statusConfig.meets;
    
    return (
      <div className={`inline-flex items-center px-2 py-1 rounded-full bg-${config.color}-50 border border-${config.color}-200`}>
        <span className={`text-${config.color}-500 text-xs mr-1`}>{config.dot}</span>
        <span className={`text-${config.color}-700 text-xs font-medium`}>{config.label}</span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-slate-900 mb-1">Performance Dashboard</h1>
              <p className="text-sm text-slate-600">Monitor and analyze employee performance metrics</p>
            </div>
            <div className="mt-3 sm:mt-0 flex space-x-2">
              <button className="px-4 py-2 bg-white text-slate-700 text-xs font-medium border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                Export Data
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white text-xs font-medium rounded-lg hover:bg-blue-700 transition-colors">
                Generate Report
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <nav className="flex space-x-1 bg-white p-1 rounded-xl border border-slate-200">
            {['overview', 'individual', 'analytics'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-xs font-medium rounded-lg transition-colors ${
                  activeTab === tab
                    ? 'bg-blue-100 text-blue-700 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </nav>
        </div>

        {activeTab === 'overview' && (
          <>
            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="text-xs text-slate-500 mb-1">Total Employees</div>
                <div className="text-xl font-bold text-slate-900">{performanceStats.totalEmployees}</div>
                <div className="text-xs text-emerald-600 mt-1">+2 this month</div>
              </div>
              
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="text-xs text-slate-500 mb-1">Avg Rating</div>
                <div className="text-xl font-bold text-slate-900">{performanceStats.avgRating}</div>
                <div className="flex items-center mt-1">
                  <div className="w-12 h-1 bg-blue-200 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-500" style={{ width: `${(performanceStats.avgRating / 5) * 100}%` }} />
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="text-xs text-slate-500 mb-1">Top Performers</div>
                <div className="text-xl font-bold text-emerald-600">{performanceStats.topPerformers}</div>
                <div className="text-xs text-slate-500 mt-1">4.5+ rating</div>
              </div>
              
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="text-xs text-slate-500 mb-1">Need Support</div>
                <div className="text-xl font-bold text-amber-600">{performanceStats.needsImprovement}</div>
                <div className="text-xs text-slate-500 mt-1">Improvement plans</div>
              </div>
              
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="text-xs text-slate-500 mb-1">Goal Progress</div>
                <div className="text-xl font-bold text-blue-600">
                  {Math.round((performanceStats.completedGoals / performanceStats.totalGoals) * 100)}%
                </div>
                <div className="text-xs text-slate-500 mt-1">
                  {performanceStats.completedGoals}/{performanceStats.totalGoals} goals
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-4 border border-slate-200">
                <div className="text-xs text-slate-500 mb-1">Reviews Due</div>
                <div className="text-xl font-bold text-purple-600">{Math.floor(employees.length * 0.25)}</div>
                <div className="text-xs text-slate-500 mt-1">This month</div>
              </div>
            </div>

            {/* Performance Distribution */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
              <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-slate-200">
                <h3 className="text-sm font-semibold text-slate-900 mb-4">Performance Distribution</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Exceeds Expectations', count: performanceReviews.filter(r => r.performanceStatus === 'exceeds').length, color: 'emerald' },
                    { label: 'Meets Expectations', count: performanceReviews.filter(r => r.performanceStatus === 'meets').length, color: 'blue' },
                    { label: 'Needs Improvement', count: performanceReviews.filter(r => r.performanceStatus === 'needs_improvement').length, color: 'amber' },
                    { label: 'Below Expectations', count: performanceReviews.filter(r => r.performanceStatus === 'below').length, color: 'red' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full bg-${item.color}-400`} />
                        <span className="text-xs text-slate-600">{item.label}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full bg-${item.color}-400 transition-all duration-500`}
                            style={{ width: `${(item.count / employees.length) * 100}%` }}
                          />
                        </div>
                        <span className="text-xs font-medium text-slate-900 w-6">{item.count}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-xl p-5 border border-blue-200">
                <h3 className="text-sm font-semibold text-slate-900 mb-4">Department Leaders</h3>
                <div className="space-y-3">
                  {departments.slice(0, 4).map((dept, index) => {
                    const deptEmployees = filteredEmployees.filter(emp => emp.departmentId === dept.id);
                    const avgRating = deptEmployees.length > 0 
                      ? (deptEmployees.reduce((sum, emp) => sum + parseFloat(emp.overallRating || 0), 0) / deptEmployees.length).toFixed(1)
                      : '0.0';
                    
                    return (
                      <div key={dept.id} className="flex items-center justify-between bg-white/60 rounded-lg p-3">
                        <div>
                          <div className="text-xs font-medium text-slate-900">{dept.name}</div>
                          <div className="text-xs text-slate-500">{deptEmployees.length} employees</div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-bold text-blue-700">{avgRating}</div>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`w-2 h-2 rounded-full mr-0.5 ${
                                  i < Math.floor(avgRating) ? 'bg-blue-400' : 'bg-slate-200'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </>
        )}

        {activeTab === 'individual' && (
          <>
            {/* Search and Filters */}
            <div className="bg-white rounded-xl p-4 border border-slate-200 mb-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search employees..."
                    className="w-full px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                >
                  <option value="all">All Departments</option>
                  {departments.map((dept) => (
                    <option key={dept.id} value={dept.id}>{dept.name}</option>
                  ))}
                </select>
                <select
                  className="px-3 py-2 text-xs border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="exceeds">Exceeds</option>
                  <option value="meets">Meets</option>
                  <option value="needs_improvement">Needs Work</option>
                  <option value="below">Below</option>
                </select>
              </div>
            </div>

            {/* Employee Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredEmployees.map((employee) => (
                <div key={employee.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-shadow">
                  {/* Header */}
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-slate-200">
                    <div className="flex items-center space-x-3">
                      <img 
                        className="w-10 h-10 rounded-full border-2 border-white shadow-sm" 
                        src={`https://ui-avatars.com/api/?name=${employee.firstName}+${employee.lastName}&background=random`} 
                        alt={`${employee.firstName} ${employee.lastName}`} 
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-semibold text-slate-900 truncate">
                          {employee.firstName} {employee.lastName}
                        </h3>
                        <p className="text-xs text-slate-500">{employee.employeeId}</p>
                      </div>
                      <StatusIndicator status={employee.performanceStatus} />
                    </div>
                  </div>

                  {/* Performance Metrics */}
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs text-slate-500">Overall Rating</span>
                      <div className="flex items-center space-x-2">
                        <span className="text-lg font-bold text-slate-900">{employee.overallRating}</span>
                        <div className="flex space-x-0.5">
                          {[...Array(5)].map((_, i) => (
                            <div
                              key={i}
                              className={`w-2 h-2 rounded-full ${
                                i < Math.floor(employee.overallRating) ? 'bg-blue-400' : 'bg-slate-200'
                              }`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Performance Areas */}
                    <div className="space-y-2 mb-4">
                      {[
                        { label: 'Productivity', value: employee.productivity },
                        { label: 'Teamwork', value: employee.teamwork },
                        { label: 'Communication', value: employee.communication }
                      ].map((metric, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-xs text-slate-600">{metric.label}</span>
                          <div className="flex items-center space-x-2">
                            <div className="w-16 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-blue-400 transition-all duration-300"
                                style={{ width: `${metric.value}%` }}
                              />
                            </div>
                            <span className="text-xs font-medium text-slate-700 w-8">{metric.value}%</span>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Goals Progress */}
                    <div className="bg-slate-50 rounded-lg p-3 mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-slate-700">Goals Progress</span>
                        <span className="text-xs text-slate-500">
                          {employee.goals?.filter(g => g.status === 'completed').length || 0}/{employee.goals?.length || 0}
                        </span>
                      </div>
                      <div className="space-y-1">
                        {employee.goals?.slice(0, 2).map((goal, index) => (
                          <div key={goal.id} className="flex items-center space-x-2">
                            <div className={`w-2 h-2 rounded-full ${goal.status === 'completed' ? 'bg-emerald-400' : 'bg-amber-400'}`} />
                            <span className="text-xs text-slate-600 truncate flex-1">{goal.name}</span>
                            <span className="text-xs text-slate-500">{goal.progress || 0}%</span>
                          </div>
                        )) || <span className="text-xs text-slate-500">No goals set</span>}
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex space-x-2">
                      <button 
                        className="flex-1 px-3 py-2 text-xs font-medium text-slate-600 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                        onClick={() => toggleEmployeeDetails(employee.id)}
                      >
                        View Details
                      </button>
                      <button className="px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
                        Review
                      </button>
                    </div>
                  </div>

                  {/* Expanded Details */}
                  {expandedEmployee === employee.id && (
                    <div className="border-t border-slate-200 bg-slate-50">
                      <div className="p-4">
                        {/* Performance Chart */}
                        <div className="mb-4">
                          <PerformanceChart 
                            data={employee.monthlyPerformance || []} 
                            title="6-Month Performance Trend"
                          />
                        </div>

                        {/* Skills */}
                        <div className="mb-4">
                          <h4 className="text-xs font-medium text-slate-700 mb-2">Skills Assessment</h4>
                          <div className="grid grid-cols-2 gap-2">
                            {employee.skills?.slice(0, 4).map((skill, index) => (
                              <div key={skill.id} className="bg-white rounded-lg p-2">
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs text-slate-600">{skill.name}</span>
                                  <CircularProgress percentage={(skill.rating / 5) * 100} size={24} />
                                </div>
                              </div>
                            )) || <span className="text-xs text-slate-500">No skills assessed</span>}
                          </div>
                        </div>

                        {/* Recent Feedback */}
                        <div>
                          <h4 className="text-xs font-medium text-slate-700 mb-2">Recent Feedback</h4>
                          <div className="space-y-2">
                            {employee.feedback?.slice(0, 2).map((feedback, index) => (
                              <div key={feedback.id} className={`p-2 rounded-lg border-l-2 ${
                                feedback.type === 'positive' ? 'bg-emerald-50 border-emerald-400' : 'bg-amber-50 border-amber-400'
                              }`}>
                                <p className="text-xs text-slate-700 mb-1">"{feedback.comment}"</p>
                                <p className="text-xs text-slate-500">— {feedback.from}</p>
                              </div>
                            )) || <span className="text-xs text-slate-500">No recent feedback</span>}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Performance Trends */}
            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Department Performance Comparison</h3>
              <div className="space-y-4">
                {departments.map((dept) => {
                  const deptEmployees = filteredEmployees.filter(emp => emp.departmentId === dept.id);
                  const avgRating = deptEmployees.length > 0 
                    ? (deptEmployees.reduce((sum, emp) => sum + parseFloat(emp.overallRating || 0), 0) / deptEmployees.length)
                    : 0;
                  
                  return (
                    <div key={dept.id} className="flex items-center space-x-4">
                      <div className="w-20 text-xs text-slate-600 truncate">{dept.name}</div>
                      <div className="flex-1 bg-slate-100 rounded-full h-2">
                        <div 
                          className="h-full bg-blue-500 rounded-full transition-all duration-500"
                          style={{ width: `${(avgRating / 5) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs font-medium text-slate-900 w-8">{avgRating.toFixed(1)}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Goal Completion Rates */}
            <div className="bg-white rounded-xl p-5 border border-slate-200">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Goal Completion Rates</h3>
              <div className="grid grid-cols-2 gap-4">
                {departments.slice(0, 4).map((dept) => {
                  const deptEmployees = filteredEmployees.filter(emp => emp.departmentId === dept.id);
                  const totalGoals = deptEmployees.reduce((sum, emp) => sum + (emp.goals?.length || 0), 0);
                  const completedGoals = deptEmployees.reduce((sum, emp) => sum + (emp.goals?.filter(g => g.status === 'completed').length || 0), 0);
                  const completionRate = totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

                  return (
                    <div key={dept.id} className="text-center">
                      <CircularProgress percentage={completionRate} size={60} />
                      <div className="mt-2">
                        <div className="text-xs font-medium text-slate-900">{dept.name}</div>
                        <div className="text-xs text-slate-500">{completedGoals}/{totalGoals} goals</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Performance Distribution Over Time */}
            <div className="lg:col-span-2 bg-white rounded-xl p-5 border border-slate-200">
              <h3 className="text-sm font-semibold text-slate-900 mb-4">Performance Metrics Overview</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Avg Productivity', value: Math.round(filteredEmployees.reduce((sum, emp) => sum + (emp.productivity || 0), 0) / filteredEmployees.length), color: 'blue' },
                  { label: 'Avg Teamwork', value: Math.round(filteredEmployees.reduce((sum, emp) => sum + (emp.teamwork || 0), 0) / filteredEmployees.length), color: 'emerald' },
                  { label: 'Avg Communication', value: Math.round(filteredEmployees.reduce((sum, emp) => sum + (emp.communication || 0), 0) / filteredEmployees.length), color: 'purple' },
                  { label: 'Avg Attendance', value: Math.round(filteredEmployees.reduce((sum, emp) => sum + (emp.attendance || 0), 0) / filteredEmployees.length), color: 'amber' }
                ].map((metric, index) => (
                  <div key={index} className={`bg-gradient-to-br from-${metric.color}-50 to-${metric.color}-100 rounded-xl p-4 border border-${metric.color}-200`}>
                    <div className="text-center">
                      <CircularProgress percentage={metric.value} size={50} color={metric.color} />
                      <div className="mt-2">
                        <div className="text-xs font-medium text-slate-900">{metric.label}</div>
                        <div className="text-xs text-slate-500">{metric.value}% average</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EmployeePerformance;
