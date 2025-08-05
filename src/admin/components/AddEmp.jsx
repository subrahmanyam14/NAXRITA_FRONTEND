import React, { useRef, useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaTimes, FaPlus, FaUpload } from 'react-icons/fa';
import { createPortal } from 'react-dom';
const AddEmployee = () => {
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState('/assets/profile.png');
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [file, setFile] = useState(null);
  const [employeeData, setEmployeeData] = useState({
    EmployeeID: '',
    FullName: '',
    EmailAddress: '',
    Gender: '',
    DateOfBirth: '',
    ContactNumber: '',
    DeptID: '',
    HireDate: '',
    JoiningDate: '',
    EmploymentType: 'Permanent',
    SecondaryContact: '',
    Address: '',
    Graduation: '',
    TotalExperience: '',
    DOJ: '',
    DeptName: '',
    JobTitle: '',
    ProfilePhoto: '',
    Skill1: '',
    Skill2: '',
    Skill3: ''
  });

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
    setImageSrc('/assets/profile.png');
    setEmployeeData({
      EmployeeID: '',
      FullName: '',
      EmailAddress: '',
      Gender: '',
      DateOfBirth: '',
      DOJ: '',
      DeptName: '',
      DeptID: '',
      HireDate: '',
      JoiningDate: '',
      EmploymentType: 'Permanent',
      ContactNumber: '',
      SecondaryContact: '',
      TotalExperience: '',
      JobTitle: '',
      ProfilePhoto: '',
      Address: '',
      Graduation: '',
      Skill1: '',
      Skill2: '',
      Skill3: ''
    });
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', 'ml_default');
      formData.append('cloud_name', 'dlo7urgnj');

      try {
        const response = await axios.post('https://api.cloudinary.com/v1_1/dlo7urgnj/image/upload', formData);
        const imageUrl = response.data.secure_url;
        setImageSrc(imageUrl);
        setEmployeeData({ ...employeeData, ProfilePhoto: imageUrl });
      } catch (error) {
        toast.error('Error uploading image. Please try again.');
        console.error('Error uploading image to Cloudinary:', error);
      }
    } else {
      setFile(file);
    }
  };

  const deptMapping = {
    "HR Department": "VTS001",
    "IT Department": "VTS003",
    "BA Department": "VTS002",
    "Management": "VTS004"
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "DeptName") {
      const deptId = deptMapping[value];
      setEmployeeData({
        ...employeeData,
        [name]: value,
        DeptID: deptId
      });
    } else if (name === "DOJ") {
      setEmployeeData({
        ...employeeData,
        [name]: value,
        JoiningDate: value
      });
    } else {
      setEmployeeData({ ...employeeData, [name]: value });
    }
  };

  const isValidFullName = (fullName) => {
    return fullName.trim().split(' ').length >= 2;
  };

  const isValidAge = (dob) => {
    const birthDate = new Date(dob);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    return age > 18;
  };

  const checkEmployeeID = async (employeeID) => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_URL}/employee/getemployeebyid/${employeeID}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      return response.data.length > 0;
    } catch (error) {
      console.error('Error checking Employee ID:', error);
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const employeeExists = await checkEmployeeID(employeeData.EmployeeID);

    if (employeeExists) {
      toast.error('Employee ID already exists. Please use a different ID.');
      return;
    }

    if (!isValidFullName(employeeData.FullName)) {
      toast.error('Full Name must contain at least two words.');
      return;
    }

    if (!isValidAge(employeeData.DateOfBirth)) {
      toast.error('Employee must be older than 18 years.');
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_URL}/employee/empReg`, employeeData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      toast.success('Employee added successfully!');
      closeForm();
    } catch (error) {
      console.error('Error adding employee:', error);
      toast.error('Error adding employee');
    }
  };

  return (
    <div>
      <button 
        onClick={openForm} 
        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg bg-clip-text text-transparent border-gray-400  transition-all duration-300 hover:scale-105"
      >
        <FaPlus />
        <span className="hidden sm:inline">Add Employee</span>
      </button>


      {isOpen && createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
   
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className={`bg-gray-900 border border-gray-700 rounded-lg w-full max-w-6xl max-h-[95vh] overflow-y-auto transition-all duration-300 ${isClosing ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}`}>
            <div className="flex justify-between items-center p-6 border-b border-gray-700 sticky top-0 bg-gray-900 z-10">
              <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Add New Employee
              </h3>
              <button 
                className="p-2 bg-red-700 hover:bg-red-600 rounded-lg transition-all duration-200" 
                onClick={closeForm}
              >
                <FaTimes className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6">
              {/* Profile Upload Section */}
              <div className="flex justify-center mb-8">
                <div className="relative">
                  <img 
                    src={imageSrc} 
                    alt="Profile" 
                    className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                  />
                  <button 
                    type="button" 
                    className="absolute bottom-0 right-0 p-2 bg-blue-600 hover:bg-blue-700 rounded-full transition-all duration-200 hover:scale-110" 
                    onClick={handleImageClick}
                  >
                    <FaUpload className="w-4 h-4" />
                  </button>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Personal Information */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h4 className="text-lg font-bold text-blue-400 mb-4 border-b border-gray-600 pb-2">
                    Personal Information
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Employee ID *</label>
                      <input
                        type="text"
                        name="EmployeeID"
                        value={employeeData.EmployeeID}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter Employee ID"
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Full Name *</label>
                      <input
                        type="text"
                        name="FullName"
                        value={employeeData.FullName}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter Full Name"
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Email Address *</label>
                      <input
                        type="email"
                        name="EmailAddress"
                        value={employeeData.EmailAddress}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter Email Address"
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Gender *</label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="Gender"
                            value="Male"
                            onChange={handleInputChange}
                            required
                            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
                          />
                          <span className="text-white">Male</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="Gender"
                            value="Female"
                            onChange={handleInputChange}
                            required
                            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
                          />
                          <span className="text-white">Female</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Date of Birth *</label>
                      <input
                        type="date"
                        name="DateOfBirth"
                        value={employeeData.DateOfBirth}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Contact Number *</label>
                      <input
                        type="tel"
                        name="ContactNumber"
                        value={employeeData.ContactNumber}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter Contact Number"
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Secondary Contact</label>
                      <input
                        type="tel"
                        name="SecondaryContact"
                        value={employeeData.SecondaryContact}
                        onChange={handleInputChange}
                        placeholder="Enter Secondary Contact"
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Address *</label>
                      <textarea
                        name="Address"
                        value={employeeData.Address}
                        onChange={handleInputChange}
                        required
                        placeholder="Enter Address"
                        rows="3"
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Employment Information */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h4 className="text-lg font-bold text-blue-400 mb-4 border-b border-gray-600 pb-2">
                    Employment Information
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Date of Joining *</label>
                      <input
                        type="date"
                        name="DOJ"
                        value={employeeData.DOJ}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Hire Date *</label>
                      <input
                        type="date"
                        name="HireDate"
                        value={employeeData.HireDate}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Employment Type *</label>
                      <select
                        name="EmploymentType"
                        value={employeeData.EmploymentType}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Permanent">Permanent</option>
                        <option value="Internship">Internship</option>
                        <option value="Contractor">Contractor</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Department *</label>
                      <select
                        name="DeptName"
                        value={employeeData.DeptName}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="" disabled>Select Department</option>
                        <option value="HR Department">HR Department</option>
                        <option value="IT Department">IT Department</option>
                        <option value="BA Department">BA Department</option>
                        <option value="Management">Management</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Job Title *</label>
                      <select
                        name="JobTitle"
                        value={employeeData.JobTitle}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="" disabled>Select Job Title</option>
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
                  </div>
                </div>

                {/* Professional Information */}
                <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                  <h4 className="text-lg font-bold text-blue-400 mb-4 border-b border-gray-600 pb-2">
                    Professional Information
                  </h4>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Graduation *</label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="Graduation"
                            value="UG"
                            onChange={handleInputChange}
                            required
                            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
                          />
                          <span className="text-white">UG</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="Graduation"
                            value="PG"
                            onChange={handleInputChange}
                            required
                            className="w-4 h-4 text-blue-600 bg-gray-700 border-gray-600 focus:ring-blue-500"
                          />
                          <span className="text-white">PG</span>
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Total Experience (Years) *</label>
                      <input
                        type="number"
                        name="TotalExperience"
                        value={employeeData.TotalExperience}
                        onChange={handleInputChange}
                        required
                        min="0"
                        placeholder="Enter Experience in Years"
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Skill 1</label>
                      <input
                        type="text"
                        name="Skill1"
                        value={employeeData.Skill1}
                        onChange={handleInputChange}
                        placeholder="Enter Primary Skill"
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Skill 2</label>
                      <input
                        type="text"
                        name="Skill2"
                        value={employeeData.Skill2}
                        onChange={handleInputChange}
                        placeholder="Enter Secondary Skill"
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-400 mb-1 uppercase tracking-wide">Skill 3</label>
                      <input
                        type="text"
                        name="Skill3"
                        value={employeeData.Skill3}
                        onChange={handleInputChange}
                        placeholder="Enter Additional Skill"
                        className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Footer */}
              <div className="flex justify-end gap-3 mt-6 pt-6 border-t border-gray-700">
                <button 
                  type="submit" 
                  className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 rounded-lg transition-all duration-300"
                >
                  Add Employee
                </button>
                <button 
                  type="button" 
                  className="px-6 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition-all duration-300" 
                  onClick={closeForm}
                >
                  Cancel
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
        toastClassName="bg-gray-900 text-white"
      />
    </div>
  );
};

export default AddEmployee;
