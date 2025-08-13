import axios from 'axios';
import { useEffect, useRef, useState, useMemo } from 'react';
import { FaEdit, FaRegEye, FaTimes, FaDownload, FaUpload, FaSave, FaUser, FaBriefcase } from 'react-icons/fa';
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
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [jobDetails, setJobDetails] = useState([]);

  // ui / modal
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [selectedJobDetails, setSelectedJobDetails] = useState(null);
  const [activeTab, setActiveTab] = useState('personal'); // 'personal' | 'job'
  const [isEditable, setIsEditable] = useState(false);
  const [isJobEditable, setIsJobEditable] = useState(false);

  // pagination
  const entriesPerPage = 10;
  const [page, setPage] = useState(1);

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
      const res = await axios.get(`${process.env.REACT_APP_URL}/api/employees`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      const list = res?.data?.data || res?.data || [];
      setEmployees(Array.isArray(list) ? list : []);
      setFilteredEmployees(Array.isArray(list) ? list : []);
      setPage(1);
      console.log('[Employees] count:', list?.length || 0);
    } catch (e) {
      console.error('fetchEmployees error:', e);
      setEmployees(dummyEmployees);
      setFilteredEmployees(dummyEmployees);
      setPage(1);
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

  // filter + search
  useEffect(() => {
    const next = employees.filter((employee) => {
      const name = (employee.employee_name || '').toLowerCase();
      const empId = (employee.employee_id || '').toLowerCase();
      const department = (employee.department_name || '').toLowerCase();
      const employmentType = (employee.employee_type || '').toLowerCase();
      const hireDate = employee.hire_date || '';

      const matchesSearch =
        !searchQuery ||
        name.includes(searchQuery.toLowerCase()) ||
        empId.includes(searchQuery.toLowerCase());
      const matchesDepartment = departmentFilter ? department === departmentFilter.toLowerCase() : true;
      const matchesEmployment = employmentTypeFilter ? employmentType === employmentTypeFilter.toLowerCase() : true;
      const matchesHireDate = hireDateFilter ? new Date(hireDate) >= new Date(hireDateFilter) : true;

      return matchesSearch && matchesDepartment && matchesEmployment && matchesHireDate;
    });

    setFilteredEmployees(next);
    setPage(1); // reset pagination whenever filters/search change
  }, [searchQuery, departmentFilter, employmentTypeFilter, hireDateFilter, employees]);

  // pagination helpers
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil((filteredEmployees?.length || 0) / entriesPerPage)),
    [filteredEmployees]
  );
  const startIndex = useMemo(() => (page - 1) * entriesPerPage, [page]);
  const endIndex = useMemo(
    () => Math.min(page * entriesPerPage, filteredEmployees.length),
    [page, filteredEmployees]
  );
  const pageSlice = useMemo(
    () => filteredEmployees.slice(startIndex, startIndex + entriesPerPage),
    [filteredEmployees, startIndex]
  );

  // modal
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
      const updated = employees.map((e) => (e.id === selectedEmployee.id ? selectedEmployee : e));
      setEmployees(updated);
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
      toast.success(res?.data?.message || 'File uploaded successfully!');
      await fetchEmployeesCore();
    } catch (err) {
      console.error('upload error:', err);
      toast.error('Error uploading file!');
    } finally {
      setLoading(false);
      if (fileInp.current) fileInp.current.value = '';
    }
  };

  const exportToExcel = () => {
    const exportData = filteredEmployees.map((emp, index) => ({
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
            onChange={(e) => setSearchQuery(e.target.value)}
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
            className="flex items-center gap-2 px-4 py-2 bg-[#0e1a2b] hover:bg-[#11223a] border border-[#223656] rounded-lg transition-all text-sm"
          >
            <RefreshCw className="w-4 h-4" />
            <span className="hidden sm:inline">{loading ? 'Refreshing…' : 'Refresh'}</span>
          </button>

          <button
            onClick={() => setIsFilterPopupOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-[#0e1a2b] hover:bg-[#11223a] border border-[#223656] rounded-lg transition-all text-sm"
          >
            <ListFilter className="w-4 h-4" />
            <span className="hidden sm:inline">Filter</span>
          </button>

          <AddEmp />

          <button
            onClick={() => fileInp.current?.click()}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 border border-[#223656] rounded-lg transition-all text-sm bg-[#0e1a2b]"
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

      {/* ===== Mobile: Card list view (kept) ===== */}
      <div className="md:hidden space-y-3 px-1">
        {loading
          ? Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} i={i} />)
          : pageSlice.map((employee) => (
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
                        className={`px-2 py-0.5 rounded-full text-[10px] border ${
                          employee.status === 'Active'
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

        {!loading && pageSlice.length === 0 && (
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
                  {/* Make only first two sticky to avoid overlap issues */}
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
                  : pageSlice.map((employee, idx) => (
                      <tr key={employee.id} className="border-b border-[#1f1f22] hover:bg-[#121215] transition-colors">
                        <td className="sticky left-0 z-10 bg-[#0f0f10] px-0">
                          <div className="px-4 py-3">{startIndex + idx + 1}</div>
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

                {!loading && pageSlice.length === 0 && (
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
          Showing {filteredEmployees.length ? startIndex + 1 : 0} to {endIndex} of {filteredEmployees.length} entries
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="px-4 py-2 bg-[#0e1a2b] hover:bg-[#11223a] disabled:opacity-50 disabled:cursor-not-allowed border border-[#223656] rounded-lg transition-all text-sm"
          >
            ← Previous
          </button>
          <span className="text-gray-400 text-sm px-2">
            Page {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
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
                  onChange={(e) => setDepartmentFilter(e.target.value)}
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
                  onChange={(e) => setEmploymentTypeFilter(e.target.value)}
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
                  onChange={(e) => setHireDateFilter(e.target.value)}
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
                  setDepartmentFilter('');
                  setEmploymentTypeFilter('');
                  setHireDateFilter('');
                  setFilteredEmployees(employees);
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
                  className={`flex items-center gap-2 px-4 py-2 text-sm ${
                    activeTab === 'personal'
                      ? 'border-b-2 border-blue-500 text-blue-400 bg-blue-500/10'
                      : 'text-gray-400 hover:text-white hover:bg-[#111214]'
                  }`}
                >
                  <FaUser className="w-4 h-4" />
                  Personal
                </button>
                <button
                  onClick={() => setActiveTab('job')}
                  className={`flex items-center gap-2 px-4 py-2 text-sm ${
                    activeTab === 'job'
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
                                className={`w-full px-3 py-2 bg-[#111111] border rounded-lg text-white text-xs ${
                                  !isEditable || field.readOnly ? 'border-[#2a2a2a] text-[#a3a3a3] cursor-not-allowed' : 'border-[#2a2a2a]'
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
                                className={`w-full px-3 py-2 bg-[#111111] border rounded-lg text-white text-xs ${
                                  !isEditable || field.readOnly ? 'border-[#2a2a2a] text-[#a3a3a3] cursor-not-allowed' : 'border-[#2a2a2a]'
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
                              className={`w-full px-3 py-2 bg-[#111111] border rounded-lg text-white text-xs ${
                                !isEditable || field.readOnly ? 'border-[#2a2a2a] text-[#a3a3a3] cursor-not-allowed' : 'border-[#2a2a2a]'
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
                              className={`w-full px-3 py-2 bg-[#111111] border rounded-lg text-white text-xs ${
                                !isJobEditable ? 'border-[#2a2a2a] text-[#a3a3a3] cursor-not-allowed' : 'border-[#2a2a2a]'
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
                              className={`w-full px-3 py-2 bg-[#111111] border rounded-lg text-white text-xs resize-none ${
                                !isJobEditable ? 'border-[#2a2a2a] text-[#a3a3a3] cursor-not-allowed' : 'border-[#2a2a2a]'
                              }`}
                            />
                          ) : (
                            <input
                              type={field.type}
                              value={selectedJobDetails?.[field.name] || ''}
                              name={field.name}
                              readOnly={!isJobEditable}
                              onChange={handleJobChange}
                              className={`w-full px-3 py-2 bg-[#111111] border rounded-lg text-white text-xs ${
                                !isJobEditable ? 'border-[#2a2a2a] text-[#a3a3a3] cursor-not-allowed' : 'border-[#2a2a2a]'
                              }`}
                            />
                          )}
                        </div>
                      ))}
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
    </div>
  );
};

export default EmpManagement;
