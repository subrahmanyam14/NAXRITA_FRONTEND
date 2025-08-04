import React, { useState, useEffect } from 'react';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  Upload, 
  Download, 
  Search, 
  Filter, 
  X,
  UserPlus,
  FileDown,
  Copy,
  Eye,
  RefreshCw,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Users,
  Building,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  ChevronLeft,
  ChevronRight,
  Star
} from 'lucide-react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Custom dark theme toast styles
const toastConfig = {
  position: "top-right",
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "dark",
  style: {
    background: '#1e1e1e',
    color: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #2a2a2a',
    backdropFilter: 'blur(10px)',
    height: '20vh', // 20% of viewport height
  }
};

// Dummy API functions
const api = {
  async fetchEmployees() {
    await new Promise(resolve => setTimeout(resolve, 500));
    return dummyEmployees;
  },
  
  async addEmployee(employee) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const newEmployee = { ...employee, id: Date.now().toString() };
    dummyEmployees.push(newEmployee);
    return newEmployee;
  },
  
  async updateEmployee(id, updates) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = dummyEmployees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      dummyEmployees[index] = { ...dummyEmployees[index], ...updates };
      return dummyEmployees[index];
    }
    throw new Error('Employee not found');
  },
  
  async deleteEmployee(id) {
    await new Promise(resolve => setTimeout(resolve, 300));
    const index = dummyEmployees.findIndex(emp => emp.id === id);
    if (index !== -1) {
      dummyEmployees.splice(index, 1);
      return true;
    }
    throw new Error('Employee not found');
  },
  
  async bulkUpload(employees) {
    await new Promise(resolve => setTimeout(resolve, 1000));
    employees.forEach(emp => {
      dummyEmployees.push({ ...emp, id: Date.now().toString() + Math.random() });
    });
    return employees;
  }
};

// Dummy data with announcements for carousel
let dummyEmployees = [
  {
    id: '1',
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+1 234 567 8901',
    employeeId: 'EMP001',
    department: 'Engineering',
    designation: 'Senior Developer',
    status: 'active',
    joinDate: '2023-01-15',
    salary: 85000,
    address: '123 Main St, New York, NY',
    emergencyContact: '+1 234 567 8902'
  },
  {
    id: '2',
    firstName: 'Jane',
    lastName: 'Smith',
    email: 'jane.smith@company.com',
    phone: '+1 234 567 8903',
    employeeId: 'EMP002',
    department: 'Marketing',
    designation: 'Marketing Manager',
    status: 'active',
    joinDate: '2023-03-20',
    salary: 72000,
    address: '456 Oak Ave, Los Angeles, CA',
    emergencyContact: '+1 234 567 8904'
  },
  {
    id: '3',
    firstName: 'Mike',
    lastName: 'Johnson',
    email: 'mike.johnson@company.com',
    phone: '+1 234 567 8905',
    employeeId: 'EMP003',
    department: 'Sales',
    designation: 'Sales Executive',
    status: 'on-leave',
    joinDate: '2022-08-10',
    salary: 65000,
    address: '789 Pine St, Chicago, IL',
    emergencyContact: '+1 234 567 8906'
  }
];

// Announcements for carousel
const announcements = [
  {
    id: 1,
    title: "Welcome New Team Members",
    content: "We're excited to welcome 5 new talented individuals to our growing team this month!",
    type: "welcome",
    date: "2024-01-15"
  },
  {
    id: 2,
    title: "Q1 Performance Reviews",
    content: "Performance review cycle begins next week. Please prepare your self-assessments.",
    type: "important",
    date: "2024-01-10"
  },
  {
    id: 3,
    title: "Company Holiday Schedule",
    content: "Updated holiday calendar for 2024 is now available in the employee portal.",
    type: "info",
    date: "2024-01-05"
  }
];

const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];
const designations = ['Senior Developer', 'Marketing Manager', 'Sales Executive', 'HR Specialist', 'Accountant'];

// Animated Background Component
const CosmicBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Starfield */}
      <div className="starfield">
        {[...Array(150)].map((_, i) => (
          <div
            key={i}
            className="star"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>
      
      {/* Sparkles */}
      <div className="sparkles">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${6 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>
      
      {/* Floating Dots with Connections */}
      <div className="floating-dots">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="floating-dot"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 15}s`,
              animationDuration: `${10 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Auto-scrolling Carousel Component
const AnnouncementCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % announcements.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % announcements.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + announcements.length) % announcements.length);
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'welcome': return 'from-green-600 to-emerald-600';
      case 'important': return 'from-red-600 to-rose-600';
      default: return 'from-blue-600 to-indigo-600';
    }
  };

  return (
    <div className="relative bg-gray-900/80 backdrop-blur-lg rounded-xl border border-gray-700/50 p-6 overflow-hidden group hover:border-blue-500/50 transition-all duration-300">
      <div className="absolute inset-0 bg-gradient-to-r opacity-10" style={{
        backgroundImage: `linear-gradient(45deg, rgba(37, 99, 235, 0.1) 0%, rgba(59, 130, 246, 0.05) 100%)`
      }} />
      
      <div className="relative z-10">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
          <Star className="w-5 h-5 mr-2 text-blue-400" />
          Company Announcements
        </h3>
        
        <div className="relative h-24 overflow-hidden rounded-lg">
          {announcements.map((announcement, index) => (
            <div
              key={announcement.id}
              className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                index === currentSlide ? 'translate-x-0' : 
                index < currentSlide ? '-translate-x-full' : 'translate-x-full'
              }`}
            >
              <div className={`h-full bg-gradient-to-r ${getTypeColor(announcement.type)} p-4 rounded-lg`}>
                <h4 className="text-white font-medium mb-1">{announcement.title}</h4>
                <p className="text-gray-100 text-sm opacity-90">{announcement.content}</p>
                <span className="text-xs text-gray-200 opacity-70 mt-1 block">{announcement.date}</span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex items-center justify-between mt-4">
          <div className="flex space-x-2">
            {announcements.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-blue-400 w-6' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
          
          <div className="flex space-x-2">
            <button
              onClick={prevSlide}
              className="p-1 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-200"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextSlide}
              className="p-1 rounded-full bg-gray-700 hover:bg-gray-600 text-white transition-colors duration-200"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const EmployeeManagement = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedEmployees, setSelectedEmployees] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({});

  // Load employees on component mount
  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const data = await api.fetchEmployees();
      setEmployees(data);
      toast.success('Employees loaded successfully! ✨', toastConfig);
    } catch (error) {
      toast.error('Failed to load employees ❌', toastConfig);
    } finally {
      setLoading(false);
    }
  };

  // Filter employees
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = searchTerm === '' || 
      `${emp.firstName} ${emp.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employeeId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesDepartment = selectedDepartment === 'all' || emp.department === selectedDepartment;
    const matchesStatus = selectedStatus === 'all' || emp.status === selectedStatus;
    
    return matchesSearch && matchesDepartment && matchesStatus;
  });

  // Handle employee selection
  const toggleEmployeeSelection = (employeeId) => {
    setSelectedEmployees(prev => 
      prev.includes(employeeId)
        ? prev.filter(id => id !== employeeId)
        : [...prev, employeeId]
    );
  };

  // Handle select all
  const toggleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedEmployees(filteredEmployees.map(emp => emp.id));
    } else {
      setSelectedEmployees([]);
    }
  };

  // Handle delete
  const handleDelete = async (employeeId) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await api.deleteEmployee(employeeId);
        setEmployees(prev => prev.filter(emp => emp.id !== employeeId));
        toast.success('Employee deleted successfully! 🗑️', toastConfig);
      } catch (error) {
        toast.error('Failed to delete employee ❌', toastConfig);
      }
    }
  };

  // Handle bulk actions
  const handleBulkAction = async (action) => {
    try {
      if (action === 'delete') {
        if (window.confirm(`Are you sure you want to delete ${selectedEmployees.length} employees?`)) {
          for (const id of selectedEmployees) {
            await api.deleteEmployee(id);
          }
          setEmployees(prev => prev.filter(emp => !selectedEmployees.includes(emp.id)));
          toast.success(`${selectedEmployees.length} employees deleted successfully! 🗑️`, toastConfig);
        }
      } else {
        toast.success(`Bulk ${action} completed for ${selectedEmployees.length} employees! ⚡`, toastConfig);
      }
      setSelectedEmployees([]);
    } catch (error) {
      toast.error(`Failed to perform bulk ${action} ❌`, toastConfig);
    }
  };

  // Handle file upload
  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const mockEmployees = [
          {
            firstName: 'Alice',
            lastName: 'Brown',
            email: 'alice.brown@company.com',
            phone: '+1 234 567 8907',
            employeeId: 'EMP004',
            department: 'HR',
            designation: 'HR Specialist',
            status: 'active',
            joinDate: '2024-01-01',
            salary: 60000,
            address: '321 Elm St, Boston, MA',
            emergencyContact: '+1 234 567 8908'
          }
        ];
        
        await api.bulkUpload(mockEmployees);
        await loadEmployees();
        toast.success(`${mockEmployees.length} employees uploaded successfully! 📊`, toastConfig);
      } catch (error) {
        toast.error('Failed to upload employees ❌', toastConfig);
      }
    }
  };

  // Handle view employee
  const handleViewEmployee = (employee) => {
    setSelectedEmployee(employee);
    setEditForm(employee);
    setShowViewModal(true);
    setIsEditing(false);
  };

  // Handle edit employee
  const handleEditEmployee = () => {
    setIsEditing(true);
  };

  // Handle save employee
  const handleSaveEmployee = async () => {
    try {
      const updatedEmployee = await api.updateEmployee(selectedEmployee.id, editForm);
      setEmployees(prev => prev.map(emp => emp.id === selectedEmployee.id ? updatedEmployee : emp));
      setSelectedEmployee(updatedEmployee);
      setIsEditing(false);
      toast.success('Employee updated successfully! ✅', toastConfig);
    } catch (error) {
      toast.error('Failed to update employee ❌', toastConfig);
    }
  };

  // Status badge component with glow effect
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      active: { 
        bg: 'bg-gradient-to-r from-green-500/20 to-emerald-500/20', 
        text: 'text-green-400', 
        icon: CheckCircle,
        glow: 'shadow-lg shadow-green-500/25'
      },
      inactive: { 
        bg: 'bg-gradient-to-r from-red-500/20 to-rose-500/20', 
        text: 'text-red-400', 
        icon: XCircle,
        glow: 'shadow-lg shadow-red-500/25'
      },
      'on-leave': { 
        bg: 'bg-gradient-to-r from-yellow-500/20 to-amber-500/20', 
        text: 'text-yellow-400', 
        icon: Clock,
        glow: 'shadow-lg shadow-yellow-500/25'
      },
      probation: { 
        bg: 'bg-gradient-to-r from-orange-500/20 to-orange-600/20', 
        text: 'text-orange-400', 
        icon: AlertCircle,
        glow: 'shadow-lg shadow-orange-500/25'
      }
    };
    
    const config = statusConfig[status] || statusConfig.inactive;
    const IconComponent = config.icon;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text} ${config.glow} border border-current/20 backdrop-blur-sm`}>
        <IconComponent className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' ')}
      </span>
    );
  };

  // Add Employee Modal with dark theme
  const AddEmployeeModal = () => {
    const [newEmployee, setNewEmployee] = useState({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      employeeId: '',
      department: '',
      designation: '',
      status: 'active',
      joinDate: '',
      salary: '',
      address: '',
      emergencyContact: ''
    });

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const employee = await api.addEmployee(newEmployee);
        setEmployees(prev => [...prev, employee]);
        setShowAddModal(false);
        setNewEmployee({
          firstName: '', lastName: '', email: '', phone: '',
          employeeId: '', department: '', designation: '', status: 'active',
          joinDate: '', salary: '', address: '', emergencyContact: ''
        });
        toast.success('Employee added successfully! 🎉', toastConfig);
      } catch (error) {
        toast.error('Failed to add employee ❌', toastConfig);
      }
    };

    if (!showAddModal) return null;

    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900/95 backdrop-blur-xl rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700/50 shadow-2xl">
          <div className="sticky top-0 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 px-6 py-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-white">Add New Employee</h2>
            <button 
              onClick={() => setShowAddModal(false)}
              className="text-gray-400 hover:text-white transition-colors p-2 hover:bg-gray-800 rounded-lg"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">First Name *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                  value={newEmployee.firstName}
                  onChange={(e) => setNewEmployee(prev => ({ ...prev, firstName: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">Last Name *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                  value={newEmployee.lastName}
                  onChange={(e) => setNewEmployee(prev => ({ ...prev, lastName: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">Email *</label>
                <input
                  type="email"
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                  value={newEmployee.email}
                  onChange={(e) => setNewEmployee(prev => ({ ...prev, email: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">Phone</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                  value={newEmployee.phone}
                  onChange={(e) => setNewEmployee(prev => ({ ...prev, phone: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">Employee ID *</label>
                <input
                  type="text"
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                  value={newEmployee.employeeId}
                  onChange={(e) => setNewEmployee(prev => ({ ...prev, employeeId: e.target.value }))}
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">Join Date</label>
                <input
                  type="date"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                  value={newEmployee.joinDate}
                  onChange={(e) => setNewEmployee(prev => ({ ...prev, joinDate: e.target.value }))}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">Department *</label>
                <select
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                  value={newEmployee.department}
                  onChange={(e) => setNewEmployee(prev => ({ ...prev, department: e.target.value }))}
                >
                  <option value="">Select Department</option>
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">Designation *</label>
                <select
                  required
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                  value={newEmployee.designation}
                  onChange={(e) => setNewEmployee(prev => ({ ...prev, designation: e.target.value }))}
                >
                  <option value="">Select Designation</option>
                  {designations.map(desig => (
                    <option key={desig} value={desig}>{desig}</option>
                  ))}
                </select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">Status</label>
                <select
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                  value={newEmployee.status}
                  onChange={(e) => setNewEmployee(prev => ({ ...prev, status: e.target.value }))}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="on-leave">On Leave</option>
                  <option value="probation">Probation</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-300 mb-2">Salary</label>
                <input
                  type="number"
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                  value={newEmployee.salary}
                  onChange={(e) => setNewEmployee(prev => ({ ...prev, salary: e.target.value }))}
                />
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-2">Address</label>
              <textarea
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                rows={2}
                value={newEmployee.address}
                onChange={(e) => setNewEmployee(prev => ({ ...prev, address: e.target.value }))}
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-2">Emergency Contact</label>
              <input
                type="tel"
                className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                value={newEmployee.emergencyContact}
                onChange={(e) => setNewEmployee(prev => ({ ...prev, emergencyContact: e.target.value }))}
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-6">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-6 py-2.5 text-sm font-medium text-gray-300 bg-gray-700/50 border border-gray-600 rounded-lg hover:bg-gray-700 transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
              >
                Add Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // View/Edit Employee Modal with dark theme
  const ViewEmployeeModal = () => {
    if (!showViewModal || !selectedEmployee) return null;

    return (
      <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900/95 backdrop-blur-xl rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-gray-700/50 shadow-2xl">
          <div className="sticky top-0 bg-gray-900/95 backdrop-blur-xl border-b border-gray-700/50 px-6 py-4 flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">
                {selectedEmployee.firstName} {selectedEmployee.lastName}
              </h2>
              <p className="text-sm text-gray-400">{selectedEmployee.employeeId}</p>
            </div>
            <div className="flex items-center space-x-2">
              {!isEditing && (
                <button
                  onClick={handleEditEmployee}
                  className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
                >

                  <Pencil className="w-5 h-5" />
                </button>
              )}
              <button 
                onClick={() => setShowViewModal(false)}
                className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center space-x-4 mb-6">
              <img 
                className="w-16 h-16 rounded-full border-2 border-blue-500/50 shadow-lg shadow-blue-500/25" 
                src={`https://ui-avatars.com/api/?name=${selectedEmployee.firstName}+${selectedEmployee.lastName}&background=2563eb&color=ffffff&size=64`} 
                alt={`${selectedEmployee.firstName} ${selectedEmployee.lastName}`} 
              />
              <div>
                <h3 className="text-lg font-medium text-white">
                  {selectedEmployee.firstName} {selectedEmployee.lastName}
                </h3>
                <p className="text-sm text-gray-400">{selectedEmployee.designation}</p>
                <StatusBadge status={selectedEmployee.status} />
              </div>
            </div>
            
            {isEditing ? (
              <form onSubmit={(e) => { e.preventDefault(); handleSaveEmployee(); }} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-2">First Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                      value={editForm.firstName}
                      onChange={(e) => setEditForm(prev => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-2">Last Name</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                      value={editForm.lastName}
                      onChange={(e) => setEditForm(prev => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-2">Email</label>
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                      value={editForm.email}
                      onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-2">Phone</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                      value={editForm.phone}
                      onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-2">Department</label>
                    <select
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                      value={editForm.department}
                      onChange={(e) => setEditForm(prev => ({ ...prev, department: e.target.value }))}
                    >
                      {departments.map(dept => (
                        <option key={dept} value={dept}>{dept}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-2">Designation</label>
                    <select
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                      value={editForm.designation}
                      onChange={(e) => setEditForm(prev => ({ ...prev, designation: e.target.value }))}
                    >
                      {designations.map(desig => (
                        <option key={desig} value={desig}>{desig}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-2">Status</label>
                    <select
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                      value={editForm.status}
                      onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value }))}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                      <option value="on-leave">On Leave</option>
                      <option value="probation">Probation</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-300 mb-2">Salary</label>
                    <input
                      type="number"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                      value={editForm.salary}
                      onChange={(e) => setEditForm(prev => ({ ...prev, salary: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2">Address</label>
                  <textarea
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                    rows={2}
                    value={editForm.address}
                    onChange={(e) => setEditForm(prev => ({ ...prev, address: e.target.value }))}
                  />
                </div>
                
                <div className="flex justify-end space-x-3 pt-6">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-6 py-2.5 text-sm font-medium text-gray-300 bg-gray-700/50 border border-gray-600 rounded-lg hover:bg-gray-700 transition-all duration-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-blue-400" />
                      <div>
                        <p className="text-xs text-gray-400">Email</p>
                        <p className="text-sm font-medium text-white">{selectedEmployee.email}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-blue-400" />
                      <div>
                        <p className="text-xs text-gray-400">Phone</p>
                        <p className="text-sm font-medium text-white">{selectedEmployee.phone}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Building className="w-4 h-4 text-blue-400" />
                      <div>
                        <p className="text-xs text-gray-400">Department</p>
                        <p className="text-sm font-medium text-white">{selectedEmployee.department}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Users className="w-4 h-4 text-blue-400" />
                      <div>
                        <p className="text-xs text-gray-400">Designation</p>
                        <p className="text-sm font-medium text-white">{selectedEmployee.designation}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-4 h-4 text-blue-400" />
                      <div>
                        <p className="text-xs text-gray-400">Join Date</p>
                        <p className="text-sm font-medium text-white">{selectedEmployee.joinDate}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <MapPin className="w-4 h-4 text-blue-400" />
                      <div>
                        <p className="text-xs text-gray-400">Address</p>
                        <p className="text-sm font-medium text-white">{selectedEmployee.address}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-blue-400" />
                      <div>
                        <p className="text-xs text-gray-400">Emergency Contact</p>
                        <p className="text-sm font-medium text-white">{selectedEmployee.emergencyContact}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <div className="w-4 h-4 text-center text-blue-400">$</div>
                      <div>
                        <p className="text-xs text-gray-400">Salary</p>
                        <p className="text-sm font-medium text-white">${selectedEmployee.salary?.toLocaleString()}</p>
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

  if (loading) {
    return (
      <div className="min-h-screen bg-black relative overflow-hidden">
        <CosmicBackground />
        <div className="relative z-10 flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 shadow-lg shadow-blue-500/25"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* <CosmicBackground /> */}
      
      {/* Main Content */}
      <div className="relative z-10 p-6 ml-0 "> {/* Assuming sidebar width of 280px (18rem) */}
        <ToastContainer {...toastConfig} />
        
        {/* Header with carousel */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
          <div className="lg:col-span-2 bg-gray-900/80 backdrop-blur-lg rounded-xl border border-gray-700/50 p-6 hover:border-blue-500/50 transition-all duration-300">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl opacity-50" />
            <div className="relative">
              <div className="flex items-center mb-2">
                {/* <img 
                  src="https://naxrita.com/wp-content/uploads/2024/10/logo-t.png" 
                  alt="naxrita Logo" 
                  className="h-8 w-auto mr-3"
                /> */}
                <div>
                  <h1 className="text-2xl font-bold text-white">Employee Management</h1>
                  <p className="text-sm text-gray-400 mt-1">Manage your organization's employees and their details</p>
                </div>
              </div>
            </div>
          </div>
          
          <AnnouncementCarousel />
        </div>

        {/* Action Buttons */}
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-xl border border-gray-700/50 p-4 mb-6">
          <div className="flex flex-wrap gap-3 justify-end">
            <button
              onClick={loadEmployees}
              className="inline-flex items-center px-4 py-2.5 border border-gray-600 rounded-lg text-sm font-medium text-gray-300 bg-gray-800/50 hover:bg-gray-700 hover:border-gray-500 transition-all duration-200"
            >
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </button>
            <button
              onClick={() => setShowAddModal(true)}
              className="inline-flex items-center px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-200"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Employee
            </button>
            <label className="inline-flex items-center px-4 py-2.5 border border-gray-600 rounded-lg text-sm font-medium text-gray-300 bg-gray-800/50 hover:bg-gray-700 hover:border-gray-500 cursor-pointer transition-all duration-200">
              <Upload className="w-4 h-4 mr-2" />
              Import Excel
              <input type="file" className="sr-only" onChange={handleFileUpload} accept=".xlsx,.xls,.csv" />
            </label>
            <button className="inline-flex items-center px-4 py-2.5 border border-gray-600 rounded-lg text-sm font-medium text-gray-300 bg-gray-800/50 hover:bg-gray-700 hover:border-gray-500 transition-all duration-200">
              <Download className="w-4 h-4 mr-2" />
              Export
            </button>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedEmployees.length > 0 && (
          <div className="bg-blue-900/50 backdrop-blur-lg border border-blue-600/50 rounded-xl p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center">
              <span className="text-sm text-blue-200">
                {selectedEmployees.length} employee{selectedEmployees.length !== 1 ? 's' : ''} selected
              </span>
              <button 
                onClick={() => setSelectedEmployees([])}
                className="ml-3 text-blue-300 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleBulkAction('activate')}
                className="px-3 py-1.5 text-xs font-medium text-green-300 bg-green-900/30 rounded-md hover:bg-green-800/40 transition-colors"
              >
                Activate
              </button>
              <button
                onClick={() => handleBulkAction('deactivate')}
                className="px-3 py-1.5 text-xs font-medium text-yellow-300 bg-yellow-900/30 rounded-md hover:bg-yellow-800/40 transition-colors"
              >
                Deactivate
              </button>
              <button
                onClick={() => handleBulkAction('export')}
                className="px-3 py-1.5 text-xs font-medium text-blue-300 bg-blue-900/30 rounded-md hover:bg-blue-800/40 transition-colors"
              >
                Export
              </button>
              <button
                onClick={() => handleBulkAction('delete')}
                className="px-3 py-1.5 text-xs font-medium text-red-300 bg-red-900/30 rounded-md hover:bg-red-800/40 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        )}

        {/* Search and Filters */}
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-xl border border-gray-700/50 p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search employees..."
                className="pl-10 pr-4 py-2.5 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent w-80 backdrop-blur-sm transition-all duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="inline-flex items-center px-4 py-2.5 border border-gray-600 rounded-lg text-sm font-medium text-gray-300 bg-gray-800/50 hover:bg-gray-700 hover:border-gray-500 transition-all duration-200"
            >
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </button>
          </div>
          
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-700/50">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2">Department</label>
                  <select
                    className="w-full px-3 py-2.5 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                  >
                    <option value="all">All Departments</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-300 mb-2">Status</label>
                  <select
                    className="w-full px-3 py-2.5 bg-gray-800/50 border border-gray-600 rounded-lg text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent backdrop-blur-sm transition-all duration-200"
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="on-leave">On Leave</option>
                    <option value="probation">Probation</option>
                  </select>
                </div>
                
                <div className="flex items-end space-x-2">
                  <button
                    onClick={() => {
                      setSelectedDepartment('all');
                      setSelectedStatus('all');
                    }}
                    className="px-4 py-2.5 text-sm font-medium text-gray-300 bg-gray-700/50 border border-gray-600 rounded-lg hover:bg-gray-700 hover:border-gray-500 transition-all duration-200"
                  >
                    Reset
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Employees Table */}
        <div className="bg-gray-900/80 backdrop-blur-lg rounded-xl border border-gray-700/50 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700/50">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="w-12 px-6 py-4">
                    <input
                      type="checkbox"
                      className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                      checked={selectedEmployees.length > 0 && selectedEmployees.length === filteredEmployees.length}
                      onChange={toggleSelectAll}
                    />
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Employee
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Designation
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900/50 divide-y divide-gray-700/50">
                {filteredEmployees.length > 0 ? (
                  filteredEmployees.map((employee) => (
                    <tr 
                      key={employee.id} 
                      className={`${
                        selectedEmployees.includes(employee.id) 
                          ? 'bg-blue-900/30 border-blue-500/30' 
                          : 'hover:bg-gray-800/50'
                      } transition-all duration-200`}
                    >
                      <td className="w-12 px-6 py-4">
                        <input
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 rounded focus:ring-blue-500 focus:ring-2"
                          checked={selectedEmployees.includes(employee.id)}
                          onChange={() => toggleEmployeeSelection(employee.id)}
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <img 
                            className="w-10 h-10 rounded-full border-2 border-blue-500/30" 
                            src={`https://ui-avatars.com/api/?name=${employee.firstName}+${employee.lastName}&background=2563eb&color=ffffff&size=40`} 
                            alt={`${employee.firstName} ${employee.lastName}`} 
                          />
                          <div className="ml-4">
                            <div className="text-sm font-medium text-white">
                              {employee.firstName} {employee.lastName}
                            </div>
                            <div className="text-xs text-gray-400">{employee.email}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                        {employee.employeeId}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {employee.department}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                        {employee.designation}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <StatusBadge status={employee.status} />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => handleViewEmployee(employee)}
                            className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-900/30 rounded-lg transition-all duration-200"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => {
                              setSelectedEmployee(employee);
                              setEditForm(employee);
                              setIsEditing(true);
                              setShowViewModal(true);
                            }}
                            className="p-2 text-green-400 hover:text-green-300 hover:bg-green-900/30 rounded-lg transition-all duration-200"
                          >
                            <Pencil className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(employee.id)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-900/30 rounded-lg transition-all duration-200"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="px-6 py-12 text-center">
                      <div className="text-gray-400">
                        <Users className="mx-auto h-12 w-12 text-gray-600 mb-4" />
                        <h3 className="text-sm font-medium text-gray-300 mb-1">No employees found</h3>
                        <p className="text-xs text-gray-500">Try adjusting your search or filter criteria</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          
          {/* Pagination */}
          {filteredEmployees.length > 0 && (
            <div className="bg-gray-800/50 px-4 py-3 border-t border-gray-700/50 sm:px-6">
              <div className="flex items-center justify-between">
                <div className="flex-1 flex justify-between sm:hidden">
                  <button className="relative inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700 transition-colors">
                    Previous
                  </button>
                  <button className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-600 text-sm font-medium rounded-md text-gray-300 bg-gray-800 hover:bg-gray-700 transition-colors">
                    Next
                  </button>
                </div>
                <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                  <div>
                    <p className="text-xs text-gray-400">
                      Showing <span className="font-medium text-white">1</span> to{' '}
                      <span className="font-medium text-white">{Math.min(10, filteredEmployees.length)}</span> of{' '}
                      <span className="font-medium text-white">{filteredEmployees.length}</span> results
                    </p>
                  </div>
                  <div>
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                      <button className="relative inline-flex items-center px-3 py-2 rounded-l-md border border-gray-600 bg-gray-800 text-xs font-medium text-gray-300 hover:bg-gray-700 transition-colors">
                        Previous
                      </button>
                      <button className="relative inline-flex items-center px-4 py-2 border border-gray-600 bg-blue-900/50 text-xs font-medium text-blue-300">
                        1
                      </button>
                      <button className="relative inline-flex items-center px-3 py-2 rounded-r-md border border-gray-600 bg-gray-800 text-xs font-medium text-gray-300 hover:bg-gray-700 transition-colors">
                        Next
                      </button>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modals */}
        <AddEmployeeModal />
        <ViewEmployeeModal />
      </div>
    </div>
  );
};

// Required CSS for animations (add this to your global CSS)
const styles = `
@keyframes twinkle {
  0%, 100% { opacity: 0.2; }
  50% { opacity: 0.8; }
}

@keyframes float {
  0% { transform: translateY(0) rotate(0deg); opacity: 0; }
  10% { opacity: 1; }
  90% { opacity: 1; }
  100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
}

@keyframes pulse {
  0%, 100% { transform: scale(1); opacity: 0.3; }
  50% { transform: scale(1.2); opacity: 0.8; }
}

@keyframes drift {
  0% { transform: translate(0, 0); }
  100% { transform: translate(50px, -50px); }
}

.star {
  position: absolute;
  width: 2px;
  height: 2px;
  background: #ffffff;
  border-radius: 50%;
  animation: twinkle 3s ease-in-out infinite alternate;
}

.sparkle {
  position: absolute;
  width: 4px;
  height: 4px;
  background: #2563eb;
  border-radius: 50%;
  animation: float 8s linear infinite;
}

.floating-dot {
  position: absolute;
  width: 2px;
  height: 2px;
  background: rgba(37, 99, 235, 0.3);
  border-radius: 50%;
  animation: pulse 4s ease-in-out infinite, drift 15s linear infinite;
}

.starfield, .sparkles, .floating-dots {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

/* Custom scrollbar for dark theme */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #1a1a1a;
}

::-webkit-scrollbar-thumb {
  background: #404040;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555555;
}

/* Reduce motion for accessibility */
@media (prefers-reduced-motion: reduce) {
  .star, .sparkle, .floating-dot {
    animation: none;
  }
}
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}

export default EmployeeManagement;
