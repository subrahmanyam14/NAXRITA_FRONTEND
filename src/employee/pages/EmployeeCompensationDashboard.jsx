import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  Calendar, 
  Award, 
  PieChart, 
  BarChart3,
  Target,
  Clock,
  Gift,
  Shield,
  Heart,
  Briefcase,
  Star,
  ChevronRight,
  Eye,
  EyeOff
} from 'lucide-react';

export default function EmployeeCompensationDashboard() {
  const [showSalary, setShowSalary] = useState(true);
  
  const compensationData = {
    employee: {
      name: "Sarah Johnson",
      id: "EMP-2024-0157",
      department: "Product Engineering",
      position: "Senior Software Engineer",
      startDate: "March 15, 2022",
      nextReview: "March 15, 2025"
    },
    salary: {
      base: 125000,
      currency: "USD",
      frequency: "Annual"
    },
    totalCompensation: 168500,
    bonuses: {
      performance: 15000,
      annual: 12000,
      spot: 3500
    },
    benefits: {
      health: 8400,
      dental: 1200,
      vision: 600,
      retirement401k: 7500,
      lifeInsurance: 2400
    },
    equity: {
      stockOptions: 2500,
      rsuValue: 25000,
      vestingSchedule: "4 years, 25% annually"
    },
    timeOff: {
      vacation: 20,
      sick: 10,
      personal: 5,
      used: {
        vacation: 8,
        sick: 2,
        personal: 1
      }
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-white rounded-2xl shadow-lg border border-slate-200 p-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-slate-900">{compensationData.employee.name}</h1>
                  <p className="text-sm font-normal text-slate-500">{compensationData.employee.id}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full font-medium">
                  {compensationData.employee.position}
                </span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-medium">
                  {compensationData.employee.department}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="text-center sm:text-right">
                <p className="text-xs font-light text-slate-400 uppercase tracking-wider">Total Compensation</p>
                <p className="text-4xl font-bold text-emerald-600">
                  {formatCurrency(compensationData.totalCompensation)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Compensation Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Base Salary */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-blue-600" />
              </div>
              <button 
                onClick={() => setShowSalary(!showSalary)}
                className="p-1 hover:bg-slate-100 rounded"
              >
                {showSalary ? <Eye className="w-4 h-4 text-slate-400" /> : <EyeOff className="w-4 h-4 text-slate-400" />}
              </button>
            </div>
            <h3 className="text-sm font-medium text-slate-600 mb-2">Base Salary</h3>
            <p className="text-2xl font-bold text-slate-900">
              {showSalary ? formatCurrency(compensationData.salary.base) : '••••••'}
            </p>
            <p className="text-xs font-light text-slate-400 mt-1">{compensationData.salary.frequency}</p>
          </div>

          {/* Total Bonuses */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-emerald-100 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-emerald-600" />
              </div>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
            </div>
            <h3 className="text-sm font-medium text-slate-600 mb-2">Total Bonuses</h3>
            <p className="text-2xl font-bold text-slate-900">
              {formatCurrency(compensationData.bonuses.performance + compensationData.bonuses.annual + compensationData.bonuses.spot)}
            </p>
            <p className="text-xs font-light text-emerald-600 mt-1">↗ +12% vs last year</p>
          </div>

          {/* Benefits Value */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-purple-600" />
              </div>
              <Star className="w-4 h-4 text-yellow-400 fill-current" />
            </div>
            <h3 className="text-sm font-medium text-slate-600 mb-2">Benefits Value</h3>
            <p className="text-2xl font-bold text-slate-900">
              {formatCurrency(Object.values(compensationData.benefits).reduce((a, b) => a + b, 0))}
            </p>
            <p className="text-xs font-light text-slate-400 mt-1">Annual equivalent</p>
          </div>

          {/* Equity Value */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 hover:shadow-lg transition-shadow duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-orange-600" />
              </div>
              <div className="flex space-x-1">
                <div className="w-1 h-4 bg-orange-300 rounded-full"></div>
                <div className="w-1 h-6 bg-orange-400 rounded-full"></div>
                <div className="w-1 h-5 bg-orange-500 rounded-full"></div>
              </div>
            </div>
            <h3 className="text-sm font-medium text-slate-600 mb-2">Equity Value</h3>
            <p className="text-2xl font-bold text-slate-900">
              {formatCurrency(compensationData.equity.rsuValue)}
            </p>
            <p className="text-xs font-light text-slate-400 mt-1">Current market value</p>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Bonus Breakdown */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                <Gift className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Bonus Breakdown</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-emerald-400 rounded-full"></div>
                  <span className="font-medium text-slate-700">Performance Bonus</span>
                </div>
                <span className="font-bold text-slate-900">{formatCurrency(compensationData.bonuses.performance)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-blue-400 rounded-full"></div>
                  <span className="font-medium text-slate-700">Annual Bonus</span>
                </div>
                <span className="font-bold text-slate-900">{formatCurrency(compensationData.bonuses.annual)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-purple-400 rounded-full"></div>
                  <span className="font-medium text-slate-700">Spot Awards</span>
                </div>
                <span className="font-bold text-slate-900">{formatCurrency(compensationData.bonuses.spot)}</span>
              </div>
              
              <div className="border-t pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Total Bonuses</span>
                  <span className="text-xl font-bold text-emerald-600">
                    {formatCurrency(compensationData.bonuses.performance + compensationData.bonuses.annual + compensationData.bonuses.spot)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Overview */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Benefits Package</h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
                  <Shield className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-600">Health Insurance</p>
                  <p className="text-lg font-bold text-slate-900">{formatCurrency(compensationData.benefits.health)}</p>
                </div>
                
                <div className="text-center p-4 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg">
                  <PieChart className="w-6 h-6 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-slate-600">401(k) Match</p>
                  <p className="text-lg font-bold text-slate-900">{formatCurrency(compensationData.benefits.retirement401k)}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-600">Dental Coverage</span>
                  <span className="font-bold text-slate-900">{formatCurrency(compensationData.benefits.dental)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-600">Vision Coverage</span>
                  <span className="font-bold text-slate-900">{formatCurrency(compensationData.benefits.vision)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-slate-600">Life Insurance</span>
                  <span className="font-bold text-slate-900">{formatCurrency(compensationData.benefits.lifeInsurance)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Time Off & Review Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Time Off Balance */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-cyan-600 rounded-lg flex items-center justify-center">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Time Off Balance</h2>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-slate-700">Vacation Days</span>
                    <span className="text-sm font-light text-slate-500">
                      {compensationData.timeOff.vacation - compensationData.timeOff.used.vacation} of {compensationData.timeOff.vacation} remaining
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-blue-400 to-blue-600 h-2 rounded-full transition-all duration-300"
                      style={{width: `${((compensationData.timeOff.vacation - compensationData.timeOff.used.vacation) / compensationData.timeOff.vacation) * 100}%`}}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-slate-700">Sick Days</span>
                    <span className="text-sm font-light text-slate-500">
                      {compensationData.timeOff.sick - compensationData.timeOff.used.sick} of {compensationData.timeOff.sick} remaining
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2 rounded-full transition-all duration-300"
                      style={{width: `${((compensationData.timeOff.sick - compensationData.timeOff.used.sick) / compensationData.timeOff.sick) * 100}%`}}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-slate-700">Personal Days</span>
                    <span className="text-sm font-light text-slate-500">
                      {compensationData.timeOff.personal - compensationData.timeOff.used.personal} of {compensationData.timeOff.personal} remaining
                    </span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-purple-400 to-purple-600 h-2 rounded-full transition-all duration-300"
                      style={{width: `${((compensationData.timeOff.personal - compensationData.timeOff.used.personal) / compensationData.timeOff.personal) * 100}%`}}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Review Timeline */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-bold text-slate-900">Career Timeline</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-slate-700">Start Date</p>
                  <p className="text-sm font-light text-slate-500">{compensationData.employee.startDate}</p>
                </div>
                <Target className="w-5 h-5 text-blue-600" />
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
                <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <p className="font-medium text-slate-700">Next Review</p>
                  <p className="text-sm font-light text-slate-500">{compensationData.employee.nextReview}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-emerald-600" />
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-slate-700">Equity Vesting</p>
                  <p className="text-sm font-light text-slate-500">{compensationData.equity.vestingSchedule}</p>
                </div>
                <BarChart3 className="w-5 h-5 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-slate-800 to-slate-900 rounded-xl shadow-lg p-8 text-center">
          <p className="text-slate-300 font-light text-sm">
            Your compensation data is confidential and updated quarterly. 
            For questions, contact <span className="font-medium text-white">HR@company.com</span>
          </p>
          <div className="flex justify-center space-x-8 mt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-white">3.2</p>
              <p className="text-xs font-light text-slate-400 uppercase tracking-wider">Years with us</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-emerald-400">A+</p>
              <p className="text-xs font-light text-slate-400 uppercase tracking-wider">Performance Rating</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-400">95%</p>
              <p className="text-xs font-light text-slate-400 uppercase tracking-wider">Market Percentile</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}