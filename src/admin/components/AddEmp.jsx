import axios from 'axios';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { FaBriefcase, FaGraduationCap, FaPlus, FaTimes, FaUser, FaBuilding } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddEmployee = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [roles, setRoles] = useState([]);
  const [loadingRoles, setLoadingRoles] = useState(false);
  
  // Employee basic data for first API
  const [employeeData, setEmployeeData] = useState({
    employee_id: '',
    employee_name: '',
    email: '',
    employee_type: 'Permanent',
    time_type: 'Full-time',
    default_weekly_hours: 40.00,
    scheduled_weekly_hours: 40.00,
    joining_date: '',
    hire_date: '',
    job_profile_progression_model_designation: '',
    department_name: '',
    role_name: 'Employee',
    status: 'Active',
    manager_id: ''
  });

  // Job details data for second API
  const [jobDetailsData, setJobDetailsData] = useState({
    supervisory_organization: '',
    job: '',
    business_title: '',
    job_profile: '',
    job_family: '',
    management_level: '',
    location: '',
    phone: '',
    work_address: '',
    skills: ['', '', '', '', '']
  });

  // Fetch roles on component mount
  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setLoadingRoles(true);
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/api/role-department/roles`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setRoles(response.data.roles || []);
    } catch (error) {
      console.error('Error fetching roles:', error);
      toast.error('Error fetching roles. Please try again.');
      setRoles([]);
    } finally {
      setLoadingRoles(false);
    }
  };

  const openForm = () => {
    setIsOpen(true);
    setIsClosing(false);
  };

  const closeForm = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      clearForm();
    }, 300);
  };

  const clearForm = () => {
    setEmployeeData({
      employee_id: '',
      employee_name: '',
      email: '',
      employee_type: 'Permanent',
      time_type: 'Full-time',
      default_weekly_hours: 40.00,
      scheduled_weekly_hours: 40.00,
      joining_date: '',
      hire_date: '',
      job_profile_progression_model_designation: '',
      department_name: '',
      role_name: 'Employee',
      status: 'Active',
      manager_id: ''
    });
    setJobDetailsData({
      supervisory_organization: '',
      job: '',
      business_title: '',
      job_profile: '',
      job_family: '',
      management_level: '',
      location: '',
      phone: '',
      work_address: '',
      skills: ['', '', '', '', '']
    });
  };

  const handleEmployeeInputChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });
  };

  const handleJobDetailsInputChange = (e) => {
    const { name, value } = e.target;
    setJobDetailsData({ ...jobDetailsData, [name]: value });
  };

  const handleSkillChange = (index, value) => {
    const newSkills = [...jobDetailsData.skills];
    newSkills[index] = value;
    setJobDetailsData({ ...jobDetailsData, skills: newSkills });
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!employeeData.employee_id.trim()) {
      toast.error('Employee ID is required');
      return;
    }

    if (!employeeData.employee_name.trim()) {
      toast.error('Employee name is required');
      return;
    }

    if (!isValidEmail(employeeData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    if (!employeeData.joining_date || !employeeData.hire_date) {
      toast.error('Joining date and hire date are required');
      return;
    }

    if (!employeeData.department_name.trim()) {
      toast.error('Department name is required');
      return;
    }

    if (!employeeData.job_profile_progression_model_designation.trim()) {
      toast.error('Designation is required');
      return;
    }

    if (!jobDetailsData.phone.trim()) {
      toast.error('Phone number is required');
      return;
    }

    try {
      // First API call - Create Employee
      const employeeResponse = await axios.post(
        `${process.env.REACT_APP_URL}/api/employees`,
        employeeData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Employee created successfully:', employeeResponse.data);

      // Second API call - Create Job Details
      const jobDetailsPayload = {
        individual_data_id: employeeData.employee_id,
        supervisory_organization: jobDetailsData.supervisory_organization,
        job: jobDetailsData.job,
        business_title: jobDetailsData.business_title,
        job_profile: jobDetailsData.job_profile,
        job_family: jobDetailsData.job_family,
        management_level: jobDetailsData.management_level,
        time_type: employeeData.time_type,
        location: jobDetailsData.location,
        phone: jobDetailsData.phone,
        email: employeeData.email,
        work_address: jobDetailsData.work_address,
        skills: jobDetailsData.skills.filter(skill => skill.trim() !== '')
      };

      const jobDetailsResponse = await axios.post(
        `${process.env.REACT_APP_URL}/api/jobDetails`,
        jobDetailsPayload,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Job details created successfully:', jobDetailsResponse.data);
      toast.success('Employee added successfully!');
      closeForm();
    } catch (error) {
      console.error('Error adding employee:', error);
      if (error.response?.status === 409) {
        toast.error('Employee ID already exists. Please use a different ID.');
      } else {
        toast.error(error.response?.data?.message || 'Error adding employee. Please try again.');
      }
    }
  };

  return (
    <>
      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&display=swap');
        
        .noscrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .noscrollbar::-webkit-scrollbar {
          display: none;
        }

        .gradient-text {
          background: linear-gradient(135deg, #60a5fa 0%, #ffffff 50%, #3b82f6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .gradient-border {
          background: linear-gradient(135deg, #1e40af, #3b82f6, #60a5fa);
          padding: 1px;
          border-radius: 12px;
        }

        .gradient-border-content {
          background: #0a0a0a;
          border-radius: 11px;
          height: 100%;
          width: 100%;
        }

        .glow-button {
          background: linear-gradient(135deg, #1e40af, #3b82f6);
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
          transition: all 0.3s ease;
        }

        .glow-button:hover {
          box-shadow: 0 0 30px rgba(59, 130, 246, 0.5);
          transform: translateY(-1px);
        }

        * {
          font-family: 'Plus Jakarta Sans', sans-serif;
        }
      `}</style>

      <div>
        <button 
          onClick={openForm} 
          className="glow-button group relative flex items-center gap-2 px-4 py-2.5 text-white rounded-xl font-medium transition-all duration-300 hover:scale-105"
        >
          <FaPlus className="w-4 h-4" />
          <span className="gradient-text">Create Employee</span>
        </button>

        {isOpen && createPortal(
          <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className={`relative bg-black border border-gray-800 rounded-2xl w-full max-w-7xl max-h-[95vh] transition-all duration-300 shadow-2xl ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
              
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-gray-800">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-500 rounded-lg">
                    <FaUser className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold gradient-text">
                    Create New Employee
                  </h3>
                </div>
                <button 
                  className="p-2 bg-gray-900 hover:bg-red-600/20 border border-gray-700 hover:border-red-500/50 rounded-lg transition-all duration-200" 
                  onClick={closeForm}
                >
                  <FaTimes className="w-4 h-4 text-gray-400 hover:text-red-400" />
                </button>
              </div>

              {/* Form Container */}
              <div className="overflow-y-auto noscrollbar max-h-[calc(95vh-160px)]">
                <form onSubmit={handleSubmit} className="p-6">
                  
                  {/* Horizontal Layout */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-6">
                    
                    {/* Basic Information */}
                    <div className="gradient-border">
                      <div className="gradient-border-content p-5">
                        <div className="flex items-center gap-2 mb-4">
                          <FaUser className="w-4 h-4 text-blue-400" />
                          <h4 className="text-sm font-semibold text-blue-400">Basic Info</h4>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Employee ID *</label>
                            <input
                              type="text"
                              name="employee_id"
                              value={employeeData.employee_id}
                              onChange={handleEmployeeInputChange}
                              required
                              placeholder="EMP001"
                              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Full Name *</label>
                            <input
                              type="text"
                              name="employee_name"
                              value={employeeData.employee_name}
                              onChange={handleEmployeeInputChange}
                              required
                              placeholder="John Doe"
                              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Email Address *</label>
                            <input
                              type="email"
                              name="email"
                              value={employeeData.email}
                              onChange={handleEmployeeInputChange}
                              required
                              placeholder="john@company.com"
                              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Phone *</label>
                            <input
                              type="tel"
                              name="phone"
                              value={jobDetailsData.phone}
                              onChange={handleJobDetailsInputChange}
                              required
                              placeholder="+1234567890"
                              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Manager ID</label>
                            <input
                              type="text"
                              name="manager_id"
                              value={employeeData.manager_id}
                              onChange={handleEmployeeInputChange}
                              placeholder="EMP001"
                              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Employment Details */}
                    <div className="gradient-border">
                      <div className="gradient-border-content p-5">
                        <div className="flex items-center gap-2 mb-4">
                          <FaBriefcase className="w-4 h-4 text-blue-400" />
                          <h4 className="text-sm font-semibold text-blue-400">Employment</h4>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Joining Date *</label>
                            <input
                              type="date"
                              name="joining_date"
                              value={employeeData.joining_date}
                              onChange={handleEmployeeInputChange}
                              required
                              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Hire Date *</label>
                            <input
                              type="date"
                              name="hire_date"
                              value={employeeData.hire_date}
                              onChange={handleEmployeeInputChange}
                              required
                              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Employee Type *</label>
                            <select
                              name="employee_type"
                              value={employeeData.employee_type}
                              onChange={handleEmployeeInputChange}
                              required
                              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="Permanent">Permanent</option>
                              <option value="Contract">Contract</option>
                              <option value="Intern">Intern</option>
                              <option value="Temporary">Temporary</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Time Type *</label>
                            <select
                              name="time_type"
                              value={employeeData.time_type}
                              onChange={handleEmployeeInputChange}
                              required
                              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="Full-time">Full-time</option>
                              <option value="Part-time">Part-time</option>
                              <option value="Contract">Contract</option>
                              <option value="Intern">Intern</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Role *</label>
                            <select
                              name="role_name"
                              value={employeeData.role_name}
                              onChange={handleEmployeeInputChange}
                              required
                              disabled={loadingRoles}
                              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50"
                            >
                              <option value="">Select Role</option>
                              {roles.map((role) => (
                                <option key={role.id} value={role.name}>
                                  {role.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Job Information */}
                    <div className="gradient-border">
                      <div className="gradient-border-content p-5">
                        <div className="flex items-center gap-2 mb-4">
                          <FaBuilding className="w-4 h-4 text-blue-400" />
                          <h4 className="text-sm font-semibold text-blue-400">Job Details</h4>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Department *</label>
                            <input
                              type="text"
                              name="department_name"
                              value={employeeData.department_name}
                              onChange={handleEmployeeInputChange}
                              required
                              placeholder="Information Technology"
                              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Designation *</label>
                            <input
                              type="text"
                              name="job_profile_progression_model_designation"
                              value={employeeData.job_profile_progression_model_designation}
                              onChange={handleEmployeeInputChange}
                              required
                              placeholder="Software Engineer"
                              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Job Title</label>
                            <input
                              type="text"
                              name="job"
                              value={jobDetailsData.job}
                              onChange={handleJobDetailsInputChange}
                              placeholder="Senior Software Engineer"
                              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Business Title</label>
                            <input
                              type="text"
                              name="business_title"
                              value={jobDetailsData.business_title}
                              onChange={handleJobDetailsInputChange}
                              placeholder="Senior Developer"
                              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Job Profile</label>
                            <input
                              type="text"
                              name="job_profile"
                              value={jobDetailsData.job_profile}
                              onChange={handleJobDetailsInputChange}
                              placeholder="Senior Software Engineer"
                              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Additional Information */}
                    <div className="gradient-border">
                      <div className="gradient-border-content p-5">
                        <div className="flex items-center gap-2 mb-4">
                          <FaGraduationCap className="w-4 h-4 text-blue-400" />
                          <h4 className="text-sm font-semibold text-blue-400">Additional</h4>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Supervisory Organization</label>
                            <input
                              type="text"
                              name="supervisory_organization"
                              value={jobDetailsData.supervisory_organization}
                              onChange={handleJobDetailsInputChange}
                              placeholder="Engineering Department"
                              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Management Level</label>
                            <select
                              name="management_level"
                              value={jobDetailsData.management_level}
                              onChange={handleJobDetailsInputChange}
                              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            >
                              <option value="">Select Level</option>
                              <option value="Entry">Entry</option>
                              <option value="Junior">Junior</option>
                              <option value="Mid">Mid</option>
                              <option value="Senior">Senior</option>
                              <option value="Lead">Lead</option>
                              <option value="Manager">Manager</option>
                              <option value="Director">Director</option>
                              <option value="VP">VP</option>
                              <option value="C-Level">C-Level</option>
                            </select>
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Job Family</label>
                            <input
                              type="text"
                              name="job_family"
                              value={jobDetailsData.job_family}
                              onChange={handleJobDetailsInputChange}
                              placeholder="Engineering"
                              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Location</label>
                            <input
                              type="text"
                              name="location"
                              value={jobDetailsData.location}
                              onChange={handleJobDetailsInputChange}
                              placeholder="Hyderabad, Hytechcity"
                              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                            />
                          </div>

                          <div>
                            <label className="block text-xs font-medium text-gray-400 mb-1">Work Address</label>
                            <textarea
                              name="work_address"
                              value={jobDetailsData.work_address}
                              onChange={handleJobDetailsInputChange}
                              placeholder="123 Tech Street, Hytechcity, Hyderabad"
                              rows="2"
                              className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 resize-none noscrollbar"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Skills Section */}
                  <div className="mt-6">
                    <div className="gradient-border">
                      <div className="gradient-border-content p-5">
                        <div className="flex items-center gap-2 mb-4">
                          <FaGraduationCap className="w-4 h-4 text-blue-400" />
                          <h4 className="text-sm font-semibold text-blue-400">Skills</h4>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                          {jobDetailsData.skills.map((skill, index) => (
                            <div key={index}>
                              <input
                                type="text"
                                value={skill}
                                onChange={(e) => handleSkillChange(index, e.target.value)}
                                placeholder={`Skill ${index + 1}`}
                                className="w-full px-3 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white text-sm placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Form Footer */}
                  <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-800">
                    <button 
                      type="button" 
                      className="px-6 py-2 bg-gray-900 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white rounded-lg text-sm transition-all duration-200" 
                      onClick={closeForm}
                    >
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="glow-button px-6 py-2 text-white font-medium rounded-lg text-sm"
                    >
                      <span className="gradient-text">Create Employee</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>,
          document.body
        )}

        <ToastContainer 
          position="top-right"
          theme="dark"
          toastClassName="!bg-gray-900 !text-white !border !border-gray-700"
          progressClassName="!bg-gradient-to-r !from-blue-500 !to-blue-400"
        />
      </div>
    </>
  );
};

export default AddEmployee;