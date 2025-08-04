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
  FiMail,
  FiGrid,
  FiList,
  FiBookmark,
  FiEye,
  FiDownload,
  FiExternalLink
} from 'react-icons/fi';

// Import policies data
import { policies, policyCategories, getPoliciesByCategory } from '../../data/policies';

// Add auth context or user hook
import { useAuth } from '../../contexts/AuthContext';
import { Sparkles, Star } from 'lucide-react';

// Category icons with updated dark theme colors
const categoryIcons = {
  'key': { 
    icon: ShieldExclamationIcon, 
    gradient: 'from-orange-500 via-red-500 to-pink-600',
    bg: 'bg-red-500/10', 
    text: 'text-red-400',
    image: 'https://images.unsplash.com/photo-1614064641938-3bbee52942c7?w=400&h=300&fit=crop&crop=center'
  },
  'hr': { 
    icon: UserGroupIcon, 
    gradient: 'from-blue-500 via-indigo-500 to-purple-600',
    bg: 'bg-blue-500/10', 
    text: 'text-blue-400',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=400&h=300&fit=crop&crop=center'
  },
  'code': { 
    icon: CodeBracketIcon, 
    gradient: 'from-purple-500 via-violet-500 to-indigo-600',
    bg: 'bg-purple-500/10', 
    text: 'text-purple-400',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop&crop=center'
  },
  'global': { 
    icon: GlobeAltIcon, 
    gradient: 'from-green-500 via-emerald-500 to-teal-600',
    bg: 'bg-green-500/10', 
    text: 'text-green-400',
    image: 'https://images.unsplash.com/photo-1519302959554-a75be0afc82a?w=400&h=300&fit=crop&crop=center'
  },
  'india': { 
    icon: BuildingOfficeIcon, 
    gradient: 'from-orange-500 via-yellow-500 to-red-600',
    bg: 'bg-orange-500/10', 
    text: 'text-orange-400',
    image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=400&h=300&fit=crop&crop=center'
  },
  'it': { 
    icon: CogIcon, 
    gradient: 'from-gray-500 via-slate-500 to-zinc-600',
    bg: 'bg-gray-500/10', 
    text: 'text-gray-400',
    image: 'https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=300&fit=crop&crop=center'
  },
  'finance': { 
    icon: CurrencyDollarIcon, 
    gradient: 'from-yellow-500 via-amber-500 to-orange-600',
    bg: 'bg-yellow-500/10', 
    text: 'text-yellow-400',
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop&crop=center'
  },
  'safety': { 
    icon: ShieldCheckIcon, 
    gradient: 'from-teal-500 via-cyan-500 to-blue-600',
    bg: 'bg-teal-500/10', 
    text: 'text-teal-400',
    image: 'https://images.unsplash.com/photo-1585435557343-3b092031d4c1?w=400&h=300&fit=crop&crop=center'
  },
  'operations': { 
    icon: BeakerIcon, 
    gradient: 'from-pink-500 via-rose-500 to-red-600',
    bg: 'bg-pink-500/10', 
    text: 'text-pink-400',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop&crop=center'
  },
  'default': { 
    icon: DocumentTextIcon, 
    gradient: 'from-gray-400 via-gray-500 to-gray-600',
    bg: 'bg-gray-500/10', 
    text: 'text-gray-400',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop&crop=center'
  }
};

// Professional Loader Component
const PageLoader = () => (
  <div className="min-h-screen bg-black flex items-center justify-center font-jakarta relative overflow-hidden">
    {/* Cosmic Background */}
    <div className="fixed inset-0 pointer-events-none">
      {[...Array(100)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full animate-twinkle"
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
        <div className="w-20 h-20 mx-auto bg-gradient-to-br from-[#2563eb] to-[#1d4ed8] rounded-full flex items-center justify-center shadow-glow">
          <DocumentTextIcon className="w-12 h-12 text-white" />
        </div>
      </div>
      <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent text-glow mb-4">Loading Policies</h2>
      <p className="text-gray-300 text-lg mb-8">Preparing your compliance dashboard...</p>
      <div className="w-80 h-2 bg-black rounded-full overflow-hidden mx-auto mb-6 border border-gray-800">
        <div className="h-full bg-gradient-to-r from-[#2563eb] to-[#1d4ed8] animate-pulse"></div>
      </div>
      <div className="flex justify-center space-x-3">
        {[0, 1, 2].map((i) => (
          <div 
            key={i}
            className="w-3 h-3 bg-[#2563eb] rounded-full animate-bounce shadow-glow" 
            style={{ animationDelay: `${i * 150}ms` }}
          />
        ))}
      </div>
    </div>
  </div>
);

export default function PolicyLanding() {
  const { user } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [loading, setLoading] = useState(true);
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [sortBy, setSortBy] = useState('relevance');
  const [dateFilter, setDateFilter] = useState('all');
  const [viewMode, setViewMode] = useState('tiles'); // 'tiles' or 'list'
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState('all'); // 'all' or 'bookmarked'
  const [bookmarkedPolicies, setBookmarkedPolicies] = useState(new Set());
  
  // Carousel states
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const itemsPerPage = viewMode === 'tiles' ? 16 : 10; // 4 rows x 4 tiles or 10 list items

  // Helper function to get policy link based on user role
  const getPolicyLink = (policyId) => {
    const userRole = user?.role || 'employee';
    return `/${userRole}/public/policies/${policyId}`;
  };

  // Bookmark functionality
  const toggleBookmark = (policyId, e) => {
    e.preventDefault();
    e.stopPropagation();
    setBookmarkedPolicies(prev => {
      const newSet = new Set(prev);
      if (newSet.has(policyId)) {
        newSet.delete(policyId);
      } else {
        newSet.add(policyId);
      }
      return newSet;
    });
  };

  // Simulate loading delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  // Add counts to categories
  const categories = [
    { id: 'all', name: 'All Policies' },
    ...policyCategories
  ].map(cat => ({
    ...cat,
    count: cat.id === 'all'
      ? policies.length
      : policies.filter(p => p.category === cat.id).length
  }));

  // Filter policies based on active tab
  const getFilteredPolicies = () => {
    let filtered = policies.filter(policy => {
      if (!policy || !policy.title) return false;

      const title = typeof policy.title === 'string' ? policy.title : '';
      const content = typeof policy.content === 'string' ? policy.content : '';
      const tags = Array.isArray(policy.tags) ? policy.tags : [];

      const matchesSearch = !searchQuery ||
        title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory = selectedCategory === 'all' || policy.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // Filter by active tab
    if (activeTab === 'bookmarked') {
      filtered = filtered.filter(policy => bookmarkedPolicies.has(policy.id));
    }

    return filtered;
  };

  const filteredPolicies = getFilteredPolicies();

  // Pagination
  const totalPages = Math.ceil(filteredPolicies.length / itemsPerPage);
  const paginatedPolicies = filteredPolicies.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, selectedCategory, activeTab, viewMode]);

  // Popular policies
  const popularPolicyIds = ['key-1001', 'global-1', 'hr-1', 'key-1'];
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
  const showResults = hasSearchQuery || selectedCategory !== 'all' || activeTab === 'bookmarked';
  
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

  const generateStars = (count) => {
    return Array.from({ length: count }, (_, i) => (
      <div
        key={i}
        className="absolute animate-twinkle"
        style={{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          animationDelay: `${Math.random() * 3}s`,
          animationDuration: `${2 + Math.random() * 2}s`
        }}
      >
        <Star 
          size={Math.random() > 0.5 ? 2 : 1} 
          className="text-white opacity-30" 
        />
      </div>
    ));
  };

  // Handle category selection from carousel
  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    setActiveTab('all'); // Reset to all tab when selecting category
  };

  return (
    <div className="min-h-screen bg-black font-jakarta relative overflow-hidden">
      {/* Cosmic Background Effects */}
      <div className="fixed inset-0 z-0">
        {/* Starfield */}
        <div className="absolute inset-0">
          {generateStars(150)}
        </div>
        
        {/* Floating Sparkles */}
        <div className="absolute inset-0">
          {Array.from({ length: 25 }, (_, i) => (
            <div
              key={i}
              className="absolute animate-float-up"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 8}s`,
                animationDuration: `${6 + Math.random() * 4}s`
              }}
            >
              <Sparkles 
                size={Math.random() > 0.7 ? 6 : 4} 
                className="text-blue-400 opacity-20" 
              />
            </div>
          ))}
        </div>

        {/* Nebula Clouds */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-96 h-96 bg-blue-600 opacity-5 rounded-full blur-3xl animate-drift"></div>
          <div className="absolute bottom-20 right-10 w-80 h-80 bg-gray-600 opacity-3 rounded-full blur-3xl animate-drift-reverse"></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-400 opacity-4 rounded-full blur-3xl animate-pulse-slow"></div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="relative z-10 bg-black/90 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-white via-blue-200 to-blue-400 bg-clip-text text-transparent text-glow sm:text-6xl mb-6">
              Policy Hub
            </h1>
            {/* <p className="mt-6 max-w-3xl mx-auto text-xl text-gray-300 leading-relaxed">
              Your comprehensive resource for company policies, procedures, and compliance guidelines.
            </p> */}
            
            {/* Enhanced Google-style Search Bar */}
            <div className="mt-12 max-w-4xl mx-auto">
              <div className="relative flex items-center bg-black/80 backdrop-blur-sm rounded-2xl shadow-glow border border-gray-800 hover:border-blue-500/50 transition-all duration-300">
                <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none">
                  <SearchIcon className="h-6 w-6 text-gray-500" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-16 pr-40 py-6 border-0 rounded-2xl text-lg text-white placeholder-gray-500 bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500/50"
                  placeholder="Search policies, procedures, guidelines..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button
                  onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                  className="absolute right-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white rounded-xl transition-all duration-300 flex items-center space-x-2 shadow-glow hover:shadow-blue-500/40"
                >
                  <FiFilter className="w-4 h-4" />
                  <span className="text-sm font-medium">Advanced</span>
                </button>
              </div>
              
              {/* Advanced Search Panel */}
              {showAdvancedSearch && (
                <div className="mt-6 bg-black/80 backdrop-blur-sm rounded-2xl shadow-glow p-8 border border-gray-800">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">Sort by</label>
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                      >
                        <option value="relevance">Relevance</option>
                        <option value="date">Last Updated</option>
                        <option value="name">Name A-Z</option>
                        <option value="category">Category</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">Date Range</label>
                      <select
                        value={dateFilter}
                        onChange={(e) => setDateFilter(e.target.value)}
                        className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
                      >
                        <option value="all">All Time</option>
                        <option value="week">Last Week</option>
                        <option value="month">Last Month</option>
                        <option value="year">Last Year</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-3">Category</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full px-4 py-3 bg-black border border-gray-700 rounded-xl text-white focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300"
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
        {/* Tab Navigation */}
        <div className="mb-12">
          <div className="flex items-center justify-center space-x-2 bg-black/60 backdrop-blur-sm p-2 rounded-2xl border border-gray-800 max-w-md mx-auto">
            <button
              onClick={() => setActiveTab('all')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === 'all'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-glow'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              All Policies
            </button>
            <button
              onClick={() => setActiveTab('bookmarked')}
              className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 ${
                activeTab === 'bookmarked'
                  ? 'bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-glow'
                  : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
              }`}
            >
              <FiBookmark className="w-4 h-4" />
              <span>My Policies ({bookmarkedPolicies.size})</span>
            </button>
          </div>
        </div>

        {/* Search Results or Category Display */}
        {showResults && (
          <div className="bg-black/80 backdrop-blur-sm rounded-2xl shadow-glow p-8 mb-12 border border-gray-800">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent text-glow mb-2">
                  {activeTab === 'bookmarked' ? 'My Bookmarked Policies' : 
                   hasSearchQuery ? 'Search Results' : 
                   selectedCategory !== 'all' ? `${categories.find(c => c.id === selectedCategory)?.name || 'Category'} Policies` : 
                   'All Policies'}
                </h2>
                <p className="text-gray-400">
                  {hasSearchQuery ? `About ${filteredPolicies.length} results for "${searchQuery}"` : 
                   `${filteredPolicies.length} policies found`}
                </p>
              </div>
              <div className="flex items-center space-x-4">
                {/* View Mode Toggle */}
                <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-sm p-2 rounded-xl border border-gray-700">
                  <button
                    onClick={() => setViewMode('tiles')}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      viewMode === 'tiles'
                        ? 'bg-blue-600 text-white shadow-glow'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <FiGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg transition-all duration-300 ${
                      viewMode === 'list'
                        ? 'bg-blue-600 text-white shadow-glow'
                        : 'text-gray-400 hover:text-white hover:bg-gray-700'
                    }`}
                  >
                    <FiList className="w-4 h-4" />
                  </button>
                </div>
                {(hasSearchQuery || selectedCategory !== 'all') && (
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedCategory('all');
                    }}
                    className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            </div>

            {/* Results Display */}
            {filteredPolicies.length > 0 ? (
              <>
                {viewMode === 'tiles' ? (
                  /* Tiles View */
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
                    {paginatedPolicies.map((policy) => {
                      const categoryInfo = categoryIcons[policy.category] || categoryIcons.default;
                      const Icon = categoryInfo.icon;
                      const isBookmarked = bookmarkedPolicies.has(policy.id);
                      
                      return (
                        <Link
                          key={policy.id}
                          to={getPolicyLink(policy.id)}
                          className="group relative bg-black/60 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800 hover:border-gray-600 transition-all duration-300 hover:-translate-y-2 hover:shadow-glow"
                        >
                          {/* Background Image with Gradient Overlay */}
                          <div className="relative h-32 overflow-hidden">
                            <div 
                              className="absolute inset-0 bg-cover bg-center"
                              style={{ backgroundImage: `url(${categoryInfo.image})` }}
                            />
                            <div className={`absolute inset-0 bg-gradient-to-br ${categoryInfo.gradient} opacity-80`}></div>
                            
                            {/* Bookmark Button */}
                            <button
                              onClick={(e) => toggleBookmark(policy.id, e)}
                              className="absolute top-3 right-3 p-2 bg-black/50 backdrop-blur-sm rounded-lg border border-gray-700 hover:border-blue-500 transition-all duration-300 group/bookmark"
                            >
                              <FiBookmark 
                                className={`w-4 h-4 transition-all duration-300 ${
                                  isBookmarked 
                                    ? 'text-blue-400 fill-current' 
                                    : 'text-gray-400 group-hover/bookmark:text-blue-400'
                                }`}
                                fill={isBookmarked ? 'currentColor' : 'none'}
                              />
                            </button>

                            {/* Category Icon */}
                            <div className="absolute bottom-3 left-3">
                              <div className="p-2 bg-black/50 backdrop-blur-sm rounded-lg border border-gray-700">
                                <Icon className="w-6 h-6 text-white" />
                              </div>
                            </div>
                          </div>

                          {/* Content */}
                          <div className="p-6">
                            <div className="mb-3">
                              <span className={`text-xs font-medium px-3 py-1 rounded-full ${categoryInfo.bg} ${categoryInfo.text} border border-gray-700`}>
                                {policy.category}
                              </span>
                            </div>
                            <h3 className="text-sm font-semibold text-white mb-3 leading-tight group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300">
                              {policy.title}
                            </h3>
                            <div className="flex items-center justify-between text-xs text-gray-500">
                              <span className="flex items-center">
                                <FiClock className="w-3 h-3 mr-1" />
                                Updated 2d ago
                              </span>
                              <span className="flex items-center">
                                <FiEye className="w-3 h-3 mr-1" />
                                {Math.floor(Math.random() * 500) + 100}
                              </span>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  /* List View */
                  <div className="space-y-4 mb-8">
                    {paginatedPolicies.map((policy, index) => {
                      const categoryInfo = categoryIcons[policy.category] || categoryIcons.default;
                      const Icon = categoryInfo.icon;
                      const isBookmarked = bookmarkedPolicies.has(policy.id);
                      
                      return (
                        <div key={policy.id} className="border-b border-gray-800 pb-6 last:border-b-0">
                          <Link
                            to={getPolicyLink(policy.id)}
                            className="block group hover:bg-black/40 rounded-xl p-6 -m-6 transition-all duration-300 border border-transparent hover:border-gray-700"
                          >
                            <div className="flex items-start space-x-6">
                              <div className="flex-shrink-0">
                                <div className={`p-4 rounded-xl ${categoryInfo.bg} backdrop-blur-sm border border-gray-700`}>
                                  <Icon className={`w-8 h-8 ${categoryInfo.text}`} />
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-start justify-between mb-3">
                                  <div className="flex items-center space-x-3">
                                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${categoryInfo.bg} ${categoryInfo.text} border border-gray-700`}>
                                      {policy.category}
                                    </span>
                                    <span className="text-xs text-gray-500">•</span>
                                    <span className="text-xs text-gray-500">Updated 2 days ago</span>
                                    <span className="text-xs text-gray-500">•</span>
                                    <span className="text-green-400 text-xs font-medium flex items-center">
                                      <span className="w-2 h-2 bg-green-400 rounded-full mr-2"></span>
                                      Active
                                    </span>
                                  </div>
                                  <button
                                    onClick={(e) => toggleBookmark(policy.id, e)}
                                    className="p-2 hover:bg-gray-700 rounded-lg transition-all duration-300"
                                  >
                                    <FiBookmark 
                                      className={`w-4 h-4 transition-all duration-300 ${
                                        isBookmarked 
                                          ? 'text-blue-400 fill-current' 
                                          : 'text-gray-400 hover:text-blue-400'
                                      }`}
                                      fill={isBookmarked ? 'currentColor' : 'none'}
                                    />
                                  </button>
                                </div>
                                <h3 className="text-xl font-semibold text-blue-400 group-hover:text-blue-300 mb-3 transition-colors duration-300">
                                  {policy.title}
                                </h3>
                                <p className="text-gray-400 text-base mb-4 leading-relaxed line-clamp-2">
                                  {policy.content ? policy.content.replace(/<[^>]*>/g, '').substring(0, 200) + '...' : 'Policy content description...'}
                                </p>
                                <div className="flex items-center space-x-6 text-sm text-gray-500">
                                  <span className="flex items-center">
                                    <FiTag className="w-4 h-4 mr-2" />
                                    Policy #{policy.id}
                                  </span>
                                  <span className="flex items-center">
                                    <FiCalendar className="w-4 h-4 mr-2" />
                                    Effective: {policy.effectiveDate || 'Jan 2025'}
                                  </span>
                                  <span className="flex items-center">
                                    <FiEye className="w-4 h-4 mr-2" />
                                    {Math.floor(Math.random() * 1000) + 100} views
                                  </span>
                                </div>
                              </div>
                            </div>
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-between pt-8 border-t border-gray-800">
                    <div className="text-sm text-gray-400">
                      Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredPolicies.length)} of {filteredPolicies.length} results
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        className="p-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                      >
                        <FiChevronLeft className="w-4 h-4" />
                      </button>
                      
                      {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                        let pageNum;
                        if (totalPages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          pageNum = totalPages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        
                        return (
                          <button
                            key={pageNum}
                            onClick={() => setCurrentPage(pageNum)}
                            className={`px-3 py-2 rounded-lg border transition-all duration-300 ${
                              currentPage === pageNum
                                ? 'bg-blue-600 border-blue-600 text-white shadow-glow'
                                : 'border-gray-700 text-gray-400 hover:text-white hover:border-blue-500'
                            }`}
                          >
                            {pageNum}
                          </button>
                        );
                      })}
                      
                      <button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                        disabled={currentPage === totalPages}
                        className="p-2 rounded-lg border border-gray-700 text-gray-400 hover:text-white hover:border-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                      >
                        <FiChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-16">
                <div className="w-32 h-32 mx-auto mb-6 bg-black rounded-full flex items-center justify-center border border-gray-800">
                  {activeTab === 'bookmarked' ? (
                    <FiBookmark className="w-16 h-16 text-gray-600" />
                  ) : (
                    <SearchIcon className="w-16 h-16 text-gray-600" />
                  )}
                </div>
                <h3 className="text-xl font-medium text-white mb-3">
                  {activeTab === 'bookmarked' ? 'No bookmarked policies' : 'No policies found'}
                </h3>
                <p className="text-gray-400 mb-6 max-w-md mx-auto">
                  {activeTab === 'bookmarked' 
                    ? 'Start bookmarking policies to access them quickly here.'
                    : 'Try adjusting your search terms or browse by category below.'
                  }
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setActiveTab('all');
                  }}
                  className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-xl hover:-translate-y-1 transition-all duration-300 shadow-glow"
                >
                  {activeTab === 'bookmarked' ? 'Browse All Policies' : 'Reset Filters'}
                </button>
              </div>
            )}
          </div>
        )}

        {/* Category Carousel - Only show when not in results mode */}
        {!showResults && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent text-glow">Browse by Category</h2>
              <div className="flex items-center space-x-4">
                <button 
                  onClick={() => setIsAutoPlaying(!isAutoPlaying)}
                  className="p-3 rounded-xl bg-black/60 border border-gray-700 text-gray-400 hover:text-white hover:border-blue-500 transition-all duration-300"
                >
                  {isAutoPlaying ? <FiPause size={18} /> : <FiPlay size={18} />}
                </button>
                <button 
                  onClick={() => setCategoryIndex(prev => Math.max(0, prev - 1))}
                  className="p-3 rounded-xl bg-black/60 border border-gray-700 text-gray-400 hover:text-white hover:border-blue-500 transition-all duration-300"
                >
                  <FiChevronLeft size={18} />
                </button>
                <button 
                  onClick={() => setCategoryIndex(prev => Math.min(Math.ceil((categories.length - 1) / 4), prev + 1))}
                  className="p-3 rounded-xl bg-black/60 border border-gray-700 text-gray-400 hover:text-white hover:border-blue-500 transition-all duration-300"
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
                          onClick={() => handleCategorySelect(cat.id)}
                          className={`relative overflow-hidden rounded-2xl h-48 transition-all duration-300 transform hover:scale-105 hover:-translate-y-2 group ${
                            isSelected ? 'ring-2 ring-blue-500 shadow-glow' : ''
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
                            <h3 className="font-semibold text-base text-left leading-tight drop-shadow-md mb-1 text-glow">
                              {cat.name}
                            </h3>
                            <span className="text-sm opacity-90 drop-shadow-md text-left">
                              {cat.count} policies
                            </span>
                          </div>
                          {isSelected && (
                            <div className="absolute top-4 right-4">
                              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shadow-glow border border-white/30">
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

        {/* Featured Policies Carousel - Only show when not in results mode */}
        {!showResults && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent text-glow">Popular Policies</h2>
              <Link to="/policies/all" className="text-blue-400 hover:text-blue-300 font-medium transition-colors duration-300">
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
                  const isBookmarked = bookmarkedPolicies.has(policy.id);
                  
                  return (
                    <Link
                      key={policy.id}
                      to={getPolicyLink(policy.id)}
                      className="group bg-black/80 backdrop-blur-sm rounded-2xl shadow-glow hover:shadow-blue-500/20 transition-all duration-300 overflow-hidden border border-gray-800 hover:border-gray-600 flex-shrink-0 w-80 hover:-translate-y-2"
                    >
                      <div className={`h-2 bg-gradient-to-r ${categoryInfo.gradient}`}></div>
                      <div className="p-8 relative">
                        <button
                          onClick={(e) => toggleBookmark(policy.id, e)}
                          className="absolute top-4 right-4 p-2 hover:bg-gray-700 rounded-lg transition-all duration-300"
                        >
                          <FiBookmark 
                            className={`w-4 h-4 transition-all duration-300 ${
                              isBookmarked 
                                ? 'text-blue-400 fill-current' 
                                : 'text-gray-400 hover:text-blue-400'
                            }`}
                            fill={isBookmarked ? 'currentColor' : 'none'}
                          />
                        </button>
                        <div className="flex items-center mb-6">
                          <div className={`p-4 rounded-xl ${categoryInfo.bg} backdrop-blur-sm border border-gray-700`}>
                            <Icon className={`w-8 h-8 ${categoryInfo.text}`} />
                          </div>
                          <div className="ml-4 flex-1">
                            <span className={`text-xs font-medium px-3 py-1 rounded-full ${categoryInfo.bg} ${categoryInfo.text} border border-gray-700`}>
                              {policy.category}
                            </span>
                          </div>
                        </div>
                        <h3 className="text-xl font-semibold text-white mb-3 group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-300 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-300 text-glow">
                          {policy.title}
                        </h3>
                        <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-3">
                          {policy.content ? policy.content.replace(/<[^>]*>/g, '').substring(0, 150) + '...' : 'Policy description...'}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span className="flex items-center">
                            <FiClock className="w-3 h-3 mr-1" />
                            {policy.lastUpdated}
                          </span>
                          <span className="flex items-center">
                            <FiEye className="w-3 h-3 mr-1" />
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

        {/* Help Section - Only show when not in results mode */}
        {!showResults && (
          <div className="bg-gradient-to-br from-black/80 to-black/60 backdrop-blur-sm rounded-2xl p-12 border border-gray-800">
            <div className="text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent text-glow mb-6">Need Additional Help?</h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                Can't find the policy you're looking for? Our HR team is available to assist you with any questions or provide additional resources.
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center">
                <a
                  href="mailto:hr@nexrita.com"
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium rounded-xl hover:-translate-y-1 transition-all duration-300 shadow-glow hover:shadow-blue-500/40"
                >
                  <FiMail className="w-5 h-5 mr-2" />
                  Contact HR Team
                </a>
                <Link
                  to="/policies/request"
                  className="inline-flex items-center px-8 py-4 border border-gray-700 text-gray-300 hover:text-white bg-black/50 hover:bg-black/70 font-medium rounded-xl hover:border-blue-500 transition-all duration-300"
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
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        
        .font-jakarta {
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
        }
        
        .shadow-glow {
          box-shadow: 0 0 20px rgba(59, 130, 246, 0.3);
        }
        
        .text-glow {
          text-shadow: 0 0 10px rgba(59, 130, 246, 0.5),
                       0 0 20px rgba(59, 130, 246, 0.3),
                       0 0 40px rgba(59, 130, 246, 0.1);
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        @keyframes twinkle {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.8; }
        }
        
        @keyframes float-up {
          0% { 
            transform: translateY(100vh) rotate(0deg); 
            opacity: 0; 
          }
          10% { 
            opacity: 1; 
          }
          90% { 
            opacity: 1; 
          }
          100% { 
            transform: translateY(-100px) rotate(360deg); 
            opacity: 0; 
          }
        }
        
        @keyframes drift {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes drift-reverse {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(-30px, 30px) scale(0.9); }
          66% { transform: translate(20px, -20px) scale(1.1); }
          100% { transform: translate(0, 0) scale(1); }
        }
        
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.05); }
        }
        
        .animate-twinkle {
          animation: twinkle var(--duration, 3s) ease-in-out infinite;
        }
        
        .animate-float-up {
          animation: float-up var(--duration, 8s) linear infinite;
        }
        
        .animate-drift {
          animation: drift 30s ease-in-out infinite;
        }
        
        .animate-drift-reverse {
          animation: drift-reverse 25s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 20s ease-in-out infinite;
        }
        
        @media (prefers-reduced-motion: reduce) {
          .animate-twinkle,
          .animate-float-up,
          .animate-drift,
          .animate-drift-reverse,
          .animate-pulse-slow {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
