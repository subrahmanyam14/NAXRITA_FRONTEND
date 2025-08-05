import {
  AlertCircle,
  Award,
  Badge,
  Bell,
  Briefcase,
  Building2,
  Calendar,
  Camera,
  CheckCircle,
  ChevronLeft, 
  ChevronRight,
  Clock,
  Edit3,
  Eye,
  EyeOff,
  Mail,
  MapPin, 
  Phone,
  Plus,
  Save,
  Star, 
  Target,
  User,
  X,
  Zap,
  Lock,
  Shield
} from 'lucide-react';
import { useEffect, useState } from 'react';

// Enhanced API functions
const api = {
  // Employee APIs
  getEmployee: async () => {
    const response = await fetch('http://localhost:5000/api/employees/employee', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
    return result.data;
  },

  // Personal Details APIs
  getPersonalDetails: async () => {
    const response = await fetch('http://localhost:5000/api/personalDetails/individual', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
    return result.success ? result.data : null;
  },

  createPersonalDetails: async (data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });

    const response = await fetch('http://localhost:5000/api/personalDetails/individual', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });
    return await response.json();
  },

  updatePersonalDetails: async (id, data) => {
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });

    const response = await fetch(`http://localhost:5000/api/personalDetails/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
    });
    return await response.json();
  },

  // Job Details APIs
  getJobDetails: async () => {
    const response = await fetch('http://localhost:5000/api/jobDetails/employee', {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`,
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
    return result.data;
  },

  // Password Update API (dummy endpoint)
  updatePassword: async (passwordData) => {
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
    return { success: true, message: 'Password updated successfully' };
  },

  getAnnouncements: () => [
    {
      title: 'Q4 Performance Review Cycle',
      content: 'Annual performance reviews begin next week. Please complete your self-assessment by Friday.',
      date: '2 days ago'
    },
    {
      title: 'New AI Tools Integration',
      content: 'Exciting news! We are launching new AI-powered productivity tools across all departments.',
      date: '1 week ago'
    },
    {
      title: 'Team Building Event',
      content: 'Join us for our quarterly team building event this Friday at 4 PM in the main conference room.',
      date: '3 days ago'
    }
  ]
};

// Starfield Background Component
const StarfieldBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="star"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${Math.random() * 3 + 2}s`
          }}
        />
      ))}
      {[...Array(20)].map((_, i) => (
        <div
          key={`sparkle-${i}`}
          className="sparkle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 10}s`,
            animationDuration: `${Math.random() * 10 + 10}s`
          }}
        />
      ))}
    </div>
  );
};

// Password Update Modal Component
const PasswordUpdateModal = ({ isOpen, onClose, onUpdate }) => {
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match');
      return;
    }
    
    setLoading(true);
    try {
      await onUpdate(passwordData);
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
      onClose();
    } catch (error) {
      console.error('Password update failed:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] p-6 w-full max-w-md mx-4 animate-in fade-in zoom-in duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb]/10 to-transparent rounded-xl" />
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-light text-white flex items-center space-x-3">
              <Lock className="h-5 w-5 text-[#2563eb]" />
              <span>Update Password</span>
            </h3>
            <button
              onClick={onClose}
              className="text-[#a3a3a3] hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-light text-[#a3a3a3] mb-2">Current Password</label>
              <div className="relative">
                <input
                  type={showPasswords.current ? 'text' : 'password'}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  className="w-full px-4 py-3 pr-12 bg-[#161616] border border-[#404040] rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-white font-light"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#a3a3a3] hover:text-white"
                >
                  {showPasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-light text-[#a3a3a3] mb-2">New Password</label>
              <div className="relative">
                <input
                  type={showPasswords.new ? 'text' : 'password'}
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                  className="w-full px-4 py-3 pr-12 bg-[#161616] border border-[#404040] rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-white font-light"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#a3a3a3] hover:text-white"
                >
                  {showPasswords.new ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-light text-[#a3a3a3] mb-2">Confirm New Password</label>
              <div className="relative">
                <input
                  type={showPasswords.confirm ? 'text' : 'password'}
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full px-4 py-3 pr-12 bg-[#161616] border border-[#404040] rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-white font-light"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#a3a3a3] hover:text-white"
                >
                  {showPasswords.confirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="flex space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-3 text-sm font-light text-[#a3a3a3] bg-transparent border border-[#404040] rounded-lg hover:text-white hover:border-white transition-all duration-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-4 py-3 text-sm font-light text-white bg-[#2563eb] rounded-lg hover:bg-[#1d4ed8] transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Updating...</span>
                  </>
                ) : (
                  <>
                    <Shield className="h-4 w-4" />
                    <span>Update Password</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Confirmation Modal Component
const ConfirmationModal = ({ isOpen, onClose, onConfirm, title, message, type = 'warning' }) => {
  if (!isOpen) return null;

  const typeStyles = {
    warning: 'from-[#f59e0b]/10 to-transparent border-[#f59e0b]/20',
    success: 'from-[#22c55e]/10 to-transparent border-[#22c55e]/20',
    danger: 'from-[#ef4444]/10 to-transparent border-[#ef4444]/20'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className={`relative bg-[#1e1e1e] rounded-xl border p-6 w-full max-w-md mx-4 animate-in fade-in zoom-in duration-300 ${typeStyles[type]}`}>
        <div className="text-center">
          <h3 className="text-lg font-light text-white mb-3">{title}</h3>
          <p className="text-sm font-light text-[#a3a3a3] mb-6">{message}</p>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 text-sm font-light text-[#a3a3a3] bg-transparent border border-[#404040] rounded-lg hover:text-white hover:border-white transition-all duration-300"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-4 py-2 text-sm font-light text-white bg-[#2563eb] rounded-lg hover:bg-[#1d4ed8] transition-all duration-300"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Component
const CosmicProfileDashboard = () => {
  const [employeeData, setEmployeeData] = useState(null);
  const [personalData, setPersonalData] = useState(null);
  const [jobData, setJobData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editPersonalData, setEditPersonalData] = useState({});
  const [activeSection, setActiveSection] = useState('personal');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [announcements] = useState(api.getAnnouncements());
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [confirmationData, setConfirmationData] = useState({});

  useEffect(() => {
    loadAllData();
  }, []);

  const loadAllData = async () => {
    try {
      setLoading(true);
      const [employee, personal, job] = await Promise.all([
        api.getEmployee(),
        api.getPersonalDetails(),
        api.getJobDetails()
      ]);
      
      setEmployeeData(employee);
      setPersonalData(personal);
      setJobData(job);
      
      if (personal) {
        setEditPersonalData(personal);
      }
    } catch (error) {
      showNotification('Failed to load profile data', 'error');
    } finally {
      setLoading(false);
    }
  };

  const savePersonalDetails = async () => {
    try {
      setSaving(true);
      let result;
      
      if (personalData && personalData.id) {
        result = await api.updatePersonalDetails(personalData.id, editPersonalData);
      } else {
        result = await api.createPersonalDetails({
          ...editPersonalData,
          individual_data_id: employeeData.id
        });
      }
      
      if (result.success) {
        setPersonalData(editPersonalData);
        setEditMode(false);
        showNotification('Personal details saved successfully!', 'success');
        await loadAllData(); // Reload data
      } else {
        throw new Error(result.message || 'Failed to save');
      }
    } catch (error) {
      showNotification('Failed to save personal details', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordUpdate = async (passwordData) => {
    setConfirmationData({
      title: 'Update Password',
      message: 'Are you sure you want to update your password?',
      type: 'warning',
      onConfirm: async () => {
        try {
          await api.updatePassword(passwordData);
          showNotification('Password updated successfully!', 'success');
          setShowPasswordModal(false);
        } catch (error) {
          showNotification('Failed to update password', 'error');
        }
        setShowConfirmationModal(false);
      }
    });
    setShowConfirmationModal(true);
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const updatePersonalField = (field, value) => {
    setEditPersonalData(prev => ({ ...prev, [field]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setEditPersonalData(prev => ({ ...prev, profile_pic: file }));
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center relative overflow-hidden">
        <StarfieldBackground />
        <div className="text-center relative z-10">
          <div className="w-16 h-16 border-4 border-[#2563eb]/30 border-t-[#2563eb] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg font-light text-[#a3a3a3]">Loading your cosmic profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative overflow-hidden">
      <StarfieldBackground />
      
      <style jsx>{`
        .star {
          position: absolute;
          background: #ffffff;
          border-radius: 50%;
          animation: twinkle ease-in-out infinite alternate;
        }
        
        .sparkle {
          position: absolute;
          width: 4px;
          height: 4px;
          background: #2563eb;
          border-radius: 50%;
          animation: float linear infinite;
        }
        
        @keyframes twinkle {
          0% { opacity: 0.2; }
          100% { opacity: 0.8; }
        }
        
        @keyframes float {
          0% { 
            transform: translateY(100vh) rotate(0deg); 
            opacity: 0; 
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { 
            transform: translateY(-100px) rotate(360deg); 
            opacity: 0; 
          }
        }
        
        .cosmic-glow {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
        }
        
        .hover-lift {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .hover-lift:hover {
          transform: translateY(-4px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.9), 0 0 20px rgba(59, 130, 246, 0.2);
        }

        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes zoom-in {
          from { transform: scale(0.9); }
          to { transform: scale(1); }
        }

        .animate-in {
          animation: fade-in 0.3s ease-out, zoom-in 0.3s ease-out;
        }
      `}</style>

      {/* Notification Toast */}
      {notification.show && (
        <div className={`fixed top-6 right-6 z-50 p-4 rounded-lg shadow-lg flex items-center space-x-3 backdrop-blur-lg border ${
          notification.type === 'success' 
            ? 'bg-[#22c55e]/90 text-white border-[#22c55e]/20' 
            : 'bg-[#ef4444]/90 text-white border-[#ef4444]/20'
        }`}>
          {notification.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
          <span className="font-light">{notification.message}</span>
        </div>
      )}

      {/* Password Update Modal */}
      <PasswordUpdateModal
        isOpen={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        onUpdate={handlePasswordUpdate}
      />

      {/* Confirmation Modal */}
      <ConfirmationModal
        isOpen={showConfirmationModal}
        onClose={() => setShowConfirmationModal(false)}
        onConfirm={confirmationData.onConfirm}
        title={confirmationData.title}
        message={confirmationData.message}
        type={confirmationData.type}
      />

      {/* Main Content */}
      <div className="transition-all duration-300">
        {/* Header */}
        <div className="bg-[#0a0a0a]/90 backdrop-blur-lg border-b border-[#2a2a2a] sticky top-0 z-40">
          <div className="px-8 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-2xl font-light text-[#ffffff]">Cosmic Profile Dashboard</h1>
                <p className="text-sm font-light text-[#6b7280] mt-1">Manage your stellar information</p>
              </div>
              
              <div className="flex items-center space-x-3">
                {editMode ? (
                  <>
                    <button
                      onClick={() => setEditMode(false)}
                      className="px-4 py-2 text-sm font-light text-[#a3a3a3] bg-transparent border border-[#404040] rounded-lg hover:text-[#ffffff] hover:border-[#ffffff] transition-all duration-300"
                    >
                      <X className="h-4 w-4 mr-2 inline" />
                      Cancel
                    </button>
                    <button
                      onClick={savePersonalDetails}
                      disabled={saving}
                      className="px-4 py-2 text-sm font-light text-white bg-[#2563eb] rounded-lg hover:bg-[#1d4ed8] transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] disabled:opacity-50 flex items-center space-x-2"
                    >
                      {saving ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Saving...</span>
                        </>
                      ) : (
                        <>
                          <Save className="h-4 w-4" />
                          <span>Save Changes</span>
                        </>
                      )}
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-4 py-2 text-sm font-light text-white bg-[#2563eb] rounded-lg hover:bg-[#1d4ed8] transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center space-x-2"
                  >
                    <Edit3 className="h-4 w-4" />
                    <span>Edit Profile</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6 relative z-10">
          {/* Profile Header Card */}
          <div className="bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] p-6 hover-lift backdrop-blur-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb]/5 to-transparent rounded-xl"></div>
            <div className="relative z-10">
              <div className="flex items-center space-x-6">
                <div className="relative group">
                  <img
                    src={personalData?.profile_pic || 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face'}
                    alt={employeeData?.employee_name || 'Profile'}
                    className="w-24 h-24 rounded-xl object-cover border-2 border-[#2563eb]/50 transition-all duration-300 group-hover:border-[#2563eb]"
                  />
                  {editMode && (
                    <label className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#2563eb] text-white rounded-full flex items-center justify-center hover:bg-[#1d4ed8] transition-colors shadow-lg cursor-pointer">
                      <Camera className="h-4 w-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileChange}
                        className="hidden"
                      />
                    </label>
                  )}
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#22c55e] rounded-full border-2 border-[#1e1e1e] flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-light text-[#ffffff] mb-1">
                        {personalData?.gender ? `${personalData.gender} Employee` : employeeData?.employee_name || 'Employee Name'}
                      </h2>
                      <p className="text-lg font-light text-[#a3a3a3] mb-2">
                        {jobData?.job || employeeData?.job_profile_progression_model_designation || 'Position'}
                      </p>
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-2 text-sm font-light text-[#6b7280]">
                          <Building2 className="h-4 w-4 text-[#2563eb]" />
                          <span>{employeeData?.department_name || 'Department'}</span>
                        </span>
                        <span className="flex items-center space-x-2 text-sm font-light text-[#6b7280]">
                          <Calendar className="h-4 w-4 text-[#2563eb]" />
                          <span>Since {employeeData?.joining_date ? new Date(employeeData.joining_date).getFullYear() : 'N/A'}</span>
                        </span>
                        <span className="flex items-center space-x-2 text-sm font-light text-[#6b7280]">
                          <MapPin className="h-4 w-4 text-[#2563eb]" />
                          <span>{jobData?.location || personalData?.address || 'Location'}</span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className="px-3 py-1 bg-[#22c55e]/20 text-[#22c55e] text-sm font-light rounded-full border border-[#22c55e]/30 cosmic-glow">
                        {employeeData?.status || 'Active'}
                      </span>
                      <span className="px-3 py-1 bg-[#2563eb]/20 text-[#2563eb] text-sm font-light rounded-full border border-[#2563eb]/30">
                        {employeeData?.employee_id || 'ID'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] p-2 backdrop-blur-lg">
            <div className="flex space-x-2">
              {[
                { id: 'personal', label: 'Personal Info', icon: User },
                { id: 'job', label: 'Job Details', icon: Briefcase },
                { id: 'security', label: 'Security', icon: Shield }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveSection(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-sm font-light rounded-lg transition-all duration-300 backdrop-blur-lg ${
                    activeSection === tab.id
                      ? 'bg-[#2563eb] text-[#ffffff] shadow-[0_0_20px_rgba(37,99,235,0.4)]'
                      : 'text-[#a3a3a3] hover:bg-[#111111] hover:text-[#ffffff]'
                  }`}
                >
                  <tab.icon className="h-4 w-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {activeSection === 'personal' && (
                <div className="bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] p-6 hover-lift backdrop-blur-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb]/5 to-transparent rounded-xl"></div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-light text-[#ffffff] mb-6 flex items-center space-x-3">
                      <User className="h-5 w-5 text-[#2563eb]" />
                      <span>Personal Information</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-light text-[#a3a3a3] mb-2">Gender</label>
                        {editMode ? (
                          <select
                            value={editPersonalData.gender || ''}
                            onChange={(e) => updatePersonalField('gender', e.target.value)}
                            className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-[#ffffff] font-light backdrop-blur-lg transition-all duration-300"
                          >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                        ) : (
                          <p className="text-lg font-light text-[#ffffff] bg-[#111111] px-4 py-3 rounded-lg border border-[#2a2a2a]">
                            {personalData?.gender || 'Not specified'}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-light text-[#a3a3a3] mb-2">Date of Birth</label>
                        {editMode ? (
                          <input
                            type="date"
                            value={editPersonalData.date_of_birth ? editPersonalData.date_of_birth.split('T')[0] : ''}
                            onChange={(e) => updatePersonalField('date_of_birth', e.target.value)}
                            className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-[#ffffff] font-light backdrop-blur-lg"
                          />
                        ) : (
                          <p className="text-lg font-light text-[#ffffff] bg-[#111111] px-4 py-3 rounded-lg border border-[#2a2a2a]">
                            {personalData?.date_of_birth ? new Date(personalData.date_of_birth).toLocaleDateString() : 'Not specified'}
                          </p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-light text-[#a3a3a3] mb-2">Email Address</label>
                        {editMode ? (
                          <input
                            type="email"
                            value={editPersonalData.email || ''}
                            onChange={(e) => updatePersonalField('email', e.target.value)}
                            className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-[#ffffff] font-light backdrop-blur-lg"
                          />
                        ) : (
                          <div className="flex items-center space-x-3 bg-[#111111] px-4 py-3 rounded-lg border border-[#2a2a2a]">
                            <Mail className="h-4 w-4 text-[#2563eb]" />
                            <span className="text-lg font-light text-[#ffffff]">
                              {personalData?.email || employeeData?.email || 'Not specified'}
                            </span>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-light text-[#a3a3a3] mb-2">Phone Number</label>
                        {editMode ? (
                          <input
                            type="tel"
                            value={editPersonalData.mobile || ''}
                            onChange={(e) => updatePersonalField('mobile', e.target.value)}
                            className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-[#ffffff] font-light backdrop-blur-lg"
                          />
                        ) : (
                          <div className="flex items-center space-x-3 bg-[#111111] px-4 py-3 rounded-lg border border-[#2a2a2a]">
                            <Phone className="h-4 w-4 text-[#2563eb]" />
                            <span className="text-lg font-light text-[#ffffff]">
                              {personalData?.mobile || 'Not specified'}
                            </span>
                          </div>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-light text-[#a3a3a3] mb-2">Nationality</label>
                        {editMode ? (
                          <input
                            type="text"
                            value={editPersonalData.nationality || ''}
                            onChange={(e) => updatePersonalField('nationality', e.target.value)}
                            className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-[#ffffff] font-light backdrop-blur-lg"
                          />
                        ) : (
                          <p className="text-lg font-light text-[#ffffff] bg-[#111111] px-4 py-3 rounded-lg border border-[#2a2a2a]">
                            {personalData?.nationality || 'Not specified'}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-light text-[#a3a3a3] mb-2">Marital Status</label>
                        {editMode ? (
                          <select
                            value={editPersonalData.marital_status || ''}
                            onChange={(e) => updatePersonalField('marital_status', e.target.value)}
                            className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-[#ffffff] font-light backdrop-blur-lg"
                          >
                            <option value="">Select Status</option>
                            <option value="Single">Single</option>
                            <option value="Married">Married</option>
                            <option value="Divorced">Divorced</option>
                            <option value="Widowed">Widowed</option>
                          </select>
                        ) : (
                          <p className="text-lg font-light text-[#ffffff] bg-[#111111] px-4 py-3 rounded-lg border border-[#2a2a2a]">
                            {personalData?.marital_status || 'Not specified'}
                          </p>
                        )}
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-light text-[#a3a3a3] mb-2">Address</label>
                        {editMode ? (
                          <textarea
                            value={editPersonalData.address || ''}
                            onChange={(e) => updatePersonalField('address', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-[#ffffff] font-light backdrop-blur-lg resize-none"
                          />
                        ) : (
                          <p className="text-lg font-light text-[#ffffff] bg-[#111111] px-4 py-3 rounded-lg border border-[#2a2a2a] leading-relaxed">
                            {personalData?.address || 'Not specified'}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-light text-[#a3a3a3] mb-2">PAN ID</label>
                        {editMode ? (
                          <input
                            type="text"
                            value={editPersonalData.pan_id || ''}
                            onChange={(e) => updatePersonalField('pan_id', e.target.value)}
                            className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-[#ffffff] font-light backdrop-blur-lg"
                          />
                        ) : (
                          <p className="text-lg font-light text-[#ffffff] bg-[#111111] px-4 py-3 rounded-lg border border-[#2a2a2a]">
                            {personalData?.pan_id || 'Not specified'}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="block text-sm font-light text-[#a3a3a3] mb-2">Aadhar Number</label>
                        {editMode ? (
                          <input
                            type="text"
                            value={editPersonalData.adhaar || ''}
                            onChange={(e) => updatePersonalField('adhaar', e.target.value)}
                            className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-[#ffffff] font-light backdrop-blur-lg"
                          />
                        ) : (
                          <p className="text-lg font-light text-[#ffffff] bg-[#111111] px-4 py-3 rounded-lg border border-[#2a2a2a]">
                            {personalData?.adhaar || 'Not specified'}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'job' && (
                <div className="bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] p-6 hover-lift backdrop-blur-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb]/5 to-transparent rounded-xl"></div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-light text-[#ffffff] mb-6 flex items-center space-x-3">
                      <Briefcase className="h-5 w-5 text-[#2563eb]" />
                      <span>Job Information</span>
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-light text-[#a3a3a3] mb-2">Position</label>
                        <p className="text-lg font-light text-[#ffffff] bg-[#111111] px-4 py-3 rounded-lg border border-[#2a2a2a]">
                          {jobData?.job || employeeData?.job_profile_progression_model_designation || 'Not specified'}
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-light text-[#a3a3a3] mb-2">Business Title</label>
                        <p className="text-lg font-light text-[#ffffff] bg-[#111111] px-4 py-3 rounded-lg border border-[#2a2a2a]">
                          {jobData?.business_title || 'Not specified'}
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-light text-[#a3a3a3] mb-2">Department</label>
                        <p className="text-lg font-light text-[#ffffff] bg-[#111111] px-4 py-3 rounded-lg border border-[#2a2a2a]">
                          {employeeData?.department_name || 'Not specified'}
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-light text-[#a3a3a3] mb-2">Employee Type</label>
                        <p className="text-lg font-light text-[#ffffff] bg-[#111111] px-4 py-3 rounded-lg border border-[#2a2a2a]">
                          {employeeData?.employee_type || 'Not specified'}
                        </p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-light text-[#a3a3a3] mb-2">Work Schedule</label>
                        <div className="flex items-center space-x-3 bg-[#111111] px-4 py-3 rounded-lg border border-[#2a2a2a]">
                          <Clock className="h-4 w-4 text-[#2563eb]" />
                          <span className="text-lg font-light text-[#ffffff]">
                            {employeeData?.time_type || 'Full-time'} - {employeeData?.default_weekly_hours || '40'}hrs/week
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-light text-[#a3a3a3] mb-2">Location</label>
                        <div className="flex items-center space-x-3 bg-[#111111] px-4 py-3 rounded-lg border border-[#2a2a2a]">
                          <MapPin className="h-4 w-4 text-[#2563eb]" />
                          <span className="text-lg font-light text-[#ffffff]">
                            {jobData?.location || 'Not specified'}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-light text-[#a3a3a3] mb-2">Job Family</label>
                        <p className="text-lg font-light text-[#ffffff] bg-[#111111] px-4 py-3 rounded-lg border border-[#2a2a2a]">
                          {jobData?.job_family || 'Not specified'}
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-light text-[#a3a3a3] mb-2">Management Level</label>
                        <p className="text-lg font-light text-[#ffffff] bg-[#111111] px-4 py-3 rounded-lg border border-[#2a2a2a]">
                          {jobData?.management_level || 'Not specified'}
                        </p>
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-light text-[#a3a3a3] mb-2">Work Address</label>
                        <p className="text-lg font-light text-[#a3a3a3] bg-[#111111] px-4 py-3 rounded-lg border border-[#2a2a2a] leading-relaxed">
                          {jobData?.work_address || 'Not specified'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'security' && (
                <div className="bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] p-6 hover-lift backdrop-blur-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb]/5 to-transparent rounded-xl"></div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-light text-[#ffffff] mb-6 flex items-center space-x-3">
                      <Shield className="h-5 w-5 text-[#2563eb]" />
                      <span>Security Settings</span>
                    </h3>
                    
                    <div className="space-y-6">
                      <div className="p-6 bg-[#111111] rounded-lg border border-[#2a2a2a]">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-lg font-light text-[#ffffff] mb-2">Password</h4>
                            <p className="text-sm font-light text-[#a3a3a3]">
                              Update your password to keep your account secure
                            </p>
                          </div>
                          <button
                            onClick={() => setShowPasswordModal(true)}
                            className="px-4 py-2 text-sm font-light text-white bg-[#2563eb] rounded-lg hover:bg-[#1d4ed8] transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] flex items-center space-x-2"
                          >
                            <Lock className="h-4 w-4" />
                            <span>Update Password</span>
                          </button>
                        </div>
                      </div>

                      <div className="p-6 bg-[#111111] rounded-lg border border-[#2a2a2a]">
                        <div className="flex items-center justify-between">
                          <div>
                            <h4 className="text-lg font-light text-[#ffffff] mb-2">Account Status</h4>
                            <p className="text-sm font-light text-[#a3a3a3]">
                              Your account is currently active and secure
                            </p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-3 h-3 bg-[#22c55e] rounded-full"></div>
                            <span className="text-sm font-light text-[#22c55e]">Active</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Sidebar */}
            <div className="space-y-6">
              {/* Quick Stats */}
              <div className="bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] p-4 hover-lift backdrop-blur-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-[#f59e0b]/5 to-transparent rounded-xl"></div>
                <div className="relative z-10">
                  <h4 className="text-sm font-light text-[#ffffff] mb-4 flex items-center space-x-2">
                    <Star className="h-4 w-4 text-[#f59e0b]" />
                    <span>Profile Stats</span>
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-[#111111] rounded border border-[#2a2a2a]">
                      <span className="text-sm font-light text-[#a3a3a3]">Employee ID</span>
                      <span className="text-sm font-light text-[#ffffff] cosmic-glow">
                        {employeeData?.employee_id || 'N/A'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-[#111111] rounded border border-[#2a2a2a]">
                      <span className="text-sm font-light text-[#a3a3a3]">Status</span>
                      <span className="text-sm font-light text-[#22c55e] cosmic-glow">
                        {employeeData?.status || 'Active'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-[#111111] rounded border border-[#2a2a2a]">
                      <span className="text-sm font-light text-[#a3a3a3]">Type</span>
                      <span className="text-sm font-light text-[#2563eb] cosmic-glow">
                        {employeeData?.employee_type || 'N/A'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              {personalData?.emergency_contact_name && (
                <div className="bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] p-4 hover-lift backdrop-blur-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#ef4444]/5 to-transparent rounded-xl"></div>
                  <div className="relative z-10">
                    <h4 className="text-sm font-light text-[#ffffff] mb-4 flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-[#ef4444]" />
                      <span>Emergency Contact</span>
                    </h4>
                    
                    <div className="space-y-2 p-3 bg-[#111111] rounded-lg border border-[#2a2a2a]">
                      <p className="text-sm font-light text-[#ffffff]">{personalData.emergency_contact_name}</p>
                      <p className="text-sm font-light text-[#a3a3a3] flex items-center space-x-2">
                        <Phone className="h-3 w-3" />
                        <span>{personalData.emergency_contact_phone}</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CosmicProfileDashboard;
