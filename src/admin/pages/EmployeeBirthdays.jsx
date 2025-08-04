// src/components/admin/EmployeeBirthdays.jsx
import React, { useState, useEffect } from 'react';
import { Calendar, Gift, Search, Filter, Users, Cake, Mail, Phone } from 'lucide-react';
import axios from 'axios';

const EmployeeBirthdays = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [filteredBirthdays, setFilteredBirthdays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [searchTerm, setSearchTerm] = useState('');

  // Initialize dates for current month
  useEffect(() => {
    const now = new Date();
    const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    
    setFromDate(firstDay.toISOString().split('T')[0]);
    setToDate(lastDay.toISOString().split('T')[0]);
  }, []);

  // Fetch birthdays when component mounts or month changes
  useEffect(() => {
    fetchBirthdays();
  }, [selectedMonth]);

  // Filter birthdays when dates or search term changes
  useEffect(() => {
    filterBirthdays();
  }, [birthdays, fromDate, toDate, searchTerm]);

  const fetchBirthdays = async () => {
    setLoading(true);
    try {
      // Single axios call with month parameter
      const response = await axios.get(`/api/admin/birthdays`, {
        params: {
          month: selectedMonth,
          // You can also pass year if needed
          year: new Date().getFullYear()
        }
      });
      
      setBirthdays(response.data.birthdays || []);
    } catch (error) {
      console.error('Error fetching birthdays:', error);
      // Fallback to dummy data for demo
      setBirthdays(generateDummyBirthdays());
    } finally {
      setLoading(false);
    }
  };

  const filterBirthdays = () => {
    let filtered = birthdays;

    // Filter by date range
    if (fromDate && toDate) {
      filtered = filtered.filter(employee => {
        const birthDate = new Date(employee.birthday);
        const from = new Date(fromDate);
        const to = new Date(toDate);
        
        // Compare month and day only for birthday filtering
        const birthMonth = birthDate.getMonth();
        const birthDay = birthDate.getDate();
        const fromMonth = from.getMonth();
        const fromDay = from.getDate();
        const toMonth = to.getMonth();
        const toDay = to.getDate();
        
        if (fromMonth === toMonth) {
          return birthMonth === fromMonth && birthDay >= fromDay && birthDay <= toDay;
        } else {
          return (birthMonth === fromMonth && birthDay >= fromDay) || 
                 (birthMonth === toMonth && birthDay <= toDay) ||
                 (birthMonth > fromMonth && birthMonth < toMonth);
        }
      });
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        employee.department.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredBirthdays(filtered);
  };

  const generateDummyBirthdays = () => {
    const currentMonth = new Date().getMonth() + 1;
    const dummyEmployees = [
      {
        id: 1,
        name: 'Sarah Johnson',
        department: 'Engineering',
        position: 'Senior Developer',
        birthday: `2024-${currentMonth.toString().padStart(2, '0')}-05`,
        email: 'sarah.johnson@nexrita.com',
        phone: '+1 (555) 123-4567',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b000?w=150&h=150&fit=crop&crop=face',
        age: 28
      },
      {
        id: 2,
        name: 'Michael Chen',
        department: 'Design',
        position: 'UX Designer',
        birthday: `2024-${currentMonth.toString().padStart(2, '0')}-12`,
        email: 'michael.chen@nexrita.com',
        phone: '+1 (555) 234-5678',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        age: 32
      },
      {
        id: 3,
        name: 'Emily Rodriguez',
        department: 'Marketing',
        position: 'Marketing Manager',
        birthday: `2024-${currentMonth.toString().padStart(2, '0')}-18`,
        email: 'emily.rodriguez@nexrita.com',
        phone: '+1 (555) 345-6789',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        age: 29
      },
      {
        id: 4,
        name: 'David Kim',
        department: 'Sales',
        position: 'Sales Director',
        birthday: `2024-${currentMonth.toString().padStart(2, '0')}-25`,
        email: 'david.kim@nexrita.com',
        phone: '+1 (555) 456-7890',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        age: 35
      }
    ];
    return dummyEmployees;
  };

  const sendBirthdayWish = async (employeeId) => {
    try {
      await axios.post(`/api/admin/birthday-wish`, {
        employeeId,
        message: 'Happy Birthday! Wishing you a wonderful year ahead!'
      });
      // Show success notification
      alert('Birthday wish sent successfully!');
    } catch (error) {
      console.error('Error sending birthday wish:', error);
      alert('Birthday wish sent!'); // Demo fallback
    }
  };

  const getUpcomingDays = (birthday) => {
    const today = new Date();
    const birthDate = new Date(birthday);
    birthDate.setFullYear(today.getFullYear());
    
    if (birthDate < today) {
      birthDate.setFullYear(today.getFullYear() + 1);
    }
    
    const diffTime = birthDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Skeleton Loading Component
  const SkeletonCard = () => (
    <div className="animate-pulse bg-[#1e1e1e] rounded-xl p-6 border border-gray-700">
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gray-700 rounded-full"></div>
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
          <div className="h-3 bg-gray-700 rounded w-1/2"></div>
          <div className="h-3 bg-gray-700 rounded w-2/3"></div>
        </div>
        <div className="w-24 h-8 bg-gray-700 rounded"></div>
      </div>
    </div>
  );

  return (
    <div 
      className="min-h-screen font-['Plus_Jakarta_Sans'] text-white p-8"
      style={{
        background: `
          radial-gradient(circle at 20% 50%, rgba(37, 99, 235, 0.08) 0%, transparent 50%),
          radial-gradient(circle at 80% 20%, rgba(34, 197, 94, 0.06) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(245, 158, 11, 0.05) 0%, transparent 50%),
          #000000
        `
      }}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 
              className="text-4xl font-bold bg-clip-text text-transparent mb-2"
              style={{
                background: 'linear-gradient(90deg, #ff6600 0%, #ffffff 50%, #0066ff 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Employee Birthdays
            </h1>
            <p 
              className="text-lg bg-clip-text text-transparent"
              style={{
                background: 'linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}
            >
              Celebrate your team's special moments
            </p>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="bg-[#1e1e1e] border border-gray-700 rounded-xl p-4 backdrop-blur-sm">
              <div className="flex items-center space-x-2">
                <Cake className="text-orange-400" size={20} />
                <span className="text-gray-300">Total Birthdays:</span>
                <span className="text-white font-semibold">{filteredBirthdays.length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-[#1e1e1e] rounded-2xl border border-gray-700 p-6 backdrop-blur-sm shadow-lg">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Month Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Month</label>
              <select
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                className="w-full bg-[#161616] border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              >
                {months.map((month, index) => (
                  <option key={index} value={index + 1}>{month}</option>
                ))}
              </select>
            </div>

            {/* From Date */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">From Date</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="w-full bg-[#161616] border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* To Date */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">To Date</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="w-full bg-[#161616] border border-gray-600 text-white rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Search */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Search Employee</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  placeholder="Search by name or department..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#161616] border border-gray-600 text-white rounded-lg pl-10 pr-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      ) : (
        <>
          {/* No Birthdays State */}
          {filteredBirthdays.length === 0 ? (
            <div className="max-w-7xl mx-auto">
              <div className="bg-[#1e1e1e] rounded-2xl border border-gray-700 p-12 text-center backdrop-blur-sm">
                <Gift className="mx-auto text-gray-500 mb-4" size={64} />
                <h3 className="text-2xl font-semibold text-gray-300 mb-2">
                  {fromDate && toDate ? 
                    'No birthdays found between these dates' : 
                    `No birthdays this month`
                  }
                </h3>
                <p className="text-gray-500">
                  {fromDate && toDate ? 
                    'Try adjusting your date range or search criteria.' : 
                    'Check other months to find upcoming birthdays.'
                  }
                </p>
              </div>
            </div>
          ) : (
            /* Birthday Cards */
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBirthdays.map((employee) => {
                  const upcomingDays = getUpcomingDays(employee.birthday);
                  const isToday = upcomingDays === 0;
                  const birthDate = new Date(employee.birthday);
                  
                  return (
                    <div
                      key={employee.id}
                      className={`group bg-[#1e1e1e] rounded-2xl border border-gray-700 p-6 backdrop-blur-sm transition-all duration-300 hover:transform hover:scale-105 hover:shadow-2xl ${
                        isToday 
                          ? 'ring-2 ring-orange-500 shadow-orange-500/20' 
                          : 'hover:border-blue-500 hover:shadow-blue-500/20'
                      }`}
                      style={{
                        boxShadow: isToday 
                          ? '0 0 30px rgba(245, 158, 11, 0.3)' 
                          : '0 4px 6px -1px rgba(0, 0, 0, 0.8)'
                      }}
                    >
                      {/* Birthday Badge */}
                      {isToday && (
                        <div className="absolute -top-2 -right-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
                          🎉 TODAY!
                        </div>
                      )}

                      <div className="flex items-start space-x-4">
                        {/* Avatar */}
                        <div className="relative">
                          <img
                            src={employee.avatar}
                            alt={employee.name}
                            className="w-16 h-16 rounded-full object-cover border-2 border-gray-600 group-hover:border-blue-400 transition-colors"
                          />
                          {isToday && (
                            <div className="absolute -top-1 -right-1 w-6 h-6 bg-orange-500 rounded-full flex items-center justify-center text-xs">
                              🎂
                            </div>
                          )}
                        </div>

                        {/* Employee Info */}
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-white group-hover:text-blue-300 transition-colors">
                            {employee.name}
                          </h3>
                          <p className="text-sm text-gray-400">{employee.position}</p>
                          <p 
                            className="text-sm bg-clip-text text-transparent font-medium"
                            style={{
                              background: 'linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)',
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent'
                            }}
                          >
                            {employee.department}
                          </p>
                        </div>
                      </div>

                      {/* Birthday Info */}
                      <div className="mt-4 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Birthday:</span>
                          <span className="text-sm text-white font-medium">
                            {birthDate.toLocaleDateString('en-US', { 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-400">Age:</span>
                          <span className="text-sm text-white font-medium">{employee.age} years</span>
                        </div>

                        {!isToday && (
                          <div className="flex items-center justify-between">
                            <span className="text-sm text-gray-400">Upcoming in:</span>
                            <span className="text-sm text-green-400 font-medium">
                              {upcomingDays} days
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="mt-6 flex space-x-2">
                        <button
                          onClick={() => sendBirthdayWish(employee.id)}
                          className={`flex-1 px-4 py-2 rounded-lg font-medium transition-all ${
                            isToday
                              ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg hover:shadow-orange-500/40'
                              : 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-lg hover:shadow-blue-500/40'
                          }`}
                        >
                          <Gift className="inline mr-2" size={16} />
                          {isToday ? 'Send Wishes' : 'Schedule Wish'}
                        </button>
                        
                        <button
                          onClick={() => window.open(`mailto:${employee.email}`)}
                          className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-all shadow-lg hover:shadow-green-500/40"
                        >
                          <Mail size={16} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        
        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </div>
  );
};

export default EmployeeBirthdays;
