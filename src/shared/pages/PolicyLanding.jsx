import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// Icons
import { FiSearch as SearchIcon } from 'react-icons/fi';
import { FiFileText as DocumentTextIcon } from 'react-icons/fi';
import { FiBookOpen as BookOpenIcon } from 'react-icons/fi';
import { FiShield as ShieldCheckIcon } from 'react-icons/fi';
import { FiClock as ClockIcon } from 'react-icons/fi';
import { FiUsers as UserGroupIcon } from 'react-icons/fi';
import { FiGlobe as GlobeAltIcon } from 'react-icons/fi';
import { FiBriefcase as BriefcaseIcon } from 'react-icons/fi';
import { FiRotateCw as BeakerIcon } from 'react-icons/fi';
import { FiSettings as CogIcon } from 'react-icons/fi';
import { FiAlertTriangle as ShieldExclamationIcon } from 'react-icons/fi';
import { FiHome as BuildingOfficeIcon } from 'react-icons/fi';
import { FiDollarSign as CurrencyDollarIcon } from 'react-icons/fi';
import { FiCode as CodeBracketIcon } from 'react-icons/fi';
import { 
  FiFilter, 
  FiChevronDown, 
  FiCalendar, 
  FiTag, 
  FiStar, 
  FiClock,
  FiChevronLeft,
  FiChevronRight,
  FiPlay,
  FiPause,
  FiMail
} from 'react-icons/fi';

// Import policies data
import { policies, policyCategories, getPoliciesByCategory } from '../../data/policies';

// Add auth context or user hook
import { useAuth } from '../../contexts/AuthContext'; // Adjust path as needed

// Category icons with updated dark theme colors
const categoryIcons = {
  'key': { 
    icon: ShieldExclamationIcon, 
    gradient: 'from-red-500 to-pink-600',
    bg: 'bg-red-500/20', 
    text: 'text-red-400',
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=300&fit=crop&crop=center'
  },
  'hr': { 
    icon: UserGroupIcon, 
    gradient: 'from-blue-500 to-indigo-600',
    bg: 'bg-blue-500/20', 
    text: 'text-blue-400',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop&crop=center'
  },
  'code': { 
    icon: CodeBracketIcon, 
    gradient: 'from-purple-500 to-indigo-600',
    bg: 'bg-purple-500/20', 
    text: 'text-purple-400',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&crop=center'
  },
  'global': { 
    icon: GlobeAltIcon, 
    gradient: 'from-green-500 to-emerald-600',
    bg: 'bg-green-500/20', 
    text: 'text-green-400',
    image: 'https://images.unsplash.com/photo-1519302959554-a75be0afc82a?w=400&h=300&fit=crop&crop=center'
  },
  'india': { 
    icon: BuildingOfficeIcon, 
    gradient: 'from-orange-500 to-red-600',
    bg: 'bg-orange-500/20', 
    text: 'text-orange-400',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop&crop=center'
  },
  'it': { 
    icon: CogIcon, 
    gradient: 'from-gray-500 to-slate-600',
    bg: 'bg-gray-500/20', 
    text: 'text-gray-400',
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=300&fit=crop&crop=center'
  },
  'finance': { 
    icon: CurrencyDollarIcon, 
    gradient: 'from-yellow-500 to-orange-600',
    bg: 'bg-yellow-500/20', 
    text: 'text-yellow-400',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center'
  },
  'safety': { 
    icon: ShieldCheckIcon, 
    gradient: 'from-teal-500 to-cyan-600',
    bg: 'bg-teal-500/20', 
    text: 'text-teal-400',
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031d4c1?w=400&h=300&fit=crop&crop=center'
  },
  'operations': { 
    icon: BeakerIcon, 
    gradient: 'from-pink-500 to-rose-600',
    bg: 'bg-pink-500/20', 
    text: 'text-pink-400',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop&crop=center'
  },
  'default': { 
    icon: DocumentTextIcon, 
    gradient: 'from-gray-400 to-gray-600',
    bg: 'bg-gray-500/20', 
    text: 'text-gray-400',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop&crop=center'
  }
};

// Professional Loader Component
const PageLoader = () => (
  <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center font-jakarta relative overflow-hidden">
    {/* Cosmic Background */}
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-pulse"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: `${Math.random() * 3 + 1}px`,
            height: `${Math.random() * 3 + 1}px`,
            backgroundColor: ['#ffffff', '#2563eb', '#a3a3a3', '#6b7280'][Math.floor(Math.random() * 4)],
            animationDelay: `${Math.random() * 3}s`,
            animationDuration: `${3 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>

    <div className="text-center relative z-10">
      <div className="animate-pulse mb-6">
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] rounded-full flex items-center justify-center shadow-lg shadow-blue-500/25">
          <DocumentTextIcon className="w-12 h-12 text-white" />
        </div>
      </div>
      <h2 className="text-3xl font-bold text-white mb-4">Loading Policies</h2>
      <p className="text-[#a3a3a3] text-lg mb-8">Preparing your compliance dashboard...</p>
      <div className="w-80 h-2 bg-[#161616] rounded-full overflow-hidden mx-auto mb-6 border border-[#2a2a2a]">
        <div className="h-full bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] animate-pulse"></div>
      </div>
      <div className="flex justify-center space-x-3">
        {[0, 1, 2].map((i) => (
          <div 
            key={i}
            className="w-3 h-3 bg-[#2563eb] rounded-full animate-bounce shadow-lg shadow-blue-500/25" 
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  </div>
);

export default function PolicyLanding() {
  const { user } = useAuth(); // Get user from auth context
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [dateFilter, setDateFilter] = useState('all');
  
  // Carousel states
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Helper function to get policy link based on user role
  const getPolicyLink = (policyId) => {
    const userRole = user?.role || 'employee';
    return `/${userRole}/public/policies/${policyId}`;
  };

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Add counts to categories - Fixed the logic here
  const categories = [
    { id: 'all', name: 'All Policies' },
    ...policyCategories
  ].map(cat => ({
    ...cat,
    count: cat.id === 'all'
      ? policies.length
      : policies.filter(p => p.category === cat.id).length
  }));

  // Filter policies - Fixed the filtering logic
  const filteredPolicies = policies.filter(policy => {
    if (!policy || !policy.title) return false;

    const title = typeof policy.title === 'string' ? policy.title : '';
    const description = typeof policy.description === 'string' ? policy.description : '';

    const matchesSearch = !searchQuery ||
      title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      description.toLowerCase().includes(searchQuery.toLowerCase());

    // Fixed: Use selectedCategory instead of calling getPoliciesByCategory incorrectly
    const matchesCategory = selectedCategory === 'all' || policy.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Popular policies
  const popularPolicyIds = ['key-1001', 'global-1', 'hr-1', 'it-1'];
  const popularPolicies = popularPolicyIds
    .map(id => {
      const policy = policies.find(p => p.id === id);
      if (!policy) return null;
      return {
        ...policy,
        lastUpdated: '2 days ago',
        views: Math.floor(Math.random() * 1000) + 100
      };
    })
    .filter(Boolean);

  const hasSearchQuery = searchQuery.trim().length > 0;
  
  // Auto-scroll categories carousel
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCategoryIndex(prev => (prev + 1) % Math.max(1, Math.ceil((categories.length - 1) / 4)));
      setFeaturedIndex(prev => (prev + 1) % popularPolicies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, categories.length, popularPolicies.length]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] font-jakarta relative overflow-hidden">
      {/* Cosmic Background Effects */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Starfield */}
        <div className="absolute inset-0">
          {[...Array(150)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                backgroundColor: ['#ffffff', '#2563eb', '#a3a3a3', '#6b7280'][Math.floor(Math.random() * 4)],
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>

        {/* Floating Sparkles */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-bounce"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${6 + Math.random() * 4}s`
              }}
            >
              <div
                className="rounded-full opacity-60"
                style={{
                  width: `${Math.random() * 4 + 2}px`,
                  height: `${Math.random() * 4 + 2}px`,
                  backgroundColor: ['#2563eb', '#22c55e', '#f59e0b', '#ffffff'][Math.floor(Math.random() * 4)],
                  boxShadow: `0 0 10px currentColor`
                }}
              />
            </div>
          ))}
        </div>

        {/* Animated Dots */}
        <div className="absolute inset-0">
          {[...Array(80)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 2 + 1}px`,
                height: `${Math.random() * 2 + 1}px`,
                backgroundColor: ['rgba(37, 99, 235, 0.3)', 'rgba(163, 163, 163, 0.2)', 'rgba(107, 114, 128, 0.1)'][Math.floor(Math.random() * 3)],
                animationDelay: `${Math.random() * 4}s`,
                animationDuration: `${4 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 bg-gradient-to-br from-[#111111] to-[#0a0a0a] border-b border-[#2a2a2a]">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <img 
                src="https://naxrita.com/wp-content/uploads/2024/10/logo-t.png" 
                alt="Nexrita Logo"
                className="h-12 w-auto"
                onError={(e) => {e.target.style.display = 'none';}}
              />
              <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-6xl">
                Policy Hub
              </h1>
            </div>
            <p className="mt-6 max-w-3xl mx-auto text-xl text-[#a3a3a3] leading-relaxed">
              Your comprehensive resource for company policies, procedures, and compliance guidelines in the cosmic workspace.
            </p>
            
            {/* Enhanced Search Bar */}
            <div className="mt-12 max-w-4xl mx-auto">
              <div className="relative flex items-center bg-[#1e1e1e]/80 backdrop-blur-sm rounded-2xl shadow-2xl shadow-black/20 border border-[#2a2a2a]">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <SearchIcon className="h-6 w-6 text-[#6b7280]" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-16 pr-40 py-6 border-0 rounded-2xl text-lg text-white placeholder-[#6b7280] bg-transparent focus:outline-none focus:ring-2 focus:ring-[#2563eb]/50"
                  placeholder="Search policies, procedures, guidelines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                  className="absolute right-3 px-6 py-3 bg-[#2563eb] hover:bg-[#1d4ed8] text-white rounded-xl transition-all duration-300 flex items-center space-x-2 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                >
                  <FiFilter className="w-4 h-4" />
                  <span className="text-sm font-medium">Advanced</span>
                </button>
              </div>
              
              {/* Advanced Search Panel */}
              {showAdvancedSearch && (
                <div className="mt-6 bg-[#1e1e1e]/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 border border-[#2a2a2a]">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-[#a3a3a3] mb-3">Sort by</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-xl text-white focus:ring-2 focus:ring-[#2563eb]/50 focus:border-[#2563eb] transition-all duration-300"
                      >
                        <option value="relevance">Relevance</option>
                        <option value="date">Last Updated</option>
                        <option value="name">Name A-Z</option>
                        <option value="category">Category</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#a3a3a3] mb-3">Date Range</label>
                      <select
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-xl text-white focus:ring-2 focus:ring-[#2563eb]/50 focus:border-[#2563eb] transition-all duration-300"
                      >
                        <option value="all">All Time</option>
                        <option value="week">Last Week</option>
                        <option value="month">Last Month</option>
                        <option value="year">Last Year</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#a3a3a3] mb-3">Category</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-3 bg-[#161616] border border-[#404040] rounded-xl text-white focus:ring-2 focus:ring-[#2563eb]/50 focus:border-[#2563eb] transition-all duration-300"
                      >
                        {categories.map((cat) => (
                          <option key={cat.id} value={cat.id}>
                            {cat.name} ({cat.count})
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        {/* Search Results */}
        {hasSearchQuery && (
          <div className="bg-[#1e1e1e]/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-12 border border-[#2a2a2a]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">Search Results</h2>
                <p className="text-[#a3a3a3]">About {filteredPolicies.length} results for "{searchQuery}"</p>
              </div>
              <button
                onClick={() => setSearchQuery('')}
                className="text-[#2563eb] hover:text-[#1d4ed8] font-medium transition-colors duration-300"
              >
                Clear search
              </button>
            </div>

            <div className="space-y-8">
              {filteredPolicies.length > 0 ? (
                filteredPolicies.map((policy) => {
                  const categoryInfo = categoryIcons[policy.category] || categoryIcons.default;
                  const Icon = categoryInfo.icon;
                  
                  return (
                    <div key={policy.id} className="border-b border-[#2a2a2a] pb-8 last:border-b-0">
                      <Link
                        to={getPolicyLink(policy.id)} // Updated to use role-based link
                        className="block group hover:bg-[#161616]/50 rounded-xl p-6 -m-6 transition-all duration-300 border border-transparent hover:border-[#404040]"
                      >
                        <div className="flex items-start space-x-6">
                          <div className={`p-4 rounded-xl ${categoryInfo.bg} backdrop-blur-sm flex-shrink-0 border border-[#404040]/50`}>
                            <Icon className={`w-8 h-8 ${categoryInfo.text}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-3 mb-2">
                              <span className={`text-xs font-medium px-3 py-1 rounded-full ${categoryInfo.bg} ${categoryInfo.text} border border-[#404040]/50`}>
                                {policy.category}
                              </span>
                              <span className="text-xs text-[#6b7280]">•</span>
                              <span className="text-xs text-[#6b7280]">Updated 2 days ago</span>
                            </div>
                            <h3 className="text-xl font-semibold text-[#2563eb] group-hover:text-[#1d4ed8] mb-3 transition-colors duration-300">
                              {policy.title}
                            </h3>
                            <p className="text-[#a3a3a3] text-base mb-4 leading-relaxed">
                              {policy.description}
                            </p>
                            <div className="flex items-center space-x-6 text-sm text-[#6b7280]">
                              <span className="flex items-center">
                                <FiTag className="w-4 h-4 mr-2" />
                                Policy #{policy.id}
                              </span>
                              <span className="flex items-center">
                                <FiCalendar className="w-4 h-4 mr-2" />
                                Last reviewed: Jan 2025
                              </span>
                              <span className="text-[#22c55e] font-medium flex items-center">
                                <span className="w-2 h-2 bg-[#22c55e] rounded-full mr-2"></span>
                                Active
                              </span>
                            </div>
                          </div>
                        </div>
                      </Link>
                    </div>
                  );
                })
              ) : (
                <div className="text-center py-16">
                  <div className="w-32 h-32 mx-auto mb-6 bg-[#161616] rounded-full flex items-center justify-center border border-[#2a2a2a]">
                    <SearchIcon className="w-16 h-16 text-[#6b7280]" />
                  </div>
                  <h3 className="text-xl font-medium text-white mb-3">No policies found</h3>
                  <p className="text-[#a3a3a3] mb-6 max-w-md mx-auto">
                    Try adjusting your search terms or browse by category below.
                  </p>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="px-6 py-3 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white font-medium rounded-xl hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-blue-500/25"
                  >
                    Reset Filters
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Category Carousel */}
        {!hasSearchQuery && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">Browse by Category</h2>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="p-3 rounded-xl bg-[#161616] border border-[#404040] text-[#a3a3a3] hover:text-white hover:border-[#2563eb] transition-all duration-300"
                >
                  {isAutoPlaying ? <FiPause size={18} /> : <FiPlay size={18} />}
                </button>
                <button 
                  onClick={() => setCategoryIndex(prev => Math.max(0, prev - 1))}
                  className="p-3 rounded-xl bg-[#161616] border border-[#404040] text-[#a3a3a3] hover:text-white hover:border-[#2563eb] transition-all duration-300"
                >
                  <FiChevronLeft size={18} />
                </button>
                <button 
                  onClick={() => setCategoryIndex(prev => Math.min(Math.ceil((categories.length - 1) / 4), prev + 1))}
                  className="p-3 rounded-xl bg-[#161616] border border-[#404040] text-[#a3a3a3] hover:text-white hover:border-[#2563eb] transition-all duration-300"
                >
                  <FiChevronRight size={18} />
                </button>
              </div>
            </div>
            
            <div className="relative overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out gap-6"
                style={{ transform: `translateX(-${categoryIndex * 100}%)` }}
              >
                {Array.from({ length: Math.ceil(categories.length / 4) }, (_, chunkIndex) => (
                  <div key={chunkIndex} className="grid grid-cols-4 gap-6 w-full flex-shrink-0">
                    {categories.slice(chunkIndex * 4, (chunkIndex * 4) + 4).map((cat) => {
                      const categoryInfo = categoryIcons[cat.id] || categoryIcons.default;
                      const Icon = categoryInfo.icon;
                      const isSelected = selectedCategory === cat.id;
                      
                      return (
                        <button
                          key={cat.id}
                          onClick={() => setSelectedCategory(cat.id)}
                          className={`relative overflow-hidden rounded-2xl h-48 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group ${
                            isSelected ? 'ring-2 ring-[#2563eb] shadow-lg shadow-blue-500/25' : ''
                          }`}
                        >
                          {/* Background Image */}
                          <div 
                            className="absolute inset-0 bg-cover bg-center"
                            style={{ backgroundImage: `url(${categoryInfo.image})` }}
                          />
                          {/* Gradient Overlay */}
                          <div className={`absolute inset-0 bg-gradient-to-br ${categoryInfo.gradient} opacity-80 group-hover:opacity-90 transition-opacity duration-300`}></div>
                          {/* Content */}
                          <div className="relative h-full flex flex-col justify-end p-6 text-white">
                            <div className="mb-4">
                              <Icon className="w-10 h-10 drop-shadow-lg group-hover:scale-110 transition-transform duration-300" />
                            </div>
                            <h3 className="font-semibold text-base text-left leading-tight drop-shadow-md mb-1">
                              {cat.name}
                            </h3>
                            <span className="text-sm opacity-90 drop-shadow-md text-left">
                              {cat.count} policies
                            </span>
                          </div>
                          {isSelected && (
                            <div className="absolute top-4 right-4">
                              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg border border-white/30">
                                <FiStar className="w-4 h-4 text-white" fill="currentColor" />
                              </div>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Featured Policies Carousel */}
        {!hasSearchQuery && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-white">Featured Policies</h2>
              <Link to="/policies/all" className="text-[#2563eb] hover:text-[#1d4ed8] font-medium transition-colors duration-300">
                View all →
              </Link>
            </div>
            <div className="relative overflow-hidden rounded-2xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out gap-6"
                style={{ transform: `translateX(-${featuredIndex * 25}%)` }}
              >
                {popularPolicies.map((policy) => {
                  const categoryInfo = categoryIcons[policy.category] || categoryIcons.default;
                  const Icon = categoryInfo.icon;
                  
                  return (
                    <Link
                      key={policy.id}
                      to={getPolicyLink(policy.id)} // Updated to use role-based link
                      className="group bg-[#1e1e1e]/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden border border-[#2a2a2a] hover:border-[#404040] flex-shrink-0 w-80 hover:-translate-y-2"
                    >
                      <div className={`h-2 bg-gradient-to-r ${categoryInfo.gradient}`}></div>
                      <div className="p-8">
                        <div className="flex items-center mb-6">
                          <div className={`p-4 rounded-xl ${categoryInfo.bg} backdrop-blur-sm border border-[#404040]/50`}>
                            <Icon className={`w-8 h-8 ${categoryInfo.text}`} />
                          </div>
                          <div className="ml-4 flex-1">
                            <span className={`text-xs font-medium px-3 py-1 rounded-full ${categoryInfo.bg} ${categoryInfo.text} border border-[#404040]/50`}>
                              {policy.category}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-[#2563eb] transition-colors duration-300">
                          {policy.title}
                        </h3>
                        <p className="text-[#a3a3a3] text-sm mb-6 leading-relaxed line-clamp-3">
                          {policy.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-[#6b7280]">
                          <span className="flex items-center">
                            <FiClock className="w-3 h-3 mr-1" />
                            {policy.lastUpdated}
                          </span>
                          <span className="flex items-center">
                            <span className="mr-1">👁️</span>
                            {policy.views}
                          </span>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Filtered Results by Category */}
        {!hasSearchQuery && selectedCategory !== 'all' && (
          <div className="bg-[#1e1e1e]/80 backdrop-blur-sm rounded-2xl shadow-xl p-8 mb-12 border border-[#2a2a2a]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  {categories.find(c => c.id === selectedCategory)?.name || 'Category'} Policies
                </h2>
                <p className="text-[#a3a3a3]">{filteredPolicies.length} policies found</p>
              </div>
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-[#2563eb] hover:text-[#1d4ed8] font-medium transition-colors duration-300"
              >
                Show all categories
              </button>
            </div>

            <div className="space-y-8">
              {filteredPolicies.map((policy) => {
                const categoryInfo = categoryIcons[policy.category] || categoryIcons.default;
                const Icon = categoryInfo.icon;
                
                return (
                  <div key={policy.id} className="border-b border-[#2a2a2a] pb-8 last:border-b-0">
                    <Link
                      to={getPolicyLink(policy.id)} // Updated to use role-based link
                      className="block group hover:bg-[#161616]/50 rounded-xl p-6 -m-6 transition-all duration-300 border border-transparent hover:border-[#404040]"
                    >
                      <div className="flex items-start space-x-6">
                        <div className={`p-4 rounded-xl ${categoryInfo.bg} backdrop-blur-sm flex-shrink-0 border border-[#404040]/50`}>
                          <Icon className={`w-8 h-8 ${categoryInfo.text}`} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <span className={`text-xs font-medium px-3 py-1 rounded-full ${categoryInfo.bg} ${categoryInfo.text} border border-[#404040]/50`}>
                              {policy.category}
                            </span>
                            <span className="text-xs text-[#6b7280]">•</span>
                            <span className="text-xs text-[#6b7280]">Updated 2 days ago</span>
                          </div>
                          <h3 className="text-xl font-semibold text-[#2563eb] group-hover:text-[#1d4ed8] mb-3 transition-colors duration-300">
                            {policy.title}
                          </h3>
                          <p className="text-[#a3a3a3] text-base mb-4 leading-relaxed">
                            {policy.description}
                          </p>
                          <div className="flex items-center space-x-6 text-sm text-[#6b7280]">
                            <span className="flex items-center">
                              <FiTag className="w-4 h-4 mr-2" />
                              Policy #{policy.id}
                            </span>
                            <span className="flex items-center">
                              <FiCalendar className="w-4 h-4 mr-2" />
                              Last reviewed: Jan 2025
                            </span>
                            <span className="text-[#22c55e] font-medium flex items-center">
                              <span className="w-2 h-2 bg-[#22c55e] rounded-full mr-2"></span>
                              Active
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Help Section */}
        {!hasSearchQuery && (
          <div className="bg-gradient-to-br from-[#1e1e1e]/80 to-[#161616]/80 backdrop-blur-sm rounded-2xl p-12 border border-[#2a2a2a]">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-6">Need Additional Help?</h2>
              <p className="text-[#a3a3a3] text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                Can't find the policy you're looking for? Our HR team is available to assist you with any questions or provide additional resources.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="mailto:hr@nexrita.com"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] text-white font-medium rounded-xl hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
                >
                  <FiMail className="w-5 h-5 mr-2" />
                  Contact HR Team
                </a>
                <Link
                  to="/policies/request"
                  className="inline-flex items-center px-8 py-4 border border-[#404040] text-[#a3a3a3] hover:text-white bg-[#161616]/50 hover:bg-[#1e1e1e] font-medium rounded-xl hover:border-[#2563eb] transition-all duration-300"
                >
                  Request New Policy
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes cosmicFloat {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        
        @keyframes cosmicPulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        
        .animate-cosmic-float {
          animation: cosmicFloat 8s ease-in-out infinite;
        }
        
        .animate-cosmic-pulse {
          animation: cosmicPulse 4s ease-in-out infinite;
        }

        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}
