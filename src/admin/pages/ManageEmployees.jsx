import axios from 'axios';
import { useEffect, useRef, useState, useMemo } from 'react';
import { FaEdit, FaCheckCircle, FaExclamationTriangle, FaRegEye, FaTimes, FaDownload, FaUpload, FaSave, FaUser, FaBriefcase } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddEmp from '../components/AddEmp';
import * as XLSX from 'xlsx';
import { RefreshCw, ListFilter, Search } from 'lucide-react';
import { createPortal } from 'react-dom';

const EmpManagement = () => {
  const fileInp = useRef(null);

  // search + filters
  const [searchQuery, setSearchQuery] = useState('');
  const [isFilterPopupOpen, setIsFilterPopupOpen] = useState(false);
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [hireDateFilter, setHireDateFilter] = useState('');
  const [employmentTypeFilter, setEmploymentTypeFilter] = useState('');

  // data
  const [employees, setEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [jobDetails, setJobDetails] = useState([]);
  
  // pagination info from backend
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalEmployees: 0,
    hasNext: false,
    hasPrev: false
  });

  // ui / modal
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedJobDetails, setSelectedJobDetails] = useState(null);
  const [activeTab, setActiveTab] = useState('personal');
  const [isEditable, setIsEditable] = useState(false);
  const [isJobEditable, setIsJobEditable] = useState(false);

  // Add these state variables to your component
  const [uploadResults, setUploadResults] = useState(null);
  const [showResultsModal, setShowResultsModal] = useState(false);

  // pagination constants
  const entriesPerPage = 10;

  // dummy fallbacks
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

  const dummyDepartments = [
    { id: 1, name: 'Administration' },
    { id: 2, name: 'Information Technology' },
    { id: 3, name: 'Human Resources' },
    { id: 4, name: 'Engineering' }
  ];

  useEffect(() => {
    fetchAll();
  }, []);

  // Fetch employees whenever page or filters change
  useEffect(() => {
    fetchEmployeesCore();
  }, [pagination.currentPage, searchQuery, departmentFilter, employmentTypeFilter, hireDateFilter]);

  const fetchAll = async () => {
    setLoading(true);
    try {
      await Promise.all([fetchEmployeesCore(), fetchDepartmentsCore(), fetchJobDetailsCore()]);
      toast.success('Employees loaded');
    } finally {
      setLoading(false);
    }
  };

  const fetchEmployeesCore = async () => {
    try {
      // Build query parameters for server-side filtering and pagination
      const params = {
        page: pagination.currentPage,
        limit: entriesPerPage
      };

      // Add filters to params if they exist
      if (searchQuery) params.search = searchQuery;
      if (departmentFilter) params.department = departmentFilter;
      if (employmentTypeFilter) params.employmentType = employmentTypeFilter;
      if (hireDateFilter) params.hireDateFrom = hireDateFilter;

      const res = await axios.get(`${process.env.REACT_APP_URL}/api/employees`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        params
      });

      const responseData = res?.data;
      const employeeList = responseData?.data || responseData || [];
      const paginationData = responseData?.pagination || {};

      setEmployees(Array.isArray(employeeList) ? employeeList : []);
      setPagination({
        currentPage: paginationData.currentPage || 1,
        totalPages: paginationData.totalPages || 1,
        totalEmployees: paginationData.totalEmployees || employeeList.length,
        hasNext: paginationData.hasNext || false,
        hasPrev: paginationData.hasPrev || false
      });

    } catch (e) {
      console.error('fetchEmployees error:', e);
      setEmployees(dummyEmployees);
      setPagination({
        currentPage: 1,
        totalPages: 1,
        totalEmployees: dummyEmployees.length,
        hasNext: false,
        hasPrev: false
      });
      toast.error('Failed to fetch employees. Using offline data.');
    }
  };

  const fetchDepartmentsCore = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/api/role-department/departments`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const list = res?.data?.departments || res?.data || [];
      setDepartments(Array.isArray(list) ? list : []);
    } catch (e) {
      console.error('fetchDepartments error:', e);
      setDepartments(dummyDepartments);
    }
  };

  const fetchJobDetailsCore = async () => {
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/api/jobDetails`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const list = res?.data?.data || res?.data || [];
      setJobDetails(Array.isArray(list) ? list : []);
    } catch (e) {
      console.error('fetchJobDetails error:', e);
      setJobDetails([]);
    }
  };

  // Handle filter changes - reset to page 1 and refetch
  const handleFilterChange = (filterType, value) => {
    setPagination(prev => ({ ...prev, currentPage: 1 }));
    
    switch (filterType) {
      case 'search':
        setSearchQuery(value);
        break;
      case 'department':
        setDepartmentFilter(value);
        break;
      case 'employmentType':
        setEmploymentTypeFilter(value);
        break;
      case 'hireDate':
        setHireDateFilter(value);
        break;
    }
  };

  // Pagination handlers
  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      setPagination(prev => ({ ...prev, currentPage: newPage }));
    }
  };

  const nextPage = () => {
    if (pagination.hasNext) {
      goToPage(pagination.currentPage + 1);
    }
  };

  const prevPage = () => {
    if (pagination.hasPrev) {
      goToPage(pagination.currentPage - 1);
    }
  };

  // Calculate display indices for current page
  const startIndex = (pagination.currentPage - 1) * entriesPerPage + 1;
  const endIndex = Math.min(pagination.currentPage * entriesPerPage, pagination.totalEmployees);

  // modal functions
  const openModal = async (employeeId) => {
    const empId = typeof employeeId === 'object' ? employeeId.id : employeeId;
    try {
      const res = await axios.get(`${process.env.REACT_APP_URL}/api/employees/employee/${empId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const emp = res?.data?.data || res?.data;
      setSelectedEmployee(emp);
      const jd = jobDetails.find((j) => j.individual_data_id === empId) || null;
      setSelectedJobDetails(jd);
    } catch (e) {
      console.error('fetchEmployeeById error:', e);
      const fallback = employees.find((x) => x.id === empId) || dummyEmployees.find((x) => x.id === empId) || null;
      setSelectedEmployee(fallback);
      setSelectedJobDetails(null);
    }
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
    const { name, value } = e.target;
    setSelectedEmployee((prev) => ({ ...prev, [name]: value }));
  };

  const handleJobChange = (e) => {
    const { name, value } = e.target;
    setSelectedJobDetails((prev) => ({ ...prev, [name]: value }));
  };

  const formatDate = (iso) => {
    if (!iso) return '';
    const d = new Date(iso);
    return d.toLocaleDateString();
  };

  const saveEmployeeChanges = async () => {
    if (!selectedEmployee?.id) return;
    try {
      await axios.put(`${process.env.REACT_APP_URL}/api/employees/${selectedEmployee.id}`, selectedEmployee, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      // Refresh current page data after update
      await fetchEmployeesCore();
      toast.success('Employee updated successfully!');
      setIsEditable(false);
    } catch (e) {
      console.error('update employee error:', e);
      toast.error('Error updating employee!');
    }
  };

  const saveJobChanges = async () => {
    if (!selectedJobDetails?.id) return;
    try {
      await axios.patch(`${process.env.REACT_APP_URL}/api/jobDetails/${selectedJobDetails.id}`, selectedJobDetails, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const updated = jobDetails.map((j) => (j.id === selectedJobDetails.id ? selectedJobDetails : j));
      setJobDetails(updated);
      toast.success('Job details updated successfully!');
      setIsJobEditable(false);
    } catch (e) {
      console.error('update job error:', e);
      toast.error('Error updating job details!');
    }
  };

  const handleBulkUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);
    setLoading(true);

    try {
      const res = await axios.post(`${process.env.REACT_APP_URL}/api/employees/bulk-upload`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      const responseData = res?.data;
      setUploadResults(responseData);

      // Show appropriate toast based on results
      if (responseData?.success) {
        const { stats } = responseData;
        if (stats?.failed > 0) {
          toast.warning(
            `Upload completed with issues: ${stats.success} succeeded, ${stats.failed} failed out of ${stats.total} total`,
            {
              autoClose: 6000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true
            }
          );
        } else {
          toast.success(
            `🎉 Upload successful! All ${stats.success} employees processed successfully.`,
            {
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true
            }
          );
        }
      } else {
        toast.error('Upload failed. Please check the file format and try again.');
      }

      // Show detailed results modal
      setShowResultsModal(true);

      // Refresh employee data after upload
      await fetchEmployeesCore();

    } catch (err) {
      console.error('upload error:', err);
      const errorMessage = err.response?.data?.message || 'Error uploading file!';
      toast.error(errorMessage, { autoClose: 5000 });

      // If there's error data, show it
      if (err.response?.data) {
        setUploadResults({
          success: false,
          message: errorMessage,
          error: err.response.data
        });
        setShowResultsModal(true);
      }
    } finally {
      setLoading(false);
      if (fileInp.current) fileInp.current.value = '';
    }
  };

  // Add these helper functions for the results modal
  const downloadErrorReport = () => {
    if (!uploadResults?.errors?.length) return;

    const errorData = uploadResults.errors.map(error => ({
      'Row Number': error.row,
      'Employee ID': error.employee_id,
      'Status': error.status,
      'Error Message': error.error
    }));

    const csvContent = [
      Object.keys(errorData[0]).join(','),
      ...errorData.map(row => Object.values(row).map(val => `"${val}"`).join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `bulk_upload_errors_${new Date().toISOString().split('T')[0]}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);

    toast.success('Error report downloaded successfully!');
  };

  const closeResultsModal = () => {
    setShowResultsModal(false);
    setUploadResults(null);
  };

  const exportToExcel = async () => {
    try {
      // Fetch all employees for export (without pagination)
      const res = await axios.get(`${process.env.REACT_APP_URL}/api/employees`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        params: {
          // Include current filters but no pagination limits
          search: searchQuery || undefined,
          department: departmentFilter || undefined,
          employmentType: employmentTypeFilter || undefined,
          hireDateFrom: hireDateFilter || undefined,
          exportAll: true // Signal to backend to return all matching records
        }
      });

      const allEmployees = res?.data?.data || res?.data || employees;
      
      const exportData = allEmployees.map((emp, index) => ({
        'S.No': index + 1,
        'Employee ID': emp.employee_id || '',
        'Employee Name': emp.employee_name || '',
        Email: emp.email || '',
        'Employee Type': emp.employee_type || '',
        'Time Type': emp.time_type || '',
        'Weekly Hours': emp.scheduled_weekly_hours || '',
        'Joining Date': formatDate(emp.joining_date),
        'Hire Date': formatDate(emp.hire_date),
        Department: emp.department_name || '',
        'Job Title': emp.job_profile_progression_model_designation || '',
        Status: emp.status || ''
      }));

      const wb = XLSX.utils.book_new();
      const ws = XLSX.utils.json_to_sheet(exportData);
      ws['!cols'] = Object.keys(exportData[0] || {}).map((k) => ({ wch: Math.max(18, k.length) }));
      XLSX.utils.book_append_sheet(wb, ws, 'Employees');
      XLSX.writeFile(wb, `employees_${new Date().toISOString().split('T')[0]}.xlsx`);
      toast.success('Employee data exported successfully!');
    } catch (error) {
      console.error('Export error:', error);
      toast.error('Failed to export data');
    }
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery('');
    setDepartmentFilter('');
    setEmploymentTypeFilter('');
    setHireDateFilter('');
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  // skeletons
  const SkeletonCard = ({ i }) => (
    <div key={`skc-${i}`} className="rounded-xl border border-[#2a2a2a] bg-[#0f0f10]/90 p-3 animate-pulse">
      <div className="h-4 w-40 bg-gray-800 rounded mb-2" />
      <div className="h-3 w-24 bg-gray-800 rounded mb-4" />
      <div className="grid grid-cols-2 gap-2">
        <div className="h-3 w-20 bg-gray-800 rounded" />
        <div className="h-3 w-16 bg-gray-800 rounded" />
        <div className="col-span-2 h-3 w-full bg-gray-800 rounded" />
      </div>
    </div>
  );

  const SkeletonRow = ({ i }) => (
    <tr key={`skr-${i}`} className="border-b border-[#1f1f22] animate-pulse">
      {Array.from({ length: 9 }).map((_, j) => (
        <td key={`skc-${i}-${j}`} className="px-4 py-3">
          <div className="h-3 w-24 bg-gray-800 rounded" />
        </td>
      ))}
    </tr>
  );

  return (
    <div
      className="min-h-screen text-white px-3 py-4"
      style={{
        background:
          'radial-gradient(1200px 600px at 10% 0%, #0f0f0f 0%, #0a0a0a 60%), radial-gradient(1000px 500px at 90% 0%, #111111 0%, #0a0a0a 55%), #0a0a0a',
        fontFamily: 'Plus Jakarta Sans, sans-serif'
      }}
    >
      {/* Toast: lower so it never clips at top, and 10% from right */}
      <ToastContainer
        position="top-right"
        theme="dark"
        toastClassName="bg-gray-900 text-white"
        style={{ top: 120, right: '10%', zIndex: 999999 }}
      />

      {/* Header */}
      <div className="text-center mb-6 pt-2">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-500 via-white to-blue-500 bg-clip-text text-transparent mb-2 tracking-tight">
          Employee Management
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm md:text-lg">Manage your workforce efficiently</p>
      </div>

      {/* Controls */}
      <div className="flex flex-col lg:flex-row gap-3 mb-6 items-center justify-between">
        {/* Search */}
        <div className="relative flex-1 max-w-xl w-full">
          <input
            type="text"
            placeholder="Search by Name or ID..."
            value={searchQuery}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="w-full px-4 py-2.5 bg-[#0f0f10] border border-[#2a2a2a] rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-600/60 focus:border-transparent text-sm"
          />
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
            <Search className="w-5 h-5" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={fetchAll}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-[#0e1a2b] hover:bg-[#11223a] border border-[#223656] rounded-lg transition-all text-sm disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">{loading ? 'Refreshing…' : 'Refresh'}</span>
          </button>

          <button
            onClick={() => setIsFilterPopupOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#0e1a2b] hover:bg-[#11223a] border border-[#223656] rounded-lg transition-all text-sm"
          >
            <ListFilter className="w-4 h-4" />
            <span className="hidden sm:inline">Filter</span>
            {/* Show active filter indicator */}
            {(departmentFilter || employmentTypeFilter || hireDateFilter) && (
              <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            )}
          </button>

          <AddEmp />

          <button
            onClick={() => fileInp.current?.click()}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 border border-[#223656] rounded-lg transition-all text-sm bg-[#0e1a2b] disabled:opacity-50"
          >
            <FaUpload />
            <span className="hidden sm:inline">{loading ? 'Uploading…' : 'Import Excel'}</span>
          </button>

          <button
            onClick={exportToExcel}
            className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-lg transition-all text-sm"
          >
            <FaDownload />
            <span className="hidden sm:inline">Export Excel</span>
          </button>

          <input type="file" accept=".xlsx, .xls" ref={fileInp} onChange={handleBulkUpload} className="hidden" />
        </div>
      </div>

      {/* ===== Mobile: Card list view ===== */}
      <div className="md:hidden space-y-3 px-1">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} i={i} />)
          : employees.map((employee, idx) => (
            <div
              key={employee.id}
              className="rounded-xl border border-[#2a2a2a] bg-[#0f0f10]/90 p-3 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
            >
              <div className="flex justify-between items-start">
                <div className="min-w-0">
                  <div className="text-sm font-medium text-white truncate">{employee.employee_name || ''}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">
                    {employee.job_profile_progression_model_designation || '—'}
                  </div>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-blue-900 text-blue-200 border border-blue-700">
                      {employee.employee_type || 'Type'}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] border ${employee.status === 'Active'
                        ? 'bg-green-900 text-green-200 border-green-700'
                        : 'bg-red-900 text-red-200 border-red-700'
                        }`}
                    >
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
                  <span className="truncate text-white">{employee.employee_id || ''}</span>
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

        {!loading && employees.length === 0 && (
          <div className="text-center text-gray-400 py-8">
            <div className="text-4xl mb-2">🌌</div>
            <p className="text-sm">No employees found</p>
          </div>
        )}
      </div>

      {/* ===== Desktop/Tablet: Table ===== */}
      <div className="hidden md:block">
        <div className="bg-[#0f0f10]/90 border border-[#2a2a2a] rounded-xl overflow-hidden mb-6">
          <div className="overflow-x-auto">
            <table className="w-full text-sm table-fixed">
              <thead className="bg-[#0c0c0d] border-b border-[#2a2a2a] text-gray-200">
                <tr>
                  <th className="sticky left-0 z-20 bg-[#0c0c0d] px-0 w-16 text-left">
                    <div className="px-4 py-3 font-semibold">S.No.</div>
                  </th>
                  <th className="sticky left-16 z-20 bg-[#0c0c0d] px-0 w-32 text-left">
                    <div className="px-4 py-3 font-semibold">Employee ID</div>
                  </th>
                  <th className="px-4 py-3 text-left font-semibold w-48">Employee Name</th>
                  <th className="px-4 py-3 text-left font-semibold w-64">Email</th>
                  <th className="px-4 py-3 text-left font-semibold w-40">Department</th>
                  <th className="px-4 py-3 text-left font-semibold w-56">Job Title</th>
                  <th className="px-4 py-3 text-left font-semibold w-40">Employee Type</th>
                  <th className="px-4 py-3 text-left font-semibold w-32">Status</th>
                  <th className="px-4 py-3 text-left font-semibold w-28">Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading
                  ? Array.from({ length: 8 }).map((_, i) => <SkeletonRow key={i} i={i} />)
                  : employees.map((employee, idx) => (
                    <tr key={employee.id} className="border-b border-[#1f1f22] hover:bg-[#121215] transition-colors">
                      <td className="sticky left-0 z-10 bg-[#0f0f10] px-0">
                        <div className="px-4 py-3">{startIndex + idx}</div>
                      </td>
                      <td className="sticky left-16 z-10 bg-[#0f0f10] px-0">
                        <div className="px-4 py-3 font-medium text-blue-400">{employee.employee_id || ''}</div>
                      </td>
                      <td className="px-4 py-3">{employee.employee_name || ''}</td>
                      <td className="px-4 py-3 text-gray-300 truncate">{employee.email || ''}</td>
                      <td className="px-4 py-3 text-gray-300">{employee.department_name || ''}</td>
                      <td className="px-4 py-3 text-gray-300">
                        {employee.job_profile_progression_model_designation || ''}
                      </td>
                      <td className="px-4 py-3">
                        <span className="px-2 py-1 rounded-full text-xs font-semibold bg-blue-900 text-blue-200 border border-blue-700">
                          {employee.employee_type || ''}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-semibold ${
                            employee.status === 'Active'
                              ? 'bg-green-900 text-green-200 border border-green-700'
                              : 'bg-red-900 text-red-200 border border-red-700'
                          }`}
                        >
                          {employee.status || ''}
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

                {!loading && employees.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-4 py-12 text-center text-gray-400">
                      <div className="text-4xl mb-2">🌌</div>
                      <p>No employees found</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <div className="text-gray-400 text-sm">
          Showing {pagination.totalEmployees > 0 ? startIndex : 0} to {endIndex} of {pagination.totalEmployees} entries
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={prevPage}
            disabled={!pagination.hasPrev || loading}
            className="px-4 py-2 bg-[#0e1a2b] hover:bg-[#11223a] disabled:opacity-50 disabled:cursor-not-allowed border border-[#223656] rounded-lg transition-all text-sm"
          >
            ← Previous
          </button>
          <span className="text-gray-400 text-sm px-2">
            Page {pagination.currentPage} / {pagination.totalPages}
          </span>
          <button
            onClick={nextPage}
            disabled={!pagination.hasNext || loading}
            className="px-4 py-2 bg-[#0e1a2b] hover:bg-[#11223a] disabled:opacity-50 disabled:cursor-not-allowed border border-[#223656] rounded-lg transition-all text-sm"
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
              <h3 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Filter Options
              </h3>
              <button onClick={() => setIsFilterPopupOpen(false)} className="p-2 bg-red-700/90 hover:bg-red-600 rounded-lg">
                <FaTimes className="w-4 h-4" />
              </button>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Department:</label>
                <select
                  value={departmentFilter}
                  onChange={(e) => handleFilterChange('department', e.target.value)}
                  className="w-full px-3 py-2 bg-[#121214] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600/60 text-sm"
                >
                  <option value="">All Departments</option>
                  {departments.map((d) => (
                    <option key={d.id} value={d.name}>
                      {d.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Employee Type:</label>
                <select
                  value={employmentTypeFilter}
                  onChange={(e) => handleFilterChange('employmentType', e.target.value)}
                  className="w-full px-3 py-2 bg-[#121214] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600/60 text-sm"
                >
                  <option value="">All Types</option>
                  <option value="Permanent">Permanent</option>
                  <option value="Intern">Intern</option>
                  <option value="Contractor">Contractor</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">Hire Date From:</label>
                <input
                  type="date"
                  value={hireDateFilter}
                  onChange={(e) => handleFilterChange('hireDate', e.target.value)}
                  className="w-full px-3 py-2 bg-[#121214] border border-[#2a2a2a] rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-600/60 text-sm"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 p-5 border-t border-[#2a2a2a]">
              <button
                onClick={() => {
                  setIsFilterPopupOpen(false);
                  toast.success('Filters applied successfully!');
                }}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg text-sm"
              >
                Apply Filters
              </button>
              <button
                onClick={() => {
                  clearAllFilters();
                  setIsFilterPopupOpen(false);
                  toast.info('Filters cleared!');
                }}
                className="px-4 py-2 bg-red-700 hover:bg-red-600 rounded-lg text-sm"
              >
                Clear All
              </button>
              <button
                onClick={() => setIsFilterPopupOpen(false)}
                className="px-4 py-2 bg-[#1b1c1f] border border-[#2a2a2a] hover:bg-[#232528] rounded-lg text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Employee Modal (PERSONAL + JOB only) */}
      {isModalOpen &&
        selectedEmployee &&
        createPortal(
          <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
            <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl w-full max-w-5xl max-h-[92vh] overflow-hidden shadow-2xl">
              {/* Header */}
              <div className="flex justify-between items-center p-4 border-b border-[#2a2a2a] bg-[#0a0a0a] sticky top-0 z-10">
                <h3 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-[#ff6600] via-white to-[#0066ff] bg-clip-text text-transparent">
                  Employee Details — {selectedEmployee.employee_name || ''}
                </h3>
                <button
                  onClick={closeModal}
                  className="p-2 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg"
                >
                  <FaTimes className="w-5 h-5 text-white" />
                </button>
              </div>

              {/* Tabs */}
              <div className="flex border-b border-[#2a2a2a] bg-[#0a0a0a]">
                <button
                  onClick={() => setActiveTab('personal')}
                  className={`flex items-center gap-2 px-4 py-2 text-sm ${activeTab === 'personal'
                    ? 'border-b-2 border-blue-500 text-blue-400 bg-blue-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-[#111214]'
                    }`}
                >
                  <FaUser className="w-4 h-4" />
                  Individual
                </button>
                <button
                  onClick={() => setActiveTab('job')}
                  className={`flex items-center gap-2 px-4 py-2 text-sm ${activeTab === 'job'
                    ? 'border-b-2 border-green-500 text-green-400 bg-green-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-[#111214]'
                    }`}
                >
                  <FaBriefcase className="w-4 h-4" />
                  Job
                </button>
              </div>

              {/* Body — its own scroll area */}
              <div className="overflow-y-auto max-h-[calc(92vh-150px)]">
                <div className="p-4">
                  {/* PERSONAL */}
                  {activeTab === 'personal' && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {[
                        { label: 'Employee ID', name: 'employee_id', type: 'text', readOnly: true },
                        { label: 'Employee Name', name: 'employee_name', type: 'text' },
                        { label: 'Email', name: 'email', type: 'email' },
                        { label: 'Employee Type', name: 'employee_type', type: 'select', options: ['Permanent', 'Contract', 'Temporary', 'Intern'] },
                        { label: 'Time Type', name: 'time_type', type: 'select', options: ['Full-time', 'Part-time', 'Intern'] },
                        { label: 'Weekly Hours', name: 'scheduled_weekly_hours', type: 'number' },
                        { label: 'Joining Date', name: 'joining_date', type: 'date' },
                        { label: 'Hire Date', name: 'hire_date', type: 'date' },
                        { label: 'Department', name: 'department_id', type: 'select', options: departments, optionValue: 'id', optionLabel: 'name' },
                        { label: 'Status', name: 'status', type: 'select', options: ['Active', 'Inactive'] }
                      ].map((field, i) => (
                        <div key={i} className="space-y-1">
                          <label className="block text-[11px] font-semibold text-[#a3a3a3] uppercase tracking-wider">
                            {field.label}
                          </label>

                          {field.type === 'select' ? (
                            Array.isArray(field.options) && typeof field.options[0] === 'string' ? (
                              <select
                                value={selectedEmployee?.[field.name] || ''}
                                name={field.name}
                                disabled={!isEditable || field.readOnly}
                                onChange={handleEmployeeChange}
                                className={`w-full px-3 py-2 bg-[#111111] border rounded-lg text-white text-xs ${!isEditable || field.readOnly ? 'border-[#2a2a2a] text-[#a3a3a3] cursor-not-allowed' : 'border-[#2a2a2a]'
                                  }`}
                              >
                                <option value="">Select {field.label}</option>
                                {field.options.map((opt) => (
                                  <option key={opt} value={opt}>
                                    {opt}
                                  </option>
                                ))}
                              </select>
                            ) : (
                              <select
                                value={selectedEmployee?.[field.name] || ''}
                                name={field.name}
                                disabled={!isEditable || field.readOnly}
                                onChange={handleEmployeeChange}
                                className={`w-full px-3 py-2 bg-[#111111] border rounded-lg text-white text-xs ${!isEditable || field.readOnly ? 'border-[#2a2a2a] text-[#a3a3a3] cursor-not-allowed' : 'border-[#2a2a2a]'
                                  }`}
                              >
                                <option value="">Select {field.label}</option>
                                {(field.options || []).map((opt) => (
                                  <option key={opt[field.optionValue]} value={opt[field.optionValue]}>
                                    {opt[field.optionLabel]}
                                  </option>
                                ))}
                              </select>
                            )
                          ) : (
                            <input
                              type={field.type}
                              name={field.name}
                              value={
                                field.type === 'date' && selectedEmployee?.[field.name]
                                  ? String(selectedEmployee[field.name]).split('T')[0]
                                  : selectedEmployee?.[field.name] || ''
                              }
                              readOnly={!isEditable || field.readOnly}
                              onChange={handleEmployeeChange}
                              className={`w-full px-3 py-2 bg-[#111111] border rounded-lg text-white text-xs ${!isEditable || field.readOnly ? 'border-[#2a2a2a] text-[#a3a3a3] cursor-not-allowed' : 'border-[#2a2a2a]'
                                }`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* JOB */}
                  {activeTab === 'job' && selectedJobDetails && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
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
                      ].map((field, i) => (
                        <div key={i} className={field.type === 'textarea' ? 'md:col-span-2' : ''}>
                          <label className="block text-[11px] font-semibold text-[#a3a3a3] uppercase tracking-wider mb-1">
                            {field.label}
                          </label>

                          {field.type === 'select' ? (
                            <select
                              value={selectedJobDetails?.[field.name] || ''}
                              name={field.name}
                              disabled={!isJobEditable}
                              onChange={handleJobChange}
                              className={`w-full px-3 py-2 bg-[#111111] border rounded-lg text-white text-xs ${!isJobEditable ? 'border-[#2a2a2a] text-[#a3a3a3] cursor-not-allowed' : 'border-[#2a2a2a]'
                                }`}
                            >
                              <option value="">Select {field.label}</option>
                              {field.options.map((opt) => (
                                <option key={opt} value={opt}>
                                  {opt}
                                </option>
                              ))}
                            </select>
                          ) : field.type === 'textarea' ? (
                            <textarea
                              rows={4}
                              value={selectedJobDetails?.[field.name] || ''}
                              name={field.name}
                              readOnly={!isJobEditable}
                              onChange={handleJobChange}
                              className={`w-full px-3 py-2 bg-[#111111] border rounded-lg text-white text-xs resize-none ${!isJobEditable ? 'border-[#2a2a2a] text-[#a3a3a3] cursor-not-allowed' : 'border-[#2a2a2a]'
                                }`}
                            />
                          ) : (
                            <input
                              type={field.type}
                              value={selectedJobDetails?.[field.name] || ''}
                              name={field.name}
                              readOnly={!isJobEditable}
                              onChange={handleJobChange}
                              className={`w-full px-3 py-2 bg-[#111111] border rounded-lg text-white text-xs ${!isJobEditable ? 'border-[#2a2a2a] text-[#a3a3a3] cursor-not-allowed' : 'border-[#2a2a2a]'
                                }`}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Show message when no job details available */}
                  {activeTab === 'job' && !selectedJobDetails && (
                    <div className="text-center text-gray-400 py-8">
                      <div className="text-4xl mb-2">💼</div>
                      <p className="text-sm">No job details available for this employee</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Footer — compact buttons, dark blue background, gradient TEXT */}
              <div className="flex flex-wrap justify-end gap-2 p-3 border-t border-[#2a2a2a] bg-[#0a0a0a] sticky bottom-0">
                {activeTab === 'personal' && (
                  <>
                    <button
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs bg-[#0e1a2b] border border-[#223656]"
                      onClick={() => setIsEditable((v) => !v)}
                    >
                      <FaEdit className="w-3.5 h-3.5" />
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white to-purple-300">
                        {isEditable ? 'Cancel Edit' : 'Edit Personal Info'}
                      </span>
                    </button>
                    {isEditable && (
                      <button
                        onClick={saveEmployeeChanges}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs bg-[#0e1a2b] border border-[#223656]"
                      >
                        <FaSave className="w-3.5 h-3.5" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white to-purple-300">
                          Save Changes
                        </span>
                      </button>
                    )}
                  </>
                )}

                {activeTab === 'job' && selectedJobDetails && (
                  <>
                    <button
                      className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs bg-[#0e1a2b] border border-[#223656]"
                      onClick={() => setIsJobEditable((v) => !v)}
                    >
                      <FaEdit className="w-3.5 h-3.5" />
                      <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white to-purple-300">
                        {isJobEditable ? 'Cancel Edit' : 'Edit Job Details'}
                      </span>
                    </button>
                    {isJobEditable && (
                      <button
                        onClick={saveJobChanges}
                        className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs bg-[#0e1a2b] border border-[#223656]"
                      >
                        <FaSave className="w-3.5 h-3.5" />
                        <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 via-white to-purple-300">
                          Save Job Changes
                        </span>
                      </button>
                    )}
                  </>
                )}

                <button
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs bg-[#2a2a2a]"
                  onClick={closeModal}
                >
                  <FaTimes className="w-3.5 h-3.5" />
                  Close
                </button>
              </div>
            </div>
          </div>,
          document.body
        )}

      {/* Bulk Upload Results Modal */}
      {showResultsModal && uploadResults && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#0f0f10] border border-[#2a2a2a] rounded-xl w-full max-w-4xl max-h-[70vh] overflow-hidden shadow-2xl flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-[#2a2a2a] bg-[#0a0a0a]">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${uploadResults.success ? 'bg-green-900/30' : 'bg-red-900/30'}`}>
                  {uploadResults.success ? (
                    <FaCheckCircle className="w-5 h-5 text-green-400" />
                  ) : (
                    <FaExclamationTriangle className="w-5 h-5 text-red-400" />
                  )}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">Bulk Upload Results</h3>
                  <p className="text-xs text-gray-400">
                    {uploadResults.message || 'Upload process completed'}
                  </p>
                </div>
              </div>
              <button
                onClick={closeResultsModal}
                className="p-1.5 bg-red-700/20 hover:bg-red-700/40 rounded-lg border border-red-700/50"
              >
                <FaTimes className="w-4 h-4 text-red-400" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4 overflow-y-auto flex-1">
              {uploadResults.success && uploadResults.stats && (
                <>
                  {/* Stats Summary */}
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="bg-blue-900/20 border border-blue-700/30 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold text-blue-400">
                        {uploadResults.stats.total}
                      </div>
                      <div className="text-xs text-blue-300">Total Processed</div>
                    </div>
                    <div className="bg-green-900/20 border border-green-700/30 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold text-green-400">
                        {uploadResults.stats.success}
                      </div>
                      <div className="text-xs text-green-300">Successfully Added</div>
                    </div>
                    <div className="bg-red-900/20 border border-red-700/30 rounded-lg p-3 text-center">
                      <div className="text-xl font-bold text-red-400">
                        {uploadResults.stats.failed}
                      </div>
                      <div className="text-xs text-red-300">Failed</div>
                    </div>
                  </div>

                  {/* Successful Uploads */}
                  {uploadResults.results && uploadResults.results.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <FaCheckCircle className="w-4 h-4 text-green-400" />
                        <h4 className="text-base font-semibold text-green-400">
                          Successfully Processed ({uploadResults.results.length})
                        </h4>
                      </div>
                      <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs">
                            <thead className="bg-[#111111] border-b border-[#2a2a2a]">
                              <tr>
                                <th className="px-3 py-2 text-left text-gray-300">Row</th>
                                <th className="px-3 py-2 text-left text-gray-300">Employee ID</th>
                                <th className="px-3 py-2 text-left text-gray-300">Password</th>
                                <th className="px-3 py-2 text-left text-gray-300">Joining Date</th>
                                <th className="px-3 py-2 text-left text-gray-300">Hire Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {uploadResults.results.map((result, index) => (
                                <tr key={index} className="border-b border-[#1f1f22] hover:bg-[#121215]">
                                  <td className="px-3 py-2 text-white">{result.row}</td>
                                  <td className="px-3 py-2 text-blue-400 font-medium">{result.employee_id}</td>
                                  <td className="px-3 py-2 text-gray-300 font-mono text-xs truncate max-w-[80px]">
                                    {result.generatedPassword}
                                  </td>
                                  <td className="px-3 py-2 text-gray-300">
                                    {result.processedDates?.joining_date || '—'}
                                  </td>
                                  <td className="px-3 py-2 text-gray-300">
                                    {result.processedDates?.hire_date || '—'}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Failed Uploads */}
                  {uploadResults.errors && uploadResults.errors.length > 0 && (
                    <div className="mb-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <FaExclamationTriangle className="w-4 h-4 text-red-400" />
                          <h4 className="text-base font-semibold text-red-400">
                            Failed to Process ({uploadResults.errors.length})
                          </h4>
                        </div>
                        <button
                          onClick={downloadErrorReport}
                          className="flex items-center gap-1 px-2 py-1 bg-red-700/20 hover:bg-red-700/30 border border-red-700/50 rounded-lg text-xs text-red-300"
                        >
                          <FaDownload className="w-3 h-3" />
                          Download
                        </button>
                      </div>
                      <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-lg overflow-hidden">
                        <div className="overflow-x-auto">
                          <table className="w-full text-xs">
                            <thead className="bg-[#111111] border-b border-[#2a2a2a]">
                              <tr>
                                <th className="px-3 py-2 text-left text-gray-300">Row</th>
                                <th className="px-3 py-2 text-left text-gray-300">Employee ID</th>
                                <th className="px-3 py-2 text-left text-gray-300">Error Message</th>
                              </tr>
                            </thead>
                            <tbody>
                              {uploadResults.errors.map((error, index) => (
                                <tr key={index} className="border-b border-[#1f1f22] hover:bg-[#121215]">
                                  <td className="px-3 py-2 text-white">{error.row}</td>
                                  <td className="px-3 py-2 text-red-400 font-medium">{error.employee_id}</td>
                                  <td className="px-3 py-2 text-gray-300 text-xs truncate max-w-[180px]">
                                    {error.error}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Error case - when upload completely failed */}
              {!uploadResults.success && (
                <div className="text-center py-6">
                  <FaExclamationTriangle className="w-12 h-12 text-red-400 mx-auto mb-3" />
                  <h4 className="text-lg font-semibold text-red-400 mb-1">Upload Failed</h4>
                  <p className="text-gray-400 mb-3 text-sm">
                    {uploadResults.message || 'The bulk upload process encountered an error.'}
                  </p>
                  <div className="text-xs text-gray-500">
                    Please check your file format and data, then try again.
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end gap-2 p-3 border-t border-[#2a2a2a] bg-[#0a0a0a]">
              {uploadResults.errors && uploadResults.errors.length > 0 && (
                <button
                  onClick={downloadErrorReport}
                  className="flex items-center gap-1 px-3 py-1.5 bg-orange-700/20 hover:bg-orange-700/30 border border-orange-700/50 rounded-lg text-xs text-orange-300"
                >
                  <FaDownload className="w-3 h-3" />
                  Download Errors
                </button>
              )}
              <button
                onClick={closeResultsModal}
                className="px-4 py-1.5 bg-blue-700 hover:bg-blue-600 rounded-lg text-xs font-medium"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmpManagement;
