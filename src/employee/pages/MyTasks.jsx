import { useState, useEffect } from 'react';
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
  TrendingUp,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

// Cosmic Background Component
const CosmicBackground = () => {
  useEffect(() => {
    const createStars = () => {
      const starField = document.getElementById('starfield');
      if (!starField) return;
      
      starField.innerHTML = '';
      const starColors = ['#ffffff', '#2563eb', '#a3a3a3', '#6b7280'];
      const starSizes = ['1px', '2px', '3px'];
      
      for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'absolute rounded-full animate-pulse';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.backgroundColor = starColors[Math.floor(Math.random() * starColors.length)];
        star.style.width = starSizes[Math.floor(Math.random() * starSizes.length)];
        star.style.height = star.style.width;
        star.style.opacity = (Math.random() * 0.6 + 0.2).toString();
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 3 + 2) + 's';
        starField.appendChild(star);
      }
    };

    const createSparkles = () => {
      const sparkleContainer = document.getElementById('sparkles');
      if (!sparkleContainer) return;
      
      sparkleContainer.innerHTML = '';
      const sparkleColors = ['#2563eb', '#22c55e', '#f59e0b', '#ffffff'];
      
      for (let i = 0; i < 25; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'absolute animate-bounce';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.top = Math.random() * 100 + '%';
        sparkle.style.backgroundColor = sparkleColors[Math.floor(Math.random() * sparkleColors.length)];
        sparkle.style.width = ['2px', '4px', '6px'][Math.floor(Math.random() * 3)];
        sparkle.style.height = sparkle.style.width;
        sparkle.style.borderRadius = '50%';
        sparkle.style.animationDelay = Math.random() * 8 + 's';
        sparkle.style.animationDuration = '8s';
        sparkleContainer.appendChild(sparkle);
      }
    };

    createStars();
    createSparkles();
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <div id="starfield" className="absolute inset-0"></div>
      <div id="sparkles" className="absolute inset-0"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/5 via-transparent to-gray-900/5"></div>
    </div>
  );
};

// Carousel Component
const AnnouncementCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  
  const announcements = [
    {
      id: 1,
      title: "Q3 Performance Reviews",
      message: "Performance review meetings will begin next Monday. Please prepare your self-assessment.",
      type: "info",
      date: "2025-08-03"
    },
    {
      id: 2,
      title: "New Project Launch",
      message: "Exciting news! We're launching Project Aurora next quarter with expanded team collaboration features.",
      type: "success",
      date: "2025-08-02"
    },
    {
      id: 3,
      title: "Team Building Event",
      message: "Join us for a virtual team building session this Friday at 3 PM. Registration closes today!",
      type: "warning",
      date: "2025-08-01"
    }
  ];

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, announcements.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % announcements.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  const typeColors = {
    info: 'border-blue-500/20 bg-blue-500/10',
    success: 'border-green-500/20 bg-green-500/10',
    warning: 'border-yellow-500/20 bg-yellow-500/10'
  };

  return (
    <div 
      className="relative bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-6 backdrop-blur-lg shadow-lg"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-white">Announcements</h3>
        <div className="flex space-x-1">
          {announcements.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide 
                  ? 'bg-[#2563eb] shadow-[0_0_10px_rgba(37,99,235,0.5)]' 
                  : 'bg-[#404040] hover:bg-[#555555]'
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>
      
      <div className="relative overflow-hidden h-24">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {announcements.map((announcement, index) => (
            <div key={announcement.id} className="w-full flex-shrink-0">
              <div className={`p-4 rounded-lg border ${typeColors[announcement.type]}`}>
                <h4 className="text-sm font-medium text-white mb-2">
                  {announcement.title}
                </h4>
                <p className="text-xs text-[#a3a3a3] leading-relaxed">
                  {announcement.message}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={prevSlide}
          className="w-8 h-8 bg-[#2563eb] hover:bg-[#1d4ed8] rounded-full flex items-center justify-center transition-all duration-200 shadow-[0_0_10px_rgba(37,99,235,0.3)] hover:shadow-[0_0_15px_rgba(37,99,235,0.5)]"
        >
          <ChevronLeft className="w-4 h-4 text-white" />
        </button>
        
        <span className="text-xs text-[#6b7280]">
          {currentSlide + 1} of {announcements.length}
        </span>
        
        <button
          onClick={nextSlide}
          className="w-8 h-8 bg-[#2563eb] hover:bg-[#1d4ed8] rounded-full flex items-center justify-center transition-all duration-200 shadow-[0_0_10px_rgba(37,99,235,0.3)] hover:shadow-[0_0_15px_rgba(37,99,235,0.5)]"
        >
          <ChevronRight className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
};

// Task status configuration
const taskStatus = {
  'not_started': { label: 'Not Started', color: 'bg-[#404040] text-[#a3a3a3]' },
  'in_progress': { label: 'In Progress', color: 'bg-[#2563eb]/20 text-[#3b82f6]' },
  'completed': { label: 'Completed', color: 'bg-[#22c55e]/20 text-[#22c55e]' },
  'on_hold': { label: 'On Hold', color: 'bg-[#f59e0b]/20 text-[#f59e0b]' },
  'cancelled': { label: 'Cancelled', color: 'bg-[#ef4444]/20 text-[#ef4444]' }
};

const priorityColors = {
  'high': 'bg-[#ef4444]/20 text-[#ef4444] border-[#ef4444]/20',
  'medium': 'bg-[#f59e0b]/20 text-[#f59e0b] border-[#f59e0b]/20',
  'low': 'bg-[#22c55e]/20 text-[#22c55e] border-[#22c55e]/20'
};

// Mock tasks data
const initialTasks = [
  {
    id: 1,
    title: 'Complete project proposal',
    description: 'Draft and submit the quarterly project proposal document with comprehensive market analysis and budget projections',
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
    description: 'Prepare comprehensive presentation for the quarterly team meeting including performance metrics and project updates',
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
    description: 'Review pull requests from the development team and provide detailed feedback on implementation approaches',
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
    description: 'Update API documentation for the new features and ensure all endpoints are properly documented',
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
    description: 'Complete comprehensive self-assessment for the quarterly review including goals and achievements',
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
    <div className="min-h-screen bg-[#0a0a0a] relative">
      <CosmicBackground />
      
      <div className="relative z-10 p-8">
        <div className="max-w-7xl mx-auto">
          {/* Header Section */}
          <div className="mb-10">
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between space-y-6 lg:space-y-0">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-6">
                  <img 
                    src="https://naxrita.com/wp-content/uploads/2024/10/logo-t.png" 
                    alt="Nexrita" 
                    className="h-10 w-auto"
                  />
                  <div className="h-8 w-px bg-[#2a2a2a]"></div>
                  <div>
                    <h1 className="text-4xl font-normal text-white mb-2" style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}>
                      My Tasks
                    </h1>
                    <p className="text-sm text-[#a3a3a3] font-light leading-relaxed">
                      Manage your tasks efficiently in our cosmic workspace
                    </p>
                  </div>
                </div>
                
                <div className="flex flex-wrap items-center gap-4">
                  <button
                    type="button"
                    className="inline-flex items-center px-4 py-3 border border-[#404040] rounded-lg shadow-[0_4px_6px_-1px_rgba(0,0,0,0.8)] text-sm font-normal text-[#a3a3a3] bg-[#161616] hover:bg-[#1e1e1e] hover:border-[#555555] focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 focus:ring-offset-[#0a0a0a] backdrop-blur-lg transition-all duration-300"
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    {showFilters ? 'Hide Filters' : 'Show Filters'}
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center px-6 py-3 border border-transparent rounded-lg shadow-[0_4px_12px_rgba(37,99,235,0.4)] text-sm font-medium text-white bg-[#2563eb] hover:bg-[#1d4ed8] hover:shadow-[0_6px_20px_rgba(37,99,235,0.6)] hover:transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 focus:ring-offset-[#0a0a0a] backdrop-blur-lg transition-all duration-300"
                    onClick={() => setShowAddTask(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Task
                  </button>
                </div>
              </div>

              {/* Announcement Carousel */}
              <div className="lg:w-96">
                <AnnouncementCarousel />
              </div>
            </div>
          </div>

          {/* Stats Dashboard */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
            {/* Total Tasks */}
            <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-6 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.9)] hover:transform hover:-translate-y-1 backdrop-blur-lg transition-all duration-300 group">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-[#2563eb]/20 to-[#1d4ed8]/30 rounded-lg border border-[#2563eb]/20 group-hover:shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                  <Target className="w-5 h-5 text-[#3b82f6]" />
                </div>
                <div>
                  <p className="text-xs text-[#6b7280] font-light mb-1">Total Tasks</p>
                  <p className="text-2xl font-light text-white">{tasks.length}</p>
                </div>
              </div>
            </div>

            {/* In Progress */}
            <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-6 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.9)] hover:transform hover:-translate-y-1 backdrop-blur-lg transition-all duration-300 group">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-[#f59e0b]/20 to-[#d97706]/30 rounded-lg border border-[#f59e0b]/20 group-hover:shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                  <Clock className="w-5 h-5 text-[#f59e0b]" />
                </div>
                <div>
                  <p className="text-xs text-[#6b7280] font-light mb-1">In Progress</p>
                  <p className="text-2xl font-light text-white">
                    {getTaskCountByStatus('in_progress')}
                  </p>
                </div>
              </div>
            </div>

            {/* Completed */}
            <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-6 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.9)] hover:transform hover:-translate-y-1 backdrop-blur-lg transition-all duration-300 group">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-[#22c55e]/20 to-[#16a34a]/30 rounded-lg border border-[#22c55e]/20 group-hover:shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                  <CheckCircle className="w-5 h-5 text-[#22c55e]" />
                </div>
                <div>
                  <p className="text-xs text-[#6b7280] font-light mb-1">Completed</p>
                  <p className="text-2xl font-light text-white">
                    {getTaskCountByStatus('completed')}
                  </p>
                </div>
              </div>
            </div>

            {/* Not Started */}
            <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-6 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.9)] hover:transform hover:-translate-y-1 backdrop-blur-lg transition-all duration-300 group">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-[#6b7280]/20 to-[#4b5563]/30 rounded-lg border border-[#6b7280]/20 group-hover:shadow-[0_0_20px_rgba(107,114,128,0.3)]">
                  <Star className="w-5 h-5 text-[#a3a3a3]" />
                </div>
                <div>
                  <p className="text-xs text-[#6b7280] font-light mb-1">Not Started</p>
                  <p className="text-2xl font-light text-white">
                    {getTaskCountByStatus('not_started')}
                  </p>
                </div>
              </div>
            </div>

            {/* Overdue */}
            <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-6 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.8)] hover:shadow-[0_20px_25px_-5px_rgba(0,0,0,0.9)] hover:transform hover:-translate-y-1 backdrop-blur-lg transition-all duration-300 group">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-[#ef4444]/20 to-[#dc2626]/30 rounded-lg border border-[#ef4444]/20 group-hover:shadow-[0_0_20px_rgba(239,68,68,0.3)]">
                  <AlertCircle className="w-5 h-5 text-[#ef4444]" />
                </div>
                <div>
                  <p className="text-xs text-[#6b7280] font-light mb-1">Overdue</p>
                  <p className="text-2xl font-light text-white">
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
            <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl p-8 mb-10 shadow-[0_10px_15px_-3px_rgba(0,0,0,0.8)] backdrop-blur-lg">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Status filter */}
                <div>
                  <label className="block text-sm font-light text-[#a3a3a3] mb-3">Status</label>
                  <select
                    className="w-full px-4 py-3 text-sm border border-[#404040] bg-[#161616] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] backdrop-blur-lg font-light transition-all duration-200"
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
                  <label className="block text-sm font-light text-[#a3a3a3] mb-3">Priority</label>
                  <select
                    className="w-full px-4 py-3 text-sm border border-[#404040] bg-[#161616] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] backdrop-blur-lg font-light transition-all duration-200"
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
                  <label className="block text-sm font-light text-[#a3a3a3] mb-3">Category</label>
                  <select
                    className="w-full px-4 py-3 text-sm border border-[#404040] bg-[#161616] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] backdrop-blur-lg font-light transition-all duration-200"
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
                  <label className="block text-sm font-light text-[#a3a3a3] mb-3">Due Date</label>
                  <select
                    className="w-full px-4 py-3 text-sm border border-[#404040] bg-[#161616] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] backdrop-blur-lg font-light transition-all duration-200"
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
                  className="inline-flex items-center px-4 py-2 border border-[#404040] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.8)] text-sm font-light rounded-lg text-[#a3a3a3] bg-[#161616] hover:bg-[#1e1e1e] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 focus:ring-offset-[#0a0a0a] backdrop-blur-lg transition-all duration-200"
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
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-light text-white" style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}>
                Task List
              </h2>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-light bg-[#2563eb]/20 text-[#3b82f6] border border-[#2563eb]/20">
                {filteredTasks.length} tasks
              </span>
            </div>
            <div className="mt-4 sm:mt-0">
              <div className="flex items-center space-x-2 text-sm text-[#6b7280]">
                <TrendingUp className="w-4 h-4" />
                <span className="font-light">
                  {Math.round((getTaskCountByStatus('completed') / tasks.length) * 100)}% Complete
                </span>
              </div>
            </div>
          </div>

          {/* Task List */}
          {filteredTasks.length > 0 ? (
            <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-lg">
              <div className="divide-y divide-[#2a2a2a]">
                {filteredTasks.map((task) => (
                  <div key={task.id} className="p-6 hover:bg-[#252525] transition-all duration-300 group">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4 flex-1">
                        <div className="mt-1">
                          <button
                            type="button"
                            className={`w-6 h-6 rounded-full flex items-center justify-center transition-all duration-300 ${
                              task.status === 'completed' 
                                ? 'bg-[#22c55e]/20 text-[#22c55e] border-2 border-[#22c55e]/50 shadow-[0_0_10px_rgba(34,197,94,0.3)]' 
                                : 'border-2 border-[#404040] hover:border-[#2563eb] hover:shadow-[0_0_10px_rgba(37,99,235,0.3)]'
                            }`}
                            onClick={() => toggleTaskStatus(task.id)}
                          >
                            {task.status === 'completed' && <Check className="w-4 h-4" />}
                          </button>
                        </div>
                        
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center flex-wrap gap-3 mb-3">
                            <h3 className={`text-lg font-normal ${
                              task.status === 'completed' 
                                ? 'text-[#6b7280] line-through' 
                                : 'text-white'
                            }`}>
                              {task.title}
                            </h3>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-light border ${priorityColors[task.priority]}`}>
                              {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                            </span>
                            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-light ${taskStatus[task.status]?.color}`}>
                              {taskStatus[task.status]?.label}
                            </span>
                          </div>
                          
                          <p className="text-sm text-[#a3a3a3] font-light mb-4 leading-relaxed">
                            {task.description}
                          </p>
                          
                          <div className="flex items-center flex-wrap gap-6 text-sm text-[#6b7280]">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-4 h-4" />
                              <span className="font-light">
                                Due {new Date(task.dueDate).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <User className="w-4 h-4" />
                              <span className="font-light">
                                {task.assignedBy}
                              </span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="w-2 h-2 bg-[#2563eb] rounded-full"></span>
                              <span className="font-light">{task.category}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-3 ml-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <button
                          type="button"
                          className="text-[#6b7280] hover:text-[#2563eb] hover:shadow-[0_0_10px_rgba(37,99,235,0.3)] p-2 rounded-lg transition-all duration-200"
                          onClick={() => startEditing(task)}
                        >
                          <Edit3 className="w-5 h-5" />
                        </button>
                        <button
                          type="button"
                          className="text-[#6b7280] hover:text-[#ef4444] hover:shadow-[0_0_10px_rgba(239,68,68,0.3)] p-2 rounded-lg transition-all duration-200"
                          onClick={() => deleteTask(task.id)}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-20 bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.8)] backdrop-blur-lg">
              <div className="p-6 bg-gradient-to-br from-[#2563eb]/10 to-[#1d4ed8]/20 rounded-full w-20 h-20 mx-auto mb-8 flex items-center justify-center border border-[#2563eb]/20">
                <CheckCircle className="w-10 h-10 text-[#2563eb]" />
              </div>
              <h3 className="text-xl font-light text-white mb-3">No tasks found</h3>
              <p className="text-sm text-[#a3a3a3] font-light mb-8 max-w-md mx-auto leading-relaxed">
                {Object.values(filters).some(f => f !== 'all') 
                  ? 'No tasks match your current filters. Try adjusting your search criteria or create a new task.' 
                  : 'Start your cosmic journey by creating your first task and boost your productivity.'}
              </p>
              <button
                type="button"
                className="inline-flex items-center px-8 py-4 border border-transparent shadow-[0_4px_12px_rgba(37,99,235,0.4)] text-sm font-normal rounded-lg text-white bg-[#2563eb] hover:bg-[#1d4ed8] hover:shadow-[0_6px_20px_rgba(37,99,235,0.6)] hover:transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 focus:ring-offset-[#0a0a0a] backdrop-blur-lg transition-all duration-300"
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
                <Plus className="w-4 h-4 mr-2" />
                Create New Task
              </button>
            </div>
          )}

          {/* Add Task Modal */}
          {showAddTask && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9)] max-w-2xl w-full max-h-screen overflow-y-auto backdrop-blur-lg">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-light text-white" style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}>
                      Add New Task
                    </h3>
                    <button
                      type="button"
                      className="text-[#6b7280] hover:text-white p-2 rounded-lg hover:bg-[#252525] transition-all duration-200"
                      onClick={() => setShowAddTask(false)}
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-light text-[#a3a3a3] mb-3">
                        Task Title <span className="text-[#ef4444]">*</span>
                      </label>
                      <input
                        type="text"
                        name="title"
                        className="w-full px-4 py-3 text-base border border-[#404040] bg-[#161616] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] backdrop-blur-lg font-light transition-all duration-200"
                        value={newTask.title}
                        onChange={handleInputChange}
                        placeholder="Enter your task title..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-light text-[#a3a3a3] mb-3">Description</label>
                      <textarea
                        name="description"
                        rows={4}
                        className="w-full px-4 py-3 text-base border border-[#404040] bg-[#161616] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] backdrop-blur-lg font-light resize-none transition-all duration-200"
                        value={newTask.description}
                        onChange={handleInputChange}
                        placeholder="Describe your task in detail..."
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-light text-[#a3a3a3] mb-3">Due Date</label>
                        <input
                          type="date"
                          name="dueDate"
                          className="w-full px-4 py-3 text-base border border-[#404040] bg-[#161616] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] backdrop-blur-lg font-light transition-all duration-200"
                          value={newTask.dueDate}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-light text-[#a3a3a3] mb-3">Priority</label>
                        <select
                          name="priority"
                          className="w-full px-4 py-3 text-base border border-[#404040] bg-[#161616] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] backdrop-blur-lg font-light transition-all duration-200"
                          value={newTask.priority}
                          onChange={handleInputChange}
                        >
                          <option value="high">High Priority</option>
                          <option value="medium">Medium Priority</option>
                          <option value="low">Low Priority</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-light text-[#a3a3a3] mb-3">Status</label>
                        <select
                          name="status"
                          className="w-full px-4 py-3 text-base border border-[#404040] bg-[#161616] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] backdrop-blur-lg font-light transition-all duration-200"
                          value={newTask.status}
                          onChange={handleInputChange}
                        >
                          {Object.entries(taskStatus).map(([key, { label }]) => (
                            <option key={key} value={key}>{label}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-light text-[#a3a3a3] mb-3">Category</label>
                        <input
                          type="text"
                          name="category"
                          className="w-full px-4 py-3 text-base border border-[#404040] bg-[#161616] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] backdrop-blur-lg font-light transition-all duration-200"
                          value={newTask.category}
                          onChange={handleInputChange}
                          placeholder="Enter category..."
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6">
                      <button
                        type="button"
                        className="w-full sm:w-auto px-6 py-3 border border-[#404040] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.8)] text-sm font-light rounded-lg text-[#a3a3a3] bg-[#161616] hover:bg-[#1e1e1e] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 focus:ring-offset-[#1e1e1e] backdrop-blur-lg transition-all duration-200"
                        onClick={() => setShowAddTask(false)}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={addTask}
                        disabled={!newTask.title.trim()}
                        className="w-full sm:w-auto px-6 py-3 border border-transparent shadow-[0_4px_12px_rgba(37,99,235,0.4)] text-sm font-normal rounded-lg text-white bg-[#2563eb] hover:bg-[#1d4ed8] hover:shadow-[0_6px_20px_rgba(37,99,235,0.6)] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 focus:ring-offset-[#1e1e1e] backdrop-blur-lg transition-all duration-200"
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
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9)] max-w-2xl w-full max-h-screen overflow-y-auto backdrop-blur-lg">
                <div className="p-8">
                  <div className="flex items-center justify-between mb-8">
                    <h3 className="text-2xl font-light text-white" style={{ fontFamily: '"Plus Jakarta Sans", system-ui, sans-serif' }}>
                      Edit Task
                    </h3>
                    <button
                      type="button"
                      className="text-[#6b7280] hover:text-white p-2 rounded-lg hover:bg-[#252525] transition-all duration-200"
                      onClick={cancelEditing}
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-light text-[#a3a3a3] mb-3">
                        Task Title <span className="text-[#ef4444]">*</span>
                      </label>
                      <input
                        type="text"
                        name="title"
                        className="w-full px-4 py-3 text-base border border-[#404040] bg-[#161616] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] backdrop-blur-lg font-light transition-all duration-200"
                        value={editingTask.title}
                        onChange={handleInputChange}
                        placeholder="Enter your task title..."
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-light text-[#a3a3a3] mb-3">Description</label>
                      <textarea
                        name="description"
                        rows={4}
                        className="w-full px-4 py-3 text-base border border-[#404040] bg-[#161616] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] backdrop-blur-lg font-light resize-none transition-all duration-200"
                        value={editingTask.description}
                        onChange={handleInputChange}
                        placeholder="Describe your task in detail..."
                      />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-light text-[#a3a3a3] mb-3">Due Date</label>
                        <input
                          type="date"
                          name="dueDate"
                          className="w-full px-4 py-3 text-base border border-[#404040] bg-[#161616] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] backdrop-blur-lg font-light transition-all duration-200"
                          value={editingTask.dueDate}
                          onChange={handleInputChange}
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-light text-[#a3a3a3] mb-3">Priority</label>
                        <select
                          name="priority"
                          className="w-full px-4 py-3 text-base border border-[#404040] bg-[#161616] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] backdrop-blur-lg font-light transition-all duration-200"
                          value={editingTask.priority}
                          onChange={handleInputChange}
                        >
                          <option value="high">High Priority</option>
                          <option value="medium">Medium Priority</option>
                          <option value="low">Low Priority</option>
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-light text-[#a3a3a3] mb-3">Status</label>
                        <select
                          name="status"
                          className="w-full px-4 py-3 text-base border border-[#404040] bg-[#161616] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] backdrop-blur-lg font-light transition-all duration-200"
                          value={editingTask.status}
                          onChange={handleInputChange}
                        >
                          {Object.entries(taskStatus).map(([key, { label }]) => (
                            <option key={key} value={key}>{label}</option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-light text-[#a3a3a3] mb-3">Category</label>
                        <input
                          type="text"
                          name="category"
                          className="w-full px-4 py-3 text-base border border-[#404040] bg-[#161616] text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-[#2563eb] backdrop-blur-lg font-light transition-all duration-200"
                          value={editingTask.category}
                          onChange={handleInputChange}
                          placeholder="Enter category..."
                        />
                      </div>
                    </div>
                    
                    <div className="flex flex-col sm:flex-row sm:justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6">
                      <button
                        type="button"
                        className="w-full sm:w-auto px-6 py-3 border border-[#404040] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.8)] text-sm font-light rounded-lg text-[#a3a3a3] bg-[#161616] hover:bg-[#1e1e1e] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 focus:ring-offset-[#1e1e1e] backdrop-blur-lg transition-all duration-200"
                        onClick={cancelEditing}
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        onClick={updateTask}
                        disabled={!editingTask.title.trim()}
                        className="w-full sm:w-auto px-6 py-3 border border-transparent shadow-[0_4px_12px_rgba(37,99,235,0.4)] text-sm font-normal rounded-lg text-white bg-[#2563eb] hover:bg-[#1d4ed8] hover:shadow-[0_6px_20px_rgba(37,99,235,0.6)] disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:ring-offset-2 focus:ring-offset-[#1e1e1e] backdrop-blur-lg transition-all duration-200"
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
    </div>
  );
};

export default MyTasks;
