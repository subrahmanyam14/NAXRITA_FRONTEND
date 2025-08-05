// src/components/admin/modals/AddEmployeeModal.jsx
import React, { useState } from 'react';
import { X, ArrowLeft, User, Mail, Phone, Building, Calendar } from 'lucide-react';
import { toast } from 'react-toastify';

const AddEmployeeModal = ({ showModal, onClose, onSuccess, api }) => {
  const [newEmployee, setNewEmployee] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    employeeId: '',
    department: '',
    designation: '',
    status: 'active',
    joinDate: '',
    salary: '',
    address: '',
    emergencyContact: ''
  });

  const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];
  const designations = ['Senior Developer', 'Marketing Manager', 'Sales Executive', 'HR Specialist', 'Accountant'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const employee = await api.addEmployee(newEmployee);
      onSuccess(employee);
      setNewEmployee({
        firstName: '', lastName: '', email: '', phone: '',
        employeeId: '', department: '', designation: '', status: 'active',
        joinDate: '', salary: '', address: '', emergencyContact: ''
      });
      toast.success('Employee added successfully! 🎉');
    } catch (error) {
      toast.error('Failed to add employee ❌');
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-start justify-center z-50 overflow-auto font-['Plus_Jakarta_Sans']">
      <div className="bg-[#000000] w-full max-w-4xl rounded-xl border border-[#2a2a2a] shadow-2xl mt-8 mb-8 mx-4">
        {/* Sticky Header */}
        <div className="sticky top-0 bg-[#000000] border-b border-[#2a2a2a] px-8 py-6 flex items-center justify-between z-10">
          <div className="flex items-center">
            <button 
              onClick={onClose}
              className="mr-4 p-2 text-[#a3a3a3] hover:text-white rounded-lg hover:bg-[#1e1e1e] transition-all duration-200"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h2 
                className="text-2xl font-bold bg-clip-text text-transparent"
                style={{
                  background: 'linear-gradient(90deg, #ff6600 0%, #ffffff 50%, #0066ff 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Add New Employee
              </h2>
              <p 
                className="text-sm bg-clip-text text-transparent mt-1"
                style={{
                  background: 'linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent'
                }}
              >
                Fill in employee details to add to the system
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-[#a3a3a3] hover:text-white rounded-lg hover:bg-[#1e1e1e] transition-all duration-200"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Form Content */}
        <div className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <div className="bg-[#0a0a0a] p-6 rounded-xl border border-[#2a2a2a]">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                <User className="w-5 h-5 mr-2 text-[#2563eb]" />
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#a3a3a3] mb-2">
                    First Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg text-white text-sm focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all duration-200"
                    value={newEmployee.firstName}
                    onChange={(e) => setNewEmployee(prev => ({ ...prev, firstName: e.target.value }))}
                    placeholder="Enter first name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#a3a3a3] mb-2">
                    Last Name *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg text-white text-sm focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all duration-200"
                    value={newEmployee.lastName}
                    onChange={(e) => setNewEmployee(prev => ({ ...prev, lastName: e.target.value }))}
                    placeholder="Enter last name"
                  />
                </div>
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="bg-[#0a0a0a] p-6 rounded-xl border border-[#2a2a2a]">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-[#2563eb]" />
                Contact Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#a3a3a3] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg text-white text-sm focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all duration-200"
                    value={newEmployee.email}
                    onChange={(e) => setNewEmployee(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="employee@nexrita.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#a3a3a3] mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg text-white text-sm focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all duration-200"
                    value={newEmployee.phone}
                    onChange={(e) => setNewEmployee(prev => ({ ...prev, phone: e.target.value }))}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-[#a3a3a3] mb-2">
                    Emergency Contact
                  </label>
                  <input
                    type="tel"
                    className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg text-white text-sm focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all duration-200"
                    value={newEmployee.emergencyContact}
                    onChange={(e) => setNewEmployee(prev => ({ ...prev, emergencyContact: e.target.value }))}
                    placeholder="+1 (555) 987-6543"
                  />
                </div>
              </div>
            </div>

            {/* Work Information Section */}
            <div className="bg-[#0a0a0a] p-6 rounded-xl border border-[#2a2a2a]">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                <Building className="w-5 h-5 mr-2 text-[#2563eb]" />
                Work Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#a3a3a3] mb-2">
                    Employee ID *
                  </label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg text-white text-sm focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all duration-200"
                    value={newEmployee.employeeId}
                    onChange={(e) => setNewEmployee(prev => ({ ...prev, employeeId: e.target.value }))}
                    placeholder="EMP001"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#a3a3a3] mb-2">
                    Join Date
                  </label>
                  <input
                    type="date"
                    className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg text-white text-sm focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all duration-200"
                    value={newEmployee.joinDate}
                    onChange={(e) => setNewEmployee(prev => ({ ...prev, joinDate: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#a3a3a3] mb-2">
                    Department *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg text-white text-sm focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all duration-200"
                    value={newEmployee.department}
                    onChange={(e) => setNewEmployee(prev => ({ ...prev, department: e.target.value }))}
                  >
                    <option value="">Select Department</option>
                    {departments.map(dept => (
                      <option key={dept} value={dept} className="bg-[#161616]">{dept}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#a3a3a3] mb-2">
                    Designation *
                  </label>
                  <select
                    required
                    className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg text-white text-sm focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all duration-200"
                    value={newEmployee.designation}
                    onChange={(e) => setNewEmployee(prev => ({ ...prev, designation: e.target.value }))}
                  >
                    <option value="">Select Designation</option>
                    {designations.map(desig => (
                      <option key={desig} value={desig} className="bg-[#161616]">{desig}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#a3a3a3] mb-2">
                    Status
                  </label>
                  <select
                    className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg text-white text-sm focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all duration-200"
                    value={newEmployee.status}
                    onChange={(e) => setNewEmployee(prev => ({ ...prev, status: e.target.value }))}
                  >
                    <option value="active" className="bg-[#161616]">Active</option>
                    <option value="inactive" className="bg-[#161616]">Inactive</option>
                    <option value="on-leave" className="bg-[#161616]">On Leave</option>
                    <option value="probation" className="bg-[#161616]">Probation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#a3a3a3] mb-2">
                    Salary
                  </label>
                  <input
                    type="number"
                    className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg text-white text-sm focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all duration-200"
                    value={newEmployee.salary}
                    onChange={(e) => setNewEmployee(prev => ({ ...prev, salary: e.target.value }))}
                    placeholder="50000"
                  />
                </div>
              </div>
            </div>

            {/* Address Section */}
            <div className="bg-[#0a0a0a] p-6 rounded-xl border border-[#2a2a2a]">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-[#2563eb]" />
                Address Information
              </h3>
              <div>
                <label className="block text-sm font-medium text-[#a3a3a3] mb-2">
                  Full Address
                </label>
                <textarea
                  className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg text-white text-sm focus:ring-2 focus:ring-[#2563eb] focus:border-transparent transition-all duration-200 resize-none"
                  rows={3}
                  value={newEmployee.address}
                  onChange={(e) => setNewEmployee(prev => ({ ...prev, address: e.target.value }))}
                  placeholder="123 Main St, New York, NY 10001"
                />
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex justify-end space-x-4 pt-6 border-t border-[#2a2a2a]">
              <button
                type="button"
                onClick={onClose}
                className="px-8 py-3 text-sm font-medium text-[#a3a3a3] bg-transparent border border-[#404040] rounded-lg hover:bg-[#1e1e1e] hover:text-white transition-all duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-8 py-3 text-sm font-medium text-white bg-[#2563eb] rounded-lg hover:bg-[#1d4ed8] hover:shadow-lg transition-all duration-200"
                style={{
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)'
                }}
              >
                Add Employee
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddEmployeeModal;
