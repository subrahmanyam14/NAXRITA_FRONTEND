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
        email: 'sarah.wilson@techcorp.com',
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

const ImpressiveAdminProfile = () => {
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-sm font-light text-slate-600">Loading executive profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Notification Toast */}
      {notification.show && (
        <div className={`fixed top-6 right-6 z-50 p-4 rounded-xl shadow-2xl flex items-center space-x-3 backdrop-blur-sm ${
          notification.type === 'success' 
            ? 'bg-emerald-500 text-white border border-emerald-400' 
            : 'bg-red-500 text-white border border-red-400'
        }`}>
          {notification.type === 'success' ? <CheckCircle className="h-5 w-5" /> : <AlertCircle className="h-5 w-5" />}
          <span className="text-sm font-light">{notification.message}</span>
        </div>
      )}

      {/* Executive Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-blue-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Crown className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-light text-slate-900">Executive Dashboard</h1>
                <p className="text-xs font-thin text-blue-600">Administrative Control Center</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              {editMode ? (
                <>
                  <button
                    onClick={() => setEditMode(false)}
                    className="px-4 py-2 text-xs font-light text-slate-600 bg-white border border-slate-300 rounded-xl hover:bg-slate-50 transition-all flex items-center space-x-2 shadow-sm"
                  >
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={saveProfile}
                    disabled={saving}
                    className="px-4 py-2 text-xs font-light text-white bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl hover:from-blue-600 hover:to-indigo-700 transition-all flex items-center space-x-2 disabled:opacity-50 shadow-lg"
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
                  className="px-4 py-2 text-xs font-light text-white bg-gradient-to-r from-slate-700 to-slate-800 rounded-xl hover:from-slate-600 hover:to-slate-700 transition-all flex items-center space-x-2 shadow-lg"
                >
                  <Edit3 className="h-4 w-4" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Executive Profile Header */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200 p-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <img
                src={profileData.profilePic}
                alt={profileData.name}
                className="w-24 h-24 rounded-2xl object-cover border-4 border-blue-200 shadow-xl"
              />
              {editMode && (
                <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-xl flex items-center justify-center hover:from-blue-600 hover:to-indigo-700 transition-all shadow-lg">
                  <Camera className="h-4 w-4" />
                </button>
              )}
              <div className="absolute -top-2 -left-2">
                <div className="w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                  <Crown className="h-3 w-3 text-white" />
                </div>
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-2xl font-light text-slate-900 mb-1">{profileData.name}</h2>
                  <p className="text-lg font-thin text-blue-700 mb-2">{profileData.role}</p>
                  <div className="flex items-center space-x-4 mb-3">
                    <span className="flex items-center space-x-2 text-xs font-thin text-slate-600">
                      <Shield className="h-4 w-4 text-blue-500" />
                      <span>{profileData.authorityLevel}</span>
                    </span>
                    <span className="flex items-center space-x-2 text-xs font-thin text-slate-600">
                      <Users className="h-4 w-4 text-emerald-500" />
                      <span>{profileData.totalManaged} Employees</span>
                    </span>
                    <span className="flex items-center space-x-2 text-xs font-thin text-slate-600">
                      <Calendar className="h-4 w-4 text-purple-500" />
                      <span>Since {new Date(profileData.joinDate).getFullYear()}</span>
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-col items-end space-y-2">
                  <div className="flex items-center space-x-3">
                    <span className="px-3 py-1 bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-700 text-xs font-light rounded-full border border-emerald-300 shadow-sm">
                      Active Executive
                    </span>
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-indigo-200 text-blue-700 text-xs font-light rounded-full border border-blue-300 shadow-sm">
                      {profileData.id}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2 text-xs font-thin text-slate-500">
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
            { label: 'Team Satisfaction', value: `${profileData.executiveMetrics.teamSatisfaction}%`, icon: Users, color: 'emerald', bg: 'from-emerald-50 to-emerald-100', border: 'emerald-200', text: 'emerald-700' },
            { label: 'Project Success', value: `${profileData.executiveMetrics.projectSuccessRate}%`, icon: Target, color: 'blue', bg: 'from-blue-50 to-blue-100', border: 'blue-200', text: 'blue-700' },
            { label: 'Budget Efficiency', value: `${profileData.executiveMetrics.budgetEfficiency}%`, icon: TrendingUp, color: 'amber', bg: 'from-amber-50 to-amber-100', border: 'amber-200', text: 'amber-700' },
            { label: 'Stakeholder Rating', value: `${profileData.executiveMetrics.stakeholderRating}/5.0`, icon: Star, color: 'purple', bg: 'from-purple-50 to-purple-100', border: 'purple-200', text: 'purple-700' }
          ].map((metric, idx) => (
            <div key={idx} className={`bg-gradient-to-br ${metric.bg} backdrop-blur-sm rounded-xl p-4 border border-${metric.border} shadow-lg`}>
              <div className="flex items-center justify-between mb-2">
                <metric.icon className={`h-5 w-5 text-${metric.color}-500`} />
                <span className={`text-xl font-light text-${metric.text}`}>{metric.value}</span>
              </div>
              <p className="text-xs font-thin text-slate-600">{metric.label}</p>
            </div>
          ))}
        </div>

        {/* Navigation Tabs */}
        <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-lg border border-slate-200 p-2">
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
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 text-xs font-light rounded-lg transition-all ${
                  activeSection === tab.id
                    ? 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border border-blue-200 shadow-sm'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-800'
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
                <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-xl border border-slate-200 p-6">
                  <h3 className="text-lg font-light text-slate-900 mb-4 flex items-center space-x-3">
                    <Crown className="h-5 w-5 text-blue-600" />
                    <span>Executive Summary</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-normal text-slate-500 mb-2">Position & Authority</label>
                        <p className="text-sm font-light text-slate-900">{profileData.role}</p>
                        <p className="text-xs font-thin text-blue-600">{profileData.department}</p>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-normal text-slate-500 mb-2">Reports To</label>
                        <p className="text-sm font-light text-slate-900">{profileData.reportsTo}</p>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-normal text-slate-500 mb-2">Budget Authority</label>
                        <p className="text-sm font-light text-emerald-600">{profileData.budgetAuthority}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-normal text-slate-500 mb-2">Direct Reports</label>
                        <p className="text-sm font-light text-slate-900">{profileData.directReports} executives</p>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-normal text-slate-500 mb-2">Total Managed</label>
                        <p className="text-sm font-light text-blue-600">{profileData.totalManaged} employees</p>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-normal text-slate-500 mb-2">Performance Score</label>
                        <p className="text-sm font-light text-emerald-600">{profileData.performanceScore}/100</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Managed Departments */}
                <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-xl border border-slate-200 p-6">
                  <h3 className="text-lg font-light text-slate-900 mb-4 flex items-center space-x-3">
                    <Building2 className="h-5 w-5 text-indigo-600" />
                    <span>Managed Departments</span>
                  </h3>
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {profileData.managedDepartments.map((dept, idx) => (
                      <div key={idx} className="bg-slate-50 rounded-lg p-3 border border-slate-200 hover:border-indigo-300 hover:bg-indigo-50 transition-all">
                        <div className="flex items-center space-x-2">
                          <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                          <span className="text-sm font-light text-slate-900">{dept}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'personal' && (
              <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-xl border border-slate-200 p-6">
                <h3 className="text-lg font-light text-slate-900 mb-6 flex items-center space-x-3">
                  <User className="h-5 w-5 text-emerald-600" />
                  <span>Personal Information</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-normal text-slate-500 mb-2">Full Name</label>
                    {editMode ? (
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        className="w-full px-4 py-3 text-sm font-light bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-900 placeholder-slate-400"
                      />
                    ) : (
                      <p className="text-sm font-light text-slate-900 px-4 py-3 bg-slate-50 rounded-lg border border-slate-200">{profileData.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-xs font-normal text-slate-500 mb-2">Executive Email</label>
                    {editMode ? (
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className="w-full px-4 py-3 text-sm font-light bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-900 placeholder-slate-400"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 px-4 py-3 bg-slate-50 rounded-lg border border-slate-200">
                        <Mail className="h-4 w-4 text-emerald-500" />
                        <span className="text-sm font-light text-slate-900">{profileData.email}</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-xs font-normal text-slate-500 mb-2">Direct Line</label>
                    {editMode ? (
                      <input
                        type="tel"
                        value={editData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className="w-full px-4 py-3 text-sm font-light bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-900 placeholder-slate-400"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 px-4 py-3 bg-slate-50 rounded-lg border border-slate-200">
                        <Phone className="h-4 w-4 text-blue-500" />
                        <span className="text-sm font-light text-slate-900">{profileData.phone}</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-xs font-normal text-slate-500 mb-2">Executive Office</label>
                    {editMode ? (
                      <input
                        type="text"
                        value={editData.location}
                        onChange={(e) => updateField('location', e.target.value)}
                        className="w-full px-4 py-3 text-sm font-light bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-900 placeholder-slate-400"
                      />
                    ) : (
                      <div className="flex items-center space-x-3 px-4 py-3 bg-slate-50 rounded-lg border border-slate-200">
                        <MapPin className="h-4 w-4 text-amber-500" />
                        <span className="text-sm font-light text-slate-900">{profileData.location}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-xs font-normal text-slate-500 mb-2">Corporate Address</label>
                    {editMode ? (
                      <textarea
                        value={editData.address}
                        onChange={(e) => updateField('address', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 text-sm font-light bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-slate-900 placeholder-slate-400 resize-none"
                      />
                    ) : (
                      <p className="text-sm font-light text-slate-900 px-4 py-3 bg-slate-50 rounded-lg border border-slate-200">{profileData.address}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'authority' && (
              <div className="space-y-6">
                {/* System Permissions */}
                <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-xl border border-slate-200 p-6">
                  <h3 className="text-lg font-light text-slate-900 mb-6 flex items-center space-x-3">
                    <Shield className="h-5 w-5 text-red-500" />
                    <span>Executive Permissions</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profileData.permissions.map((permission, idx) => (
                      <div key={idx} className="flex items-center space-x-3 p-3 bg-red-50 rounded-lg border border-red-200">
                        <Key className="h-4 w-4 text-red-500" />
                        <span className="text-sm font-light text-slate-900">{permission}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills & Expertise */}
                <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-xl border border-slate-200 p-6">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-light text-slate-900 flex items-center space-x-3">
                      <Target className="h-5 w-5 text-purple-500" />
                      <span>Executive Skills</span>
                    </h3>
                    
                    {editMode && (
                      <div className="flex items-center space-x-2">
                        <input
                          type="text"
                          placeholder="Add executive skill..."
                          value={newSkill}
                          onChange={(e) => setNewSkill(e.target.value)}
                          className="px-3 py-2 text-xs font-light bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-slate-900 placeholder-slate-400"
                          onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                        />
                        <button
                          onClick={addSkill}
                          className="px-3 py-2 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-lg hover:from-purple-600 hover:to-purple-700 transition-all"
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
                        className={`px-4 py-2 bg-purple-100 text-purple-700 text-sm font-light rounded-xl border border-purple-200 flex items-center space-x-2 ${
                          editMode ? 'hover:bg-red-100 hover:text-red-700 hover:border-red-200' : 'hover:bg-purple-200'
                        } transition-all`}
                      >
                        <span>{skill}</span>
                        {editMode && (
                          <button
                            onClick={() => removeSkill(skill)}
                            className="hover:text-red-500 transition-colors"
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
                <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-xl border border-slate-200 p-6">
                  <h3 className="text-lg font-light text-slate-900 mb-6 flex items-center space-x-3">
                    <BarChart2 className="h-5 w-5 text-emerald-500" />
                    <span>Executive Performance</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-normal text-slate-500">Overall Performance</span>
                          <span className="text-sm font-light text-emerald-600">{profileData.performanceScore}/100</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-emerald-400 to-emerald-500 h-2 rounded-full transition-all"
                            style={{ width: `${profileData.performanceScore}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-normal text-slate-500">Team Satisfaction</span>
                          <span className="text-sm font-light text-blue-600">{profileData.executiveMetrics.teamSatisfaction}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full transition-all"
                            style={{ width: `${profileData.executiveMetrics.teamSatisfaction}%` }}
                          ></div>
                        </div>
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-xs font-normal text-slate-500">Budget Efficiency</span>
                          <span className="text-sm font-light text-amber-600">{profileData.executiveMetrics.budgetEfficiency}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div 
                            className="bg-gradient-to-r from-amber-400 to-amber-500 h-2 rounded-full transition-all"
                            style={{ width: `${profileData.executiveMetrics.budgetEfficiency}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <label className="block text-xs font-normal text-slate-500 mb-2">Last Performance Review</label>
                        <p className="text-sm font-light text-slate-900">{new Date(profileData.lastReview).toLocaleDateString()}</p>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-normal text-slate-500 mb-2">Experience Level</label>
                        <p className="text-sm font-light text-purple-600">{profileData.experience}</p>
                      </div>
                      
                      <div>
                        <label className="block text-xs font-normal text-slate-500 mb-2">Stakeholder Rating</label>
                        <div className="flex items-center space-x-2">
                          <div className="flex space-x-1">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star 
                                key={star} 
                                className={`h-4 w-4 ${
                                  star <= Math.floor(profileData.executiveMetrics.stakeholderRating) 
                                    ? 'text-amber-500 fill-amber-500' 
                                    : 'text-slate-300'
                                }`} 
                              />
                            ))}
                          </div>
                          <span className="text-sm font-light text-amber-600">{profileData.executiveMetrics.stakeholderRating}/5.0</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Certifications */}
                <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-xl border border-slate-200 p-6">
                  <h3 className="text-lg font-light text-slate-900 mb-6 flex items-center space-x-3">
                    <Award className="h-5 w-5 text-amber-500" />
                    <span>Executive Certifications</span>
                  </h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {profileData.certifications.map((cert, idx) => (
                      <div key={idx} className="flex items-center space-x-3 p-4 bg-amber-50 rounded-xl border border-amber-200">
                        <Badge className="h-5 w-5 text-amber-500" />
                        <span className="text-sm font-light text-slate-900">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'projects' && (
              <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-xl border border-slate-200 p-6">
                <h3 className="text-lg font-light text-slate-900 mb-6 flex items-center space-x-3">
                  <Zap className="h-5 w-5 text-blue-500" />
                  <span>Strategic Projects</span>
                </h3>
                
                <div className="space-y-4">
                  {profileData.activeProjects.map((project, idx) => (
                    <div key={idx} className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-200 hover:bg-blue-100 transition-all">
                      <div className="flex items-center space-x-4">
                        <div className="w-3 h-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></div>
                        <span className="text-sm font-light text-slate-900">{project}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <span className="px-3 py-1 bg-gradient-to-r from-emerald-100 to-emerald-200 text-emerald-700 text-xs font-light rounded-full border border-emerald-300">
                          Active
                        </span>
                        <button className="text-blue-500 hover:text-blue-600 transition-colors">
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
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-xl border border-slate-200 p-4">
              <h4 className="text-sm font-normal text-slate-900 mb-4 flex items-center space-x-2">
                <Crown className="h-4 w-4 text-emerald-500" />
                <span>Executive Status</span>
              </h4>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-thin text-slate-500">Authority Level</span>
                  <span className="text-xs font-light text-emerald-600">{profileData.authorityLevel}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-thin text-slate-500">Direct Reports</span>
                  <span className="text-xs font-light text-blue-600">{profileData.directReports}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-thin text-slate-500">Total Managed</span>
                  <span className="text-xs font-light text-purple-600">{profileData.totalManaged}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-thin text-slate-500">Departments</span>
                  <span className="text-xs font-light text-amber-600">{profileData.managedDepartments.length}</span>
                </div>
              </div>
            </div>

            {/* Security Clearance */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-xl border border-slate-200 p-4">
              <h4 className="text-sm font-normal text-slate-900 mb-4 flex items-center space-x-2">
                <Lock className="h-4 w-4 text-red-500" />
                <span>Security Status</span>
              </h4>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-thin text-slate-500 mb-1">Clearance Level</p>
                  <p className="text-xs font-light text-red-600">{profileData.clearanceLevel}</p>
                </div>
                <div>
                  <p className="text-xs font-thin text-slate-500 mb-1">System Access</p>
                  <p className="text-xs font-light text-red-600">Full Administrative</p>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-thin text-slate-500">Active Sessions</span>
                  <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-xs font-light rounded-full border border-emerald-200">
                    Secure
                  </span>
                </div>
              </div>
            </div>

            {/* Budget Overview */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-xl border border-slate-200 p-4">
              <h4 className="text-sm font-normal text-slate-900 mb-4 flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-amber-500" />
                <span>Budget Authority</span>
              </h4>
              
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-thin text-slate-500 mb-1">Annual Budget</p>
                  <p className="text-lg font-light text-amber-600">{profileData.budgetAuthority}</p>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-thin text-slate-500">Efficiency Rate</span>
                  <span className="text-xs font-light text-emerald-600">{profileData.executiveMetrics.budgetEfficiency}%</span>
                </div>
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-xl border border-slate-200 p-4">
              <h4 className="text-sm font-normal text-slate-900 mb-4 flex items-center space-x-2">
                <AlertTriangle className="h-4 w-4 text-blue-500" />
                <span>Emergency Contact</span>
              </h4>
              
              <div className="space-y-2">
                <p className="text-xs font-light text-slate-900">{profileData.emergencyContact.name}</p>
                <p className="text-xs font-thin text-slate-500">{profileData.emergencyContact.relationship}</p>
                <p className="text-xs font-light text-blue-600">{profileData.emergencyContact.phone}</p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white/70 backdrop-blur-sm rounded-xl shadow-xl border border-slate-200 p-4">
              <h4 className="text-sm font-normal text-slate-900 mb-4 flex items-center space-x-2">
                <Command className="h-4 w-4 text-purple-500" />
                <span>Quick Actions</span>
              </h4>
              
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-2 px-3 py-2 bg-purple-100 hover:bg-purple-200 text-purple-700 text-xs font-light rounded-lg transition-all border border-purple-200">
                  <Users className="h-3 w-3" />
                  <span>Manage Teams</span>
                </button>
                <button className="w-full flex items-center space-x-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 text-xs font-light rounded-lg transition-all border border-blue-200">
                  <BarChart2 className="h-3 w-3" />
                  <span>View Reports</span>
                </button>
                <button className="w-full flex items-center space-x-2 px-3 py-2 bg-amber-100 hover:bg-amber-200 text-amber-700 text-xs font-light rounded-lg transition-all border border-amber-200">
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

export default ImpressiveAdminProfile;