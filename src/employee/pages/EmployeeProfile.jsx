import React, { useState, useEffect } from 'react';
import { 
  User, MapPin, Phone, Mail, Briefcase, Calendar, 
  Edit3, Upload, Download, Trash2, Eye, Plus,
  Save, X, Camera, Award, Clock, Users, FileText,
  Settings, Star, Target, CheckCircle, AlertCircle,
  Zap, Badge, BookOpen, Building2
} from 'lucide-react';

// Simplified API functions using async/await
const api = {
  getProfile: async () => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Return dummy data (in real app, this would be actual API call)
      return {
        id: 'EMP2024001',
        name: 'Sarah Chen',
        email: 'sarah.chen@techcorp.com',
        phone: '+1 (555) 987-6543',
        address: '456 Innovation Drive, Silicon Valley, CA 94043',
        location: 'San Francisco HQ',
        profilePic: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face',
        joinDate: '2023-01-15',
        role: 'Senior Product Manager',
        department: 'Product Development',
        manager: 'Michael Rodriguez',
        teamLead: 'Jennifer Kim',
        skills: ['Product Strategy', 'User Research', 'Agile', 'Data Analysis', 'Figma', 'SQL', 'Python', 'Scrum'],
        jobDescription: 'Lead product strategy and development for enterprise solutions.',
        contractType: 'Full-time',
        experience: '5 years',
        education: 'MBA, Stanford University',
        certifications: ['Certified Scrum Master', 'Google Analytics', 'AWS Solutions Architect'],
        timezone: 'PST (UTC-8)',
        workSchedule: 'Mon-Fri, 9AM-6PM',
        projects: ['Mobile App Redesign', 'AI Integration Platform', 'Customer Analytics Dashboard'],
        emergencyContact: {
          name: 'David Chen',
          relationship: 'Spouse',
          phone: '+1 (555) 123-7890'
        }
      };
    } catch (error) {
      throw new Error('Failed to fetch profile');
    }
  },

  updateProfile: async (data) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 800));
      return { success: true, data };
    } catch (error) {
      throw new Error('Failed to update profile');
    }
  },

  uploadDocument: async (file) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      return {
        id: Date.now(),
        name: file.name,
        type: 'Uploaded',
        uploadDate: new Date().toISOString().split('T')[0],
        size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
        status: 'Active'
      };
    } catch (error) {
      throw new Error('Failed to upload document');
    }
  }
};

const ImpressiveProfileDashboard = () => {
  const [profileData, setProfileData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editData, setEditData] = useState({});
  const [newSkill, setNewSkill] = useState('');
  const [activeSection, setActiveSection] = useState('personal');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      setLoading(true);
      const data = await api.getProfile();
      setProfileData(data);
      setEditData(data);
    } catch (error) {
      showNotification('Failed to load profile', 'error');
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    try {
      setSaving(true);
      await api.updateProfile(editData);
      setProfileData(editData);
      setEditMode(false);
      showNotification('Profile updated successfully!', 'success');
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
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-sm font-light text-slate-600">Loading your profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Notification Toast */}
      {notification.show && (
        <div className={`fixed top-4 right-4 z-50 p-3 rounded-lg shadow-lg flex items-center space-x-2 ${
          notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {notification.type === 'success' ? <CheckCircle className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
          <span className="text-sm font-light">{notification.message}</span>
        </div>
      )}

      {/* Compact Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-slate-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-3 py-3">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-lg font-light text-slate-900">Profile Dashboard</h1>
              <p className="text-xs font-thin text-slate-600">Manage your information</p>
            </div>
            
            <div className="flex items-center space-x-2">
              {editMode ? (
                <>
                  <button
                    onClick={() => setEditMode(false)}
                    className="px-3 py-1.5 text-xs font-light text-slate-600 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition-colors flex items-center space-x-1"
                  >
                    <X className="h-3 w-3" />
                    <span>Cancel</span>
                  </button>
                  <button
                    onClick={saveProfile}
                    disabled={saving}
                    className="px-3 py-1.5 text-xs font-light text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-1 disabled:opacity-50"
                  >
                    {saving ? (
                      <>
                        <div className="w-3 h-3 border border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-3 w-3" />
                        <span>Save</span>
                      </>
                    )}
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setEditMode(true)}
                  className="px-3 py-1.5 text-xs font-light text-white bg-slate-900 rounded-lg hover:bg-slate-800 transition-colors flex items-center space-x-1"
                >
                  <Edit3 className="h-3 w-3" />
                  <span>Edit</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-3 space-y-4">
        {/* Profile Header - Compact */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <img
                src={profileData.profilePic}
                alt={profileData.name}
                className="w-16 h-16 rounded-xl object-cover border-2 border-slate-100"
              />
              {editMode && (
                <button className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 transition-colors">
                  <Camera className="h-3 w-3" />
                </button>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-light text-slate-900">{profileData.name}</h2>
                  <p className="text-sm font-thin text-slate-600">{profileData.role}</p>
                  <div className="flex items-center space-x-3 mt-1">
                    <span className="flex items-center space-x-1 text-xs font-thin text-slate-500">
                      <Building2 className="h-3 w-3" />
                      <span>{profileData.department}</span>
                    </span>
                    <span className="flex items-center space-x-1 text-xs font-thin text-slate-500">
                      <Calendar className="h-3 w-3" />
                      <span>Since {new Date(profileData.joinDate).getFullYear()}</span>
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-1 bg-green-50 text-green-700 text-xs font-light rounded-full border border-green-200">
                    Active
                  </span>
                  <span className="px-2 py-1 bg-blue-50 text-blue-700 text-xs font-light rounded-full border border-blue-200">
                    {profileData.id}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs - Compact */}
        <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-1">
          <div className="flex space-x-1">
            {[
              { id: 'personal', label: 'Personal', icon: User },
              { id: 'job', label: 'Job Details', icon: Briefcase },
              { id: 'skills', label: 'Skills', icon: Target },
              { id: 'projects', label: 'Projects', icon: Zap }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveSection(tab.id)}
                className={`flex-1 flex items-center justify-center space-x-1 py-2 px-3 text-xs font-light rounded-lg transition-colors ${
                  activeSection === tab.id
                    ? 'bg-blue-100 text-blue-700'
                    : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                <tab.icon className="h-3 w-3" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-4">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-3">
            {activeSection === 'personal' && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <h3 className="text-sm font-normal text-slate-900 mb-4 flex items-center space-x-2">
                  <User className="h-4 w-4 text-blue-600" />
                  <span>Personal Information</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-normal text-slate-600 mb-1">Full Name</label>
                    {editMode ? (
                      <input
                        type="text"
                        value={editData.name}
                        onChange={(e) => updateField('name', e.target.value)}
                        className="w-full px-3 py-2 text-sm font-light border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-sm font-light text-slate-900">{profileData.name}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-xs font-normal text-slate-600 mb-1">Email Address</label>
                    {editMode ? (
                      <input
                        type="email"
                        value={editData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className="w-full px-3 py-2 text-sm font-light border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Mail className="h-3 w-3 text-slate-500" />
                        <span className="text-sm font-light text-slate-900">{profileData.email}</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-xs font-normal text-slate-600 mb-1">Phone Number</label>
                    {editMode ? (
                      <input
                        type="tel"
                        value={editData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className="w-full px-3 py-2 text-sm font-light border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Phone className="h-3 w-3 text-slate-500" />
                        <span className="text-sm font-light text-slate-900">{profileData.phone}</span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-xs font-normal text-slate-600 mb-1">Location</label>
                    {editMode ? (
                      <input
                        type="text"
                        value={editData.location}
                        onChange={(e) => updateField('location', e.target.value)}
                        className="w-full px-3 py-2 text-sm font-light border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-3 w-3 text-slate-500" />
                        <span className="text-sm font-light text-slate-900">{profileData.location}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-xs font-normal text-slate-600 mb-1">Address</label>
                    {editMode ? (
                      <textarea
                        value={editData.address}
                        onChange={(e) => updateField('address', e.target.value)}
                        rows={2}
                        className="w-full px-3 py-2 text-sm font-light border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    ) : (
                      <p className="text-sm font-light text-slate-900">{profileData.address}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'job' && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <h3 className="text-sm font-light text-slate-900 mb-4 flex items-center space-x-2">
                  <Briefcase className="h-4 w-4 text-blue-600" />
                  <span>Job Information</span>
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-thin text-slate-600 mb-1">Position</label>
                    {editMode ? (
                      <input
                        type="text"
                        value={editData.role}
                        onChange={(e) => updateField('role', e.target.value)}
                        className="w-full px-3 py-2 text-sm font-light border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-sm font-light text-slate-900">{profileData.role}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-xs font-thin text-slate-600 mb-1">Department</label>
                    {editMode ? (
                      <input
                        type="text"
                        value={editData.department}
                        onChange={(e) => updateField('department', e.target.value)}
                        className="w-full px-3 py-2 text-sm font-light border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    ) : (
                      <p className="text-sm font-light text-slate-900">{profileData.department}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-xs font-thin text-slate-600 mb-1">Manager</label>
                    <p className="text-sm font-light text-slate-900">{profileData.manager}</p>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-thin text-slate-600 mb-1">Team Lead</label>
                    <p className="text-sm font-light text-slate-900">{profileData.teamLead}</p>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-thin text-slate-600 mb-1">Work Schedule</label>
                    <p className="text-sm font-light text-slate-900">{profileData.workSchedule}</p>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-thin text-slate-600 mb-1">Timezone</label>
                    <p className="text-sm font-light text-slate-900">{profileData.timezone}</p>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="block text-xs font-thin text-slate-600 mb-1">Job Description</label>
                    {editMode ? (
                      <textarea
                        value={editData.jobDescription}
                        onChange={(e) => updateField('jobDescription', e.target.value)}
                        rows={3}
                        className="w-full px-3 py-2 text-sm font-light border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      />
                    ) : (
                      <p className="text-sm font-light text-slate-600 leading-relaxed">{profileData.jobDescription}</p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'skills' && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-light text-slate-900 flex items-center space-x-2">
                    <Target className="h-4 w-4 text-blue-600" />
                    <span>Skills & Expertise</span>
                  </h3>
                  
                  {editMode && (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        placeholder="Add new skill..."
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        className="px-3 py-1 text-xs font-light border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      />
                      <button
                        onClick={addSkill}
                        className="px-2 py-1 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <Plus className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {(editMode ? editData.skills : profileData.skills).map((skill, idx) => (
                    <div
                      key={idx}
                      className={`px-3 py-1 bg-slate-100 text-slate-700 text-xs font-light rounded-full flex items-center space-x-1 ${
                        editMode ? 'hover:bg-red-50 hover:text-red-700' : 'hover:bg-slate-200'
                      } transition-colors`}
                    >
                      <span>{skill}</span>
                      {editMode && (
                        <button
                          onClick={() => removeSkill(skill)}
                          className="hover:text-red-600"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'projects' && (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-4">
                <h3 className="text-sm font-light text-slate-900 mb-4 flex items-center space-x-2">
                  <Zap className="h-4 w-4 text-blue-600" />
                  <span>Current Projects</span>
                </h3>
                
                <div className="space-y-3">
                  {profileData.projects.map((project, idx) => (
                    <div key={idx} className="flex items-center space-x-3 p-3 bg-slate-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <span className="text-sm font-light text-slate-900">{project}</span>
                      <div className="ml-auto">
                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-light rounded-full">
                          Active
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Sidebar - Compact */}
          <div className="space-y-4">
            {/* Quick Stats */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-3">
              <h4 className="text-xs font-light text-slate-900 mb-3 flex items-center space-x-1">
                <Star className="h-3 w-3 text-yellow-500" />
                <span>Quick Stats</span>
              </h4>
              
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-thin text-slate-600">Experience</span>
                  <span className="text-xs font-light text-slate-900">{profileData.experience}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-thin text-slate-600">Projects</span>
                  <span className="text-xs font-light text-blue-600">{profileData.projects.length} active</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs font-thin text-slate-600">Skills</span>
                  <span className="text-xs font-light text-green-600">{profileData.skills.length} total</span>
                </div>
              </div>
            </div>

            {/* Certifications */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-3">
              <h4 className="text-xs font-light text-slate-900 mb-3 flex items-center space-x-1">
                <Award className="h-3 w-3 text-purple-500" />
                <span>Certifications</span>
              </h4>
              
              <div className="space-y-2">
                {profileData.certifications.slice(0, 3).map((cert, idx) => (
                  <div key={idx} className="flex items-center space-x-2 p-2 bg-purple-50 rounded">
                    <Badge className="h-3 w-3 text-purple-600" />
                    <span className="text-xs font-light text-purple-900">{cert}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-3">
              <h4 className="text-xs font-light text-slate-900 mb-3 flex items-center space-x-1">
                <Phone className="h-3 w-3 text-red-500" />
                <span>Emergency Contact</span>
              </h4>
              
              <div className="space-y-1">
                <p className="text-xs font-light text-slate-900">{profileData.emergencyContact.name}</p>
                <p className="text-xs font-thin text-slate-600">{profileData.emergencyContact.relationship}</p>
                <p className="text-xs font-light text-slate-700">{profileData.emergencyContact.phone}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImpressiveProfileDashboard;