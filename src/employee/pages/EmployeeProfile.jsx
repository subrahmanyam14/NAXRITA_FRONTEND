import React, { useState, useEffect } from 'react';
import { 
  User, MapPin, Phone, Mail, Briefcase, Calendar, 
  Edit3, Upload, Download, Trash2, Eye, Plus,
  Save, X, Camera, Award, Clock, Users, FileText,
  Settings, Star, Target, CheckCircle, AlertCircle,
  Zap, Badge, BookOpen, Building2, Menu, Bell,
  ChevronLeft, ChevronRight, Home, BarChart3
} from 'lucide-react';

// Animated Background Component
const StarfieldBackground = () => {
  useEffect(() => {
    const createStars = () => {
      const starfield = document.getElementById('starfield');
      if (!starfield) return;
      
      starfield.innerHTML = '';
      
      for (let i = 0; i < 150; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        star.style.width = Math.random() > 0.7 ? '3px' : Math.random() > 0.4 ? '2px' : '1px';
        star.style.height = star.style.width;
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (2 + Math.random() * 2) + 's';
        starfield.appendChild(star);
      }
      
      // Create sparkles
      for (let i = 0; i < 25; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + '%';
        sparkle.style.animationDelay = Math.random() * 8 + 's';
        sparkle.style.animationDuration = (6 + Math.random() * 4) + 's';
        starfield.appendChild(sparkle);
      }
    };
    
    createStars();
  }, []);
  
  return <div id="starfield" className="fixed inset-0 pointer-events-none z-0"></div>;
};

// Carousel Component
const AnnouncementCarousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  
  useEffect(() => {
    if (!isAutoPlay) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % items.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [items.length, isAutoPlay]);
  
  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % items.length);
  };
  
  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + items.length) % items.length);
  };
  
  return (
    <div 
      className="relative bg-[#1e1e1e] rounded-xl p-6 backdrop-blur-lg border border-[#2a2a2a] overflow-hidden"
      onMouseEnter={() => setIsAutoPlay(false)}
      onMouseLeave={() => setIsAutoPlay(true)}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb]/5 to-transparent"></div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-light text-[#ffffff] flex items-center space-x-2">
            <Bell className="h-5 w-5 text-[#2563eb]" />
            <span>Company Updates</span>
          </h3>
          
          <div className="flex items-center space-x-2">
            <button
              onClick={prevSlide}
              className="w-10 h-10 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-105"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextSlide}
              className="w-10 h-10 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:scale-105"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="overflow-hidden rounded-lg">
          <div 
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {items.map((item, index) => (
              <div key={index} className="w-full flex-shrink-0 p-4 bg-[#111111] rounded-lg">
                <h4 className="text-[#ffffff] font-medium mb-2">{item.title}</h4>
                <p className="text-[#a3a3a3] text-sm leading-relaxed">{item.content}</p>
                <div className="mt-3 text-xs text-[#6b7280]">{item.date}</div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-center mt-4 space-x-2">
          {items.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentIndex 
                  ? 'bg-[#2563eb] shadow-[0_0_8px_rgba(37,99,235,0.6)]' 
                  : 'bg-[#404040] hover:bg-[#6b7280]'
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Enhanced API functions
const api = {
  getProfile: async () => {
    await new Promise(resolve => setTimeout(resolve, 1000));
    return {
      id: 'EMP2024001',
      name: 'Sarah Chen',
      email: 'sarah.chen@nexrita.com',
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
      jobDescription: 'Lead product strategy and development for enterprise solutions with focus on AI integration.',
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
  },

  updateProfile: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true, data };
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

// Main Component
const CosmicProfileDashboard = () => {
  const [profileData, setProfileData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editData, setEditData] = useState({});
  const [newSkill, setNewSkill] = useState('');
  const [activeSection, setActiveSection] = useState('personal');
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [announcements] = useState(api.getAnnouncements());

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
      {/* Animated Background */}
      <StarfieldBackground />
      
      {/* Custom CSS for animations */}
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
      `}</style>

      {/* Sidebar */}
      {/* <Sidebar isCollapsed={sidebarCollapsed} setIsCollapsed={setSidebarCollapsed} /> */}

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

      {/* Main Content */}
      <div className={`transition-all duration-300`}>
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
                      onClick={saveProfile}
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
                    src={profileData.profilePic}
                    alt={profileData.name}
                    className="w-24 h-24 rounded-xl object-cover border-2 border-[#2563eb]/50 transition-all duration-300 group-hover:border-[#2563eb]"
                  />
                  {editMode && (
                    <button className="absolute -bottom-2 -right-2 w-8 h-8 bg-[#2563eb] text-white rounded-full flex items-center justify-center hover:bg-[#1d4ed8] transition-colors shadow-lg">
                      <Camera className="h-4 w-4" />
                    </button>
                  )}
                  <div className="absolute -top-1 -right-1 w-6 h-6 bg-[#22c55e] rounded-full border-2 border-[#1e1e1e] flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-2xl font-light text-[#ffffff] mb-1">{profileData.name}</h2>
                      <p className="text-lg font-light text-[#a3a3a3] mb-2">{profileData.role}</p>
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center space-x-2 text-sm font-light text-[#6b7280]">
                          <Building2 className="h-4 w-4 text-[#2563eb]" />
                          <span>{profileData.department}</span>
                        </span>
                        <span className="flex items-center space-x-2 text-sm font-light text-[#6b7280]">
                          <Calendar className="h-4 w-4 text-[#2563eb]" />
                          <span>Since {new Date(profileData.joinDate).getFullYear()}</span>
                        </span>
                        <span className="flex items-center space-x-2 text-sm font-light text-[#6b7280]">
                          <MapPin className="h-4 w-4 text-[#2563eb]" />
                          <span>{profileData.location}</span>
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className="px-3 py-1 bg-[#22c55e]/20 text-[#22c55e] text-sm font-light rounded-full border border-[#22c55e]/30 cosmic-glow">
                        Active
                      </span>
                      <span className="px-3 py-1 bg-[#2563eb]/20 text-[#2563eb] text-sm font-light rounded-full border border-[#2563eb]/30">
                        {profileData.id}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Announcements Carousel */}
          <AnnouncementCarousel items={announcements} />

          {/* Navigation Tabs */}
          <div className="bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] p-2 backdrop-blur-lg">
            <div className="flex space-x-2">
              {[
                { id: 'personal', label: 'Personal Info', icon: User },
                { id: 'job', label: 'Job Details', icon: Briefcase },
                { id: 'skills', label: 'Skills & Expertise', icon: Target },
                { id: 'projects', label: 'Active Projects', icon: Zap }
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
                        <label className="block text-sm font-light text-[#a3a3a3] mb-2">Full Name</label>
                        {editMode ? (
                          <input
                            type="text"
                            value={editData.name}
                            onChange={(e) => updateField('name', e.target.value)}
                            className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-[#ffffff] font-light backdrop-blur-lg transition-all duration-300"
                          />
                        ) : (
                          <p className="text-lg font-light text-[#ffffff] bg-[#111111] px-4 py-3 rounded-lg border border-[#2a2a2a]">{profileData.name}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-light text-[#a3a3a3] mb-2">Email Address</label>
                        {editMode ? (
                          <input
                            type="email"
                            value={editData.email}
                            onChange={(e) => updateField('email', e.target.value)}
                            className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-[#ffffff] font-light backdrop-blur-lg"
                          />
                        ) : (
                          <div className="flex items-center space-x-3 bg-[#111111] px-4 py-3 rounded-lg border border-[#2a2a2a]">
                            <Mail className="h-4 w-4 text-[#2563eb]" />
                            <span className="text-lg font-light text-[#ffffff]">{profileData.email}</span>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-light text-[#a3a3a3] mb-2">Phone Number</label>
                        {editMode ? (
                          <input
                            type="tel"
                            value={editData.phone}
                            onChange={(e) => updateField('phone', e.target.value)}
                            className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-[#ffffff] font-light backdrop-blur-lg"
                          />
                        ) : (
                          <div className="flex items-center space-x-3 bg-[#111111] px-4 py-3 rounded-lg border border-[#2a2a2a]">
                            <Phone className="h-4 w-4 text-[#2563eb]" />
                            <span className="text-lg font-light text-[#ffffff]">{profileData.phone}</span>
                          </div>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-light text-[#a3a3a3] mb-2">Location</label>
                        {editMode ? (
                          <input
                            type="text"
                            value={editData.location}
                            onChange={(e) => updateField('location', e.target.value)}
                            className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-[#ffffff] font-light backdrop-blur-lg"
                          />
                        ) : (
                          <div className="flex items-center space-x-3 bg-[#111111] px-4 py-3 rounded-lg border border-[#2a2a2a]">
                            <MapPin className="h-4 w-4 text-[#2563eb]" />
                            <span className="text-lg font-light text-[#ffffff]">{profileData.location}</span>
                          </div>
                        )}
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-light text-[#a3a3a3] mb-2">Address</label>
                        {editMode ? (
                          <textarea
                            value={editData.address}
                            onChange={(e) => updateField('address', e.target.value)}
                            rows={3}
                            className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-[#ffffff] font-light backdrop-blur-lg resize-none"
                          />
                        ) : (
                          <p className="text-lg font-light text-[#ffffff] bg-[#111111] px-4 py-3 rounded-lg border border-[#2a2a2a] leading-relaxed">{profileData.address}</p>
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
                        {editMode ? (
                          <input
                            type="text"
                            value={editData.role}
                            onChange={(e) => updateField('role', e.target.value)}
                            className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-[#ffffff] font-light backdrop-blur-lg"
                          />
                        ) : (
                          <p className="text-lg font-light text-[#ffffff] bg-[#111111] px-4 py-3 rounded-lg border border-[#2a2a2a]">{profileData.role}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-light text-[#a3a3a3] mb-2">Department</label>
                        {editMode ? (
                          <input
                            type="text"
                            value={editData.department}
                            onChange={(e) => updateField('department', e.target.value)}
                            className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-[#ffffff] font-light backdrop-blur-lg"
                          />
                        ) : (
                          <p className="text-lg font-light text-[#ffffff] bg-[#111111] px-4 py-3 rounded-lg border border-[#2a2a2a]">{profileData.department}</p>
                        )}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-light text-[#a3a3a3] mb-2">Manager</label>
                        <p className="text-lg font-light text-[#ffffff] bg-[#111111] px-4 py-3 rounded-lg border border-[#2a2a2a]">{profileData.manager}</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-light text-[#a3a3a3] mb-2">Team Lead</label>
                        <p className="text-lg font-light text-[#ffffff] bg-[#111111] px-4 py-3 rounded-lg border border-[#2a2a2a]">{profileData.teamLead}</p>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-light text-[#a3a3a3] mb-2">Work Schedule</label>
                        <div className="flex items-center space-x-3 bg-[#111111] px-4 py-3 rounded-lg border border-[#2a2a2a]">
                          <Clock className="h-4 w-4 text-[#2563eb]" />
                          <span className="text-lg font-light text-[#ffffff]">{profileData.workSchedule}</span>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-light text-[#a3a3a3] mb-2">Timezone</label>
                        <p className="text-lg font-light text-[#ffffff] bg-[#111111] px-4 py-3 rounded-lg border border-[#2a2a2a]">{profileData.timezone}</p>
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-light text-[#a3a3a3] mb-2">Job Description</label>
                        {editMode ? (
                          <textarea
                            value={editData.jobDescription}
                            onChange={(e) => updateField('jobDescription', e.target.value)}
                            rows={4}
                            className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-[#ffffff] font-light backdrop-blur-lg resize-none"
                          />
                        ) : (
                          <p className="text-lg font-light text-[#a3a3a3] bg-[#111111] px-4 py-3 rounded-lg border border-[#2a2a2a] leading-relaxed">{profileData.jobDescription}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeSection === 'skills' && (
                <div className="bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] p-6 hover-lift backdrop-blur-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb]/5 to-transparent rounded-xl"></div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-light text-[#ffffff] flex items-center space-x-3">
                        <Target className="h-5 w-5 text-[#2563eb]" />
                        <span>Skills & Expertise</span>
                      </h3>
                      
                      {editMode && (
                        <div className="flex items-center space-x-3">
                          <input
                            type="text"
                            placeholder="Add new skill..."
                            value={newSkill}
                            onChange={(e) => setNewSkill(e.target.value)}
                            className="px-4 py-2 bg-[#161616] border border-[#404040] rounded-lg focus:ring-2 focus:ring-[#2563eb] focus:border-transparent text-[#ffffff] font-light backdrop-blur-lg"
                            onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                          />
                          <button
                            onClick={addSkill}
                            className="px-3 py-2 bg-[#2563eb] text-white rounded-lg hover:bg-[#1d4ed8] transition-all duration-300 hover:shadow-[0_0_20px_rgba(37,99,235,0.4)]"
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
                          className={`px-4 py-2 bg-[#111111] text-[#ffffff] border border-[#404040] rounded-lg flex items-center space-x-2 transition-all duration-300 hover:border-[#2563eb] hover:shadow-[0_0_15px_rgba(37,99,235,0.3)] ${
                            editMode ? 'hover:bg-[#ef4444]/10 hover:border-[#ef4444]' : 'hover:bg-[#1e1e1e]'
                          }`}
                        >
                          <span className="font-light">{skill}</span>
                          {editMode && (
                            <button
                              onClick={() => removeSkill(skill)}
                              className="text-[#6b7280] hover:text-[#ef4444] transition-colors"
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

              {activeSection === 'projects' && (
                <div className="bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] p-6 hover-lift backdrop-blur-lg">
                  <div className="absolute inset-0 bg-gradient-to-br from-[#2563eb]/5 to-transparent rounded-xl"></div>
                  <div className="relative z-10">
                    <h3 className="text-xl font-light text-[#ffffff] mb-6 flex items-center space-x-3">
                      <Zap className="h-5 w-5 text-[#2563eb]" />
                      <span>Active Projects</span>
                    </h3>
                    
                    <div className="space-y-4">
                      {profileData.projects.map((project, idx) => (
                        <div key={idx} className="flex items-center space-x-4 p-4 bg-[#111111] rounded-lg border border-[#2a2a2a] hover:border-[#404040] transition-all duration-300 hover-lift">
                          <div className="w-3 h-3 bg-[#2563eb] rounded-full animate-pulse"></div>
                          <span className="text-lg font-light text-[#ffffff] flex-1">{project}</span>
                          <div className="flex items-center space-x-2">
                            <span className="px-3 py-1 bg-[#22c55e]/20 text-[#22c55e] text-sm font-light rounded-full border border-[#22c55e]/30">
                              Active
                            </span>
                            <button className="p-2 text-[#a3a3a3] hover:text-[#ffffff] hover:bg-[#2a2a2a] rounded-lg transition-colors">
                              <Eye className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      ))}
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
                    <span>Cosmic Stats</span>
                  </h4>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-2 bg-[#111111] rounded border border-[#2a2a2a]">
                      <span className="text-sm font-light text-[#a3a3a3]">Experience</span>
                      <span className="text-sm font-light text-[#ffffff] cosmic-glow">{profileData.experience}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-[#111111] rounded border border-[#2a2a2a]">
                      <span className="text-sm font-light text-[#a3a3a3]">Projects</span>
                      <span className="text-sm font-light text-[#2563eb] cosmic-glow">{profileData.projects.length} active</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-[#111111] rounded border border-[#2a2a2a]">
                      <span className="text-sm font-light text-[#a3a3a3]">Skills</span>
                      <span className="text-sm font-light text-[#22c55e] cosmic-glow">{profileData.skills.length} total</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Certifications */}
              <div className="bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] p-4 hover-lift backdrop-blur-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-xl"></div>
                <div className="relative z-10">
                  <h4 className="text-sm font-light text-[#ffffff] mb-4 flex items-center space-x-2">
                    <Award className="h-4 w-4 text-purple-400" />
                    <span>Certifications</span>
                  </h4>
                  
                  <div className="space-y-3">
                    {profileData.certifications.map((cert, idx) => (
                      <div key={idx} className="flex items-center space-x-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                        <Badge className="h-4 w-4 text-purple-400 flex-shrink-0" />
                        <span className="text-sm font-light text-purple-100">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-[#1e1e1e] rounded-xl border border-[#2a2a2a] p-4 hover-lift backdrop-blur-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-[#ef4444]/5 to-transparent rounded-xl"></div>
                <div className="relative z-10">
                  <h4 className="text-sm font-light text-[#ffffff] mb-4 flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-[#ef4444]" />
                    <span>Emergency Contact</span>
                  </h4>
                  
                  <div className="space-y-2 p-3 bg-[#111111] rounded-lg border border-[#2a2a2a]">
                    <p className="text-sm font-light text-[#ffffff]">{profileData.emergencyContact.name}</p>
                    <p className="text-xs font-light text-[#6b7280]">{profileData.emergencyContact.relationship}</p>
                    <p className="text-sm font-light text-[#a3a3a3] flex items-center space-x-2">
                      <Phone className="h-3 w-3" />
                      <span>{profileData.emergencyContact.phone}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CosmicProfileDashboard;
