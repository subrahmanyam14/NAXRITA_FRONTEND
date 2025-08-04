import React, { useState, useEffect } from 'react';
import { 
  User, MapPin, Phone, Mail, Briefcase, Calendar, 
  Edit3, Upload, Download, Trash2, Eye, Plus,
  Save, X, Camera, Award, Clock, Users, FileText,
  Settings, Star, Target, CheckCircle, AlertCircle,
  Zap, Badge, BookOpen, Building2, Shield, Database,
  Activity, BarChart2, TrendingUp, Globe, Lock,
  Command, Crown, Key, AlertTriangle, Clipboard
} from 'lucide-react';

// Enhanced API functions for admin profile
const adminApi = {
  getAdminProfile: async () => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      return {
        id: 'ADM2024001',
        name: 'Sarah Wilson',
        email: 'sarah.wilson@nexrita.com',
        phone: '+1 (555) 987-6543',
        address: '789 Executive Plaza, Corporate District, NY 10001',
        location: 'Corporate HQ - Executive Floor 42',
        profilePic: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
        joinDate: '2020-01-15',
        role: 'Chief Operations Officer',
        department: 'Executive Leadership',
        reportsTo: 'Robert Chen - CEO',
        directReports: 12,
        totalManaged: 156,
        authorityLevel: 'Executive',
        clearanceLevel: 'Level 5 - Confidential',
        skills: [
          'Strategic Leadership', 'Operations Management', 'Digital Transformation', 
          'Team Building', 'Budget Planning', 'Risk Management', 'Compliance',
          'Stakeholder Relations', 'Process Optimization', 'Change Management'
        ],
        jobDescription: 'Lead enterprise-wide operations, drive strategic initiatives, manage executive teams, and ensure organizational excellence across all departments.',
        contractType: 'Executive Agreement',
        experience: '8+ years in executive roles',
        education: 'MBA Operations, Wharton School',
        certifications: [
          'Certified Executive Leader (CEL)',
          'PMP - Project Management Professional', 
          'Six Sigma Black Belt',
          'ISO 27001 Lead Auditor',
          'Certified Risk Manager (CRM)'
        ],
        timezone: 'EST (UTC-5)',
        workSchedule: 'Executive Schedule - Flexible',
        activeProjects: [
          'Digital Transformation Initiative', 
          'Global Expansion Strategy',
          'AI Integration Program',
          'Sustainability Implementation',
          'Workforce Development 2024'
        ],
        permissions: [
          'Full System Administration',
          'Financial Management Access',
          'HR & Payroll Systems',
          'Security & Compliance',
          'Executive Reporting',
          'Multi-Department Override'
        ],
        managedDepartments: ['Operations', 'IT', 'HR', 'Finance', 'Security', 'Compliance'],
        budgetAuthority: '$15.2M Annual',
        performanceScore: 96,
        lastReview: '2024-01-15',
        emergencyContact: {
          name: 'David Wilson',
          relationship: 'Spouse',
          phone: '+1 (555) 123-8901'
        },
        executiveMetrics: {
          teamSatisfaction: 94,
          projectSuccessRate: 89,
          budgetEfficiency: 97,
          stakeholderRating: 4.8
        }
      };
    } catch (error) {
      throw new Error('Failed to fetch admin profile');
    }
  },

  updateAdminProfile: async (data) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      return { success: true, data };
    } catch (error) {
      throw new Error('Failed to update admin profile');
    }
  }
};

// Cosmic Background Component
const CosmicBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Starfield */}
      <div className="absolute inset-0">
        {[...Array(150)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 3 + 1}px`,
              height: `${Math.random() * 3 + 1}px`,
              backgroundColor: ['#ffffff', '#2563eb', '#a3a3a3', '#6b7280'][Math.floor(Math.random() * 4)],
              opacity: Math.random() * 0.6 + 0.2,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${Math.random() * 2 + 2}s`
            }}
          />
        ))}
      </div>

      {/* Floating Sparkles */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 2}px`,
              height: `${Math.random() * 4 + 2}px`,
              backgroundColor: ['#2563eb', '#22c55e', '#f59e0b', '#ffffff'][Math.floor(Math.random() * 4)],
              opacity: Math.random() * 0.4 + 0.1,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 4 + 6}s`,
              transform: `translateY(${Math.random() * 20}px)`
            }}
          />
        ))}
      </div>

      {/* Animated Dots */}
      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              backgroundColor: ['rgba(37, 99, 235, 0.3)', 'rgba(163, 163, 163, 0.2)', 'rgba(107, 114, 128, 0.1)'][Math.floor(Math.random() * 3)],
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          />
        ))}
      </div>

      {/* Nebula Clouds */}
      <div className="absolute inset-0">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full blur-[100px] animate-pulse"
            style={{
              left: `${Math.random() * 80}%`,
              top: `${Math.random() * 80}%`,
              width: `${Math.random() * 300 + 200}px`,
              height: `${Math.random() * 300 + 200}px`,
              backgroundColor: ['rgba(37, 99, 235, 0.05)', 'rgba(107, 114, 128, 0.03)'][Math.floor(Math.random() * 2)],
              animationDelay: `${Math.random() * 30}s`,
              animationDuration: `${Math.random() * 20 + 20}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

const NexritaAdminProfile = () => {
  const [profileData, setProfileData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editData, setEditData] = useState({});
  const [newSkill, setNewSkill] = useState('');
  const [activeSection, setActiveSection] = useState('overview');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    loadAdminProfile();
  }, []);

  const loadAdminProfile = async () => {
    try {
      setLoading(true);
      const data = await adminApi.getAdminProfile();
      setProfileData(data);
      setEditData(data);
    } catch (error) {
      showNotification('Failed to load admin profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    try {
      setSaving(true);
      await adminApi.updateAdminProfile(editData);
      setProfileData(editData);
      setEditMode(false);
      showNotification('Admin profile updated successfully!', 'success');
    } catch (error) {
      showNotification('Failed to save changes', 'error');
    } finally {
      setSaving(false);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const addSkill = () => {
    if (newSkill.trim() && !editData.skills.includes(newSkill.trim())) {
      setEditData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (skillToRemove) => {
    setEditData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const updateField = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] relative flex items-center justify-center">
        <CosmicBackground />
        <div className="text-center relative z-10">
          <div className="w-16 h-16 border-4 border-[#2a2a2a] border-t-[#2563eb] rounded-full animate-spin mx-auto mb-4 shadow-[0_0_20px_rgba(59,130,246,0.3)]"></div>
          <p className="text-sm font-light text-[#a3a3a3]">Loading executive profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] relative font-['Plus_Jakarta_Sans',system-ui,sans-serif]">
      <CosmicBackground />
      
      {/* Notification Toast */}
      {notification.show && (
        <div className={`fixed top-6 right-6 z-50 p-4 rounded-xl backdrop-blur-sm flex items-center space-x-3 border ${
          notification.type === 'success' 
            ? 'bg-[#1e1e1e]/90 text-[#22c55e] border-[#22c55e]/30 shadow-[0_0_20px_rgba(34,197,94,0.3)]' 
            : 'bg-[#1e1e1e]/90 text-[#ef4444] border-[#ef4444]/30 shadow-[0_0_20px_rgba(239,68,68,0.3)]'
        }`}>
          {notification.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
          <span className="text-sm font-light">{notification.message}</span>
        </div>
      )}

      {/* Executive Header */}
      <div className="bg-[#0a0a0a]/80 backdrop-blur-sm border-b border-[#2a2a2a] sticky top-0 z-40 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.8)]">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-light text-[#ffffff]">Nexrita Executive Dashboard</h1>
                <p className="text-xs font-thin text-[#2563eb]">Administrative Control Center</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {editMode ? (
                <>
                  <button
                    onClick={() => setEditMode(false)}
                    className="px-4 py-2 text-xs font-light text-[#a3a3a3] bg-[#1e1e1e] border border-[#404040] rounded-xl hover:bg-[#161616] hover:border-[#ffffff] hover:text-[#ffffff] transition-all flex items-center space-x-2 shadow-[0_1px_3px_0_rgba(0,0,0,0.8)] backdrop-blur-sm"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={saveProfile}
                    disabled={saving}
                    className="px-4 py-2 text-xs font-light text-white bg-[#2563eb] rounded-xl hover:bg-[#1d4ed8] hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all flex items-center space-x-2 disabled:opacity-50 shadow-[0_4px_12px_rgba(37,99,235,0.4)] transform hover:-translate-y-1"
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
                  className="px-4 py-2 text-xs font-light text-white bg-[#111111] rounded-xl hover:bg-[#1e1e1e] hover:shadow-[0_0_20px_rgba(59,130,246,0.15)] transition-all flex items-center space-x-2 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.8)] backdrop-blur-sm border border-[#2a2a2a] hover:border-[#404040] transform hover:-translate-y-1"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6 relative z-10">
        {/* Executive Profile Header */}
        <div className="bg-[#1e1e1e]/80 backdrop-blur-sm rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.9)] border border-[#2a2a2a] p-6 hover:border-[#404040] hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300 hover:-translate-y-1">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={profileData.profilePic}
                alt={profileData.name}
                className="w-24 h-24 rounded-2xl object-cover border-4 border-[#2563eb]/30 shadow-[0_0_20px_rgba(37,99,235,0.3)]"
              />
              {editMode && (
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#2563eb] text-white rounded-xl flex items-center justify-center hover:bg-[#1d4ed8] hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all shadow-[0_4px_6px_-1px_rgba(0,0,0,0.8)]">
                  <Camera className="h-4 w-4" />
                </button>
              )}
              <div className="absolute -top-2 -left-2">
                <div className="w-6 h-6 bg-gradient-to-r from-[#f59e0b] to-[#d97706] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(245,158,11,0.4)]">
                  <Crown className="h-3 w-3 text-white" />
                </div>
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-light text-[#ffffff] mb-1">{profileData.name}</h2>
                  <p className="text-lg font-thin text-[#2563eb] mb-2">{profileData.role}</p>
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="flex items-center space-x-2 text-xs font-thin text-[#a3a3a3]">
                      <Shield className="h-4 w-4 text-[#2563eb]" />
                      <span>{profileData.authorityLevel}</span>
                    </span>
                    <span className="flex items-center space-x-2 text-xs font-thin text-[#a3a3a3]">
                      <Users className="h-4 w-4 text-[#22c55e]" />
                      <span>{profileData.totalManaged} Employees</span>
                    </span>
                    <span className="flex items-center space-x-2 text-xs font-thin text-[#a3a3a3]">
                      <Calendar className="h-4 w-4 text-[#f59e0b]" />
                      <span>Since {new Date(profileData.joinDate).getFullYear()}</span>
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 bg-[#22c55e]/10 text-[#22c55e] text-xs font-light rounded-full border border-[#22c55e]/30 shadow-[0_0_10px_rgba(34,197,94,0.2)]">
                      Active Executive
                    </span>
                    <span className="px-3 py-1 bg-[#2563eb]/10 text-[#2563eb] text-xs font-light rounded-full border border-[#2563eb]/30 shadow-[0_0_10px_rgba(37,99,235,0.2)]">
                      {profileData.id}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs font-thin text-[#6b7280]">
                    <Lock className="h-3 w-3" />
                    <span>{profileData.clearanceLevel}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Executive Metrics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { label: 'Team Satisfaction', value: `${profileData.executiveMetrics.teamSatisfaction}%`, icon: Users, color: '#22c55e', bgColor: 'rgba(34, 197, 94, 0.1)', borderColor: 'rgba(34, 197, 94, 0.3)' },
            { label: 'Project Success', value: `${profileData.executiveMetrics.projectSuccessRate}%`, icon: Target, color: '#2563eb', bgColor: 'rgba(37, 99, 235, 0.1)', borderColor: 'rgba(37, 99, 235, 0.3)' },
            { label: 'Budget Efficiency', value: `${profileData.executiveMetrics.budgetEfficiency}%`, icon: TrendingUp, color: '#f59e0b', bgColor: 'rgba(245, 158, 11, 0.1)', borderColor: 'rgba(245, 158, 11, 0.3)' },
            { label: 'Stakeholder Rating', value: `${profileData.executiveMetrics.stakeholderRating}/5.0`, icon: Star, color: '#a855f7', bgColor: 'rgba(168, 85, 247, 0.1)', borderColor: 'rgba(168, 85, 247, 0.3)' }
          ].map((metric, idx) => (
            <div 
              key={idx} 
              className="bg-[#1e1e1e]/80 backdrop-blur-sm rounded-xl p-4 border shadow-[0_4px_6px_-1px_rgba(0,0,0,0.8)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.9)] hover:-translate-y-1 transition-all duration-300"
              style={{ 
                backgroundColor: metric.bgColor, 
                borderColor: metric.borderColor,
                boxShadow: `0 0 20px ${metric.color}20`
              }}
            >
              <div className="flex items-center justify-between mb-2">
                <metric.icon className="h-5 w-5" style={{ color: metric.color }} />
                <span className="text-xl font-light text-[#ffffff]">{metric.value}</span>
              </div>
              <p className="text-xs font-thin text-[#a3a3a3]">{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-[#1e1e1e]/80 backdrop-blur-sm rounded-xl shadow-[0_4px_6px_-1px_rgba(0,0,0,0.8)] border border-[#2a2a2a] p-2">
          <div className="flex space-x-2">
            {[
              { id: 'overview', label: 'Executive Overview', icon: Crown },
              { id: 'personal', label: 'Personal Details', icon: User },
              { id: 'authority', label: 'Authority & Access', icon: Shield },
              { id: 'performance', label: 'Performance', icon: BarChart2 },
              { id: 'projects', label: 'Strategic Projects', icon: Zap }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-xs font-light rounded-lg transition-all duration-300 ${
                  activeSection === tab.id
                    ? 'bg-[#2563eb]/20 text-[#2563eb] border border-[#2563eb]/30 shadow-[0_0_15px_rgba(37,99,235,0.3)]'
                    : 'text-[#a3a3a3] hover:bg-[#161616] hover:text-[#ffffff] hover:border hover:border-[#404040]'
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
            {activeSection === 'overview' && (
              <div className="space-y-6">
                {/* Executive Summary */}
                <div className="bg-[#1e1e1e]/80 backdrop-blur-sm rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.9)] border border-[#2a2a2a] p-6 hover:border-[#404040] hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300">
                  <h3 className="text-lg font-light text-[#ffffff] mb-4 flex items-center space-x-3">
                    <Crown className="h-5 w-5 text-[#2563eb]" />
                    <span>Executive Summary</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-normal text-[#6b7280] mb-2">Position & Authority</label>
                        <p className="text-sm font-light text-[#ffffff]">{profileData.role}</p>
                        <p className="text-xs font-thin text-[#2563eb]">{profileData.department}</p>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-normal text-[#6b7280] mb-2">Reports To</label>
                        <p className="text-sm font-light text-[#ffffff]">{profileData.reportsTo}</p>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-normal text-[#6b7280] mb-2">Budget Authority</label>
                        <p className="text-sm font-light text-[#22c55e]">{profileData.budgetAuthority}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-normal text-[#6b7280] mb-2">Direct Reports</label>
                        <p className="text-sm font-light text-[#ffffff]">{profileData.directReports} executives</p>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-normal text-[#6b7280] mb-2">Total Managed</label>
                        <p className="text-sm font-light text-[#2563eb]">{profileData.totalManaged} employees</p>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-normal text-[#6b7280] mb-2">Performance Score</label>
                        <p className="text-sm font-light text-[#22c55e]">{profileData.performanceScore}/100</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Managed Departments */}
                <div className="bg-[#1e1e1e]/80 backdrop-blur-sm rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.9)] border border-[#2a2a2a] p-6 hover:border-[#404040] hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300">
                  <h3 className="text-lg font-light text-[#ffffff] mb-4 flex items-center space-x-3">
                    <Building2 className="h-5 w-5 text-[#a855f7]" />
                    <span>Managed Departments</span>
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {profileData.managedDepartments.map((dept, idx) => (
                      <div key={idx} className="bg-[#161616] rounded-lg p-3 border border-[#2a2a2a] hover:border-[#a855f7]/30 hover:bg-[#a855f7]/5 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all duration-300">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-[#a855f7] rounded-full shadow-[0_0_8px_rgba(168,85,247,0.4)]"></div>
                          <span className="text-sm font-light text-[#ffffff]">{dept}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'personal' && (
              <div className="bg-[#1e1e1e]/80 backdrop-blur-sm rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.9)] border border-[#2a2a2a] p-6 hover:border-[#404040] hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300">
                <h3 className="text-lg font-light text-[#ffffff] mb-6 flex items-center space-x-3">
                  <User className="h-5 w-5 text-[#22c55e]" />
                  <span>Personal Information</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-normal text-[#6b7280] mb-2">Full Name</label>
                    {editMode ? (
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        className="w-full px-4 py-3 text-sm font-light bg-[#161616] border border-[#404040] rounded-lg focus:ring-2 focus:ring-[#22c55e] focus:border-transparent focus:shadow-[0_0_15px_rgba(34,197,94,0.3)] text-[#ffffff] placeholder-[#6b7280] backdrop-blur-sm transition-all"
                      />
                    ) : (
                      <p className="text-sm font-light text-[#ffffff] px-4 py-3 bg-[#161616] rounded-lg border border-[#2a2a2a]">{profileData.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-xs font-normal text-[#6b7280] mb-2">Executive Email</label>
                    {editMode ? (
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className="w-full px-4 py-3 text-sm font-light bg-[#161616] border border-[#404040] rounded-lg focus:ring-2 focus:ring-[#22c55e] focus:border-transparent focus:shadow-[0_0_15px_rgba(34,197,94,0.3)] text-[#ffffff] placeholder-[#6b7280] backdrop-blur-sm transition-all"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 px-4 py-3 bg-[#161616] rounded-lg border border-[#2a2a2a]">
                        <Mail className="h-4 w-4 text-[#22c55e]" />
                        <span className="text-sm font-light text-[#ffffff]">{profileData.email}</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-xs font-normal text-[#6b7280] mb-2">Direct Line</label>
                    {editMode ? (
                      <input
                        type="tel"
                        value={editData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className="w-full px-4 py-3 text-sm font-light bg-[#161616] border border-[#404040] rounded-lg focus:ring-2 focus:ring-[#22c55e] focus:border-transparent focus:shadow-[0_0_15px_rgba(34,197,94,0.3)] text-[#ffffff] placeholder-[#6b7280] backdrop-blur-sm transition-all"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 px-4 py-3 bg-[#161616] rounded-lg border border-[#2a2a2a]">
                        <Phone className="h-4 w-4 text-[#2563eb]" />
                        <span className="text-sm font-light text-[#ffffff]">{profileData.phone}</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-xs font-normal text-[#6b7280] mb-2">Executive Office</label>
                    {editMode ? (
                      <input
                        type="text"
                        value={editData.location}
                        onChange={(e) => updateField('location', e.target.value)}
                        className="w-full px-4 py-3 text-sm font-light bg-[#161616] border border-[#404040] rounded-lg focus:ring-2 focus:ring-[#22c55e] focus:border-transparent focus:shadow-[0_0_15px_rgba(34,197,94,0.3)] text-[#ffffff] placeholder-[#6b7280] backdrop-blur-sm transition-all"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 px-4 py-3 bg-[#161616] rounded-lg border border-[#2a2a2a]">
                        <MapPin className="h-4 w-4 text-[#f59e0b]" />
                        <span className="text-sm font-light text-[#ffffff]">{profileData.location}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-xs font-normal text-[#6b7280] mb-2">Corporate Address</label>
                    {editMode ? (
                      <textarea
                        value={editData.address}
                        onChange={(e) => updateField('address', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 text-sm font-light bg-[#161616] border border-[#404040] rounded-lg focus:ring-2 focus:ring-[#22c55e] focus:border-transparent focus:shadow-[0_0_15px_rgba(34,197,94,0.3)] text-[#ffffff] placeholder-[#6b7280] backdrop-blur-sm resize-none transition-all"
                      />
                    ) : (
                      <p className="text-sm font-light text-[#ffffff] px-4 py-3 bg-[#161616] rounded-lg border border-[#2a2a2a]">{profileData.address}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'authority' && (
              <div className="space-y-6">
                {/* System Permissions */}
                <div className="bg-[#1e1e1e]/80 backdrop-blur-sm rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.9)] border border-[#2a2a2a] p-6 hover:border-[#404040] hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300">
                  <h3 className="text-lg font-light text-[#ffffff] mb-6 flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-[#ef4444]" />
                    <span>Executive Permissions</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profileData.permissions.map((permission, idx) => (
                      <div key={idx} className="flex items-center space-x-3 p-3 bg-[#ef4444]/5 rounded-lg border border-[#ef4444]/20 hover:border-[#ef4444]/40 hover:shadow-[0_0_15px_rgba(239,68,68,0.2)] transition-all duration-300">
                        <Key className="h-4 w-4 text-[#ef4444]" />
                        <span className="text-sm font-light text-[#ffffff]">{permission}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills & Expertise */}
                <div className="bg-[#1e1e1e]/80 backdrop-blur-sm rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.9)] border border-[#2a2a2a] p-6 hover:border-[#404040] hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-light text-[#ffffff] flex items-center space-x-3">
                      <Target className="h-5 w-5 text-[#a855f7]" />
                      <span>Executive Skills</span>
                    </h3>
                    
                    {editMode && (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="Add executive skill..."
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          className="px-3 py-2 text-xs font-light bg-[#161616] border border-[#404040] rounded-lg focus:ring-2 focus:ring-[#a855f7] focus:border-transparent focus:shadow-[0_0_15px_rgba(168,85,247,0.3)] text-[#ffffff] placeholder-[#6b7280] backdrop-blur-sm transition-all"
                          onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                        />
                        <button
                          onClick={addSkill}
                          className="px-3 py-2 bg-[#a855f7] text-white rounded-lg hover:bg-[#9333ea] hover:shadow-[0_0_15px_rgba(168,85,247,0.4)] transition-all"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-3">
                    {(editMode ? editData.skills : profileData.skills).map((skill, idx) => (
                      <div
                        key={idx}
                        className={`px-4 py-2 bg-[#a855f7]/10 text-[#a855f7] text-sm font-light rounded-xl border border-[#a855f7]/30 flex items-center space-x-2 hover:bg-[#a855f7]/20 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)] transition-all duration-300 ${
                          editMode ? 'hover:bg-[#ef4444]/10 hover:text-[#ef4444] hover:border-[#ef4444]/30' : ''
                        }`}
                      >
                        <span>{skill}</span>
                        {editMode && (
                          <button
                            onClick={() => removeSkill(skill)}
                            className="hover:text-[#ef4444] transition-colors"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'performance' && (
              <div className="space-y-6">
                {/* Performance Metrics */}
                <div className="bg-[#1e1e1e]/80 backdrop-blur-sm rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.9)] border border-[#2a2a2a] p-6 hover:border-[#404040] hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300">
                  <h3 className="text-lg font-light text-[#ffffff] mb-6 flex items-center space-x-3">
                    <BarChart2 className="h-5 w-5 text-[#22c55e]" />
                    <span>Executive Performance</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-normal text-[#6b7280]">Overall Performance</span>
                          <span className="text-sm font-light text-[#22c55e]">{profileData.performanceScore}/100</span>
                        </div>
                        <div className="w-full bg-[#2a2a2a] rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-[#22c55e] to-[#16a34a] h-2 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(34,197,94,0.4)]"
                            style={{ width: `${profileData.performanceScore}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-normal text-[#6b7280]">Team Satisfaction</span>
                          <span className="text-sm font-light text-[#2563eb]">{profileData.executiveMetrics.teamSatisfaction}%</span>
                        </div>
                        <div className="w-full bg-[#2a2a2a] rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] h-2 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(37,99,235,0.4)]"
                            style={{ width: `${profileData.executiveMetrics.teamSatisfaction}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-normal text-[#6b7280]">Budget Efficiency</span>
                          <span className="text-sm font-light text-[#f59e0b]">{profileData.executiveMetrics.budgetEfficiency}%</span>
                        </div>
                        <div className="w-full bg-[#2a2a2a] rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-[#f59e0b] to-[#d97706] h-2 rounded-full transition-all duration-500 shadow-[0_0_10px_rgba(245,158,11,0.4)]"
                            style={{ width: `${profileData.executiveMetrics.budgetEfficiency}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-normal text-[#6b7280] mb-2">Last Performance Review</label>
                        <p className="text-sm font-light text-[#ffffff]">{new Date(profileData.lastReview).toLocaleDateString()}</p>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-normal text-[#6b7280] mb-2">Experience Level</label>
                        <p className="text-sm font-light text-[#a855f7]">{profileData.experience}</p>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-normal text-[#6b7280] mb-2">Stakeholder Rating</label>
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`h-4 w-4 ${
                                  star <= Math.floor(profileData.executiveMetrics.stakeholderRating) 
                                    ? 'text-[#f59e0b] fill-[#f59e0b] drop-shadow-[0_0_8px_rgba(245,158,11,0.4)]' 
                                    : 'text-[#404040]'
                                }`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm font-light text-[#f59e0b]">{profileData.executiveMetrics.stakeholderRating}/5.0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="bg-[#1e1e1e]/80 backdrop-blur-sm rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.9)] border border-[#2a2a2a] p-6 hover:border-[#404040] hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300">
                  <h3 className="text-lg font-light text-[#ffffff] mb-6 flex items-center space-x-3">
                    <Award className="h-5 w-5 text-[#f59e0b]" />
                    <span>Executive Certifications</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profileData.certifications.map((cert, idx) => (
                      <div key={idx} className="flex items-center space-x-3 p-4 bg-[#f59e0b]/5 rounded-xl border border-[#f59e0b]/20 hover:border-[#f59e0b]/40 hover:shadow-[0_0_15px_rgba(245,158,11,0.2)] transition-all duration-300">
                        <Badge className="h-5 w-5 text-[#f59e0b]" />
                        <span className="text-sm font-light text-[#ffffff]">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'projects' && (
              <div className="bg-[#1e1e1e]/80 backdrop-blur-sm rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.9)] border border-[#2a2a2a] p-6 hover:border-[#404040] hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300">
                <h3 className="text-lg font-light text-[#ffffff] mb-6 flex items-center space-x-3">
                  <Zap className="h-5 w-5 text-[#2563eb]" />
                  <span>Strategic Projects</span>
                </h3>
                
                <div className="space-y-4">
                  {profileData.activeProjects.map((project, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-[#2563eb]/5 rounded-xl border border-[#2563eb]/20 hover:bg-[#2563eb]/10 hover:border-[#2563eb]/40 hover:shadow-[0_0_15px_rgba(37,99,235,0.2)] transition-all duration-300">
                      <div className="flex items-center space-x-4">
                        <div className="w-3 h-3 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)]"></div>
                        <span className="text-sm font-light text-[#ffffff]">{project}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 bg-[#22c55e]/10 text-[#22c55e] text-xs font-light rounded-full border border-[#22c55e]/30 shadow-[0_0_8px_rgba(34,197,94,0.2)]">
                          Active
                        </span>
                        <button className="text-[#2563eb] hover:text-[#1d4ed8] hover:shadow-[0_0_10px_rgba(37,99,235,0.3)] transition-all">
                          <Eye className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Executive Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Executive Status */}
            <div className="bg-[#111111]/80 backdrop-blur-sm rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.9)] border border-[#2a2a2a] p-4 hover:border-[#404040] hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300">
              <h4 className="text-sm font-normal text-[#ffffff] mb-4 flex items-center space-x-2">
                <Crown className="h-4 w-4 text-[#22c55e]" />
                <span>Executive Status</span>
              </h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-thin text-[#6b7280]">Authority Level</span>
                  <span className="text-xs font-light text-[#22c55e]">{profileData.authorityLevel}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-thin text-[#6b7280]">Direct Reports</span>
                  <span className="text-xs font-light text-[#2563eb]">{profileData.directReports}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-thin text-[#6b7280]">Total Managed</span>
                  <span className="text-xs font-light text-[#a855f7]">{profileData.totalManaged}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-thin text-[#6b7280]">Departments</span>
                  <span className="text-xs font-light text-[#f59e0b]">{profileData.managedDepartments.length}</span>
                </div>
              </div>
            </div>

            {/* Security Clearance */}
            <div className="bg-[#111111]/80 backdrop-blur-sm rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.9)] border border-[#2a2a2a] p-4 hover:border-[#404040] hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300">
              <h4 className="text-sm font-normal text-[#ffffff] mb-4 flex items-center space-x-2">
                <Lock className="h-4 w-4 text-[#ef4444]" />
                <span>Security Status</span>
              </h4>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-thin text-[#6b7280] mb-1">Clearance Level</p>
                  <p className="text-xs font-light text-[#ef4444]">{profileData.clearanceLevel}</p>
                </div>
                <div>
                  <p className="text-xs font-thin text-[#6b7280] mb-1">System Access</p>
                  <p className="text-xs font-light text-[#ef4444]">Full Administrative</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-thin text-[#6b7280]">Active Sessions</span>
                  <span className="px-2 py-1 bg-[#22c55e]/10 text-[#22c55e] text-xs font-light rounded-full border border-[#22c55e]/30 shadow-[0_0_8px_rgba(34,197,94,0.2)]">
                    Secure
                  </span>
                </div>
              </div>
            </div>

            {/* Budget Overview */}
            <div className="bg-[#111111]/80 backdrop-blur-sm rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.9)] border border-[#2a2a2a] p-4 hover:border-[#404040] hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300">
              <h4 className="text-sm font-normal text-[#ffffff] mb-4 flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-[#f59e0b]" />
                <span>Budget Authority</span>
              </h4>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-thin text-[#6b7280] mb-1">Annual Budget</p>
                  <p className="text-lg font-light text-[#f59e0b]">{profileData.budgetAuthority}</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-thin text-[#6b7280]">Efficiency Rate</span>
                  <span className="text-xs font-light text-[#22c55e]">{profileData.executiveMetrics.budgetEfficiency}%</span>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-[#111111]/80 backdrop-blur-sm rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.9)] border border-[#2a2a2a] p-4 hover:border-[#404040] hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300">
              <h4 className="text-sm font-normal text-[#ffffff] mb-4 flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-[#2563eb]" />
                <span>Emergency Contact</span>
              </h4>
              
              <div className="space-y-2">
                <p className="text-xs font-light text-[#ffffff]">{profileData.emergencyContact.name}</p>
                <p className="text-xs font-thin text-[#6b7280]">{profileData.emergencyContact.relationship}</p>
                <p className="text-xs font-light text-[#2563eb]">{profileData.emergencyContact.phone}</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-[#111111]/80 backdrop-blur-sm rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.9)] border border-[#2a2a2a] p-4 hover:border-[#404040] hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all duration-300">
              <h4 className="text-sm font-normal text-[#ffffff] mb-4 flex items-center space-x-2">
                <Command className="h-4 w-4 text-[#a855f7]" />
                <span>Quick Actions</span>
              </h4>
              
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-2 px-3 py-2 bg-[#a855f7]/10 hover:bg-[#a855f7]/20 text-[#a855f7] text-xs font-light rounded-lg transition-all duration-300 border border-[#a855f7]/20 hover:border-[#a855f7]/40 hover:shadow-[0_0_10px_rgba(168,85,247,0.2)]">
                  <Users className="h-3 w-3" />
                  <span>Manage Teams</span>
                </button>
                <button className="w-full flex items-center space-x-2 px-3 py-2 bg-[#2563eb]/10 hover:bg-[#2563eb]/20 text-[#2563eb] text-xs font-light rounded-lg transition-all duration-300 border border-[#2563eb]/20 hover:border-[#2563eb]/40 hover:shadow-[0_0_10px_rgba(37,99,235,0.2)]">
                  <BarChart2 className="h-3 w-3" />
                  <span>View Reports</span>
                </button>
                <button className="w-full flex items-center space-x-2 px-3 py-2 bg-[#f59e0b]/10 hover:bg-[#f59e0b]/20 text-[#f59e0b] text-xs font-light rounded-lg transition-all duration-300 border border-[#f59e0b]/20 hover:border-[#f59e0b]/40 hover:shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                  <Settings className="h-3 w-3" />
                  <span>System Settings</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NexritaAdminProfile;
