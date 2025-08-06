import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { FaEdit, FaRegEye, FaTimes, FaDownload, FaUpload, FaSave, FaUser, FaBriefcase, FaCog } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
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
            console.log("Manager:-----------------------", response.data)
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
            console.log("---------------------------", response.data)
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
            
            // Also fetch job details for this employee
            const jobDetail = jobDetails.find(job => job.individual_data_id === employeeId);
            console.log("-----------------------------------job details", jobDetail)
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

    const openFilterPopup = () => {
        setIsFilterPopupOpen(true);
    };

    const closeFilterPopup = () => {
        setIsFilterPopupOpen(false);
    };

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
        <div className="min-h-screen bg-black text-white p-4 md:p-6">
            <ToastContainer 
                position="top-right"
                theme="dark"
                toastClassName="bg-gray-900 text-white"
            />
            
            {/* Header */}
            <div className="text-center mb-8">
                <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-orange-500 via-white to-blue-500 bg-clip-text text-transparent mb-4">
                    Employee Management
                </h1>
                <p className="text-gray-400 text-lg">Manage your workforce efficiently</p>
            </div>

            {/* Controls */}
            <div className="flex flex-col lg:flex-row gap-4 mb-6 items-center justify-between">
                {/* Search Bar */}
                <div className="relative flex-1 max-w-md">
                    <input
                        type="text"
                        placeholder="Search by Name or ID..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
                    />
                    <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        <Search className="w-5 h-5" />
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-3">
                    <button 
                        onClick={fetchEmployees}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg transition-all duration-300 hover:scale-105"
                    >
                        <RefreshCw className="w-4 h-4" />
                        <span className="hidden sm:inline">Refresh</span>
                    </button>
                    
                    <button 
                        onClick={openFilterPopup}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg transition-all duration-300 hover:scale-105"
                    >
                        <ListFilter className="w-4 h-4" />
                        <span className="hidden sm:inline">Filter</span>
                    </button>
                    
                    <AddEmp />
  
                    <button 
                        onClick={() => fileInp.current.click()}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-3 bg-clip-text bg-gradient-to-r from-white to-blue-400 rounded-xl font-medium text-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 border border-gray-700/50 disabled:opacity-50"
                    >
                        <FaUpload />
                        <span className="hidden sm:inline">
                            {loading ? 'Uploading...' : 'Import Excel'}
                        </span>
                    </button>
                    
                    <button 
                        onClick={exportToExcel}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-600 rounded-lg transition-all duration-300 hover:scale-105"
                    >
                        <FaDownload />
                        <span className="hidden sm:inline">Export Excel</span>
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

            {/* Table Container */}
            <div className="bg-gray-950 border border-gray-700 rounded-lg overflow-hidden mb-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-900 border-b border-gray-700">
                            <tr>
                                <th className="sticky left-0 z-20 bg-gray-900 px-4 py-3 text-left font-semibold text-gray-200 w-16">
                                    S.No.
                                </th>
                                <th className="sticky left-16 z-20 bg-gray-900 px-4 py-3 text-left font-semibold text-gray-200 w-32">
                                    Employee ID
                                </th>
                                <th className="sticky left-48 z-20 bg-gray-900 px-4 py-3 text-left font-semibold text-gray-200 w-48">
                                    Employee Name
                                </th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-200 w-32">Email</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-200 w-32">Department</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-200 w-40">Job Title</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-200 w-32">Employee Type</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-200 w-24">Status</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-200 w-24">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleEmployees.map((employee, index) => (
                                <tr 
                                    key={employee.id} 
                                    className="border-b border-gray-700 hover:bg-gray-800 transition-colors duration-200"
                                >
                                    <td className="sticky left-0 z-10 bg-gray-950 hover:bg-gray-800 px-4 py-3 font-medium">
                                        {startIndex + index + 1}
                                    </td>
                                    <td className="sticky left-16 z-10 bg-gray-950 hover:bg-gray-800 px-4 py-3 font-medium text-blue-400">
                                        {employee.employee_id}
                                    </td>
                                    <td className="sticky left-48 z-10 bg-gray-950 hover:bg-gray-800 px-4 py-3 font-medium">
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
                                            className="p-2 bg-blue-700 hover:bg-blue-600 rounded-lg transition-all duration-200 hover:scale-110"
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

            {/* Pagination */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="text-gray-400 text-sm">
                    Showing {startIndex + 1} to {endIndex} of {filteredEmployees.length} entries
                </div>
                <div className="flex gap-2">
                    <button 
                        onClick={handlePrevClick} 
                        disabled={startIndex === 0}
                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-600 rounded-lg transition-all duration-300"
                    >
                        ← Previous
                    </button>
                    <button 
                        onClick={handleNextClick} 
                        disabled={endIndex >= filteredEmployees.length}
                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed border border-gray-600 rounded-lg transition-all duration-300"
                    >
                        Next →
                    </button>
                </div>
            </div>

            {/* Filter Modal */}
            {isFilterPopupOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 border border-gray-700 rounded-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b border-gray-700">
                            <h3 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                Filter Options
                            </h3>
                            <button 
                                onClick={closeFilterPopup}
                                className="p-2 bg-red-700 hover:bg-red-600 rounded-lg transition-all duration-200"
                            >
                                <FaTimes className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Department:</label>
                                <select 
                                    value={departmentFilter} 
                                    onChange={(e) => setDepartmentFilter(e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">All Departments</option>
                                    {departments.map(dept => (
                                        <option key={dept.id} value={dept.name}>{dept.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Employee Type:</label>
                                <select 
                                    value={employmentTypeFilter} 
                                    onChange={(e) => setEmploymentTypeFilter(e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3 p-6 border-t border-gray-700">
                            <button 
                                onClick={handleFilterApply} 
                                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all duration-300"
                            >
                                Apply Filters
                            </button>
                            <button 
                                onClick={handleFilterClear} 
                                className="px-4 py-2 bg-red-700 hover:bg-red-600 rounded-lg transition-all duration-300"
                            >
                                Clear All
                            </button>
                            <button 
                                onClick={closeFilterPopup} 
                                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-300"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Employee Details Modal with Tabs */}
            {isModalOpen && selectedEmployee && createPortal(
                <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4">
                    <div className="bg-[#0a0a0a] border border-[#2a2a2a] rounded-xl w-full max-w-7xl max-h-[95vh] overflow-hidden shadow-2xl">
                        {/* Header */}
                        <div className="flex justify-between items-center p-6 border-b border-[#2a2a2a] bg-[#0a0a0a] sticky top-0 z-10">
                            <h3 className="text-3xl font-jakarta font-bold bg-gradient-to-r from-[#ff6600] via-white to-[#0066ff] bg-clip-text text-transparent">
                                Employee Details - {selectedEmployee.employee_name}
                            </h3>
                            <button 
                                onClick={closeModal}
                                className="p-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 rounded-lg transition-all duration-300 shadow-lg hover:shadow-red-500/25 group"
                            >
                                <FaTimes className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
                            </button>
                        </div>

                        {/* Tab Navigation */}
                        <div className="flex border-b border-[#2a2a2a] bg-[#0a0a0a]">
                            <button
                                onClick={() => setActiveTab('personal')}
                                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-300 ${
                                    activeTab === 'personal'
                                        ? 'border-b-2 border-blue-500 text-blue-400 bg-blue-500/10'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                                }`}
                            >
                                <FaUser className="w-4 h-4" />
                                Personal Info
                            </button>
                            <button
                                onClick={() => setActiveTab('job')}
                                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-300 ${
                                    activeTab === 'job'
                                        ? 'border-b-2 border-green-500 text-green-400 bg-green-500/10'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                                }`}
                            >
                                <FaBriefcase className="w-4 h-4" />
                                Job Details
                            </button>
                            <button
                                onClick={() => setActiveTab('role')}
                                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-300 ${
                                    activeTab === 'role'
                                        ? 'border-b-2 border-purple-500 text-purple-400 bg-purple-500/10'
                                        : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                                }`}
                            >
                                <FaCog className="w-4 h-4" />
                                Role & Permissions
                            </button>
                        </div>
                        
                        {/* Content Container */}
                        <div className="overflow-y-auto no-scrollbar max-h-[calc(95vh-200px)]">
                            <div className="p-6">
                                {/* Personal Information Tab */}
                                {activeTab === 'personal' && (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                                    <label className="block text-xs font-jakarta font-semibold text-[#a3a3a3] uppercase tracking-wider">
                                                        {field.label}
                                                    </label>
                                                    {field.type === 'select' ? (
                                                        <select
                                                            value={selectedEmployee[field.name] || ''}
                                                            name={field.name}
                                                            disabled={!isEditable || field.readOnly}
                                                            onChange={handleEmployeeChange}
                                                            className={`w-full px-4 py-3 bg-[#111111] border rounded-lg text-white font-jakarta transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent ${
                                                                !isEditable || field.readOnly
                                                                    ? 'border-[#2a2a2a] text-[#a3a3a3] cursor-not-allowed' 
                                                                    : 'border-[#404040] hover:border-[#2563eb] focus:shadow-lg focus:shadow-[#2563eb]/20'
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
                                                            className={`w-full px-4 py-3 bg-[#111111] border rounded-lg text-white font-jakarta transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent ${
                                                                !isEditable || field.readOnly
                                                                    ? 'border-[#2a2a2a] text-[#a3a3a3] cursor-not-allowed' 
                                                                    : 'border-[#404040] hover:border-[#2563eb] focus:shadow-lg focus:shadow-[#2563eb]/20'
                                                            }`}
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Job Details Tab */}
                                {activeTab === 'job' && selectedJobDetails && (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                                    <label className="block text-xs font-jakarta font-semibold text-[#a3a3a3] uppercase tracking-wider mb-2">
                                                        {field.label}
                                                    </label>
                                                    {field.type === 'select' ? (
                                                        <select
                                                            value={selectedJobDetails[field.name] || ''}
                                                            name={field.name}
                                                            disabled={!isJobEditable}
                                                            onChange={handleJobChange}
                                                            className={`w-full px-4 py-3 bg-[#111111] border rounded-lg text-white font-jakarta transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent ${
                                                                !isJobEditable
                                                                    ? 'border-[#2a2a2a] text-[#a3a3a3] cursor-not-allowed' 
                                                                    : 'border-[#404040] hover:border-[#2563eb] focus:shadow-lg focus:shadow-[#2563eb]/20'
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
                                                            className={`w-full px-4 py-3 bg-[#111111] border rounded-lg text-white font-jakarta transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent resize-none ${
                                                                !isJobEditable
                                                                    ? 'border-[#2a2a2a] text-[#a3a3a3] cursor-not-allowed' 
                                                                    : 'border-[#404040] hover:border-[#2563eb] focus:shadow-lg focus:shadow-[#2563eb]/20'
                                                            }`}
                                                        />
                                                    ) : (
                                                        <input
                                                            type={field.type}
                                                            value={selectedJobDetails[field.name] || ''}
                                                            name={field.name}
                                                            readOnly={!isJobEditable}
                                                            onChange={handleJobChange}
                                                            className={`w-full px-4 py-3 bg-[#111111] border rounded-lg text-white font-jakarta transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#2563eb] focus:border-transparent ${
                                                                !isJobEditable
                                                                    ? 'border-[#2a2a2a] text-[#a3a3a3] cursor-not-allowed' 
                                                                    : 'border-[#404040] hover:border-[#2563eb] focus:shadow-lg focus:shadow-[#2563eb]/20'
                                                            }`}
                                                        />
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Role & Permissions Tab */}
                                {activeTab === 'role' && (
                                    <div className="space-y-6">
                                        <div className="bg-gradient-to-br from-[#161616] to-[#1e1e1e] p-6 rounded-xl border border-[#2a2a2a]">
                                            <h4 className="text-xl font-bold text-purple-400 mb-4">Role Assignment</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-2">Current Role:</label>
                                                    <select
                                                        className="w-full px-4 py-3 bg-[#111111] border border-[#404040] rounded-lg text-white"
                                                        defaultValue=""
                                                    >
                                                        <option value="">Select Role</option>
                                                        {roles.map(role => (
                                                            <option key={role.id} value={role.id}>{role.name}</option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div>
                                                    <label className="block text-sm font-medium text-gray-300 mb-2">Manager:</label>
                                                    <select
                                                        className="w-full px-4 py-3 bg-[#111111] border border-[#404040] rounded-lg text-white"
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

                                        <div className="bg-gradient-to-br from-[#161616] to-[#1e1e1e] p-6 rounded-xl border border-[#2a2a2a]">
                                            <h4 className="text-xl font-bold text-purple-400 mb-4">Available Roles</h4>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {roles.map(role => (
                                                    <div key={role.id} className="p-4 bg-[#111111] rounded-lg border border-[#2a2a2a]">
                                                        <h5 className="font-bold text-white mb-2">{role.name}</h5>
                                                        <p className="text-gray-400 text-sm mb-3">{role.description}</p>
                                                        <div className="flex flex-wrap gap-1">
                                                            {role.permissions && role.permissions.map(permission => (
                                                                <span key={permission} className="px-2 py-1 bg-purple-900/50 text-purple-200 text-xs rounded">
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

                        {/* Action Footer */}
                        <div className="flex justify-end gap-4 p-6 border-t border-[#2a2a2a] bg-[#0a0a0a] sticky bottom-0">
                            {activeTab === 'personal' && (
                                <>
                                    <button 
                                        className={`flex items-center gap-3 px-6 py-3 rounded-lg font-jakarta font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                                            isEditable 
                                                ? 'bg-gradient-to-r from-[#ef4444] to-[#dc2626] hover:from-[#dc2626] hover:to-[#b91c1c] text-white shadow-red-500/25 hover:shadow-red-500/40' 
                                                : 'bg-gradient-to-r from-[#22c55e] to-[#16a34a] hover:from-[#16a34a] hover:to-[#15803d] text-white shadow-green-500/25 hover:shadow-green-500/40'
                                        }`}
                                        onClick={() => setIsEditable(!isEditable)}
                                    >
                                        <FaEdit className="w-4 h-4" />
                                        {isEditable ? 'Cancel Edit' : 'Edit Personal Info'}
                                    </button>
                                    
                                    {isEditable && (
                                        <button 
                                            onClick={saveEmployeeChanges} 
                                            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#2563eb] to-[#7c3aed] hover:from-[#1d4ed8] hover:to-[#6d28d9] rounded-lg font-jakarta font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
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
                                        className={`flex items-center gap-3 px-6 py-3 rounded-lg font-jakarta font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg ${
                                            isJobEditable 
                                                ? 'bg-gradient-to-r from-[#ef4444] to-[#dc2626] hover:from-[#dc2626] hover:to-[#b91c1c] text-white shadow-red-500/25 hover:shadow-red-500/40' 
                                                : 'bg-gradient-to-r from-[#22c55e] to-[#16a34a] hover:from-[#16a34a] hover:to-[#15803d] text-white shadow-green-500/25 hover:shadow-green-500/40'
                                        }`}
                                        onClick={() => setIsJobEditable(!isJobEditable)}
                                    >
                                        <FaEdit className="w-4 h-4" />
                                        {isJobEditable ? 'Cancel Edit' : 'Edit Job Details'}
                                    </button>
                                    
                                    {isJobEditable && (
                                        <button 
                                            onClick={saveJobChanges} 
                                            className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#2563eb] to-[#7c3aed] hover:from-[#1d4ed8] hover:to-[#6d28d9] rounded-lg font-jakarta font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                                        >
                                            <FaSave className="w-4 h-4" />
                                            Save Job Changes
                                        </button>
                                    )}
                                </>
                            )}
                            
                            <button 
                                className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-[#374151] to-[#4b5563] hover:from-[#4b5563] hover:to-[#6b7280] rounded-lg font-jakarta font-semibold text-white transition-all duration-300 transform hover:scale-105 shadow-lg" 
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
        </div>
    );
};

export default EmpManagement;
