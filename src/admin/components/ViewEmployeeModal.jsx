// src/components/admin/modals/ViewEmployeeModal.jsx
import React, { useState } from 'react';
import { X, ArrowLeft, Pencil, Save, Mail, Phone, Building, Calendar, MapPin, User, Users } from 'lucide-react';
import { toast } from 'react-toastify';

const ViewEmployeeModal = ({ showModal, selectedEmployee, onClose, api, onSave }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState(selectedEmployee || {});

  const departments = ['Engineering', 'Marketing', 'Sales', 'HR', 'Finance'];
  const designations = ['Senior Developer', 'Marketing Manager', 'Sales Executive', 'HR Specialist', 'Accountant'];

  React.useEffect(() => {
    if (selectedEmployee) {
      setEditForm(selectedEmployee);
      setIsEditing(false);
    }
  }, [selectedEmployee]);

  const handleSave = async () => {
    try {
      const updatedEmployee = await api.updateEmployee(selectedEmployee.id, editForm);
      onSave(updatedEmployee);
      setIsEditing(false);
      toast.success('Employee updated successfully! ✅');
    } catch (error) {
      toast.error('Failed to update employee ❌');
    }
  };

  const StatusBadge = ({ status }) => {
    const statusConfig = {
      active: { bg: 'bg-[#22c55e]/20', text: 'text-[#22c55e]', label: 'Active' },
      inactive: { bg: 'bg-[#ef4444]/20', text: 'text-[#ef4444]', label: 'Inactive' },
      'on-leave': { bg: 'bg-[#f59e0b]/20', text: 'text-[#f59e0b]', label: 'On Leave' },
      probation: { bg: 'bg-[#f97316]/20', text: 'text-[#f97316]', label: 'Probation' }
    };
    
    const config = statusConfig[status] || statusConfig.inactive;
    
    return (
      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text} border border-current/20`}>
        {config.label}
      </span>
    );
  };

  if (!showModal || !selectedEmployee) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-start justify-center z-50 overflow-auto font-['Plus_Jakarta_Sans']">
      <div className="bg-[#000000] w-full max-w-5xl rounded-xl border border-[#2a2a2a] shadow-2xl mt-8 mb-8 mx-4">
        {/* Sticky Header */}
        <div className="sticky top-0 bg-[#000000] border-b border-[#2a2a2a] px-8 py-6 flex items-center justify-between z-10">
          <div className="flex items-center">
            <button 
              onClick={onClose}
              className="mr-4 p-2 text-[#a3a3a3] hover:text-white rounded-lg hover:bg-[#1e1e1e] transition-all duration-200"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div className="flex items-center space-x-4">
              <img 
                className="w-16 h-16 rounded-full border-2 border-[#2563eb]/50 shadow-lg" 
                src={`https://ui-avatars.com/api/?name=${selectedEmployee.firstName}+${selectedEmployee.lastName}&background=2563eb&color=ffffff&size=64`} 
                alt={`${selectedEmployee.firstName} ${selectedEmployee.lastName}`} 
                style={{ boxShadow: '0 0 20px rgba(37, 99, 235, 0.3)' }}
              />
              <div>
                <h2 
                  className="text-2xl font-bold bg-clip-text text-transparent"
                  style={{
                    background: 'linear-gradient(90deg, #ff6600 0%, #ffffff 50%, #0066ff 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                  }}
                >
                  {selectedEmployee.firstName} {selectedEmployee.lastName}
                </h2>
                <p className="text-[#a3a3a3] text-sm">{selectedEmployee.employeeId}</p>
                <StatusBadge status={selectedEmployee.status} />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!isEditing ? (
              <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-[#a3a3a3] hover:text-white rounded-lg hover:bg-[#1e1e1e] transition-all duration-200"
              >
                <Pencil className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-[#22c55e] text-white rounded-lg hover:bg-[#16a34a] transition-all duration-200 text-sm font-medium"
              >
                <Save className="w-4 h-4 mr-2 inline" />
                Save Changes
              </button>
            )}
            <button 
              onClick={onClose}
              className="p-2 text-[#a3a3a3] hover:text-white rounded-lg hover:bg-[#1e1e1e] transition-all duration-200"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Profile Content */}
        <div className="p-8">
          {/* Overview Section */}
          <div className="bg-[#0a0a0a] p-6 rounded-xl border border-[#2a2a2a] mb-8">
            <h3 
              className="text-lg font-semibold mb-6 bg-clip-text text-transparent"
              style={{
                background: 'linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Employee Overview
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-[#161616] p-4 rounded-lg border border-[#404040]">
                <div className="flex items-center mb-2">
                  <Building className="w-4 h-4 text-[#2563eb] mr-2" />
                  <span className="text-xs text-[#6b7280]">Department</span>
                </div>
                <p className="text-white font-medium">{selectedEmployee.department}</p>
              </div>
              <div className="bg-[#161616] p-4 rounded-lg border border-[#404040]">
                <div className="flex items-center mb-2">
                  <Users className="w-4 h-4 text-[#2563eb] mr-2" />
                  <span className="text-xs text-[#6b7280]">Designation</span>
                </div>
                <p className="text-white font-medium">{selectedEmployee.designation}</p>
              </div>
              <div className="bg-[#161616] p-4 rounded-lg border border-[#404040]">
                <div className="flex items-center mb-2">
                  <Calendar className="w-4 h-4 text-[#2563eb] mr-2" />
                  <span className="text-xs text-[#6b7280]">Join Date</span>
                </div>
                <p className="text-white font-medium">{selectedEmployee.joinDate}</p>
              </div>
              <div className="bg-[#161616] p-4 rounded-lg border border-[#404040]">
                <div className="flex items-center mb-2">
                  <span className="w-4 h-4 text-[#2563eb] mr-2 text-center">$</span>
                  <span className="text-xs text-[#6b7280]">Salary</span>
                </div>
                <p className="text-white font-medium">${selectedEmployee.salary?.toLocaleString()}</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Personal Information */}
            <div className="bg-[#0a0a0a] p-6 rounded-xl border border-[#2a2a2a]">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                <User className="w-5 h-5 mr-2 text-[#2563eb]" />
                Personal Information
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#6b7280] mb-2">First Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg text-white text-sm focus:ring-2 focus:ring-[#2563eb] transition-all duration-200"
                      value={editForm.firstName}
                      onChange={(e) => setEditForm(prev => ({ ...prev, firstName: e.target.value }))}
                    />
                  ) : (
                    <p className="text-white font-medium">{selectedEmployee.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6b7280] mb-2">Last Name</label>
                  {isEditing ? (
                    <input
                      type="text"
                      className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg text-white text-sm focus:ring-2 focus:ring-[#2563eb] transition-all duration-200"
                      value={editForm.lastName}
                      onChange={(e) => setEditForm(prev => ({ ...prev, lastName: e.target.value }))}
                    />
                  ) : (
                    <p className="text-white font-medium">{selectedEmployee.lastName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6b7280] mb-2">Status</label>
                  {isEditing ? (
                    <select
                      className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg text-white text-sm focus:ring-2 focus:ring-[#2563eb] transition-all duration-200"
                      value={editForm.status}
                      onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value }))}
                    >
                      <option value="active" className="bg-[#161616]">Active</option>
                      <option value="inactive" className="bg-[#161616]">Inactive</option>
                      <option value="on-leave" className="bg-[#161616]">On Leave</option>
                      <option value="probation" className="bg-[#161616]">Probation</option>
                    </select>
                  ) : (
                    <StatusBadge status={selectedEmployee.status} />
                  )}
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="bg-[#0a0a0a] p-6 rounded-xl border border-[#2a2a2a]">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                <Mail className="w-5 h-5 mr-2 text-[#2563eb]" />
                Contact Information
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#6b7280] mb-2">Email Address</label>
                  {isEditing ? (
                    <input
                      type="email"
                      className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg text-white text-sm focus:ring-2 focus:ring-[#2563eb] transition-all duration-200"
                      value={editForm.email}
                      onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                    />
                  ) : (
                    <p className="text-white font-medium">{selectedEmployee.email}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6b7280] mb-2">Phone Number</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg text-white text-sm focus:ring-2 focus:ring-[#2563eb] transition-all duration-200"
                      value={editForm.phone}
                      onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                    />
                  ) : (
                    <p className="text-white font-medium">{selectedEmployee.phone}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6b7280] mb-2">Emergency Contact</label>
                  {isEditing ? (
                    <input
                      type="tel"
                      className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg text-white text-sm focus:ring-2 focus:ring-[#2563eb] transition-all duration-200"
                      value={editForm.emergencyContact}
                      onChange={(e) => setEditForm(prev => ({ ...prev, emergencyContact: e.target.value }))}
                    />
                  ) : (
                    <p className="text-white font-medium">{selectedEmployee.emergencyContact}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Work Information */}
            <div className="bg-[#0a0a0a] p-6 rounded-xl border border-[#2a2a2a]">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                <Building className="w-5 h-5 mr-2 text-[#2563eb]" />
                Work Information
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#6b7280] mb-2">Department</label>
                  {isEditing ? (
                    <select
                      className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg text-white text-sm focus:ring-2 focus:ring-[#2563eb] transition-all duration-200"
                      value={editForm.department}
                      onChange={(e) => setEditForm(prev => ({ ...prev, department: e.target.value }))}
                    >
                      {departments.map(dept => (
                        <option key={dept} value={dept} className="bg-[#161616]">{dept}</option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-white font-medium">{selectedEmployee.department}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6b7280] mb-2">Designation</label>
                  {isEditing ? (
                    <select
                      className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg text-white text-sm focus:ring-2 focus:ring-[#2563eb] transition-all duration-200"
                      value={editForm.designation}
                      onChange={(e) => setEditForm(prev => ({ ...prev, designation: e.target.value }))}
                    >
                      {designations.map(desig => (
                        <option key={desig} value={desig} className="bg-[#161616]">{desig}</option>
                      ))}
                    </select>
                  ) : (
                    <p className="text-white font-medium">{selectedEmployee.designation}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6b7280] mb-2">Salary</label>
                  {isEditing ? (
                    <input
                      type="number"
                      className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg text-white text-sm focus:ring-2 focus:ring-[#2563eb] transition-all duration-200"
                      value={editForm.salary}
                      onChange={(e) => setEditForm(prev => ({ ...prev, salary: e.target.value }))}
                    />
                  ) : (
                    <p className="text-white font-medium">${selectedEmployee.salary?.toLocaleString()}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Address Information */}
            <div className="bg-[#0a0a0a] p-6 rounded-xl border border-[#2a2a2a]">
              <h3 className="text-lg font-semibold text-white mb-6 flex items-center">
                <MapPin className="w-5 h-5 mr-2 text-[#2563eb]" />
                Address Information
              </h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-[#6b7280] mb-2">Join Date</label>
                  {isEditing ? (
                    <input
                      type="date"
                      className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg text-white text-sm focus:ring-2 focus:ring-[#2563eb] transition-all duration-200"
                      value={editForm.joinDate}
                      onChange={(e) => setEditForm(prev => ({ ...prev, joinDate: e.target.value }))}
                    />
                  ) : (
                    <p className="text-white font-medium">{selectedEmployee.joinDate}</p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#6b7280] mb-2">Full Address</label>
                  {isEditing ? (
                    <textarea
                      className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-lg text-white text-sm focus:ring-2 focus:ring-[#2563eb] transition-all duration-200 resize-none"
                      rows={3}
                      value={editForm.address}
                      onChange={(e) => setEditForm(prev => ({ ...prev, address: e.target.value }))}
                    />
                  ) : (
                    <p className="text-white font-medium">{selectedEmployee.address}</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons for Edit Mode */}
          {isEditing && (
            <div className="flex justify-end space-x-4 mt-8 pt-6 border-t border-[#2a2a2a]">
              <button
                onClick={() => setIsEditing(false)}
                className="px-8 py-3 text-sm font-medium text-[#a3a3a3] bg-transparent border border-[#404040] rounded-lg hover:bg-[#1e1e1e] hover:text-white transition-all duration-200"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-8 py-3 text-sm font-medium text-white bg-[#2563eb] rounded-lg hover:bg-[#1d4ed8] hover:shadow-lg transition-all duration-200"
                style={{
                  boxShadow: '0 4px 12px rgba(37, 99, 235, 0.4)'
                }}
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewEmployeeModal;
