import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { FaEdit, FaRegEye, FaTimes, FaDownload, FaUpload, FaSave, FaUser, FaBriefcase, FaCog, FaFileUpload } from 'react-icons/fa';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddEmp from '../components/AddEmp';
import * as XLSX from 'xlsx';
import { RefreshCw, ListFilter, Search } from 'lucide-react';
import { createPortal } from 'react-dom';

const EmpManagement = () => {
  const fileInp = useRef(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [jobTitleFilter, setJobTitleFilter] = useState('');
  const [hireDateFilter, setHireDateFilter] = useState('');
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedJobDetails, setSelectedJobDetails] = useState(null);
  const [isEditable, setIsEditable] = useState(false);
  const [isJobEditable, setIsJobEditable] = useState(false);
  const [activeTab, setActiveTab] = useState('personal'); // 'personal', 'job', 'role'
  const [employees, setEmployees] = useState([]);
  const [jobDetails, setJobDetails] = useState([]);
  const [roles, setRoles] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const entriesPerPage = 10;

  // Dummy fallback data
  const dummyEmployees = [
    {
      id: 1,
      employee_id: 'EMP001',
      email: 'john.doe@company.com',
      employee_name: 'John Doe',
      employee_type: 'Permanent',
      time_type: 'Full-time',
      default_weekly_hours: '40.00',
      scheduled_weekly_hours: '40.00',
      joining_date: '2024-01-15T00:00:00.000Z',
      hire_date: '2024-01-15T00:00:00.000Z',
      job_profile_progression_model_designation: 'Software Engineer',
      department_id: 1,
      manager_id: null,
      status: 'Active',
      department_name: 'IT Department'
    }
  ];

  const dummyRoles = [
    { id: 1, name: 'Super Admin', description: 'Full system access' },
    { id: 2, name: 'HR Admin', description: 'HR management access' },
    { id: 3, name: 'Manager', description: 'Department management access' },
    { id: 4, name: 'Team Lead', description: 'Team leadership access' },
    { id: 5, name: 'Employee', description: 'Basic employee access' }
  ];

  const dummyDepartments = [
    { id: 1, name: 'Administration' },
    { id: 2, name: 'Information Technology' },
    { id: 3, name: 'Human Resources' },
    { id: 4, name: 'Engineering' }
  ];

  useEffect(() => {
    fetchEmployees();
    fetchRoles();
    fetchDepartments();
    fetchJobDetails();
  }, []);

  useEffect(() => {
    setFilteredEmployees(applyFilters(employees));
  }, [searchQuery, departmentFilter, jobTitleFilter, hireDateFilter, employmentTypeFilter, employees]);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/api/employees`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setEmployees(response.data.data || response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
      setEmployees(dummyEmployees);
      toast.error('Failed to fetch employees. Using offline data.');
    }
  };

  const fetchRoles = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/api/role-department/roles`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setRoles(response.data.roles || response.data);
    } catch (error) {
      console.error('Error fetching roles:', error);
      setRoles(dummyRoles);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/api/role-department/departments`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setDepartments(response.data.departments || response.data);
    } catch (error) {
      console.error('Error fetching departments:', error);
      setDepartments(dummyDepartments);
    }
  };

  const fetchJobDetails = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/api/jobDetails`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setJobDetails(response.data.data || response.data);
    } catch (error) {
      console.error('Error fetching job details:', error);
      setJobDetails([]);
    }
  };

  const fetchEmployeeById = async (employeeId) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/api/employees/employee/${employeeId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setSelectedEmployee(response.data.data || response.data);

      const jobDetail = jobDetails.find(job => job.individual_data_id === employeeId);
      setSelectedJobDetails(jobDetail || null);
    } catch (error) {
      console.error('Error fetching employee by ID:', error);
      const fallbackEmployee = employees.find(emp => emp.id === employeeId) ||
        dummyEmployees.find(emp => emp.id === employeeId);
      setSelectedEmployee(fallbackEmployee);
    }
  };

  const applyFilters = (employees) => {
    return employees.filter(employee => {
      const name = employee.employee_name || '';
      const empId = employee.employee_id || '';
      const department = employee.department_name || '';
      const jobTitle = employee.job_profile_progression_model_designation || '';
      const hireDate = employee.hire_date || '';
      const employmentType = employee.employee_type || '';

      const matchesDepartment = departmentFilter ? department.toLowerCase() === departmentFilter.toLowerCase() : true;
      const matchesJobTitle = jobTitleFilter ? jobTitle.toLowerCase() === jobTitleFilter.toLowerCase() : true;
      const matchesHireDate = hireDateFilter ? new Date(hireDate) >= new Date(hireDateFilter) : true;
      const matchesEmploymentType = employmentTypeFilter ? employmentType.toLowerCase() === employmentTypeFilter.toLowerCase() : true;
      const matchesSearch =
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        empId.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesDepartment && matchesJobTitle && matchesHireDate && matchesEmploymentType && matchesSearch;
    });
  };

  const handleFilterApply = () => {
    setFilteredEmployees(applyFilters(employees));
    setIsFilterPopupOpen(false);
    toast.success('Filters applied successfully!');
  };

  const handleFilterClear = () => {
    setDepartmentFilter('');
    setJobTitleFilter('');
    setHireDateFilter('');
    setEmploymentTypeFilter('');
    setFilteredEmployees(employees);
    setIsFilterPopupOpen(false);
    toast.info('Filters cleared!');
  };

  const openFilterPopup = () => setIsFilterPopupOpen(true);
  const closeFilterPopup = () => setIsFilterPopupOpen(false);

  const openModal = async (employeeId) => {
    const empId = typeof employeeId === 'object' ? employeeId.id : employeeId;
    await fetchEmployeeById(empId);
    setIsEditable(false);
    setIsJobEditable(false);
    setActiveTab('personal');
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEmployee(null);
    setSelectedJobDetails(null);
    setIsEditable(false);
    setIsJobEditable(false);
    setActiveTab('personal');
  };

  const handleEmployeeChange = (e) => {
    setSelectedEmployee(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleJobChange = (e) => {
    const { name, value } = e.target;
    setSelectedJobDetails(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const formatDate = (isoDate) => {
    if (!isoDate) return '';
    const date = new Date(isoDate);
    return date.toLocaleDateString();
  };

  const saveEmployeeChanges = async () => {
    try {
      await axios.put(`${process.env.REACT_APP_URL}/api/employees/${selectedEmployee.id}`, selectedEmployee, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const updatedEmployees = employees.map(emp =>
        emp.id === selectedEmployee.id ? selectedEmployee : emp
      );
      setEmployees(updatedEmployees);
      toast.success("Employee updated successfully!");
      setIsEditable(false);
    } catch (error) {
      console.error('Error updating employee:', error);
      toast.error('Error updating employee!');
    }
  };

  const saveJobChanges = async () => {
    try {
      await axios.patch(`${process.env.REACT_APP_URL}/api/jobDetails/${selectedJobDetails.id}`, selectedJobDetails, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });

      const updatedJobDetails = jobDetails.map(job =>
        job.id === selectedJobDetails.id ? selectedJobDetails : job
      );
      setJobDetails(updatedJobDetails);
      toast.success("Job details updated successfully!");
      setIsJobEditable(false);
    } catch (error) {
      console.error('Error updating job details:', error);
      toast.error('Error updating job details!');
    }
  };

  const handleBulkUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);

    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/api/employees/bulk-upload`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success(response.data.message || 'File uploaded successfully!');
      fetchEmployees();
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Error uploading file!');
    } finally {
      setLoading(false);
    }

    fileInp.current.value = '';
  };

  const exportToExcel = () => {
    const exportData = filteredEmployees.map((emp, index) => ({
      'S.No': index + 1,
      'Employee ID': emp.employee_id,
      'Employee Name': emp.employee_name,
      'Email': emp.email,
      'Employee Type': emp.employee_type,
      'Time Type': emp.time_type,
      'Weekly Hours': emp.scheduled_weekly_hours,
      'Joining Date': formatDate(emp.joining_date),
      'Hire Date': formatDate(emp.hire_date),
      'Department': emp.department_name,
      'Job Title': emp.job_profile_progression_model_designation,
      'Status': emp.status
    }));

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.json_to_sheet(exportData);

    const colWidths = Object.keys(exportData[0] || {}).map(key => ({
      wch: Math.max(key.length, 15)
    }));
    ws['!cols'] = colWidths;

    XLSX.utils.book_append_sheet(wb, ws, 'Employees');
    XLSX.writeFile(wb, `employees_${new Date().toISOString().split('T')[0]}.xlsx`);
    toast.success('Employee data exported successfully!');
  };

  const handleNextClick = () => {
    if (startIndex + entriesPerPage < filteredEmployees.length) {
      setStartIndex(startIndex + entriesPerPage);
    }
  };

  const handlePrevClick = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - entriesPerPage);
    }
  };

  const visibleEmployees = filteredEmployees.slice(startIndex, startIndex + entriesPerPage);
  const endIndex = Math.min(startIndex + entriesPerPage, filteredEmployees.length);

  return (
    <div
      className="min-h-screen  text-white px-3 py-4"
      style={{
        // Rich black gradient background with subtle depth
        background:
          'radial-gradient(1200px 600px at 10% 0%, #0f0f0f 0%, #0a0a0a 60%), radial-gradient(1000px 500px at 90% 0%, #111111 0%, #0a0a0a 55%), #0a0a0a',
        fontFamily: 'Plus Jakarta Sans, sans-serif',
        text: '#f0f0f0',
      }}
    >
      {/* Optional tiny grain overlay */}
      <div
        aria-hidden="true text-white"
        className="pointer-events-none fixed inset-0 opacity-[0.06] mix-blend-soft-light"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, rgba(255,255,255,0.3) 0px, rgba(255,255,255,0.3) 1px, transparent 1px, transparent 2px), repeating-linear-gradient(90deg, rgba(255,255,255,0.15) 0px, rgba(255,255,255,0.15) 1px, transparent 1px, transparent 2px)'
        }}
      />

      {/* Header */}
      <div className="text-center mb-6 md:mb-8 pt-2">
        <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-500 via-white to-blue-500 bg-clip-text text-transparent mb-2 md:mb-4 tracking-tight">
          Employee Management
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm md:text-lg">Manage your workforce efficiently</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-3 md:gap-4 mb-4 md:mb-6 items-center justify-between px-2 md:px-0">
        {/* Search */}
        <div className="relative flex-1 max-w-xl w-full">
          <input
            type="text"
            placeholder="Search by Name or ID..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-3 md:px-4 py-2 md:py-3 bg-[#0f0f10] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600/60 focus:border-transparent text-xs md:text-sm"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Search className="w-4 h-4 md:w-5 md:h-5" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2 md:gap-3">
          <button
            onClick={fetchEmployees}
            className="flex items-center gap-2 px-3 md:px-4 py-2 bg-[#141416] hover:bg-[#1b1c1f] border border-[#2a2a2a] rounded-lg transition-all text-xs md:text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={openFilterPopup}
            className="flex items-center gap-2 px-3 md:px-4 py-2 bg-[#141416] hover:bg-[#1b1c1f] border border-[#2a2a2a] rounded-lg transition-all text-xs md:text-sm"
          >
            <ListFilter className="w-4 h-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>

          <AddEmp />

          <button
            onClick={() => fileInp.current.click()}
            disabled={loading}
            className="flex items-center gap-2 px-3 md:px-4 py-2 bg-gradient-to-r from-white/90 to-blue-400/80 rounded-lg font-medium text-transparent bg-clip-text transition-all hover:scale-[1.02] border border-[#2a2a2a] disabled:opacity-50 text-xs md:text-sm"
          >
            {/* <FaFileUpload /> */}
            <span className=" sm:inline">{loading ? 'Uploading...' : 'Import Excel'}</span>
          </button>

          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 px-3 md:px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-lg transition-all text-xs md:text-sm"
          >
            <FaDownload />
            <span className=" sm:inline">Export Excel</span>
          </button>

          <input
            type="file"
            accept=".xlsx, .xls"
            ref={fileInp}
            onChange={handleBulkUpload}
            className="hidden"
          />
        </div>
      </div>

      {/* ===== Mobile: Card list view ===== */}
      <div className="md:hidden space-y-3 px-2">
        {visibleEmployees.map((employee, index) => (
          <div
            key={employee.id}
            className="rounded-xl border border-[#2a2a2a] bg-[#0f0f10]/90 backdrop-blur p-3 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
          >
            <div className="flex justify-between items-start">
              <div className="min-w-0">
                <div className="text-sm font-medium text-white truncate">{employee.employee_name}</div>
                <div className="text-[10px] text-gray-400 mt-0.5">
                  {employee.job_profile_progression_model_designation || '—'}
                </div>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-900 text-blue-200 border border-blue-700">
                    {employee.employee_type || 'Type'}
                  </span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] border ${
                    employee.status === 'Active'
                      ? 'bg-green-900 text-green-200 border-green-700'
                      : 'bg-red-900 text-red-200 border-red-700'
                  }`}>
                    {employee.status || 'Status'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => openModal(employee.id)}
                className="p-2 rounded-lg bg-blue-700 hover:bg-blue-600 transition"
                title="View Employee"
              >
                <FaRegEye className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-[11px] text-gray-300">
              <div className="flex flex-col">
                <span className="text-gray-500">ID</span>
                <span className="truncate text-white">{employee.employee_id}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-gray-500">Dept</span>
                <span className="truncate">{employee.department_name || '—'}</span>
              </div>
              <div className="flex flex-col col-span-2">
                <span className="text-gray-500">Email</span>
                <span className="truncate">{employee.email || '—'}</span>
              </div>
            </div>
          </div>
        ))}

        {visibleEmployees.length === 0 && (
          <div className="text-center text-gray-400 py-10">
            <div className="text-4xl mb-2">🌌</div>
            <p className="text-sm">No employees found</p>
          </div>
        )}
      </div>

      {/* ===== Desktop/Tablet: Enhanced table ===== */}
      <div className="hidden md:block">
        {/* Table Container */}
        <div className="mx-0 md:mx-0 bg-[#0f0f10]/90 border border-[#2a2a2a] rounded-xl overflow-hidden mb-6 backdrop-blur">
          <div className="overflow-x-auto no-scrollbar">
            <table className="w-full text-sm">
              <thead className="bg-[#0c0c0d] border-b border-[#2a2a2a] text-gray-200">
                <tr>
                  <th className="sticky left-0 z-20 bg-[#0c0c0d] px-4 text-white py-3 text-left font-semibold w-16 shadow-right-divider">
                    S.No.
                  </th>
                  <th className="sticky left-16 z-20 bg-[#0c0c0d] px-4 py-3 text-left font-semibold w-32 shadow-right-divider">
                    Employee ID
                  </th>
                  <th className="sticky left-48 z-20 bg-[#0c0c0d] px-4 py-3 text-left font-semibold w-48 shadow-right-divider">
                    Employee Name
                  </th>
                  <th className="px-4 py-3 text-left font-semibold w-56">Email</th>
                  <th className="px-4 py-3 text-left font-semibold w-40">Department</th>
                  <th className="px-4 py-3 text-left font-semibold w-56">Job Title</th>
                  <th className="px-4 py-3 text-left font-semibold w-40">Employee Type</th>
                  <th className="px-4 py-3 text-left font-semibold w-32">Status</th>
                  <th className="px-4 py-3 text-left font-semibold w-28">Actions</th>
                </tr>
              </thead>
              <tbody>
                {visibleEmployees.map((employee, index) => (
                  <tr
                    key={employee.id}
                    className="border-b border-[#1f1f22] text-white hover:bg-[#121215] transition-colors"
                  >
                    <td className="sticky left-0 z-10 bg-[#0f0f10] px-4 py-3 text-white font-medium shadow-right-divider">
                      {startIndex + index + 1}
                    </td>
                    <td className="sticky left-16 z-10 bg-[#0f0f10] px-4 py-3 font-medium text-blue-400 shadow-right-divider">
                      {employee.employee_id}
                    </td>
                    <td className="sticky left-48 z-10 bg-[#0f0f10] px-4 py-3 text-white font-medium shadow-right-divider">
                      {employee.employee_name}
                    </td>
                    <td className="px-4 py-3 text-gray-300">{employee.email}</td>
                    <td className="px-4 py-3 text-gray-300">{employee.department_name}</td>
                    <td className="px-4 py-3 text-gray-300">
                      {employee.job_profile_progression_model_designation}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        employee.employee_type === 'Permanent'
                          ? 'bg-blue-900 text-blue-200 border border-blue-700'
                          : employee.employee_type === 'Intern'
                            ? 'bg-yellow-900 text-yellow-200 border border-yellow-700'
                            : 'bg-purple-900 text-purple-200 border border-purple-700'
                      }`}>
                        {employee.employee_type}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        employee.status === 'Active'
                          ? 'bg-green-900 text-green-200 border border-green-700'
                          : 'bg-red-900 text-red-200 border border-red-700'
                      }`}>
                        {employee.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => openModal(employee.id)}
                        className="p-2 bg-blue-700 hover:bg-blue-600 rounded-lg transition-all hover:scale-105"
                        title="View Employee"
                      >
                        <FaRegEye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {visibleEmployees.length === 0 && (
                  <tr>
                    <td colSpan="9" className="px-4 py-12 text-center">
                      <div className="text-gray-400">
                        <div className="text-4xl mb-4">🌌</div>
                        <p className="text-lg">No employees found</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 md:gap-4 px-2">
        <div className="text-gray-400 text-xs md:text-sm">
          Showing {startIndex + 1} to {endIndex} of {filteredEmployees.length} entries
        </div>
        <div className="flex gap-2">
          <button
            onClick={handlePrevClick}
            disabled={startIndex === 0}
            className="px-3 md:px-4 py-2 bg-[#141416] hover:bg-[#1b1c1f] disabled:opacity-50 disabled:cursor-not-allowed border border-[#2a2a2a] rounded-lg transition-all text-xs md:text-sm"
          >
            ← Previous
          </button>
          <button
            onClick={handleNextClick}
            disabled={endIndex >= filteredEmployees.length}
            className="px-3 md:px-4 py-2 bg-[#141416] hover:bg-[#1b1c1f] disabled:opacity-50 disabled:cursor-not-allowed border border-[#2a2a2a] rounded-lg transition-all text-xs md:text-sm"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Filter Modal */}
      {isFilterPopupOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f0f10] border border-[#2a2a2a] rounded-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-5 border-b border-[#2a2a2a]">
              <h3 className="text-lg md:text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Filter Options
              </h3>
              <button
                onClick={closeFilterPopup}
                className="p-2 bg-red-700/90 hover:bg-red-600 rounded-lg transition"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-300 mb-2">Department:</label>
                <select
                  value={departmentFilter}
                  onChange={(e) => setDepartmentFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-[#121214] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600/60 text-xs md:text-sm"
                >
                  <option value="">All Departments</option>
                  {departments.map(dept => (
                    <option key={dept.id} value={dept.name}>{dept.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-300 mb-2">Employee Type:</label>
                <select
                  value={employmentTypeFilter}
                  onChange={(e) => setEmploymentTypeFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-[#121214] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600/60 text-xs md:text-sm"
                >
                  <option value="">All Types</option>
                  <option value="Permanent">Permanent</option>
                  <option value="Intern">Intern</option>
                  <option value="Contractor">Contractor</option>
                </select>
              </div>
              <div>
                <label className="block text-xs md:text-sm font-medium text-gray-300 mb-2">Hire Date From:</label>
                <input
                  type="date"
                  value={hireDateFilter}
                  onChange={(e) => setHireDateFilter(e.target.value)}
                  className="w-full px-3 py-2 bg-[#121214] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600/60 text-xs md:text-sm"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 md:gap-3 p-5 border-t border-[#2a2a2a]">
              <button
                onClick={handleFilterApply}
                className="px-3 md:px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition text-xs md:text-sm"
              >
                Apply Filters
              </button>
              <button
                onClick={handleFilterClear}
                className="px-3 md:px-4 py-2 bg-red-700 hover:bg-red-600 rounded-lg transition text-xs md:text-sm"
              >
                Clear All
              </button>
              <button
                onClick={closeFilterPopup}
                className="px-3 md:px-4 py-2 bg-[#1b1c1f] hover:bg-[#232528] rounded-lg transition border border-[#2a2a2a] text-xs md:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Employee Details Modal (unchanged functionality) */}
      {isModalOpen && selectedEmployee && createPortal(
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl w-full max-w-7xl max-h-[95vh] overflow-hidden shadow-2xl">
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-[#2a2a2a] bg-[#0a0a0a] sticky top-0 z-10">
              <h3 className="text-2xl md:text-3xl font-jakarta font-bold bg-gradient-to-r from-[#ff6600] via-white to-[#0066ff] bg-clip-text text-transparent">
                Employee Details - {selectedEmployee.employee_name}
              </h3>
              <button
                onClick={closeModal}
                className="p-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg transition shadow-lg hover:shadow-red-500/25 group"
              >
                <FaTimes className="w-5 h-5 text-white group-hover:rotate-90 transition-transform" />
              </button>
            </div>

            {/* Tabs */}
            <div className="flex border-b border-[#2a2a2a] bg-[#0a0a0a]">
              <button
                onClick={() => setActiveTab('personal')}
                className={`flex items-center gap-2 px-4 md:px-6 py-3 md:py-4 font-medium transition ${activeTab === 'personal'
                  ? 'border-b-2 border-blue-500 text-blue-400 bg-blue-500/10'
                  : 'text-gray-400 hover:text-white hover:bg-[#111214]'}`
                }
              >
                <FaUser className="w-4 h-4" />
                Personal Info
              </button>
              <button
                onClick={() => setActiveTab('job')}
                className={`flex items-center gap-2 px-4 md:px-6 py-3 md:py-4 font-medium transition ${activeTab === 'job'
                  ? 'border-b-2 border-green-500 text-green-400 bg-green-500/10'
                  : 'text-gray-400 hover:text-white hover:bg-[#111214]'}`
                }
              >
                <FaBriefcase className="w-4 h-4" />
                Job Details
              </button>
              <button
                onClick={() => setActiveTab('role')}
                className={`flex items-center gap-2 px-4 md:px-6 py-3 md:py-4 font-medium transition ${activeTab === 'role'
                  ? 'border-b-2 border-purple-500 text-purple-400 bg-purple-500/10'
                  : 'text-gray-400 hover:text-white hover:bg-[#111214]'}`
                }
              >
                <FaCog className="w-4 h-4" />
                Role & Permissions
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto no-scrollbar max-h-[calc(95vh-200px)]">
              <div className="p-4 md:p-6">
                {/* Personal Tab */}
                {activeTab === 'personal' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {[
                        { label: 'Employee ID', name: 'employee_id', type: 'text', readOnly: true },
                        { label: 'Employee Name', name: 'employee_name', type: 'text' },
                        { label: 'Email', name: 'email', type: 'email' },
                        { label: 'Employee Type', name: 'employee_type', type: 'select', options: ['Permanent', 'Contract', 'Temporary', 'Intern'] },
                        { label: 'Time Type', name: 'time_type', type: 'select', options: ['Full-time', 'Part-time', 'Intern', '    '] },
                        { label: 'Weekly Hours', name: 'scheduled_weekly_hours', type: 'number' },
                        { label: 'Joining Date', name: 'joining_date', type: 'date' },
                        { label: 'Hire Date', name: 'hire_date', type: 'date' },
                        { label: 'Department', name: 'department_id', type: 'select', options: departments, optionValue: 'id', optionLabel: 'name' },
                        { label: 'Status', name: 'status', type: 'select', options: ['Active', 'Inactive'] }
                      ].map((field, index) => (
                        <div key={index} className="space-y-2">
                          <label className="block text-[11px] md:text-xs font-jakarta font-semibold text-[#a3a3a3] uppercase tracking-wider">
                            {field.label}
                          </label>
                          {field.type === 'select' ? (
                            <select
                              value={selectedEmployee[field.name] || ''}
                              name={field.name}
                              disabled={!isEditable || field.readOnly}
                              onChange={handleEmployeeChange}
                              className={`w-full px-3 md:px-4 py-2.5 md:py-3 bg-[#111111] border rounded-lg text-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-600/60 focus:border-transparent text-sm ${
                                !isEditable || field.readOnly
                                  ? 'border-[#2a2a2a] text-[#a3a3a3] cursor-not-allowed'
                                  : 'border-[#2a2a2a] hover:border-blue-600/50 focus:shadow-[0_0_20px_rgba(37,99,235,0.15)]'
                              }`}
                            >
                              <option value="">Select {field.label}</option>
                              {field.options && (
                                Array.isArray(field.options) && typeof field.options[0] === 'string'
                                  ? field.options.map(option => (
                                    <option key={option} value={option}>{option}</option>
                                  ))
                                  : field.options.map(option => (
                                    <option key={option[field.optionValue]} value={option[field.optionValue]}>
                                      {option[field.optionLabel]}
                                    </option>
                                  ))
                              )}
                            </select>
                          ) : (
                            <input
                              type={field.type}
                              value={field.type === 'date' && selectedEmployee[field.name]
                                ? selectedEmployee[field.name].split('T')[0]
                                : selectedEmployee[field.name] || ''}
                              name={field.name}
                              readOnly={!isEditable || field.readOnly}
                              onChange={handleEmployeeChange}
                              className={`w-full px-3 md:px-4 py-2.5 md:py-3 bg-[#111111] border rounded-lg text-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-600/60 focus:border-transparent text-sm ${
                                !isEditable || field.readOnly
                                  ? 'border-[#2a2a2a] text-[#a3a3a3] cursor-not-allowed'
                                  : 'border-[#2a2a2a] hover:border-blue-600/50 focus:shadow-[0_0_20px_rgba(37,99,235,0.15)]'
                              }`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Job Tab */}
                {activeTab === 'job' && selectedJobDetails && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                      {[
                        { label: 'Supervisory Organization', name: 'supervisory_organization', type: 'text' },
                        { label: 'Job', name: 'job', type: 'text' },
                        { label: 'Business Title', name: 'business_title', type: 'text' },
                        { label: 'Job Profile', name: 'job_profile', type: 'text' },
                        { label: 'Job Family', name: 'job_family', type: 'text' },
                        { label: 'Management Level', name: 'management_level', type: 'text' },
                        { label: 'Time Type', name: 'time_type', type: 'select', options: ['Full-time', 'Part-time'] },
                        { label: 'Location', name: 'location', type: 'text' },
                        { label: 'Phone', name: 'phone', type: 'tel' },
                        { label: 'Email', name: 'email', type: 'email' },
                        { label: 'Work Address', name: 'work_address', type: 'textarea' },
                        { label: 'Skills', name: 'skills', type: 'text' }
                      ].map((field, index) => (
                        <div key={index} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                          <label className="block text-[11px] md:text-xs font-jakarta font-semibold text-[#a3a3a3] uppercase tracking-wider mb-2">
                            {field.label}
                          </label>
                          {field.type === 'select' ? (
                            <select
                              value={selectedJobDetails[field.name] || ''}
                              name={field.name}
                              disabled={!isJobEditable}
                              onChange={handleJobChange}
                              className={`w-full px-3 md:px-4 py-2.5 md:py-3 bg-[#111111] border rounded-lg text-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-600/60 focus:border-transparent text-sm ${
                                !isJobEditable
                                  ? 'border-[#2a2a2a] text-[#a3a3a3] cursor-not-allowed'
                                  : 'border-[#2a2a2a] hover:border-blue-600/50 focus:shadow-[0_0_20px_rgba(37,99,235,0.15)]'
                              }`}
                            >
                              <option value="">Select {field.label}</option>
                              {field.options.map(option => (
                                <option key={option} value={option}>{option}</option>
                              ))}
                            </select>
                          ) : field.type === 'textarea' ? (
                            <textarea
                              value={selectedJobDetails[field.name] || ''}
                              name={field.name}
                              readOnly={!isJobEditable}
                              onChange={handleJobChange}
                              rows="4"
                              className={`w-full px-3 md:px-4 py-2.5 md:py-3 bg-[#111111] border rounded-lg text-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-600/60 focus:border-transparent resize-none text-sm ${
                                !isJobEditable
                                  ? 'border-[#2a2a2a] text-[#a3a3a3] cursor-not-allowed'
                                  : 'border-[#2a2a2a] hover:border-blue-600/50 focus:shadow-[0_0_20px_rgba(37,99,235,0.15)]'
                              }`}
                            />
                          ) : (
                            <input
                              type={field.type}
                              value={selectedJobDetails[field.name] || ''}
                              name={field.name}
                              readOnly={!isJobEditable}
                              onChange={handleJobChange}
                              className={`w-full px-3 md:px-4 py-2.5 md:py-3 bg-[#111111] border rounded-lg text-white transition-all focus:outline-none focus:ring-2 focus:ring-blue-600/60 focus:border-transparent text-sm ${
                                !isJobEditable
                                  ? 'border-[#2a2a2a] text-[#a3a3a3] cursor-not-allowed'
                                  : 'border-[#2a2a2a] hover:border-blue-600/50 focus:shadow-[0_0_20px_rgba(37,99,235,0.15)]'
                              }`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Role Tab */}
                {activeTab === 'role' && (
                  <div className="space-y-6">
                    <div className="bg-gradient-to-br from-[#121214] to-[#17181b] p-5 md:p-6 rounded-xl border border-[#2a2a2a]">
                      <h4 className="text-lg md:text-xl font-bold text-purple-400 mb-4">Role Assignment</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                        <div>
                          <label className="block text-xs md:text-sm font-medium text-gray-300 mb-2">Current Role:</label>
                          <select
                            className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-[#111111] border border-[#2a2a2a] rounded-lg text-white text-sm"
                            defaultValue=""
                          >
                            <option value="">Select Role</option>
                            {roles.map(role => (
                              <option key={role.id} value={role.id}>{role.name}</option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-xs md:text-sm font-medium text-gray-300 mb-2">Manager:</label>
                          <select
                            className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-[#111111] border border-[#2a2a2a] rounded-lg text-white text-sm"
                            defaultValue=""
                          >
                            <option value="">Select Manager</option>
                            {employees.filter(emp => emp.id !== selectedEmployee.id).map(emp => (
                              <option key={emp.id} value={emp.id}>{emp.employee_name}</option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-br from-[#121214] to-[#17181b] p-5 md:p-6 rounded-xl border border-[#2a2a2a]">
                      <h4 className="text-lg md:text-xl font-bold text-purple-400 mb-4">Available Roles</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                        {roles.map(role => (
                          <div key={role.id} className="p-4 bg-[#0f0f10] rounded-lg border border-[#2a2a2a]">
                            <h5 className="font-bold text-white mb-1.5">{role.name}</h5>
                            <p className="text-gray-400 text-xs md:text-sm mb-3">{role.description}</p>
                            <div className="flex flex-wrap gap-1">
                              {role.permissions && role.permissions.map(permission => (
                                <span key={permission} className="px-2 py-1 bg-purple-900/40 text-purple-200 text-[10px] rounded">
                                  {permission}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="flex flex-wrap justify-end gap-2 md:gap-4 p-4 md:p-6 border-t border-[#2a2a2a] bg-[#0a0a0a] sticky bottom-0">
              {activeTab === 'personal' && (
                <>
                  <button
                    className={`flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-jakarta font-semibold transition-all hover:scale-[1.02] shadow-lg ${
                      isEditable
                        ? 'bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white shadow-red-500/25'
                        : 'bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white shadow-green-500/25'
                    }`}
                    onClick={() => setIsEditable(!isEditable)}
                  >
                    <FaEdit className="w-4 h-4" />
                    {isEditable ? 'Cancel Edit' : 'Edit Personal Info'}
                  </button>

                  {isEditable && (
                    <button
                      onClick={saveEmployeeChanges}
                      className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-[#2563eb] to-[#7c3aed] rounded-lg font-jakarta font-semibold text-white transition-all hover:scale-[1.02] shadow-lg shadow-blue-500/25"
                    >
                      <FaSave className="w-4 h-4" />
                      Save Changes
                    </button>
                  )}
                </>
              )}

              {activeTab === 'job' && selectedJobDetails && (
                <>
                  <button
                    className={`flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 rounded-lg font-jakarta font-semibold transition-all hover:scale-[1.02] shadow-lg ${
                      isJobEditable
                        ? 'bg-gradient-to-r from-[#ef4444] to-[#dc2626] text-white shadow-red-500/25'
                        : 'bg-gradient-to-r from-[#22c55e] to-[#16a34a] text-white shadow-green-500/25'
                    }`}
                    onClick={() => setIsJobEditable(!isJobEditable)}
                  >
                    <FaEdit className="w-4 h-4" />
                    {isJobEditable ? 'Cancel Edit' : 'Edit Job Details'}
                  </button>

                  {isJobEditable && (
                    <button
                      onClick={saveJobChanges}
                      className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-[#2563eb] to-[#7c3aed] rounded-lg font-jakarta font-semibold text-white transition-all hover:scale-[1.02] shadow-lg shadow-blue-500/25"
                    >
                      <FaSave className="w-4 h-4" />
                      Save Job Changes
                    </button>
                  )}
                </>
              )}

              <button
                className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-[#374151] to-[#4b5563] rounded-lg font-jakarta font-semibold text-white transition-all hover:scale-[1.02] shadow-lg"
                onClick={closeModal}
              >
                <FaTimes className="w-4 h-4" />
                Close
              </button>
            </div>
          </div>
        </div>,
        document.body
      )}

      {/* Tiny helpers */}
      <style>{`
        .grain {
          background-image: radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px);
          background-size: 3px 3px;
        }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }

        /* Soft divider shadow to separate sticky columns from scrolling content */
        .shadow-right-divider {
          box-shadow: 6px 0 12px -8px rgba(0,0,0,0.6);
        }
      `}</style>
    </div>
  );
};

export default EmpManagement;
