import React, { useState, useEffect } from 'react';
import { 
  User, MapPin, Phone, Mail, Briefcase, Calendar, 
  Settings, LogOut, Target, Clock, Users, Shield, Flag,
  CreditCard, Heart, Globe, IdCard
} from 'lucide-react';

const EmployeeProfile = () => {
  const [activeTab, setActiveTab] = useState('summary');
  const [employeeData, setEmployeeData] = useState(null);
  const [personalData, setPersonalData] = useState(null);
  const [jobData, setJobData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  // API base URL - using environment variable or fallback
  const API_BASE_URL = process.env.REACT_APP_URL || 'http://localhost:5000';

  // Get Bearer token from localStorage
  const getAuthToken = () => {
    return localStorage.getItem('token') || localStorage.getItem('authToken') || localStorage.getItem('bearerToken');
  };

  // Create headers with Bearer token
  const getAuthHeaders = () => {
    const token = getAuthToken();
    return {
      'Content-Type': 'application/json',
      ...(token && { 'Authorization': `Bearer ${token}` })
    };
  };

  // Header Component (mobile-compact + black gradient)
  const Header = () => (
    <div
      className="fixed top-0 right-0 z-40 border-b border-gray-800 h-14 md:h-18"
      style={{
        left: sidebarCollapsed ? '80px' : '280px',
        background: 'linear-gradient(180deg, rgba(10,10,10,0.9), rgba(10,10,10,0.75))',
        backdropFilter: 'blur(10px)'
      }}
    >
      <div className="flex items-center justify-between h-full px-4 md:px-8">
        <div>
          <h1
            className="text-white text-base md:text-xl font-medium"
            style={{ fontFamily: 'Plus Jakarta Sans, sans-serif' }}
          >
            Employee Profile
          </h1>
          <p className="text-gray-400 text-[11px] md:text-sm">Manage employee information and analytics</p>
        </div>
        <div className="flex items-center space-x-2 md:space-x-4">
          <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
            <Settings className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
          </button>
          <button className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
            <LogOut className="h-4 w-4 md:h-5 md:w-5 text-gray-400" />
          </button>
        </div>
      </div>
    </div>
  );

  // Fetch all employee data
  useEffect(() => {
    fetchAllEmployeeData();
  }, []);

  const fetchAllEmployeeData = async () => {
    try {
      setLoading(true);
      setError(null);

      const headers = getAuthHeaders();

      // Check if token exists
      if (!getAuthToken()) {
        setError('Authentication token not found. Please login again.');
        setLoading(false);
        return;
      }

      // Track successful responses
      let fetchedEmployeeData = null;
      let fetchedPersonalData = null;
      let fetchedJobData = null;
      let hasAuthError = false;

      // Fetch all three APIs simultaneously
      const [employeeResponse, personalResponse, jobResponse] = await Promise.allSettled([
        fetch(`${API_BASE_URL}/api/employees/employee`, { headers }),
        fetch(`${API_BASE_URL}/api/personalDetails/individual`, { headers }),
        fetch(`${API_BASE_URL}/api/jobDetails/employee`, { headers })
      ]);

      // Handle employee data
      if (employeeResponse.status === 'fulfilled' && employeeResponse.value.ok) {
        const empData = await employeeResponse.value.json();
        if (empData.success !== false) {
          fetchedEmployeeData = empData.data;
          setEmployeeData(empData.data);
        } else {
          console.error('Employee API returned error:', empData.message);
        }
      } else if (employeeResponse.status === 'fulfilled') {
        const errorData = await employeeResponse.value.json().catch(() => ({}));
        console.error('Failed to fetch employee data:', employeeResponse.value.status, errorData);
        if (employeeResponse.value.status === 401) {
          hasAuthError = true;
        }
      } else {
        console.error('Employee request failed:', employeeResponse.reason);
      }

      // Handle personal data
      if (personalResponse.status === 'fulfilled' && personalResponse.value.ok) {
        const persData = await personalResponse.value.json();
        if (persData.success !== false) {
          fetchedPersonalData = persData.data;
          setPersonalData(persData.data);
        } else {
          console.error('Personal details API returned error:', persData.message);
        }
      } else if (personalResponse.status === 'fulfilled') {
        const errorData = await personalResponse.value.json().catch(() => ({}));
        console.error('Failed to fetch personal data:', personalResponse.value.status, errorData);
        if (personalResponse.value.status === 401) {
          hasAuthError = true;
        }
      } else {
        console.error('Personal request failed:', personalResponse.reason);
      }

      // Handle job data
      if (jobResponse.status === 'fulfilled' && jobResponse.value.ok) {
        const jobDataResponse = await jobResponse.value.json();
        if (jobDataResponse.message && !jobDataResponse.message.includes('error')) {
          fetchedJobData = jobDataResponse.data;
          setJobData(jobDataResponse.data);
        } else {
          console.error('Job details API returned error:', jobDataResponse.message);
        }
      } else if (jobResponse.status === 'fulfilled') {
        const errorData = await jobResponse.value.json().catch(() => ({}));
        console.error('Failed to fetch job data:', jobResponse.value.status, errorData);
        if (jobResponse.status === 401) {
          hasAuthError = true;
        }
      } else {
        console.error('Job request failed:', jobResponse.reason);
      }

      // Check for authentication errors first
      if (hasAuthError) {
        setError('Authentication failed. Please login again.');
        return;
      }

      // Check if at least one API call was successful using the fetched data
      if (!fetchedEmployeeData && !fetchedPersonalData && !fetchedJobData) {
        setError('Failed to load employee data from all sources');
      }

    } catch (error) {
      console.error('Error fetching employee data:', error);
      setError('Network error occurred while loading employee data');
    } finally {
      setLoading(false);
    }
  };

  // Helper function to format date
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'N/A';
    }
  };

  // Helper function to calculate experience
  const calculateExperience = (joinDate) => {
    if (!joinDate) return 'N/A';
    try {
      const join = new Date(joinDate);
      const now = new Date();
      const diffTime = Math.abs(now - join);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const years = Math.floor(diffDays / 365);
      const months = Math.floor((diffDays % 365) / 30);
      return `${years}y ${months}m`;
    } catch {
      return 'N/A';
    }
  };

  if (loading) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ background: '#0a0a0a' }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-400 text-sm md:text-base">Loading employee data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="flex items-center justify-center min-h-screen"
        style={{ background: '#0a0a0a' }}
      >
        <div className="text-center px-4">
          <p className="text-red-400 mb-4 text-sm md:text-base">{error}</p>
          <button
            onClick={fetchAllEmployeeData}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  const SummaryPage = () => (
    <div
      className="min-h-screen"
      style={{
        // Rich black gradient background with subtle depth
        background:
          'radial-gradient(1200px 600px at 10% 0%, #0f0f0f 0%, #0a0a0a 60%), radial-gradient(1000px 500px at 90% 0%, #111111 0%, #0a0a0a 55%), #0a0a0a',
        fontFamily: 'Plus Jakarta Sans, sans-serif'
      }}
    >
      {/* Optional tiny grain overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 opacity-[0.06] mix-blend-soft-light"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.3) 0px, rgba(255,255,255,0.3) 1px, transparent 1px, transparent 2px), repeating-linear-gradient(90deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 1px, transparent 1px, transparent 2px)'
        }}
      />
      <Header />

      <div className="transition-all duration-300 pt-16 md:pt-18">
        <div className="max-w-6xl lg:max-w-7xl xl:max-w-8xl mx-auto px-4 md:px-8 py-6 md:py-8">
          {/* Header Section */}
          <div
            className="rounded-2xl md:rounded-2xl p-4 md:p-8 mb-6 md:mb-8 border border-gray-800 relative overflow-hidden"
            style={{
              background: 'linear-gradient(180deg, #161616 0%, #1a1a1a 100%)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.8)'
            }}
          >
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center space-x-4 md:space-x-6">
                <div
                  className="h-12 w-12 md:h-16 md:w-16 rounded-2xl flex items-center justify-center shadow-md overflow-hidden"
                  style={{
                    background: personalData?.profile_pic ? 'transparent' : 'rgb(0, 73, 184)',
                    boxShadow: '0 0 20px rgba(59, 130, 246, 0.35)'
                  }}
                >
                  {personalData?.profile_pic ? (
                    <img
                      src={personalData.profile_pic}
                      alt="Profile"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  ) : (
                    <User className="h-6 w-6 md:h-8 md:w-8 text-white" />
                  )}
                </div>
                <div>
                  <h1
                    className="text-white mb-0.5 md:mb-1"
                    style={{ fontSize: '22px', fontWeight: '300', fontFamily: 'Plus Jakarta Sans, sans-serif' }}
                  >
                    {employeeData?.employee_name || jobData?.employee_name || 'Employee Name'}
                  </h1>
                  <p className="text-gray-400 font-normal text-xs md:text-[14px]">
                    {jobData?.business_title || jobData?.job || employeeData?.job_profile_progression_model_designation || 'Position'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <p className="text-gray-400 mb-0.5 text-[10px] md:text-[12px]">Employee ID</p>
                  <p className="text-white font-normal text-xs md:text-[14px]">
                    {employeeData?.employee_id || jobData?.employee_id || 'N/A'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 mb-0.5 text-[10px] md:text-[12px]">Status</p>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] md:text-xs ${
                      (employeeData?.status || jobData?.employee_status) === 'Active'
                        ? 'bg-green-900/70 text-green-300'
                        : 'bg-red-900/70 text-red-300'
                    }`}
                  >
                    {employeeData?.status || jobData?.employee_status || 'N/A'}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
            {/* Personal Details Column */}
            <div className="space-y-4 md:space-y-6">
              {/* Basic Personal Info */}
              <div
                className="rounded-2xl p-4 md:p-6 border border-gray-800 hover:border-gray-700 transition"
                style={{
                  background: 'linear-gradient(180deg, #181818 0%, #1e1e1e 100%)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.8)'
                }}
              >
                <h3 className="text-white font-normal mb-3 md:mb-4 flex items-center text-sm md:text-[16px]">
                  <User className="h-4 w-4 mr-2 text-blue-500" />
                  Personal Details
                </h3>
                <div className="space-y-3 md:space-y-4">
                  {[
                    { label: 'Date of Birth', value: formatDate(personalData?.date_of_birth), icon: <Calendar className="h-3 w-3" /> },
                    { label: 'Gender', value: personalData?.gender || 'N/A', icon: <User className="h-3 w-3" /> },
                    { label: 'Marital Status', value: personalData?.marital_status || 'N/A', icon: <Heart className="h-3 w-3" /> },
                    { label: 'Phone', value: personalData?.mobile || jobData?.phone || 'N/A', clickable: true, icon: <Phone className="h-3 w-3" /> },
                    { label: 'Email', value: personalData?.email || jobData?.email || employeeData?.email || 'N/A', clickable: true, icon: <Mail className="h-3 w-3" /> }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center gap-3">
                      <span className="text-gray-400 flex items-center text-[11px] md:text-[12px]">
                        {item.icon && <span className="mr-1 text-gray-500">{item.icon}</span>}
                        {item.label}
                      </span>
                      <span
                        className={`font-normal truncate max-w-[55%] text-right ${item.clickable ? 'text-blue-400 hover:text-blue-300 cursor-pointer' : 'text-white'} text-[11px] md:text-[12px]`}
                        title={item.value}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Citizenship & Documentation */}
              <div
                className="rounded-2xl p-4 md:p-6 border border-gray-800 hover:border-gray-700 transition"
                style={{
                  background: 'linear-gradient(180deg, #181818 0%, #1e1e1e 100%)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.8)'
                }}
              >
                <h3 className="text-white font-normal mb-3 md:mb-4 flex items-center text-sm md:text-[16px]">
                  <Shield className="h-4 w-4 mr-2 text-green-500" />
                  Citizenship & Documents
                </h3>
                <div className="space-y-3 md:space-y-4">
                  {[
                    { label: 'Nationality', value: personalData?.nationality || 'N/A', icon: <Flag className="h-3 w-3" /> },
                    { label: 'Country of Birth', value: personalData?.country_birth || 'N/A', icon: <Globe className="h-3 w-3" /> },
                    { label: 'Citizenship Status', value: personalData?.citizenship_status || 'N/A', icon: <Shield className="h-3 w-3" /> },
                    { label: 'PAN ID', value: personalData?.pan_id || 'N/A', icon: <CreditCard className="h-3 w-3" /> },
                    { label: 'Aadhaar', value: personalData?.adhaar ? `****${personalData.adhaar.slice(-4)}` : 'N/A', icon: <IdCard className="h-3 w-3" /> }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-400 flex items-center text-[11px] md:text-[12px]">
                        {item.icon && <span className="mr-1 text-gray-500">{item.icon}</span>}
                        {item.label}
                      </span>
                      <span className="font-normal text-white text-[11px] md:text-[12px]">
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Emergency Contact */}
              <div
                className="rounded-2xl p-4 md:p-6 border border-gray-800 hover:border-gray-700 transition"
                style={{
                  background: 'linear-gradient(180deg, #181818 0%, #1e1e1e 100%)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.8)'
                }}
              >
                <h3 className="text-white font-normal mb-3 md:mb-4 flex items-center text-sm md:text-[16px]">
                  <Phone className="h-4 w-4 mr-2 text-red-500" />
                  Emergency Contact
                </h3>
                <div className="space-y-3 md:space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-[11px] md:text-[12px]">Contact Name</span>
                    <span className="font-normal text-white text-[11px] md:text-[12px]">
                      {personalData?.emergency_contact_name || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-[11px] md:text-[12px]">Contact Phone</span>
                    <span className="font-normal text-blue-400 hover:text-blue-300 cursor-pointer text-[11px] md:text-[12px]">
                      {personalData?.emergency_contact_phone || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Center Column - Job Information */}
            <div className="space-y-4 md:space-y-6">
              <div
                className="rounded-2xl p-4 md:p-6 border border-gray-800 hover:border-gray-700 transition"
                style={{
                  background: 'linear-gradient(180deg, #181818 0%, #1e1e1e 100%)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.8)'
                }}
              >
                <h3 className="text-white font-normal mb-3 md:mb-4 flex items-center text-sm md:text-[16px]">
                  <Briefcase className="h-4 w-4 mr-2 text-blue-500" />
                  Job Information
                </h3>
                <div className="space-y-3 md:space-y-4">
                  {[
                    { label: 'Business Title', value: jobData?.business_title || 'N/A' },
                    { label: 'Job Profile', value: jobData?.job_profile || employeeData?.job_profile_progression_model_designation || jobData?.job || 'N/A' },
                    { label: 'Job Family', value: jobData?.job_family || 'N/A' },
                    { label: 'Management Level', value: jobData?.management_level || 'N/A' },
                    { label: 'Department', value: jobData?.department_name || employeeData?.department_name || 'N/A' },
                    { label: 'Employee Type', value: employeeData?.employee_type || 'N/A' },
                    { label: 'Time Type', value: jobData?.time_type || employeeData?.time_type || 'N/A' }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center gap-3">
                      <span className="text-gray-400 text-[11px] md:text-[12px]">{item.label}</span>
                      <span className="font-normal text-white text-[11px] md:text-[12px] truncate max-w-[60%] text-right" title={item.value}>
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Work Schedule & Hours */}
              <div
                className="rounded-2xl p-4 md:p-6 border border-gray-800 hover:border-gray-700 transition"
                style={{
                  background: 'linear-gradient(180deg, #181818 0%, #1e1e1e 100%)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.8)'
                }}
              >
                <h3 className="text-white font-normal mb-3 md:mb-4 flex items-center text-sm md:text-[16px]">
                  <Clock className="h-4 w-4 mr-2 text-purple-500" />
                  Work Schedule
                </h3>
                <div className="space-y-3 md:space-y-4">
                  {[
                    { label: 'Default Weekly Hours', value: `${employeeData?.default_weekly_hours || 'N/A'} hrs` },
                    { label: 'Scheduled Weekly Hours', value: `${employeeData?.scheduled_weekly_hours || 'N/A'} hrs` },
                    { label: 'Join Date', value: formatDate(employeeData?.joining_date) },
                    { label: 'Hire Date', value: formatDate(employeeData?.hire_date) },
                    { label: 'Experience', value: calculateExperience(employeeData?.joining_date), highlight: true }
                  ].map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-gray-400 text-[11px] md:text-[12px]">{item.label}</span>
                      <span
                        className={`font-normal ${item.highlight ? 'text-green-400' : 'text-white'} text-[11px] md:text-[12px]`}
                      >
                        {item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Location & Reporting */}
            <div className="space-y-4 md:space-y-6">
              {/* Location Information */}
              <div
                className="rounded-2xl p-4 md:p-6 border border-gray-800 hover:border-gray-700 transition"
                style={{
                  background: 'linear-gradient(180deg, #181818 0%, #1e1e1e 100%)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.8)'
                }}
              >
                <h3 className="text-white font-normal mb-3 md:mb-4 flex items-center text-sm md:text-[16px]">
                  <MapPin className="h-4 w-4 mr-2 text-green-500" />
                  Location Information
                </h3>
                <div className="space-y-3 md:space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-[11px] md:text-[12px]">Work Location</span>
                    <span className="font-normal text-white text-[11px] md:text-[12px]">
                      {jobData?.location || 'N/A'}
                    </span>
                  </div>
                  <div className="flex flex-col space-y-1.5 md:space-y-2">
                    <span className="text-gray-400 text-[11px] md:text-[12px]">Work Address</span>
                    <span className="font-normal text-white text-right text-[11px] md:text-[12px]">
                      {jobData?.work_address || 'N/A'}
                    </span>
                  </div>
                  <div className="flex flex-col space-y-1.5 md:space-y-2">
                    <span className="text-gray-400 text-[11px] md:text-[12px]">Home Address</span>
                    <span className="font-normal text-white text-right text-[11px] md:text-[12px]">
                      {personalData?.address || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Reporting Structure */}
              <div
                className="rounded-2xl p-4 md:p-6 border border-gray-800 hover:border-gray-700 transition"
                style={{
                  background: 'linear-gradient(180deg, #181818 0%, #1e1e1e 100%)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.8)'
                }}
              >
                <h3 className="text-white font-normal mb-3 md:mb-4 flex items-center text-sm md:text-[16px]">
                  <Users className="h-4 w-4 mr-2 text-orange-500" />
                  Reporting Structure
                </h3>
                <div className="space-y-3 md:space-y-4">
                  <div className="flex flex-col space-y-1.5 md:space-y-2">
                    <span className="text-gray-400 text-[11px] md:text-[12px]">Supervisory Organization</span>
                    <span className="font-normal text-white text-[11px] md:text-[12px]">
                      {jobData?.supervisory_organization || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-[11px] md:text-[12px]">Manager ID</span>
                    <span className="font-normal text-blue-400 text-[11px] md:text-[12px]">
                      {employeeData?.manager_employee_id || 'N/A'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400 text-[11px] md:text-[12px]">Department ID</span>
                    <span className="font-normal text-white text-[11px] md:text-[12px]">
                      {employeeData?.department_id || 'N/A'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div
                className="rounded-2xl p-4 md:p-6 border border-gray-800 hover:border-gray-700 transition"
                style={{
                  background: 'linear-gradient(180deg, #181818 0%, #1e1e1e 100%)',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.8)'
                }}
              >
                <h3 className="text-white font-normal mb-3 md:mb-4 flex items-center text-sm md:text-[16px]">
                  <Target className="h-4 w-4 mr-2 text-green-500" />
                  Skills & Expertise
                </h3>

                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {jobData?.skills && jobData.skills.trim() ? (
                    jobData.skills.split(',').map((skill, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-full text-gray-300 bg-gray-800/80 font-normal border border-gray-700 hover:bg-gray-700 transition-colors text-[11px] md:text-[12px]"
                      >
                        {skill.trim()}
                      </span>
                    ))
                  ) : (
                    <div className="text-gray-400 text-xs md:text-sm">
                      No skills data available
                    </div>
                  )}
                </div>

                <button className="text-blue-400 mt-3 md:mt-4 hover:text-blue-300 font-normal transition-colors text-[11px] md:text-[12px]">
                  View All Skills →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return <SummaryPage />;
};

export default EmployeeProfile;
