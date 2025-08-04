import React, { useState, useEffect } from 'react';
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
  EyeOff,
  ChevronLeft
} from 'lucide-react';

// Cosmic Background Component
const CosmicBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Starfield */}
      <div className="absolute inset-0">
        {[...Array(150)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: ['1px', '2px', '3px'][Math.floor(Math.random() * 3)],
              height: ['1px', '2px', '3px'][Math.floor(Math.random() * 3)],
              backgroundColor: ['#ffffff', '#2563eb', '#a3a3a3', '#6b7280'][Math.floor(Math.random() * 4)],
              animationDelay: `${Math.random() * 3}s`,
              opacity: Math.random() * 0.6 + 0.2
            }}
          />
        ))}
      </div>
      
      {/* Floating Sparkles */}
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 rounded-full animate-bounce"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: ['#2563eb', '#22c55e', '#f59e0b', '#ffffff'][Math.floor(Math.random() * 4)],
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${3 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
      
      {/* Animated Dots with Connection Lines */}
      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: ['1px', '2px', '3px'][Math.floor(Math.random() * 3)],
              height: ['1px', '2px', '3px'][Math.floor(Math.random() * 3)],
              backgroundColor: ['rgba(37, 99, 235, 0.3)', 'rgba(163, 163, 163, 0.2)', 'rgba(107, 114, 128, 0.1)'][Math.floor(Math.random() * 3)],
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: '4s'
            }}
          />
        ))}
      </div>
    </div>
  );
};

// Carousel Component
const CompensationCarousel = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => 
        prevIndex === items.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [items.length, isAutoPlaying]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  const goToPrevious = () => {
    setCurrentIndex(currentIndex === 0 ? items.length - 1 : currentIndex - 1);
  };

  const goToNext = () => {
    setCurrentIndex(currentIndex === items.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div 
      className="relative bg-[#1e1e1e] backdrop-blur-[10px] rounded-[12px] p-6 border border-[#2a2a2a] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.8)]"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {/* Carousel Content */}
      <div className="overflow-hidden rounded-lg">
        <div 
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {items.map((item, index) => (
            <div key={index} className="w-full flex-shrink-0">
              {item}
            </div>
          ))}
        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={goToPrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-[#2563eb] hover:bg-[#1d4ed8] rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
      >
        <ChevronLeft className="w-5 h-5 text-white" />
      </button>
      
      <button
        onClick={goToNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-[#2563eb] hover:bg-[#1d4ed8] rounded-full flex items-center justify-center transition-all duration-300 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
      >
        <ChevronRight className="w-5 h-5 text-white" />
      </button>

      {/* Indicators */}
      <div className="flex justify-center space-x-2 mt-4">
        {items.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'bg-[#2563eb] shadow-[0_0_10px_rgba(37,99,235,0.5)]' 
                : 'bg-[#404040] hover:bg-[#606060]'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

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

  // Carousel items for announcements
  const carouselItems = [
    (
      <div className="p-6 text-center">
        <Gift className="w-8 h-8 text-[#2563eb] mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-[#ffffff] mb-2">Q4 Performance Bonuses</h3>
        <p className="text-[#a3a3a3] text-sm">Congratulations on exceeding your performance targets! Bonuses will be processed in the next payroll.</p>
      </div>
    ),
    (
      <div className="p-6 text-center">
        <Award className="w-8 h-8 text-[#22c55e] mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-[#ffffff] mb-2">Employee Recognition</h3>
        <p className="text-[#a3a3a3] text-sm">You've been nominated for the Innovation Excellence Award. Results will be announced next week.</p>
      </div>
    ),
    (
      <div className="p-6 text-center">
        <Calendar className="w-8 h-8 text-[#f59e0b] mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-[#ffffff] mb-2">Upcoming Review</h3>
        <p className="text-[#a3a3a3] text-sm">Your annual performance review is scheduled for March 15, 2025. Prepare your self-assessment.</p>
      </div>
    )
  ];

  return (
    <div 
      className="min-h-screen bg-[#0a0a0a] relative"
      style={{ fontFamily: "'Plus Jakarta Sans', system-ui, -apple-system, sans-serif" }}
    >
      {/* <CosmicBackground /> */}
      
      <div className="relative z-10 p-8 max-w-[1440px] mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="bg-[#1e1e1e] backdrop-blur-[10px] rounded-[12px] border border-[#2a2a2a] p-8 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.8)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.9)] hover:border-[#404040] transition-all duration-300">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] rounded-xl flex items-center justify-center shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                  <Briefcase className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-[#ffffff]">{compensationData.employee.name}</h1>
                  <p className="text-sm font-normal text-[#a3a3a3]">{compensationData.employee.id}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 text-sm">
                <span className="px-3 py-1 bg-[#2563eb] bg-opacity-20 text-[#2563eb] rounded-full font-medium border border-[#2563eb] border-opacity-30">
                  {compensationData.employee.position}
                </span>
                <span className="px-3 py-1 bg-[#22c55e] bg-opacity-20 text-[#22c55e] rounded-full font-medium border border-[#22c55e] border-opacity-30">
                  {compensationData.employee.department}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="text-center sm:text-right">
                <p className="text-xs font-light text-[#6b7280] uppercase tracking-wider">Total Compensation</p>
                <p className="text-4xl font-bold text-[#22c55e]">
                  {formatCurrency(compensationData.totalCompensation)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Announcements Carousel */}
        <div>
          <h2 className="text-2xl font-bold text-[#ffffff] mb-6 flex items-center gap-3">
            <Star className="w-6 h-6 text-[#2563eb]" />
            Company Announcements
          </h2>
          <CompensationCarousel items={carouselItems} />
        </div>

        {/* Compensation Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Base Salary */}
          <div className="bg-[#1e1e1e] backdrop-blur-[10px] rounded-[12px] border border-[#2a2a2a] p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.8)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.9)] hover:border-[#404040] hover:transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-[#2563eb] bg-opacity-20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-[#2563eb]" />
              </div>
              <button 
                onClick={() => setShowSalary(!showSalary)}
                className="p-1 hover:bg-[#161616] rounded transition-colors duration-200"
              >
                {showSalary ? <Eye className="w-4 h-4 text-[#a3a3a3]" /> : <EyeOff className="w-4 h-4 text-[#a3a3a3]" />}
              </button>
            </div>
            <h3 className="text-sm font-medium text-[#a3a3a3] mb-2">Base Salary</h3>
            <p className="text-2xl font-bold text-[#ffffff]">
              {showSalary ? formatCurrency(compensationData.salary.base) : '••••••'}
            </p>
            <p className="text-xs font-light text-[#6b7280] mt-1">{compensationData.salary.frequency}</p>
          </div>

          {/* Total Bonuses */}
          <div className="bg-[#1e1e1e] backdrop-blur-[10px] rounded-[12px] border border-[#2a2a2a] p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.8)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.9)] hover:border-[#404040] hover:transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-[#22c55e] bg-opacity-20 rounded-lg flex items-center justify-center">
                <Award className="w-5 h-5 text-[#22c55e]" />
              </div>
              <div className="w-2 h-2 bg-[#22c55e] rounded-full animate-pulse"></div>
            </div>
            <h3 className="text-sm font-medium text-[#a3a3a3] mb-2">Total Bonuses</h3>
            <p className="text-2xl font-bold text-[#ffffff]">
              {formatCurrency(compensationData.bonuses.performance + compensationData.bonuses.annual + compensationData.bonuses.spot)}
            </p>
            <p className="text-xs font-light text-[#22c55e] mt-1">↗ +12% vs last year</p>
          </div>

          {/* Benefits Value */}
          <div className="bg-[#1e1e1e] backdrop-blur-[10px] rounded-[12px] border border-[#2a2a2a] p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.8)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.9)] hover:border-[#404040] hover:transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-[#8b5cf6] bg-opacity-20 rounded-lg flex items-center justify-center">
                <Shield className="w-5 h-5 text-[#8b5cf6]" />
              </div>
              <Star className="w-4 h-4 text-[#f59e0b] fill-current" />
            </div>
            <h3 className="text-sm font-medium text-[#a3a3a3] mb-2">Benefits Value</h3>
            <p className="text-2xl font-bold text-[#ffffff]">
              {formatCurrency(Object.values(compensationData.benefits).reduce((a, b) => a + b, 0))}
            </p>
            <p className="text-xs font-light text-[#6b7280] mt-1">Annual equivalent</p>
          </div>

          {/* Equity Value */}
          <div className="bg-[#1e1e1e] backdrop-blur-[10px] rounded-[12px] border border-[#2a2a2a] p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.8)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.9)] hover:border-[#404040] hover:transform hover:-translate-y-1 transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 bg-[#f59e0b] bg-opacity-20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-[#f59e0b]" />
              </div>
              <div className="flex space-x-1">
                <div className="w-1 h-4 bg-[#f59e0b] bg-opacity-60 rounded-full"></div>
                <div className="w-1 h-6 bg-[#f59e0b] bg-opacity-80 rounded-full"></div>
                <div className="w-1 h-5 bg-[#f59e0b] rounded-full"></div>
              </div>
            </div>
            <h3 className="text-sm font-medium text-[#a3a3a3] mb-2">Equity Value</h3>
            <p className="text-2xl font-bold text-[#ffffff]">
              {formatCurrency(compensationData.equity.rsuValue)}
            </p>
            <p className="text-xs font-light text-[#6b7280] mt-1">Current market value</p>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Bonus Breakdown */}
          <div className="bg-[#1e1e1e] backdrop-blur-[10px] rounded-[12px] border border-[#2a2a2a] p-8 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.8)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.9)] hover:border-[#404040] transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-[#22c55e] to-[#16a34a] rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                <Gift className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-bold text-[#ffffff]">Bonus Breakdown</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#22c55e] rounded-full"></div>
                  <span className="font-medium text-[#a3a3a3]">Performance Bonus</span>
                </div>
                <span className="font-bold text-[#ffffff]">{formatCurrency(compensationData.bonuses.performance)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#2563eb] rounded-full"></div>
                  <span className="font-medium text-[#a3a3a3]">Annual Bonus</span>
                </div>
                <span className="font-bold text-[#ffffff]">{formatCurrency(compensationData.bonuses.annual)}</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-[#8b5cf6] rounded-full"></div>
                  <span className="font-medium text-[#a3a3a3]">Spot Awards</span>
                </div>
                <span className="font-bold text-[#ffffff]">{formatCurrency(compensationData.bonuses.spot)}</span>
              </div>
              
              <div className="border-t border-[#2a2a2a] pt-4">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-[#ffffff]">Total Bonuses</span>
                  <span className="text-xl font-bold text-[#22c55e]">
                    {formatCurrency(compensationData.bonuses.performance + compensationData.bonuses.annual + compensationData.bonuses.spot)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Overview */}
          <div className="bg-[#1e1e1e] backdrop-blur-[10px] rounded-[12px] border border-[#2a2a2a] p-8 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.8)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.9)] hover:border-[#404040] transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                <Heart className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-bold text-[#ffffff]">Benefits Package</h2>
            </div>
            
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-[#2563eb] bg-opacity-10 rounded-lg border border-[#2563eb] border-opacity-20">
                  <Shield className="w-6 h-6 text-[#2563eb] mx-auto mb-2" />
                  <p className="text-sm font-medium text-[#a3a3a3]">Health Insurance</p>
                  <p className="text-lg font-bold text-[#ffffff]">{formatCurrency(compensationData.benefits.health)}</p>
                </div>
                
                <div className="text-center p-4 bg-[#22c55e] bg-opacity-10 rounded-lg border border-[#22c55e] border-opacity-20">
                  <PieChart className="w-6 h-6 text-[#22c55e] mx-auto mb-2" />
                  <p className="text-sm font-medium text-[#a3a3a3]">401(k) Match</p>
                  <p className="text-lg font-bold text-[#ffffff]">{formatCurrency(compensationData.benefits.retirement401k)}</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-[#a3a3a3]">Dental Coverage</span>
                  <span className="font-bold text-[#ffffff]">{formatCurrency(compensationData.benefits.dental)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-[#a3a3a3]">Vision Coverage</span>
                  <span className="font-bold text-[#ffffff]">{formatCurrency(compensationData.benefits.vision)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm font-medium text-[#a3a3a3]">Life Insurance</span>
                  <span className="font-bold text-[#ffffff]">{formatCurrency(compensationData.benefits.lifeInsurance)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Time Off & Review Timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Time Off Balance */}
          <div className="bg-[#1e1e1e] backdrop-blur-[10px] rounded-[12px] border border-[#2a2a2a] p-8 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.8)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.9)] hover:border-[#404040] transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-[#06b6d4] to-[#0891b2] rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(6,182,212,0.3)]">
                <Calendar className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-bold text-[#ffffff]">Time Off Balance</h2>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-[#a3a3a3]">Vacation Days</span>
                    <span className="text-sm font-light text-[#6b7280]">
                      {compensationData.timeOff.vacation - compensationData.timeOff.used.vacation} of {compensationData.timeOff.vacation} remaining
                    </span>
                  </div>
                  <div className="w-full bg-[#404040] rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] h-2 rounded-full transition-all duration-300"
                      style={{width: `${((compensationData.timeOff.vacation - compensationData.timeOff.used.vacation) / compensationData.timeOff.vacation) * 100}%`}}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-[#a3a3a3]">Sick Days</span>
                    <span className="text-sm font-light text-[#6b7280]">
                      {compensationData.timeOff.sick - compensationData.timeOff.used.sick} of {compensationData.timeOff.sick} remaining
                    </span>
                  </div>
                  <div className="w-full bg-[#404040] rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#22c55e] to-[#16a34a] h-2 rounded-full transition-all duration-300"
                      style={{width: `${((compensationData.timeOff.sick - compensationData.timeOff.used.sick) / compensationData.timeOff.sick) * 100}%`}}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium text-[#a3a3a3]">Personal Days</span>
                    <span className="text-sm font-light text-[#6b7280]">
                      {compensationData.timeOff.personal - compensationData.timeOff.used.personal} of {compensationData.timeOff.personal} remaining
                    </span>
                  </div>
                  <div className="w-full bg-[#404040] rounded-full h-2">
                    <div 
                      className="bg-gradient-to-r from-[#8b5cf6] to-[#7c3aed] h-2 rounded-full transition-all duration-300"
                      style={{width: `${((compensationData.timeOff.personal - compensationData.timeOff.used.personal) / compensationData.timeOff.personal) * 100}%`}}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Review Timeline */}
          <div className="bg-[#1e1e1e] backdrop-blur-[10px] rounded-[12px] border border-[#2a2a2a] p-8 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.8)] hover:shadow-[0_10px_25px_rgba(0,0,0,0.9)] hover:border-[#404040] transition-all duration-300">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-r from-[#f59e0b] to-[#d97706] rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(245,158,11,0.3)]">
                <Clock className="w-4 h-4 text-white" />
              </div>
              <h2 className="text-xl font-bold text-[#ffffff]">Career Timeline</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4 p-4 bg-[#2563eb] bg-opacity-10 rounded-lg border border-[#2563eb] border-opacity-20">
                <div className="w-3 h-3 bg-[#2563eb] rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-[#a3a3a3]">Start Date</p>
                  <p className="text-sm font-light text-[#6b7280]">{compensationData.employee.startDate}</p>
                </div>
                <Target className="w-5 h-5 text-[#2563eb]" />
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-[#22c55e] bg-opacity-10 rounded-lg border border-[#22c55e] border-opacity-20">
                <div className="w-3 h-3 bg-[#22c55e] rounded-full animate-pulse"></div>
                <div className="flex-1">
                  <p className="font-medium text-[#a3a3a3]">Next Review</p>
                  <p className="text-sm font-light text-[#6b7280]">{compensationData.employee.nextReview}</p>
                </div>
                <ChevronRight className="w-5 h-5 text-[#22c55e]" />
              </div>
              
              <div className="flex items-center gap-4 p-4 bg-[#8b5cf6] bg-opacity-10 rounded-lg border border-[#8b5cf6] border-opacity-20">
                <div className="w-3 h-3 bg-[#8b5cf6] rounded-full"></div>
                <div className="flex-1">
                  <p className="font-medium text-[#a3a3a3]">Equity Vesting</p>
                  <p className="text-sm font-light text-[#6b7280]">{compensationData.equity.vestingSchedule}</p>
                </div>
                <BarChart3 className="w-5 h-5 text-[#8b5cf6]" />
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-gradient-to-r from-[#111111] to-[#1a1a1a] rounded-xl shadow-[0_10px_15px_-3px_rgba(0,0,0,0.8)] p-8 text-center border border-[#2a2a2a]">
          <p className="text-[#a3a3a3] font-light text-sm">
            Your compensation data is confidential and updated quarterly. 
            For questions, contact <span className="font-medium text-[#ffffff]">HR@naxrita.com</span>
          </p>
          <div className="flex justify-center space-x-8 mt-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-[#ffffff]">3.2</p>
              <p className="text-xs font-light text-[#6b7280] uppercase tracking-wider">Years with us</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#22c55e]">A+</p>
              <p className="text-xs font-light text-[#6b7280] uppercase tracking-wider">Performance Rating</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-[#2563eb]">95%</p>
              <p className="text-xs font-light text-[#6b7280] uppercase tracking-wider">Market Percentile</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
