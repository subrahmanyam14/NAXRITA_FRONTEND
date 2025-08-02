import { useState } from 'react';
import { 
  CheckCircle, 
  Clock, 
  Plus, 
  Trash2, 
  Edit3,
  Filter,
  ChevronDown,
  ChevronUp,
  Check,
  X,
  Calendar,
  User,
  AlertCircle,
  Star,
  Target,
  TrendingUp
} from 'lucide-react';

// Task status configuration
const taskStatus = {
  'not_started': { label: 'Not Started', color: 'bg-gray-100 text-gray-700' },
  'in_progress': { label: 'In Progress', color: 'bg-blue-100 text-blue-700' },
  'completed': { label: 'Completed', color: 'bg-green-100 text-green-700' },
  'on_hold': { label: 'On Hold', color: 'bg-yellow-100 text-yellow-700' },
  'cancelled': { label: 'Cancelled', color: 'bg-red-100 text-red-700' }
};

const priorityColors = {
  'high': 'bg-red-100 text-red-700',
  'medium': 'bg-yellow-100 text-yellow-700',
  'low': 'bg-green-100 text-green-700'
};

// Mock tasks data
const initialTasks = [
  {
    id: 1,
    title: 'Complete project proposal',
    description: 'Draft and submit the quarterly project proposal document',
    dueDate: '2025-08-15',
    priority: 'high',
    status: 'in_progress',
    category: 'Work',
    createdAt: '2025-07-20',
    completedAt: null,
    assignedBy: 'John Manager'
  },
  {
    id: 2,
    title: 'Team meeting preparation',
    description: 'Prepare presentation for the team meeting',
    dueDate: '2025-08-28',
    priority: 'medium',
    status: 'not_started',
    category: 'Meeting',
    createdAt: '2025-07-22',
    completedAt: null,
    assignedBy: 'Sarah Lead'
  },
  {
    id: 3,
    title: 'Code review',
    description: 'Review pull requests from the development team',
    dueDate: '2025-08-25',
    priority: 'high',
    status: 'in_progress',
    category: 'Development',
    createdAt: '2025-07-20',
    completedAt: null,
    assignedBy: 'Tech Lead'
  },
  {
    id: 4,
    title: 'Update documentation',
    description: 'Update API documentation for the new features',
    dueDate: '2025-08-30',
    priority: 'medium',
    status: 'not_started',
    category: 'Documentation',
    createdAt: '2025-07-18',
    completedAt: null,
    assignedBy: 'Documentation Team'
  },
  {
    id: 5,
    title: 'Performance self-review',
    description: 'Complete self-assessment for the quarterly review',
    dueDate: '2025-08-01',
    priority: 'high',
    status: 'completed',
    category: 'HR',
    createdAt: '2025-07-15',
    completedAt: '2025-07-30',
    assignedBy: 'HR Department'
  }
];

const MyTasks = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddTask, setShowAddTask] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({
    status: 'all',
    priority: 'all',
    category: 'all',
    dueDate: 'all'
  });

  // New task form state
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    dueDate: '',
    priority: 'medium',
    status: 'not_started',
    category: 'Work'
  });

  // Filter tasks based on selected filters
  const filteredTasks = tasks.filter(task => {
    const matchesStatus = filters.status === 'all' || task.status === filters.status;
    const matchesPriority = filters.priority === 'all' || task.priority === filters.priority;
    const matchesCategory = filters.category === 'all' || task.category === filters.category;
    
    // Filter by due date
    let matchesDueDate = true;
    const today = new Date().toISOString().split('T')[0];
    if (filters.dueDate === 'today') {
      matchesDueDate = task.dueDate === today;
    } else if (filters.dueDate === 'upcoming') {
      matchesDueDate = task.dueDate > today && task.status !== 'completed';
    } else if (filters.dueDate === 'overdue') {
      matchesDueDate = task.dueDate < today && task.status !== 'completed';
    }
    
    return matchesStatus && matchesPriority && matchesCategory && matchesDueDate;
  });

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (editingTask) {
      setEditingTask({
        ...editingTask,
        [name]: value
      });
    } else {
      setNewTask({
        ...newTask,
        [name]: value
      });
    }
  };

  // Add a new task
  const addTask = () => {
    const taskToAdd = {
      ...newTask,
      id: Math.max(0, ...tasks.map(t => t.id)) + 1,
      createdAt: new Date().toISOString().split('T')[0],
      completedAt: null,
      assignedBy: 'Self'
    };
    
    setTasks([...tasks, taskToAdd]);
    setNewTask({
      title: '',
      description: '',
      dueDate: '',
      priority: 'medium',
      status: 'not_started',
      category: 'Work'
    });
    setShowAddTask(false);
  };

  // Update an existing task
  const updateTask = () => {
    setTasks(tasks.map(task => 
      task.id === editingTask.id ? { ...editingTask } : task
    ));
    setEditingTask(null);
  };

  // Start editing a task
  const startEditing = (task) => {
    setEditingTask({ ...task });
  };

  // Cancel editing
  const cancelEditing = () => {
    setEditingTask(null);
  };

  // Handle task status change
  const toggleTaskStatus = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const newStatus = task.status === 'completed' ? 'not_started' : 'completed';
        return {
          ...task,
          status: newStatus,
          completedAt: newStatus === 'completed' ? new Date().toISOString().split('T')[0] : null
        };
      }
      return task;
    }));
  };

  // Handle task deletion
  const deleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== taskId));
      if (editingTask?.id === taskId) {
        setEditingTask(null);
      }
    }
  };

  // Get tasks count by status
  const getTaskCountByStatus = (status) => {
    return tasks.filter(task => task.status === status).length;
  };

  // Get unique categories from tasks
  const getUniqueCategories = () => {
    const categories = new Set(tasks.map(task => task.category));
    return Array.from(categories);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-6 sm:space-y-0">
            <div>
              <h1 className="text-3xl font-normal text-gray-900 mb-3">My Tasks</h1>
              <p className="text-sm text-gray-600 font-normal">
                Manage your tasks efficiently and track your progress with ease
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-200 rounded-lg shadow-sm text-xs font-normal text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="w-3 h-3 mr-2" />
                {showFilters ? 'Hide Filters' : 'Show Filters'}
              </button>
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-xs font-normal text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                onClick={() => setShowAddTask(true)}
              >
                <Plus className="w-3 h-3 mr-2" />
                Add Task
              </button>
            </div>
          </div>
        </div>

        {/* Stats Dashboard */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
          {/* Total Tasks */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-normal mb-1">Total Tasks</p>
                <p className="text-2xl font-normal text-gray-900">{tasks.length}</p>
              </div>
            </div>
          </div>

          {/* In Progress */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg">
                <Clock className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-normal mb-1">In Progress</p>
                <p className="text-2xl font-normal text-gray-900">
                  {getTaskCountByStatus('in_progress')}
                </p>
              </div>
            </div>
          </div>

          {/* Completed */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-normal mb-1">Completed</p>
                <p className="text-2xl font-normal text-gray-900">
                  {getTaskCountByStatus('completed')}
                </p>
              </div>
            </div>
          </div>

          {/* Not Started */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-gray-50 to-gray-100 rounded-lg">
                <Star className="w-5 h-5 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-normal mb-1">Not Started</p>
                <p className="text-2xl font-normal text-gray-900">
                  {getTaskCountByStatus('not_started')}
                </p>
              </div>
            </div>
          </div>

          {/* Overdue */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow duration-200">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-gradient-to-br from-red-50 to-red-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500 font-normal mb-1">Overdue</p>
                <p className="text-2xl font-normal text-gray-900">
                  {tasks.filter(task => {
                    const today = new Date().toISOString().split('T')[0];
                    return task.dueDate < today && task.status !== 'completed';
                  }).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 mb-10 shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Status filter */}
              <div>
                <label className="block text-xs font-normal text-gray-700 mb-3">Status</label>
                <select
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-normal"
                  value={filters.status}
                  onChange={(e) => setFilters({...filters, status: e.target.value})}
                >
                  <option value="all">All Statuses</option>
                  {Object.entries(taskStatus).map(([key, { label }]) => (
                    <option key={key} value={key}>{label}</option>
                  ))}
                </select>
              </div>

              {/* Priority filter */}
              <div>
                <label className="block text-xs font-normal text-gray-700 mb-3">Priority</label>
                <select
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-normal"
                  value={filters.priority}
                  onChange={(e) => setFilters({...filters, priority: e.target.value})}
                >
                  <option value="all">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </select>
              </div>

              {/* Category filter */}
              <div>
                <label className="block text-xs font-normal text-gray-700 mb-3">Category</label>
                <select
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-normal"
                  value={filters.category}
                  onChange={(e) => setFilters({...filters, category: e.target.value})}
                >
                  <option value="all">All Categories</option>
                  {getUniqueCategories().map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>

              {/* Due date filter */}
              <div>
                <label className="block text-xs font-normal text-gray-700 mb-3">Due Date</label>
                <select
                  className="w-full px-3 py-2 text-xs border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-normal"
                  value={filters.dueDate}
                  onChange={(e) => setFilters({...filters, dueDate: e.target.value})}
                >
                  <option value="all">All Dates</option>
                  <option value="today">Today</option>
                  <option value="upcoming">Upcoming</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
            </div>
            
            <div className="mt-6">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-200 shadow-sm text-xs font-normal rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                onClick={() => setFilters({
                  status: 'all',
                  priority: 'all',
                  category: 'all',
                  dueDate: 'all'
                })}
              >
                Reset Filters
              </button>
            </div>
          </div>
        )}

        {/* Tasks Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-normal text-gray-900">Task List</h2>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-normal bg-blue-100 text-blue-800">
              {filteredTasks.length} tasks
            </span>
          </div>
          <div className="mt-4 sm:mt-0">
            <div className="flex items-center space-x-2 text-xs text-gray-500">
              <TrendingUp className="w-3 h-3" />
              <span className="font-normal">
                {Math.round((getTaskCountByStatus('completed') / tasks.length) * 100)}% Complete
              </span>
            </div>
          </div>
        </div>

        {/* Task List */}
        {filteredTasks.length > 0 ? (
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="divide-y divide-gray-100">
              {filteredTasks.map((task) => (
                <div key={task.id} className="p-6 hover:bg-gray-50 transition-colors duration-150">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className="mt-1">
                        <button
                          type="button"
                          className={`w-5 h-5 rounded-full flex items-center justify-center transition-colors duration-200 ${
                            task.status === 'completed' 
                              ? 'bg-green-100 text-green-600 border-2 border-green-200' 
                              : 'border-2 border-gray-300 hover:border-blue-400'
                          }`}
                          onClick={() => toggleTaskStatus(task.id)}
                        >
                          {task.status === 'completed' && <Check className="w-3 h-3" />}
                        </button>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className={`text-sm font-normal ${
                            task.status === 'completed' 
                              ? 'text-gray-500 line-through' 
                              : 'text-gray-900'
                          }`}>
                            {task.title}
                          </h3>
                          <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-normal ${priorityColors[task.priority]}`}>
                            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                          </span>
                          <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-normal ${taskStatus[task.status]?.color}`}>
                            {taskStatus[task.status]?.label}
                          </span>
                        </div>
                        
                        <p className="text-xs text-gray-600 font-normal mb-3 leading-relaxed">
                          {task.description}
                        </p>
                        
                        <div className="flex items-center space-x-6 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-3 h-3" />
                            <span className="font-normal">
                              Due {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="w-3 h-3" />
                            <span className="font-normal">
                              {task.assignedBy}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                            <span className="font-normal">{task.category}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3 ml-4">
                      <button
                        type="button"
                        className="text-gray-400 hover:text-blue-600 transition-colors duration-200"
                        onClick={() => startEditing(task)}
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-red-600 transition-colors duration-200"
                        onClick={() => deleteTask(task.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 rounded-full w-16 h-16 mx-auto mb-6 flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-base font-normal text-gray-900 mb-2">No tasks found</h3>
            <p className="text-xs text-gray-500 font-normal mb-8 max-w-sm mx-auto">
              {Object.values(filters).some(f => f !== 'all') 
                ? 'No tasks match your current filters. Try adjusting your search criteria.' 
                : 'Start being productive by creating your first task.'}
            </p>
            <button
              type="button"
              className="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-xs font-normal rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
              onClick={() => {
                setShowAddTask(true);
                if (Object.values(filters).some(f => f !== 'all')) {
                  setFilters({
                    status: 'all',
                    priority: 'all',
                    category: 'all',
                    dueDate: 'all'
                  });
                }
              }}
            >
              <Plus className="w-3 h-3 mr-2" />
              Create New Task
            </button>
          </div>
        )}

        {/* Add Task Modal */}
        {showAddTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-normal text-gray-900">Add New Task</h3>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    onClick={() => setShowAddTask(false)}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-normal text-gray-700 mb-3">
                      Task Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-normal"
                      value={newTask.title}
                      onChange={handleInputChange}
                      placeholder="Enter task title..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-normal text-gray-700 mb-3">Description</label>
                    <textarea
                      name="description"
                      rows={4}
                      className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-normal resize-none"
                      value={newTask.description}
                      onChange={handleInputChange}
                      placeholder="Describe your task..."
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-normal text-gray-700 mb-3">Due Date</label>
                      <input
                        type="date"
                        name="dueDate"
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-normal"
                        value={newTask.dueDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-normal text-gray-700 mb-3">Priority</label>
                      <select
                        name="priority"
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-normal"
                        value={newTask.priority}
                        onChange={handleInputChange}
                      >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-normal text-gray-700 mb-3">Status</label>
                      <select
                        name="status"
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-normal"
                        value={newTask.status}
                        onChange={handleInputChange}
                      >
                        {Object.entries(taskStatus).map(([key, { label }]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-normal text-gray-700 mb-3">Category</label>
                      <input
                        type="text"
                        name="category"
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-normal"
                        value={newTask.category}
                        onChange={handleInputChange}
                        placeholder="Enter category..."
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6">
                    <button
                      type="button"
                      className="w-full sm:w-auto px-6 py-3 border border-gray-200 shadow-sm text-sm font-normal rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                      onClick={() => setShowAddTask(false)}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={addTask}
                      className="w-full sm:w-auto px-6 py-3 border border-transparent shadow-sm text-sm font-normal rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                      Add Task
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Edit Task Modal */}
        {editingTask && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-screen overflow-y-auto">
              <div className="p-8">
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xl font-normal text-gray-900">Edit Task</h3>
                  <button
                    type="button"
                    className="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                    onClick={cancelEditing}
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-xs font-normal text-gray-700 mb-3">
                      Task Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-normal"
                      value={editingTask.title}
                      onChange={handleInputChange}
                      placeholder="Enter task title..."
                    />
                  </div>
                  
                  <div>
                    <label className="block text-xs font-normal text-gray-700 mb-3">Description</label>
                    <textarea
                      name="description"
                      rows={4}
                      className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-normal resize-none"
                      value={editingTask.description}
                      onChange={handleInputChange}
                      placeholder="Describe your task..."
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-xs font-normal text-gray-700 mb-3">Due Date</label>
                      <input
                        type="date"
                        name="dueDate"
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-normal"
                        value={editingTask.dueDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-xs font-normal text-gray-700 mb-3">Priority</label>
                      <select
                        name="priority"
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-normal"
                        value={editingTask.priority}
                        onChange={handleInputChange}
                      >
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-normal text-gray-700 mb-3">Status</label>
                      <select
                        name="status"
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-normal"
                        value={editingTask.status}
                        onChange={handleInputChange}
                      >
                        {Object.entries(taskStatus).map(([key, { label }]) => (
                          <option key={key} value={key}>{label}</option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-xs font-normal text-gray-700 mb-3">Category</label>
                      <input
                        type="text"
                        name="category"
                        className="w-full px-4 py-3 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent font-normal"
                        value={editingTask.category}
                        onChange={handleInputChange}
                        placeholder="Enter category..."
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6">
                    <button
                      type="button"
                      className="w-full sm:w-auto px-6 py-3 border border-gray-200 shadow-sm text-sm font-normal rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                      onClick={cancelEditing}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      onClick={updateTask}
                      className="w-full sm:w-auto px-6 py-3 border border-transparent shadow-sm text-sm font-normal rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyTasks;