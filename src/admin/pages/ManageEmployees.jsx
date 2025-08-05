import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import { FaEdit, FaRegEye, FaTimes, FaDownload, FaUpload  } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AddEmp from '../components/AddEmp';
import * as XLSX from 'xlsx';
import { RefreshCw , ListFilter ,Search } from 'lucide-react';
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
    const [isEditable, setIsEditable] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [loading, setLoading] = useState(false);
    const [startIndex, setStartIndex] = useState(0);
    const entriesPerPage = 10;

    // Dummy fallback data
    const dummyEmployees = [
        {
            EmployeeID: 'EMP001',
            ProfilePhoto: '/assets/profile.png',
            FullName: 'John Doe',
            EmailAddress: 'john.doe@nexrita.com',
            DOJ: '2024-01-15',
            JoiningDate: '2024-01-15',
            DeptName: 'IT Department',
            JobTitle: 'Junior_Software_Engineer',
            EmploymentType: 'Permanent',
            ActiveStatus: 'Active',
            Gender: 'Male',
            DateOfBirth: '1995-06-15',
            HireDate: '2024-01-15',
            Address: '123 Main St, City',
            ContactNumber: '9876543210',
            SecondaryContact: '9876543211',
            Graduation: 'UG',
            TotalExperience: '3',
            Skill1: 'React',
            Skill2: 'Node.js',
            Skill3: 'MongoDB',
            Resignation: null,
            ResignationDate: null,
            Role: 'Employee'
        },
        {
            EmployeeID: 'EMP002',
            ProfilePhoto: '/assets/profile.png',
            FullName: 'Jane Smith',
            EmailAddress: 'jane.smith@nexrita.com',
            DOJ: '2023-12-01',
            JoiningDate: '2023-12-01',
            DeptName: 'HR Department',
            JobTitle: 'HR_Admin_Executive',
            EmploymentType: 'Permanent',
            ActiveStatus: 'Active',
            Gender: 'Female',
            DateOfBirth: '1992-03-20',
            HireDate: '2023-12-01',
            Address: '456 Oak Ave, City',
            ContactNumber: '9876543212',
            SecondaryContact: '9876543213',
            Graduation: 'PG',
            TotalExperience: '5',
            Skill1: 'Recruitment',
            Skill2: 'Employee Relations',
            Skill3: 'Training',
            Resignation: null,
            ResignationDate: null,
            Role: 'HR'
        }
    ];

    useEffect(() => {
        fetchEmployees();
    }, []);

    const employeeId = localStorage.getItem('employee');
    const employee = employeeId ? JSON.parse(employeeId) : null;
    const employeeid = employee?.EmployeeID;

    useEffect(() => {
        setFilteredEmployees(applyFilters(employees));
    }, [searchQuery, departmentFilter, jobTitleFilter, hireDateFilter, employmentTypeFilter, employees]);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_URL}/employee/getemployee`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            const mappedData = response.data.map(emp => ({
                EmployeeID: emp.EmployeeID,
                ProfilePhoto: emp.ProfilePhoto || '/assets/profile.png',
                FullName: emp.FullName,
                EmailAddress: emp.EmailAddress,
                DOJ: emp.DOJ,
                JoiningDate: emp.JoiningDate || emp.DOJ,
                DeptName: emp.DeptName,
                JobTitle: emp.JobTitle,
                EmploymentType: emp.EmploymentType || 'Permanent',
                ActiveStatus: emp.ActiveStatus ? 'Active' : 'Inactive',
                Gender: emp.Gender,
                DateOfBirth: emp.DateOfBirth,
                HireDate: emp.HireDate,
                Address: emp.Address,
                ContactNumber: emp.ContactNumber,
                SecondaryContact: emp.SecondaryContact,
                Graduation: emp.Graduation,
                TotalExperience: emp.TotalExperience,
                Skill1: emp.Skill1,
                Skill2: emp.Skill2,
                Skill3: emp.Skill3,
                Resignation: emp.Resignation,
                ResignationDate: emp.ResignationDate,
                Role: emp.Role
            }));
            setEmployees(mappedData);
        } catch (error) {
            console.error('Error fetching employees:', error);
            setEmployees(dummyEmployees);
            toast.error('Failed to fetch employees. Using offline data.');
        }
    };

    const fetchEmployeeById = async (EmployeeID) => {
        try {
            const res = await axios.get(`${process.env.REACT_APP_URL}/employee/getemployeebyid/${EmployeeID}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });
            setSelectedEmployee(res.data[0]);
        } catch (error) {
            console.error('Error fetching employee by ID:', error);
            const fallbackEmployee = employees.find(emp => emp.EmployeeID === EmployeeID) || 
                                   dummyEmployees.find(emp => emp.EmployeeID === EmployeeID);
            setSelectedEmployee(fallbackEmployee);
        }
    };

    const applyFilters = (employees) => {
        return employees.filter(employee => {
            const name = employee.FullName || '';
            const empId = employee.EmployeeID || '';
            const department = employee.DeptName || '';
            const jobTitle = employee.JobTitle || '';
            const hireDate = employee.DOJ || '';
            const employmentType = employee.EmploymentType || '';

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

    const openModal = async (EmployeeID) => {
        const employeeId = typeof EmployeeID === 'object' ? EmployeeID.EmployeeID : EmployeeID;
        await fetchEmployeeById(employeeId);
        setIsEditable(false);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEmployee(null);
        setIsEditable(false);
    };

    const handleChange = (e) => {
        setSelectedEmployee(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    };

    const formatDate = (isoDate) => {
        if (!isoDate) return '';
        const date = new Date(isoDate);
        return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear()}`;
    };

    const saveChanges = async () => {
        try {
            const formattedEmployee = {
                ...selectedEmployee,
                HireDate: formatDate(selectedEmployee.HireDate),
                DateOfBirth: formatDate(selectedEmployee.DateOfBirth),
                DOJ: formatDate(selectedEmployee.DOJ),
                JoiningDate: formatDate(selectedEmployee.JoiningDate),
            };
            
            await axios.put(`${process.env.REACT_APP_URL}/employee/editemployee/${formattedEmployee.EmployeeID}`, formattedEmployee, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                },
            });

            const updatedEmployees = employees.map(emp =>
                emp.EmployeeID === formattedEmployee.EmployeeID ? formattedEmployee : emp
            );
            setEmployees(updatedEmployees);
            toast.success("Employee updated successfully!");
            setIsModalOpen(false);
        } catch (error) {
            console.error('Error updating employee:', error);
            toast.error('Error updating employee!');
        }
    };

    const handleFileUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        setLoading(true);

        try {
            const response = await axios.post(`${process.env.REACT_APP_URL}/employee/empRegs`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data',
                },
            });

            toast.success(response.data.message);
            fetchEmployees();
        } catch (error) {
            console.error('Error uploading file:', error);
            toast.error('Error uploading file!');
        } finally {
            setLoading(false);
        }

        fileInp.current.value = '';
    };

    // Export to Excel function
    const exportToExcel = () => {
        const exportData = filteredEmployees.map((emp, index) => ({
            'S.No': index + 1,
            'Employee ID': emp.EmployeeID,
            'Full Name': emp.FullName,
            'Email': emp.EmailAddress,
            'Gender': emp.Gender,
            'Date of Birth': formatDate(emp.DateOfBirth),
            'Joining Date': formatDate(emp.JoiningDate || emp.DOJ),
            'Department': emp.DeptName,
            'Job Title': emp.JobTitle?.replace(/_/g, ' '),
            'Employment Type': emp.EmploymentType,
            'Contact Number': emp.ContactNumber,
            'Secondary Contact': emp.SecondaryContact,
            'Address': emp.Address,
            'Graduation': emp.Graduation,
            'Total Experience': emp.TotalExperience,
            'Skill 1': emp.Skill1,
            'Skill 2': emp.Skill2,
            'Skill 3': emp.Skill3,
            'Status': emp.ActiveStatus,
            'Role': emp.Role
        }));

        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.json_to_sheet(exportData);
        
        // Auto-width columns
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
                        className="flex items-center  border-gray-50 gap-2 px-4 py-2 bg-clip-text text-transparent bg-green-700 hover:bg-green-600 rounded-lg transition-all duration-300 hover:scale-105"
                    >
                        <FaUpload />
                        <span className="hidden sm:inline">Import Excel</span>
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
                        onChange={handleFileUpload} 
                        className="hidden" 
                    />
                </div>
            </div>

            {/* Table Container */}
            <div className="bg-gray-950 border border-gray-700 rounded-lg overflow-hidden mb-6">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                        <thead className="bg-gray-900 border- border-gray-700">
                            <tr>
                                <th className="sticky left-0 z-20 bg-gray-900 px-4 py-3 text-left font-semibold text-gray-200  w-16">
                                    S.No.
                                </th>
                                <th className="sticky left-16 z-20 bg-gray-900 px-4 py-3 text-left font-semibold text-gray-200  w-32">
                                    Employee ID
                                </th>
                                <th className="sticky left-48 z-20 bg-gray-900 px-4 py-3 text-left font-semibold text-gray-200  w-48">
                                    Full Name
                                </th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-200 w-32">Joining Date</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-200 w-32">Department</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-200 w-40">Job Title</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-200 w-32">Employment Type</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-200 w-24">Status</th>
                                <th className="px-4 py-3 text-left font-semibold text-gray-200 w-24">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {visibleEmployees.map((employee, index) => (
                                <tr 
                                    key={employee.EmployeeID} 
                                    className="border-b border-gray-700 hover:bg-gray-800 transition-colors duration-200"
                                >
                                    <td className="sticky left-0 z-10 bg-gray-950 hover:bg-gray-800 px-4 py-3  font-medium">
                                        {startIndex + index + 1}
                                    </td>
                                    <td className="sticky left-16 z-10 bg-gray-950 hover:bg-gray-800 px-4 py-3 font-medium text-blue-400">
                                        {employee.EmployeeID}
                                    </td>
                                    <td className="sticky left-48 z-10 bg-gray-950 hover:bg-gray-800 px-4 py-3  font-medium">
                                        {employee.FullName}
                                    </td>
                                    <td className="px-4 py-3 text-gray-300">
                                        {formatDate(employee.JoiningDate || employee.DOJ)}
                                    </td>
                                    <td className="px-4 py-3 text-gray-300">{employee.DeptName}</td>
                                    <td className="px-4 py-3 text-gray-300">
                                        {employee.JobTitle?.replace(/_/g, ' ')}
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            employee.EmploymentType === 'Permanent' 
                                                ? 'bg-blue-900 text-blue-200 border border-blue-700'
                                                : employee.EmploymentType === 'Internship'
                                                ? 'bg-yellow-900 text-yellow-200 border border-yellow-700'
                                                : 'bg-purple-900 text-purple-200 border border-purple-700'
                                        }`}>
                                            {employee.EmploymentType || 'Permanent'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            employee.ActiveStatus === 'Active' 
                                                ? 'bg-green-900 text-green-200 border border-green-700'
                                                : 'bg-red-900 text-red-200 border border-red-700'
                                        }`}>
                                            {employee.ActiveStatus}
                                        </span>
                                    </td>
                                    <td className="px-4 py-3">
                                        <button 
                                            onClick={() => openModal(employee.EmployeeID)}
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
                                    <option value="HR Department">HR Department</option>
                                    <option value="IT Department">IT Department</option>
                                    <option value="BA Department">BA Department</option>
                                    <option value="Management">Management</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Job Title:</label>
                                <select 
                                    value={jobTitleFilter} 
                                    onChange={(e) => setJobTitleFilter(e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">All Job Titles</option>
                                    <option value="Vice President">Vice President</option>
                                    <option value="Junior_Software_Engineer">Junior Software Engineer</option>
                                    <option value="Business_Associate">Business Associate</option>
                                    <option value="Lead_Manager">Lead Manager</option>
                                    <option value="Talent_Acquisition_Executive">Talent Acquisition Executive</option>
                                    <option value="Talent_Acquisition_IT_Recruiter">Talent Acquisition IT Recruiter</option>
                                    <option value="Campus_Hiring_Executive">Campus Hiring Executive</option>
                                    <option value="HR_Admin_Executive">HR Admin Executive</option>
                                    <option value="HR_Business_Partner">HR Business Partner</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Employment Type:</label>
                                <select 
                                    value={employmentTypeFilter} 
                                    onChange={(e) => setEmploymentTypeFilter(e.target.value)}
                                    className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">All Types</option>
                                    <option value="Permanent">Permanent</option>
                                    <option value="Internship">Internship</option>
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

            {/* Employee Details Modal */}
           {isModalOpen && selectedEmployee && createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
     

                <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 border border-gray-700 rounded-lg w-full max-w-6xl max-h-[95vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-6 border-b border-gray-700 sticky top-0 bg-gray-900 z-10">
                            <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                                {isEditable ? 'Edit Employee' : 'Employee Details'}
                            </h3>
                            <button 
                                onClick={closeModal}
                                className="p-2 bg-red-700 hover:bg-red-600 rounded-lg transition-all duration-200"
                            >
                                <FaTimes className="w-5 h-5" />
                            </button>
                        </div>
                        
                        <div className="p-6">
                            {/* Employee Profile Section */}
                            <div className="flex flex-col md:flex-row items-center gap-6 mb-8 p-6 bg-gray-800 rounded-lg border border-gray-700">
                                <div className="relative">
                                    <img 
                                        src={selectedEmployee.ProfilePhoto || '/assets/profile.png'} 
                                        alt={selectedEmployee.FullName}
                                        className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover border-4 border-blue-500"
                                    />
                                </div>
                                <div className="text-center md:text-left">
                                    <h4 className="text-2xl font-bold bg-gradient-to-r from-orange-400 via-white to-blue-400 bg-clip-text text-transparent mb-2">
                                        {selectedEmployee.FullName}
                                    </h4>
                                    <p className="text-blue-400 font-semibold text-lg mb-1">
                                        {selectedEmployee.JobTitle?.replace(/_/g, ' ')}
                                    </p>
                                    <p className="text-gray-400">{selectedEmployee.DeptName}</p>
                                </div>
                            </div>

                            {/* Employee Details Grid */}
                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                                {/* Personal Information */}
                                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                                    <h5 className="text-lg font-bold text-blue-400 mb-4 border-b border-gray-600 pb-2">
                                        Personal Information
                                    </h5>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Employee ID:</label>
                                            <input
                                                type="text"
                                                value={selectedEmployee.EmployeeID || ''}
                                                name="EmployeeID"
                                                readOnly={!isEditable}
                                                onChange={handleChange}
                                                className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditable ? 'bg-gray-600 text-gray-300' : ''}`}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Full Name:</label>
                                            <input
                                                type="text"
                                                value={selectedEmployee.FullName || ''}
                                                name="FullName"
                                                readOnly={!isEditable}
                                                onChange={handleChange}
                                                className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditable ? 'bg-gray-600 text-gray-300' : ''}`}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Gender:</label>
                                            <input
                                                type="text"
                                                value={selectedEmployee.Gender || ''}
                                                name="Gender"
                                                readOnly={!isEditable}
                                                onChange={handleChange}
                                                className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditable ? 'bg-gray-600 text-gray-300' : ''}`}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Date of Birth:</label>
                                            <input
                                                type="text"
                                                value={selectedEmployee.DateOfBirth || ''}
                                                name="DateOfBirth"
                                                readOnly={!isEditable}
                                                onChange={handleChange}
                                                placeholder="dd-mm-yyyy"
                                                className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditable ? 'bg-gray-600 text-gray-300' : ''}`}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Email:</label>
                                            <input
                                                type="email"
                                                value={selectedEmployee.EmailAddress || ''}
                                                name="EmailAddress"
                                                readOnly={!isEditable}
                                                onChange={handleChange}
                                                className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditable ? 'bg-gray-600 text-gray-300' : ''}`}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Contact Number:</label>
                                            <input
                                                type="text"
                                                value={selectedEmployee.ContactNumber || ''}
                                                name="ContactNumber"
                                                readOnly={!isEditable}
                                                onChange={handleChange}
                                                className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditable ? 'bg-gray-600 text-gray-300' : ''}`}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Secondary Contact:</label>
                                            <input
                                                type="text"
                                                value={selectedEmployee.SecondaryContact || ''}
                                                name="SecondaryContact"
                                                readOnly={!isEditable}
                                                onChange={handleChange}
                                                className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditable ? 'bg-gray-600 text-gray-300' : ''}`}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Address:</label>
                                            <textarea
                                                value={selectedEmployee.Address || ''}
                                                name="Address"
                                                readOnly={!isEditable}
                                                onChange={handleChange}
                                                rows="3"
                                                className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none ${!isEditable ? 'bg-gray-600 text-gray-300' : ''}`}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Employment Information */}
                                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                                    <h5 className="text-lg font-bold text-blue-400 mb-4 border-b border-gray-600 pb-2">
                                        Employment Information
                                    </h5>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Joining Date:</label>
                                            <input
                                                type="text"
                                                value={selectedEmployee.JoiningDate || selectedEmployee.DOJ || ''}
                                                name="JoiningDate"
                                                readOnly={!isEditable}
                                                onChange={handleChange}
                                                placeholder="dd-mm-yyyy"
                                                className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditable ? 'bg-gray-600 text-gray-300' : ''}`}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Hire Date:</label>
                                            <input
                                                type="text"
                                                value={selectedEmployee.HireDate || ''}
                                                name="HireDate"
                                                readOnly={!isEditable}
                                                onChange={handleChange}
                                                placeholder="dd-mm-yyyy"
                                                className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditable ? 'bg-gray-600 text-gray-300' : ''}`}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Employment Type:</label>
                                            {isEditable ? (
                                                <select
                                                    value={selectedEmployee.EmploymentType || 'Permanent'}
                                                    name="EmploymentType"
                                                    onChange={handleChange}
                                                    className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                >
                                                    <option value="Permanent">Permanent</option>
                                                    <option value="Internship">Internship</option>
                                                    <option value="Contractor">Contractor</option>
                                                </select>
                                            ) : (
                                                <input
                                                    type="text"
                                                    value={selectedEmployee.EmploymentType || 'Permanent'}
                                                    readOnly
                                                    className="w-full px-3 py-2 bg-gray-600 border border-gray-600 rounded-lg text-gray-300"
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Department:</label>
                                            <input
                                                type="text"
                                                value={selectedEmployee.DeptName || ''}
                                                name="DeptName"
                                                readOnly={!isEditable}
                                                onChange={handleChange}
                                                className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditable ? 'bg-gray-600 text-gray-300' : ''}`}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Job Title:</label>
                                            <input
                                                type="text"
                                                value={selectedEmployee.JobTitle || ''}
                                                name="JobTitle"
                                                readOnly={!isEditable}
                                                onChange={handleChange}
                                                className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditable ? 'bg-gray-600 text-gray-300' : ''}`}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Status:</label>
                                            <input
                                                type="text"
                                                value={selectedEmployee.ActiveStatus || ''}
                                                name="ActiveStatus"
                                                readOnly={!isEditable}
                                                onChange={handleChange}
                                                placeholder="0 for inactive & 1 for active"
                                                className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditable ? 'bg-gray-600 text-gray-300' : ''}`}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Role:</label>
                                            <input
                                                type="text"
                                                value={selectedEmployee.Role || ''}
                                                name="Role"
                                                readOnly={!isEditable}
                                                onChange={handleChange}
                                                className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditable ? 'bg-gray-600 text-gray-300' : ''}`}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Professional Information */}
                                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                                    <h5 className="text-lg font-bold text-blue-400 mb-4 border-b border-gray-600 pb-2">
                                        Professional Information
                                    </h5>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Graduation:</label>
                                            <input
                                                type="text"
                                                value={selectedEmployee.Graduation || ''}
                                                name="Graduation"
                                                readOnly={!isEditable}
                                                onChange={handleChange}
                                                className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditable ? 'bg-gray-600 text-gray-300' : ''}`}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Total Experience:</label>
                                            <input
                                                type="text"
                                                value={selectedEmployee.TotalExperience || ''}
                                                name="TotalExperience"
                                                readOnly={!isEditable}
                                                onChange={handleChange}
                                                className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditable ? 'bg-gray-600 text-gray-300' : ''}`}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Skill 1:</label>
                                            <input
                                                type="text"
                                                value={selectedEmployee.Skill1 || ''}
                                                name="Skill1"
                                                readOnly={!isEditable}
                                                onChange={handleChange}
                                                className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditable ? 'bg-gray-600 text-gray-300' : ''}`}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Skill 2:</label>
                                            <input
                                                type="text"
                                                value={selectedEmployee.Skill2 || ''}
                                                name="Skill2"
                                                readOnly={!isEditable}
                                                onChange={handleChange}
                                                className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditable ? 'bg-gray-600 text-gray-300' : ''}`}
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Skill 3:</label>
                                            <input
                                                type="text"
                                                value={selectedEmployee.Skill3 || ''}
                                                name="Skill3"
                                                readOnly={!isEditable}
                                                onChange={handleChange}
                                                className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditable ? 'bg-gray-600 text-gray-300' : ''}`}
                                            />
                                        </div>
                                        {selectedEmployee.Resignation && (
                                            <>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Resignation:</label>
                                                    <input
                                                        type="text"
                                                        value={selectedEmployee.Resignation || ''}
                                                        name="Resignation"
                                                        readOnly={!isEditable}
                                                        onChange={handleChange}
                                                        className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditable ? 'bg-gray-600 text-gray-300' : ''}`}
                                                    />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Resignation Date:</label>
                                                    <input
                                                        type="text"
                                                        value={selectedEmployee.ResignationDate || ''}
                                                        name="ResignationDate"
                                                        readOnly={!isEditable}
                                                        onChange={handleChange}
                                                        placeholder="yyyy-mm-dd"
                                                        className={`w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 ${!isEditable ? 'bg-gray-600 text-gray-300' : ''}`}
                                                    />
                                                </div>
                                            </>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3 p-6 border-t border-gray-700 bg-gray-900 sticky bottom-0">
                            <button 
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                                    isEditable 
                                        ? 'bg-red-700 hover:bg-red-600' 
                                        : 'bg-green-700 hover:bg-green-600'
                                }`}
                                onClick={() => setIsEditable(!isEditable)}
                            >
                                <FaEdit />
                                {isEditable ? 'Cancel Edit' : 'Edit Employee'}
                            </button>
                            {isEditable && (
                                <button 
                                    onClick={saveChanges} 
                                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all duration-300"
                                >
                                    Save Changes
                                </button>
                            )}
                            <button 
                                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-300" 
                                onClick={closeModal}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
                   {/* Your existing employee modal content */}
    </div>,
    document.body
)}
           
        </div>
    );
};

export default EmpManagement;
